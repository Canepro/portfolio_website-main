import { cn } from '@/lib/utils';

type ContentSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
};

export function ContentSection({
  title,
  children,
  className,
  headingClassName,
}: ContentSectionProps) {
  return (
    <section className={className}>
      <h2 className={cn('text-2xl font-semibold tracking-tight', headingClassName)}>{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
