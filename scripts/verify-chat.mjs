#!/usr/bin/env node
// Drives the header chat through success, delayed, failed, stalled, abandoned and
// disabled states against a loopback production build. The real Rocket.Chat loader runs
// unchanged; its iframe is a local stub that speaks the same postMessage protocol,
// so no chat session, message or contact submission reaches any server.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index < 0 ? fallback : args[index + 1];
};
for (let index = 0; index < args.length; index += 2) {
  if (
    !['--base-url', '--output', '--expect', '--cases', '--widget'].includes(args[index]) ||
    !args[index + 1]
  )
    throw new Error('Unknown or incomplete option');
}
const origin = new URL(option('--base-url', 'http://127.0.0.1:3100'));
if (origin.protocol !== 'http:' || origin.hostname !== '127.0.0.1' || origin.pathname !== '/')
  throw new Error('Use a literal HTTP loopback origin such as http://127.0.0.1:3100');
const expect = option('--expect', 'enabled');
if (!['enabled', 'disabled'].includes(expect)) throw new Error('--expect is enabled or disabled');
const allCases =
  expect === 'disabled' ? ['disabled'] : ['success', 'delayed', 'failed', 'stalled', 'abandoned'];
const cases = option('--cases', allCases.join(',')).split(',');
if (cases.some(name => !allCases.includes(name)))
  throw new Error(`--cases must be drawn from ${allCases.join(',')}`);
// live loads the production widget for one success pass per viewport. It sends only
// GET requests, so no visitor, chat or message is created; use it sparingly.
const widget = option('--widget', 'stub');
if (!['stub', 'live'].includes(widget)) throw new Error('--widget is stub or live');
if (widget === 'live' && cases.join(',') !== 'success')
  throw new Error('--widget live only runs --cases success');

const runId = new Date().toISOString().replace(/[:.]/g, '-');
const output = resolve(option('--output', `output/verify-chat/${runId}`));
await mkdir(output, { recursive: true });
const report = {
  contract: 'portfolio-verify-chat/v1',
  runId,
  revision: (() => {
    try {
      return execFileSync('git', ['rev-parse', 'HEAD'], {
        encoding: 'utf8',
        cwd: fileURLToPath(new URL('..', import.meta.url)),
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim();
    } catch {
      return 'unknown (not a git checkout)';
    }
  })(),
  origin: origin.origin,
  expect,
  widget,
  checks: [],
  screenshots: [],
};

const OPENING = 'Opening chat';
const STILL_LOADING = 'Chat is still loading';
const FAILED = "Chat couldn't load";
// The app shows its slow-loading notice 10 seconds after the click.
const SLOW_WAIT_MS = 12_000;

const stubPage = readyDelay => `<!doctype html>
<html><head><meta charset="utf-8"><title>Chat stub</title><style>
body{margin:0;font:14px system-ui,sans-serif;background:transparent;color-scheme:light}
#launcher{position:fixed;right:8px;bottom:8px;width:70px;height:70px;border-radius:50%;border:0;background:#c1272d;color:#fff}
#panel{display:none;position:fixed;inset:8px;background:#fff;color:#111;border:1px solid #bbb;border-radius:8px;padding:12px}
body.open #panel{display:block}body.open #launcher{display:none}
</style></head><body>
<button id="launcher" aria-label="Rocket.Chat">Chat</button>
<div id="panel" role="region" aria-label="Stub chat"><p>Stub chat window</p><button id="min">Minimize chat</button></div>
<script>
const send = fn => parent.postMessage({ src: 'rocketchat', fn }, '*');
const show = open => { document.body.classList.toggle('open', open); send(open ? 'openWidget' : 'minimizeWindow'); };
addEventListener('message', e => {
  if (!e.data || e.data.src !== 'rocketchat') return;
  if (e.data.fn === 'maximizeWidget') { window.maximizeCount = (window.maximizeCount || 0) + 1; show(true); }
  if (e.data.fn === 'minimizeWidget') show(false);
});
document.getElementById('launcher').onclick = () => show(true);
document.getElementById('min').onclick = () => show(false);
// -1 never reports ready on its own; the harness can still call sendReady().
window.sendReady = () => send('ready');
if (${readyDelay} >= 0) setTimeout(window.sendReady, ${readyDelay});
</script></body></html>`;

const scenarios = {
  success: { scriptDelay: 0, readyDelay: 0 },
  delayed: { scriptDelay: 1500, readyDelay: 3000 },
  failed: { scriptDelay: 1500, abortScript: true },
  stalled: { scriptDelay: 0, readyDelay: -1 },
  // The harness reports ready itself, after the reader has followed the notice to /contact.
  abandoned: { scriptDelay: 0, readyDelay: -1, mobileOnly: true },
  disabled: {},
};

let loaderBody;
const trafficLog = [];
let browser;
const check = (context, name, pass, detail = '') => {
  report.checks.push({ context, name, pass: Boolean(pass), detail: String(detail) });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${context} ${name}${detail ? ` (${detail})` : ''}`);
};

try {
  browser = await chromium.launch({ headless: true });
  report.browserVersion = browser.version();
  for (const caseName of cases) {
    const scenario = scenarios[caseName];
    for (const viewport of [
      { width: 390, height: 844, label: 'mobile' },
      { width: 1280, height: 800, label: 'desktop' },
    ].filter(item => !scenario.mobileOnly || item.label === 'mobile')) {
      for (const theme of widget === 'live' ? ['light'] : ['light', 'dark']) {
        const ctx = `${caseName}/${viewport.label}/${theme}`;
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        const traffic = { loader: 0, chatDocuments: 0, blocked: 0, blockedWrites: 0 };
        await context.route('**/*', async route => {
          const request = route.request();
          const url = new URL(request.url());
          if (url.origin === origin.origin) {
            if (url.pathname === '/api/contact' && !['GET', 'HEAD'].includes(request.method()))
              return route.abort();
            return route.continue();
          }
          if (widget === 'live') {
            if (url.pathname.endsWith('/rocketchat-livechat.min.js')) traffic.loader += 1;
            if (['GET', 'HEAD', 'OPTIONS'].includes(request.method())) return route.continue();
            traffic.blockedWrites += 1;
            (traffic.writeTargets ??= []).push(`${request.method()} ${url.origin}${url.pathname}`);
            return route.abort();
          }
          if (url.pathname.endsWith('/rocketchat-livechat.min.js')) {
            traffic.loader += 1;
            if (scenario.scriptDelay)
              await new Promise(done => setTimeout(done, scenario.scriptDelay));
            if (scenario.abortScript) return route.abort('failed');
            if (!loaderBody) loaderBody = await (await route.fetch()).text();
            return route.fulfill({ contentType: 'application/javascript', body: loaderBody });
          }
          if (request.frame().parentFrame() && request.resourceType() === 'document') {
            traffic.chatDocuments += 1;
            return route.fulfill({ contentType: 'text/html', body: stubPage(scenario.readyDelay) });
          }
          // Analytics, fonts and every other third party stay offline in this harness.
          traffic.blocked += 1;
          return route.abort();
        });
        const page = await context.newPage();
        page.setDefaultTimeout(10_000);
        const pageErrors = [];
        const widgetErrors = [];
        page.on('pageerror', error => {
          const stack = String(error.stack ?? error.message);
          // Errors raised inside the chat iframe's own bundles belong to the third-party widget.
          // In live mode they follow from the page.visited POST this harness blocks.
          const source = stack.match(/https?:\/\/[^\s)]+/)?.[0] ?? '';
          const inWidget =
            source &&
            new URL(source).origin !== origin.origin &&
            !source.includes('/rocketchat-livechat.min.js');
          (inWidget ? widgetErrors : pageErrors).push(stack.split('\n')[0].slice(0, 200));
        });
        await page.addInitScript(theme => localStorage.setItem('theme', theme), theme);

        const chatButton = page.getByRole('button', { name: 'Open chat', exact: true });
        const notice = page.locator('[data-chat-notice]');
        const widgetState = () =>
          page.evaluate(() => document.querySelector('.rocketchat-widget')?.dataset.state ?? null);
        const status = () => page.evaluate(() => window.__portfolioChatStatus ?? null);
        const shot = async name => {
          const file = `${caseName}-${viewport.label}-${theme}-${name}.png`;
          await page.screenshot({ path: resolve(output, file), animations: 'disabled' });
          report.screenshots.push(file);
        };
        const noOverflow = async () =>
          check(
            ctx,
            'no horizontal overflow',
            (await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)) <= 0
          );
        // Record every notice text seen while waiting, so a premature failure claim cannot hide.
        const watchNotice = () =>
          page.evaluate(() => {
            window.__seenNotices = [];
            const seen = () => {
              const text = document.querySelector('[data-chat-notice]')?.textContent?.trim();
              if (text && !window.__seenNotices.includes(text)) window.__seenNotices.push(text);
            };
            new MutationObserver(seen).observe(document.body, {
              subtree: true,
              childList: true,
              characterData: true,
            });
          });
        const seenNotices = () => page.evaluate(() => window.__seenNotices);

        try {
          await page.goto(new URL('/', origin).href, { waitUntil: 'domcontentloaded' });
          await page.locator('main h1').waitFor();
          const mobile = viewport.label === 'mobile';

          if (caseName === 'disabled') {
            await page.waitForLoadState('networkidle');
            check(ctx, 'no chat button', (await chatButton.count()) === 0);
            check(ctx, 'no chat loader requested', traffic.loader === 0);
            check(ctx, 'no widget', (await widgetState()) === null);
            check(ctx, 'no chat status global', (await status()) === null);
            await shot('page');
          } else if (!mobile) {
            // Desktop has no header chat button; the native launcher opens chat when it exists.
            check(ctx, 'header chat button hidden', !(await chatButton.isVisible()));
            if (caseName === 'failed') {
              await page.waitForFunction(() => window.__portfolioChatStatus === 'failed');
              check(ctx, 'no widget after failure', (await widgetState()) === null);
              check(ctx, 'no chat notice', (await notice.count()) === 0);
              check(
                ctx,
                'contact link stays in navigation',
                await page
                  .getByRole('navigation', { name: 'Primary' })
                  .getByRole('link', { name: 'Contact' })
                  .isVisible()
              );
              await shot('failed');
            } else if (caseName === 'stalled') {
              await page.locator('#rocketchat-iframe').waitFor({ state: 'attached' });
              await page.waitForTimeout(1000);
              check(ctx, 'status stays loaded without ready', (await status()) === 'loaded');
              check(ctx, 'no chat notice', (await notice.count()) === 0);
              await shot('stalled');
            } else {
              await page.waitForFunction(() => window.__portfolioChatStatus === 'ready', null, {
                timeout: 8000,
              });
              const launcher = page
                .frameLocator('#rocketchat-iframe')
                .getByRole('button', { name: 'Rocket.Chat', exact: true });
              await launcher.click();
              await page.waitForFunction(
                () => document.querySelector('.rocketchat-widget')?.dataset.state === 'opened'
              );
              check(ctx, 'native launcher opens chat', true);
              check(ctx, 'no chat notice', (await notice.count()) === 0);
              await shot('open');
            }
          } else if (caseName === 'success') {
            await page.waitForFunction(() => window.__portfolioChatStatus === 'ready', null, {
              timeout: 8000,
            });
            check(ctx, 'status reaches ready', true);
            check(
              ctx,
              'collapsed launcher hidden on mobile',
              await page.evaluate(
                () =>
                  getComputedStyle(document.querySelector('.rocketchat-widget')).visibility ===
                  'hidden'
              )
            );
            await watchNotice();
            await chatButton.focus();
            await page.keyboard.press('Enter');
            await page.waitForFunction(
              () => document.querySelector('.rocketchat-widget')?.dataset.state === 'opened',
              null,
              { timeout: 3000 }
            );
            check(ctx, 'keyboard Enter opens chat', true);
            await page.waitForTimeout(600);
            check(
              ctx,
              'no notice for a ready widget',
              (await seenNotices()).length === 0,
              (await seenNotices()).join(' | ')
            );
            await shot('open');
            // The production widget and the stub both label this control "Minimize chat".
            await page
              .frameLocator('#rocketchat-iframe')
              .getByRole('button', { name: 'Minimize chat' })
              .click();
            await page.waitForFunction(
              () => document.querySelector('.rocketchat-widget')?.dataset.state === 'closed'
            );
            check(ctx, 'chat minimizes', true);
            check(
              ctx,
              'chat button idle after open',
              (await chatButton.getAttribute('aria-busy')) !== 'true'
            );
            await page.getByRole('button', { name: 'Open menu' }).click();
            await page.getByRole('dialog', { name: 'Navigation' }).waitFor();
            check(
              ctx,
              'menu hides chat frame',
              await page.evaluate(
                () =>
                  getComputedStyle(document.querySelector('#rocketchat-iframe')).visibility ===
                  'hidden'
              )
            );
            await shot('menu');
            await page.keyboard.press('Escape');
            await page.getByRole('dialog', { name: 'Navigation' }).waitFor({ state: 'detached' });
            check(
              ctx,
              'Escape closes menu and restores focus',
              await page.evaluate(
                () => document.activeElement?.getAttribute('aria-label') === 'Open menu'
              )
            );
            await noOverflow();
          } else if (caseName === 'delayed') {
            await page.waitForFunction(() => window.__portfolioChatStatus === 'loading');
            await watchNotice();
            await chatButton.click();
            check(
              ctx,
              'button reports busy',
              (await chatButton.getAttribute('aria-busy')) === 'true'
            );
            await notice.getByText(OPENING).waitFor({ timeout: 2000 });
            check(ctx, 'loading notice shown', true);
            check(
              ctx,
              'live region announces loading as plain text',
              (await page.locator('[role="status"]', { hasText: OPENING }).count()) === 1 &&
                (await page.locator('[role="status"] :is(a, button)').count()) === 0
            );
            await noOverflow();
            await shot('opening');
            await chatButton.click(); // A second tap while waiting must not queue another open.
            await page.waitForFunction(
              () => document.querySelector('.rocketchat-widget')?.dataset.state === 'opened',
              null,
              { timeout: 8000 }
            );
            check(ctx, 'chat opens after delayed initialization', true);
            await page.waitForTimeout(300);
            check(ctx, 'notice clears after open', (await notice.count()) === 0);
            const seen = await seenNotices();
            check(
              ctx,
              'no failure or slow claim during normal initialization',
              seen.every(text => !text.includes(FAILED) && !text.includes(STILL_LOADING)),
              seen.join(' | ')
            );
            check(ctx, 'loader requested once', traffic.loader === 1, traffic.loader);
            const chatFrame = page
              .frames()
              .find(
                frame => frame.parentFrame() && new URL(frame.url()).pathname.endsWith('/livechat')
              );
            const opens = await chatFrame.evaluate(() => window.maximizeCount ?? 0);
            check(ctx, 'two taps send one maximizeWidget', opens === 1, opens);
            await shot('open');
          } else if (caseName === 'failed') {
            await page.waitForFunction(() => window.__portfolioChatStatus === 'loading');
            await chatButton.click();
            await notice.getByText(OPENING).waitFor({ timeout: 2000 });
            check(ctx, 'loading notice before the failure arrives', true);
            await notice.getByText(FAILED).waitFor({ timeout: 5000 });
            check(ctx, 'failure notice after script error', (await status()) === 'failed');
            const link = notice.getByRole('link', { name: 'contact page' });
            check(
              ctx,
              'contact link points to /contact',
              (await link.getAttribute('href')) === '/contact'
            );
            check(
              ctx,
              'button no longer busy',
              (await chatButton.getAttribute('aria-busy')) !== 'true'
            );
            await noOverflow();
            await shot('failed');
            await chatButton.focus();
            await page.keyboard.press('Tab');
            check(
              ctx,
              'Tab moves from chat button to contact link',
              await page.evaluate(() => document.activeElement?.getAttribute('href') === '/contact')
            );
            await page.keyboard.press('Escape');
            await notice.waitFor({ state: 'detached' });
            check(
              ctx,
              'Escape dismisses and returns focus to chat button',
              await page.evaluate(
                () => document.activeElement?.getAttribute('aria-label') === 'Open chat'
              )
            );
            await page.keyboard.press('Enter');
            await notice.getByText(FAILED).waitFor({ timeout: 1000 });
            check(ctx, 'known failure shows immediately on the next tap', true);
            check(ctx, 'no retry of the failed loader', traffic.loader === 1, traffic.loader);
            check(
              ctx,
              'live region announces the failure as plain text',
              (await page.locator('[role="status"]', { hasText: FAILED }).count()) === 1 &&
                (await page.locator('[role="status"] :is(a, button)').count()) === 0
            );
            await page.keyboard.press('Escape'); // Focus is still on the chat button.
            await notice.waitFor({ state: 'detached' });
            check(ctx, 'Escape on the chat button dismisses', true);
            await chatButton.click();
            await notice.getByRole('button', { name: 'Dismiss' }).click();
            check(ctx, 'Dismiss button closes notice', (await notice.count()) === 0);
            await chatButton.click();
            await notice.getByRole('link', { name: 'contact page' }).click();
            await page.waitForURL(url => new URL(url).pathname === '/contact');
            await page.locator('main h1').waitFor();
            check(ctx, 'contact link navigates to /contact', true);
            check(ctx, 'notice closes after navigation', (await notice.count()) === 0);
            await shot('contact');
          } else if (caseName === 'abandoned') {
            await page.locator('#rocketchat-iframe').waitFor({ state: 'attached' });
            await chatButton.click();
            await notice.getByText(OPENING).waitFor({ timeout: 2000 });
            await page.locator('main a[href="/contact"]').first().click();
            await page.waitForURL(url => new URL(url).pathname === '/contact');
            const withdrawn = await notice
              .waitFor({ state: 'detached', timeout: 2000 })
              .then(() => true)
              .catch(() => false);
            check(
              ctx,
              'navigating while opening withdraws the request',
              withdrawn && (await chatButton.getAttribute('aria-busy')) !== 'true'
            );
            await page.locator('header a[href="/"]').click();
            await page.waitForURL(url => new URL(url).pathname === '/');
            await chatButton.click();
            await notice.getByText(STILL_LOADING).waitFor({ timeout: SLOW_WAIT_MS });
            await notice.getByRole('link', { name: 'contact page' }).click();
            await page.waitForURL(url => new URL(url).pathname === '/contact');
            await page
              .frames()
              .find(
                frame => frame.parentFrame() && new URL(frame.url()).pathname.endsWith('/livechat')
              )
              .evaluate(() => window.sendReady());
            await page.waitForFunction(() => window.__portfolioChatStatus === 'ready', null, {
              timeout: 2000,
            });
            await page.waitForTimeout(1500);
            const state = await widgetState();
            check(
              ctx,
              'chat stays closed after the reader chose /contact',
              state === 'closed',
              state
            );
            check(
              ctx,
              'chat button idle on /contact',
              (await chatButton.getAttribute('aria-busy')) !== 'true'
            );
            await shot('contact-after-ready');
          } else if (caseName === 'stalled') {
            await page.locator('#rocketchat-iframe').waitFor({ state: 'attached' });
            await watchNotice();
            await chatButton.click();
            await notice.getByText(OPENING).waitFor({ timeout: 2000 });
            await page.waitForTimeout(5000);
            check(
              ctx,
              'still opening at 5 seconds',
              (await notice.textContent()).includes(OPENING)
            );
            await notice.getByText(STILL_LOADING).waitFor({ timeout: SLOW_WAIT_MS });
            check(ctx, 'slow notice after the widget never reports ready', true);
            check(
              ctx,
              'slow notice offers /contact',
              (await notice.getByRole('link', { name: 'contact page' }).getAttribute('href')) ===
                '/contact'
            );
            const seen = await seenNotices();
            check(
              ctx,
              'never claims chat failed',
              seen.every(text => !text.includes(FAILED)),
              seen.join(' | ')
            );
            check(ctx, 'loader requested once', traffic.loader === 1, traffic.loader);
            await noOverflow();
            await shot('slow');
          }
        } catch (error) {
          // Record the broken step as a failure and keep driving the remaining states.
          check(ctx, 'case ran to completion', false, String(error.message).split('\n')[0]);
          await shot('error').catch(() => {});
        }
        check(ctx, 'no page errors', pageErrors.length === 0, pageErrors.join(' | '));
        trafficLog.push({ context: ctx, ...traffic, widgetErrors });
        await context.close();
      }
    }
  }
} finally {
  await browser?.close();
  report.finishedAt = new Date().toISOString();
  report.traffic = trafficLog;
  report.passed = report.checks.length > 0 && report.checks.every(item => item.pass);
  await writeFile(resolve(output, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  console.log(
    `${report.passed ? 'PASSED' : 'FAILED'} ${report.checks.filter(c => c.pass).length}/${report.checks.length} checks; evidence in ${output}`
  );
}
process.exit(report.passed ? 0 : 1);
