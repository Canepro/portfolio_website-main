import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on DevOps, cloud architecture, frontend engineering, and lessons learned.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPostsMeta();

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
            <p className="mt-3 text-[color:var(--color-text-secondary)]">
              Notes on DevOps, cloud architecture, frontend engineering, and lessons learned.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] underline underline-offset-4"
          >
            Back home
          </Link>
        </div>

        <div className="mt-10 space-y-4">
          {posts.length === 0 ? (
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 text-[color:var(--color-text-secondary)]">
              No posts yet.
            </div>
          ) : (
            posts.map(p => (
              <article
                key={p.slug}
                className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] p-6 transition-colors hover:bg-[color:var(--color-card-hover)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight">
                    <Link
                      href={`/blog/${encodeURIComponent(p.slug)}`}
                      className="hover:underline underline-offset-4"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  <time
                    className="text-xs text-[color:var(--color-text-secondary)] opacity-80"
                    dateTime={p.date}
                  >
                    {p.date}
                  </time>
                </div>
                {p.description ? (
                  <p className="mt-2 text-[color:var(--color-text-secondary)] leading-7">
                    {p.description}
                  </p>
                ) : null}
                {p.tags && p.tags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <Badge key={t} variant="tech">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
