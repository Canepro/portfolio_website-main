import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const cli = (script, args) =>
  spawnSync(process.execPath, [resolve('scripts', script), ...args], { encoding: 'utf8' });
const provider = id => ({
  instanceId: id,
  enabled: true,
  status: 'ready',
  stale: false,
  atLimit: false,
  costGuard: { switchProvider: false },
  usage: { windows: [{ kind: 'weekly', usedPercent: 50 }] },
});

test('a failed journey needs an explicit disposition before a zero-finding report', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'ui-smoke-adjudication-'));
  try {
    const run = {
      contract: 'portfolio-ui-smoke/v1',
      runId: 'failed-journey',
      revision: 'fixture',
      origin: 'http://127.0.0.1:3100',
      gaps: [],
      states: [{ screenshot: 'page.png' }],
      candidates: [{ code: 'journey', target: 'projects', screenshot: 'page.png' }],
    };
    const review = { runId: run.runId, reviewer: 'contract fixture', findings: [] };
    const reviewFile = resolve(directory, 'review.json');
    await writeFile(resolve(directory, 'run.json'), JSON.stringify(run));
    await writeFile(reviewFile, JSON.stringify(review));
    assert.notEqual(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    review.candidateReview = [{ index: 0, decision: 'accept', reason: 'Reproduced 500' }];
    await writeFile(reviewFile, JSON.stringify(review));
    assert.notEqual(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    review.candidateReview = [
      {
        index: 0,
        decision: 'reject',
        reason: 'Successful read-only replay; transient server error',
      },
    ];
    await writeFile(reviewFile, JSON.stringify(review));
    assert.equal(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    assert.equal(
      JSON.parse(await readFile(resolve(directory, 'findings.json'), 'utf8')).findings.length,
      0
    );
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('fix routing honors Claude priority, unavailable routes, and the weekly stop boundary', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'ui-smoke-provider-'));
  try {
    const file = resolve(directory, 'usage.json');
    const providers = ['codex', 'acpRegistry_cursor', 'claudeAgent'].map(provider);
    await writeFile(file, JSON.stringify({ providers }));
    const pick = exclusions => {
      const result = cli('ui-smoke-provider.mjs', [
        '--usage-file',
        file,
        ...exclusions.flatMap(id => ['--exclude', id]),
      ]);
      return { status: result.status, ...JSON.parse(result.stdout) };
    };
    assert.equal(pick([]).providerInstanceId, 'claudeAgent');
    assert.equal(pick(['claudeAgent']).providerInstanceId, 'acpRegistry_cursor');
    assert.equal(pick(['claudeAgent', 'acpRegistry_cursor']).providerInstanceId, 'codex');
    providers[0].usage.windows[0].usedPercent = 90;
    await writeFile(file, JSON.stringify({ providers }));
    assert.equal(pick([]).providerInstanceId, 'claudeAgent');
    providers[0].usage.windows[0].usedPercent = 91;
    await writeFile(file, JSON.stringify({ providers }));
    assert.equal(pick([]).status, 'stop');
    providers[0].usage.windows[0].usedPercent = 50;
    providers[2].atLimit = true;
    providers[1].costGuard.switchProvider = true;
    await writeFile(file, JSON.stringify({ providers }));
    assert.equal(pick([]).providerInstanceId, 'codex');
    providers[0].stale = true;
    await writeFile(file, JSON.stringify({ providers }));
    assert.equal(pick([]).status, 'stop');
  } finally {
    await rm(directory, { recursive: true });
  }
});

test('filing caps the entire run at five screenshot-backed repros and rejects changed retry selections', async () => {
  const directory = await mkdtemp(resolve(tmpdir(), 'ui-smoke-file-'));
  const outside = await mkdtemp(resolve(tmpdir(), 'ui-smoke-outside-'));
  try {
    const png = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aU1sAAAAASUVORK5CYII=',
      'base64'
    );
    await writeFile(resolve(directory, 'page.png'), png);
    const run = {
      contract: 'portfolio-ui-smoke/v1',
      runId: 'contract',
      revision: 'fixture',
      origin: 'http://127.0.0.1:3100',
      gaps: [],
      states: [
        {
          screenshot: 'page.png',
          url: 'http://127.0.0.1:3100/blog',
          viewport: { width: 390, height: 844 },
          theme: 'dark',
        },
      ],
    };
    await writeFile(resolve(directory, 'run.json'), JSON.stringify(run));
    const reviewFile = resolve(directory, 'review.json');
    const review = {
      runId: run.runId,
      reviewer: 'contract fixture',
      findings: Array.from({ length: 7 }, (_, i) => ({
        code: 'overlap',
        target: `#item-${i}`,
        title: `Defect ${i}`,
        observed: 'A visible failure',
        expected: 'A usable page',
        repro: ['Open /blog', 'Observe failure'],
        screenshot: 'page.png',
      })),
    };
    await writeFile(reviewFile, JSON.stringify(review));
    assert.equal(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    const final = JSON.parse(await readFile(resolve(directory, 'findings.json'), 'utf8'));
    assert.equal(final.findings.length, 5);
    assert.equal(final.omitted, 2);
    assert.match(
      await readFile(resolve(directory, 'findings.md'), 'utf8'),
      /!\[Evidence\]\(page.png\)/
    );
    assert.equal(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    review.findings.reverse();
    await writeFile(reviewFile, JSON.stringify(review));
    assert.notEqual(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    review.findings[0].screenshot = '../outside.png';
    await writeFile(reviewFile, JSON.stringify(review));
    assert.notEqual(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    review.findings = [];
    await writeFile(reviewFile, JSON.stringify(review));
    run.gaps = ['browser stopped'];
    await writeFile(resolve(directory, 'run.json'), JSON.stringify(run));
    assert.notEqual(cli('ui-smoke-file.mjs', [directory, reviewFile]).status, 0);
    // A listed symlink still must not admit an outside screenshot into a run.
    run.gaps = [];
    run.states[0].screenshot = 'linked.png';
    await writeFile(resolve(directory, 'run.json'), JSON.stringify(run));
    await writeFile(resolve(outside, 'linked.png'), png);
    await symlink(resolve(outside, 'linked.png'), resolve(directory, 'linked.png'));
    review.findings = [
      {
        code: 'overlap',
        target: '#item',
        title: 'Invalid',
        observed: 'failure',
        expected: 'page',
        repro: ['Open'],
        screenshot: 'linked.png',
      },
    ];
    await writeFile(reviewFile, JSON.stringify(review));
    const escaped = cli('ui-smoke-file.mjs', [directory, reviewFile]);
    assert.notEqual(escaped.status, 0);
    assert.match(escaped.stderr, /Screenshot escapes the run/);
  } finally {
    await rm(directory, { recursive: true });
    await rm(outside, { recursive: true });
  }
});
