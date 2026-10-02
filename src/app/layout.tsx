import type { Metadata } from 'next';
import Script from 'next/script';
import localFont from 'next/font/local';

import AppShell from '@/app/shared/AppShell';
import { profile } from '@/content/profile';
import { getSiteUrl } from '@/lib/site';

import '@/styles/GlobalStyles.css';
import '@/styles/globals.css';

const ibmPlexSans = localFont({
  src: [
    { path: './fonts/IBMPlexSans-Light.woff2', weight: '300', style: 'normal' },
    { path: './fonts/IBMPlexSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: './fonts/IBMPlexSans-Bold.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
});

const ibmPlexMono = localFont({
  src: [
    { path: './fonts/IBMPlexMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/IBMPlexMono-Medium.woff2', weight: '500', style: 'normal' },
    { path: './fonts/IBMPlexMono-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description:
    'Vincent Mogah builds agent workflows, CI remediation tools, and infrastructure diagnostics. Public source, case studies, and technical writing.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: profile.name,
    title: profile.name,
    description:
      'Agent workflows and platform reliability: public source, case studies, and technical writing.',
    images: [
      {
        url: '/images/editorial-portfolio.png',
        width: 1243,
        height: 795,
        alt: 'Portfolio homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.name,
    description:
      'Agent workflows and platform reliability: public source, case studies, and technical writing.',
    images: ['/images/editorial-portfolio.png'],
  },
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
        <link rel="apple-touch-icon" href="/images/profile.jpeg" />
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
