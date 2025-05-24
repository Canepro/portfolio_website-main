import { useState, useEffect } from 'react';

// Bundle size analysis utilities
export const BundleAnalyzer = {
  // Track component render counts
  renderCounts: new Map(),
  
  // Track bundle sizes
  bundleSizes: {
    initial: 0,
    total: 0,
    chunks: new Map()
  },

  // Performance metrics
  metrics: {
    renderTime: 0,
    bundleLoadTime: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0
  },

  // Track component usage
  trackComponent: (componentName) => {
    const current = BundleAnalyzer.renderCounts.get(componentName) || 0;
    BundleAnalyzer.renderCounts.set(componentName, current + 1);
  },

  // Analyze bundle size
  analyzeBundleSize: () => {
    if (typeof window === 'undefined') return;

    // Get performance entries for script loading
    const scriptEntries = performance.getEntriesByType('resource')
      .filter(entry => entry.name.includes('.js'));

    let totalSize = 0;
    scriptEntries.forEach(entry => {
      if (entry.transferSize) {
        totalSize += entry.transferSize;
        const chunkName = entry.name.split('/').pop();
        BundleAnalyzer.bundleSizes.chunks.set(chunkName, entry.transferSize);
      }
    });

    BundleAnalyzer.bundleSizes.total = totalSize;
    return totalSize;
  },

  // Get optimization recommendations
  getOptimizationRecommendations: () => {
    const recommendations = [];
    const totalSize = BundleAnalyzer.bundleSizes.total;

    // Check bundle size
    if (totalSize > 500000) { // 500KB
      recommendations.push({
        type: 'bundle-size',
        severity: 'high',
        message: `Bundle size (${Math.round(totalSize / 1024)}KB) is larger than recommended (500KB)`,
        suggestions: [
          'Implement code splitting',
          'Use dynamic imports for non-critical components',
          'Remove unused dependencies',
          'Optimize images and assets'
        ]
      });
    }

    // Check unused components
    const unusedComponents = [];
    BundleAnalyzer.renderCounts.forEach((count, componentName) => {
      if (count === 0) {
        unusedComponents.push(componentName);
      }
    });

    if (unusedComponents.length > 0) {
      recommendations.push({
        type: 'unused-components',
        severity: 'medium',
        message: `Found ${unusedComponents.length} unused components`,
        suggestions: [
          'Remove unused components',
          'Use tree shaking',
          'Audit component dependencies'
        ],
        components: unusedComponents
      });
    }

    // Check render performance
    if (BundleAnalyzer.metrics.renderTime > 100) {
      recommendations.push({
        type: 'render-performance',
        severity: 'medium',
        message: `Average render time (${BundleAnalyzer.metrics.renderTime}ms) exceeds recommended threshold`,
        suggestions: [
          'Use React.memo for expensive components',
          'Implement virtualization for long lists',
          'Optimize re-renders with useCallback and useMemo',
          'Consider component lazy loading'
        ]
      });
    }

    return recommendations;
  },

  // Generate performance report
  generateReport: () => {
    return {
      bundleSize: BundleAnalyzer.bundleSizes,
      componentUsage: Object.fromEntries(BundleAnalyzer.renderCounts),
      metrics: BundleAnalyzer.metrics,
      recommendations: BundleAnalyzer.getOptimizationRecommendations(),
      timestamp: new Date().toISOString()
    };
  }
};

// Code splitting utilities
export const CodeSplitting = {
  // Dynamic import wrapper with error handling
  dynamicImport: async (importFunction, fallbackComponent = null) => {
    try {
      const module = await importFunction();
      return module.default || module;
    } catch (error) {
      console.error('Dynamic import failed:', error);
      return fallbackComponent;
    }
  },

  // Preload component for better UX
  preloadComponent: (importFunction) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        importFunction().catch(console.error);
      });
    }
  },

  // Route-based code splitting
  createLazyRoute: (importFunction, options = {}) => {
    const { 
      fallback = null, 
      preload = false,
      errorBoundary = true 
    } = options;

    if (preload) {
      CodeSplitting.preloadComponent(importFunction);
    }

    return {
      component: React.lazy(() => 
        CodeSplitting.dynamicImport(importFunction, fallback)
      ),
      errorBoundary
    };
  }
};

// Bundle optimization hook
export const useBundleOptimization = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Wait for page to fully load
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });

      // Analyze bundle
      BundleAnalyzer.analyzeBundleSize();
      
      // Generate report
      const report = BundleAnalyzer.generateReport();
      setAnalysisData(report);
      
    } catch (error) {
      console.error('Bundle analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Run analysis after component mount
    const timer = setTimeout(runAnalysis, 2000);
    return () => clearTimeout(timer);
  }, []);

  return {
    analysisData,
    isAnalyzing,
    runAnalysis,
    trackComponent: BundleAnalyzer.trackComponent
  };
};

// Performance monitoring utilities
export const PerformanceMonitor = {
  // Critical resource loading
  monitorCriticalResources: () => {
    if (typeof window === 'undefined') return;

    const criticalResources = [
      'stylesheet',
      'script',
      'font'
    ];

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (criticalResources.includes(entry.initiatorType)) {
          console.log(`Critical resource loaded: ${entry.name} (${entry.duration}ms)`);
          
          // Track slow loading resources
          if (entry.duration > 1000) {
            console.warn(`Slow resource detected: ${entry.name} took ${entry.duration}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
    return observer;
  },

  // Memory usage monitoring
  monitorMemoryUsage: () => {
    if (typeof window === 'undefined' || !performance.memory) return;

    const memoryInfo = performance.memory;
    const used = Math.round(memoryInfo.usedJSHeapSize / 1048576);
    const total = Math.round(memoryInfo.totalJSHeapSize / 1048576);
    const limit = Math.round(memoryInfo.jsHeapSizeLimit / 1048576);

    console.log(`Memory usage: ${used}MB / ${total}MB (limit: ${limit}MB)`);

    // Warn if memory usage is high
    if (used / limit > 0.8) {
      console.warn('High memory usage detected');
    }

    return { used, total, limit };
  },

  // Long task monitoring
  monitorLongTasks: () => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.warn(`Long task detected: ${entry.duration}ms`);
        
        // Track attribution if available
        if (entry.attribution) {
          entry.attribution.forEach((attribution) => {
            console.warn(`Long task attribution: ${attribution.name} (${attribution.containerType})`);
          });
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
      return observer;
    } catch (error) {
      console.warn('Long task monitoring not supported');
    }
  }
};

// Image optimization utilities
export const ImageOptimization = {
  // Create optimized image component
  createOptimizedImage: (src, options = {}) => {
    const {
      width,
      height,
      quality = 85,
      format = 'webp',
      placeholder = 'blur',
      sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    } = options;

    // Generate Next.js Image component props
    const imageProps = {
      src,
      width,
      height,
      quality,
      placeholder,
      sizes,
      loading: 'lazy',
      blurDataURL: placeholder === 'blur' ? ImageOptimization.generateBlurDataUrl() : undefined
    };

    return imageProps;
  },

  // Generate blur placeholder
  generateBlurDataUrl: (width = 10, height = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Create simple gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    return canvas.toDataURL();
  },

  // Check if WebP is supported
  supportsWebP: () => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
};

// Asset preloading utilities
export const AssetPreloader = {
  // Preload critical assets
  preloadCriticalAssets: (assets) => {
    if (typeof window === 'undefined') return;

    assets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = asset.href;
      link.as = asset.type || 'script';
      
      if (asset.type === 'font') {
        link.type = asset.mimeType || 'font/woff2';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  },

  // Preload images on hover
  preloadOnHover: (imageUrls) => {
    const preloadedImages = new Set();

    return {
      onMouseEnter: () => {
        imageUrls.forEach(url => {
          if (!preloadedImages.has(url)) {
            const img = new Image();
            img.src = url;
            preloadedImages.add(url);
          }
        });
      }
    };
  }
};

export default {
  BundleAnalyzer,
  CodeSplitting,
  PerformanceMonitor,
  ImageOptimization,
  AssetPreloader,
  useBundleOptimization
};
