# Changelog

All notable changes to this project will be documented here. Dates are in YYYY-MM-DD.

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
