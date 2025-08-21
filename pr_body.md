Summary
- Adds a contact page and email API, optional Google Analytics, dynamic sitemap coverage, and small fixes. Migrates project constants to TypeScript. Updates docs accordingly.

What changed
- Contact
  - New page: `/contact`
  - New API: `/api/contact` (Nodemailer SMTP)
- Analytics
  - GA snippet gated by NEXT_PUBLIC_GA_ID in `_app.js`
- SEO
  - `sitemap.xml` now includes `/projects/[slug]` and `/contact`
  - Default OG image points to an existing asset
- Data & Types
  - Migrated `src/constants/constants.ts` and `projectDetails.ts`
  - Expanded `src/types/project.d.ts`
- Fixes/Cleanup
  - font-style -> font-size in project card description
  - Removed unused ThemeToggle + useDarkMode
  - Stray file cleanup
- Docs
  - Updated README.md, docs/DEPLOYMENT.md, docs/ARCHITECTURE.md, CHANGELOG.md

Deployment (Netlify)
- Set env vars in Site settings → Build & deploy → Environment:
  - NEXT_PUBLIC_GA_ID (optional)
  - CONTACT_SMTP_HOST, CONTACT_SMTP_PORT, CONTACT_SMTP_USER, CONTACT_SMTP_PASS, CONTACT_TO (optional)
  - NEXT_PUBLIC_RC_ENABLED (optional)
- Ensure Node 18+ (set `NODE_VERSION` if needed)

How to test
- Local build: `npm ci && npm run build && npm start`
- Dev: `npm run dev` (or `npm run dev:3001`)
- Verify pages: `/`, `/projects`, `/projects/[slug]`, `/contact`, `/sitemap.xml`
- Contact form: set SMTP envs, submit form, expect 200 and email delivered
- Analytics: set NEXT_PUBLIC_GA_ID, confirm gtag loads (Network tab)

Security
- Contact API returns 500 if SMTP is not configured; no secrets sent to the client
- Analytics loads only when GA ID is present

Risks
- Low; features are gated by env vars

Checklist
- [ ] Preview deploy opens and pages render
- [ ] Contact form works with SMTP envs
- [ ] Sitemap lists all projects + /contact
- [ ] Docs read cleanly
