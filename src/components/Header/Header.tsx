'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';

import SimpleThemeToggle from '@/components/ThemeToggle/SimpleThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profile } from '@/content/profile';
import { safeExternalHref } from '@/lib/url';

type NavItem = { href: string; label: string };

export default function Header() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const [renderMobileMenu, setRenderMobileMenu] = useState(false);

  const nav: NavItem[] = useMemo(
    () => [
      { href: '/', label: 'Home' },
      { href: '/projects', label: 'Projects' },
      { href: '/systems', label: 'Systems' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contact' },
      { href: '/#tech', label: 'Technologies' },
      { href: '/#about', label: 'About' },
    ],
    []
  );

  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setRenderMobileMenu(true);
      return;
    }

    // Unmount after the close animation so the overlay can't steal taps on mobile.
    const t = window.setTimeout(() => setRenderMobileMenu(false), 220);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    // Close mobile menu on navigation.
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6 md:px-10">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-card-bg)] text-sm font-semibold text-[color:var(--color-text-primary)] shadow-sm transition-colors group-hover:bg-[color:var(--color-card-hover)]">
            VM
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:inline">
            {profile.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : item.href.startsWith('/#')
                  ? pathname === '/'
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:opacity-90',
                  isActive &&
                    'bg-[color:var(--color-card-bg)] text-[color:var(--color-text-primary)]'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {githubHref ? (
            <Button variant="glass" size="icon" className="hidden md:inline-flex" asChild>
              <a href={githubHref} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          ) : null}
          {linkedinHref ? (
            <Button variant="glass" size="icon" className="hidden md:inline-flex" asChild>
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          ) : null}

          <SimpleThemeToggle className="hidden md:inline-flex" />

          <Button
            type="button"
            variant="glass"
            size="icon"
            className="shadow-sm md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {renderMobileMenu ? (
        <div
          className={cn(
            'fixed inset-0 z-50 md:hidden',
            open ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          aria-hidden={!open}
        >
          <div
            className={cn(
              'absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-200',
              open ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setOpen(false)}
          />

          <div
            id="mobile-menu"
            className={cn(
              'absolute right-0 top-0 h-full w-[86vw] max-w-sm border-l border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-5 shadow-2xl transition-transform duration-200',
              open ? 'translate-x-0' : 'translate-x-full'
            )}
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--color-border)] pb-4">
              <div
                id="mobile-menu-title"
                className="text-sm font-semibold text-[color:var(--color-text-primary)]"
              >
                Menu
              </div>
              <Button
                type="button"
                variant="glass"
                size="icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-5 grid gap-1">
              {nav.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] px-4 py-3 text-sm font-medium text-[color:var(--color-text-primary)] shadow-sm hover:bg-[color:var(--color-card-hover)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <SimpleThemeToggle />
              {githubHref ? (
                <Button variant="glass" size="icon" asChild>
                  <a
                    href={githubHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {linkedinHref ? (
                <Button variant="glass" size="icon" asChild>
                  <a
                    href={linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>

            <p className="mt-6 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
              Short, high-signal notes. Production-first engineering. Documentation over vibes.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
