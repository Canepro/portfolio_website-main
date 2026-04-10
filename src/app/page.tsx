import Link from 'next/link';

import HeroVisual from '@/app/home/HeroVisual';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { skillGroups } from '@/content/skills';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { safeExternalHref } from '@/lib/url';
import { certifications, projects } from '@/constants/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllBlogPostsMeta().slice(0, 2);
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const featuredCerts = certifications.slice(0, 4);
  const currentRole = experience[0];
  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);
  const profileLeads = [
    'I build AI-native reliability systems that turn recurring pain into reusable tooling.',
    'Evidence, deterministic defaults, and escalation boundaries gate all automation.',
    'The result is product-style reliability work grounded in real cloud and CI/CD operations.',
  ];
  type CertificationWithHref = (typeof featuredCerts)[number] & { href: string };
  const featuredCertsSafe: CertificationWithHref[] = featuredCerts
    .map(c => ({ ...c, href: safeExternalHref(c.link) }))
    .filter((c): c is CertificationWithHref => Boolean(c.href));
  const heroHighlights = [
    'Evidence-first diagnostics',
    'Policy-aware remediation',
    'Bounded AI explanation',
    'Reusable platform tooling',
  ];
  const homeJumpLinks = [
    { href: '/#projects', label: 'Selected work' },
    { href: '/#experience', label: 'Experience' },
    { href: '/#tech', label: 'Capabilities' },
    { href: '/#writing', label: 'Writing' },
  ];
  const workPrinciples = [
    'Automate once evidence is deterministic.',
    'Boring runbooks beat clever recovery.',
    'If it is not repeatable, it is not done.',
  ];

  return (
    <div className="px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
          <div>
            <p className="text-sm font-medium tracking-wide text-[color:var(--color-text-secondary)]">
              AI-native reliability builder
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              {profile.name} builds reusable reliability systems
            </h1>
            <p className="mt-5 max-w-xl text-[color:var(--color-text-secondary)] leading-7">
              I turn recurring failures into reusable diagnostics and operator tooling.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button variant="accent" size="lg" className="h-11" asChild>
                <Link href="/projects">View Case Studies</Link>
              </Button>
              <Button variant="glass" size="lg" className="h-11" asChild>
                <Link href="/projects?mode=live">See Live Demos</Link>
              </Button>
              <Button variant="glass" size="lg" className="h-11" asChild>
                <Link href="/blog">Read Playbooks</Link>
              </Button>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {heroHighlights.map(highlight => (
                <Badge key={highlight} variant="tech">
                  {highlight}
                </Badge>
              ))}
            </div>

            <nav
              aria-label="Home sections"
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[color:var(--color-text-secondary)]"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">
                Start with
              </span>
              {homeJumpLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section id="about" className="mx-auto mt-14 max-w-6xl scroll-mt-24">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8">
            <p className="text-sm font-medium tracking-wide text-[color:var(--color-text-secondary)]">
              Profile
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Reliability, diagnostics, and reusable tooling
            </h2>
            <div className="mt-5 space-y-3 text-[color:var(--color-text-secondary)] leading-7">
              {profileLeads.map(p => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-5 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              I convert incident patterns into workflows with clearer ownership and less ambiguity.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {githubHref ? (
                <Button variant="glass" asChild>
                  <a href={githubHref} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              ) : null}
              {linkedinHref ? (
                <Button variant="glass" asChild>
                  <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              ) : null}
              <Button variant="glass" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
              <span className="inline-flex items-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)]">
                {profile.location}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            {currentRole ? (
              <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                  Current role
                </div>
                <div className="mt-3 text-lg font-semibold tracking-tight">{currentRole.role}</div>
                <div className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                  {currentRole.company}
                </div>
                {currentRole.location ? (
                  <div className="mt-1 text-xs text-[color:var(--color-text-secondary)] opacity-80">
                    {currentRole.location}
                  </div>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-text-secondary)]">
                  {currentRole.highlights.slice(0, 2).map(highlight => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                How I work
              </div>
              <div className="mt-4 grid gap-3">
                {workPrinciples.map(item => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-primary)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                Selected certifications
              </div>
              <div className="mt-4 space-y-3">
                {featuredCertsSafe.slice(0, 3).map(c => (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3 hover:bg-[color:var(--color-card-hover)]"
                  >
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="mt-1 text-xs text-[color:var(--color-text-secondary)]">
                      {c.issuer}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              Flagships are PipelineHealer and SignalForge. Platform work is supporting depth.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)] md:block"
          >
            View all projects
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map(p => {
            const visitHref = safeExternalHref(p.visit);
            return (
              <article
                key={p.slug}
                className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
              >
                <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-80">
                  {p.category}
                </div>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map(t => (
                    <Badge key={t} variant="tech">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <Link
                    href={`/projects/${encodeURIComponent(p.slug)}`}
                    className="text-sm font-semibold text-[color:var(--color-text-primary)] underline underline-offset-4 hover:opacity-90"
                  >
                    Read case study
                  </Link>
                  {visitHref ? (
                    <a
                      href={visitHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                    >
                      Live
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/projects"
            className="inline-block text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
          >
            View all projects
          </Link>
        </div>
      </section>

      <section id="experience" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              A reliability-first track record in cloud-native operations, CI/CD, and incident
              response.
            </p>
          </div>
          {linkedinHref ? (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)] md:block"
            >
              Full history on LinkedIn
            </a>
          ) : null}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experience.slice(0, 4).map(item => (
            <article
              key={`${item.company}-${item.role}-${item.start}`}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-[color:var(--color-text-secondary)] opacity-80">
                    {item.company}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">{item.role}</h3>
                </div>
                <div className="text-xs text-[color:var(--color-text-secondary)] opacity-80">
                  {item.start}
                  {item.end ? ` → ${item.end}` : ' → Present'}
                </div>
              </div>
              {item.location ? (
                <div className="mt-2 text-xs text-[color:var(--color-text-secondary)] opacity-80">
                  {item.location}
                </div>
              ) : null}
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[color:var(--color-text-secondary)]">
                {item.highlights.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          {linkedinHref ? (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
            >
              Full history on LinkedIn
            </a>
          ) : null}
        </div>
      </section>

      <section id="tech" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Capabilities</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              The point is ownership: one system from deployment to incident response.
            </p>
          </div>
          <div className="hidden text-sm text-[color:var(--color-text-secondary)] opacity-80 md:block">
            Evidence over keyword stuffing.
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {skillGroups.map(group => (
            <article
              key={group.title}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
            >
              <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                {group.description}
              </p>

              <ul className="mt-5 grid gap-2 text-sm text-[color:var(--color-text-secondary)] sm:grid-cols-2">
                {group.skills.slice(0, 6).map(skill => (
                  <li key={skill.name} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                    <span>{skill.name}</span>
                  </li>
                ))}
                {group.skills.length > 6 ? (
                  <li className="text-xs font-semibold uppercase tracking-widest opacity-70">
                    +{group.skills.length - 6} more used in day-to-day work
                  </li>
                ) : null}
              </ul>

              {group.evidence && group.evidence.length ? (
                <div className="mt-5 border-t border-[color:var(--color-border)] pt-4 text-sm text-[color:var(--color-text-secondary)]">
                  <span className="font-semibold text-[color:var(--color-text-primary)]">
                    Evidence:
                  </span>{' '}
                  {group.evidence.map((e, index) => {
                    const isInternal = e.href.startsWith('/') || e.href.startsWith('#');
                    const safeHref = isInternal ? e.href : safeExternalHref(e.href);
                    if (!safeHref) return null;

                    const linkEl = isInternal ? (
                      <Link
                        key={e.href}
                        href={safeHref}
                        className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
                      >
                        {e.label}
                      </Link>
                    ) : (
                      <a
                        key={e.href}
                        href={safeHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
                      >
                        {e.label}
                      </a>
                    );

                    return (
                      <span key={e.href}>
                        {index > 0 ? ', ' : null}
                        {linkEl}
                      </span>
                    );
                  })}
                  .
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="writing" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Writing</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              Short, practical notes from production systems. Each post records evidence and
              trade-offs.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)] md:block"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <article
              key={p.slug}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className="hover:underline underline-offset-4"
                  >
                    {p.title}
                  </Link>
                </h3>
                <time
                  className="text-xs text-[color:var(--color-text-secondary)] opacity-80"
                  dateTime={p.date}
                >
                  {p.date}
                </time>
              </div>
              {p.description ? (
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                  {p.description}
                </p>
              ) : null}
              <div className="mt-5">
                <Link
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="text-sm font-semibold text-[color:var(--color-text-primary)] underline underline-offset-4 hover:opacity-90"
                >
                  Read post
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="inline-block text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
          >
            View all posts
          </Link>
        </div>
      </section>
    </div>
  );
}
