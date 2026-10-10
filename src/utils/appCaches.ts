const RUNTIME_CACHE_NAMES = new Set([
  "pages-cache", "js-chunks-cache", "css-chunks-cache", "images-cache",
  "google-fonts-cache", "gstatic-fonts-cache", "api-cache", "cdn-cache",
]);

export function isAppCache(name: string, scope: string): boolean {
  return RUNTIME_CACHE_NAMES.has(name)
    || (name.startsWith("workbox-precache-") && name.endsWith(scope));
}
