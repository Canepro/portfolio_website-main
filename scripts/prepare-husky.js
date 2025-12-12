/* eslint-disable no-console */
/**
 * Cross-platform Husky install that won't fail in environments without .git
 * (e.g., some CI/build environments).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function hasGitDir(repoRoot) {
  try {
    return fs.existsSync(path.join(repoRoot, '.git'));
  } catch {
    return false;
  }
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');

  // Allow explicit opt-out in CI/build environments.
  if (process.env.HUSKY === '0') return;

  if (!hasGitDir(repoRoot)) {
    console.log('husky: skipping install (no .git directory found)');
    return;
  }

  try {
    execSync('npx husky install', {
      cwd: repoRoot,
      stdio: 'inherit',
    });
  } catch (err) {
    // Match the historical `husky install || true` behavior: don't block installs.
    const msg = err && err.message ? err.message : String(err);
    console.warn(`husky: install failed (non-blocking): ${msg}`);
  }
}

main();
