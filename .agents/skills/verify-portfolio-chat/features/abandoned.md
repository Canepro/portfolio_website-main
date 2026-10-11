# Reader leaves before the widget is ready

**User path.** The reader taps the header chat button, then moves on before the
widget finishes loading: by following a page link while chat is opening, or by
following the slow notice's contact link.

**Harness.** Case `abandoned` (mobile only): the stub iframe never reports
`ready` on its own. The harness taps, follows the hero Contact link while
"Opening chat…" shows, returns home, taps again, waits for the slow notice and
follows `contact page`. On `/contact` it calls `sendReady()` inside the stub.
No timer decides the order, so a slow runner cannot change it.

**Success.** Navigating closes the notice and clears `aria-busy`. The widget
stays `closed` after `ready` arrives. The app sends `maximizeWidget` only
after `ready` and only while the reader is still waiting, because the loader
would otherwise queue it and open chat over the page the reader chose.

**Prerequisites.** Chat-enabled build.
