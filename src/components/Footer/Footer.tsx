import Link from 'next/link';
import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

import { profile } from '@/content/profile';
import { safeExternalHref } from '@/lib/url';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const githubHref = safeExternalHref(profile.links.github);
  const linkedinHref = safeExternalHref(profile.links.linkedin);
  const twitterHref = safeExternalHref(profile.links.twitter);

  return (
    <footer className="border-t border-[color:var(--color-border)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-70">
              Get in touch
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[color:var(--color-text-secondary)]">
              If you include context (links, repo, error logs), I can respond faster.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
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
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-70">
              Navigate
            </div>
            <div className="mt-4 grid gap-2">
              <Link
                href="/projects"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                Projects
              </Link>
              <Link
                href="/systems"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                Systems
              </Link>
              <Link
                href="/blog"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                Contact
              </Link>
              <Link
                href="/#tech"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                Technologies
              </Link>
              <Link
                href="/#about"
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
              >
                About
              </Link>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-text-secondary)] opacity-70">
              Elsewhere
            </div>
            <div className="mt-5 flex items-center gap-2">
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

            <p className="mt-5 text-xs leading-5 text-[color:var(--color-text-secondary)] opacity-80">
              Constant and never-ending progress. Ship, observe, explain.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[color:var(--color-border)] pt-6 text-xs text-[color:var(--color-text-secondary)] opacity-80 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js, Bun, and shadcn-style
            primitives.
          </div>
          <div className="font-mono">jenkins.canepro.me · oke · gitops</div>
        </div>
      </div>
    </footer>
  );
}
