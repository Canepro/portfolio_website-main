import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';

import { proseClasses } from '@/lib/prose';
import { cn } from '@/lib/utils';

function withProse(tag: keyof HTMLElementTagNameMap, className: string, displayName: string) {
  const Component = ({ className: extra, ...props }: HTMLAttributes<HTMLElement>) => {
    const Tag = tag;
    return <Tag {...props} className={cn(className, extra)} />;
  };
  Component.displayName = displayName;
  return Component;
}

export const mdxComponents: MDXComponents = {
  a: props => {
    const href = typeof props.href === 'string' ? props.href : '';
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    const className = cn(
      'text-[color:var(--color-accent)] underline underline-offset-4 hover:opacity-90',
      props.className
    );

    if (isExternal) {
      return <a {...props} className={className} target="_blank" rel="noopener noreferrer" />;
    }

    return (
      <Link href={href} className={className}>
        {props.children}
      </Link>
    );
  },
  h1: withProse(
    'h1',
    'mt-10 text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)]',
    'MdxH1'
  ),
  h2: withProse(
    'h2',
    'mt-10 text-2xl font-semibold tracking-tight text-[color:var(--color-text-primary)]',
    'MdxH2'
  ),
  h3: withProse(
    'h3',
    'mt-8 text-xl font-semibold tracking-tight text-[color:var(--color-text-primary)]',
    'MdxH3'
  ),
  p: withProse('p', 'mt-4 text-[color:var(--color-text-secondary)] leading-7', 'MdxP'),
  ul: withProse(
    'ul',
    'mt-4 list-disc space-y-2 pl-5 text-[color:var(--color-text-secondary)]',
    'MdxUl'
  ),
  ol: withProse(
    'ol',
    'mt-4 list-decimal space-y-2 pl-5 text-[color:var(--color-text-secondary)]',
    'MdxOl'
  ),
  li: withProse('li', 'leading-7', 'MdxLi'),
  strong: withProse('strong', 'font-semibold text-[color:var(--color-text-primary)]', 'MdxStrong'),
  blockquote: withProse(
    'blockquote',
    'mt-6 border-l-2 border-[color:var(--color-border)] pl-4 italic text-[color:var(--color-text-secondary)]',
    'MdxBlockquote'
  ),
  hr: () => <hr className="my-8 h-px w-16 border-0 bg-[color:var(--color-accent)]" />,
  img: props => (
    <img
      {...props}
      alt={typeof props.alt === 'string' ? props.alt : ''}
      className={cn(
        'my-6 rounded-xl border border-[color:var(--color-border)] shadow-sm',
        props.className
      )}
      loading="lazy"
    />
  ),
  code: props => {
    const isBlock = typeof props.className === 'string' && props.className.includes('language-');
    if (isBlock) {
      return <code {...props} className={cn('font-mono text-sm', props.className)} />;
    }
    return (
      <code
        {...props}
        className={cn(
          'rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-1.5 py-0.5 font-mono text-sm text-[color:var(--color-text-primary)]',
          props.className
        )}
      />
    );
  },
  pre: props => (
    <pre
      {...props}
      className={cn(
        'my-6 overflow-x-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 text-sm',
        props.className
      )}
    />
  ),
  table: props => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[color:var(--color-border)]">
      <table {...props} className={cn('w-full border-collapse text-sm', props.className)} />
    </div>
  ),
  th: withProse(
    'th',
    'border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-3 py-2 text-left font-semibold text-[color:var(--color-text-primary)]',
    'MdxTh'
  ),
  td: withProse(
    'td',
    'border border-[color:var(--color-border)] px-3 py-2 text-[color:var(--color-text-secondary)]',
    'MdxTd'
  ),
};

export { proseClasses };
