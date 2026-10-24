#!/usr/bin/env node
// Node >=22 and pinned repository Playwright; listener proof currently requires Linux /proc.
import { spawn, spawnSync } from 'node:child_process';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmdirSync,
  openSync,
  closeSync,
  readlinkSync,
  readdirSync,
  realpathSync,
} from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { once } from 'node:events';
import { sourceFingerprint, requireSource, completeReport, listeners } from './integrity.mjs';

const root = realpathSync(resolve(fileURLToPath(new URL('../../../../', import.meta.url))));
const [output, base = 'http://127.0.0.1:3100', experimentFile] = process.argv.slice(2);
if (!output?.startsWith('/') || process.argv.length > 5)
  throw new Error(
    'Usage: sweep.mjs /absolute/new-proof-dir [loopback-origin] [absolute-experiment.json]'
  );
const url = new URL(base);
if (url.origin !== base || url.protocol !== 'http:' || url.hostname !== '127.0.0.1')
  throw new Error('Use a literal HTTP loopback origin without a trailing slash');
const destination = resolve(realpathSync(dirname(output)), basename(output));
if (destination === root || destination.startsWith(`${root}/`))
  throw new Error('Evidence must be outside the worktree');
const hasExperiment = experimentFile !== undefined;
let experiment = null;
const lock = resolve(root, '.verify-portfolio.lock');
mkdirSync(destination); // Refuse existing evidence before any verdict write.
mkdirSync(lock);
let server;
let serverLog;
let interrupted = false;
const interrupt = () => {
  interrupted = true;
  server?.kill('SIGTERM');
};
process.on('SIGINT', interrupt);
process.on('SIGTERM', interrupt);
const port = Number(url.port || 80);
/** @type {{ startedAt: string, ok: boolean, clean: boolean, behaviorOk: boolean, error?: string, finishedAt?: string }} */
const verdict = { startedAt: new Date().toISOString(), ok: false, clean: false, behaviorOk: false };
const save = (name, data) =>
  writeFileSync(resolve(destination, name), JSON.stringify(data, null, 2));
try {
  if (hasExperiment) {
    if (!experimentFile.startsWith('/')) throw new Error('Experiment manifest must be absolute');
    try {
      experiment = JSON.parse(readFileSync(experimentFile, 'utf8'));
    } catch {
      throw new Error('Experiment manifest could not be read or parsed');
    }
    if (!experiment || typeof experiment !== 'object' || Array.isArray(experiment))
      throw new Error('Invalid experiment manifest: expected an object');
  }
  const run = (script, args, log) => {
    const result = spawnSync(process.execPath, [script, ...args], {
      cwd: root,
      encoding: 'utf8',
      timeout: 600_000,
      maxBuffer: 4 * 1024 * 1024,
    });
    writeFileSync(resolve(destination, log), `${result.stdout ?? ''}\n${result.stderr ?? ''}`);
    return result.status === 0 && !result.error;
  };
  if (listeners(port).length)
    throw new Error('Port already has a listener; refusing an unowned or wrong-checkout server');
  const source = sourceFingerprint(root);
  save('source.json', source);
  requireSource(source, experiment);
  verdict.clean = !hasExperiment && source.changes.length === 0;
  // Build inside this run, then launch the exact Next binary from this checkout.
  if (!run('node_modules/next/dist/bin/next', ['build'], 'build.log'))
    throw new Error('Production build failed');
  const stableSource = () => {
    if (JSON.stringify(sourceFingerprint(root)) !== JSON.stringify(source))
      throw new Error('Source changed during verification');
  };
  stableSource();
  const buildId = readFileSync(resolve(root, '.next/BUILD_ID'), 'utf8').trim();
  serverLog = openSync(resolve(destination, 'server.log'), 'wx');
  server = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(port)],
    {
      cwd: root,
      stdio: ['ignore', serverLog, serverLog],
    }
  );
  let launchError;
  server.on('error', error => {
    launchError = error;
  });
  const binding = () => {
    if (
      launchError ||
      !server?.pid ||
      server.exitCode !== null ||
      server.signalCode !== null ||
      interrupted
    )
      throw new Error('Owned server is no longer running');
    const bound = listeners(port);
    if (bound.length !== 1 || bound[0].address !== '0100007F')
      throw new Error('Expected exactly one literal IPv4 loopback listener');
    const proc = `/proc/${server.pid}`;
    const inodes = readdirSync(`${proc}/fd`).flatMap(fd => {
      try {
        return [readlinkSync(`${proc}/fd/${fd}`)];
      } catch {
        return [];
      }
    });
    if (
      !inodes.includes(`socket:[${bound[0].inode}]`) ||
      realpathSync(`${proc}/cwd`) !== root ||
      realpathSync(`${proc}/exe`) !== realpathSync(process.execPath)
    )
      throw new Error('Listener PID, executable or checkout does not match the owned launch');
    if (readFileSync(resolve(root, '.next/BUILD_ID'), 'utf8').trim() !== buildId)
      throw new Error('Build changed during verification');
    return {
      pid: server.pid,
      cwd: root,
      executable: realpathSync(process.execPath),
      ...bound[0],
      buildId,
    };
  };
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (launchError || server.exitCode !== null || server.signalCode !== null || interrupted) break;
    if (listeners(port).length) {
      binding();
      try {
        const response = await fetch(base, {
          signal: AbortSignal.timeout(1000),
          redirect: 'manual',
        });
        await response.body?.cancel();
        if (response.status === 200) {
          ready = true;
          break;
        }
      } catch {
        /* Readiness is bounded by the launch deadline. */
      }
    }
    await delay(250);
  }
  if (!ready) throw new Error('Owned server did not become ready');
  const fingerprint = {
    ...source,
    buildId,
    listener: binding(),
    experiment: experiment ?? null,
    startedAt: verdict.startedAt,
  };
  save('fingerprint.json', fingerprint);
  const contracts = run('scripts/verify-portfolio.mjs', ['--base-url', base], 'contracts.log');
  binding();
  const browser = run(
    'scripts/ui-smoke.mjs',
    ['--base-url', base, '--output', resolve(destination, 'browser')],
    'browser.log'
  );
  binding();
  stableSource();
  const report = JSON.parse(readFileSync(resolve(destination, 'browser/run.json'), 'utf8'));
  const complete = completeReport(report);
  Object.assign(verdict, fingerprint, {
    contracts,
    browser,
    complete,
    states: report.states.length,
    candidates: report.candidates.length,
    gaps: report.gaps,
    behaviorOk:
      contracts &&
      browser &&
      complete &&
      report.candidates.length === 0 &&
      report.gaps.length === 0,
    visualReview: 'required separately; inspect every capture',
  });
  verdict.ok = verdict.clean && verdict.behaviorOk;
} catch (error) {
  verdict.clean = false;
  verdict.error = error instanceof Error ? error.message : String(error);
} finally {
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit');
    server.kill('SIGTERM');
    const stopped = await Promise.race([exited.then(() => true), delay(5000).then(() => false)]);
    if (!stopped) {
      server.kill('SIGKILL');
      await exited;
    }
  }
  if (serverLog !== undefined) closeSync(serverLog);
  process.off('SIGINT', interrupt);
  process.off('SIGTERM', interrupt);
  verdict.finishedAt = new Date().toISOString();
  save('verdict.json', verdict);
  rmdirSync(lock);
}
console.log(
  `${hasExperiment ? `EXPERIMENT ${verdict.behaviorOk ? 'BEHAVIOR PASS' : 'BEHAVIOR FAIL'}; clean=false; acceptance=FAIL` : verdict.ok ? 'PASS' : 'FAIL'} portfolio sweep: ${destination}${verdict.error ? `; ${verdict.error}` : ''}`
);
if (!verdict.ok) process.exitCode = 1;
