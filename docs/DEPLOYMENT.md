# Deployment Guide

This document covers deployment strategies, troubleshooting, and environment configuration for the portfolio website.

## Overview

The portfolio website is deployed on Netlify with automatic deployments from the main branch. It uses Netlify's Next.js runtime (serverless functions + edge) rather than static export to support the contact API route and server-rendered sitemap.

## Environment Configuration

### Required Environment Variables

The following environment variables should be configured in your deployment platform:

#### Contact Form (Optional)

Configure these to enable the contact form at `/contact`:

```bash
CONTACT_SMTP_HOST=
CONTACT_SMTP_PORT=
CONTACT_SMTP_USER=canepro
CONTACT_SMTP_PASS=True
CONTACT_TO=mogah.vincent@hotmail.com
```

**Note**: Without SMTP configuration, the contact form will return `500: Email not configured`.

#### Analytics (Optional)

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics Measurement ID
```

#### Feature Flags (Optional)

```bash
NEXT_PUBLIC_RC_ENABLED=1  # Enable Rocket.Chat widget
NEXT_PUBLIC_RC_URL=https://canepros.rocket.chat/livechat
```

### Netlify Configuration

1. **Site Settings** → **Build & deploy** → **Environment variables**
2. Add the environment variables listed above as needed
3. Commit `netlify.toml` with the Next.js runtime plugin and Node version configuration
4. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: auto-managed by the Next runtime
   - Node version: `20`

## Build Configuration

### TypeScript Build Process

Since the complete TypeScript migration (v1.2.0), the build process includes:

1. **TypeScript Compilation**: All components compiled with zero errors
2. **Type Checking**: Strict mode enabled with comprehensive type validation
3. **Static Generation**: All 12 pages generated successfully
4. **Bundle Optimization**: Tree-shaking and code splitting applied

### Build Verification Commands

```bash
# Type checking
npx tsc --noEmit

# Production build
npm run build

# Local production test
npm start
```

## Troubleshooting

### Common Issues

#### Contact Form Errors

**Issue**: Contact form returns 500 error
**Solutions**:

1. Verify SMTP environment variables are set correctly
2. Check email credentials and port settings (587 for TLS, 465 for SSL)
3. Ensure `CONTACT_TO` email is valid
4. Test SMTP settings with a simple email client first

#### Build Failures

**Issue**: TypeScript compilation errors
**Solutions**:

1. Run `npx tsc --noEmit` to identify type errors
2. Check for missing type definitions in `src/types/`
3. Verify all components have proper interfaces
4. Ensure styled components have typed props

**Issue**: Next.js build fails
**Solutions**:

1. Clear `.next` cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for syntax errors in pages
4. Verify all imports are correctly typed

#### Development Issues

**Issue**: React hook warnings (legacy issue, fixed in v1.2.0)
**Solutions**:

- ✅ **Fixed**: Complete TypeScript migration resolved all hook warnings
- Use proper component typing with `React.FC`
- Ensure proper hook usage within function components

**Issue**: Port conflicts
**Solutions**:

1. Use alternative port: `npm run dev:3001`
2. Kill existing processes: `pkill -f node` (macOS/Linux) or `taskkill /f /im node.exe` (Windows)
3. Check for processes using port 3000: `netstat -tulpn | grep :3000`

#### Performance Issues

**Issue**: Slow build times
**Solutions**:

1. Enable Next.js SWC compiler (enabled by default)
2. Use `npm run build` instead of `npm run dev` for production testing
3. Consider incremental builds for large projects

### Development Environment Issues

#### TypeScript IntelliSense Not Working

**Solutions**:

1. Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Check `tsconfig.json` configuration
3. Ensure all type definitions are properly imported
4. Verify workspace is opened at project root

#### Styled Components Not Typed

**Solutions**:

1. Check that styled component files use `.ts` extension
2. Verify prop interfaces are defined in `src/types/styled-components.d.ts`
3. Apply interfaces to styled components: `styled.div<InterfaceName>`
4. Restart TypeScript server after adding new interfaces

## Production Checklist

Before deploying to production:

- [ ] **TypeScript Compilation**: `npx tsc --noEmit` passes
- [ ] **Build Success**: `npm run build` completes without errors
- [ ] **All Pages Generate**: pages build successfully; dynamic routes and API functions deployed
- [ ] **Environment Variables**: All required env vars configured
- [ ] **Contact Form**: Test with proper SMTP settings (if enabled)
- [ ] **Performance**: Lighthouse score > 90
- [ ] **Accessibility**: No accessibility violations
- [ ] **SEO**: Meta tags and structured data present
- [ ] **Links**: All internal/external links working
- [ ] **Images**: All project images loading correctly

## Monitoring

### Build Monitoring

- **Netlify Build Logs**: Check for TypeScript and build errors
- **Deploy Previews**: Test changes before merging to main
- **Build Time**: Monitor for increases in build duration

### Runtime Monitoring

- **Google Analytics**: Track user engagement (if configured)
- **Core Web Vitals**: Monitor performance metrics
- **Error Tracking**: Monitor for JavaScript errors in production

### Performance Benchmarks

Target metrics for production:

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse Score**: > 95

## Rollback Procedures

If issues occur in production:

1. **Immediate Rollback**:
   - Go to Netlify dashboard
   - Navigate to "Deploys"
   - Click "Publish deploy" on previous stable version

2. **Fix and Redeploy**:
   - Create hotfix branch from main
   - Apply necessary fixes
   - Verify TypeScript compilation and build
   - Create PR and merge to main
   - Verify automatic deployment

## Support

### Log Analysis

**Netlify Build Logs**:

- Access via Netlify dashboard → Site → Deploys → Build log
- Look for TypeScript errors, dependency issues, or build failures

**Browser Console**:

- Check for JavaScript errors in production
- Monitor network requests for failed API calls
- Verify styled-components theme application

### Contact Support

For deployment issues:

1. Check this troubleshooting guide first
2. Review Netlify build logs for specific errors
3. Ensure TypeScript compilation passes locally
4. Open GitHub issue with reproduction steps if needed

---

**Last Updated**: January 2025
**Next Review**: February 2025
