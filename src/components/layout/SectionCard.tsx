import { cn } from '@/lib/utils';

type SectionCardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
};

const paddingMap = {
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-8',
};

export function SectionCard({
  children,
  className,
  padding = 'md',
  hover = true,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        'border-t border-[color:var(--color-border)]',
        hover && 'transition-colors',
        className
      )}
    >
      <div className={cn(paddingMap[padding], 'px-0')}>{children}</div>
    </div>
  );
}
