// TypeScript interfaces for SEO structured data

export interface StructuredDataBase {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export interface PersonStructuredData extends StructuredDataBase {
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
  alumniOf: {
    "@type": string;
    name: string;
  };
  worksFor: {
    "@type": string;
    name: string;
  };
  address: {
    "@type": string;
    addressCountry: string;
    addressRegion: string;
  };
}

export interface WebsiteStructuredData extends StructuredDataBase {
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": string;
    name: string;
  };
  inLanguage: string;
  copyrightYear: string;
  genre: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string;
  author?: string;
  noIndex?: boolean;
  structuredData?: StructuredDataBase | StructuredDataBase[] | null;
}
