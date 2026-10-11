# Chat opens

**User path.** On a phone (below 768px) the reader taps the chat icon in the
header. The collapsed floating launcher is hidden on phones (issue #107), so
the header button is the only way in. On desktop the header has no chat button
and the reader clicks the widget's own launcher in the bottom corner.

**Harness.** Case `success`. Mobile waits for `window.__portfolioChatStatus ===
'ready'`, focuses the header button and presses Enter, then clicks the widget's
`Minimize chat` button. It opens the mobile menu and presses Escape. Desktop
clicks the frame button named `Rocket.Chat`.

**Success.** `.rocketchat-widget[data-state="opened"]` within 3 seconds with no
notice shown. After minimizing, the state is `closed` and the launcher is
hidden again. The open menu hides `#rocketchat-iframe`, and Escape returns
focus to `Open menu`.

**Prerequisites.** Chat-enabled build. Live mode also needs the production
widget to be reachable.
