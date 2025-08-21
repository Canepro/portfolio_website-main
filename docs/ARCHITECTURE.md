# Architecture

This project follows a standard Next.js pages router layout with a component-driven UI built using `styled-components` and fully migrated to TypeScript.

## Key pieces

- `src/pages` – Next.js pages in TypeScript, including `_app.tsx` and `_document.tsx` for app/document customization
- `src/components` – Reusable TypeScript React components with full type safety
- `src/layout` – Page layout wrappers (header, footer, etc.) in TypeScript
- `src/styles` – Global CSS and theme provider (CSS variables + styled-components)
- `src/themes` – Theme configuration consumed by styled-components
- `src/types` – TypeScript type definitions for components, pages, and styled component props
- `public/` – Static assets and images
- `src/constants` – Typed project/catalog data (`constants.ts`, `projectDetails.ts`)

## TypeScript Integration

### Migration Status: ✅ 100% Complete (v1.2.0-1.2.1)

- **Full TypeScript migration completed** for all React components (.js → .tsx)
- **All styled components migrated** to TypeScript (.js → .ts)
- **Zero TypeScript compilation errors** with strict mode enabled
- **Production build verified** - all 12 pages generate successfully

### Type System Architecture

Comprehensive type definitions in `src/types/` directory:
- `components.d.ts` - Component prop interfaces and React component types
- `pages.d.ts` - Page component props and data structures  
- `styled-components.d.ts` - Styled component prop types with theme integration
- `project.d.ts` - Project data type definitions and structures

### Developer Experience Enhancements

- **Strict TypeScript configuration** with proper type checking enabled
- **Enhanced IntelliSense** and autocomplete for all components
- **Compile-time error detection** preventing runtime issues
- **Theme typing integration** with styled-components DefaultTheme
- **Comprehensive prop validation** at compile time

### Migrated Components (v1.2.0)
- `TimeLine.js` → `TimeLine.tsx` (with typed hooks and styled component props)
- `Hero.js` → `Hero.tsx`
- `Projects.js` → `Projects.tsx` (with typed project filtering)
- `Technologies.js` → `Technologies.tsx`
- `Accomplishments.js` → `Accomplishments.tsx` (with typed GitHub stats props)
- `Certifications.js` → `Certifications.tsx`
- `BackgroundAnimation.js` → `BackgroundAnimation.tsx`
- `TimeLineStyles.js` → `TimeLineStyles.ts` (with comprehensive prop typing)

## Styling

- `styled-components` with SSR enabled via `next.config.js` and `_document.js` server-side style sheet collection.
- TypeScript prop interfaces for all styled components ensuring type safety

## Performance

- Optimized images using `next/image` wrapper (`OptimizedImage`) with lightweight blur SVG placeholders.
- ISR is used for the home page and project detail pages for incremental updates.
- Sitemap is generated server-side at request time (`/sitemap.xml`) to include all project slugs.

## Accessibility

- Header navigation supports keyboard and ARIA labeling; mobile overlay is a dialog and closes via Escape.
- Form elements are labeled and provide status messages for success/error in `/contact`.
