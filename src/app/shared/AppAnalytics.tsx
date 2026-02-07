'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const init = {
  faro: false,
  custom: false,
};

export default function AppAnalytics() {
  const pathname = usePathname();
  const lastPathRef = useRef<string | null>(null);

  // 1) Grafana Faro init (once)
  useEffect(() => {
    if (init.faro) return;
    init.faro = true;

    // Don't emit noisy console errors outside real production (local dev, deploy previews, etc.).
    // This keeps the UI clean while still allowing Faro in the final deployed site.
    if (typeof window !== 'undefined' && window.location.hostname !== 'vincent-mogah.netlify.app') {
      return;
    }

    import('@grafana/faro-web-sdk')
      .then(({ getWebInstrumentations, initializeFaro }) => {
        import('@grafana/faro-web-tracing').then(({ TracingInstrumentation }) => {
          try {
            const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;
            if (!faroUrl || typeof faroUrl !== 'string' || faroUrl.trim() === '') return;
            try {
              const parsed = new URL(faroUrl);
              if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return;
            } catch {
              return;
            }

            initializeFaro({
              url: faroUrl,
              app: { name: 'Portfolio', version: '1.0.0', environment: 'production' },
              sessionTracking: { samplingRate: 1, persistent: true },
              instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
            });
          } catch {
            // Best-effort only; do not break page rendering.
          }
        });
      })
      .catch(() => {});
  }, []);

  // 2) Custom analytics init (once) + track page views on path changes
  useEffect(() => {
    import('@/lib/analytics')
      .then(({ analytics }) => {
        if (!init.custom) {
          init.custom = true;
          analytics.initializeTracking();
        }

        const path = pathname || '/';
        if (lastPathRef.current !== path) {
          lastPathRef.current = path;
          analytics.trackPageView(path, document.title);
        }
      })
      .catch(() => {});
  }, [pathname]);

  // 3) Optional integrations: Rocket.Chat + GA scripts (same behavior as Pages Router _app)
  return (
    <>
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
                j.src = rcUrl.replace(/\\/$/, '') + '/rocketchat-livechat.min.js';
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
