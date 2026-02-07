import type { Metadata } from 'next';
import Script from 'next/script';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

import AppShell from '@/app/shared/AppShell';
import { profile } from '@/content/profile';

import '@/styles/GlobalStyles.css';
import '@/styles/globals.css';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
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
    // Default to dark (site is designed dark-first). theme-init.js will flip to light if user chose it.
    <html
      lang="en-GB"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Set theme class before paint (prevents flash and keeps Tailwind + legacy vars in sync) */}
        {/* Cache-bust the theme script: Netlify can cache /theme-init.js aggressively across deploys. */}
        <Script id="theme-init" src="/theme-init.js?v=2" strategy="beforeInteractive" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <meta name="color-scheme" content="dark light" />
        <link rel="dns-prefetch" href="//api.github.com" />
      </head>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
