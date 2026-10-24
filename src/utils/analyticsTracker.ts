import { WHATSAPP_HANDOFF_EVENT } from './rentalRequest';
import { publicAnalyticsRpc } from './publicAnalyticsRpc';
import { analyticsEventId, appendCampaignCode, captureCampaignAttribution, getCampaignAttribution, safeAnalyticsPath, sanitizeAnalyticsProperties } from './analyticsPrivacy';

export type EventType = 'traffic' | 'behavior' | 'conversion' | 'marketing' | 'engagement';
interface TrackEventOptions { eventType: EventType; eventName: string; properties?: Record<string, unknown> }
const visitorFallback = 'v_' + analyticsEventId();
let sessionFallback = { id: 's_' + analyticsEventId(), lastActivity: Date.now() };
function visitorId(): string {
  try { let id = localStorage.getItem('benatna_visitor_id'); if (!id || !/^v_[a-z0-9-]{8,80}$/i.test(id)) { id = visitorFallback; localStorage.setItem('benatna_visitor_id', id); } return id; }
  catch { return visitorFallback; }
}
function sessionId(): string {
  const now = Date.now();
  try {
    const stored = JSON.parse(localStorage.getItem('benatna_session') || 'null');
    if (stored && typeof stored.id === 'string' && /^s_[a-z0-9-]{8,80}$/i.test(stored.id) && Number.isFinite(stored.lastActivity) && stored.lastActivity <= now && now - stored.lastActivity < 30 * 60 * 1000) sessionFallback = stored;
  } catch { /* In-memory session remains available when storage is blocked. */ }
  if (now - sessionFallback.lastActivity >= 30 * 60 * 1000) sessionFallback = { id: 's_' + analyticsEventId(), lastActivity: now };
  sessionFallback.lastActivity = now;
  try { localStorage.setItem('benatna_session', JSON.stringify(sessionFallback)); } catch { /* optional */ }
  return sessionFallback.id;
}
function deviceType(): string {
  const ua = navigator.userAgent;
  return /tablet|ipad|playbook|silk/i.test(ua) ? 'tablet' : /mobile|iphone|ipod|android/i.test(ua) ? 'mobile' : 'desktop';
}
function trafficSource(): string {
  const campaign = getCampaignAttribution();
  if (campaign) return campaign.last.source;
  if (!document.referrer) return 'Direct';
  try {
    const host = new URL(document.referrer).hostname;
    for (const [domain, label] of [['google.', 'Google'], ['bing.', 'Bing'], ['facebook.', 'Facebook'], ['instagram.', 'Instagram'], ['chatgpt.', 'ChatGPT'], ['perplexity.', 'Perplexity'], ['youtube.', 'YouTube'], ['linkedin.', 'LinkedIn']]) if (host.includes(domain)) return label;
  } catch { /* No raw referrer is retained. */ }
  return 'Other';
}
function whatsappUrl(value: string | URL | undefined): URL | null {
  try { const url = new URL(String(value), window.location.origin); return url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname) ? url : null; }
  catch { return null; }
}
function withCampaign(url: URL): string {
  const text = url.searchParams.get('text') || '';
  url.searchParams.set('text', appendCampaignCode(text));
  return url.toString();
}
class AnalyticsTracker {
  private initialized = false;
  private pageStartTime = Date.now();
  private lastPage = '';
  private activeGesture: string | null = null;
  private seenHandoffs = new Set<string>();
  init() {
    if (this.initialized) return;
    this.initialized = true;
    captureCampaignAttribution();
    document.addEventListener('click', () => { this.activeGesture = analyticsEventId(); window.setTimeout(() => { this.activeGesture = null; }, 0); }, true);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') this.trackTimeOnPage(); else this.pageStartTime = Date.now(); });
    window.addEventListener('pagehide', () => this.trackTimeOnPage());
    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target.closest('a,button') : null;
      if (!target) return;
      const href = target.getAttribute('href') || '';
      const whatsapp = whatsappUrl(href);
      if (whatsapp && !event.defaultPrevented) {
        target.setAttribute('href', withCampaign(whatsapp));
        this.trackWhatsAppClick({ source_attr: 'anchor' });
      } else if (href.startsWith('tel:')) {
        void this.trackEvent({ eventType: 'conversion', eventName: 'phone_click' });
      } else if (target.hasAttribute('data-analytics-cta')) {
        this.trackCTAClick(target.getAttribute('data-analytics-cta') || 'generic', safeAnalyticsPath(window.location.pathname));
      }
    });
    window.addEventListener(WHATSAPP_HANDOFF_EVENT, () => this.trackWhatsAppClick({ source_attr: 'confirmed_window_open' }));
  }
  trackWhatsAppClick(context: Record<string, unknown> = {}) {
    if (!this.activeGesture) { this.activeGesture = analyticsEventId(); window.setTimeout(() => { this.activeGesture = null; }, 0); }
    const id = this.activeGesture;
    if (this.seenHandoffs.has(id)) return;
    this.seenHandoffs.add(id);
    if (this.seenHandoffs.size > 200) this.seenHandoffs.delete(this.seenHandoffs.values().next().value!);
    void this.trackEvent({ eventType: 'conversion', eventName: 'whatsapp_handoff', properties: { ...context, event_id: id } });
  }
  async trackEvent({ eventType, eventName, properties = {} }: TrackEventOptions): Promise<void> {
    if (!/^[a-z][a-z0-9_]{0,63}$/.test(eventName) || ['whatsapp_message_sent', 'lead_received', 'lead_qualified', 'offer_sent', 'rental_confirmed', 'rental_completed', 'lead_lost'].includes(eventName)) return;
    if (['/auth', '/analytics', '/demandes'].includes(safeAnalyticsPath(window.location.pathname))) return;
    const safe = sanitizeAnalyticsProperties(properties);
    try {
      const { error } = await publicAnalyticsRpc('insert_analytics_event', {
        p_event_type: eventType, p_event_name: eventName, p_page_path: safeAnalyticsPath(window.location.pathname), p_referrer: null,
        p_source: trafficSource(), p_device_type: deviceType(), p_user_agent: null, p_session_id: sessionId(), p_visitor_id: visitorId(), p_properties: safe,
      });
      if (error && import.meta.env.DEV) console.warn('Analytics event was not stored');
    } catch { /* Measurement never blocks the rental request. */ }
  }
  trackPageView(path: string) {
    captureCampaignAttribution();
    const safe = safeAnalyticsPath(path);
    if (safe === this.lastPage) return;
    if (['/auth', '/analytics', '/demandes'].includes(safe)) { this.lastPage = safe; return; }
    this.lastPage = safe;
    this.pageStartTime = Date.now();
    void this.trackEvent({ eventType: 'traffic', eventName: 'page_view', properties: { path: safe } });
    void this.updateSession(safe);
  }
  private async updateSession(path: string) {
    try { await publicAnalyticsRpc('touch_analytics_session', { p_session_id: sessionId(), p_visitor_id: visitorId(), p_path: path, p_device_type: deviceType(), p_source: trafficSource() }); }
    catch { /* optional */ }
  }
  trackTimeOnPage() {
    const seconds = Math.round((Date.now() - this.pageStartTime) / 1000);
    this.pageStartTime = Date.now();
    if (seconds > 1 && seconds < 7200) void this.trackEvent({ eventType: 'behavior', eventName: 'time_on_page', properties: { seconds } });
  }
  trackScroll(percentage: number) { if (percentage >= 0 && percentage <= 100) void this.trackEvent({ eventType: 'behavior', eventName: 'scroll_depth', properties: { percentage: Math.round(percentage) } }); }
  trackClick(elementId: string, elementType: string) { return this.trackEvent({ eventType: 'behavior', eventName: 'click', properties: { element_id: elementId, element_type: elementType } }); }
  trackFormSubmit(formName: string, formData?: Record<string, unknown>) { return this.trackEvent({ eventType: 'conversion', eventName: 'form_prepared', properties: { form_name: formName, fields_count: Object.keys(formData || {}).length } }); }
  trackBookingStarted(vehicleId: string, vehicleName: string) { return this.trackEvent({ eventType: 'conversion', eventName: 'rental_request_prepared', properties: { vehicle_id: vehicleId, vehicle_name: vehicleName } }); }
  trackBookingCompleted(vehicleId: string, vehicleName: string, price: number) { return this.trackEvent({ eventType: 'conversion', eventName: 'rental_request_prepared', properties: { vehicle_id: vehicleId, vehicle_name: vehicleName, price } }); }
  trackDownload(fileName: string) { return this.trackEvent({ eventType: 'conversion', eventName: 'download', properties: { file_name: fileName } }); }
  trackCTAClick(name: string, location: string) { return this.trackEvent({ eventType: 'marketing', eventName: 'cta_click', properties: { cta_name: name, cta_location: location } }); }
  trackCampaignView(id: string, name: string) { return this.trackEvent({ eventType: 'marketing', eventName: 'campaign_view', properties: { campaign_id: id, campaign_name: name } }); }
  trackShare(platform: string, contentType: string) { return this.trackEvent({ eventType: 'engagement', eventName: 'share', properties: { platform, content_type: contentType } }); }
  trackLike(contentId: string, contentType: string) { return this.trackEvent({ eventType: 'engagement', eventName: 'like', properties: { content_id: contentId, content_type: contentType } }); }
  trackComment(contentId: string) { return this.trackEvent({ eventType: 'engagement', eventName: 'comment', properties: { content_id: contentId } }); }
  trackSearch(_query: string, resultsCount: number) { return this.trackEvent({ eventType: 'behavior', eventName: 'search', properties: { results_count: resultsCount } }); }
  trackVehicleView(vehicleId: string, vehicleName: string) { return this.trackEvent({ eventType: 'behavior', eventName: 'vehicle_view', properties: { vehicle_id: vehicleId, vehicle_name: vehicleName } }); }
  trackVehicleCompare(ids: string[]) { return this.trackEvent({ eventType: 'behavior', eventName: 'vehicle_compare', properties: { vehicle_ids: ids.slice(0, 10).join(',') } }); }
}
export const analyticsTracker = new AnalyticsTracker();
