// src/components/SEO/SEO.tsx

import Head from 'next/head';
import { SEOProps } from '../../types/components';

interface ExtendedSEOProps extends SEOProps {
  canonical?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  noIndex?: boolean;
  structuredData?: Record<string, any> | null;
}

const SEO = ({
  title = "Vincent Mogah - DevOps Engineer & Frontend Developer",
  description = "Professional portfolio of Vincent Mogah, a multifaceted DevOps Engineer, Cloud Architect, and Frontend Developer specializing in Microsoft Azure, AWS, and React.js development.",
  canonical = "https://portfolio.canepro.me",
  ogImage = "https://portfolio.canepro.me/images/profile.jpeg",
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = "DevOps Engineer, Cloud Architect, Frontend Developer, React.js, Next.js, Azure, AWS, Docker, Kubernetes, Portfolio",
  author = "Vincent Mogah",
  noIndex = false,
  structuredData = null
}: ExtendedSEOProps) => {
  const siteTitle = "Vincent Mogah Portfolio";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@Canepro" />
      <meta name="twitter:creator" content="@Canepro" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#13ADC7" />
      <meta name="msapplication-TileColor" content="#13ADC7" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
