import { AppProps } from 'next/app';
import Theme from '../styles/theme';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import '../styles/GlobalStyles.css';

// Dynamically import theme toggle to avoid SSR issues
const SimpleThemeToggle = dynamic(
  () => import('../components/ThemeToggle/SimpleThemeToggle'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Theme>
        <Component {...pageProps} />
        <SimpleThemeToggle />
      </Theme>
      {process.env.NEXT_PUBLIC_RC_ENABLED === '1' && (
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
      )}

      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-setup"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  anonymize_ip: true,
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
 