#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
const origin = new URL(option('--base-url', 'https://portfolio.canepro.me'));
if (
  origin.username ||
  origin.password ||
  origin.search ||
  origin.hash ||
  origin.pathname !== '/' ||
  !(
    (origin.protocol === 'https:' && origin.hostname === 'portfolio.canepro.me') ||
    (origin.protocol === 'http:' && origin.hostname === '127.0.0.1')
  )
) {
  throw new Error('Use the portfolio HTTPS origin or literal HTTP loopback');
}
for (let index = 0; index < args.length; index += 2) {
  if (!['--base-url', '--output'].includes(args[index]) || !args[index + 1])
    throw new Error('Unknown or incomplete option');
}
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const output = resolve(option('--output', `output/ui-smoke/${runId}`));
await mkdir(dirname(output), { recursive: true });
await mkdir(output); // Never overwrite a previous run or reset its filing budget.
const report = {
  contract: 'portfolio-ui-smoke/v1',
  runId,
  startedAt: new Date().toISOString(),
  revision: execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
    cwd: fileURLToPath(new URL('..', import.meta.url)),
  }).trim(),
  origin: origin.origin,
  browser: 'chromium',
  headless: true,
  states: [],
  candidates: [],
  gaps: [],
  visualReview: 'pending',
};
const browser = await chromium.launch({ headless: true });
report.browserVersion = browser.version();
const describeError = error =>
  `${error.name || 'Error'}: ${String(error.message)
    .replace(/https?:\/\/\S+/g, '<url>')
    .slice(0, 200)}`;
try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    for (const theme of ['dark', 'light']) {
      const context = await browser.newContext({
        viewport,
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      // Preserve native reader telemetry and embedded widgets; never submit contact messages.
      await context.route('**/*', route => {
        const request = route.request();
        if (
          (new URL(request.url()).origin === origin.origin &&
            new URL(request.url()).pathname === '/api/contact' &&
            !['GET', 'HEAD'].includes(request.method())) ||
          (request.isNavigationRequest() &&
            request.frame().parentFrame() === null &&
            new URL(request.url()).origin !== origin.origin)
        )
          return route.abort();
        return route.continue();
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10_000);
      const errors = [];
      const failedResponses = [];
      page.on('pageerror', error => errors.push(describeError(error)));
      page.on('response', response => {
        if (response.status() < 400 || failedResponses.length >= 10) return;
        const url = new URL(response.url());
        failedResponses.push({ status: response.status(), url: `${url.origin}${url.pathname}` });
      });
      await page.addInitScript(
        ({ origin, theme }) => {
          if (location.origin === origin) localStorage.setItem('theme', theme);
        },
        { origin: origin.origin, theme }
      );
      let step = 0;
      const capture = async (name, repro, failure = null) => {
        await page.locator('body').waitFor();
        await page.evaluate(async () => {
          await document.fonts.ready;
          // Trigger lazy media before capturing the full page.
          for (let y = 0; y < document.body.scrollHeight; y += innerHeight) {
            scrollTo(0, y);
            await new Promise(r => requestAnimationFrame(r));
          }
          scrollTo(0, 0);
        });
        await page.waitForTimeout(250);
        // The production widget loads after hydration. An early blank iframe is not a settled UI.
        const menuOpen = await page.evaluate(() =>
          document.body.classList.contains('mobile-nav-open')
        );
        if (origin.hostname === 'portfolio.canepro.me' && !menuOpen) {
          try {
            await page.locator('#rocketchat-iframe').waitFor({ state: 'visible' });
            await page
              .frameLocator('#rocketchat-iframe')
              .getByRole('button', { name: 'Rocket.Chat', exact: true })
              .waitFor();
          } catch {
            errors.push('Embedded chat launcher did not become ready within 10 seconds');
          }
        }
        await page.evaluate(() =>
          Promise.all(
            [...document.images].map(image => {
              if (image.complete || image.getBoundingClientRect().width === 0) return;
              return new Promise(resolve => {
                const timer = setTimeout(done, 10_000);
                function done() {
                  clearTimeout(timer);
                  image.removeEventListener('load', done);
                  image.removeEventListener('error', done);
                  resolve();
                }
                image.addEventListener('load', done, { once: true });
                image.addEventListener('error', done, { once: true });
              });
            })
          )
        );
        const activeTheme = await page.evaluate(() =>
          document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
        const screenshot = `${viewport.width}-${activeTheme}-${++step}-${name}.png`;
        await page.screenshot({
          path: resolve(output, screenshot),
          fullPage: true,
          animations: 'disabled',
        });
        const metrics = await page.evaluate(() => ({
          heading: document.querySelector('main h1')?.textContent?.trim() ?? '',
          overflow: document.documentElement.scrollWidth - innerWidth,
          brokenImages: [...document.images].filter(
            i => i.getBoundingClientRect().width > 0 && (!i.complete || !i.naturalWidth)
          ).length,
        }));
        const state = {
          name,
          url: page.url(),
          viewport,
          theme: activeTheme,
          screenshot,
          repro,
          metrics,
          failedResponses: failedResponses.splice(0),
        };
        report.states.push(state);
        const add = (code, title, observed, target) =>
          report.candidates.push({
            code,
            title,
            observed,
            target,
            expected: 'The reader can use this page without a visible or interaction failure.',
            ...state,
          });
        if (failure) add('journey', `${name} journey failed`, failure, name);
        if (!metrics.heading)
          add('heading', `${name} has no main heading`, 'main h1 is absent or empty', 'main h1');
        if (metrics.overflow > 2)
          add(
            'overflow',
            `${name} overflows horizontally`,
            `${metrics.overflow}px wider than viewport`,
            'html'
          );
        if (metrics.brokenImages)
          add(
            'image',
            `${name} shows broken images`,
            `${metrics.brokenImages} visible images failed or did not load within 10 seconds`,
            'img'
          );
        if (errors.length)
          add(
            'runtime',
            `${name} raised a browser error`,
            [...new Set(errors.splice(0))].join(', '),
            'browser runtime'
          );
      };
      const journey = async (name, repro, action) => {
        try {
          try {
            await action();
          } catch {
            errors.length = 0;
            failedResponses.length = 0;
            await action();
          }
          await capture(name, repro);
        } catch (error) {
          // Selector/action names are controlled; avoid retaining arbitrary page content in error logs.
          await capture(name, repro, describeError(error));
        }
      };
      const load = async path => {
        const response = await page.goto(new URL(path, origin).href, {
          waitUntil: 'domcontentloaded',
        });
        if (!response?.ok())
          throw new Error(`Document request returned ${response?.status() ?? 'no response'}`);
        await page.locator('main h1').waitFor();
      };
      await journey('home', ['Open /'], () => load('/'));
      await journey('projects', ['Open /projects'], () => load('/projects'));
      await journey(
        'case-study',
        ['Open /projects', 'Click the first case-study heading'],
        async () => {
          await load('/projects');
          const link = page.locator('main a[href^="/projects/"]').first();
          await link.click();
          await page.waitForURL(/\/projects\/[^/]+$/);
          await page.locator('main h1').waitFor();
        }
      );
      await journey('blog', ['Open /blog'], () => load('/blog'));
      await journey(
        'topic-filter',
        ['Open /blog', 'Select the first topic', 'Check the URL and article list'],
        async () => {
          await load('/blog');
          const select = page.getByLabel('Topic', { exact: true });
          const value = await select.locator('option').nth(1).getAttribute('value');
          if (!value) throw new Error('No topic option');
          await select.selectOption(value);
          await page.waitForURL(url => url.searchParams.get('tag') === value);
          await page.locator('main h2 a[href^="/blog/"]').first().waitFor();
        }
      );
      await journey('article', ['Open /blog', 'Click the first article heading'], async () => {
        await load('/blog');
        await page.locator('main h2 a[href^="/blog/"]').first().click();
        await page.waitForURL(/\/blog\/[^/?]+$/);
        await page.locator('main h1').waitFor();
      });
      await journey('systems', ['Open /systems'], () => load('/systems'));
      await journey('contact', ['Open /contact (read only; leave the form unsubmitted)'], () =>
        load('/contact')
      );
      await journey(
        'theme-toggle',
        ['Open /', 'Click the theme toggle', 'Verify the button offers the opposite theme'],
        async () => {
          await load('/');
          await page
            .getByRole('button', { name: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` })
            .click();
          await page.getByRole('button', { name: `Switch to ${theme} mode` }).waitFor();
        }
      );
      if (viewport.width < 768) {
        await journey('mobile-menu', ['Open /', 'Open menu', 'Inspect navigation'], async () => {
          await load('/');
          await page.getByRole('button', { name: 'Open menu', exact: true }).click();
          await page.getByRole('dialog', { name: 'Navigation' }).waitFor();
        });
        await journey(
          'menu-navigation',
          ['Open /', 'Open menu', 'Click Writing', 'Verify menu closes and /blog opens'],
          async () => {
            await load('/');
            await page.getByRole('button', { name: 'Open menu', exact: true }).click();
            await page
              .getByRole('navigation', { name: 'Mobile', exact: true })
              .getByRole('link', { name: 'Writing' })
              .click();
            await page.waitForURL(url => url.pathname === '/blog');
            await page.getByRole('dialog').waitFor({ state: 'hidden' });
            await page.locator('main h1').waitFor();
          }
        );
      }
      await context.close();
    }
  }
} catch (error) {
  report.gaps.push(`${error.name}: evidence collection interrupted`);
  process.exitCode = 1;
} finally {
  await browser.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(resolve(output, 'run.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    JSON.stringify({
      output,
      runId,
      states: report.states.length,
      candidates: report.candidates.length,
      gaps: report.gaps,
    })
  );
}
