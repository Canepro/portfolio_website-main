'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

import { PageShell } from '@/components/layout/PageShell';
import { SectionCard } from '@/components/layout/SectionCard';
import type { BlogPostMeta } from '@/lib/blog';

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
      title="Writing"
      description="Implementation notes, engineering decisions, and things that broke along the way."
      back={{ href: '/', label: 'Back home' }}
    >
      {tags.length > 0 ? (
        <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-[color:var(--color-border)] pb-6">
          <label htmlFor="writing-topic" className="text-sm">
            Topic
          </label>
          <select
            id="writing-topic"
            value={selectedTag}
            onChange={e => setTag(e.target.value)}
            className="max-w-full rounded border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-3 py-2 text-sm"
          >
            <option value="all">All writing ({posts.length})</option>
            {tags.map(({ tag, count }) => (
              <option key={tag} value={tag}>
                {tag} ({count})
              </option>
            ))}
            {selectedTag !== 'all' && !tags.some(t => t.tag === selectedTag) ? (
              <option value={selectedTag}>{selectedTag}</option>
            ) : null}
          </select>
          <p className="text-sm text-[color:var(--color-text-secondary)]" aria-live="polite">
            {filteredPosts.length} articles
          </p>
        </div>
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
                <h2 className="text-2xl font-medium tracking-tight">
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
                <p className="mt-3 text-base leading-7 text-[color:var(--color-text-secondary)]">
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
