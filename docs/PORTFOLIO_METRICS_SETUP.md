# Portfolio Metrics → Grafana Integration Setup Guide

> **Complete step-by-step guide to set up portfolio metrics monitoring in Grafana**

## 📋 Overview

This guide walks you through setting up comprehensive portfolio analytics that feed into your Grafana dashboard, creating a meta-demonstration of your DevOps monitoring expertise. Visitors will see their engagement tracked in real-time while browsing your portfolio!

### 🎯 What You'll Build

- **Custom Metrics API**: Portfolio analytics endpoint at `/api/metrics` 
- **Dual Analytics**: Google Analytics + custom metrics collection
- **Real-time Tracking**: Page views, demo clicks, performance metrics
- **Grafana Cloud Dashboard**: 5-panel portfolio monitoring dashboard (free tier!)
- **Lightweight Agent**: No need to manage Prometheus infrastructure
- **Live Meta-Demo**: Your portfolio demonstrates monitoring while visitors explore it

### ☁️ Why Grafana Cloud?

**✅ Zero Infrastructure**: No Prometheus servers to manage  
**✅ Free Tier**: 10,000 metrics series + 14 days retention  
**✅ Global Access**: Access your dashboard from anywhere  
**✅ Built-in HA**: Grafana handles redundancy and scaling  
**✅ Professional**: Cloud-native approach impresses interviewers

### 🔗 Grafana Instances (Important Distinction)

- **Portfolio Site Monitoring**: `https://canepro.grafana.net/` *(New - for this integration)*
- **Enterprise Kubernetes Project**: `https://grafana.canepro.me/` *(Existing - stays unchanged)*

---

## 🚀 Step 1: Deploy the Code Changes

### 1.1 Verify Current Implementation

Your portfolio now includes these new files/changes:

✅ **New Files**:
- `src/lib/analytics.ts` - Enhanced analytics service
- `src/lib/ga-bridge.js` - Google Analytics to Prometheus bridge  
- `src/pages/api/metrics.js` - Custom metrics API endpoint

✅ **Updated Files**:
- `src/pages/_app.tsx` - Page view tracking
- `src/components/Projects/ProjectCard.tsx` - Demo click tracking  
- `src/pages/projects/[slug].tsx` - Project view tracking
- `src/pages/api/contact.js` - Contact form tracking
- `docs/DEPLOYMENT.md` - Updated documentation

### 1.2 Deploy to Production

```bash
# 1. Commit all changes
git add .
git commit -m "Add portfolio metrics → Grafana integration"

# 2. Push to main (triggers Netlify auto-deploy)  
git push origin main

# 3. Verify deployment at https://portfolio.canepro.me
```

### 1.3 Test the Metrics Endpoint

```bash
# Test locally first (if running dev server)
curl http://localhost:3000/api/metrics

# Test production endpoint
curl https://portfolio.canepro.me/api/metrics
```

**Expected Output**: Prometheus-formatted metrics like:
```
# HELP portfolio_page_views_total Total number of page views
# TYPE portfolio_page_views_total counter
portfolio_page_views_total 0

# HELP ga4_active_users Currently active users from GA4  
# TYPE ga4_active_users gauge
ga4_active_users 8
```

---

## ☁️ Step 2: Set Up Grafana Cloud + Agent

> **Why Grafana Cloud?** No need to manage Prometheus locally! Grafana Cloud's free tier includes 10k metrics series and 14 days retention - perfect for portfolio monitoring.

### 2.1 Create Grafana Cloud Account

1. **Sign up**: Go to https://grafana.com/products/cloud/
2. **Choose Free Tier**: 10,000 metrics series included
3. **Note your details**:
   - Organization slug (e.g., `yourname123`)
   - Grafana URL (e.g., `https://yourname123.grafana.net/`)

### 2.2 Get Prometheus Credentials

1. **Navigate**: Grafana Cloud Portal → **Data Sources**
2. **Select**: Prometheus data source
3. **Copy credentials**:
   ```
   Remote Write URL: https://prometheus-prod-XX-XX-X.grafana.net/api/prom/push
   Username: 123456
   ```
4. **Generate API Key**: Click "Generate API Key" for password

### 2.3 Deploy Grafana Agent (Lightweight Collector)

**Choose your deployment method:**

#### Option A: Docker (Recommended)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  grafana-agent:
    image: grafana/agent:latest
    container_name: portfolio-grafana-agent
    volumes:
      - ./agent.yml:/etc/agent/agent.yml
    command:
      - -config.file=/etc/agent/agent.yml
      - -metrics.wal-directory=/tmp/agent/wal
    ports:
      - "12345:12345"  # Optional: for agent UI
    restart: unless-stopped
```

Create `agent.yml`:
```yaml
server:
  http_listen_port: 12345

prometheus:
  global:
    scrape_interval: 30s
    external_labels:
      cluster: 'portfolio-monitoring'
      environment: 'production'
  
  configs:
    - name: portfolio
      scrape_configs:
        - job_name: 'portfolio-metrics'
          static_configs:
            - targets: ['portfolio.canepro.me:443']
          metrics_path: '/api/metrics'
          scheme: https
          scrape_interval: 30s
          scrape_timeout: 10s
      
      remote_write:
        - url: YOUR_REMOTE_WRITE_URL  # From step 2.2
          basic_auth:
            username: YOUR_USERNAME   # From step 2.2  
            password: YOUR_API_KEY    # From step 2.2
```

**Deploy**:
```bash
# Replace credentials in agent.yml first!
docker-compose up -d
```

#### Option B: Direct Installation

**Linux/macOS**:
```bash
# Download agent
curl -O -L "https://github.com/grafana/agent/releases/latest/download/agent-linux-amd64.zip"
unzip agent-linux-amd64.zip
chmod +x agent-linux-amd64

# Run agent
./agent-linux-amd64 -config.file=agent.yml
```

**Windows**:
```powershell
# Download from: https://github.com/grafana/agent/releases/latest
# Extract and run: agent-windows-amd64.exe -config.file=agent.yml
```

### 2.4 Verify Data Collection

1. **Check Agent Status**: `http://localhost:12345` (if enabled)
2. **Check Grafana Cloud**: 
   - Go to your Grafana Cloud instance
   - **Explore** → **Prometheus** 
   - Query: `portfolio_page_views_total`
3. **Generate test data**: Browse your portfolio to create metrics

---

## 🎨 Step 3: Create Grafana Cloud Dashboard

### 3.1 Access Your Grafana Cloud Instance

Open your Grafana Cloud URL (from Step 2.1): `https://yourname123.grafana.net/`

### 3.2 Create New Dashboard

1. **Click**: "+ Create" → "Dashboard" 
2. **Add Panel** → Select "Time series" or "Stat"
3. **Data Source**: Should auto-select "Prometheus" (your cloud instance)

### 3.3 Panel 1: Real-time Visitors

**Configuration**:
- **Panel Title**: "Active Visitors"
- **Panel Type**: Stat
- **Query**: `ga4_active_users`
- **Refresh**: 30s
- **Value Options**: Show current value with color coding

**PromQL Query**:
```promql
ga4_active_users
```

### 3.4 Panel 2: Portfolio Engagement

**Configuration**:
- **Panel Title**: "Daily Engagement"  
- **Panel Type**: Time series
- **Time Range**: Last 24 hours

**PromQL Queries** (add multiple queries):
```promql
# Query A: Page views
ga4_daily_page_views

# Query B: Demo clicks  
sum(portfolio_demo_clicks)

# Query C: Contact submissions
portfolio_engagement_metrics{type="contact_submissions"}
```

### 3.5 Panel 3: Demo Performance Comparison

**Configuration**:
- **Panel Title**: "Live Demo Engagement"
- **Panel Type**: Bar chart or Stat

**PromQL Queries**:
```promql
# Chat demo clicks
portfolio_demo_clicks{demo_type="chat"}

# Dashboard demo clicks  
portfolio_demo_clicks{demo_type="dashboard"}
```

### 3.6 Panel 4: Site Performance Metrics

**Configuration**:
- **Panel Title**: "Portfolio Performance"
- **Panel Type**: Gauge
- **Thresholds**: Green < 1000ms, Yellow < 2000ms, Red > 2000ms

**PromQL Queries**:
```promql
# Page load time
ga4_performance_metrics{metric="page_load_time"}

# First Contentful Paint
ga4_performance_metrics{metric="first_contentful_paint"}
```

### 3.7 Panel 5: Geographic Distribution

**Configuration**:
- **Panel Title**: "Global Reach"
- **Panel Type**: Stat

**PromQL Query**:
```promql
ga4_unique_countries
```

---

## ⚙️ Step 4: Advanced Configuration (Optional)

### 4.1 Enable Real Google Analytics Integration

**Prerequisites**:
1. Google Analytics 4 property set up
2. Google Cloud Project with Analytics Data API enabled
3. Service account with Analytics Data API access

**Setup**:

1. **Install GA4 API dependencies**:
   ```bash
   npm install @google-analytics/data
   ```

2. **Set environment variables** (in Netlify):
   ```bash
   GA_PROPERTY_ID=123456789
   GA_CREDENTIALS=/path/to/service-account.json
   ```

3. **Update the GA bridge**: Edit `src/lib/ga-bridge.js` to use real GA4 API calls instead of sample data.

### 4.2 Dashboard Variables (Dynamic Filtering)

**Create Variables** in Grafana:
1. **time_range**: Interval variable (5m,15m,1h,6h,24h,7d)
2. **page_filter**: Query variable → `label_values(portfolio_page_views, page)`
3. **demo_type**: Query variable → `label_values(portfolio_demo_clicks, demo_type)`

### 4.3 Alerting Rules

**Create alerts** for important metrics:

```yaml
# High page load time alert
- alert: HighPortfolioPageLoad
  expr: ga4_performance_metrics{metric="page_load_time"} > 5000
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "Portfolio page load time high"
    description: "Load time: {{ $value }}ms"

# Low engagement alert  
- alert: LowPortfolioEngagement
  expr: rate(portfolio_demo_clicks_total[1h]) < 0.01
  for: 30m
  labels:
    severity: info
  annotations:
    summary: "Portfolio engagement low"
    description: "Demo clicks below expected rate"
```

---

## 🧪 Step 5: Testing & Validation

### 5.1 Generate Test Data

**Browse Your Portfolio**:
1. Visit `https://portfolio.canepro.me`
2. Navigate between pages (Home, Projects, Contact)
3. Click demo buttons on enterprise project
4. Submit contact form (optional)
5. Open project detail pages

### 5.2 Verify Data Flow

**Check Metrics Endpoint**:
```bash
curl https://portfolio.canepro.me/api/metrics | grep portfolio_page_views
```

**Check Prometheus**:
- Query: `increase(portfolio_page_views_total[5m])`
- Should show increases based on your browsing

**Check Grafana**:
- Refresh dashboard
- Should show activity from your test browsing

### 5.3 Test Analytics Events

**Browser Dev Tools**:
1. Open Network tab
2. Navigate portfolio 
3. Look for POST requests to `/api/metrics`
4. Verify Google Analytics events (if GA configured)

---

## 📊 Step 6: Dashboard Customization

### 6.1 Recommended Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    Portfolio Analytics                       │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│ Active      │ Page Views  │ Demo Clicks │ Performance     │
│ Visitors    │ Today       │ Today       │ (Load Time)     │
│             │             │             │                 │
│    [#]      │    [#]      │    [#]      │    [###] ms     │
└─────────────┴─────────────┴─────────────┴─────────────────┤
├─────────────────────────────────────────────────────────────┤
│           Engagement Timeline (24h)                        │
│  [Time series showing page views, demo clicks, contacts]   │
├─────────────────────────────────────────────────────────────┤
│ Demo Performance     │ Geographic Distribution              │
│ Chat: [##] clicks    │ Countries: [#]                      │ 
│ Dashboard: [##]      │ Top: US, UK, CA                     │
└─────────────────────┴─────────────────────────────────────┘
```

### 6.2 Dashboard Settings

**General**:
- **Title**: "Portfolio Analytics - Real-time Visitor Engagement"
- **Refresh**: 30s
- **Time Range**: Last 24 hours (default)

**Theme**: Dark (to match your portfolio aesthetic)

### 6.3 Public Dashboard (Optional)

If you want to show this dashboard publicly (like your Kubernetes project):

1. **Create Dashboard Snapshot** or set **Public Access**
2. **Add to Portfolio**: Link in footer or about section
3. **Meta-Demo**: "See your visit tracked in real-time"

---

## 🚀 Step 7: Go Live!

### 7.1 Final Checklist

- [ ] Code deployed to production
- [ ] `/api/metrics` endpoint accessible  
- [ ] Grafana Cloud account created
- [ ] Grafana Agent deployed and running
- [ ] Agent successfully sending data to Grafana Cloud
- [ ] Grafana Cloud dashboard created with 5 panels
- [ ] Test data showing in dashboard
- [ ] Analytics tracking demo clicks
- [ ] Performance metrics displaying

### 7.2 Monitor for Issues

**Common Issues**:
- CORS errors: Check domain spelling in configs  
- No metrics: Verify endpoint returns 200 status
- Missing data: Check Grafana Agent connectivity
- Dashboard errors: Verify PromQL query syntax
- Authentication: Check Grafana Cloud credentials

**Debug Commands**:
```bash
# Test portfolio endpoint
curl -I https://portfolio.canepro.me/api/metrics

# Check agent status (if UI enabled)
curl http://localhost:12345

# Check agent logs
docker logs portfolio-grafana-agent

# Test in Grafana Cloud Explore
# Go to: https://yourname.grafana.net/explore
# Query: portfolio_page_views_total
```

---

## 🎉 Step 8: Celebrate Your Meta-Demo!

**What You've Built**:

🎯 **Self-Demonstrating Portfolio**: Your portfolio now demonstrates monitoring expertise while visitors explore it

📊 **Real-time Analytics**: Track visitor engagement, demo interactions, and site performance  

🚀 **Professional Differentiation**: Showcases advanced DevOps skills beyond static code samples

💼 **Business Value**: Demonstrates data-driven decision making and monitoring best practices

**Share Your Success**:
- Update LinkedIn with your new monitoring capabilities
- Blog about the meta-demonstration concept  
- Show interviewers the live dashboard during portfolio reviews
- Use metrics to optimize portfolio performance

---

## 🛠️ Troubleshooting Guide

### Issue: Metrics Endpoint Returns 404

**Solution**:
```bash
# Check if API route exists
ls -la src/pages/api/metrics.js

# Verify deployment includes the file
curl -I https://portfolio.canepro.me/api/metrics
```

### Issue: No Data in Grafana Cloud

**Steps**:
1. **Check Grafana Agent**: `http://localhost:12345` (if UI enabled)
2. **Test metrics endpoint**: `curl https://portfolio.canepro.me/api/metrics`
3. **Check agent logs**: `docker logs portfolio-grafana-agent`
4. **Verify PromQL queries** in Grafana query editor
5. **Check time range** (data might be outside current view)
6. **Test in Grafana Explore**: Use Explore tab to test queries manually

### Issue: Analytics Not Tracking

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify Google Analytics is loaded: `typeof gtag === 'function'`
3. Look for network requests to `/api/metrics` in dev tools
4. Test with different browsers/devices

---

## 📞 Support

**Documentation**:
- Full deployment guide: `docs/DEPLOYMENT.md`
- Project architecture: `docs/ARCHITECTURE.md`

**Debugging**:
- Check browser dev tools console
- Monitor Netlify function logs  
- Review Grafana Agent logs (`docker logs portfolio-grafana-agent`)
- Use Grafana Cloud Explore tab for query testing

**Updates**:
- Monitor GitHub issues for improvements
- Check changelog for new features
- Update dependencies regularly

---

**🎯 Success Metric**: When visitors to your portfolio can see their own engagement tracked in real-time on your Grafana dashboard, demonstrating your monitoring expertise in action!

**Last Updated**: January 2025  
**Version**: v1.0.0
