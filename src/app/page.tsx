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
  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);
  type CertificationWithHref = (typeof featuredCerts)[number] & { href: string };
  const featuredCertsSafe: CertificationWithHref[] = featuredCerts
    .map(c => ({ ...c, href: safeExternalHref(c.link) }))
    .filter((c): c is CertificationWithHref => Boolean(c.href));

  return (
    <div className="px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
          <div>
            <p className="text-sm font-medium tracking-wide text-[color:var(--color-text-secondary)]">
              {profile.headline}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-5 max-w-xl text-[color:var(--color-text-secondary)] leading-7">
              I design and operate production systems: GitOps-driven Kubernetes, identity
              reliability, and observability. Measured in safe deploys, clean dashboards, and boring
              on-call.
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
              <Badge variant="tech">2 clusters: OKE hub + AKS spoke</Badge>
              <Badge variant="tech">GitOps: Argo CD</Badge>
              <Badge variant="tech">CI: Jenkins multibranch</Badge>
              <Badge variant="tech">Telemetry: OTLP → LGTM</Badge>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Summary</h2>
            <div className="mt-4 space-y-3 text-[color:var(--color-text-secondary)] leading-7">
              {profile.summary.map(p => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {githubHref ? (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-card-hover)]"
                >
                  GitHub
                </a>
              ) : null}
              {linkedinHref ? (
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-card-hover)]"
                >
                  LinkedIn
                </a>
              ) : null}
              <span className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)]">
                {profile.location}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8">
            <h2 className="text-3xl font-semibold tracking-tight">Certifications</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              Selected licenses and certifications (details link on LinkedIn).
            </p>
            <div className="mt-6 space-y-3">
              {featuredCertsSafe.map(c => (
                <a
                  key={c.name}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-4 hover:bg-[color:var(--color-card-hover)]"
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
      </section>

      <section id="tech" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Skills</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              The goal is not to list tools. It is to show the small set of capabilities that lets
              me own a system end-to-end.
            </p>
          </div>
          <div className="hidden text-sm text-[color:var(--color-text-secondary)] opacity-80 md:block">
            Recruiter-friendly. Evidence-driven.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillGroups.map(group => (
            <div
              key={group.title}
              className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                <Badge variant="tech">Core</Badge>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                {group.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map(s => (
                  <Badge key={s.name} variant="tech" title={s.notes}>
                    {s.name}
                  </Badge>
                ))}
              </div>

              {group.evidence && group.evidence.length ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.evidence.map(e => {
                    const isInternal = e.href.startsWith('/') || e.href.startsWith('#');
                    const safeHref = isInternal ? e.href : safeExternalHref(e.href);
                    if (!safeHref) return null;
                    if (!isInternal) {
                      return (
                        <a
                          key={e.href}
                          href={safeHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-card-hover)]"
                        >
                          {e.label}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={e.href}
                        href={safeHref}
                        className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] px-3 py-1 text-xs font-semibold text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-card-hover)]"
                      >
                        {e.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Experience</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              A reliability-first track record across identity platforms and cloud-native
              operations.
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

      <section id="projects" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Featured Projects</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              Each project is written to be scannable: problem, approach, and what changed.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)] md:block"
          >
            View all projects
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map(p => {
            const visitHref = safeExternalHref(p.visit);
            return (
              <article
                key={p.slug}
                className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
              >
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 6).map(t => (
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

      <section id="about" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="grid gap-8 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              I’m a hands-on engineer who likes tight feedback loops: infrastructure as code,
              GitOps, dashboards that answer questions, and UIs that respect performance and
              accessibility. I value clarity, operational ownership, and repeatability.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-4">
              <div className="text-xs text-[color:var(--color-text-secondary)] opacity-80">
                Default approach
              </div>
              <div className="mt-2 text-sm font-semibold">Automate, observe, then simplify.</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-4">
              <div className="text-xs text-[color:var(--color-text-secondary)] opacity-80">
                What I optimize for
              </div>
              <div className="mt-2 text-sm font-semibold">Boring runbooks. Fast recovery.</div>
            </div>
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-4">
              <div className="text-xs text-[color:var(--color-text-secondary)] opacity-80">
                Collaboration
              </div>
              <div className="mt-2 text-sm font-semibold">Write it down. Make it reproducible.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Writing</h2>
            <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
              Short, practical notes. The goal is to make my thinking reviewable.
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
