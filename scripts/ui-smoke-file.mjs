#!/usr/bin/env node
import { readFile, writeFile, mkdir, rm, realpath } from 'node:fs/promises';
import { resolve, basename, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const [directory, reviewFile, flag] = process.argv.slice(2);
if (!directory || !reviewFile || (flag && flag !== '--publish'))
  throw new Error('Usage: node scripts/ui-smoke-file.mjs RUN_DIR REVIEW.json [--publish]');
const output = await realpath(directory);
const lock = resolve(output, '.filing-lock');
await mkdir(lock); // Same-run concurrent filing is rejected, including retries while a write is in flight.
const gh = args => execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
const api = (path, body) =>
  JSON.parse(
    execFileSync('gh', ['api', path, '--input', '-'], {
      input: JSON.stringify(body),
      encoding: 'utf8',
    })
  );
try {
  const run = JSON.parse(await readFile(resolve(output, 'run.json'), 'utf8'));
  const review = JSON.parse(await readFile(reviewFile, 'utf8'));
  if (run.contract !== 'portfolio-ui-smoke/v1' || !run.states.length || run.gaps.length)
    throw new Error('An interrupted or empty run cannot be finalized');
  if (review.runId !== run.runId || !review.reviewer || !Array.isArray(review.findings))
    throw new Error('Review must name this run, its reviewer, and findings');
  const validText = value =>
    typeof value === 'string' && value.trim().length > 0 && value.length <= 2000;
  const candidates = [];
  for (const finding of review.findings) {
    const state = run.states.find(s => s.screenshot === finding.screenshot);
    if (
      !state ||
      !['code', 'title', 'observed', 'expected'].every(key => validText(finding[key])) ||
      finding.title.length > 160 ||
      /[\r\n]/.test(finding.title) ||
      !Array.isArray(finding.repro) ||
      !finding.repro.length ||
      !finding.repro.every(validText)
    )
      throw new Error(
        'Each finding needs a captured screenshot, observation, expectation, and repro'
      );
    const source = await realpath(resolve(output, state.screenshot));
    if (!source.startsWith(`${output}${sep}`) || basename(source) !== state.screenshot)
      throw new Error('Screenshot escapes the run');
    const bytes = await readFile(source);
    if (!bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])))
      throw new Error('Screenshot must be a PNG');
    const url = new URL(state.url);
    if (url.origin !== run.origin || url.username || url.password)
      throw new Error('Finding URL is outside this run');
    const fingerprint = createHash('sha256')
      .update(`${finding.code}|${url.pathname}|${state.viewport.width}|${state.theme}`)
      .digest('hex')
      .slice(0, 16);
    if (!candidates.some(f => f.fingerprint === fingerprint))
      candidates.push({
        code: finding.code,
        title: finding.title,
        observed: finding.observed,
        expected: finding.expected,
        repro: finding.repro,
        screenshot: state.screenshot,
        url: state.url,
        viewport: state.viewport,
        theme: state.theme,
        fingerprint,
        screenshotSha256: createHash('sha256').update(bytes).digest('hex'),
      });
  }
  // One immutable final selection per run. Retry publication against it, never create a second budget.
  const finalPath = resolve(output, 'findings.json');
  let final;
  try {
    final = JSON.parse(await readFile(finalPath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const selected = candidates.slice(0, 5);
  if (final && JSON.stringify(final.findings) !== JSON.stringify(selected))
    throw new Error('This run already has a different final selection');
  final ??= {
    runId: run.runId,
    revision: run.revision,
    reviewedAt: new Date().toISOString(),
    reviewer: review.reviewer,
    findings: selected,
    omitted: candidates.length - selected.length,
  };
  await writeFile(finalPath, `${JSON.stringify(final, null, 2)}\n`);
  const report = [
    `# UI smoke run ${run.runId}`,
    '',
    `Revision: ${run.revision}. ${run.states.length} browser states reviewed.`,
    '',
    `${selected.length} findings; ${final.omitted} omitted by the five-finding cap.`,
    '',
  ];
  for (const finding of selected)
    report.push(
      `## ${finding.title}`,
      '',
      `URL: ${finding.url}`,
      '',
      `Viewport: ${finding.viewport.width}x${finding.viewport.height}; ${finding.theme}.`,
      '',
      `Observed: ${finding.observed}`,
      '',
      `Expected: ${finding.expected}`,
      '',
      ...finding.repro.map((step, i) => `${i + 1}. ${step}`),
      '',
      `![Evidence](${finding.screenshot})`,
      ''
    );
  await writeFile(resolve(output, 'findings.md'), `${report.join('\n')}\n`);
  if (flag === '--publish' && selected.length) {
    if (run.origin !== 'https://portfolio.canepro.me')
      throw new Error('Only production portfolio findings may be published');
    const repo = 'Canepro/portfolio_website-main';
    const evidenceBranch = `mira/ui-smoke-evidence-${run.runId}`;
    const receiptPath = resolve(output, 'published.json');
    let receipt;
    try {
      receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    receipt ??= { runId: run.runId, branch: evidenceBranch, issues: [] };
    if (!receipt.commit) {
      // An orphan evidence branch does not deploy or modify main. Publish only selected public-page PNGs.
      const tree = [];
      for (const screenshot of new Set(selected.map(f => f.screenshot))) {
        const blob = api(`repos/${repo}/git/blobs`, {
          content: (await readFile(resolve(output, screenshot))).toString('base64'),
          encoding: 'base64',
        });
        tree.push({ path: screenshot, mode: '100644', type: 'blob', sha: blob.sha });
      }
      const blob = api(`repos/${repo}/git/blobs`, {
        content: JSON.stringify(final, null, 2),
        encoding: 'utf-8',
      });
      tree.push({ path: 'findings.json', mode: '100644', type: 'blob', sha: blob.sha });
      const createdTree = api(`repos/${repo}/git/trees`, { tree });
      const commit = api(`repos/${repo}/git/commits`, {
        message: `UI smoke evidence ${run.runId}`,
        tree: createdTree.sha,
        parents: [],
      });
      // Lost-response recovery: an existing same-run ref must contain the same evidence tree.
      let existing;
      try {
        existing = JSON.parse(gh(['api', `repos/${repo}/git/ref/heads/${evidenceBranch}`]));
      } catch {
        /* Create only below; a denied lookup cannot overwrite anything. */
      }
      if (existing) {
        const retained = JSON.parse(
          gh(['api', `repos/${repo}/git/commits/${existing.object.sha}`])
        );
        if (retained.tree.sha !== createdTree.sha)
          throw new Error('Evidence branch differs from this run');
        receipt.commit = existing.object.sha;
      } else {
        api(`repos/${repo}/git/refs`, { ref: `refs/heads/${evidenceBranch}`, sha: commit.sha });
        receipt.commit = commit.sha;
      }
      await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
    }
    for (const finding of selected) {
      if (receipt.issues.some(i => i.fingerprint === finding.fingerprint)) continue;
      const title = `UI smoke: ${finding.title} [${finding.fingerprint}]`;
      // Query the owning issue list rather than eventually-consistent GitHub search.
      const pages = gh([
        'api',
        '--paginate',
        '--slurp',
        `repos/${repo}/issues?state=open&per_page=100`,
      ]);
      const existing = JSON.parse(pages)
        .flat()
        .find(i => !i.pull_request && i.title.endsWith(`[${finding.fingerprint}]`));
      const imageUrl = `https://raw.githubusercontent.com/${repo}/${receipt.commit}/${finding.screenshot}`;
      const body = [
        `Run: ${run.runId}; source revision: ${run.revision}.`,
        '',
        `URL: ${finding.url}`,
        '',
        `Viewport: ${finding.viewport.width}x${finding.viewport.height}; ${finding.theme}.`,
        '',
        `Observed: ${finding.observed}`,
        '',
        `Expected: ${finding.expected}`,
        '',
        'Reproduction:',
        '',
        ...finding.repro.map((step, i) => `${i + 1}. ${step}`),
        '',
        `![Screenshot](${imageUrl})`,
        '',
        `Evidence fingerprint: ${finding.fingerprint}`,
      ].join('\n');
      const issue = existing ?? api(`repos/${repo}/issues`, { title, body });
      receipt.issues.push({
        fingerprint: finding.fingerprint,
        url: issue.html_url,
        reused: Boolean(existing),
        screenshot: imageUrl,
      });
      await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
    }
    console.log(JSON.stringify(receipt));
  } else
    console.log(
      JSON.stringify({
        runId: run.runId,
        findings: selected.length,
        report: resolve(output, 'findings.md'),
        published: false,
      })
    );
} finally {
  await rm(lock, { recursive: true });
}
