'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CHAT_STATUS_EVENT } from '@/lib/chat';

// "Opening chat" appears only when opening is not instant. The slow notice is not a
// failure claim: chat still opens if the widget becomes ready while the reader waits.
const OPENING_NOTICE_MS = 400;
const SLOW_NOTICE_MS = 10_000;

// requested -> opening -> slow while waiting for the widget; failed when the loader script errored.
type Phase = 'idle' | 'requested' | 'opening' | 'slow' | 'failed';

function widgetOpened() {
  return document.querySelector<HTMLElement>('.rocketchat-widget')?.dataset.state === 'opened';
}

export default function ChatButton() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>('idle');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waiting = phase === 'requested' || phase === 'opening' || phase === 'slow';

  // Navigating withdraws a pending open and closes the notice.
  useEffect(() => {
    setPhase('idle');
  }, [pathname]);

  useEffect(() => {
    if (!waiting) return;
    let requested = false;
    const update = () => {
      const status = window.__portfolioChatStatus;
      if (status === 'failed') {
        setPhase('failed');
        return;
      }
      // Wait for ready instead of letting the loader queue the call: a queued open cannot be
      // withdrawn, and would open chat after the reader dismissed the notice or left for /contact.
      if (!requested && status === 'ready' && window.RocketChat) {
        requested = true;
        window.RocketChat(function () {
          this.maximizeWidget();
        });
      }
      if (requested && widgetOpened()) setPhase('idle');
    };
    const observer = new MutationObserver(update);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributeFilter: ['data-state'],
    });
    window.addEventListener(CHAT_STATUS_EVENT, update);
    const openingTimer = window.setTimeout(
      () => setPhase(current => (current === 'requested' ? 'opening' : current)),
      OPENING_NOTICE_MS
    );
    const slowTimer = window.setTimeout(
      () =>
        setPhase(current => (current === 'requested' || current === 'opening' ? 'slow' : current)),
      SLOW_NOTICE_MS
    );
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener(CHAT_STATUS_EVENT, update);
      window.clearTimeout(openingTimer);
      window.clearTimeout(slowTimer);
    };
  }, [waiting]);

  const openChat = () => {
    // Already waiting for this tap's open; another tap changes nothing.
    if (waiting) return;
    setPhase(window.__portfolioChatStatus === 'failed' ? 'failed' : 'requested');
  };
  const dismiss = () => {
    setPhase('idle');
    buttonRef.current?.focus();
  };
  const announcement =
    phase === 'opening'
      ? 'Opening chat…'
      : phase === 'slow'
        ? 'Chat is still loading. Keep waiting, or use the contact page.'
        : phase === 'failed'
          ? "Chat couldn't load. Use the contact page instead."
          : '';
  // Escape closes the notice from the chat button or from inside the notice.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !announcement) return;
    event.preventDefault();
    dismiss();
  };

  const contactLink = (
    <Link
      href="/contact"
      onClick={() => setPhase('idle')}
      className="font-medium text-[color:var(--color-accent)] underline underline-offset-4 hover:decoration-2"
    >
      contact page
    </Link>
  );
  const message =
    phase === 'opening' ? (
      <>Opening chat&hellip;</>
    ) : phase === 'slow' ? (
      <>Chat is still loading. Keep waiting, or use the {contactLink}.</>
    ) : phase === 'failed' ? (
      <>Chat couldn&apos;t load. Use the {contactLink} instead.</>
    ) : null;

  return (
    <>
      <Button
        ref={buttonRef}
        type="button"
        variant="ghost"
        size="icon"
        className="hover:bg-[color:var(--color-bg-secondary)] md:hidden"
        aria-label="Open chat"
        title="Open chat"
        aria-busy={waiting || undefined}
        onClick={openChat}
        onKeyDown={onKeyDown}
      >
        {waiting ? (
          <Loader2 className="h-5 w-5 motion-safe:animate-spin" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>
      {/* Text-only live region, kept mounted so each change is announced; the link and
          Dismiss button stay outside it. */}
      <p role="status" className="sr-only">
        {announcement}
      </p>
      {message ? (
        <div
          data-chat-notice=""
          onKeyDown={onKeyDown}
          className="absolute right-4 top-full mt-2 flex w-72 max-w-[calc(100vw-2rem)] items-start gap-2 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] py-3 pl-4 pr-2 text-sm text-[color:var(--color-text-primary)] shadow-lg md:hidden"
        >
          <p className="flex-1 py-2 pr-2">{message}</p>
          {phase === 'slow' || phase === 'failed' ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 hover:bg-[color:var(--color-bg-primary)]"
              aria-label="Dismiss"
              onClick={dismiss}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
