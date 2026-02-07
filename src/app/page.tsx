import Link from 'next/link';

import HeroVisual from '@/app/home/HeroVisual';
import { skillGroups } from '@/content/skills';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { projects } from '@/constants/constants';

export const dynamic = 'force-static';

export default function HomePage() {
  const posts = getAllBlogPostsMeta().slice(0, 2);
  const featured = projects.filter(p => p.featured).slice(0, 3);

  return (
    <div className="px-6 py-10 md:px-10">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium tracking-wide text-white/70">
              DevOps, Cloud, and Frontend Engineering
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
              Vincent Mogah
            </h1>
            <p className="mt-5 max-w-xl text-[color:var(--color-text-secondary)] leading-7">
              I build and operate systems that are easy to ship, observable in production, and
              boring to run. This portfolio is structured around outcomes: GitOps, Kubernetes ops,
              and practical frontend craftsmanship.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-xl bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-black hover:opacity-95"
              >
                View Projects
              </Link>
              <Link
                href="/blog"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.07]"
              >
                Read Writing
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/[0.06]"
              >
                Contact
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Strength</div>
                <div className="mt-2 text-sm font-semibold">K8s + GitOps</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Focus</div>
                <div className="mt-2 text-sm font-semibold">Observability</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Also</div>
                <div className="mt-2 text-sm font-semibold">Frontend</div>
              </div>
            </div>
          </div>

          <HeroVisual />
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
          <div className="hidden text-sm text-white/60 md:block">
            Recruiter-friendly. Evidence-driven.
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {skillGroups.map(group => (
            <div
              key={group.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70">
                  Core
                </span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                {group.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map(s => (
                  <span
                    key={s.name}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80"
                    title={s.notes}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
            className="hidden text-sm text-white/70 underline underline-offset-4 hover:text-white md:block"
          >
            View all projects
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map(p => (
            <article
              key={p.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition-colors"
            >
              <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-text-secondary)] leading-6">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.slice(0, 6).map(t => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link
                  href={`/projects/${p.slug}`}
                  className="text-sm font-semibold text-white underline underline-offset-4 hover:opacity-90"
                >
                  Read case study
                </Link>
                {p.visit ? (
                  <a
                    href={p.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 hover:text-white"
                  >
                    Live
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/projects"
            className="inline-block text-sm text-white/70 underline underline-offset-4 hover:text-white"
          >
            View all projects
          </Link>
        </div>
      </section>

      <section id="about" className="mx-auto mt-16 max-w-6xl scroll-mt-24">
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              I’m a hands-on engineer who likes tight feedback loops: infrastructure as code,
              GitOps, dashboards that answer questions, and UIs that respect performance and
              accessibility. I value clarity, operational ownership, and repeatability.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/60">Default approach</div>
              <div className="mt-2 text-sm font-semibold">Automate, observe, then simplify.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/60">What I optimize for</div>
              <div className="mt-2 text-sm font-semibold">Boring runbooks. Fast recovery.</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-xs text-white/60">Collaboration</div>
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
            className="hidden text-sm text-white/70 underline underline-offset-4 hover:text-white md:block"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <article
              key={p.slug}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition-colors"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link href={`/blog/${p.slug}`} className="hover:underline underline-offset-4">
                    {p.title}
                  </Link>
                </h3>
                <time className="text-xs text-white/60" dateTime={p.date}>
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
                  href={`/blog/${p.slug}`}
                  className="text-sm font-semibold text-white underline underline-offset-4 hover:opacity-90"
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
            className="inline-block text-sm text-white/70 underline underline-offset-4 hover:text-white"
          >
            View all posts
          </Link>
        </div>
      </section>
    </div>
  );
}
