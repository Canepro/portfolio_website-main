# Portfolio Website - Development Roadmap
## Housekeeping

- Move troubleshooting content out of README to `docs/TROUBLESHOOTING.md`
- Consolidate docs with clear navigation from README
## 📌 Current Status
Last Updated: September 21, 2025

The portfolio website is live and functional with recent major improvements including:
- ✅ Container support (Docker/Podman)
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Image optimization with Next.js Image component
- ✅ Accessibility improvements
- ✅ GitHub API error handling
- ✅ **Projects Section Redesign** (August 14, 2025)
- ✅ Dedicated `/projects` page with search and filtering
- ✅ Featured projects on homepage
- ✅ Enhanced project data structure with categories
- ✅ **SEO & Meta Tags Implementation** (August 14, 2025)
- ✅ **Individual Project Detail Pages** (August 14, 2025)
- ✅ **7 Professional Projects Added** (August 14, 2025)
- ✅ Fixed project images and descriptions
- ✅ **🚀 MAJOR: Enterprise Kubernetes Project Integration** (September 21, 2025)
- ✅ **Live Production Infrastructure Demos** - Working chat app and monitoring dashboard
- ✅ **Markdown Rendering** - Professional project documentation display
- ✅ **Interactive Demo Buttons** - Real enterprise infrastructure access
- ✅ **Production Metrics Showcase** - 99.7% uptime, 20% cost optimization, 55+ pods
  - ✅ Hero modernization (gradient name, gradient primary button, larger headline/copy, dual CTAs side‑by‑side)
  - ✅ Decorative background graphics refined; opacity tuned for visibility (now 0.25)
  - ✅ Laptop width (1280–1500px) hero padding reduced for balance
  - ✅ Increased dark‑theme text contrast
  - ✅ Footer quick links/contact buttons polished
  - ✅ Featured Projects shows up to 4 cards on large screens (equal heights)

## 🚀 What's Next - Priority Order

### 1️⃣ **Immediate Actions** (Today)
- [x] Test production build locally: `npm run build && npm start`
- [x] Fix dev instability by using a clean port when needed: `npm run dev -- -p 3001`
- [x] Commit all changes to feature branch
- [x] Create PR and merge to main
- [x] Verify Netlify auto-deployment
- [x] Tag state as stable checkpoint (`stable-2025-08-15-ui-baseline`)
- [x] Tag new UI/UX baseline after 2-up layout + skeletons (`stable-2025-08-15-ui-ux-v2`)
- [x] Tag current hero+animation baseline as stable (`stable-2025-08-15-hero-anim`)

### 2️⃣ **Quick Fixes** (This Week)
- [x] Fix React hooks warnings in development
- [x] Add actual project screenshots to replace placeholder images
- [x] Fix styled-components boolean prop warnings
- [x] Fix useEffect cleanup in TimeLine component
- [x] **Enterprise Kubernetes Project Integration** ✅ COMPLETED (September 21, 2025)
- [x] **Live Demo Buttons with Analytics** ✅ COMPLETED (September 21, 2025)
- [x] **Markdown Rendering for Project Details** ✅ COMPLETED (September 21, 2025)
- [ ] Fix mobile menu not closing after navigation
- [ ] Test social media previews with Open Graph debuggers
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics or Plausible Analytics

### 3️⃣ **Enhancements** (Next Week)
- [ ] Add loading skeleton screens for better UX
- [ ] Implement dark/light theme toggle (CSS variables wired to styled-components theme)
- [ ] Add smooth scroll animations
- [ ] Create a contact form with email integration
- [ ] Add testimonials section

### 4️⃣ **Future Features** (Coming Soon)
- [ ] Blog section for technical articles
- [ ] Newsletter subscription
- [ ] Download resume/CV feature
- [ ] Interactive project demos
- [ ] API endpoint for portfolio data

## 🎯 Priority Tasks

### ✅ Recently Completed (August 14, 2025)

**Timeline Component Enhancement - Major UI/UX Improvement**
- Replaced inline styles with dedicated styled components for better maintainability
- Added framer-motion animations and lucide-react icons for modern interactions
- Implemented keyboard navigation (Arrow keys, Enter/Space) for accessibility
- Added ARIA labels and roles for screen reader support
- Removed center line and improved spacing for cleaner design
- Increased card size and height for better readability
- Ensured all dropdowns have content with fallback text
- Updated timeline content with richer highlights from LinkedIn and project data
- Added pagination dots for better navigation experience
- Enhanced light mode contrast and overall visual appeal

**Projects Section Redesign - Major Enhancement**
- Enhanced project data structure with `category` and `featured` fields
- Created `/projects` page with search and filtering capabilities
- Refactored homepage to show only 3 featured projects
- Added category badges and improved project cards
- Updated navigation with proper routing between pages
- Implemented responsive grid layout that scales well

**SEO & Meta Tags**
- Comprehensive SEO component with Open Graph and Twitter cards
- Structured data for person, website, and projects
- Dynamic sitemap.xml generation
- robots.txt for search engine guidance
- Favicon and DNS prefetch optimizations

**Individual Project Pages**
- Dynamic [slug].js pages for each project
- Rich case studies with challenges and solutions
- Technology stack breakdowns
- Impact metrics and business value
- Project-specific SEO and structured data

**Content Updates**
- Added 7 professional DevOps-focused projects
- Fixed project images to use actual screenshots
- Updated Rocket.Chat project description (deployment vs design)
- Fixed README.md with correct live site URLs

**UI/UX Baseline Improvements**
- Dark/Light theme toggle wired via CSS variables
- Styled-components theme connected to CSS variables (buttons, text, backgrounds)
- Theme toggle moved to bottom-left to avoid overlap with Rocket.Chat widget
- Featured Projects switched to 2-up balanced layout on homepage
- Equal-height project cards; consistent bottom-aligned actions
- Skeleton loaders for project cards and project detail hero
- Light mode typography made theme-safe (headings/text always visible)

### 🧭 Upcoming Modernization Plan (UI Stack)
- [ ] (Deferred) Tailwind CSS integration — staying with styled-components for now
- [x] Install shadcn/ui and scaffold primitives (Button, Card, Badge, Skeleton) ✅ COMPLETED
- [x] Replace key buttons/badges with shadcn/ui variants (homepage/detail) ✅ COMPLETED
- [x] Add TypeScript (tsconfig, strict), create `types/project.d.ts` ✅ COMPLETED
- [x] Migrate `src/constants/constants.js` and `projectDetails.js` to TS ✅ COMPLETED
- [x] Convert `ProjectCard`, `/projects` pages to TS incrementally ✅ COMPLETED
- [x] Complete TypeScript migration for all React components ✅ COMPLETED (v1.2.0)
- [ ] Add ESLint + Prettier config for TS + Tailwind

**Current Status:** Production-ready portfolio with professional features

### ✅ Completed Priority Tasks (January 2025)
- [x] **Fix React Hooks Warnings** - Development console errors ✅ COMPLETED (v1.2.0)
  - [x] Investigate invalid hook calls in development ✅ COMPLETED
  - [x] Check for duplicate React instances ✅ COMPLETED  
  - [x] Ensure proper component structure ✅ COMPLETED
- [x] **Complete TypeScript Migration** ✅ COMPLETED (v1.2.0)
  - [x] Migrate all React components (.js → .tsx) ✅ COMPLETED
  - [x] Migrate all styled components (.js → .ts) ✅ COMPLETED
  - [x] Add comprehensive type definitions ✅ COMPLETED
  - [x] Fix component prop typing ✅ COMPLETED
  - [x] Resolve all TypeScript compilation errors ✅ COMPLETED

### 🔴 Next Priority (Current Focus)
- [ ] **Dark/Light Theme Toggle Bug**
  - [ ] Toggle button switches state but base styled-components theme remains dark
  - [ ] Decide on approach: fully CSS variables or ThemeProvider switch
  - [ ] Ensure persistence and SSR-safe behavior
- [ ] **Deploy to Production**
  - [ ] Push changes to main branch
  - [ ] Verify Netlify deployment
  - [ ] Test production build locally first
  - [ ] Update DNS if needed

### 🟡 Important (Next 2-4 weeks)

#### SEO & Discoverability
- [x] Update README live site URL to `portfolio.canepro.me`
- [x] Add meta tags and Open Graph tags
- [x] Create sitemap.xml
- [x] Add robots.txt
- [x] Implement structured data (Schema.org)
- [ ] Add Google Analytics or privacy-friendly alternative
- [ ] Submit sitemap to Google Search Console
- [ ] Test with social media preview tools

#### Performance & Optimization
- [ ] Add loading states/skeleton screens
- [ ] Implement lazy loading for below-fold content
- [ ] Add image placeholders (blur-up effect)
- [ ] Set up Lighthouse CI for performance tracking
- [ ] Optimize actual project screenshots (compress/resize)
- [ ] Add WebP image format support
- [ ] Implement service worker for offline support

#### Content
- [ ] Add blog section for technical articles
- [ ] Create case studies for major projects
- [ ] Add testimonials section
- [ ] Implement contact form with email integration

### 🟢 Nice to Have (Future Enhancements)

#### User Experience
- [ ] Dark/light theme toggle with system preference detection (SSR-safe)
- [ ] Smooth scroll with offset for fixed header
- [ ] Keyboard navigation support
- [ ] Add breadcrumbs for navigation
- [ ] Implement project preview on hover

#### Developer Experience
- [ ] Set up ESLint and Prettier
- [ ] Add Husky for pre-commit hooks
- [ ] Implement unit tests with Jest
- [ ] Add component documentation
- [ ] Consider TypeScript migration

#### Advanced Features
- [ ] PWA support for offline functionality
- [ ] Internationalization (i18n)
- [ ] CMS integration for dynamic content
- [ ] Newsletter subscription
- [ ] Comments system for blog posts

## 📋 Implementation Phases

### Phase 1: Foundation ✅ COMPLETED (August 14, 2025)
**Goal:** Solve immediate scaling issues with projects section

- [x] Create `/projects` page structure
- [x] Implement basic filtering and search
- [x] Update homepage to show featured projects only
- [x] Fix README live site URL
- [x] Add essential meta tags and SEO
- [x] Enhanced project data structure with categories and featured flags
- [x] Updated navigation with proper routing
- [x] Create individual project detail pages

### Phase 2: Enhancement ✅ MOSTLY COMPLETED (August 14, 2025)
**Goal:** Improve SEO and user experience

- [x] Add Open Graph tags
- [ ] Implement loading states
- [x] Create project detail pages
- [x] Add sitemap and robots.txt
- [ ] Set up analytics
- [ ] Fix React hooks warnings in development
- [x] Add project images (using available images)

### Phase 3: Polish & Deploy 🔄 NEXT UP
**Goal:** Final polish and production deployment

- [ ] Add blog section
- [ ] Implement dark mode
- [ ] Improve animations
- [ ] Add contact form
- [ ] Performance optimizations

### Phase 4: Scale & Maintain (Ongoing)
**Goal:** Long-term improvements

- [ ] TypeScript migration
- [ ] Test coverage
- [ ] CMS integration
- [ ] Advanced features

## 🏗️ Technical Debt

### Code Quality
- [x] Remove unused `/api/hello` endpoint
- [ ] Refactor large components into smaller ones
- [ ] Extract magic numbers to constants
- [ ] Improve error boundaries

### Documentation
- [ ] Add JSDoc comments to components
- [ ] Create component usage examples
- [ ] Document deployment process
- [ ] Add troubleshooting guide

### Testing
- [ ] Add unit tests for utilities
- [ ] Component testing for critical paths
- [ ] E2E tests for user flows
- [ ] Accessibility testing

## 💡 Ideas Backlog

### Experimental Features
- Voice navigation
- 3D project showcases
- Interactive code demos
- AI-powered project recommendations
- Virtual business card (vCard download)

### Integrations
- GitHub contribution graph
- Stack Overflow reputation
- Dev.to articles feed
- LinkedIn recommendations
- Twitter feed

## 📊 Success Metrics

### Performance Goals
- Lighthouse score > 95
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Cumulative Layout Shift < 0.1

### SEO Goals
- All pages indexed by Google
- Rich snippets for projects
- Featured snippets for blog posts
- Domain authority improvement

### User Engagement
- Average session duration > 2 minutes
- Bounce rate < 40%
- Contact form submissions
- Project click-through rate

## 🐛 Known Issues

### ✅ Recently Fixed (v1.2.0-1.2.1)
- [x] **React hooks warnings in development console** ✅ COMPLETED (TypeScript migration v1.2.0)
- [x] **Element type invalid errors with shadcn/ui components** ✅ COMPLETED
- [x] **Invalid hook call warnings during development** ✅ COMPLETED (TypeScript migration v1.2.0)
- [x] **Duplicate file conflicts** ✅ COMPLETED (Cleaned up post-migration v1.2.1)
- [x] **View My Work button styling inconsistency** ✅ COMPLETED (v1.2.1)

### Bugs to Fix
- [ ] Mobile menu doesn't close after navigation
- [ ] Timeline component has scrolling issues on mobile
- [x] Project images need consistent aspect ratios (Fixed with 16:9 ImageWrapper)
- [x] Project images updated with actual screenshots where available

### Improvements Needed
- [ ] Better error messages for failed API calls
- [ ] More descriptive loading states
- [ ] Improved form validation feedback

## 📝 Notes

### Design Decisions
- Keeping styled-components for now (no Tailwind migration planned)
- Hash routing for sections on homepage, page routing for other pages
- Project data in constants.js until we have 20+ projects

### Technology Choices
- Next.js 14 with Pages Router (not App Router yet)
- npm as package manager (not yarn)
- Netlify for hosting (not Vercel)
- GitHub Actions for CI/CD

### Future Considerations
- Migrate to App Router when stable
- Consider Contentful/Sanity for content management
- Evaluate need for state management (Redux/Zustand)
- Explore edge functions for API routes

## 🔗 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Styled Components](https://styled-components.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

### Inspiration
- [Brittany Chiang](https://brittanychiang.com/)
- [Lee Robinson](https://leerob.io/)
- [Josh Comeau](https://www.joshwcomeau.com/)

### Tools
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Plausible Analytics](https://plausible.io/)

---

**Last Review Date:** August 2025
**Next Review Date:** September 2025
