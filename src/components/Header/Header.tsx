'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Menu, X } from 'lucide-react';

import SimpleThemeToggle from '@/components/ThemeToggle/SimpleThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { profile } from '@/content/profile';
import { safeExternalHref } from '@/lib/url';

type NavItem = { href: string; label: string };

function isNavActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);
  const [renderMobileMenu, setRenderMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const nav: NavItem[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/systems', label: 'Systems' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

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

    const t = window.setTimeout(() => setRenderMobileMenu(false), 220);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.classList.add('mobile-nav-open');
      return () => document.body.classList.remove('mobile-nav-open');
    }
    document.body.classList.remove('mobile-nav-open');
  }, [open]);

  useEffect(() => {
    if (!open || !menuRef.current) return;

    const panel = menuRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => panel.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)]">
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
            const active = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-xl px-3 py-2 text-sm font-medium text-[color:var(--color-text-secondary)] transition-colors hover:opacity-90',
                  active && 'bg-[color:var(--color-card-bg)] text-[color:var(--color-text-primary)]'
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

          <Button variant="accent" size="sm" className="hidden md:inline-flex" asChild>
            <Link href="/contact">Contact</Link>
          </Button>

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
              'absolute inset-0 bg-black/50 transition-opacity duration-200',
              open ? 'opacity-100' : 'opacity-0'
            )}
            onClick={() => setOpen(false)}
          />

          <div
            ref={menuRef}
            id="mobile-menu"
            className={cn(
              'absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col border-l border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-5 shadow-lg transition-transform duration-200',
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
              {nav.map(item => {
                const active = isNavActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-xl border px-4 py-3 text-sm font-medium transition-colors',
                      active
                        ? 'border-[color:var(--color-accent)]/30 bg-[color:var(--color-card-hover)] text-[color:var(--color-text-primary)]'
                        : 'border-[color:var(--color-border)] bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-card-hover)]'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-6">
              <Button variant="accent" className="w-full" asChild>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Get in touch
                </Link>
              </Button>
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

            <p className="mt-auto pt-6 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
              Platform engineering portfolio.
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
