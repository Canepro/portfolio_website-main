# Agent Instructions (Repo-Specific)

This repository is a Next.js (Pages Router) portfolio site built with TypeScript and Bun.

## Quick Commands

- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Format: `bun run format` (or `bun run format:check`)

## Project Layout

- Pages (routing): `src/pages`
- API routes: `src/pages/api`
- UI/components: `src/components`
- Site-wide constants/content: `src/constants/constants.ts`
- Styles/themes: `src/styles`, `src/themes`
- Static assets: `public/` (images in `public/images`)

## Engineering Rules

- Prefer small, reviewable PRs. Keep refactors scoped and mechanical.
- Keep the site recruiter-friendly: clear headings, obvious CTAs, no hidden content.
- Preserve existing observability/analytics features unless explicitly removing them.
- Do not commit secrets. Use `.env.local` (see `.env.example`).

## Styling Conventions

The codebase currently uses both `styled-components` and Tailwind utilities.

- If changing an existing component: stick to its current styling approach.
- If creating a new component: prefer the simplest approach for consistency with nearby code.

## Content Conventions

- Projects are defined in `src/constants/constants.ts` with `slug` used for routing/detail pages.
- Images referenced by content should live under `public/images` and use stable filenames.

## Blog (Planned)

If adding a blog section, keep it static-first:

- Store posts in-repo (recommended): `content/blog/*.md` (or `*.mdx`) with frontmatter.
- Generate `/blog` index + `/blog/[slug]` pages via `getStaticProps`/`getStaticPaths`.
- Keep the authoring workflow simple (no CMS required unless requested).

## Definition Of Done (For Any Change)

- `bun run lint`
- `bun run typecheck`
- `bun run build`
- Verify key pages render: `/`, `/projects`, and any new routes added.
