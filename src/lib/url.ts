export function safeExternalHref(href: string | undefined | null): string | undefined {
  if (!href) return undefined;
  try {
    const url = new URL(href);
    if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') {
      return url.toString();
    }
    return undefined;
  } catch {
    return undefined;
  }
}
