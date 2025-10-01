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

  /**
   * Initialize dual analytics system on app startup
   * 
   * This portfolio demonstrates advanced monitoring capabilities through two complementary systems:
   * 1. Grafana Faro - Professional Real User Monitoring (RUM) for Core Web Vitals, errors, and user journeys
   * 2. Custom Analytics - Portfolio-specific metrics for DevOps demonstration (demo clicks, engagement)
   * 
   * Benefits:
   * - Professional RUM provides business insights and user experience data
   * - Custom metrics showcase Prometheus/Grafana engineering skills
   * - Persistent session tracking captures complete user journeys
   * - Error monitoring enables proactive issue resolution
   */
  useEffect(() => {
    // ========================================
    // 1. GRAFANA FARO - PROFESSIONAL RUM SYSTEM
    // ========================================
    // Real User Monitoring for Core Web Vitals, performance, and user behavior analytics
    import('@grafana/faro-web-sdk').then(({ getWebInstrumentations, initializeFaro }) => {
      import('@grafana/faro-web-tracing').then(({ TracingInstrumentation }) => {
        try {
          initializeFaro({
            // Grafana Cloud Frontend Observability collector endpoint
            url: 'https://faro-collector-prod-gb-south-1.grafana.net/collect/2020e2e525a709e9970641f056cb0fec',
            
            // Application identification for Grafana Cloud dashboard
            app: {
              name: 'Portfolio',
              version: '1.0.0',
              environment: 'production'
            },
            
            // Session tracking configuration for comprehensive user journey analysis
            sessionTracking: {
              samplingRate: 1,        // Track 100% of sessions (adjust for high-traffic sites)
              persistent: true        // Persist sessions across browser sessions
            },
            
            // Instrumentation packages for comprehensive monitoring
            instrumentations: [
              // Core web instrumentations: DOM events, errors, performance metrics
              ...getWebInstrumentations(),
              
              // HTTP request tracing for end-to-end visibility
              new TracingInstrumentation(),
            ],
          });
          console.log('✅ Faro Frontend Observability initialized - Professional RUM active');
        } catch (error) {
          console.warn('Faro initialization failed:', error);
        }
      });
    }).catch((error) => {
      console.warn('Faro packages not available:', error);
    });

    // ========================================
    // 2. CUSTOM ANALYTICS - DEVOPS DEMONSTRATION
    // ========================================
    // Portfolio-specific metrics to showcase Prometheus/Grafana engineering skills
    import('../lib/analytics').then(({ analytics }) => {
      // Initialize performance tracking and custom metrics collection
      analytics.initializeTracking();
      
      // Track initial page view for custom portfolio metrics
      analytics.trackPageView(router.asPath, document.title);
    });

    // ========================================
    // 3. SPA NAVIGATION TRACKING
    // ========================================
    // Track route changes for Single Page Application navigation
    // This ensures both analytics systems capture page views during client-side navigation
    const handleRouteChange = (url: string) => {
      import('../lib/analytics').then(({ analytics }) => {
        // Send page view to custom analytics system
        analytics.trackPageView(url, document.title);
        // Note: Faro automatically tracks SPA navigation through web instrumentations
      });
    };

    // Register Next.js router event listeners
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Cleanup function to prevent memory leaks
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
 