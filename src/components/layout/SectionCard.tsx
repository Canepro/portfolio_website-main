import { Card, CardContent } from '@/components/ui/card';
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
    <Card className={cn(!hover && 'hover:bg-[color:var(--color-card-bg)]', className)}>
      <CardContent className={paddingMap[padding]}>{children}</CardContent>
    </Card>
  );
}
