import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

const PIXEL_ID = '302125897604671';

// Helper functions pour tracker les événements Meta
export const trackViewContent = (params: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: params.content_name,
      content_category: params.content_category || 'vehicle',
      content_ids: params.content_ids || [],
      content_type: params.content_type || 'product',
      value: params.value || 0,
      currency: params.currency || 'MAD'
    });
  }
};

export const trackAddToCart = (params: {
  content_name: string;
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
}) => {
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: params.content_name,
      content_ids: params.content_ids || [],
      content_type: params.content_type || 'product',
      value: params.value || 0,
      currency: params.currency || 'MAD'
    });
  }
};

export const trackInitiateCheckout = (params: {
  content_name: string;
  content_ids?: string[];
  num_items?: number;
  value?: number;
  currency?: string;
}) => {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: params.content_name,
      content_ids: params.content_ids || [],
      num_items: params.num_items || 1,
      value: params.value || 0,
      currency: params.currency || 'MAD'
    });
  }
};

export const trackLead = (params?: {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
}) => {
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: params?.content_name || 'Reservation Request',
      content_category: params?.content_category || 'vehicle_rental',
      value: params?.value || 0,
      currency: params?.currency || 'MAD'
    });
  }
};

export const trackContact = () => {
  if (window.fbq) {
    window.fbq('track', 'Contact');
  }
};

export const trackSearch = (searchString: string) => {
  if (window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchString
    });
  }
};

export const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    // Defer Meta Pixel loading to reduce FID impact
    const loadPixel = () => {
      if (!window.fbq) {
        const script = document.createElement('script');
        script.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
        `;
        document.head.appendChild(script);

        // Initialize pixel
        window.fbq('init', PIXEL_ID);
        window.fbq('track', 'PageView');
      }
    };

    // Use requestIdleCallback to defer loading and avoid blocking FID
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadPixel, { timeout: 4000 });
      return () => cancelIdleCallback(idleId);
    } else {
      // Fallback for browsers without requestIdleCallback (Safari)
      const timer = setTimeout(loadPixel, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
};
