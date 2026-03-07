# Architecture Documentation

> Technical architecture and implementation details for the portfolio website

## 🏗️ Overview

This portfolio is **App Router-first** (Next.js 14) with a small amount of **legacy Pages Router** still present for API routes. It prioritizes production-style engineering: performance, accessibility, deterministic CI, and clear, scannable content.

Key product surfaces:

- **Projects**: case studies + live endpoints where available
- **Blog**: static-first MDX writing (`content/blog/*.mdx`)
- **Systems**: a skimmable architecture map at `/systems` (OKE hub + AKS spoke + CI + telemetry).
- Note: this is a portfolio infrastructure map; project-specific architecture (for example PipelineHealer) should link to the project repository docs.

## 🎯 Architecture Principles

- **Component-First**: Reusable, composable React components
- **Type Safety**: 100% TypeScript coverage with strict mode
- **Performance**: Optimized with Next.js features (ISR, Image optimization)
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Server-side rendering and structured data
- **Maintainability**: Clean code structure and comprehensive documentation

## 📁 Project Structure

```
portfolio_website-main/
├── public/                    # Static assets
│   ├── images/               # Project images and screenshots
│   ├── favicon.ico          # Site favicon
│   └── robots.txt           # Search engine directives
├── content/                   # Content files
│   └── blog/                 # MDX posts
├── src/
│   ├── app/                # App Router pages (primary)
│   │   ├── page.tsx        # Home
│   │   ├── projects/       # Projects index + [slug]
│   │   ├── blog/           # Blog index + [slug] (MDX)
│   │   ├── systems/        # Systems map page
│   │   └── sitemap.ts      # /sitemap.xml (MetadataRoute)
│   ├── pages/              # Pages Router (API routes only)
│   │   └── api/            # /api/contact, /api/metrics
│   ├── components/         # UI/components
│   ├── constants/          # Project + certification data
│   ├── content/            # Profile/experience/skills content
│   ├── lib/                # Utilities (blog parsing, URL sanitization, analytics)
│   ├── styles/             # Global CSS + legacy styled-components
│   └── types/              # TypeScript definitions
├── docs/                  # Documentation
├── Dockerfile            # Container configuration
├── Jenkinsfile            # Jenkins multibranch CI pipeline
├── netlify.toml         # Deployment configuration
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔧 Technology Stack

### Core Framework

- **Next.js 14.2.35** - React framework (App Router)
- **React 18.3.1** - UI library with hooks and concurrent features
- **TypeScript 5.9.2** - Type-safe JavaScript with strict mode

### Styling & UI

- **Tailwind + CSS variables** - primary styling path for new UI
- **shadcn-inspired primitives** (`src/components/ui/*`) — Button (CVA), Badge (incl. `tech` variant), Card, Input
- **Legacy styled-components** - still present in parts of the codebase (kept, not extended)
- **framer-motion** - Animation library (respects `prefers-reduced-motion`)
- **lucide-react** - Modern icon library
- **react-icons** - Icon library for technology logos

### Development Tools

- **ESLint** - Code linting and quality
- **TypeScript** - Static type checking
- **Next.js SWC** - Fast compilation

### Deployment & Infrastructure

- **Netlify** - Hosting platform with Next.js runtime
- **Jenkins** - Multibranch CI validation (Kubernetes pod agents)
- **Docker** - Containerization support
- **Kubernetes** - Real demo infrastructure (OKE hub + AKS spoke)

## 🎨 Design System

### Theme Architecture

The application uses a **dual CSS-variable** system with a legacy styled-components bridge:

```css
/* GlobalStyles.css — legacy CSS variables */
:root {
  --color-accent: #0ea5e9; /* sky-500 */
  --color-accent-hover: #38bdf8; /* sky-400 */
  --color-bg: #0f1115;
  --color-text: #e2e8f0;
}

/* globals.css — shadcn-style HSL variables (dark class) */
.dark {
  --accent: 199 89% 48%; /* sky-500 */
  --background: 222 47% 7%;
  --foreground: 210 40% 95%;
}
```

The styled-components `Theme` provider in `src/themes/default.ts` references these CSS variables, so both systems stay in sync automatically.

UI primitives live in `src/components/ui/*` and use CVA (class-variance-authority) with a `cn()` helper (clsx + tailwind-merge):

```typescript
// src/components/ui/badge.tsx
const badgeVariants = cva('...base classes...', {
  variants: {
    variant: {
      default: '...',
      tech: 'border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80',
    },
  },
});
```

### Component Patterns

#### Atomic Design Principles

- **Atoms**: Basic UI elements (Button, Badge, Input)
- **Molecules**: Simple combinations (ProjectCard, TimelineItem)
- **Organisms**: Complex sections (Hero, Projects, Timeline)
- **Templates**: Page layouts (Layout, PageWrapper)
- **Pages**: Complete pages (Home, Contact, Projects)

#### Styled Components Pattern (Legacy)

> For new components prefer Tailwind utilities with the shadcn primitives in `src/components/ui/*`.

```typescript
// Component with typed props
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

const StyledButton = styled.button<ButtonProps>`
  // Styled component implementation
`;

// Usage with proper typing
const Button: React.FC<ButtonProps> = ({ variant, size, children }) => (
  <StyledButton variant={variant} size={size}>
    {children}
  </StyledButton>
);
```

## 🔄 Data Flow

### Static Data

- **Project Information**: Stored in `src/constants/`
- **Timeline Data**: Career milestones and achievements
- **Technology Stack**: Skills and technologies
- **SEO Data**: Meta tags and structured data

### Dynamic Data

- **GitHub Statistics**: Fetched at build time with ISR
- **Contact Form**: Server-side processing via API routes
- **Sitemap**: Generated dynamically from project data

### Data Fetching Strategy (App Router)

- **Static-first pages**: `export const dynamic = 'force-static'` on content routes where possible.
- **Dynamic routes**: `generateStaticParams()` prebuilds known slugs for `/projects/[slug]` and `/blog/[slug]`.
- **Metadata**: `generateMetadata()` for SEO per route.
- **Sitemap**: `src/app/sitemap.ts` returns `MetadataRoute.Sitemap`.

## 🚀 Performance Optimization

### Image Optimization

- **Next.js Image**: Automatic optimization and lazy loading
- **Blur Placeholders**: SVG-based blur data URLs
- **Responsive Images**: Multiple sizes for different devices
- **WebP Support**: Modern image format with fallbacks

### Code Splitting

- **Automatic Splitting**: Next.js automatic code splitting
- **Dynamic Imports**: Lazy loading for heavy components
- **Bundle Analysis**: Optimized bundle sizes

### Caching Strategy

- **Static Generation**: Pre-built pages for fast loading
- **ISR**: Incremental updates for dynamic content
- **CDN**: Netlify's global CDN for static assets

## 🔒 Security

### Input Validation

- **Contact Form**: Server-side validation and sanitization
- **Email Validation**: Proper email format checking
- **Rate Limiting**: API route protection against abuse

### Environment Variables

- **Sensitive Data**: Stored in environment variables
- **Build-time**: Public variables prefixed with `NEXT_PUBLIC_`
- **Runtime**: Server-side variables for API routes

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Sufficient contrast ratios
- **Focus Management**: Visible focus indicators

### Implementation Examples

```typescript
// Accessible button with proper ARIA
<button
  aria-label="Toggle theme"
  aria-expanded={isExpanded}
  onKeyDown={handleKeyDown}
>
  {children}
</button>

// Screen reader friendly navigation
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none">
      <a role="menuitem" href="/projects">Projects</a>
    </li>
  </ul>
</nav>
```

## 🔍 SEO Strategy

### Meta Tags

- **Dynamic Titles**: Page-specific titles with fallbacks
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific meta tags
- **Canonical URLs**: Proper canonical link tags

### Structured Data

- **JSON-LD**: Schema.org structured data
- **Person Schema**: Personal information markup
- **Project Schema**: Project details markup
- **Website Schema**: Site information markup

### Technical SEO

- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Search engine directives
- **Performance**: Core Web Vitals optimization
- **Mobile**: Mobile-first responsive design

## 🧪 Testing Strategy

### Type Safety

- **TypeScript**: Compile-time error detection
- **Strict Mode**: Enhanced type checking
- **Interface Validation**: Component prop validation

### Build Verification

- **Type Checking**: `bun run typecheck`
- **Build Success**: `bun run build`
- **Production Test**: `bun run start`

### Manual Testing

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Accessibility**: Screen reader testing
- **Performance**: Lighthouse audits

## 📊 Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals**: Real User Monitoring
- **Lighthouse**: Performance audits
- **Bundle Analysis**: Bundle size tracking

### Error Tracking

- **JavaScript Errors**: Runtime error monitoring
- **Build Failures**: CI/CD error tracking
- **User Feedback**: Contact form submissions

## 🔄 Deployment Pipeline

### CI/CD Flow

1. **Code Push**: GitHub repository updates
2. **Build Trigger**: Netlify automatic build
3. **Type Checking**: TypeScript compilation
4. **Build Process**: Next.js production build
5. **Deployment**: Netlify automatic deployment
6. **Verification**: Build success confirmation

### Environment Management

- **Development**: Local development environment
- **Preview**: Netlify deploy previews
- **Production**: Live site deployment

## 📈 Scalability Considerations

### Current Architecture Benefits

- **Static Generation**: Fast page loads
- **ISR**: Dynamic content with caching
- **Component Reusability**: Maintainable codebase
- **Type Safety**: Reduced runtime errors

### Future Scalability

- **Content Management**: CMS integration potential
- **Internationalization**: Multi-language support
- **Progressive Web App**: Offline functionality
- **Micro-frontends**: Component federation

---

**Last Updated**: 2026-02-08
