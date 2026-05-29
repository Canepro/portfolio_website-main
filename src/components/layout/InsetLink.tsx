import Link from 'next/link';

import { cn } from '@/lib/utils';

type InsetLinkProps = {
  href: string;
  title: string;
  description?: string;
  external?: boolean;
  trailing?: React.ReactNode;
  className?: string;
};

const insetLinkClassName =
  'block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3 transition-colors hover:bg-[color:var(--color-card-hover)]';

export function InsetLink({
  href,
  title,
  description,
  external,
  trailing,
  className,
}: InsetLinkProps) {
  const content = (
    <>
      <div className="text-sm font-semibold text-[color:var(--color-text-primary)]">{title}</div>
      {description ? (
        <div className="mt-1 text-sm text-[color:var(--color-text-secondary)]">{description}</div>
      ) : null}
      {trailing}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(insetLinkClassName, className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(insetLinkClassName, className)}>
      {content}
    </Link>
  );
}
