// Dynamic import to avoid loading Supabase client in critical path
// This reduces network dependency chain for better LCP/TTI
const getSupabaseClient = async () => {
  const { supabase } = await import("@/integrations/supabase/client");
  return supabase;
};

// Generate unique visitor ID stored in localStorage
const getVisitorId = (): string => {
  let visitorId = localStorage.getItem('benatna_visitor_id');
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    localStorage.setItem('benatna_visitor_id', visitorId);
  }
  return visitorId;
};

// Generate session ID (new session after 30min inactivity)
const getSessionId = (): string => {
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  
  let sessionData = JSON.parse(localStorage.getItem('benatna_session') || '{}');
  
  if (!sessionData.id || (now - sessionData.lastActivity) > SESSION_TIMEOUT) {
    sessionData = {
      id: 's_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
      startTime: now,
      lastActivity: now
    };
  } else {
    sessionData.lastActivity = now;
  }
  
  localStorage.setItem('benatna_session', JSON.stringify(sessionData));
  return sessionData.id;
};

// Detect device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Get traffic source
const getSource = (): string => {
  const referrer = document.referrer;
  if (!referrer) return 'Direct';
  
  const domain = new URL(referrer).hostname;
  if (domain.includes('facebook') || domain.includes('fb.')) return 'Facebook';
  if (domain.includes('instagram')) return 'Instagram';
  if (domain.includes('google')) return 'Google';
  if (domain.includes('bing')) return 'Bing';
  if (domain.includes('twitter') || domain.includes('x.com')) return 'Twitter/X';
  if (domain.includes('linkedin')) return 'LinkedIn';
  if (domain.includes('youtube')) return 'YouTube';
  
  return domain;
};

// Event types for categorization
export type EventType = 
  | 'traffic'      // visites, visiteurs, pages vues
  | 'behavior'     // temps sur page, taux rebond, clics, parcours
  | 'conversion'   // formulaires, achats, téléchargements
  | 'marketing'    // sources, performance CTA
  | 'engagement';  // likes, partages, commentaires

interface TrackEventOptions {
  eventType: EventType;
  eventName: string;
  properties?: Record<string, unknown>;
}

class AnalyticsTracker {
  private pageStartTime: number = Date.now();
  private isInitialized: boolean = false;
  
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    // Track page visibility changes for time on page
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.trackTimeOnPage();
      } else {
        this.pageStartTime = Date.now();
      }
    });
    
    // Track before unload for bounce rate
    window.addEventListener('beforeunload', () => {
      this.trackTimeOnPage();
    });
    
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      // Track CTA clicks
      if (target.closest('button, a')) {
        const element = target.closest('button, a') as HTMLElement;
        const text = element.textContent?.trim().substring(0, 50) || '';
        const href = element.getAttribute('href') || '';
        
        // Track WhatsApp clicks
        if (href.includes('whatsapp') || href.includes('wa.me')) {
          this.trackEvent({
            eventType: 'conversion',
            eventName: 'whatsapp_click',
            properties: { button_text: text, href }
          });
        }
        
        // Track phone clicks
        if (href.startsWith('tel:')) {
          this.trackEvent({
            eventType: 'conversion',
            eventName: 'phone_click',
            properties: { phone: href.replace('tel:', '') }
          });
        }
        
        // Track CTA buttons
        if (element.classList.contains('cta') || 
            text.toLowerCase().includes('réserver') ||
            text.toLowerCase().includes('louer') ||
            text.toLowerCase().includes('voir')) {
          this.trackEvent({
            eventType: 'marketing',
            eventName: 'cta_click',
            properties: { button_text: text, href }
          });
        }
      }
    });
  }
  
  async trackEvent({ eventType, eventName, properties = {} }: TrackEventOptions) {
    try {
      // Dynamically load Supabase client to avoid critical path
      const supabase = await getSupabaseClient();
      
      // Use validated RPC function instead of direct INSERT
      // This enforces server-side validation for all inputs
      await supabase.rpc('insert_analytics_event', {
        p_event_type: eventType,
        p_event_name: eventName,
        p_page_path: window.location.pathname,
        p_referrer: document.referrer || null,
        p_source: getSource(),
        p_device_type: getDeviceType(),
        p_user_agent: navigator.userAgent,
        p_session_id: getSessionId(),
        p_visitor_id: getVisitorId(),
        p_properties: JSON.parse(JSON.stringify(properties))
      });
      
      // Log in development
      if (import.meta.env.DEV) {
        console.log('📊 Analytics:', eventName, { eventType, eventName, properties });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }
  
  // Traffic events
  trackPageView(path: string) {
    this.pageStartTime = Date.now();
    this.trackEvent({
      eventType: 'traffic',
      eventName: 'page_view',
      properties: { path }
    });
    this.updateSession(path);
  }
  
  private async updateSession(path: string) {
    const sessionId = getSessionId();
    const visitorId = getVisitorId();
    
    try {
      // Dynamically load Supabase client to avoid critical path
      const supabase = await getSupabaseClient();
      
      // Use secure RPC function instead of direct table access
      await supabase.rpc('touch_analytics_session', {
        p_session_id: sessionId,
        p_visitor_id: visitorId,
        p_path: path,
        p_device_type: getDeviceType(),
        p_source: getSource()
      });
    } catch (error) {
      console.error('Session tracking error:', error);
    }
  }
  
  // Behavior events
  trackTimeOnPage() {
    const timeSpent = Math.round((Date.now() - this.pageStartTime) / 1000);
    if (timeSpent > 1) {
      this.trackEvent({
        eventType: 'behavior',
        eventName: 'time_on_page',
        properties: { seconds: timeSpent, page: window.location.pathname }
      });
    }
  }
  
  trackScroll(percentage: number) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'scroll_depth',
      properties: { percentage }
    });
  }
  
  trackClick(elementId: string, elementType: string) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'click',
      properties: { element_id: elementId, element_type: elementType }
    });
  }
  
  // Conversion events
  trackFormSubmit(formName: string, formData?: Record<string, unknown>) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'form_submit',
      properties: { form_name: formName, ...formData }
    });
  }
  
  trackBookingStarted(vehicleId: string, vehicleName: string) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'booking_started',
      properties: { vehicle_id: vehicleId, vehicle_name: vehicleName }
    });
  }
  
  trackBookingCompleted(vehicleId: string, vehicleName: string, price: number) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'booking_completed',
      properties: { vehicle_id: vehicleId, vehicle_name: vehicleName, price }
    });
  }
  
  trackDownload(fileName: string) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'download',
      properties: { file_name: fileName }
    });
  }
  
  // Marketing events
  trackCTAClick(ctaName: string, ctaLocation: string) {
    this.trackEvent({
      eventType: 'marketing',
      eventName: 'cta_click',
      properties: { cta_name: ctaName, cta_location: ctaLocation }
    });
  }
  
  trackCampaignView(campaignId: string, campaignName: string) {
    this.trackEvent({
      eventType: 'marketing',
      eventName: 'campaign_view',
      properties: { campaign_id: campaignId, campaign_name: campaignName }
    });
  }
  
  // Engagement events
  trackShare(platform: string, contentType: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'share',
      properties: { platform, content_type: contentType }
    });
  }
  
  trackLike(contentId: string, contentType: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'like',
      properties: { content_id: contentId, content_type: contentType }
    });
  }
  
  trackComment(contentId: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'comment',
      properties: { content_id: contentId }
    });
  }
  
  // Search events
  trackSearch(query: string, resultsCount: number) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'search',
      properties: { query, results_count: resultsCount }
    });
  }
  
  // Vehicle interaction
  trackVehicleView(vehicleId: string, vehicleName: string) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'vehicle_view',
      properties: { vehicle_id: vehicleId, vehicle_name: vehicleName }
    });
  }
  
  trackVehicleCompare(vehicleIds: string[]) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'vehicle_compare',
      properties: { vehicle_ids: vehicleIds }
    });
  }
}

export const analyticsTracker = new AnalyticsTracker();
