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

## Code style

- Keep components small and readable; prefer clear names over abbreviations
- Avoid deep nesting; favor early returns
- Check for a11y (labels, keyboard support, color contrast)

## Before you submit

- Run a local build:

```bash
npm run build
```

- Verify no console errors in dev
- Ensure mobile and desktop layouts look good

## Opening a PR

- Describe the change and its impact
- Add screenshots/GIFs for visual updates
- Reference related issues if any

Thanks! 🙌
