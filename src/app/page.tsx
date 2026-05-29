import Link from 'next/link';

import HeroVisual from '@/app/home/HeroVisual';
import { PageSection } from '@/components/layout/PageShell';
import { SectionHeader, SectionHeaderMobileAction } from '@/components/layout/SectionHeader';
import { SectionCard } from '@/components/layout/SectionCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import ProjectPreviewCard from '@/components/Projects/ProjectPreviewCard';
import { experience } from '@/content/experience';
import { profile } from '@/content/profile';
import { skillGroups } from '@/content/skills';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { safeExternalHref } from '@/lib/url';
import { certifications, projects } from '@/constants/constants';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllBlogPostsMeta().slice(0, 2);
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const featuredCerts = certifications.slice(0, 4);
  const currentRole = experience[0];
  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);
  const profileLeads = profile.summary;
  type CertificationWithHref = (typeof featuredCerts)[number] & { href: string };
  const featuredCertsSafe: CertificationWithHref[] = featuredCerts
    .map(c => ({ ...c, href: safeExternalHref(c.link) }))
    .filter((c): c is CertificationWithHref => Boolean(c.href));
  const workPrinciples = [
    'Fix the runbook before adding automation.',
    'If I cannot replay the diagnosis, the tool is not ready.',
    'Escalation stays human until the policy is obvious.',
  ];

  return (
    <div className="px-6 py-10 md:px-10">
      <PageSection spacing="none">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
          <div className="border-l-2 border-[color:var(--color-accent)] pl-6">
            <SectionLabel>Reliability engineer · UK</SectionLabel>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 max-w-xl text-[color:var(--color-text-secondary)] leading-7">
              I ship diagnostics and remediation for CI pipelines and Kubernetes platforms. Recent
              work: PipelineHealer and SignalForge.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="accent" size="lg" className="h-11" asChild>
                <Link href="/projects">View case studies</Link>
              </Button>
              <Button variant="glass" size="lg" className="h-11" asChild>
                <Link href="/blog">Read blog</Link>
              </Button>
            </div>
          </div>

          <HeroVisual />
        </div>
      </PageSection>

      <PageSection id="about" spacing="default" className="mt-14">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <SectionCard padding="lg">
            <SectionLabel>Profile</SectionLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Platform work and incident tooling
            </h2>
            <div className="mt-4 space-y-3 text-[color:var(--color-text-secondary)] leading-7">
              {profileLeads.map(p => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              Day job: Microsoft 365 and Entra escalations at Softcat. Side projects cover CI
              remediation, infra diagnostics, and the Kubernetes setup behind this site.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
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
              <span className="text-sm text-[color:var(--color-text-secondary)]">
                {profile.location}
              </span>
            </div>
          </SectionCard>

          <div className="grid gap-4">
            {currentRole ? (
              <SectionCard>
                <SectionLabel>Current role</SectionLabel>
                <div className="mt-2 text-lg font-semibold tracking-tight">{currentRole.role}</div>
                <div className="text-sm text-[color:var(--color-text-secondary)]">
                  {currentRole.company}
                  {currentRole.location ? ` · ${currentRole.location}` : null}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--color-text-secondary)]">
                  {currentRole.highlights.slice(0, 2).map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </SectionCard>
            ) : null}

            <SectionCard>
              <SectionLabel>How I work</SectionLabel>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[color:var(--color-text-secondary)]">
                {workPrinciples.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard>
              <SectionLabel>Certifications</SectionLabel>
              <div className="mt-3 space-y-2">
                {featuredCertsSafe.slice(0, 3).map(c => (
                  <a
                    key={c.name}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-[color:var(--color-border)] px-4 py-3 hover:bg-[color:var(--color-card-hover)]"
                  >
                    <div className="text-sm font-semibold">{c.name}</div>
                    <div className="mt-0.5 text-xs text-[color:var(--color-text-secondary)]">
                      {c.issuer}
                    </div>
                  </a>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </PageSection>

      <PageSection id="projects">
        <SectionHeader
          title="Selected work"
          description="PipelineHealer and SignalForge first. Other entries are platform depth."
          action={{ href: '/projects', label: 'View all projects' }}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((p, index) => (
            <ProjectPreviewCard key={p.slug} project={p} priority={index === 0} />
          ))}
        </div>

        <SectionHeaderMobileAction href="/projects" label="View all projects" />
      </PageSection>

      <PageSection id="experience">
        <SectionHeader
          title="Experience"
          description="Enterprise support and platform roles across cloud, CI/CD, and incident response."
          action={
            linkedinHref
              ? { href: linkedinHref, label: 'Full history on LinkedIn', external: true }
              : undefined
          }
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {experience.slice(0, 4).map(item => (
            <SectionCard key={`${item.company}-${item.role}-${item.start}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-[color:var(--color-text-secondary)]">
                    {item.company}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight">{item.role}</h3>
                </div>
                <div className="text-xs text-[color:var(--color-text-secondary)]">
                  {item.start}
                  {item.end ? ` – ${item.end}` : ' – Present'}
                </div>
              </div>
              {item.location ? (
                <div className="mt-1 text-xs text-[color:var(--color-text-secondary)]">
                  {item.location}
                </div>
              ) : null}
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[color:var(--color-text-secondary)]">
                {item.highlights.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </div>

        {linkedinHref ? (
          <SectionHeaderMobileAction
            href={linkedinHref}
            label="Full history on LinkedIn"
            external
          />
        ) : null}
      </PageSection>

      <PageSection id="skills">
        <SectionHeader
          title="Skills"
          description="Grouped by area, with links to the project pages where each shows up."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {skillGroups.map(group => (
            <SectionCard key={group.title}>
              <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                {group.description}
              </p>

              <ul className="mt-4 grid gap-1 text-sm text-[color:var(--color-text-secondary)] sm:grid-cols-2">
                {group.skills.slice(0, 6).map(skill => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
                {group.skills.length > 6 ? (
                  <li className="text-xs text-[color:var(--color-text-secondary)]">
                    +{group.skills.length - 6} more
                  </li>
                ) : null}
              </ul>

              {group.evidence && group.evidence.length ? (
                <div className="mt-4 border-t border-[color:var(--color-border)] pt-4 text-sm text-[color:var(--color-text-secondary)]">
                  <span className="font-medium text-[color:var(--color-text-primary)]">
                    Shown in:
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
            </SectionCard>
          ))}
        </div>
      </PageSection>

      <PageSection id="writing">
        <SectionHeader
          title="Writing"
          description="Notes from migrations, CI changes, and production failures."
          action={{ href: '/blog', label: 'View all posts' }}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <SectionCard key={p.slug}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className="hover:underline underline-offset-4"
                  >
                    {p.title}
                  </Link>
                </h3>
                <time
                  className="shrink-0 text-xs text-[color:var(--color-text-secondary)]"
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
              <div className="mt-4">
                <Link
                  href={`/blog/${encodeURIComponent(p.slug)}`}
                  className="text-sm font-medium text-[color:var(--color-text-primary)] underline underline-offset-4"
                >
                  Read post
                </Link>
              </div>
            </SectionCard>
          ))}
        </div>

        <SectionHeaderMobileAction href="/blog" label="View all posts" />
      </PageSection>
    </div>
  );
}
