# Deployment Guide

> Comprehensive deployment guide for the portfolio website

## 📋 Overview

This portfolio website is deployed on **Netlify** with automatic deployments from the main branch. It uses Netlify's Next.js runtime (serverless functions + edge) to support dynamic features like the contact API route and server-rendered sitemap.

## 🚀 Quick Deploy

### Netlify (Recommended)

1. **Connect Repository**
   - Fork or connect your GitHub repository to Netlify
   - Enable automatic deployments from the main branch

2. **Configure Build Settings**
   ```bash
   Build command: npm run build
   Publish directory: .next (auto-managed by Next.js runtime)
   Node version: 20
   ```

3. **Set Environment Variables** (see Configuration section below)

4. **Deploy**
   - Netlify will automatically build and deploy your site
   - Custom domain can be configured in Site Settings

### Alternative: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred platform
# (Vercel, Railway, DigitalOcean, etc.)
```

## ⚙️ Configuration

### Environment Variables

Configure these in your deployment platform's environment settings:

#### Required for Contact Form

```bash
# SMTP Configuration
CONTACT_SMTP_HOST=your-smtp-provider.com
CONTACT_SMTP_PORT=587                    # 587 for TLS, 465 for SSL
CONTACT_SMTP_USER=your-username
CONTACT_SMTP_PASS=your-password
CONTACT_TO=recipient@example.com         # Fallback recipient
```

#### Optional Features

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # Google Analytics

# Portfolio Metrics & Grafana Integration
GA_PROPERTY_ID=123456789                # GA4 Property ID (optional)
GA_CREDENTIALS=path/to/credentials.json  # GA4 API credentials (optional)
PROMETHEUS_SCRAPE_ENABLED=true          # Enable Prometheus scraping

# Live Chat
NEXT_PUBLIC_RC_ENABLED=1                # Enable Rocket.Chat
NEXT_PUBLIC_RC_URL=https://your-instance.rocket.chat/livechat

# GitHub API (increases rate limits)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### Netlify Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔧 Build Process

### TypeScript Compilation

The build process includes comprehensive type checking:

```bash
# Type checking (runs automatically during build)
npx tsc --noEmit

# Production build
npm run build

# Verify build output
npm start
```

### Build Verification

| Check | Command | Expected Result |
|-------|---------|-----------------|
| TypeScript | `npx tsc --noEmit` | No errors |
| Build | `npm run build` | Success with 12 pages |
| Production | `npm start` | Server starts on port 3000 |

## 🐛 Troubleshooting

### Common Issues

#### Contact Form Errors

**Problem**: Contact form returns 500 error

**Solutions**:
1. Verify SMTP environment variables are set correctly
2. Check email credentials and port settings
3. Test SMTP settings with a simple email client
4. Ensure `CONTACT_TO` email is valid

**Debug Steps**:
```bash
# Check environment variables
echo $CONTACT_SMTP_HOST
echo $CONTACT_SMTP_PORT

# Test SMTP connection
telnet $CONTACT_SMTP_HOST $CONTACT_SMTP_PORT
```

#### Build Failures

**Problem**: TypeScript compilation errors

**Solutions**:
1. Run `npx tsc --noEmit` to identify type errors
2. Check for missing type definitions in `src/types/`
3. Verify all components have proper interfaces
4. Ensure styled components have typed props

**Problem**: Next.js build fails

**Solutions**:
1. Clear cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for syntax errors in pages
4. Verify all imports are correctly typed

#### Development Issues

**Problem**: Port conflicts

**Solutions**:
```bash
# Use alternative port
npm run dev:3001

# Kill existing processes (macOS/Linux)
pkill -f node

# Kill existing processes (Windows)
taskkill /f /im node.exe

# Check port usage
netstat -tulpn | grep :3000
```

**Problem**: React hook warnings

**Status**: ✅ **Fixed** - Complete TypeScript migration resolved all hook warnings

#### Metrics Integration Issues

**Problem**: `/api/metrics` endpoint returns empty or error

**Solutions**:
1. Check that the metrics API is deployed and accessible
2. Verify environment variables are set correctly
3. Test the endpoint directly: `curl https://portfolio.canepro.me/api/metrics`
4. Check server logs for API errors

**Debug Steps**:
```bash
# Test metrics endpoint locally
curl http://localhost:3000/api/metrics

# Check if analytics tracking is working
# Open browser dev tools → Network → Look for POST requests to /api/metrics

# Verify GA4 integration (if configured)
echo $GA_PROPERTY_ID
echo $GA_CREDENTIALS
```

**Problem**: Grafana not showing portfolio metrics

**Solutions**:
1. Verify Grafana can reach the portfolio metrics endpoint
2. Check Prometheus configuration and scraping
3. Ensure correct metric names in Grafana queries
4. Verify the metrics endpoint returns valid Prometheus format

**Problem**: Demo click tracking not working

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify Google Analytics is loaded (`gtag` function available)
3. Test with browser dev tools → Network tab
4. Ensure demo buttons have correct click handlers

**Problem**: GA4 metrics showing sample data instead of real data

**Solutions**:
1. Set up Google Analytics Data API credentials
2. Configure `GA_PROPERTY_ID` and `GA_CREDENTIALS` environment variables  
3. Install GA4 API dependencies: `npm install @google-analytics/data`
4. Update the GA bridge service with real API calls

**Debug GA4 Integration**:
```bash
# Check if GA4 is configured
echo "GA Property ID: $GA_PROPERTY_ID"
ls -la $GA_CREDENTIALS  # Check credentials file exists

# Test GA4 API connection (requires setup)
node -e "
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
console.log('GA4 API available:', !!BetaAnalyticsDataClient);
"
```

### Performance Issues

**Problem**: Slow build times

**Solutions**:
1. Enable Next.js SWC compiler (enabled by default)
2. Use `npm run build` instead of `npm run dev` for production testing
3. Consider incremental builds for large projects

## 📊 Monitoring

### Build Monitoring

- **Netlify Build Logs**: Check for TypeScript and build errors
- **Deploy Previews**: Test changes before merging to main
- **Build Time**: Monitor for increases in build duration

### Runtime Monitoring

- **Google Analytics**: Track user engagement (if configured)
- **Portfolio Metrics API**: Custom Prometheus exporter at `/api/metrics`
- **Grafana Integration**: Real-time portfolio metrics dashboard
- **Core Web Vitals**: Monitor performance metrics
- **Demo Click Tracking**: Track engagement with live demos
- **Contact Form Analytics**: Monitor form submission rates
- **Error Tracking**: Monitor for JavaScript errors in production

#### Portfolio Metrics Endpoint

The portfolio now includes a comprehensive metrics endpoint that serves data in Prometheus format:

**Endpoint**: `https://portfolio.canepro.me/api/metrics`

**Metrics Available**:
- Page views (total and by page type)
- Demo button clicks (chat and dashboard)
- Contact form submissions
- Project detail page views
- Performance metrics (page load time, bounce rate)
- Unique visitors and active users
- Google Analytics data integration (when configured)

**Usage with Prometheus**:
```yaml
# Add to prometheus.yml
scrape_configs:
  - job_name: 'portfolio-metrics'
    static_configs:
      - targets: ['portfolio.canepro.me']
    metrics_path: '/api/metrics'
    scrape_interval: 30s
```

### Performance Benchmarks

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ✅ |
| Time to Interactive | < 3.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Lighthouse Score | > 95 | ✅ |

## 🔄 Rollback Procedures

### Immediate Rollback

1. **Netlify Dashboard**
   - Navigate to "Deploys"
   - Click "Publish deploy" on previous stable version

2. **Git Rollback**
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

### Fix and Redeploy

1. Create hotfix branch
   ```bash
   git checkout -b hotfix/issue-description
   ```

2. Apply fixes and verify
   ```bash
   npm run build
   npm start
   ```

3. Deploy
   ```bash
   git push origin hotfix/issue-description
   # Create PR and merge to main
   ```

## 📋 Production Checklist

Before deploying to production:

- [ ] **TypeScript Compilation**: `npx tsc --noEmit` passes
- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **All Pages Generate**: 12 pages build successfully
- [ ] **Environment Variables**: All required env vars configured
- [ ] **Contact Form**: Test with proper SMTP settings (if enabled)
- [ ] **Performance**: Lighthouse score > 90
- [ ] **Accessibility**: No accessibility violations
- [ ] **SEO**: Meta tags and structured data present
- [ ] **Links**: All internal/external links working
- [ ] **Images**: All project images loading correctly

## 🛠️ Development Environment

### Local Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### TypeScript Development

- **IntelliSense**: Full TypeScript support in VS Code
- **Type Checking**: Real-time error detection
- **Auto-completion**: Enhanced developer experience

### Styled Components

- **Theme Integration**: CSS variables for theme switching
- **Type Safety**: Proper prop typing for all components
- **SSR Support**: Server-side rendering enabled

## 📞 Support

### Getting Help

1. **Check Documentation**: Review this guide and other docs
2. **Build Logs**: Check Netlify build logs for specific errors
3. **Local Testing**: Verify TypeScript compilation passes locally
4. **GitHub Issues**: Open issue with reproduction steps

### Useful Commands

```bash
# Type checking
npx tsc --noEmit

# Production build
npm run build

# Local production test
npm start

# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules && npm install
```

---

## 📊 Grafana Dashboard Setup

> **📋 For complete step-by-step setup instructions, see: [`PORTFOLIO_METRICS_SETUP.md`](./PORTFOLIO_METRICS_SETUP.md)**

### Portfolio Metrics Dashboard

The portfolio includes a comprehensive metrics collection system that integrates with Grafana for real-time monitoring and meta-demonstration of DevOps skills.

#### Grafana Configuration

**Target Instance**: `https://canepro.grafana.net/`

#### Dashboard Panels Recommendations

**Panel 1: Real-time Visitors**
```promql
# Query: Current active users
ga4_active_users

# Panel Type: Stat
# Display: Current value with trend
# Refresh: 30s
```

**Panel 2: Daily Engagement Metrics**
```promql
# Query: Page views today  
ga4_daily_page_views

# Query: Demo clicks today
sum(portfolio_demo_clicks)

# Panel Type: Time series
# Display: Both metrics on same chart
```

**Panel 3: Demo Performance**
```promql
# Query: Demo clicks by type
portfolio_demo_clicks{demo_type="chat"}
portfolio_demo_clicks{demo_type="dashboard"}

# Panel Type: Bar chart
# Display: Demo engagement comparison
```

**Panel 4: Portfolio Performance**
```promql
# Query: Page load performance
ga4_performance_metrics{metric="page_load_time"}
ga4_performance_metrics{metric="first_contentful_paint"}

# Panel Type: Gauge
# Thresholds: Green < 1000ms, Yellow < 2000ms, Red > 2000ms
```

**Panel 5: Geographic Distribution**
```promql
# Query: Unique countries
ga4_unique_countries

# Panel Type: Stat with map (if available)
```

#### Prometheus Scraping Configuration

Add to your `prometheus.yml`:

```yaml
global:
  scrape_interval: 30s
  evaluation_interval: 30s

scrape_configs:
  - job_name: 'portfolio-metrics'
    static_configs:
      - targets: ['portfolio.canepro.me']
    metrics_path: '/api/metrics'
    scrape_interval: 30s
    scrape_timeout: 10s
    
  # Add other existing jobs here...
```

#### Sample Grafana Queries

**Total Portfolio Engagement**:
```promql
sum(portfolio_page_views_total) + 
sum(portfolio_demo_clicks_total) + 
sum(portfolio_engagement_metrics{type="contact_submissions"})
```

**User Journey Funnel**:
```promql
# Home page visits
portfolio_page_views{page="home"}

# Project page visits  
portfolio_page_views{page="projects"}

# Demo interactions
sum(portfolio_demo_clicks)

# Contact submissions
portfolio_engagement_metrics{type="contact_submissions"}
```

**Performance SLA Monitoring**:
```promql
# Page load time SLA (< 3 seconds)
(ga4_performance_metrics{metric="page_load_time"} < 3000) * 100

# Uptime monitoring (if external monitoring added)
up{job="portfolio-metrics"} * 100
```

#### Dashboard Variables

Create dashboard variables for dynamic filtering:

```bash
# Variable: time_range
# Type: Interval
# Values: 5m,15m,1h,6h,24h,7d

# Variable: page_filter  
# Type: Query
# Query: label_values(portfolio_page_views, page)

# Variable: demo_type
# Type: Query  
# Query: label_values(portfolio_demo_clicks, demo_type)
```

#### Alerting Rules (Optional)

Create alerts for important metrics:

```yaml
# High page load time alert
- alert: HighPageLoadTime
  expr: ga4_performance_metrics{metric="page_load_time"} > 5000
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "Portfolio page load time is high"
    description: "Page load time is {{ $value }}ms, above 5 second threshold"

# Low engagement alert
- alert: LowEngagement  
  expr: rate(portfolio_demo_clicks_total[1h]) < 0.01
  for: 30m
  labels:
    severity: info
  annotations:
    summary: "Portfolio engagement is low"
    description: "Demo clicks are below expected rate"
```

---

**Last Updated**: January 2025  
**Next Review**: February 2025
