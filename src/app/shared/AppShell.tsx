'use client';

import React from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AppAnalytics from '@/app/shared/AppAnalytics';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh overflow-x-clip bg-[color:var(--color-bg-primary)] text-[color:var(--color-text-primary)]">
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
  );
}
