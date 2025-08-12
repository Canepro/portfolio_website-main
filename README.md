# Personal Portfolio

> A modern, responsive portfolio website built with Next.js and React

### 🌐 [Live Site](https://quirky-bell-385b8d.netlify.app/)

![Portfolio Website](https://db3pap006files.storage.live.com/y4mJbxekblyRayOVyfrhAlqx9b9m2SCQ5vgPqCsbh_YDRw2HOYC8frX1wsBkWRrkgTKDqELxTtQmbj0gGMjNF9zZsuQSPnjS7EorGfGp1mdFDC7xPMkHH-3gluRJ-zeqJlCL_41iLvSnA0wQ5IgNVyjdF3DaUZkWwOSbntlwDO-eUK38pvoxbDgmhjqITouXWsw?width=1900&height=926&cropmode=none)

## 📋 Overview

This repository contains the source code for my professional portfolio website - serving as both an online resume and digital business card. The site showcases my projects, skills, and professional accomplishments with a modern, interactive design.

## 🚀 Tech Stack

- **Framework**: [Next.js 14.1.1](https://nextjs.org/) - React framework with SSR/SSG capabilities
- **Frontend**: [React 18.2.0](https://reactjs.org/) - Component-based UI library
- **Styling**: [Styled-components 5.3.0](https://styled-components.com/) - CSS-in-JS styling solution
- **Icons**: [React Icons 4.2.0](https://react-icons.github.io/react-icons/) - Icon library
- **Deployment**: [Netlify](https://netlify.com) - Static site hosting and CI/CD

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
| `npm run build` | Creates optimized production build |
| `npm start` | Starts production server (requires build first) |

## 🏗️ Project Structure

```
portfolio_website-main/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header/
│   │   ├── BackgroundAnimation/
│   │   └── Accomplishments/
│   └── layout/           # Layout components
├── next.config.js        # Next configuration (styled-components enabled)
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🚀 Deployment

This project is configured for deployment on Netlify with automatic builds from the main branch.

### Netlify Configuration

- **Build Command**: `yarn build`
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

For questions or collaboration opportunities, please reach out through the contact form on the [live site](https://quirky-bell-385b8d.netlify.app/).

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
