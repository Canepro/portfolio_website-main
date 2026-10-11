// Shared between the inline Rocket.Chat loader (AppAnalytics) and the header chat button.
// The loader replaces window.RocketChat once it runs, so readiness lives on its own global.
//   loading: loader script requested
//   loaded:  loader script finished loading; the iframe has not reported ready yet
//   ready:   the chat iframe posted ready; maximizeWidget now opens it at once
//   failed:  the loader script did not load
export type ChatStatus = 'loading' | 'loaded' | 'ready' | 'failed';

export const CHAT_STATUS_EVENT = 'portfolio-chat-status';

type RocketChatQueue = (callback: (this: { maximizeWidget(): void }) => void) => void;

declare global {
  interface Window {
    __portfolioChatStatus?: ChatStatus;
    RocketChat?: RocketChatQueue;
  }
}
