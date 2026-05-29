import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllBlogPostsMeta } from '@/lib/blog';
import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on DevOps, Kubernetes, CI/CD, and frontend work.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPostsMeta();

  return (
    <PageShell
      width="narrow"
      eyebrow="Writing"
      title="Blog"
      description="Notes on DevOps, Kubernetes, CI/CD, and frontend work."
      back={{ href: '/', label: 'Back home' }}
    >
      <div className="mt-10 space-y-4">
        {posts.length === 0 ? (
          <SectionCard hover={false}>
            <p className="text-[color:var(--color-text-secondary)]">No posts yet.</p>
          </SectionCard>
        ) : (
          posts.map(p => (
            <SectionCard key={p.slug} padding="md">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  <Link
                    href={`/blog/${encodeURIComponent(p.slug)}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {p.title}
                  </Link>
                </h2>
                <time
                  className="shrink-0 text-xs text-[color:var(--color-text-secondary)]"
                  dateTime={p.date}
                >
                  {p.date}
                </time>
              </div>
              {p.description ? (
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-secondary)]">
                  {p.description}
                </p>
              ) : null}
              {p.tags && p.tags.length ? (
                <p className="mt-3 text-xs text-[color:var(--color-text-secondary)]">
                  {p.tags.join(' · ')}
                </p>
              ) : null}
            </SectionCard>
          ))
        )}
      </div>
    </PageShell>
  );
}
