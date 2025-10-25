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
    // Google Analytics 4 example
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.name, event.properties);
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
