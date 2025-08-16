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
- Optional Rocket.Chat live chat (controlled via `NEXT_PUBLIC_RC_ENABLED=1`)

## Tech Stack

- Framework: Next.js 14.2.30
- UI: React 18.3.1
- Styling: styled-components 5.3.0
- UI primitives: shadcn-inspired primitives (inline styles)
- Partial TypeScript for UI components and types
- Icons: react-icons

## Quick Links

- Development Roadmap: `docs/TODO.md`
- Architecture: `docs/ARCHITECTURE.md`
- Deployment: `docs/DEPLOYMENT.md`
- Changelog: `CHANGELOG.md`
- Contributing: `CONTRIBUTING.md`

## Installation & Setup

Prerequisites: Node.js 16+ and npm or yarn.

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

## Project Structure

```text
portfolio_website-main/
├── public/
│   └── images/
├── src/
│   ├── components/
│   ├── constants/
│   ├── layout/
│   ├── pages/
│   ├── styles/
│   └── themes/
├── docs/
├── Dockerfile
├── next.config.js
├── package.json
└── README.md
```

## License

This project is for portfolio purposes. All rights reserved.

## Contact

For questions or collaboration, see the contact options on the live site.
