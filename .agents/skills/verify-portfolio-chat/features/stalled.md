# Widget never reports ready

**User path.** The loader script runs but the chat iframe never becomes ready
(the chat server is slow or broken), and the reader taps the header chat
button.

**Harness.** Case `stalled`: the stub iframe never posts `ready`. The harness
taps, checks the notice at 5 seconds, then waits up to 12 seconds.

**Success.** "Opening chat…" stays up for at least 5 seconds, then "Chat is
still loading. Keep waiting, or use the contact page." appears about 10 seconds
after the tap, with the `/contact` link. The notice never says chat failed,
because a slow widget may still open. Desktop shows no notice and the status
stays `loaded`.

**Prerequisites.** Chat-enabled build.
