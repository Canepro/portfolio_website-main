# Deployment

This project deploys as a standard Next.js application. You can deploy to any provider that supports Node.js hosting (Vercel, Netlify, Render, Azure, etc.).

## Environment variables

- `NEXT_PUBLIC_RC_ENABLED` (optional): Set to `1` to enable Rocket.Chat livechat widget. Leave unset to disable in development and production.
- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics Measurement ID (e.g. `G-XXXXXXX`).
- `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_USER`, `CONTACT_SMTP_PASS`, `CONTACT_TO` (optional): Required to enable the `/contact` form email delivery.

### Example Netlify Environment Variables

```
CONTACT_SMTP_HOST=smtp.office365.com
CONTACT_SMTP_PORT=587
CONTACT_SMTP_USER=your-email@hotmail.com
CONTACT_SMTP_PASS=your-actual-password
CONTACT_TO=recipient@example.com
NEXT_PUBLIC_GA_ID=G-EXCBRQ7WL3
```

## Production build

```bash
npm run build
npm start
```

## Local testing

Run the development server:

```bash
npm run dev
```

Optionally enable Rocket.Chat during local dev:

```bash
NEXT_PUBLIC_RC_ENABLED=1 npm run dev
```

## Troubleshooting

### Contact Form Issues

**500 Internal Server Error:**
- **Cause**: Missing or incorrect SMTP environment variables
- **Solution**: Verify all SMTP env vars are set in Netlify Site settings → Build & deploy → Environment
- **Check**: Ensure `CONTACT_SMTP_HOST`, `CONTACT_SMTP_USER`, and `CONTACT_SMTP_PASS` are configured

**Authentication Failed:**
- **Cause**: Incorrect email/password or 2FA enabled
- **Solution**: Use app password if 2FA is enabled, or verify credentials
- **For Office 365**: May need to enable "Less secure app access" or use app password

**Port Issues:**
- **587**: TLS (recommended for Office 365)
- **465**: SSL (alternative)
- **25**: Usually blocked by hosting providers

### Development Issues

**"Invalid hook call" warnings:**
- **Status**: Known issue in development mode
- **Impact**: Production builds unaffected
- **Workaround**: Ignore in development, production works correctly

**Module not found errors:**
- **Cause**: Next.js cache corruption after TypeScript changes
- **Solution**: `rm -rf .next && npm run dev`
- **Alternative**: Use `npm run dev:3001` for different port

**Port conflicts:**
- **Solution**: Kill existing processes: `netstat -ano | findstr :3000` then `taskkill /PID <PID>`
- **Alternative**: Use `npm run dev:3001` for port 3001

## Docker

Build and run a production container:

```bash
docker build -t portfolio:prod .
docker run --rm -p 3000:3000 portfolio:prod
```

## Sitemap & SEO

- The sitemap at `/sitemap.xml` includes the home page, `/projects`, `/contact`, and all project detail pages generated from `src/constants/constants.ts`.
- Submit the sitemap URL to Google Search Console after deployment.

## Known Issues

1. **Development warnings**: "Invalid hook call" warnings appear in development but don't affect production
2. **SMTP configuration**: Contact form requires proper SMTP setup to function
3. **Cache issues**: TypeScript migration may require clearing `.next` cache
4. **Port conflicts**: Multiple dev servers can cause port conflicts on Windows

## Next Steps

- Complete TypeScript migration for remaining components
- Add focus trapping to mobile menu
- Implement proper error boundaries
- Add comprehensive testing suite

