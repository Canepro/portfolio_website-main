#!/usr/bin/env node
// Node >=22; uses this repository's pinned Playwright through ui-smoke.mjs.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync, rmdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(fileURLToPath(new URL('../../../../', import.meta.url)));
const output = process.argv[2];
const base = process.argv[3] ?? 'http://127.0.0.1:3100';
if (!output || !output.startsWith('/') || process.argv.length > 4)
  throw new Error(
    'Usage: node .agents/skills/verify-portfolio/scripts/sweep.mjs /absolute/new-proof-dir [loopback-origin]'
  );
const url = new URL(base);
if (url.origin !== base || url.protocol !== 'http:' || url.hostname !== '127.0.0.1')
  throw new Error('Use a literal HTTP loopback origin without a trailing slash');
const destination = resolve(output);
if (destination === root || destination.startsWith(`${root}/`))
  throw new Error('Evidence must be outside the worktree');
const lock = resolve(root, '.next/verify-portfolio.lock');
mkdirSync(lock); // Refuse a second driver; inspect ownership before recovering a stale lock.
try {
  mkdirSync(destination); // Existing evidence must never be overwritten.
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  const fingerprint = {
    revision: git(['rev-parse', 'HEAD']).trim(),
    trackedDiffSha256: createHash('sha256')
      .update(git(['diff', 'HEAD', '--']))
      .digest('hex'),
    buildId: readFileSync(resolve(root, '.next/BUILD_ID'), 'utf8').trim(),
    startedAt: new Date().toISOString(),
  };
  writeFileSync(resolve(destination, 'fingerprint.json'), JSON.stringify(fingerprint, null, 2));
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
  const contracts = run('scripts/verify-portfolio.mjs', ['--base-url', base], 'contracts.log');
  const browser = run(
    'scripts/ui-smoke.mjs',
    ['--base-url', base, '--output', resolve(destination, 'browser')],
    'browser.log'
  );
  const report = JSON.parse(readFileSync(resolve(destination, 'browser/run.json'), 'utf8'));
  const common = [
    'home',
    'projects',
    'case-study',
    'blog',
    'topic-filter',
    'article',
    'systems',
    'contact',
    'theme-toggle',
  ];
  const complete = [1440, 390].every(width =>
    ['dark', 'light'].every(theme => {
      const names = width === 390 ? [...common, 'mobile-menu', 'menu-navigation'] : common;
      return names.every(name =>
        report.states.some(
          state =>
            state.viewport.width === width &&
            state.name === name &&
            state.theme ===
              (name === 'theme-toggle' ? (theme === 'dark' ? 'light' : 'dark') : theme)
        )
      );
    })
  );
  const ok =
    contracts &&
    browser &&
    complete &&
    report.states.length === 40 &&
    report.candidates.length === 0 &&
    report.gaps.length === 0;
  const verdict = {
    ...fingerprint,
    finishedAt: new Date().toISOString(),
    ok,
    contracts,
    browser,
    complete,
    states: report.states.length,
    candidates: report.candidates.length,
    gaps: report.gaps,
    visualReview: 'required separately; inspect every capture',
  };
  writeFileSync(resolve(destination, 'verdict.json'), JSON.stringify(verdict, null, 2));
  console.log(
    `${ok ? 'PASS' : 'FAIL'} portfolio sweep: ${report.states.length} states, ${report.candidates.length} candidates; ${destination}`
  );
  if (!ok) process.exitCode = 1;
} finally {
  rmdirSync(lock);
}
