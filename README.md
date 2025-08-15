# Personal Portfolio

> A modern, responsive portfolio website built with Next.js and React

### 🌐 [Live Site](https://portfolio.canepro.me/)

![Portfolio Website](https://github.com/Canepro/portfolio_website-main/blob/main/public/images/6.png?raw=true)

## 📋 Overview

This repository contains the source code for my professional portfolio website - serving as both an online resume and digital business card. The site showcases my projects, skills, and professional accomplishments with a modern, interactive design.

### ✨ Features

- 🎨 Modern, responsive design with smooth animations
- 📊 Real-time GitHub statistics integration
- 🚀 Optimized performance with Next.js SSG/ISR
- 🎯 Project showcase with categorization
- 📱 Mobile-first responsive layout
- 🔧 Containerized deployment support
- 🤖 CI/CD pipeline with GitHub Actions
- 💬 Rocket.Chat live chat integration

## 🚀 Tech Stack

- **Framework**: [Next.js 14.2.30](https://nextjs.org/) – React framework with SSR/SSG
- **Frontend**: [React 18.3.1](https://reactjs.org/) – Component-based UI library
- **Styling**: [styled-components 5.3.0](https://styled-components.com/) – CSS‑in‑JS (themes bridged to CSS variables)
- **UI Primitives**: shadcn/ui (Button, Badge, Card, Skeleton – adapted to inline styles)
- **Types**: Partial TypeScript (components in `src/components/ui/*.tsx`, types in `src/types/*`)
- **Icons**: [React Icons 4.2.0](https://react-icons.github.io/react-icons/) – Icon library
- **Deployment**: [Netlify](https://netlify.com) – CI/CD and hosting

## 🚦 Quick Links

- 📝 [Development Roadmap](./docs/TODO.md)
- 🏗️ [Architecture Documentation](./docs/ARCHITECTURE.md)
- 🚀 [Deployment Guide](./docs/DEPLOYMENT.md)
- 📋 [Changelog](./CHANGELOG.md)

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Canepro/portfolio_website-main.git
   cd portfolio_website-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server on localhost:3000 |
| `npm run dev:3001` | Starts development server on port 3001 (useful if HMR cache is stuck) |
| `npm run build` | Creates optimized production build |
| `npm start` | Starts production server (requires build first) |

## 🏗️ Project Structure

```
portfolio_website-main/
├── public/                 # Static assets
│   └── images/            # Project images and icons
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Accomplishments/
│   │   ├── BackgroundAnimation/
│   │   ├── Certifications/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Projects/
│   │   ├── Technologies/
│   │   └── TimeLine/
│   ├── constants/        # Project data and constants
│   ├── layout/           # Layout components
│   ├── pages/            # Next.js pages
│   │   ├── api/          # API routes
│   │   ├── _app.js       # Custom App component
│   │   ├── _document.js  # Custom Document component
│   │   └── index.js      # Homepage
│   ├── styles/           # Global styles and theme
│   └── themes/           # Theme configuration
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── TODO.md           # Development roadmap
├── .github/
│   └── workflows/        # GitHub Actions CI/CD
├── Dockerfile            # Container configuration
├── Makefile             # Container operations
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🚀 Deployment

This project is configured for deployment on Netlify with automatic builds from the main branch.

### Netlify Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- Note: No custom Netlify Next.js plugin is required for Next 14; default build works.

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` directory to your hosting provider

### Containerized Deployment (Docker or Podman)

You can run this app as a production container using Docker or Podman. The image runs as a non-root user and exposes port 3000 with a basic healthcheck.

- Environment variables used at runtime:
  - `PORT` (default: `3000`)
  - `NODE_ENV=production`
  - `NEXT_TELEMETRY_DISABLED=1`

Build the image:

```bash
# Docker
docker build --pull -t ghcr.io/canepro/portfolio:dev .

# Podman
podman build --pull -t ghcr.io/canepro/portfolio:dev .
```

Run the container:

```bash
# Docker
docker run --rm \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  -p 3000:3000 \
  --name portfolio \
  ghcr.io/canepro/portfolio:dev

# Podman
podman run --rm \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  -p 3000:3000 \
  --name portfolio \
  ghcr.io/canepro/portfolio:dev
```

Push to GHCR (optional):

```bash
docker login ghcr.io         # or: podman login ghcr.io
docker push ghcr.io/canepro/portfolio:dev
```

## 🔧 Troubleshooting

### Common Issues

#### Netlify Build Failures

**Problem**: Build fails with error `"Failed to resolve '@babel/runtime/regenerator'"`

**Solution**: Ensure `@babel/runtime` is installed (already present in `package.json`). No `.babelrc` is used; Next handles styled-components via `next.config.js`.

#### Development Server Issues

**Problem**: Development server won't start

**Solution**: 
1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check Node.js version (requires 16.x or higher)
3. If dev port is busy or HMR acts up, run on a clean port:
   ```bash
   npm run dev -- -p 3001
   ```

#### Styled-components SSR Issues

**Problem**: Styles not loading correctly in production

**Solution**: Styled-components SSR is enabled via `next.config.js` (`compiler.styledComponents: true`). No `.babelrc` is required.

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is for portfolio purposes. All rights reserved.

## 📞 Contact

For questions or collaboration opportunities, please reach out through the contact form on the [live site](https://portfolio.canepro.me/).

---

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes and releases.

## Local Development with Containers (Podman or Docker)

The `Makefile` auto-detects **Podman** (preferred) or **Docker**.

- Build and run:
  ```bash
  make build
  make run
  ```

- Stop and view logs:
  ```bash
  make stop
  make logs
  ```

- Push image to GHCR (optional):
  ```bash
  podman login ghcr.io   # or: docker login ghcr.io
  make push
  ```
