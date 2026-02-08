# Agent Instructions (Repo-Specific)

This repository is a Next.js portfolio site built with TypeScript and Bun.

## Quick Commands

- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`
- Lint: `bun run lint` (ESLint CLI; `next lint` is deprecated in Next 15+)
- Typecheck: `bun run typecheck`
- Format: `bun run format` (or `bun run format:check`)

## Project Layout

- App Router (primary): `src/app` (all main pages live here)
- Legacy Pages Router (API routes only): `src/pages`
- API routes: `src/pages/api`
- UI/components: `src/components`
- Site content/data:
  - Projects + certs: `src/constants/constants.ts`
  - Skills groupings: `src/content/skills.ts`
  - Profile/experience: `src/content/profile.ts`, `src/content/experience.ts`
  - Blog posts: `content/blog/*.mdx`
- Styles/themes: `src/styles`, `src/themes`
- Static assets: `public/` (images in `public/images`)

## Key Routes

- Home: `/` (`src/app/page.tsx`)
- Projects: `/projects` + `/projects/[slug]`
- Blog: `/blog` + `/blog/[slug]` (MDX)
- Systems overview: `/systems` (high-level architecture map)
- Contact: `/contact`
- Sitemap: `/sitemap.xml` (`src/app/sitemap.ts`)

## Engineering Rules

- Prefer small, reviewable PRs. Keep refactors scoped and mechanical.
- Keep the site recruiter-friendly: clear headings, obvious CTAs, scannable sections, no walls of text.
- Preserve existing observability/analytics features unless explicitly removing them.
- Do not commit secrets. Use `.env.local` (see `.env.example`).
- Keep accessibility non-negotiable: labels for inputs, keyboard navigation, readable contrast.
- Treat all external URLs as untrusted even if stored in code/content.

## Styling Conventions

The codebase uses Tailwind utilities (primary) and `styled-components` (legacy).

- If changing an existing component: stick to its current styling approach.
- If creating a new component: prefer Tailwind in `src/app/*` for speed and consistency with the new pages.
- Avoid generic template-y UI. Prefer evidence-driven copy, tight hierarchy, and intentional spacing.

### Design System

- **Fonts**: IBM Plex Sans (body) + IBM Plex Mono (code) via `next/font` — CSS vars `--font-sans`, `--font-mono`.
- **Accent color**: sky-500 (`#0EA5E9`) on dark, sky-600 (`#0284C7`) on light. Defined as `--color-accent` in `GlobalStyles.css` and `--accent` (HSL) in `globals.css`. Use this single accent for CTAs, active states, focus rings, link colors, and tag badges.
- **Dark theme**: charcoal/ink (`#0F1115` base). No neon, no purple/cyan haze gradients. Background radials are subtle and desaturated.
- **UI primitives** (`src/components/ui/*`): `Button` (CVA), `Badge` (including `tech` variant for skill/tag chips), `Card` (rounded-2xl, hover transition), `Input` (sky-500 focus ring). Use these instead of hand-rolling markup.
- **Helper**: `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).
- **Motion**: framer-motion where used; always respect `prefers-reduced-motion`.
- **Mobile-first**: all layouts must work on small screens; no overflow, readable font sizes.
- **Accessibility**: focus styles, contrast, labels, keyboard nav — non-negotiable.

## Content Conventions (Portfolio)

- Projects are defined in `src/constants/constants.ts` with `slug` used for routing/detail pages.
- Images referenced by content should live under `public/images` and use stable filenames.
- External URLs should be treated as untrusted input even if stored in code:
  - Prefer `safeExternalHref()` in `src/lib/url.ts` for any `href` that is not a hard-coded literal.
- Slugs are treated as path segments:
  - Use `encodeURIComponent(slug)` when building dynamic links.
- If you add new skills, try to attach evidence links (project pages or blog posts) in `src/content/skills.ts`.

## Blog

- Blog is static-first: MDX posts in `content/blog/*.mdx` with frontmatter.
- Routes:
  - Index: `src/app/blog/page.tsx`
  - Post: `src/app/blog/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`)
- Slugs are derived from filenames and validated in `src/lib/blog.ts`.
  - Filename format: `YYYY-MM-DD-slug-words.mdx` (slug must match `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`).

### Frontmatter Fields

```yaml
title: 'Required — displayed as the page heading and in metadata'
date: 'YYYY-MM-DD — required, used for sort order (newest first)'
description: 'Optional — shown on the blog index and in meta tags'
tags: ['optional', 'array', 'of', 'strings']
```

### Content Guidelines

- Every post should end with a reusable takeaway: a checklist, snippet, or pattern.
- Cross-link to project pages (`/projects/<slug>`) and the [Systems](/systems) page where relevant — this strengthens both the blog and portfolio sections.
- Tags are used by the Systems page to surface related posts (tags like `gitops`, `kubernetes`, `ci-cd`, `observability` are ranked highest).
- MDX supports: headings (h1-h3), links (internal auto-use `next/link`, external open in new tab), ordered/unordered lists, blockquotes, inline `code`, and fenced code blocks.
- Keep posts scannable: use headings to break up sections, bold for key phrases, and lists for enumerations. Recruiters skim.
- Avoid walls of text. If a section has more than three consecutive paragraphs without a heading, list, or code block, break it up.

### MDX + GFM Plugin Versioning

The codebase uses `remark-gfm@4` for both:

- `react-markdown` rendering (a few legacy/Markdown-rendered components)
- MDX compilation in `next-mdx-remote/rsc` (imported via `remark-gfm-mdx`, which is just an npm alias to `remark-gfm@^4`)

Lesson learned: avoid downgrading `remark-gfm` to v3; it can break MDX compilation.

## Shipping / Branching

- Netlify production deploys are tied to `main`.
- Deploy Previews should be used for PR review; do not merge large redesign work to `main` until it is production-ready.

## CI / Automation

- Local checks: `bun run lint`, `bun run typecheck`, `bun run build`.
- Jenkins:
  - There is a `.jenkins/` folder; prefer a root `Jenkinsfile` for Multibranch Pipeline jobs.
  - Pipeline should be deterministic (`bun install --frozen-lockfile`) and run the three checks above.
  - Jenkins `sh` steps run under `/bin/sh` by default; avoid bash-only options like `set -o pipefail`.
  - On Kubernetes clusters enforcing short-name image resolution, keep agent images fully qualified (for example `docker.io/library/node:22-bullseye`).
  - This Jenkins instance runs on Kubernetes (OKE) and uses Kubernetes agents; builds may run on arm64 nodes.
    - Any downloaded binaries used in CI must be architecture-aware (for example `hadolint`).
  - Docker portability is validated in CI:
    - Dockerfile lint via `hadolint` (downloaded per-build; arch-aware for arm64/amd64)
    - Container build via `kaniko` with `--no-push` (builds without requiring Docker-in-Docker)
      - The kaniko stage writes to `"$WORKSPACE/.kaniko-build.log"` and tails periodically to keep logs readable and the durable-task heartbeat alive.
  - Tool versions are pinned for reproducibility:
    - Bun: `1.3.5` (matches `package.json` and `Dockerfile`)
  - Next.js 15 may add `/// <reference path="./.next/types/routes.d.ts" />` to `next-env.d.ts`.
    - `bun run typecheck` runs `scripts/ensure-next-routes-types.js` first to create a tiny stub so typecheck is deterministic even in a clean workspace.

## Known Gotchas / Lessons Learned

- Mixed `app/` + `pages/` is supported, but can produce confusing build errors if artifacts are stale.
  - If you see `PageNotFoundError: Cannot find module for page ...` during `next build`,
    clean `.next` and rebuild.
  - If shell policy blocks `rm -rf`, use `python3` to delete `.next`:
    - `python3 -c "import shutil; shutil.rmtree('.next', ignore_errors=True)"`
- If `next dev` starts returning 404s for `/_next/static/*` after big refactors:
  - stop the dev server
  - delete `.next`
  - restart `bun run dev`

## Definition of Done (For Any Change)

- `bun run lint`
- `bun run typecheck`
- `bun run build`
- Verify key pages render: `/`, `/projects`, `/blog`, `/systems` (and any new routes added).
- If the change affects layout/styling: verify both desktop + mobile (responsive nav, no overflow, readable type).
