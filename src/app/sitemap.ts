import type { MetadataRoute } from 'next';

import { projects } from '@/constants/constants';
import { getBlogSlugs } from '@/lib/blog';

export const revalidate = 60 * 60; // 1 hour

function getSiteUrl(): string {
  const fallback = 'https://portfolio.canepro.me';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || fallback;
  try {
    const url = new URL(raw);
    return url.toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/systems`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ];

  const projectUrls: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${siteUrl}/projects/${encodeURIComponent(p.slug)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const blogUrls: MetadataRoute.Sitemap = getBlogSlugs().map(slug => ({
    url: `${siteUrl}/blog/${encodeURIComponent(slug)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
