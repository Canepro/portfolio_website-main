# Chat disabled

**User path.** The site is built without `NEXT_PUBLIC_RC_ENABLED=1`.

**Harness.** `--expect disabled` runs case `disabled` at both viewports and
themes.

**Success.** No `Open chat` button, no loader request, no `.rocketchat-widget`
and no `window.__portfolioChatStatus`.

**Prerequisites.** A build made with `NEXT_PUBLIC_RC_ENABLED` unset.
