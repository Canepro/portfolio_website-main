# Portfolio Website

> Modern, responsive portfolio built with Next.js, TypeScript, and styled-components

[![Live Site](https://img.shields.io/badge/Live%20Site-View%20Portfolio-blue?style=for-the-badge&logo=vercel)](https://portfolio.canepro.me)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.30-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)

<div align="center">
  <img src="https://github.com/Canepro/portfolio_website-main/blob/main/public/images/6.png?raw=true" alt="Portfolio Preview" width="800" />
</div>

## ✨ Features

- **Modern Design** - Clean, responsive layout with smooth animations
- **TypeScript** - 100% type-safe with comprehensive interfaces
- **Performance** - Optimized with Next.js Image, ISR, and code splitting
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **SEO Optimized** - Meta tags, structured data, dynamic sitemap
- **Real-time Stats** - GitHub statistics with incremental static regeneration
- **Contact Form** - Email delivery via SMTP with rate limiting
- **Live Chat** - Optional Rocket.Chat integration
- **Container Ready** - Docker support with health checks
- **CI/CD** - Automated deployment with GitHub Actions

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.30 |
| **Language** | TypeScript 5.9.2 |
| **UI Library** | React 18.3.1 |
| **Styling** | styled-components 5.3.0 |
| **UI Components** | shadcn-inspired primitives |
| **Icons** | react-icons, lucide-react |
| **Animations** | framer-motion |
| **Deployment** | Netlify |
| **CI/CD** | GitHub Actions |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended 20)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Canepro/portfolio_website-main.git
cd portfolio_website-main

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run dev:3001` | Start development server (port 3001) |
| `npm run build` | Create production build |
| `npm start` | Start production server |

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Rocket.Chat Live Chat (Optional)
NEXT_PUBLIC_RC_ENABLED=1
NEXT_PUBLIC_RC_URL=https://your-instance.rocket.chat/livechat

# Contact Form (Optional)
CONTACT_SMTP_HOST=your-smtp-host
CONTACT_SMTP_PORT=587
CONTACT_SMTP_USER=your-username
CONTACT_SMTP_PASS=your-password
CONTACT_TO=recipient@example.com

# GitHub API (Optional - increases rate limits)
GITHUB_TOKEN=your-github-token
```

### Features

- **Contact Form**: Configure SMTP settings to enable email delivery
- **Live Chat**: Set `NEXT_PUBLIC_RC_ENABLED=1` to enable Rocket.Chat widget
- **Analytics**: Add Google Analytics ID for tracking
- **GitHub Stats**: Include token for higher API rate limits

## 📁 Project Structure

```
portfolio_website-main/
├── public/                 # Static assets
│   └── images/            # Project images and screenshots
├── src/
│   ├── components/        # React components (.tsx)
│   │   ├── Hero/         # Hero section
│   │   ├── Projects/     # Project showcase
│   │   ├── TimeLine/     # Career timeline
│   │   ├── Technologies/ # Skills display
│   │   └── ui/           # Reusable UI components
│   ├── constants/        # Data definitions (.ts)
│   ├── layout/          # Layout components
│   ├── pages/           # Next.js pages (.tsx)
│   ├── styles/          # Global styles and themes
│   ├── themes/          # Theme configuration
│   └── types/           # TypeScript definitions (.d.ts)
├── docs/                # Documentation
├── Dockerfile           # Container configuration
└── netlify.toml        # Deployment configuration
```

## 🎨 Design System

- **Typography**: Modern, readable fonts with proper hierarchy
- **Colors**: Dark/light theme support with CSS variables
- **Components**: Consistent design patterns with shadcn inspiration
- **Animations**: Smooth transitions using framer-motion
- **Responsive**: Mobile-first approach with breakpoint system

## 📚 Documentation

- **[Architecture](docs/ARCHITECTURE.md)** - Technical architecture and TypeScript integration
- **[Deployment](docs/DEPLOYMENT.md)** - Deployment guide and troubleshooting
- **[Development Roadmap](docs/TODO.md)** - Current status and future plans
- **[Changelog](CHANGELOG.md)** - Version history and updates

## 🔧 Development

### TypeScript

The project is fully migrated to TypeScript with:
- Strict type checking enabled
- Comprehensive type definitions
- Zero compilation errors
- Enhanced developer experience

### Styling

- **styled-components** for component styling
- **CSS variables** for theme switching
- **Global styles** for consistent design
- **Responsive design** with mobile-first approach

### Performance

- **Image optimization** with Next.js Image component
- **Code splitting** for optimal bundle sizes
- **Incremental Static Regeneration** for dynamic content
- **Lighthouse score** > 95

## 🚀 Deployment

The site is automatically deployed to Netlify from the main branch. See [Deployment Guide](docs/DEPLOYMENT.md) for detailed configuration.

### Production Checklist

- [ ] TypeScript compilation passes
- [ ] All pages build successfully
- [ ] Environment variables configured
- [ ] Performance metrics meet targets
- [ ] Accessibility standards met
- [ ] SEO optimization complete

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and contribution process.

## 📄 License

This project is for portfolio purposes. All rights reserved.

---

<div align="center">
  <p>Built with ❤️ using Next.js and TypeScript</p>
  <p>
    <a href="https://portfolio.canepro.me">Live Site</a> •
    <a href="https://github.com/Canepro/portfolio_website-main/issues">Issues</a> •
    <a href="https://github.com/Canepro/portfolio_website-main/pulls">Pull Requests</a>
  </p>
</div>
