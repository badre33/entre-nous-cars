import { supabase } from "@/integrations/supabase/client";

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
const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
};

// Get traffic source
const getSource = (): string => {
  const referrer = document.referrer;
  if (!referrer) return 'Direct';
  
  try {
    const domain = new URL(referrer).hostname;
    if (domain.includes('facebook') || domain.includes('fb.')) return 'Facebook';
    if (domain.includes('instagram')) return 'Instagram';
    if (domain.includes('google')) return 'Google';
    if (domain.includes('bing')) return 'Bing';
    if (domain.includes('twitter') || domain.includes('x.com')) return 'Twitter/X';
    if (domain.includes('linkedin')) return 'LinkedIn';
    if (domain.includes('youtube')) return 'YouTube';
    return domain.substring(0, 200); // Limit domain length
  } catch {
    return 'Unknown';
  }
};

// Event types for categorization - must match database enum
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
            properties: { button_text: text, href: href.substring(0, 200) }
          });
        }
        
        // Track phone clicks
        if (href.startsWith('tel:')) {
          this.trackEvent({
            eventType: 'conversion',
            eventName: 'phone_click',
            properties: { phone: href.replace('tel:', '').substring(0, 50) }
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
            properties: { button_text: text, href: href.substring(0, 200) }
          });
        }
      }
    });
  }
  
  /**
   * Track an analytics event using the secure RPC function
   * This ensures server-side validation and bypasses restrictive RLS policies
   */
  async trackEvent({ eventType, eventName, properties = {} }: TrackEventOptions) {
    try {
      // Sanitize and limit property values to prevent oversized payloads
      const sanitizedProperties = JSON.parse(JSON.stringify(properties));
      const propertiesString = JSON.stringify(sanitizedProperties);
      
      // Skip if properties are too large (max 10KB)
      if (propertiesString.length > 10000) {
        console.warn('Analytics: Properties too large, skipping event');
        return;
      }

      // Use the secure RPC function instead of direct insert
      // This bypasses RLS and validates input server-side
      const { error } = await supabase.rpc('insert_analytics_event', {
        p_event_type: eventType,
        p_event_name: eventName.substring(0, 100),
        p_page_path: window.location.pathname.substring(0, 2048),
        p_referrer: document.referrer.substring(0, 2048) || null,
        p_source: getSource(),
        p_device_type: getDeviceType(),
        p_user_agent: navigator.userAgent.substring(0, 500),
        p_session_id: getSessionId(),
        p_visitor_id: getVisitorId(),
        p_properties: sanitizedProperties
      });
      
      if (error) {
        // Log error in development only
        if (import.meta.env.DEV) {
          console.error('Analytics RPC error:', error);
        }
        return;
      }
      
      // Log in development
      if (import.meta.env.DEV) {
        console.log('📊 Analytics:', eventName);
      }
    } catch (error) {
      // Silently fail in production to avoid affecting user experience
      if (import.meta.env.DEV) {
        console.error('Analytics tracking error:', error);
      }
    }
  }
  
  // Traffic events
  trackPageView(path: string) {
    this.pageStartTime = Date.now();
    this.trackEvent({
      eventType: 'traffic',
      eventName: 'page_view',
      properties: { path: path.substring(0, 500) }
    });
    this.updateSession(path);
  }
  
  /**
   * Update session using the secure RPC function
   * This ensures server-side validation and proper session management
   */
  private async updateSession(path: string) {
    try {
      // Use the secure RPC function for session updates
      const { error } = await supabase.rpc('touch_analytics_session', {
        p_session_id: getSessionId(),
        p_visitor_id: getVisitorId(),
        p_path: path.substring(0, 2048),
        p_device_type: getDeviceType(),
        p_source: getSource()
      });
      
      if (error && import.meta.env.DEV) {
        console.error('Session RPC error:', error);
      }
    } catch (error) {
      // Silently fail in production
      if (import.meta.env.DEV) {
        console.error('Session tracking error:', error);
      }
    }
  }
  
  // Behavior events
  trackTimeOnPage() {
    const timeSpent = Math.round((Date.now() - this.pageStartTime) / 1000);
    if (timeSpent > 1 && timeSpent < 7200) { // Max 2 hours to filter outliers
      this.trackEvent({
        eventType: 'behavior',
        eventName: 'time_on_page',
        properties: { seconds: timeSpent, page: window.location.pathname.substring(0, 500) }
      });
    }
  }
  
  trackScroll(percentage: number) {
    if (percentage >= 0 && percentage <= 100) {
      this.trackEvent({
        eventType: 'behavior',
        eventName: 'scroll_depth',
        properties: { percentage: Math.round(percentage) }
      });
    }
  }
  
  trackClick(elementId: string, elementType: string) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'click',
      properties: { 
        element_id: elementId.substring(0, 100), 
        element_type: elementType.substring(0, 50) 
      }
    });
  }
  
  // Conversion events
  trackFormSubmit(formName: string, formData?: Record<string, unknown>) {
    // Don't log sensitive form data
    const safeData = formData ? { fields_count: Object.keys(formData).length } : {};
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'form_submit',
      properties: { form_name: formName.substring(0, 100), ...safeData }
    });
  }
  
  trackBookingStarted(vehicleId: string, vehicleName: string) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'booking_started',
      properties: { 
        vehicle_id: vehicleId.substring(0, 100), 
        vehicle_name: vehicleName.substring(0, 100) 
      }
    });
  }
  
  trackBookingCompleted(vehicleId: string, vehicleName: string, price: number) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'booking_completed',
      properties: { 
        vehicle_id: vehicleId.substring(0, 100), 
        vehicle_name: vehicleName.substring(0, 100), 
        price: Math.max(0, price) 
      }
    });
  }
  
  trackDownload(fileName: string) {
    this.trackEvent({
      eventType: 'conversion',
      eventName: 'download',
      properties: { file_name: fileName.substring(0, 200) }
    });
  }
  
  // Marketing events
  trackCTAClick(ctaName: string, ctaLocation: string) {
    this.trackEvent({
      eventType: 'marketing',
      eventName: 'cta_click',
      properties: { 
        cta_name: ctaName.substring(0, 100), 
        cta_location: ctaLocation.substring(0, 100) 
      }
    });
  }
  
  trackCampaignView(campaignId: string, campaignName: string) {
    this.trackEvent({
      eventType: 'marketing',
      eventName: 'campaign_view',
      properties: { 
        campaign_id: campaignId.substring(0, 100), 
        campaign_name: campaignName.substring(0, 100) 
      }
    });
  }
  
  // Engagement events
  trackShare(platform: string, contentType: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'share',
      properties: { 
        platform: platform.substring(0, 50), 
        content_type: contentType.substring(0, 50) 
      }
    });
  }
  
  trackLike(contentId: string, contentType: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'like',
      properties: { 
        content_id: contentId.substring(0, 100), 
        content_type: contentType.substring(0, 50) 
      }
    });
  }
  
  trackComment(contentId: string) {
    this.trackEvent({
      eventType: 'engagement',
      eventName: 'comment',
      properties: { content_id: contentId.substring(0, 100) }
    });
  }
  
  // Search events
  trackSearch(query: string, resultsCount: number) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'search',
      properties: { 
        query: query.substring(0, 200), 
        results_count: Math.max(0, resultsCount) 
      }
    });
  }
  
  // Vehicle interaction
  trackVehicleView(vehicleId: string, vehicleName: string) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'vehicle_view',
      properties: { 
        vehicle_id: vehicleId.substring(0, 100), 
        vehicle_name: vehicleName.substring(0, 100) 
      }
    });
  }
  
  trackVehicleCompare(vehicleIds: string[]) {
    this.trackEvent({
      eventType: 'behavior',
      eventName: 'vehicle_compare',
      properties: { vehicle_ids: vehicleIds.slice(0, 10).map(id => id.substring(0, 100)) }
    });
  }
}

export const analyticsTracker = new AnalyticsTracker();
