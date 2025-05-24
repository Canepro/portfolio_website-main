import Theme from '../styles/theme';
import { ThemeProvider } from '../contexts/ThemeContext';
import { performanceMonitor } from '../utils/performance';
import { BundleAnalyzer, PerformanceMonitor } from '../utils/bundleOptimization';
import { initDeploymentOptimizations } from '../utils/deploymentOptimization';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.init();

    // Initialize deployment optimizations
    initDeploymentOptimizations();

    // Initialize bundle analysis in development
    if (process.env.NODE_ENV === 'development') {
      const analyzer = new BundleAnalyzer();
      analyzer.trackComponentUsage();
      
      const perfMonitor = new PerformanceMonitor();
      perfMonitor.startMonitoring();
    }

    // Clean up on unmount
    return () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('Bundle Analysis Results:', window.bundleAnalysisData);
      }
    };
  }, []);

  return (
    <>
      <ThemeProvider>
        <Theme>
          <Component {...pageProps} />
        </Theme>
      </ThemeProvider>
    </>
  );
}
 