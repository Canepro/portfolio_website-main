import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

import { getBlogPostSource, getBlogSlugs } from '@/lib/blog';
import { mdxComponents } from '@/app/blog/mdx-components';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getBlogSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  try {
    const { meta } = getBlogPostSource(params.slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {};
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = getBlogPostSource(params.slug);
  } catch {
    notFound();
  }

  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/blog"
            className="text-sm text-[color:var(--color-text-secondary)] hover:text-white underline underline-offset-4"
          >
            Back to blog
          </Link>
          <time className="text-xs text-white/60" dateTime={post.meta.date}>
            {post.meta.date}
          </time>
        </div>

        <header className="mt-6">
          <h1 className="text-4xl font-semibold tracking-tight">{post.meta.title}</h1>
          {post.meta.description ? (
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-7">
              {post.meta.description}
            </p>
          ) : null}
          {post.meta.tags && post.meta.tags.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.meta.tags.map(t => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="mt-8">
          <MDXRemote
            source={post.source}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </div>
    </section>
  );
}
