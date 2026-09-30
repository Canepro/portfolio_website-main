#!/usr/bin/env node

import { isIP } from 'node:net';

const DEFAULT_BASE_URL = 'http://127.0.0.1:3100';
const EXPECTED_PROJECT_ROUTE_COUNT = 11;
const REQUEST_TIMEOUT_MS = 10_000;
const RETIRED_HOSTS = new Set([
  'argocd.canepro.me',
  'grafana.canepro.me',
  'jenkins.canepro.me',
  'k8.canepro.me',
  'ca-canepro-ph-frontend.kinddune-53ac219d.eastus2.azurecontainerapps.io',
]);

function usage(message) {
  if (message) console.error(`Error: ${message}\n`);
  console.error('Usage: node scripts/verify-portfolio.mjs [--base-url http://127.0.0.1:3100]');
  process.exitCode = 2;
}

function parseBaseUrl(argv) {
  let rawUrl = DEFAULT_BASE_URL;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--base-url') {
      rawUrl = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument.startsWith('--base-url=')) {
      rawUrl = argument.slice('--base-url='.length);
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  if (!rawUrl) throw new Error('--base-url needs a value');

  const baseUrl = new URL(rawUrl);
  const hostname = baseUrl.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  const ipVersion = isIP(hostname);
  const isLoopback = hostname === '::1' || (ipVersion === 4 && hostname.split('.')[0] === '127');

  if (!['http:', 'https:'].includes(baseUrl.protocol)) {
    throw new Error('The base URL must use HTTP or HTTPS');
  }
  if (!isLoopback) {
    throw new Error('The base URL must use a literal loopback host');
  }
  if (baseUrl.username || baseUrl.password) {
    throw new Error('The base URL must not include credentials');
  }
  if (baseUrl.search || baseUrl.hash || baseUrl.pathname !== '/') {
    throw new Error('The base URL must be an origin without a path, query, or fragment');
  }

  return baseUrl;
}

function decodeHtml(value) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    quot: '"',
  };

  return String(value).replace(/&(#x[0-9a-f]+|#\d+|amp|apos|gt|lt|quot);/gi, (_match, entity) => {
    const normalized = entity.toLowerCase();
    if (normalized.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }
    if (normalized.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }
    return named[normalized];
  });
}

function textContent(html) {
  return decodeHtml(html.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function tagMatches(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) ?? [];
}

function attribute(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `(?:^|\\s)${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\\x60]+))`,
    'i'
  );
  const match = tag.match(pattern);
  return match ? decodeHtml(match[1] ?? match[2] ?? match[3]) : null;
}

function anchorHrefs(html) {
  return tagMatches(html, 'a').flatMap(tag => {
    const href = attribute(tag, 'href');
    return href ? [href] : [];
  });
}

function headingTexts(html) {
  return Array.from(html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi), match => ({
    level: Number(match[1]),
    text: textContent(match[2]),
  }));
}

function canonicalHrefs(html) {
  return tagMatches(html, 'link').flatMap(tag => {
    const rel = attribute(tag, 'rel');
    const href = attribute(tag, 'href');
    return rel?.split(/\s+/).some(value => value.toLowerCase() === 'canonical') && href
      ? [href]
      : [];
  });
}

function metaContent(html, key) {
  const normalizedKey = key.toLowerCase();
  for (const tag of tagMatches(html, 'meta')) {
    const property = attribute(tag, 'property')?.toLowerCase();
    const name = attribute(tag, 'name')?.toLowerCase();
    if (property === normalizedKey || name === normalizedKey) {
      return attribute(tag, 'content');
    }
  }
  return null;
}

function normaliseTitle(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function hasListMarkup(html) {
  return /<(?:ol|ul)\b[^>]*>/i.test(html) && /<li\b[^>]*>/i.test(html);
}

function findProjectPaths(html, baseUrl) {
  const paths = new Set();
  for (const href of anchorHrefs(html)) {
    try {
      const path = new URL(href, baseUrl).pathname;
      if (/^\/projects\/[^/]+$/.test(path)) paths.add(path);
    } catch {
      // Invalid external hrefs are outside this verifier's route inventory.
    }
  }
  return [...paths].sort();
}

function retiredHrefs(html, baseUrl) {
  return anchorHrefs(html).flatMap(href => {
    try {
      const hostname = new URL(href, baseUrl).hostname.toLowerCase();
      return RETIRED_HOSTS.has(hostname) ? [href] : [];
    } catch {
      return [];
    }
  });
}

const results = [];

function check(name, condition, detail = '') {
  results.push({ name, ok: Boolean(condition), detail });
}

async function requestPage(baseUrl, path) {
  const url = new URL(path, baseUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: { accept: 'text/html' },
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
    });
    const body = await response.text();
    const contentType = response.headers.get('content-type') ?? '';

    check(`${path} resolves`, response.status === 200, `HTTP ${response.status}`);
    check(
      `${path} returns HTML`,
      contentType.includes('text/html'),
      contentType || 'missing content-type'
    );
    return response.status === 200 && contentType.includes('text/html') ? body : null;
  } catch (error) {
    check(`${path} resolves`, false, error instanceof Error ? error.message : String(error));
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function checkCanonical(label, html, baseUrl, expectedPath) {
  const canonicals = canonicalHrefs(html);
  check(`${label} has one canonical URL`, canonicals.length === 1, `${canonicals.length} found`);
  if (canonicals.length !== 1) return;

  try {
    const canonical = new URL(canonicals[0], baseUrl);
    const pointsToPage =
      ['http:', 'https:'].includes(canonical.protocol) &&
      canonical.pathname === expectedPath &&
      canonical.search === '' &&
      canonical.hash === '';
    check(`${label} canonical points to ${expectedPath}`, pointsToPage, canonicals[0]);
  } catch {
    check(`${label} canonical URL is valid`, false, canonicals[0]);
  }
}

function checkSocialTitles(label, html) {
  const h1 = headingTexts(html).find(heading => heading.level === 1)?.text;
  check(`${label} exposes a page heading`, Boolean(h1), h1 ?? 'missing h1');

  for (const key of ['og:title', 'twitter:title']) {
    const title = metaContent(html, key);
    check(`${label} publishes ${key}`, Boolean(title), title ?? 'missing');
    if (!title || !h1) continue;

    const normalizedTitle = normaliseTitle(title);
    const normalizedHeading = normaliseTitle(h1);
    check(
      `${label} ${key} matches its visible page heading`,
      normalizedTitle.includes(normalizedHeading) || normalizedHeading.includes(normalizedTitle),
      `metadata: ${title}; heading: ${h1}`
    );
  }
}

function checkRetiredLinks(label, html, baseUrl) {
  const found = retiredHrefs(html, baseUrl);
  check(`${label} has no retired deployment hrefs`, found.length === 0, found.join(', '));
}

async function main() {
  let baseUrl;
  try {
    baseUrl = parseBaseUrl(process.argv.slice(2));
  } catch (error) {
    usage(error instanceof Error ? error.message : String(error));
    return;
  }

  const pages = new Map();
  const load = async path => {
    if (!pages.has(path)) pages.set(path, requestPage(baseUrl, path));
    return pages.get(path);
  };

  const [home, projects, systems, blog, contact] = await Promise.all([
    load('/'),
    load('/projects'),
    load('/systems'),
    load('/blog'),
    load('/contact'),
  ]);
  if (home) checkCanonical('home', home, baseUrl, '/');
  if (contact) {
    checkCanonical('contact', contact, baseUrl, '/contact');
    checkSocialTitles('contact', contact);
  }

  const projectPaths = projects ? findProjectPaths(projects, baseUrl) : [];
  check(
    '/projects renders the expected project-route inventory',
    projectPaths.length === EXPECTED_PROJECT_ROUTE_COUNT,
    `${projectPaths.length} routes: ${projectPaths.join(', ')}`
  );
  check(
    '/projects links to /projects/codex-skills',
    projectPaths.includes('/projects/codex-skills')
  );

  await Promise.all(projectPaths.map(path => load(path)));

  const codexSkills = await load('/projects/codex-skills');
  if (codexSkills) {
    checkCanonical('codex-skills', codexSkills, baseUrl, '/projects/codex-skills');
    checkSocialTitles('codex-skills', codexSkills);
  }

  const pipelineHealer = await load('/projects/pipelinehealer');
  if (pipelineHealer) {
    const overviewCount = headingTexts(pipelineHealer).filter(
      heading => heading.text.toLowerCase() === 'overview'
    ).length;
    check('PipelineHealer has one Overview heading', overviewCount === 1, `${overviewCount} found`);
    check(
      'PipelineHealer renders real section headings',
      headingTexts(pipelineHealer).some(
        heading => heading.level >= 2 && heading.text !== 'Overview'
      )
    );
    check('PipelineHealer renders real list markup', hasListMarkup(pipelineHealer));
  }

  if (blog) {
    const latestArticlePath = anchorHrefs(blog)
      .map(href => {
        try {
          return new URL(href, baseUrl).pathname;
        } catch {
          return null;
        }
      })
      .find(path => /^\/blog\/[^/]+$/.test(path ?? ''));
    check(
      '/blog links to a latest article',
      Boolean(latestArticlePath),
      latestArticlePath ?? 'none found'
    );

    if (latestArticlePath) {
      const latestArticle = await load(latestArticlePath);
      if (latestArticle) {
        checkCanonical('latest article', latestArticle, baseUrl, latestArticlePath);
        checkSocialTitles('latest article', latestArticle);
      }
    }
  }

  for (const [path, htmlPromise] of pages) {
    const html = await htmlPromise;
    if (
      html &&
      (path === '/' || path === '/projects' || path === '/systems' || path.startsWith('/projects/'))
    ) {
      checkRetiredLinks(path, html, baseUrl);
    }
  }

  const failures = results.filter(result => !result.ok);
  for (const result of results) {
    const state = result.ok ? 'PASS' : 'FAIL';
    const detail = result.detail ? ` — ${result.detail}` : '';
    console.log(`${state} ${result.name}${detail}`);
  }
  console.log(
    `\nPortfolio verifier: ${results.length - failures.length}/${results.length} checks passed.`
  );

  if (failures.length > 0) {
    console.error(`${failures.length} contract check${failures.length === 1 ? '' : 's'} failed.`);
    process.exitCode = 1;
  }
}

await main();
