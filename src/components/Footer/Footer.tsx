import Link from 'next/link';
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { profile } from '@/content/profile';
import { safeExternalHref } from '@/lib/url';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/layout/SectionLabel';

export default function Footer() {
  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);
  const twitterHref = safeExternalHref(profile.links.twitter);
  const quickLinks = [
    { href: '/projects', label: 'Projects' },
    { href: '/systems', label: 'Systems' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <SectionLabel>Get in touch</SectionLabel>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[color:var(--color-text-secondary)]">
              Email or LinkedIn works best. Include a repo link or error log if you have one.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="glass" size="sm" className="gap-2" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-4 w-4" /> Email
                </a>
              </Button>
              {linkedinHref ? (
                <Button variant="glass" size="sm" className="gap-2" asChild>
                  <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div>
            <SectionLabel>Navigate</SectionLabel>
            <div className="mt-3 grid gap-2">
              {quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Elsewhere</SectionLabel>
            <div className="mt-4 flex items-center gap-2">
              {githubHref ? (
                <Button variant="glass" size="icon" aria-label="GitHub" asChild>
                  <a href={githubHref} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {linkedinHref ? (
                <Button variant="glass" size="icon" aria-label="LinkedIn" asChild>
                  <a href={linkedinHref} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
              {twitterHref ? (
                <Button variant="glass" size="icon" aria-label="Twitter" asChild>
                  <a href={twitterHref} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-text-secondary)]">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Bun.
        </div>
      </div>
    </footer>
  );
}
