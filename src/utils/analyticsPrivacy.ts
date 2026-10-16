import { analyticsPaths } from '@/data/analyticsRoutes';
import { acquisitionCampaigns, acquisitionSources, acquisitionMedia, acquisitionContents } from '@/data/acquisitionCampaigns';

export function analyticsEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') crypto.getRandomValues(bytes);
  else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  bytes[6] = (bytes[6] & 15) | 64; bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, n => n.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

type Touch = { source: string; medium: string; campaign: string; content?: string; landing_path: string; at: number };
type Attribution = { first: Touch; last: Touch };
const key = 'benatna_campaign_attribution_v1';
const lifetime = 30 * 24 * 60 * 60 * 1000;
export function safeAnalyticsPath(value: string): string {
  try { const pathname = new URL(value, window.location.origin).pathname; return analyticsPaths.has(pathname) ? pathname : '/other'; }
  catch { return '/other'; }
}
function validTouch(value: unknown): value is Touch {
  if (!value || typeof value !== 'object') return false;
  const t = value as Touch;
  return acquisitionSources.includes(t.source as typeof acquisitionSources[number])
    && acquisitionMedia.includes(t.medium as typeof acquisitionMedia[number])
    && Object.prototype.hasOwnProperty.call(acquisitionCampaigns, t.campaign)
    && (!t.content || acquisitionContents.includes(t.content as typeof acquisitionContents[number]))
    && analyticsPaths.has(t.landing_path) && Number.isFinite(t.at) && Date.now() - t.at < lifetime && t.at <= Date.now();
}
export function getCampaignAttribution(): Attribution | null {
  try {
    const data = JSON.parse(localStorage.getItem(key) || 'null');
    if (data && validTouch(data.last)) {
      const current = { first: validTouch(data.first) ? data.first : data.last, last: data.last };
      if (current.first !== data.first) localStorage.setItem(key, JSON.stringify(current));
      return current;
    }
    localStorage.removeItem(key);
    return null;
  } catch { return null; }
}
export function captureCampaignAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const touch = { source: params.get('utm_source') || '', medium: params.get('utm_medium') || '', campaign: params.get('utm_campaign') || '', content: params.get('utm_content') || undefined, landing_path: safeAnalyticsPath(window.location.pathname), at: Date.now() };
    if (!validTouch(touch)) return;
    const previous = getCampaignAttribution();
    localStorage.setItem(key, JSON.stringify({ first: previous?.first || touch, last: touch }));
  } catch { /* Storage restrictions do not affect the rental journey. */ }
}
export function campaignProperties(): Record<string, string> {
  const a = getCampaignAttribution();
  if (!a) return {};
  return { utm_source: a.last.source, utm_medium: a.last.medium, utm_campaign: a.last.campaign, ...(a.last.content ? { utm_content: a.last.content } : {}), landing_path: a.last.landing_path, first_source: a.first.source, first_medium: a.first.medium, first_campaign: a.first.campaign, first_landing_path: a.first.landing_path };
}
export function appendCampaignCode(message: string): string {
  const a = getCampaignAttribution();
  const code = a ? acquisitionCampaigns[a.last.campaign as keyof typeof acquisitionCampaigns]?.code : undefined;
  return code && !message.includes(`[${code}]`) ? `${message}\n\nRéférence campagne : [${code}]` : message;
}
const stringDimensions = new Set(['city', 'pickup_point', 'vehicle_id', 'vehicle_slug', 'vehicle_name', 'vehicle_ids', 'car_model', 'brand', 'model', 'category', 'chat_type', 'source_attr', 'form_name', 'cta_name', 'cta_location', 'campaign_id', 'campaign_name', 'platform', 'content_type', 'content_id', 'element_id', 'element_type', 'file_name', 'duration_bucket']);
const numbers = new Set(['seconds', 'percentage', 'results_count', 'fields_count', 'price', 'days', 'quantity']);
export function sanitizeAnalyticsProperties(properties: Record<string, unknown>): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {};
  for (const [name, value] of Object.entries(properties)) {
    if (name === 'event_id' && typeof value === 'string' && /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(value)) safe[name] = value;
    else if (numbers.has(name) && typeof value === 'number' && Number.isFinite(value)) safe[name] = Math.max(0, value);
    else if (name === 'is_test' && typeof value === 'boolean') safe[name] = value;
    else if (['path', 'page', 'landing_path', 'first_landing_path'].includes(name) && typeof value === 'string') safe[name] = safeAnalyticsPath(value);
    else if (stringDimensions.has(name) && typeof value === 'string' && value.length <= 100 && !value.includes('://') && /^[\p{L}\p{N} _.,:/()-]+$/u.test(value) && !/\+?\d[\d -]{7,}\d/.test(value)) safe[name] = value;
  }
  // Attribution can only come from the validated registry, never arbitrary event input.
  return { ...safe, ...campaignProperties() };
}
