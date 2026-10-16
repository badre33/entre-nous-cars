import { analyticsTracker } from './analyticsTracker';
import { sanitizeAnalyticsProperties } from './analyticsPrivacy';
type EventProperties = Record<string, string | number | boolean>;
class Analytics {
  private events: { name: string; properties: EventProperties; timestamp: string }[] = [];
  trackEvent(name: string, properties: EventProperties = {}) {
    if (name === 'whatsapp_message_sent') return;
    const safe = sanitizeAnalyticsProperties(properties);
    this.events.push({ name, properties: safe, timestamp: new Date().toISOString() });
    if (this.events.length > 100) this.events.shift();
    void analyticsTracker.trackEvent({ eventType: name === 'vehicle_view' ? 'behavior' : 'engagement', eventName: name, properties: safe });
  }
  trackChatOpened(type: 'whatsapp' | 'ai_assistant') { this.trackEvent(type === 'whatsapp' ? 'whatsapp_widget_open' : 'chat_opened', { chat_type: type }); }
  async trackVehicleView(slug: string, name: string): Promise<void> { await analyticsTracker.trackVehicleView(slug, name); }
  trackPageView(path: string) { analyticsTracker.trackPageView(path); }
  trackOutboundClick(_url: string, _label: string) { this.trackEvent('outbound_click'); }
  trackSearchPerformed(city: string, _dates: { start: string; end: string }) { this.trackEvent('search_performed', { city }); }
  trackCarViewed(brand: string, model: string) { this.trackEvent('car_viewed', { brand, model }); }
  trackBookingStarted(model: string, price: number) { this.trackEvent('rental_request_prepared', { car_model: model, price }); }
  trackPartnerFormSubmitted() { this.trackEvent('partner_form_prepared'); }
  trackContactFormSubmitted() { this.trackEvent('contact_form_prepared'); }
  trackEmailSubscribed(_source: string) { this.trackEvent('email_form_prepared'); }
  getEvents() { return this.events; }
  clearEvents() { this.events = []; }
}
export const analytics = new Analytics();
