import { cn } from '@/lib/utils';

type ContentSectionProps = {
  title: string;
  id?: string;
  children: React.ReactNode;
  className?: string;
  headingClassName?: string;
};

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function ContentSection({
  title,
  id,
  children,
  className,
  headingClassName,
}: ContentSectionProps) {
  const sectionId = id ?? slugifyHeading(title);

  return (
    <section id={sectionId} className={cn('scroll-mt-24', className)}>
      <h2 className={cn('text-2xl font-semibold tracking-tight', headingClassName)}>{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
