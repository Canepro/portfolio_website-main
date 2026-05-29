import Link from 'next/link';

import { SectionLabel } from '@/components/layout/SectionLabel';
import { cn } from '@/lib/utils';

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  back?: { href: string; label: string };
  meta?: React.ReactNode;
  children: React.ReactNode;
  width?: 'narrow' | 'wide';
  className?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  back,
  meta,
  children,
  width = 'wide',
  className,
}: PageShellProps) {
  const maxWidth = width === 'narrow' ? 'max-w-3xl' : 'max-w-6xl';

  return (
    <div className={cn('px-6 py-10 md:px-10', className)}>
      <div className={cn('mx-auto', maxWidth)}>
        {(back || meta) && (
          <div className="flex flex-wrap items-center justify-between gap-4">
            {back ? (
              <Link
                href={back.href}
                className="text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
              >
                {back.label}
              </Link>
            ) : (
              <span />
            )}
            {meta}
          </div>
        )}

        <header className={cn(back || meta ? 'mt-6' : undefined)}>
          {eyebrow ? <SectionLabel className="mt-0">{eyebrow}</SectionLabel> : null}
          <h1
            className={cn(
              'text-4xl font-semibold tracking-tight md:text-5xl',
              eyebrow ? 'mt-4' : undefined
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-3xl text-[color:var(--color-text-secondary)] leading-7">
              {description}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </div>
  );
}

export function PageSection({
  id,
  children,
  className,
  spacing = 'default',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'default';
}) {
  return (
    <section
      id={id}
      className={cn('mx-auto max-w-6xl scroll-mt-24', spacing === 'default' && 'mt-16', className)}
    >
      {children}
    </section>
  );
}
