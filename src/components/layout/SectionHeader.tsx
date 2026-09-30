import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: { href: string; label: ReactNode; external?: boolean };
  className?: string;
};

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  const actionEl = action ? (
    action.external ? (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
      >
        {action.label}
      </a>
    ) : (
      <Link
        href={action.href}
        className="text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]"
      >
        {action.label}
      </Link>
    )
  ) : null;

  return (
    <div className={cn('flex flex-wrap items-end justify-between gap-4', className)}>
      <div>
        <h2 className="text-3xl font-medium tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-[color:var(--color-text-secondary)] leading-7">
            {description}
          </p>
        ) : null}
      </div>
      {actionEl}
    </div>
  );
}

export function SectionHeaderMobileAction({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    'inline-block text-sm text-[color:var(--color-text-secondary)] underline underline-offset-4 hover:text-[color:var(--color-text-primary)]';

  return (
    <div className="mt-8 md:hidden">
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      ) : (
        <Link href={href} className={className}>
          {label}
        </Link>
      )}
    </div>
  );
}
