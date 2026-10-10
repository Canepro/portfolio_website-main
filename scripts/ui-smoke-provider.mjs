#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

// File input permits receipt replay; scheduled runs use the live t3-usage CLI.
const args = process.argv.slice(2);
const fileIndex = args.indexOf('--usage-file');
const usage = JSON.parse(
  fileIndex < 0
    ? execFileSync('t3-usage', { encoding: 'utf8' })
    : readFileSync(args[fileIndex + 1], 'utf8')
);
const excluded = args.filter((value, index) => args[index - 1] === '--exclude');
const providers = usage.providers ?? [];
const codex = providers.find(p => p.instanceId === 'codex');
const weekly = codex?.usage?.windows?.find(w => w.kind === 'weekly');
// A missing/stale weekly reading cannot prove the user's stop boundary.
if (
  !weekly ||
  !Number.isFinite(weekly.usedPercent) ||
  codex.stale ||
  weekly.usedPercent > 90 ||
  weekly.resetPassed === true
) {
  console.log(
    JSON.stringify({
      status: 'stop',
      reason: 'Codex weekly usage exceeds 90% or cannot be verified',
      weeklyUsedPercent: weekly?.usedPercent ?? null,
    })
  );
  process.exitCode = 2;
} else {
  const selected = ['claudeAgent', 'acpRegistry_cursor', 'codex'].find(id => {
    const provider = providers.find(p => p.instanceId === id);
    return (
      provider &&
      !excluded.includes(id) &&
      provider.enabled &&
      provider.status === 'ready' &&
      !provider.stale &&
      provider.atLimit !== true &&
      provider.costGuard?.switchProvider === false
    );
  });
  console.log(
    JSON.stringify(
      selected
        ? {
            status: 'ready',
            providerInstanceId: selected,
            modelFamily: selected === 'codex' ? 'GPT' : 'Claude',
            weeklyUsedPercent: weekly.usedPercent,
          }
        : {
            status: 'hold',
            reason: 'No verified provider in the authorized fix order',
            weeklyUsedPercent: weekly.usedPercent,
          }
    )
  );
  if (!selected) process.exitCode = 3;
}
