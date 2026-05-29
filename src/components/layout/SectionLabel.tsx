import { cn } from '@/lib/utils';

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-sm font-medium text-[color:var(--color-text-secondary)]', className)}>
      {children}
    </p>
  );
}
