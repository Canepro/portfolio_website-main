// src/pages/api/metrics.js
// Portfolio Metrics API - Prometheus exporter for custom portfolio analytics

const { GoogleAnalyticsBridge } = require('../../lib/ga-bridge');

let portfolioMetrics = {
  // Page views
  page_views_total: 0,
  page_views_home: 0,
  page_views_projects: 0,
  page_views_contact: 0,
  
  // Demo interactions
  demo_clicks_total: 0,
  demo_clicks_chat: 0,
  demo_clicks_dashboard: 0,
  
  // Engagement metrics
  contact_form_submissions: 0,
  project_views_total: 0,
  
  // Performance metrics (will be updated by client-side tracking)
  avg_page_load_time: 0,
  bounce_rate: 0,
  
  // Session metrics
  unique_visitors: new Set(), // Track unique IPs (in production, consider privacy)
  current_active_users: 0,
  
  // Last updated timestamp
  last_updated: Date.now()
};

// Helper to convert metrics to Prometheus format
function toPrometheusFormat(metrics) {
  const lines = [];
  
  // Add help and type comments for key metrics
  lines.push('# HELP portfolio_page_views_total Total number of page views');
  lines.push('# TYPE portfolio_page_views_total counter');
  lines.push(`portfolio_page_views_total ${metrics.page_views_total}`);
  lines.push('');
  
  lines.push('# HELP portfolio_page_views Page views by page type');
  lines.push('# TYPE portfolio_page_views counter');
  lines.push(`portfolio_page_views{page="home"} ${metrics.page_views_home}`);
  lines.push(`portfolio_page_views{page="projects"} ${metrics.page_views_projects}`);
  lines.push(`portfolio_page_views{page="contact"} ${metrics.page_views_contact}`);
  lines.push('');
  
  lines.push('# HELP portfolio_demo_clicks_total Total demo button clicks');
  lines.push('# TYPE portfolio_demo_clicks_total counter');
  lines.push(`portfolio_demo_clicks_total ${metrics.demo_clicks_total}`);
  lines.push('');
  
  lines.push('# HELP portfolio_demo_clicks Demo clicks by type');
  lines.push('# TYPE portfolio_demo_clicks counter');
  lines.push(`portfolio_demo_clicks{demo_type="chat"} ${metrics.demo_clicks_chat}`);
  lines.push(`portfolio_demo_clicks{demo_type="dashboard"} ${metrics.demo_clicks_dashboard}`);
  lines.push('');
  
  lines.push('# HELP portfolio_engagement_metrics Various engagement metrics');
  lines.push('# TYPE portfolio_engagement_metrics counter');
  lines.push(`portfolio_engagement_metrics{type="contact_submissions"} ${metrics.contact_form_submissions}`);
  lines.push(`portfolio_engagement_metrics{type="project_views"} ${metrics.project_views_total}`);
  lines.push('');
  
  lines.push('# HELP portfolio_performance_metrics Performance metrics');
  lines.push('# TYPE portfolio_performance_metrics gauge');
  lines.push(`portfolio_performance_metrics{type="avg_page_load_time_ms"} ${metrics.avg_page_load_time}`);
  lines.push(`portfolio_performance_metrics{type="bounce_rate_percent"} ${metrics.bounce_rate}`);
  lines.push('');
  
  lines.push('# HELP portfolio_visitors_unique Unique visitors count');
  lines.push('# TYPE portfolio_visitors_unique gauge');
  lines.push(`portfolio_visitors_unique ${metrics.unique_visitors.size}`);
  lines.push('');
  
  lines.push('# HELP portfolio_active_users Currently active users');
  lines.push('# TYPE portfolio_active_users gauge');
  lines.push(`portfolio_active_users ${metrics.current_active_users}`);
  lines.push('');
  
  lines.push('# HELP portfolio_last_updated_timestamp Unix timestamp of last metrics update');
  lines.push('# TYPE portfolio_last_updated_timestamp gauge');
  lines.push(`portfolio_last_updated_timestamp ${metrics.last_updated}`);
  
  return lines.join('\n');
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Return metrics in Prometheus format
      try {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        
        // Get local portfolio metrics
        const localMetrics = toPrometheusFormat(portfolioMetrics);
        
        // Get GA4 metrics
        const gaBridge = new GoogleAnalyticsBridge();
        const gaMetrics = await gaBridge.getMetricsForPrometheus();
        
        // Combine both metric sets
        const combinedMetrics = `${localMetrics}\n\n# Google Analytics Metrics\n${gaMetrics}`;
        
        res.status(200).send(combinedMetrics);
      } catch (error) {
        console.error('Error generating metrics:', error);
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.status(200).send(toPrometheusFormat(portfolioMetrics));
      }
      break;
      
    case 'POST':
      // Accept metric updates from client-side tracking
      try {
        const { metric_type, metric_value, metadata = {} } = req.body;
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
        
        // Update metrics based on type
        switch (metric_type) {
          case 'page_view':
            portfolioMetrics.page_views_total++;
            portfolioMetrics.unique_visitors.add(clientIP);
            
            // Track by page type
            const page = metadata.page || 'unknown';
            if (page === 'home') portfolioMetrics.page_views_home++;
            else if (page === 'projects') portfolioMetrics.page_views_projects++;
            else if (page === 'contact') portfolioMetrics.page_views_contact++;
            break;
            
          case 'demo_click':
            portfolioMetrics.demo_clicks_total++;
            const demoType = metadata.demo_type || 'unknown';
            if (demoType === 'chat') portfolioMetrics.demo_clicks_chat++;
            else if (demoType === 'dashboard') portfolioMetrics.demo_clicks_dashboard++;
            break;
            
          case 'contact_submission':
            portfolioMetrics.contact_form_submissions++;
            break;
            
          case 'project_view':
            portfolioMetrics.project_views_total++;
            break;
            
          case 'performance_update':
            if (metadata.load_time) {
              // Simple moving average for page load time
              portfolioMetrics.avg_page_load_time = 
                (portfolioMetrics.avg_page_load_time + metadata.load_time) / 2;
            }
            if (metadata.bounce_rate !== undefined) {
              portfolioMetrics.bounce_rate = metadata.bounce_rate;
            }
            break;
            
          case 'active_users_update':
            portfolioMetrics.current_active_users = metric_value || 0;
            break;
            
          default:
            return res.status(400).json({ error: 'Unknown metric type' });
        }
        
        // Update last updated timestamp
        portfolioMetrics.last_updated = Date.now();
        
        res.status(200).json({ 
          success: true, 
          message: 'Metric updated successfully',
          current_metrics: {
            page_views_total: portfolioMetrics.page_views_total,
            demo_clicks_total: portfolioMetrics.demo_clicks_total,
            unique_visitors: portfolioMetrics.unique_visitors.size
          }
        });
        
      } catch (error) {
        console.error('Error updating metrics:', error);
        res.status(500).json({ error: 'Failed to update metrics' });
      }
      break;
      
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
