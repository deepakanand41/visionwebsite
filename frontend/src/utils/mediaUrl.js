const MEDIA_KEY_RE = /(?:testimonials|offers)\/[a-f0-9]+\.[a-z0-9]+$/i;

function extractMediaKey(url) {
  if (!url) return null;
  if (url.startsWith('/api/media/')) return url.slice('/api/media/'.length);
  if (url.startsWith('/uploads/')) return url.slice('/uploads/'.length);
  const match = url.match(MEDIA_KEY_RE);
  return match ? match[0] : null;
}

/** Resolve testimonial media URL — videos use chunked /api/media streaming. */
export function resolveMediaUrl(url, { streaming = true } = {}) {
  if (!url) return null;

  const base = import.meta.env.VITE_API_BASE_URL || '';
  const key = extractMediaKey(url);

  if (streaming && key) {
    return `${base}/api/media/${key}`;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${base}${url}`;
}
