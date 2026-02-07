'use client';

import React from 'react';

import StyledComponentsRegistry from '@/lib/styled-components-registry';
import Theme from '@/styles/theme';
import { Container } from '@/layout/LayoutStyles';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SimpleThemeToggle from '@/components/ThemeToggle/SimpleThemeToggle';
import AppAnalytics from '@/app/shared/AppAnalytics';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <Theme>
        <Container>
          <Header />
          <main>{children}</main>
          <Footer />
        </Container>
        <SimpleThemeToggle />
        <AppAnalytics />
      </Theme>
    </StyledComponentsRegistry>
  );
}
