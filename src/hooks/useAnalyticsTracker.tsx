import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { analyticsTracker } from "@/utils/analyticsTracker";

export const useAnalyticsTracker = () => {
  const location = useLocation();
  const isInitialized = useRef(false);
  const lastPath = useRef<string>('');

  useEffect(() => {
    // Initialize tracker once
    if (!isInitialized.current) {
      analyticsTracker.init();
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (location.pathname !== lastPath.current) {
      lastPath.current = location.pathname;
      
      // Use requestIdleCallback for non-blocking tracking
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          analyticsTracker.trackPageView(location.pathname);
        }, { timeout: 2000 });
      } else {
        setTimeout(() => {
          analyticsTracker.trackPageView(location.pathname);
        }, 100);
      }
    }
  }, [location.pathname]);

  return analyticsTracker;
};

// Export for direct use
export { analyticsTracker };
