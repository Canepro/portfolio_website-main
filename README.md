# Personal Portfolio

> A modern, responsive portfolio website built with Next.js and React

## Live Site

- [`https://portfolio.canepro.me`](https://portfolio.canepro.me)

![Portfolio Website](https://github.com/Canepro/portfolio_website-main/blob/main/public/images/6.png?raw=true)

## Overview

Source code for my professional portfolio website. It showcases projects, skills, and accomplishments with a focus on performance, accessibility, and responsive design.

## Features

- Modern, responsive design with smooth animations
- Real-time GitHub statistics (SSG/ISR)
- Project showcase with categories
- Mobile-first layout
- Containerized deployment
- CI/CD with GitHub Actions
- Optional Rocket.Chat live chat (controlled via `NEXT_PUBLIC_RC_ENABLED=1` and `NEXT_PUBLIC_RC_URL`)
- Optional Google Analytics (set `NEXT_PUBLIC_GA_ID`)
- Optional contact form with email delivery via SMTP
- Dynamic sitemap including all project detail pages

## Tech Stack

- Framework: Next.js 14.2.30
- UI: React 18.3.1
- Language: TypeScript 5.9.2 (✅ Complete migration - all React components)
- Styling: styled-components 5.3.0
- UI primitives: shadcn-inspired primitives (inline styles)
- Type definitions: Comprehensive TypeScript interfaces for components, pages, and styled components
- Build: Zero TypeScript compilation errors with strict mode enabled
- Icons: react-icons

## Quick Links

- Development Roadmap: `docs/TODO.md`
- Architecture: `docs/ARCHITECTURE.md`
- Deployment: `docs/DEPLOYMENT.md`
- Changelog: `CHANGELOG.md`
- Contributing: `CONTRIBUTING.md`

## Installation & Setup

Prerequisites: Node.js 18+ (recommended 20) and npm or yarn.

1. Clone

```bash
git clone https://github.com/Canepro/portfolio_website-main.git
cd portfolio_website-main
```

1. Install

```bash
npm install
# or
yarn install
```

1. Start dev server

```bash
npm run dev
# or
yarn dev
```

To enable Rocket.Chat locally:

```bash
NEXT_PUBLIC_RC_ENABLED=1 npm run dev
```

Open `http://localhost:3000`

## Scripts

- `npm run dev` – Start dev server (port 3000)
- `npm run dev:3001` – Start dev server on port 3001
- `npm run build` – Production build
- `npm start` – Start production server

## Configuration

Environment variables:

- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics Measurement ID (e.g. `G-XXXXXXX`)
- `NEXT_PUBLIC_RC_ENABLED` (optional): set to `1` to enable Rocket.Chat widget
- `NEXT_PUBLIC_RC_URL` (optional): Livechat base URL, e.g. `https://canepros.rocket.chat/livechat`
- Contact email (optional): configure to enable `/contact` form
  - `CONTACT_SMTP_HOST`
  - `CONTACT_SMTP_PORT` (e.g. `587` or `465`)
  - `CONTACT_SMTP_USER`
  - `CONTACT_SMTP_PASS`
  - `CONTACT_TO` (optional fallback recipient; defaults to site owner email)
- `GITHUB_TOKEN` (optional): increases GitHub API rate limits for build-time stats

## Contact page

The contact form at `/contact` posts to `/api/contact`. Configure the SMTP env vars above to deliver messages to your inbox. Without configuration, the API returns `500: Email not configured`.

**Note**: Contact form requires proper SMTP configuration to function. See `docs/DEPLOYMENT.md` for troubleshooting.

Exact SMTP block for production (Netlify or environment) as requested:

```bash
CONTACT_SMTP_HOST=
CONTACT_SMTP_PORT=
CONTACT_SMTP_USER=canepro
CONTACT_SMTP_PASS=True
CONTACT_TO=mogah.vincent@hotmail.com
```

## Troubleshooting

### Common Issues

**Contact form returns 500 error:**

- Check SMTP environment variables are set correctly
- Verify email credentials and port settings
- See `docs/DEPLOYMENT.md` for detailed troubleshooting

**Development warnings:**

- Clear cache with `rm -rf .next` if needed after major changes
- Use `npm run dev:3001` for alternative port

**Port conflicts:**

- Kill existing processes or use `npm run dev:3001`
- See `docs/DEPLOYMENT.md` for detailed solutions

## Project Structure

```text
portfolio_website-main/
├── public/
│   └── images/
├── src/
│   ├── components/          # TypeScript React components (.tsx/.ts)
│   ├── constants/          # TypeScript data definitions (.ts)
│   ├── layout/            # Layout components (TypeScript .ts)
│   ├── pages/             # Next.js pages (TypeScript .tsx)
│   ├── styles/            # Styled components & global CSS (.ts/.tsx)
│   ├── themes/            # Theme configuration (.ts)
│   └── types/             # TypeScript type definitions (.d.ts)
├── docs/
├── Dockerfile
├── next.config.js
├── package.json
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## License

This project is for portfolio purposes. All rights reserved.

## Contact

For questions or collaboration, see the contact options on the live site.
