import { AppProps } from 'next/app';
import Theme from '../styles/theme';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/GlobalStyles.css';

// Dynamically import theme toggle to avoid SSR issues
const SimpleThemeToggle = dynamic(
  () => import('../components/ThemeToggle/SimpleThemeToggle'),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Initialize analytics and track page views
  useEffect(() => {
    // Initialize analytics service
    import('../lib/analytics').then(({ analytics }) => {
      analytics.initializeTracking();
      
      // Track initial page view
      analytics.trackPageView(router.asPath, document.title);
    });

    // Track route changes for SPA navigation
    const handleRouteChange = (url: string) => {
      import('../lib/analytics').then(({ analytics }) => {
        analytics.trackPageView(url, document.title);
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.asPath, router.events]);

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
                var rcUrl = u || '${process.env.NEXT_PUBLIC_RC_URL || 'https://canepros.rocket.chat/livechat'}';
                w.RocketChat.url = rcUrl;
                var h = d.getElementsByTagName(s)[0],
                  j = d.createElement(s);
                j.async = true;
                j.src = rcUrl.replace(/\/$/, '') + '/rocketchat-livechat.min.js';
                h.parentNode.insertBefore(j, h);
              })(window, document, 'script', '${process.env.NEXT_PUBLIC_RC_URL || 'https://canepros.rocket.chat/livechat'}');
            `,
          }}
        />
      )}

      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            async
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `,
            }}
          />
        </>
      )}
    </>
  );
}
 