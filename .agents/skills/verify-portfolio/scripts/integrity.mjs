import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

// Apply before filesystem access and to tracked paths as well as discovered files.
const excludedSourcePath = path =>
  path
    .split('/')
    .some(part => ['output', 'node_modules', '.next'].includes(part) || part.startsWith('.env'));

// Read bytes directly: Git's index flags must not hide a source change.
export function sourceFingerprint(root) {
  const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  const committed = new Map(
    git(['ls-tree', '-r', '-z', 'HEAD'])
      .split('\0')
      .filter(Boolean)
      .map(entry => {
        const [metadata, path] = entry.split('\t');
        const [mode, type, oid] = metadata.split(' ');
        if (type !== 'blob') throw new Error('Unsupported source tree entry');
        return [path, { mode, oid }];
      })
  );
  // Use Next's installed discovery without retaining parent package contents.
  // Clear its path cache so a config added during the sweep cannot go unnoticed.
  const require = createRequire(resolve(root, 'package.json'));
  const browserslist = require('next/dist/compiled/browserslist');
  browserslist.clearCaches();
  let browserslistConfig;
  try {
    browserslistConfig = browserslist.findConfigFile(root);
  } catch {
    throw new Error('Browserslist config discovery failed');
  }
  if (browserslistConfig && dirname(resolve(browserslistConfig)) !== resolve(root))
    throw new Error('Browserslist discovered a config outside the checkout');
  // Match installed Next findConfigPath's complete PostCSS filename order.
  // package.json's object-valued field wins before filename discovery.
  const packageConfig = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  const postcssNames = [
    '.postcssrc.json',
    'postcss.config.json',
    '.postcssrc.js',
    'postcss.config.js',
    'postcss.config.mjs',
    'postcss.config.cjs',
  ];
  if (packageConfig.postcss === null || typeof packageConfig.postcss !== 'object') {
    const postcssConfig = require('next/dist/compiled/find-up').sync(postcssNames, { cwd: root });
    if (postcssConfig && dirname(resolve(postcssConfig)) !== resolve(root))
      throw new Error('PostCSS discovered a config outside the checkout');
  }
  const paths = new Set([...committed.keys()].filter(path => !excludedSourcePath(path)));
  const walk = relative => {
    if (excludedSourcePath(relative)) return;
    const path = resolve(root, relative);
    if (!existsSync(path)) return;
    const stat = lstatSync(path);
    if (stat.isDirectory()) {
      for (const child of readdirSync(path)) walk(`${relative}/${child}`);
    } else paths.add(relative);
  };
  // Include ignored and untracked files where Next/content/verifier inputs live.
  // Exclusions apply at every depth, before inspecting even a symlink or directory.
  for (const scope of ['src', 'app', 'pages', 'content', 'public', 'scripts', '.agents'])
    walk(scope);
  for (const name of readdirSync(root)) {
    // Bounded root source/config admission catches hooks and their root imports,
    // including future hook names, without walking dependencies or private dirs.
    if (excludedSourcePath(name)) continue;
    if (
      postcssNames.includes(name) ||
      /\.(?:[cm]?[jt]sx?|json|css|scss|sass|less|mdx?|ya?ml|toml|wasm|node)$/.test(name) ||
      /^(?:next\.config\.|next-env\.d\.ts$|tsconfig.*\.json$|jsconfig\.json$|\.babelrc(?:\.(?:json|js|mjs|cjs))?$|babel\.config\.(?:js|json|mjs|cjs)$|browserslist$|\.browserslistrc$|tailwind\.config\.|postcss\.config\.|package\.json$|bun\.lockb?$|mdx-components\.)/.test(
        name
      )
    )
      paths.add(name);
  }
  const files = [];
  const changes = [];
  for (const path of [...paths].sort()) {
    const absolute = resolve(root, path);
    const expected = committed.get(path);
    if (!existsSync(absolute)) {
      files.push([path, 'missing']);
      changes.push({ path, sha256: null });
      continue;
    }
    const stat = lstatSync(absolute);
    if (!stat.isFile()) throw new Error(`Unsupported non-regular source input: ${path}`);
    // Unknown root code/config must be committed first. Do not ingest arbitrary
    // private JSON/auth file contents merely because an extension matches.
    if (!expected && !path.includes('/'))
      throw new Error('Uncommitted root source/config input; commit before attestation');
    const bytes = readFileSync(absolute);
    const digest = sha256(bytes);
    const oid = execFileSync('git', ['hash-object', '--stdin'], {
      cwd: root,
      input: bytes,
      encoding: 'utf8',
    }).trim();
    const mode = stat.mode & 0o100 ? '100755' : '100644';
    files.push([path, mode, digest]);
    if (!expected || expected.oid !== oid || expected.mode !== mode)
      changes.push({ path, sha256: digest });
  }
  return {
    revision: git(['rev-parse', 'HEAD']).trim(),
    sourceSha256: sha256(JSON.stringify(files)),
    changes,
  };
}

export function requireSource(source, experiment) {
  if (experiment !== null && experiment !== undefined) {
    if (
      typeof experiment !== 'object' ||
      Array.isArray(experiment) ||
      typeof experiment.reason !== 'string' ||
      !experiment.reason.trim() ||
      !Array.isArray(experiment.changes) ||
      !experiment.changes.length ||
      experiment.changes.some(
        change =>
          !change ||
          typeof change !== 'object' ||
          Array.isArray(change) ||
          typeof change.path !== 'string' ||
          !change.path ||
          !(
            change.sha256 === null ||
            (typeof change.sha256 === 'string' && /^[a-f0-9]{64}$/.test(change.sha256))
          )
      )
    )
      throw new Error('Invalid experiment manifest: expected a reason and exact nonempty changes');
  }
  const expected = experiment?.changes ?? [];
  if (JSON.stringify(source.changes) !== JSON.stringify(expected))
    throw new Error('Source differs from committed blobs or the exact experiment manifest');
}

export function completeReport(report) {
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
  const expected = [];
  for (const [width, height] of [
    [1440, 900],
    [390, 844],
  ]) {
    for (const theme of ['dark', 'light']) {
      for (const name of width === 390 ? [...common, 'mobile-menu', 'menu-navigation'] : common) {
        expected.push(
          JSON.stringify([
            width,
            height,
            name,
            name === 'theme-toggle' ? (theme === 'dark' ? 'light' : 'dark') : theme,
          ])
        );
      }
    }
  }
  const actual = report.states.map(state =>
    JSON.stringify([state.viewport?.width, state.viewport?.height, state.name, state.theme])
  );
  return (
    actual.length === expected.length &&
    new Set(actual).size === actual.length &&
    expected.every(tuple => actual.includes(tuple))
  );
}

export function listeners(port) {
  if (process.platform !== 'linux')
    throw new Error('Listener binding requires Linux /proc; this host is unsupported');
  return ['/proc/net/tcp', '/proc/net/tcp6'].flatMap(path =>
    readFileSync(path, 'utf8')
      .trim()
      .split('\n')
      .slice(1)
      .flatMap(line => {
        const fields = line.trim().split(/\s+/);
        const [address, hexPort] = fields[1].split(':');
        return fields[3] === '0A' && parseInt(hexPort, 16) === port
          ? [{ address, inode: fields[9] }]
          : [];
      })
  );
}
