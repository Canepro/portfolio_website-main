# Agent Instructions (Repo-Specific)

This repository is a Next.js portfolio site built with TypeScript and Bun.

## Quick Commands

- Install: `bun install`
- Dev: `bun run dev`
- Build: `bun run build`
- Start: `bun run start`
- Lint: `bun run lint`
- Typecheck: `bun run typecheck`
- Format: `bun run format` (or `bun run format:check`)

## Project Layout

- App Router (primary): `src/app` (all main pages live here)
- Legacy Pages Router (still present for a few endpoints): `src/pages`
- API routes: `src/pages/api`
- UI/components: `src/components`
- Site content/data:
  - Projects + certs: `src/constants/constants.ts`
  - Skills groupings: `src/content/skills.ts`
  - Profile/experience: `src/content/profile.ts`, `src/content/experience.ts`
  - Blog posts: `content/blog/*.mdx`
- Styles/themes: `src/styles`, `src/themes`
- Static assets: `public/` (images in `public/images`)

## Engineering Rules

- Prefer small, reviewable PRs. Keep refactors scoped and mechanical.
- Keep the site recruiter-friendly: clear headings, obvious CTAs, scannable sections, no walls of text.
- Preserve existing observability/analytics features unless explicitly removing them.
- Do not commit secrets. Use `.env.local` (see `.env.example`).
- Keep accessibility non-negotiable: labels for inputs, keyboard navigation, readable contrast.
- Treat all external URLs as untrusted even if stored in code/content.

## Styling Conventions

The codebase currently uses both `styled-components` and Tailwind utilities.

- If changing an existing component: stick to its current styling approach.
- If creating a new component: prefer Tailwind in `src/app/*` for speed and consistency with the new pages.
- Avoid generic template-y UI. Prefer evidence-driven copy, tight hierarchy, and intentional spacing.

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
- Verify key pages render: `/`, `/projects`, and any new routes added.
