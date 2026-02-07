import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk } from 'next/font/google';

import AppShell from '@/app/shared/AppShell';
import { profile } from '@/content/profile';

import '@/styles/GlobalStyles.css';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description:
    'Portfolio of Vincent Mogah: Azure infrastructure, DevOps and GitOps, identity reliability (Entra ID / Microsoft 365), and observability.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${spaceGrotesk.variable} light-theme`} suppressHydrationWarning>
      <head>
        {/* Set theme class before paint (prevents flash and keeps Tailwind + legacy vars in sync) */}
        <Script id="theme-init" src="/theme-init.js" strategy="beforeInteractive" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="dns-prefetch" href="//api.github.com" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
