# Technical Architecture

This document outlines the technical architecture and design decisions for the portfolio website.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (Browser)                         │
├─────────────────────────────────────────────────────────────┤
│                     Next.js App                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │     Pages       │  │   Components    │  │   Styles     │ │
│  │   (Routes)      │  │  (Reusable)     │  │ (CSS-in-JS)  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                  Build & Deployment                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    Webpack      │  │     Babel       │  │   Netlify    │ │
│  │  (Bundling)     │  │ (Transpilation) │  │   (Hosting)  │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   ├── Main Content
│   │   ├── Hero Section
│   │   ├── About Section
│   │   ├── Projects Section
│   │   ├── Accomplishments
│   │   └── Contact Section
│   └── Footer
└── BackgroundAnimation
```

### Component Design Patterns

#### 1. Container/Presentational Pattern

```javascript
// Container Component (Logic)
const AccomplishmentsContainer = () => {
  const [data, setData] = useState([]);
  // Business logic here
  return <Accomplishments data={data} />;
};

// Presentational Component (UI)
const Accomplishments = ({ data }) => {
  return (
    <AccomplishmentsWrapper>
      {data.map(item => <AccomplishmentItem key={item.id} {...item} />)}
    </AccomplishmentsWrapper>
  );
};
```

#### 2. Styled-Components Pattern

```javascript
// Component Definition
const Header = () => {
  return (
    <HeaderWrapper>
      <Navigation>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
      </Navigation>
    </HeaderWrapper>
  );
};

// Styled Components (Separate file)
const HeaderWrapper = styled.header`
  /* styles */
`;

const Navigation = styled.nav`
  /* styles */
`;
```

## 📁 File Structure

```
portfolio_website-main/
├── public/                     # Static assets
│   ├── images/                # Image assets
│   ├── icons/                 # Icon files
│   └── favicon.ico            # Site favicon
│
├── src/
│   ├── components/            # Reusable components
│   │   ├── Header/
│   │   │   ├── Header.js      # Component logic
│   │   │   ├── HeaderStyles.js # Styled components
│   │   │   └── index.js       # Export barrel
│   │   │
│   │   ├── BackgroundAnimation/
│   │   │   ├── BackgroundAnimation.js
│   │   │   └── index.js
│   │   │
│   │   └── Accomplishments/
│   │       ├── Accomplishments.js
│   │       ├── AccomplishmentsStyles.js
│   │       └── index.js
│   │
│   ├── layout/                # Layout components
│   │   └── Layout.js          # Main layout wrapper
│   │
│   ├── pages/                 # Next.js pages (if using pages directory)
│   │   ├── index.js           # Home page
│   │   └── _app.js            # App wrapper
│   │
│   ├── styles/                # Global styles
│   │   └── globals.css        # Global CSS
│   │
│   └── utils/                 # Utility functions
│       └── helpers.js         # Helper functions
│
├── docs/                      # Documentation
├── .babelrc                   # Babel configuration
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🎨 Styling Architecture

### Styled-Components Strategy

#### Theme System

```javascript
// theme.js
export const theme = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    background: '#your-background-color',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
  },
};

// Usage in components
const StyledComponent = styled.div`
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.sm};
  }
`;
```

#### Component-Scoped Styles

```javascript
// ComponentStyles.js
import styled from 'styled-components';

export const ComponentWrapper = styled.div`
  /* Component-specific styles */
`;

export const ComponentHeader = styled.h2`
  /* Header styles */
`;

export const ComponentContent = styled.div`
  /* Content styles */
`;
```

### Responsive Design Strategy

#### Mobile-First Approach

```javascript
const ResponsiveComponent = styled.div`
  /* Mobile styles (default) */
  padding: 1rem;
  font-size: 1rem;

  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 1.5rem;
    font-size: 1.125rem;
  }

  /* Desktop and up */
  @media (min-width: 1024px) {
    padding: 2rem;
    font-size: 1.25rem;
  }
`;
```

## ⚡ Performance Architecture

### Code Splitting Strategy

```javascript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false, // Disable SSR if needed
  }
);
```

### Image Optimization

```javascript
import Image from 'next/image';

const OptimizedImage = () => (
  <Image
    src="/images/hero-image.jpg"
    alt="Portfolio hero image"
    width={1200}
    height={600}
    priority // For above-the-fold images
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
  />
);
```

### Bundle Optimization

```javascript
// next.config.js
module.exports = {
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize images
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
};
```

## 🔧 Build System

### Babel Configuration

```json
{
  "presets": ["next/babel"],
  "plugins": [
    ["styled-components", { 
      "ssr": true,
      "displayName": true,
      "preprocess": false
    }]
  ]
}
```

### Webpack Customization

```javascript
// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Custom webpack configuration
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/images/',
          outputPath: 'static/images/',
        },
      },
    });

    return config;
  },
};
```

## 🚀 Deployment Architecture

### Static Generation Strategy

```javascript
// For static pages
export async function getStaticProps() {
  return {
    props: {
      // Static props
    },
    revalidate: 86400, // Revalidate every 24 hours
  };
}

// For dynamic routes
export async function getStaticPaths() {
  return {
    paths: [
      // Static paths
    ],
    fallback: false,
  };
}
```

### CDN and Caching Strategy

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🔐 Security Architecture

### Content Security Policy

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
```

## 📊 Monitoring and Analytics

### Performance Monitoring

```javascript
// Custom performance monitoring
export function reportWebVitals(metric) {
  console.log(metric);
  
  // Send to analytics service
  if (metric.label === 'web-vital') {
    // Track Core Web Vitals
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
}
```

## 🔄 State Management

### Simple State Strategy

For this portfolio website, we use React's built-in state management:

```javascript
// Local component state
const [isMenuOpen, setIsMenuOpen] = useState(false);

// Context for global state (if needed)
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

This architecture provides a solid foundation for a modern, performant, and maintainable portfolio website.
