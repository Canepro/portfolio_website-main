# Personal Portfolio

> A modern, responsive portfolio website built with Next.js and React

### 🌐 [Live Site](https://portfolio.canepros.com/)

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
├── .babelrc              # Babel configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🚀 Deployment

This project is configured for deployment on Netlify with automatic builds from the main branch.

### Netlify Configuration

- **Build Command**: `yarn build`
- **Publish Directory**: `.next`
- **Plugin**: `@netlify/plugin-nextjs`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `.next` directory to your hosting provider

## 🔧 Troubleshooting

### Common Issues

#### Netlify Build Failures

**Problem**: Build fails with error `"Failed to resolve '@babel/runtime/regenerator'"`

**Solution**: This issue was resolved in v1.1.0 by adding the missing dependency:
```json
{
  "dependencies": {
    "@babel/runtime": "^7.24.0"
  }
}
```

**Root Cause**: Custom Babel configuration requires `@babel/runtime` for regenerator polyfills.

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

**Solution**: The project includes proper Babel configuration for styled-components SSR in `.babelrc`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is for portfolio purposes. All rights reserved.

## 📞 Contact

For questions or collaboration opportunities, please reach out through the contact form on the [live site](https://portfolio.canepros.com/).

---

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes and releases.
