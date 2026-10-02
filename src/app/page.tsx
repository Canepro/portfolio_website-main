import Link from 'next/link';
import type { Metadata } from 'next';
import { PageSection } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/layout/SectionHeader';
import ProjectPreviewCard from '@/components/Projects/ProjectPreviewCard';
import { profile } from '@/content/profile';
import { skillGroups } from '@/content/skills';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { safeExternalHref } from '@/lib/url';
import { certifications, projects } from '@/constants/constants';

export const dynamic = 'force-static';
export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  const posts = getAllBlogPostsMeta().slice(0, 2);
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const firstImage = featured.find(p => p.media || p.image);
  const linkedin = safeExternalHref(profile.links.linkedin);
  return (
    <div className="mx-auto max-w-6xl px-6 pb-20 pt-12 md:px-10 md:pt-20">
      <section
        className="grid gap-6 pb-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-end md:pb-16"
        aria-labelledby="intro-title"
      >
        <div>
          <p className="font-mono text-sm text-[color:var(--color-text-secondary)]">
            Agent systems engineer · Glasgow, UK
          </p>
          <h1
            id="intro-title"
            className="mt-5 text-4xl font-medium leading-tight tracking-tight md:text-6xl"
          >
            {profile.name}
          </h1>
        </div>
        <div>
          <p className="max-w-xl text-lg leading-8 text-[color:var(--color-text-secondary)]">
            I build agent workflows, CI remediation tools, and infrastructure diagnostics. The work
            below shows how they use evidence, permissions, and verification.
          </p>
          <div className="mt-5 flex gap-6 text-sm">
            <a
              href="#projects"
              className="font-medium underline decoration-[color:var(--color-accent)] underline-offset-4"
            >
              Explore the work <span aria-hidden="true">↓</span>
            </a>
            <Link href="/contact" className="underline underline-offset-4">
              Contact
            </Link>
            <a href="/cv/Vincent-Mogah-CV.pdf" download className="underline underline-offset-4">
              Download CV
            </a>
          </div>
        </div>
      </section>
      <PageSection id="projects" spacing="none" className="max-w-none">
        <SectionHeader
          title="Selected work"
          action={{
            href: '/projects',
            label: (
              <>
                All case studies <span aria-hidden="true">↗</span>
              </>
            ),
          }}
        />
        <div className="mt-6">
          {featured.map(p => (
            <ProjectPreviewCard key={p.slug} project={p} priority={p === firstImage} />
          ))}
        </div>
      </PageSection>
      <PageSection
        id="about"
        className="grid gap-8 border-t border-[color:var(--color-border)] pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
      >
        <h2 className="text-3xl font-medium tracking-tight">How I approach the work</h2>
        <div className="space-y-5 text-lg leading-8 text-[color:var(--color-text-secondary)]">
          <p>
            Start with the source and the failure. Keep the context that makes a diagnosis
            reviewable. Give automation a narrow job and an explicit limit on what it can change.
          </p>
          <p>
            A proposed fix needs a check through the path that failed. A deployment needs its own
            proof. Those are separate outcomes, even when one tool handles both.
          </p>
          <Link href="/systems" className="inline-block text-base underline underline-offset-4">
            Earlier platform and GitOps work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </PageSection>
      <PageSection id="skills" className="border-t border-[color:var(--color-border)] pt-10">
        <SectionHeader title="Engineering background" />
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {skillGroups.map(group => (
            <div key={group.title}>
              <h3 className="text-xl font-medium">{group.title}</h3>
              <p className="mt-2 leading-7 text-[color:var(--color-text-secondary)]">
                {group.description}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--color-text-secondary)]">
                {group.skills
                  .slice(0, 6)
                  .map(s => s.name)
                  .join(' · ')}
              </p>
              {group.evidence?.map(e => {
                const internal = e.href.startsWith('/');
                const href = internal ? e.href : safeExternalHref(e.href);
                return href ? (
                  <Link
                    key={e.href}
                    href={href}
                    {...(!internal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="mr-5 mt-3 inline-block text-sm underline underline-offset-4"
                  >
                    {e.label}
                  </Link>
                ) : null;
              })}
            </div>
          ))}
        </div>
        <details className="mt-10 border-t border-[color:var(--color-border)] pt-5">
          <summary className="cursor-pointer text-sm font-medium">
            Certifications and training
          </summary>
          <ul className="mt-4 space-y-3 text-sm">
            {certifications.map(c => {
              const href = safeExternalHref(c.link);
              return (
                <li key={c.name}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {c.name}
                    </a>
                  ) : (
                    c.name
                  )}
                  <span className="ml-2 text-[color:var(--color-text-secondary)]">{c.issuer}</span>
                </li>
              );
            })}
          </ul>
        </details>
      </PageSection>
      <PageSection id="writing" className="border-t border-[color:var(--color-border)] pt-10">
        <SectionHeader
          title="Writing"
          action={{
            href: '/blog',
            label: (
              <>
                All writing <span aria-hidden="true">↗</span>
              </>
            ),
          }}
        />
        <div className="mt-6 divide-y divide-[color:var(--color-border)]">
          {posts.map(p => (
            <article key={p.slug} className="grid gap-3 py-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
              <time
                dateTime={p.date}
                className="font-mono text-xs text-[color:var(--color-text-secondary)]"
              >
                {p.date}
              </time>
              <div>
                <h3 className="text-xl font-medium">
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className="underline underline-offset-4"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-[color:var(--color-text-secondary)]">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection
        id="contact"
        className="grid gap-8 border-t border-[color:var(--color-border)] pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-12"
      >
        <h2 className="text-3xl font-medium tracking-tight">Let’s talk.</h2>
        <div>
          <p className="text-lg leading-8 text-[color:var(--color-text-secondary)]">
            Based in Glasgow, UK. Open to remote or hybrid platform, SRE and cloud infrastructure
            roles.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="break-all underline decoration-[color:var(--color-accent)] underline-offset-4"
            >
              {profile.email}
            </a>
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            <Link href="/contact" className="underline underline-offset-4">
              Contact form
            </Link>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
