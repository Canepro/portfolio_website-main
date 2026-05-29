'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const jumps = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
] as const;

export default function HomeJumpNav() {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <nav
      aria-label="On this page"
      className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-y border-[color:var(--color-border)] py-4 text-sm"
    >
      {jumps.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-[color:var(--color-text-primary)] hover:underline'
          )}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/systems"
        className="text-[color:var(--color-text-secondary)] underline-offset-4 hover:text-[color:var(--color-text-primary)] hover:underline"
      >
        Systems
      </Link>
    </nav>
  );
}
