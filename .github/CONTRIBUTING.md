# Contributing

Thanks for your interest! This is a personal portfolio site, but improvements are welcome via issues and pull requests.

## Getting started

1. Fork and clone the repo
1. Install dependencies

```bash
npm install
```

1. Start the dev server

```bash
npm run dev
```

## Branching & commits

- Branch naming: `feat/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- Commit style (keep it simple):
  - `feat(header): add accessible mobile menu`
  - `fix(image): safe base64 in browser`
  - `type: add TypeScript interfaces for new component`
  - `refactor: migrate component to TypeScript`

## Code style

### TypeScript Requirements (v1.2.0+)
- **All new components must be TypeScript** (`.tsx` for React, `.ts` for utilities)
- **Proper type definitions required** - no `any` types
- **Component props must have interfaces** defined in `src/types/`
- **Styled components must be typed** with prop interfaces

### General Standards
- Keep components small and readable; prefer clear names over abbreviations
- Avoid deep nesting; favor early returns
- Check for a11y (labels, keyboard support, color contrast)
- Use `React.FC` typing for all React components
- Export reusable types from `src/types/` directory

## Before you submit

### TypeScript Validation
- **Type checking must pass**: `npx tsc --noEmit`
- **Zero TypeScript compilation errors**
- **All components properly typed**

### Build Verification
- Run a local build:

```bash
npm run build
```

- **All 12 pages must generate successfully**
- Verify no console errors in dev
- Ensure mobile and desktop layouts look good
- Test that new TypeScript components work correctly

## Opening a PR

- Describe the change and its impact
- Add screenshots/GIFs for visual updates
- Reference related issues if any

Thanks! 🙌
