// src/lib/analytics.ts
// Enhanced Analytics Service for Portfolio Metrics → Grafana Integration

interface AnalyticsEvent {
  event_name: string;
  parameters?: Record<string, any>;
}

interface CustomMetric {
  metric_type: string;
  metric_value?: number;
  metadata?: Record<string, any>;
}

class AnalyticsService {
  private isClient: boolean;
  private isGAEnabled: boolean;
  private startTime: number;
  private pageViewsSent: Set<string>;
  
  constructor() {
    this.isClient = typeof window !== 'undefined';
    this.isGAEnabled = this.isClient && 'gtag' in window;
    this.startTime = Date.now();
    this.pageViewsSent = new Set();
  }

  // Google Analytics Events (existing functionality enhanced)
  private sendGAEvent(event: AnalyticsEvent): void {
    if (this.isGAEnabled) {
      (window as any).gtag('event', event.event_name, event.parameters);
    }
  }

  // Custom Metrics API (new functionality)
  private async sendCustomMetric(metric: CustomMetric): Promise<void> {
    if (!this.isClient) return;

    try {
      const response = await fetch('/api/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });

      if (!response.ok) {
        console.warn('Failed to send custom metric:', await response.text());
      }
    } catch (error) {
      console.warn('Error sending custom metric:', error);
    }
  }

  // Combined tracking method
  private track(gaEvent: AnalyticsEvent, customMetric?: CustomMetric): void {
    // Send to Google Analytics
    this.sendGAEvent(gaEvent);
    
    // Send to custom metrics API
    if (customMetric) {
      this.sendCustomMetric(customMetric);
    }
  }

  // Page View Tracking
  trackPageView(page: string, title?: string): void {
    const pageKey = `${page}-${title || 'untitled'}`;
    
    // Avoid duplicate page views in same session
    if (this.pageViewsSent.has(pageKey)) return;
    this.pageViewsSent.add(pageKey);

    this.track(
      {
        event_name: 'page_view',
        parameters: {
          page_title: title,
          page_location: this.isClient ? window.location.href : '',
          page_path: page,
          engagement_time_msec: Date.now() - this.startTime
        }
      },
      {
        metric_type: 'page_view',
        metadata: {
          page: this.getPageType(page),
          title: title,
          timestamp: Date.now()
        }
      }
    );
  }

  // Demo Click Tracking (enhanced existing functionality)
  trackDemoAccess(demoType: string, projectSlug: string): void {
    this.track(
      {
        event_name: 'portfolio_demo_access',
        parameters: {
          demo_type: demoType,
          project: projectSlug,
          engagement_time: Date.now() - this.startTime
        }
      },
      {
        metric_type: 'demo_click',
        metadata: {
          demo_type: demoType,
          project_slug: projectSlug,
          timestamp: Date.now()
        }
      }
    );
  }

  // Contact Form Tracking
  trackContactSubmission(method: string = 'email'): void {
    this.track(
      {
        event_name: 'contact_submission',
        parameters: {
          method: method,
          timestamp: Date.now()
        }
      },
      {
        metric_type: 'contact_submission',
        metadata: {
          method: method,
          timestamp: Date.now()
        }
      }
    );
  }

  // Project Detail View Tracking
  trackProjectView(projectSlug: string, projectTitle: string): void {
    this.track(
      {
        event_name: 'project_view',
        parameters: {
          project_slug: projectSlug,
          project_title: projectTitle,
          timestamp: Date.now()
        }
      },
      {
        metric_type: 'project_view',
        metadata: {
          project_slug: projectSlug,
          project_title: projectTitle,
          timestamp: Date.now()
        }
      }
    );
  }

  // Performance Tracking
  trackPerformanceMetrics(): void {
    if (!this.isClient || !window.performance) return;

    // Get Core Web Vitals and other performance metrics
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return;

    const metrics = {
      // Page load time
      load_time: navigation.loadEventEnd - navigation.loadEventStart,
      
      // First Contentful Paint (if available)
      fcp: this.getPerformanceMetric('first-contentful-paint'),
      
      // Largest Contentful Paint (if available)
      lcp: this.getPerformanceMetric('largest-contentful-paint'),
      
      // Time to Interactive (approximation)
      tti: navigation.domInteractive - navigation.navigationStart,
      
      // DOM Content Loaded
      dcl: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
    };

    this.track(
      {
        event_name: 'performance_metrics',
        parameters: {
          page_load_time: metrics.load_time,
          first_contentful_paint: metrics.fcp,
          largest_contentful_paint: metrics.lcp,
          time_to_interactive: metrics.tti,
          dom_content_loaded: metrics.dcl
        }
      },
      {
        metric_type: 'performance_update',
        metadata: {
          load_time: metrics.load_time,
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          tti: metrics.tti,
          dcl: metrics.dcl,
          timestamp: Date.now()
        }
      }
    );
  }

  // Helper Methods
  private getPageType(path: string): string {
    if (path === '/' || path === '') return 'home';
    if (path.startsWith('/projects')) return 'projects';
    if (path.startsWith('/contact')) return 'contact';
    return 'other';
  }

  private getPerformanceMetric(metricName: string): number | undefined {
    if (!this.isClient || !window.performance?.getEntriesByName) return undefined;
    
    const entries = performance.getEntriesByName(metricName);
    if (entries.length > 0) {
      const entry = entries[0] as PerformanceEntry & { value?: number };
      return entry.value || entry.startTime;
    }
    return undefined;
  }

  // Initialize performance tracking on page load
  initializeTracking(): void {
    if (!this.isClient) return;

    // Track performance metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => this.trackPerformanceMetrics(), 1000);
    });

    // Track page visibility changes for engagement
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // User switched away - could indicate bounce
        const sessionTime = Date.now() - this.startTime;
        if (sessionTime < 5000) { // Less than 5 seconds = potential bounce
          this.sendCustomMetric({
            metric_type: 'performance_update',
            metadata: {
              bounce_rate: 1,
              session_time: sessionTime
            }
          });
        }
      }
    });
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Export for backward compatibility with existing code
export const trackDemoAccess = (demoType: string, projectSlug: string) => {
  analytics.trackDemoAccess(demoType, projectSlug);
};

// Export main analytics instance as default
export default analytics;

