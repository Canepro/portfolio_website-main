# Deployment

This project deploys as a standard Next.js application. You can deploy to any provider that supports Node.js hosting (Vercel, Netlify, Render, Azure, etc.).

## Environment variables

- `NEXT_PUBLIC_RC_ENABLED` (optional): Set to `1` to enable Rocket.Chat livechat widget. Leave unset to disable in development and production.
- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics Measurement ID (e.g. `G-XXXXXXX`).
- `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_USER`, `CONTACT_SMTP_PASS`, `CONTACT_TO` (optional): Required to enable the `/contact` form email delivery.

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

## Docker
## Sitemap & SEO

- The sitemap at `/sitemap.xml` includes the home page, `/projects`, `/contact`, and all project detail pages generated from `src/constants/constants.ts`.
- Submit the sitemap URL to Google Search Console after deployment.


Build and run a production container:

```bash
docker build -t portfolio:prod .
docker run --rm -p 3000:3000 portfolio:prod
```

