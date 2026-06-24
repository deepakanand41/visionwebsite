export function resolveMediaUrl(url) {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = import.meta.env.VITE_API_BASE_URL || '';
  return `${base}${url}`;
}
