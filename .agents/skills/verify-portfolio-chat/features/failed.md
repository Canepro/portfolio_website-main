# Loader failure

**User path.** The Rocket.Chat loader script cannot be fetched (network error,
blocked host or server outage) and the reader taps the header chat button.

**Harness.** Case `failed`: the loader request is aborted after 1.5 seconds.
Mobile taps while loading, then uses Tab, Escape, Enter, the Dismiss button and
the contact link. Desktop checks that no notice or widget appears and that
Contact stays in the primary navigation.

**Success.** "Opening chat…" changes to "Chat couldn't load. Use the contact
page instead." The `contact page` link points to `/contact` and is the next Tab
stop after the chat button. Escape closes the notice whether focus is on the chat
button or inside the notice, and returns focus to the chat button. Dismiss
closes it too. A later tap shows the failure immediately without
requesting the loader again. Following the link opens `/contact` and clears
the notice.

**Prerequisites.** Chat-enabled build.
