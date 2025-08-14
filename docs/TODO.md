# Portfolio Website - Development Roadmap

## 📌 Current Status
Last Updated: August 2025

The portfolio website is live and functional with recent improvements including:
- ✅ Container support (Docker/Podman)
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Image optimization with Next.js Image component
- ✅ Accessibility improvements
- ✅ GitHub API error handling

## 🎯 Priority Tasks

### 🔴 Critical (Immediate Need)
- [ ] **Projects Section Redesign** - Current grid doesn't scale well
  - [ ] Create dedicated `/projects` page with pagination
  - [ ] Implement filtering by technology/category
  - [ ] Add search functionality
  - [ ] Limit homepage to 6 featured projects
  - [ ] Create individual project detail pages

### 🟡 Important (Next 2-4 weeks)

#### SEO & Discoverability
- [ ] Update README live site URL to `portfolio.canepro.me`
- [ ] Add meta tags and Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Implement structured data (Schema.org)
- [ ] Add Google Analytics or privacy-friendly alternative

#### Performance
- [ ] Add loading states/skeleton screens
- [ ] Implement lazy loading for below-fold content
- [ ] Add image placeholders (blur-up effect)
- [ ] Set up Lighthouse CI for performance tracking

#### Content
- [ ] Add blog section for technical articles
- [ ] Create case studies for major projects
- [ ] Add testimonials section
- [ ] Implement contact form with email integration

### 🟢 Nice to Have (Future Enhancements)

#### User Experience
- [ ] Dark/light theme toggle with system preference detection
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

### Phase 1: Foundation (Week 1-2)
**Goal:** Solve immediate scaling issues with projects section

- [ ] Create `/projects` page structure
- [ ] Implement basic filtering
- [ ] Update homepage to show featured projects only
- [ ] Fix README live site URL
- [ ] Add essential meta tags

### Phase 2: Enhancement (Week 3-4)
**Goal:** Improve SEO and user experience

- [ ] Add Open Graph tags
- [ ] Implement loading states
- [ ] Create project detail pages
- [ ] Add sitemap and robots.txt
- [ ] Set up analytics

### Phase 3: Content & Polish (Week 5-6)
**Goal:** Add more content and polish UI

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
- [ ] Remove unused `/api/hello` endpoint
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

### Bugs to Fix
- [ ] Mobile menu doesn't close after navigation
- [ ] Timeline component has scrolling issues on mobile
- [ ] Project images need consistent aspect ratios

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
