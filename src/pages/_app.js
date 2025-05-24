import React from 'react';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../themes/default';
import GlobalStyles from '../styles/GlobalStyles';

// SEO configuration
const seoConfig = {
  title: 'Vincent Mogah - DevOps/Cloud Engineer',
  description: 'Professional DevOps Engineer specializing in Azure, AWS, Docker, Kubernetes, and CI/CD automation. Transforming infrastructure through cloud excellence.',
  canonical: 'https://vincent-mogah-portfolio.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vincent-mogah-portfolio.vercel.app',
    siteName: 'Vincent Mogah Portfolio',
    title: 'Vincent Mogah - DevOps/Cloud Engineer',
    description: 'Professional DevOps Engineer specializing in cloud infrastructure, automation, and CI/CD pipelines.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vincent Mogah - DevOps Engineer Portfolio',
      },
    ],
  },
  twitter: {
    handle: '@vincentmogah',
    site: '@vincentmogah',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'DevOps Engineer, Cloud Infrastructure, Azure, AWS, Docker, Kubernetes, CI/CD, Automation, Vincent Mogah',
    },
    {
      name: 'author',
      content: 'Vincent Mogah',
    },
  ],
};

function AppWithTheme({ Component, pageProps }) {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledComponentsThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </StyledComponentsThemeProvider>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <DefaultSeo {...seoConfig} />
      <AppWithTheme Component={Component} pageProps={pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
