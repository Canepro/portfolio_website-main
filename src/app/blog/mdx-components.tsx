import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
  a: props => {
    const href = typeof props.href === 'string' ? props.href : '';
    const isExternal = href.startsWith('http://') || href.startsWith('https://');

    if (isExternal) {
      return (
        <a
          {...props}
          className={`text-[color:var(--color-accent)] underline underline-offset-4 hover:opacity-90 ${props.className || ''}`}
          target="_blank"
          rel="noopener noreferrer"
        />
      );
    }

    return (
      <Link
        href={href}
        className={`text-[color:var(--color-accent)] underline underline-offset-4 hover:opacity-90 ${props.className || ''}`}
      >
        {props.children}
      </Link>
    );
  },
  h1: props => (
    <h1
      {...props}
      className={`text-4xl font-semibold tracking-tight mt-10 ${props.className || ''}`}
    />
  ),
  h2: props => (
    <h2
      {...props}
      className={`text-2xl font-semibold tracking-tight mt-10 ${props.className || ''}`}
    />
  ),
  h3: props => (
    <h3
      {...props}
      className={`text-xl font-semibold tracking-tight mt-8 ${props.className || ''}`}
    />
  ),
  p: props => (
    <p
      {...props}
      className={`text-[color:var(--color-text-secondary)] leading-7 mt-4 ${props.className || ''}`}
    />
  ),
  ul: props => (
    <ul {...props} className={`list-disc pl-6 mt-4 space-y-2 ${props.className || ''}`} />
  ),
  ol: props => (
    <ol {...props} className={`list-decimal pl-6 mt-4 space-y-2 ${props.className || ''}`} />
  ),
  li: props => (
    <li
      {...props}
      className={`text-[color:var(--color-text-secondary)] ${props.className || ''}`}
    />
  ),
  blockquote: props => (
    <blockquote
      {...props}
      className={`mt-6 border-l-2 border-[color:var(--color-border)] pl-4 italic text-[color:var(--color-text-secondary)] ${props.className || ''}`}
    />
  ),
  code: props => (
    <code
      {...props}
      className={`rounded bg-[color:var(--color-card-bg)] px-1.5 py-0.5 text-sm text-[color:var(--color-text-primary)] ${props.className || ''}`}
    />
  ),
  pre: props => (
    <pre
      {...props}
      className={`mt-6 overflow-x-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 text-sm ${props.className || ''}`}
    />
  ),
};
