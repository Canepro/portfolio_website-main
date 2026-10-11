---
name: verify-portfolio-chat
description: Verify the portfolio's header chat button and Rocket.Chat widget states (open, delayed, failed, stalled, abandoned, disabled) in a real browser against a loopback production build. Use after changing the chat loader, the header chat button, chat CSS, or the mobile navigation that hides the widget.
---

# Verify portfolio chat

`scripts/verify-chat.mjs` drives headless Chromium against a loopback production
build at 390px and 1280px in light and dark themes. The real Rocket.Chat loader
runs unchanged. In the default stub mode, the loader's iframe is a local page
that speaks the same postMessage protocol (`ready`, `maximizeWidget` →
`openWidget`, `minimizeWindow`), so faults are injected locally and nothing
reaches the chat server except one GET for the public loader script per run.

Only one verification server can use port 3100 at a time. If something already
listens there, find out what it is before starting another; do not stop a
server this run did not start.

## Launch

Chat is a build-time setting, so each mode needs its own build.

```bash
bun install --frozen-lockfile
npx playwright install chromium          # once per machine
NEXT_PUBLIC_RC_ENABLED=1 bun run build   # chat-enabled build
bun run start -- -H 127.0.0.1 -p 3100 &  # note the PID; this run owns it
until curl -s -o /dev/null http://127.0.0.1:3100/; do sleep 1; done
```

For the disabled case, rebuild with `NEXT_PUBLIC_RC_ENABLED` unset and start
the server the same way.

## Doctor

```bash
lsof -nP -iTCP:3100 -sTCP:LISTEN                                 # must show 127.0.0.1:3100 only
curl -s http://127.0.0.1:3100/ | grep -c 'aria-label="Open chat"'  # 1 = chat-enabled build, 0 = disabled
git rev-parse HEAD; cat .next/BUILD_ID                           # the build you are about to drive
```

## Drive

```bash
bun run verify:chat                                   # success, delayed, failed, stalled, abandoned (stub widget)
bun run verify:chat -- --cases failed,stalled         # a subset
bun run verify:chat -- --expect disabled              # against the chat-disabled build
bun run verify:chat -- --cases success --widget live  # one pass against the production widget
```

`--widget live` loads the production widget once per viewport, light theme
only. It lets GET requests through and aborts every write, including the
widget's own `page.visited` POST, so no visitor, chat or message is created.
The widget's resulting "Failed to fetch" errors are recorded under
`widgetErrors` and do not fail the run. Use live mode to confirm the real
widget still posts `ready` and opens; use stub mode for everything else.

The harness never submits the contact form and never sends a chat message.

## Evidence

Each run writes `output/verify-chat/<run-id>/report.json` (revision, checks,
traffic counts, screenshot list) and PNGs named
`<case>-<viewport>-<theme>-<step>.png`. Pass `--output <dir>` to choose the
directory. The run exits non-zero if any check fails. A step that throws is
recorded as `case ran to completion: false` with an `error` screenshot, and the
remaining states still run. Read the screenshots; a passing report does not
show layout or contrast problems.

## Cleanup

Stop only the server PID this run started (`kill <pid>`), then confirm with
`lsof -nP -iTCP:3100 -sTCP:LISTEN` that nothing listens. Keep
`output/verify-chat/`; it is ignored by git and holds the evidence.

## Feature map

| Feature                                                            | File                                           |
| ------------------------------------------------------------------ | ---------------------------------------------- |
| Chat opens from the header (mobile) or native launcher (desktop)   | [features/open.md](features/open.md)           |
| Slow initialization shows a loading state, then opens              | [features/delayed.md](features/delayed.md)     |
| Loader failure shows an unavailable notice with a contact link     | [features/failed.md](features/failed.md)       |
| Widget never reports ready: still-loading notice, no failure claim | [features/stalled.md](features/stalled.md)     |
| Reader leaves for /contact before ready: chat stays closed         | [features/abandoned.md](features/abandoned.md) |
| Chat disabled at build time                                        | [features/disabled.md](features/disabled.md)   |
