'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import SimpleThemeToggle from '@/components/ThemeToggle/SimpleThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profile } from '@/content/profile';

const nav = [
  { href: '/projects', label: 'Work' },
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];
export default function Header() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener('change', closeOnDesktop);
    return () => media.removeEventListener('change', closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const opener = openerRef.current;
    const previousOverflow = document.body.style.overflow;
    const backgrounds = [
      ...Array.from(document.querySelectorAll<HTMLElement>('main, footer, a[href="#content"]')),
      ...(barRef.current ? [barRef.current] : []),
    ];
    const wasInert = backgrounds.map(el => el.inert);
    backgrounds.forEach(el => {
      el.inert = true;
    });
    document.body.style.overflow = 'hidden';
    document.body.classList.add('mobile-nav-open');
    const controls = () =>
      Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    controls()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key !== 'Tab') return;
      const items = controls();
      const first = items[0];
      const last = items[items.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first || !panel.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !panel.contains(document.activeElement))
      ) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('mobile-nav-open');
      backgrounds.forEach((el, i) => {
        el.inert = wasInert[i];
      });
      opener?.focus();
    };
  }, [open]);
  const links = (mobile = false) =>
    nav.map(item => {
      const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={mobile ? () => setOpen(false) : undefined}
          aria-current={active ? 'page' : undefined}
          className={cn(
            mobile
              ? 'border-b border-[color:var(--color-border)] py-5 text-2xl'
              : 'px-2 py-3 text-sm',
            active
              ? 'text-[color:var(--color-text-primary)] underline decoration-[color:var(--color-accent)] underline-offset-8'
              : 'text-[color:var(--color-text-secondary)] hover:underline underline-offset-8'
          )}
        >
          {item.label}
        </Link>
      );
    });
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]">
      <div
        ref={barRef}
        className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6 md:px-10"
      >
        <Link href="/" className="text-base font-medium tracking-tight">
          {profile.name}
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden gap-5 md:flex" aria-label="Primary">
            {links()}
          </nav>
          <SimpleThemeToggle />
          <Button
            ref={openerRef}
            type="button"
            variant="ghost"
            size="icon"
            className="hover:bg-[color:var(--color-bg-secondary)] md:hidden"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-title"
            className="absolute inset-y-0 right-0 flex w-[88vw] max-w-sm flex-col bg-[color:var(--color-bg-primary)] px-6 py-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 id="menu-title" className="text-sm font-medium">
                Navigation
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:bg-[color:var(--color-bg-secondary)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav aria-label="Mobile" className="mt-7 flex flex-col">
              {links(true)}
            </nav>
            <Link
              href="/systems"
              className="mt-8 text-sm underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Platform archive
            </Link>
            <p className="mt-auto text-sm text-[color:var(--color-text-secondary)]">
              Agent workflows and platform reliability.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
