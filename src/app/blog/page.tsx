import type { Metadata } from 'next';
import { Suspense } from 'react';

import BlogIndexClient from '@/app/blog/BlogIndexClient';
import { getAllBlogPostsMeta, getBlogTagsWithCounts } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Implementation notes, engineering decisions, and things that broke along the way.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Writing',
    description:
      'Implementation notes, engineering decisions, and things that broke along the way.',
    url: '/blog',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Writing',
    description:
      'Implementation notes, engineering decisions, and things that broke along the way.',
    images: [],
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPostsMeta();
  const tags = getBlogTagsWithCounts();

  return (
    <Suspense fallback={null}>
      <BlogIndexClient posts={posts} tags={tags} />
    </Suspense>
  );
}
