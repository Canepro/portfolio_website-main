# Changelog

<!-- markdownlint-disable MD024 -->

All notable changes to this project will be documented here. Dates are in YYYY-MM-DD.

## v1.4.0 - 2026-02-08

### Changed

- **Design system overhaul** — unified accent color from neon cyan (`#00DBD8`) to sky-500 (`#0EA5E9`); single accent across CTAs, focus rings, links, and tag badges
- **GlobalStyles.css** — removed `* { transition }` performance antipattern; replaced gradient scrollbar thumb with a neutral one
- **AppShell & HeroVisual** — toned down radial background gradients (lower opacity, fewer saturated layers)
- **Card component** — updated to `rounded-2xl` with subtle hover transition
- **Input component** — focus ring now uses sky-500
- **BackgroundAnimation** — canvas accent updated to `#0EA5E9`
- **SEO** — theme-color meta updated to `#0EA5E9`
- **MDX links** — blog post link colors changed to sky-400/sky-300
- **Contact form** — card backgrounds switched from `bg-black/20` to `bg-white/5`; focus rings unified to sky-500

### Added

- **Badge `tech` variant** — reusable tag/chip style (`border-white/10 bg-white/5`) replacing ~30 inline badge spans across Home, Blog, Systems, and ProjectCard pages
- **Light theme accent** — added sky-600 (`#0284C7`) for sufficient contrast on light backgrounds

### Infrastructure

- **Jenkins CI** — fixed kaniko container `PATH` so durable-task wrapper can find BusyBox applets (`touch`, `sleep`, etc.)

---

## v1.3.1 - 2025-09-24

### Changed

- Updated Grafana domain from the previous Rocket.Chat subdomain to `grafana.canepro.me`.
- Refreshed links in README, project details, and Projects card buttons to point to the new domain.

## v1.3.0 - 2025-09-21

### Added

- **🚀 Kubernetes Project Showcase** - Featured project entries with accurate live-demo links
- **Live Demo Integration** - Interactive buttons for demo endpoints (where applicable)
- **Markdown Rendering** - Rich project documentation with react-markdown and remark-gfm
- **Analytics Tracking** - Demo interaction tracking for portfolio engagement metrics
- **Animated GIF Support** - Optimized display for dynamic project demonstrations

### Enhanced

- **Project Detail Pages** - Professional typography aligned with site theme
- **Responsive Design** - Improved mobile experience for enterprise project showcase
- **Visual Hierarchy** - Enhanced markdown styling with proper headings, tables, and lists
- **Button Styling** - Gradient demo buttons with hover effects and accessibility

### Infrastructure

- **Live Demo Links** - Grafana endpoint at `grafana.canepro.me` (authentication required) and sandbox endpoints where available
- **Architecture Notes** - Documentation and project pages avoid unverified production SLO/cost claims and clearly label sandbox vs stable demos

---

## v1.2.1 - 2025-01-17

### Updated

- Complete documentation update following TypeScript migration
- Updated README.md tech stack to reflect 100% TypeScript completion
- Enhanced ARCHITECTURE.md with comprehensive TypeScript integration details
- Updated TODO.md to mark all TypeScript migration tasks as completed
- Added TypeScript development guidelines to CONTRIBUTING.md

### Fixed

- Resolved duplicate file conflicts during TypeScript migration
- Fixed "View My Work" button styling consistency
- Cleaned up remaining JavaScript artifacts post-migration

---

## v1.2.0 - 2025-01-02

### Added

- Complete TypeScript migration for all React components
- Comprehensive type definitions for styled components props
- New `src/types/styled-components.d.ts` with component prop interfaces
- TypeScript support for TimeLine, Hero, Projects, Technologies, Accomplishments, Certifications, and BackgroundAnimation components

### Changed

- Migrated all major components from JavaScript to TypeScript (.js → .tsx)
- Enhanced styled components with proper TypeScript prop typing
- Updated TimeLineStyles from JavaScript to TypeScript with typed props
- Improved developer experience with full IntelliSense support

### Fixed

- Resolved all React "Invalid hook call" warnings by properly typing hook usage
- Fixed TypeScript compilation errors in component interactions
- Corrected styled component prop type mismatches

### Removed

- JavaScript versions of migrated components (TimeLine.js, Hero.js, Projects.js, etc.)
- Outdated JavaScript styled component files replaced with TypeScript versions

---

## v1.1.1 - 2025-08-16

### Added

- Comprehensive troubleshooting documentation in `docs/DEPLOYMENT.md`
- Contact form troubleshooting guide with SMTP configuration examples
- Development issues section covering common problems and solutions
- Known issues documentation with workarounds

### Changed

- Updated README.md with troubleshooting section
- Enhanced deployment documentation with Netlify environment variable examples
- Improved contact form documentation with current status notes

---

## v1.1.0 - 2025-08-16

### Changed

### Added

- Contact page at `/contact` with email delivery via `/api/contact` (requires SMTP envs)
- Google Analytics integration gated by `NEXT_PUBLIC_GA_ID`
- Dynamic sitemap includes all project detail pages and `/contact`

### Fixed

- Projects card description CSS typo (`font-style` -> `font-size`)
- Default Open Graph image now points to an existing asset
- Header accessibility: ARIA attributes, Escape to close mobile menu, overlay dialog semantics
- Social links: open in new tabs with rel security; added accessible labels
- OptimizedImage: browser-safe base64 fallback (no Node Buffer)
- App: Rocket.Chat script is env-gated via `NEXT_PUBLIC_RC_ENABLED`
- Document: fonts preconnect uses `crossOrigin="anonymous"`
- Performance: header `backdrop-filter` hints compositor via `will-change`
- Footer: mobile grid responsiveness improved

---

## 2025-08-15

### Added

- Gradient text for hero name and gradient primary CTA button
- Decorative background graphics for hero; visibility tuned (opacity 0.25)
- Laptop-only (1280–1500px) hero padding reduction for improved balance
- `.gitattributes` to improve GitHub Linguist language stats (count TypeScript; vendor static assets)

### Changed

- Hero layout: widened text column (~max‑w‑3xl), forced single-line name (no wrap)
- README: updated tech stack (React 18.3.1, partial TypeScript, shadcn/ui); added dev port note
- TODO: marked immediate actions complete; logged hero refinements and deployment notes

### Fixed

- Verified clean production build and local serve on port 3001 for reliable preview

### Known Issues

- ~~Intermittent "Invalid hook call" warnings in development~~ ✅ FIXED (v1.2.0 TypeScript migration)
- Occasional missing chunk errors with `next dev`. Production build is unaffected. Follow-ups are tracked in TODO.
