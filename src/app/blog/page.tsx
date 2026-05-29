import type { Metadata } from 'next';
import { Suspense } from 'react';

import BlogIndexClient from '@/app/blog/BlogIndexClient';
import { getAllBlogPostsMeta, getBlogTagsWithCounts } from '@/lib/blog';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on DevOps, Kubernetes, CI/CD, and frontend work.',
  alternates: { canonical: '/blog' },
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
