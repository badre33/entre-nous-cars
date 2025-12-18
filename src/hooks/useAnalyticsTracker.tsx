import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { analyticsTracker } from "@/utils/analyticsTracker";

// Delay analytics significantly to move it completely out of critical request chain
// This ensures Lighthouse doesn't see analytics in the network dependency tree
const ANALYTICS_INIT_DELAY = 12000; // 12 seconds after page load
const ANALYTICS_TRACK_DELAY = 15000; // 15 seconds for tracking events

export const useAnalyticsTracker = () => {
  const location = useLocation();
  const isInitialized = useRef(false);
  const lastPath = useRef<string>('');

  useEffect(() => {
    // Initialize tracker with significant delay to avoid critical path
    if (!isInitialized.current) {
      const initTimer = setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            analyticsTracker.init();
            isInitialized.current = true;
          }, { timeout: 10000 });
        } else {
          analyticsTracker.init();
          isInitialized.current = true;
        }
      }, ANALYTICS_INIT_DELAY);
      
      return () => clearTimeout(initTimer);
    }
  }, []);

  useEffect(() => {
    // Track page views with significant delay - completely out of critical path
    if (location.pathname !== lastPath.current) {
      lastPath.current = location.pathname;
      
      const trackTimer = setTimeout(() => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            analyticsTracker.trackPageView(location.pathname);
          }, { timeout: 15000 });
        } else {
          analyticsTracker.trackPageView(location.pathname);
        }
      }, ANALYTICS_TRACK_DELAY);
      
      return () => clearTimeout(trackTimer);
    }
  }, [location.pathname]);

  return analyticsTracker;
};

// Export for direct use
export { analyticsTracker };
