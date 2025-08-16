# Deployment

This project deploys as a standard Next.js application. You can deploy to any provider that supports Node.js hosting (Vercel, Netlify, Render, Azure, etc.).

## Environment variables

- `NEXT_PUBLIC_RC_ENABLED` (optional): Set to `1` to enable Rocket.Chat livechat widget. Leave unset to disable in development and production.

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

Build and run a production container:

```bash
docker build -t portfolio:prod .
docker run --rm -p 3000:3000 portfolio:prod
```

