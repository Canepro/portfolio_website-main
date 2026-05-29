'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import { SectionLabel } from '@/components/layout/SectionLabel';
import type { BlogPostMeta } from '@/lib/blog';
import { cn } from '@/lib/utils';

type TagCount = { tag: string; count: number };

export default function BlogIndexClient({
  posts,
  tags,
}: {
  posts: BlogPostMeta[];
  tags: TagCount[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag') ?? 'all';
  const [selectedTag, setSelectedTag] = useState(activeTag);

  useEffect(() => {
    setSelectedTag(searchParams?.get('tag') ?? 'all');
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === 'all') return posts;
    return posts.filter(p => p.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  const setTag = (tag: string) => {
    setSelectedTag(tag);
    const params = new URLSearchParams();
    if (tag !== 'all') params.set('tag', tag);
    const qs = params.toString();
    router.replace(qs ? `/blog?${qs}` : '/blog', { scroll: false });
  };

  return (
    <PageShell
      width="narrow"
      eyebrow="Writing"
      title="Blog"
      description="Notes on DevOps, Kubernetes, CI/CD, and frontend work."
      back={{ href: '/', label: 'Back home' }}
    >
      {tags.length > 0 ? (
        <SectionCard className="mt-8" padding="md" hover={false}>
          <SectionLabel>Filter by tag</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => setTag('all')}
              aria-pressed={selectedTag === 'all'}
              className={cn(
                'text-sm',
                selectedTag === 'all'
                  ? 'font-semibold text-[color:var(--color-text-primary)] underline decoration-[color:var(--color-accent)] underline-offset-8'
                  : 'text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]'
              )}
            >
              All <span className="text-xs opacity-70">{posts.length}</span>
            </button>
            {tags.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTag(tag)}
                aria-pressed={selectedTag === tag}
                className={cn(
                  'text-sm',
                  selectedTag === tag
                    ? 'font-semibold text-[color:var(--color-text-primary)] underline decoration-[color:var(--color-accent)] underline-offset-8'
                    : 'text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]'
                )}
              >
                {tag} <span className="text-xs opacity-70">{count}</span>
              </button>
            ))}
          </div>
        </SectionCard>
      ) : null}

      <div className="mt-10 space-y-4">
        {filteredPosts.length === 0 ? (
          <SectionCard hover={false}>
            <p className="text-[color:var(--color-text-secondary)]">
              No posts match this tag.{' '}
              <button
                type="button"
                onClick={() => setTag('all')}
                className="underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
              >
                Show all posts
              </button>
            </p>
          </SectionCard>
        ) : (
          filteredPosts.map(p => (
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
