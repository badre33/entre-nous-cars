import { analyticsPaths } from '@/data/analyticsRoutes';

export const META_PIXEL_ID = '302125897604671';
export const AD_CONSENT_KEY = 'benatna_advertising_consent_v1';
export const AD_PREFERENCES_EVENT = 'benatna:advertising-preferences';
export const AD_CONSENT_EVENT = 'benatna:advertising-consent';
export type AdvertisingChoice = 'accepted' | 'refused';
const lifetime = 180 * 24 * 60 * 60 * 1000;
let memoryChoice: AdvertisingChoice | null = null;
let lastPage = '';
const pending = new Set<HTMLImageElement>();

export function advertisingChoice(): AdvertisingChoice | null {
  try {
    const saved = JSON.parse(localStorage.getItem(AD_CONSENT_KEY) || 'null');
    if (saved && ['accepted', 'refused'].includes(saved.choice) && Number.isFinite(saved.at) && saved.at <= Date.now() && Date.now() - saved.at < lifetime) return saved.choice;
    localStorage.removeItem(AD_CONSENT_KEY);
    return null;
  } catch { /* A choice can still apply to this tab when storage is blocked. */ }
  return memoryChoice;
}
export function saveAdvertisingChoice(choice: AdvertisingChoice) {
  memoryChoice = choice;
  try { localStorage.setItem(AD_CONSENT_KEY, JSON.stringify({ choice, at: Date.now() })); } catch { /* optional */ }
  if (choice === 'refused') {
    lastPage = '';
    for (const image of pending) { image.removeAttribute('src'); image.onload = null; image.onerror = null; }
    pending.clear();
  }
  window.dispatchEvent(new Event(AD_CONSENT_EVENT));
}
export function metaPublicPath(pathname: string): string | null {
  if (!analyticsPaths.has(pathname) || ['/auth', '/analytics', '/demandes'].includes(pathname)) return null;
  return pathname;
}
function send(event: 'PageView' | 'WhatsAppOpened', pathname: string) {
  if (advertisingChoice() !== 'accepted') return;
  const path = metaPublicPath(pathname);
  if (!path) return;
  // Image-only transport: no vendor JavaScript can read forms, query strings,
  // referrers, matching data or the WhatsApp URL/text from the page.
  const url = new URL('https://www.facebook.com/tr/');
  url.searchParams.set('id', META_PIXEL_ID);
  url.searchParams.set('ev', event);
  url.searchParams.set('dl', 'https://benatna.ma' + path);
  url.searchParams.set('noscript', '1');
  url.searchParams.set('ts', String(Date.now()));
  const image = new Image(1, 1);
  image.referrerPolicy = 'no-referrer';
  image.onload = image.onerror = () => { pending.delete(image); };
  pending.add(image);
  image.src = url.toString();
}
export function trackMetaPage(pathname: string) {
  const path = metaPublicPath(pathname);
  if (!path) { lastPage = ''; return; }
  if (advertisingChoice() !== 'accepted' || path === lastPage) return;
  lastPage = path;
  send('PageView', path);
}
export function trackMetaWhatsApp() {
  send('WhatsAppOpened', window.location.pathname);
}
