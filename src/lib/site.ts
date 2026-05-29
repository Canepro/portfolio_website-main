export function getSiteUrl(): string {
  const fallback = 'https://portfolio.canepro.me';
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || fallback;
  try {
    const url = new URL(raw);
    return url.toString().replace(/\/$/, '');
  } catch {
    return fallback;
  }
}
