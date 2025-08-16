# Changelog

All notable changes to this project will be documented here. Dates are in YYYY-MM-DD.

## 2025-08-16

### Changed
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
- Intermittent "Invalid hook call" warnings in development and occasional missing chunk errors with `next dev`. Production build is unaffected. Follow-ups are tracked in TODO.
