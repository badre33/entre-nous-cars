type EventProperties = Record<string, string | number | boolean>;

interface AnalyticsEvent {
  name: string;
  properties?: EventProperties;
  timestamp: string;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private readonly maxEvents = 100;

  // Track conversion events
  trackEvent(name: string, properties?: EventProperties) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);
    
    // Keep only last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', event);
    }

    // Send to analytics service (Google Analytics, Mixpanel, etc.)
    this.sendToAnalytics(event);
  }

  // Conversion tracking methods
  trackSearchPerformed(city: string, dates: { start: string; end: string }) {
    this.trackEvent('search_performed', {
      city,
      start_date: dates.start,
      end_date: dates.end,
      page: window.location.pathname,
    });
  }

  trackCarViewed(carBrand: string, carModel: string) {
    this.trackEvent('car_viewed', {
      brand: carBrand,
      model: carModel,
      page: window.location.pathname,
    });
  }

  /**
   * Track vue de fiche véhicule — utilisé par VehicleDetail.tsx.
   * Renvoie une Promise pour compatibilité avec `.catch(() => {})` côté appelant.
   */
  async trackVehicleView(vehicleSlug: string, vehicleName: string): Promise<void> {
    this.trackEvent('vehicle_view', {
      vehicle_slug: vehicleSlug,
      vehicle_name: vehicleName,
      page: window.location.pathname,
    });
  }

  trackBookingStarted(carModel: string, price: number) {
    this.trackEvent('booking_started', {
      car_model: carModel,
      price,
      page: window.location.pathname,
    });
  }

  trackPartnerFormSubmitted() {
    this.trackEvent('partner_form_submitted', {
      page: window.location.pathname,
    });
  }

  trackContactFormSubmitted() {
    this.trackEvent('contact_form_submitted', {
      page: window.location.pathname,
    });
  }

  trackEmailSubscribed(source: string) {
    this.trackEvent('email_subscribed', {
      source,
      page: window.location.pathname,
    });
  }

  trackChatOpened(chatType: 'whatsapp' | 'ai_assistant') {
    this.trackEvent('chat_opened', {
      chat_type: chatType,
      page: window.location.pathname,
    });
  }

  trackPageView(path: string) {
    this.trackEvent('page_view', {
      path,
      referrer: document.referrer,
    });
  }

  trackOutboundClick(url: string, label: string) {
    this.trackEvent('outbound_click', {
      url,
      label,
      page: window.location.pathname,
    });
  }

  // Send to analytics service
  private sendToAnalytics(event: AnalyticsEvent) {
    // === GTM dataLayer push (PRIMARY) ===
    // Push to window.dataLayer directly — this works EVEN IF gtag/GTM script
    // is not yet loaded (because the GTM snippet defines window.dataLayer = []
    // synchronously, before the async gtm.js loads). Critical to not lose
    // events fired during the first second of page load.
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: event.name,
        event_category: 'conversion',
        page_path: window.location.pathname,
        page_title: document.title,
        ...(event.properties || {}),
      });
    }

    // === gtag direct (SECONDARY / belt-and-suspenders) ===
    // For the gtag/js?id=G-... legacy snippet — if loaded, also forward.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties);
    }

    // Meta Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbq = (window as any).fbq;
      
      // Map custom events to Meta Pixel standard events
      switch (event.name) {
        case 'search_performed':
          fbq('track', 'Search', { search_string: event.properties?.city });
          break;
        case 'car_viewed':
          fbq('track', 'ViewContent', { 
            content_name: `${event.properties?.brand} ${event.properties?.model}`,
            content_type: 'vehicle'
          });
          break;
        case 'booking_started':
          fbq('track', 'InitiateCheckout', { 
            content_name: event.properties?.car_model,
            value: event.properties?.price,
            currency: 'MAD'
          });
          break;
        case 'contact_form_submitted':
          fbq('track', 'Contact');
          break;
        case 'partner_form_submitted':
          fbq('track', 'SubmitApplication');
          break;
        case 'email_subscribed':
          fbq('track', 'Lead', { source: event.properties?.source });
          break;
        case 'chat_opened':
          fbq('trackCustom', 'ChatOpened', { chat_type: event.properties?.chat_type });
          break;
        default:
          // Track custom events
          fbq('trackCustom', event.name, event.properties);
      }
    }

    // You can add other analytics providers here
    // Example: Mixpanel, Amplitude, Segment, etc.
  }

  // Get all events (for debugging)
  getEvents() {
    return this.events;
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }
}

export const analytics = new Analytics();
