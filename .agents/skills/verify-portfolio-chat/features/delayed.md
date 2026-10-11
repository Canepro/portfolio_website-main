# Slow initialization

**User path.** The reader taps the header chat button before the widget has
finished loading.

**Harness.** Case `delayed`: the loader script arrives after 1.5 seconds and
the stub iframe reports `ready` 3 seconds after that. The harness taps while
the status is `loading`, then taps again while waiting.

**Success.** The button has `aria-busy="true"`. "Opening chat…" appears inside
the notice and as plain text in the mounted `role="status"`
region, which holds no links or buttons; then the widget opens and the notice
clears. No "still loading" or "couldn't load" text appears at any point, and
the loader is requested exactly once.

**Prerequisites.** Chat-enabled build.
