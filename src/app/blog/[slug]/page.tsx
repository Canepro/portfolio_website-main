import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfmMdx from 'remark-gfm-mdx';

import { mdxComponents, proseClasses } from '@/app/blog/mdx-components';
import { PageShell } from '@/components/layout/PageShell';
import { getBlogPostSource, getBlogSlugs } from '@/lib/blog';
import { cn } from '@/lib/utils';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getBlogSlugs().map(slug => ({ slug }));
}

type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getBlogPostSource(slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;
  let post;
  try {
    post = getBlogPostSource(slug);
  } catch {
    notFound();
  }

  return (
    <PageShell
      width="narrow"
      title={post.meta.title}
      description={post.meta.description}
      back={{ href: '/blog', label: 'Back to blog' }}
      meta={
        <time
          className="text-xs text-[color:var(--color-text-secondary)] opacity-80"
          dateTime={post.meta.date}
        >
          {post.meta.date}
        </time>
      }
    >
      {post.meta.tags && post.meta.tags.length ? (
        <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">
          {post.meta.tags.join(' · ')}
        </p>
      ) : null}

      <article className={cn('mt-8', proseClasses)}>
        <MDXRemote
          source={post.source}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfmMdx] } }}
        />
      </article>

      <footer className="mt-12 border-t border-[color:var(--color-border)] pt-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
        >
          ← All posts
        </Link>
      </footer>
    </PageShell>
  );
}
