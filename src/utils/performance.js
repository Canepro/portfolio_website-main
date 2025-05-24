import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Performance monitoring utilities
export const measureWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Measure First Contentful Paint (FCP)
  const measureFCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'timing_complete', {
              name: 'FCP',
              value: entry.startTime
            });
          }
        }
      });
    });
    observer.observe({ type: 'paint', buffered: true });
  };

  // Measure Largest Contentful Paint (LCP)
  const measureLCP = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'LCP',
          value: lastEntry.startTime
        });
      }
    });
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  };

  // Measure Cumulative Layout Shift (CLS)
  const measureCLS = () => {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log('CLS:', clsValue);
      // Send to analytics
      if (window.gtag) {
        window.gtag('event', 'timing_complete', {
          name: 'CLS',
          value: clsValue
        });
      }
    });
    observer.observe({ type: 'layout-shift', buffered: true });
  };

  // Measure First Input Delay (FID)
  const measureFID = () => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        console.log('FID:', fid);
        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'timing_complete', {
            name: 'FID',
            value: fid
          });
        }
      });
    });
    observer.observe({ type: 'first-input', buffered: true });
  };

  // Initialize measurements
  measureFCP();
  measureLCP();
  measureCLS();
  measureFID();
};

// SEO Component for enhanced meta tags
const SEOEnhancer = ({ 
  title = "Modern Portfolio - Full Stack Developer",
  description = "Professional portfolio showcasing modern web development projects with React, Next.js, and cutting-edge technologies.",
  keywords = "portfolio, web developer, React, Next.js, full stack developer, modern web design",
  author = "Your Name",
  url = "https://yourportfolio.com",
  image = "/images/og-image.jpg"
}) => {
  const { isDark } = useTheme();

  useEffect(() => {
    // Update theme-color meta tag based on current theme
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isDark ? '#0f172a' : '#ffffff';
      document.head.appendChild(meta);
    }

    // Update page title
    document.title = title;

    // Update meta description
    let descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    } else {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      descriptionMeta.content = description;
      document.head.appendChild(descriptionMeta);
    }

    // Update meta keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', keywords);
    } else {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.name = 'keywords';
      keywordsMeta.content = keywords;
      document.head.appendChild(keywordsMeta);
    }

    // Update author
    let authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) {
      authorMeta.setAttribute('content', author);
    } else {
      authorMeta = document.createElement('meta');
      authorMeta.name = 'author';
      authorMeta.content = author;
      document.head.appendChild(authorMeta);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:site_name', content: 'Modern Portfolio' },
    ];

    ogTags.forEach(tag => {
      let ogMeta = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogMeta) {
        ogMeta.setAttribute('content', tag.content);
      } else {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', tag.property);
        ogMeta.setAttribute('content', tag.content);
        document.head.appendChild(ogMeta);
      }
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    twitterTags.forEach(tag => {
      let twitterMeta = document.querySelector(`meta[name="${tag.name}"]`);
      if (twitterMeta) {
        twitterMeta.setAttribute('content', tag.content);
      } else {
        twitterMeta = document.createElement('meta');
        twitterMeta.setAttribute('name', tag.name);
        twitterMeta.setAttribute('content', tag.content);
        document.head.appendChild(twitterMeta);
      }
    });

    // Structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": author,
      "url": url,
      "image": image,
      "description": description,
      "jobTitle": "Full Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "sameAs": [
        "https://linkedin.com/in/yourprofile",
        "https://github.com/yourusername",
        "https://twitter.com/yourusername"
      ]
    };

    let structuredDataScript = document.querySelector('#structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Initialize performance monitoring
    measureWebVitals();

  }, [title, description, keywords, author, url, image, isDark]);

  return null; // This component doesn't render anything visible
};

// Analytics helper
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (process.env.NEXT_PUBLIC_GA_ID) {
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
        page_title: 'Portfolio',
        page_location: window.location.href
      });
    `;
    document.head.appendChild(script2);
  }

  // Track page views
  const trackPageView = (url) => {
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  };

  // Track custom events
  window.trackEvent = (action, category, label, value) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  return { trackPageView };
};

// Image optimization utility
export const optimizeImage = (src, width, quality = 85) => {
  if (!src) return '';
  
  // Add WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Return optimized image URL (implement based on your image service)
  if (supportsWebP()) {
    return `${src}?w=${width}&q=${quality}&f=webp`;
  }
  return `${src}?w=${width}&q=${quality}`;
};

export default SEOEnhancer;
