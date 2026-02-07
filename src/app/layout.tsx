import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk } from 'next/font/google';

import AppShell from '@/app/shared/AppShell';

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
    default: 'Vincent Mogah',
    template: '%s | Vincent Mogah',
  },
  description: 'Portfolio of Vincent Mogah: DevOps, Cloud, and Frontend engineering.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${spaceGrotesk.variable} light-theme`} suppressHydrationWarning>
      <head>
        {/* Set theme class before paint (prevents flash and keeps Tailwind + legacy vars in sync) */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = localStorage.getItem('theme'); // 'dark' | 'light' | null
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme ? theme === 'dark' : !!prefersDark;
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.classList.remove('light-theme');
                  } else {
                    root.classList.remove('dark');
                    root.classList.add('light-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />

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
