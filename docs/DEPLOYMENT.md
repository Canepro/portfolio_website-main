# Deployment Guide

This document provides comprehensive deployment instructions for the portfolio website.

## 🌐 Netlify Deployment (Recommended)

### Automatic Deployment

The repository is configured for automatic deployment on Netlify:

1. **Connected Repository**: Main branch auto-deploys
2. **Build Settings**:
   - Build Command: `yarn build`
   - Publish Directory: `.next`
   - Plugin: `@netlify/plugin-nextjs`

### Manual Netlify Setup

1. **Create Netlify Account**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect GitHub account

2. **Import Repository**
   - Click "New site from Git"
   - Select your forked repository
   - Configure build settings:
     ```
     Build Command: yarn build
     Publish Directory: .next
     ```

3. **Add Next.js Plugin**
   ```toml
   # netlify.toml
   [build]
     command = "yarn build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Deploy**
   - Trigger manual deploy or push to main branch

### Environment Variables

If your project requires environment variables:

1. Go to Site Settings → Environment Variables
2. Add required variables:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app
   ```

## 🚀 Alternative Deployment Options

### Vercel (Next.js Native)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### GitHub Pages (Static Export)

1. **Configure Next.js for Static Export**
   ```javascript
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   module.exports = nextConfig
   ```

2. **Build and Export**
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**
   - Upload `out/` directory contents
   - Configure GitHub Pages in repository settings

### AWS S3 + CloudFront

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   - Create S3 bucket
   - Upload `.next` directory contents
   - Configure bucket for static website hosting

3. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure custom domain if needed

## 🔧 Build Optimization

### Production Checklist

- [ ] All dependencies in package.json
- [ ] No console.log statements in production code
- [ ] Images optimized for web
- [ ] Bundle size analyzed
- [ ] SEO meta tags configured
- [ ] Performance tested

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

## 🐛 Troubleshooting Deployment

### Common Build Errors

**Error**: `Failed to resolve '@babel/runtime/regenerator'`
**Solution**: Ensure `@babel/runtime` is in dependencies
```json
{
  "dependencies": {
    "@babel/runtime": "^7.24.0"
  }
}
```

**Error**: `Module not found: styled-components`
**Solution**: Check Babel configuration in `.babelrc`
```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

**Error**: `Build failed due to ESLint errors`
**Solution**: Fix linting errors or disable ESLint in build
```javascript
// next.config.js
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
}
```

### Build Performance Issues

1. **Large Bundle Size**
   - Use dynamic imports for large components
   - Optimize images
   - Remove unused dependencies

2. **Slow Build Times**
   - Enable SWC compiler (disable custom Babel if possible)
   - Use incremental builds
   - Optimize asset processing

### Deployment Failures

1. **Check Build Logs**
   - Review full deployment logs
   - Identify specific error messages
   - Check dependency installation

2. **Verify Configuration**
   - Ensure build commands are correct
   - Check environment variables
   - Verify file paths and permissions

3. **Test Locally**
   ```bash
   # Simulate production build
   npm run build
   npm start
   ```

## 🔒 Security Considerations

### Environment Variables

- Never commit sensitive data to repository
- Use platform-specific environment variable management
- Prefix public variables with `NEXT_PUBLIC_`

### Dependencies

- Regularly update dependencies
- Use `npm audit` to check for vulnerabilities
- Consider using Dependabot for automated updates

### Headers and CSP

Configure security headers in deployment platform:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}
```

## 📊 Monitoring

### Performance Monitoring

- Use Lighthouse CI for automated performance testing
- Monitor Core Web Vitals
- Set up analytics (Google Analytics, etc.)

### Error Tracking

- Consider using Sentry for error tracking
- Monitor deployment success/failure rates
- Set up alerts for critical issues

---

For additional help, see [CONTRIBUTING.md](../CONTRIBUTING.md) or create an issue in the repository.
