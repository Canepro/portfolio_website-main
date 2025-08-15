# Changelog

All notable changes to this project will be documented in this file.

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
- Intermittent "Invalid hook call" warnings in development and occasional missing chunk errors with `next dev`. Production build is unaffected. Follow-ups are tracked in TODO.
