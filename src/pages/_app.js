import Theme from '../styles/theme';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import '../styles/GlobalStyles.css';

// Dynamically import theme toggle to avoid SSR issues
const SimpleThemeToggle = dynamic(
  () => import('../components/ThemeToggle/SimpleThemeToggle'),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Theme>
        <Component {...pageProps} />
        <SimpleThemeToggle />
      </Theme>
      <Script
        id="rocket-chat"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w, d, s, u) {
              w.RocketChat = function(c) { w.RocketChat._.push(c) };
              w.RocketChat._ = [];
              w.RocketChat.url = u;
              var h = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
              j.async = true;
              j.src = 'https://canepros.rocket.chat/livechat/rocketchat-livechat.min.js?_=201903270000';
              h.parentNode.insertBefore(j, h);
            })(window, document, 'script', 'https://canepros.rocket.chat/livechat');
          `,
        }}
      />
    </>
  );
}
 