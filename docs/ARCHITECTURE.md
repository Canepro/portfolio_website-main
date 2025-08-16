# Architecture

This project follows a standard Next.js pages router layout with a component-driven UI built using `styled-components`.

## Key pieces

- `src/pages` – Next.js pages, including `_app.js` and `_document.js` for app/document customization
- `src/components` – Reusable UI components
- `src/layout` – Page layout wrappers (header, footer, etc.)
- `src/styles` – Global CSS and theme provider
- `src/themes` – Theme configuration consumed by styled-components
- `public/` – Static assets and images

## Styling

- `styled-components` with SSR enabled via `next.config.js` and `_document.js` server-side style sheet collection.

## Performance

- Optimized images using `next/image` wrapper (`OptimizedImage`) with lightweight blur SVG placeholders.
- ISR is used for the home page and project detail pages for incremental updates.

## Accessibility

- Header navigation supports keyboard and ARIA labeling; mobile overlay is a dialog and closes via Escape.
