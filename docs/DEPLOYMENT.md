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
- **Core Web Vitals**: Monitor performance metrics
- **Error Tracking**: Monitor for JavaScript errors in production

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

**Last Updated**: January 2025  
**Next Review**: February 2025
