'use client';

import React from 'react';

import StyledComponentsRegistry from '@/lib/styled-components-registry';
import Theme from '@/styles/theme';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AppAnalytics from '@/app/shared/AppAnalytics';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <Theme>
        <div className="relative min-h-dvh overflow-x-clip bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-primary)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(900px_circle_at_12%_12%,rgba(14,165,233,0.07),transparent_64%),radial-gradient(900px_circle_at_88%_18%,rgba(255,255,255,0.03),transparent_66%)]"
          />

          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:border focus:border-[color:var(--color-border)] focus:bg-[color:var(--color-bg-secondary)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--color-text-primary)] focus:shadow-sm"
          >
            Skip to content
          </a>

          <div className="relative flex min-h-dvh flex-col">
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>

          <AppAnalytics />
        </div>
      </Theme>
    </StyledComponentsRegistry>
  );
}
