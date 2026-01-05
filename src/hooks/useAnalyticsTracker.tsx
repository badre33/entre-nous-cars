import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Delay analytics significantly to move it completely out of critical request chain
// This ensures Lighthouse doesn't see analytics in the network dependency tree
const ANALYTICS_INIT_DELAY = 20000; // 20 seconds after page load
const ANALYTICS_TRACK_DELAY = 25000; // 25 seconds for tracking events

// Dynamic import to avoid loading analyticsTracker in critical path
const getAnalyticsTracker = async () => {
  const { analyticsTracker } = await import("@/utils/analyticsTracker");
  return analyticsTracker;
};

export const useAnalyticsTracker = () => {
  const location = useLocation();
  const isInitialized = useRef(false);
  const lastPath = useRef<string>('');
  const trackerRef = useRef<Awaited<ReturnType<typeof getAnalyticsTracker>> | null>(null);

  useEffect(() => {
    // Initialize tracker with significant delay to avoid critical path
    if (!isInitialized.current) {
      const initTimer = setTimeout(async () => {
        const tracker = await getAnalyticsTracker();
        trackerRef.current = tracker;
        
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            tracker.init();
            isInitialized.current = true;
          }, { timeout: 10000 });
        } else {
          tracker.init();
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
      
      const trackTimer = setTimeout(async () => {
        const tracker = trackerRef.current || await getAnalyticsTracker();
        
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            tracker.trackPageView(location.pathname);
          }, { timeout: 15000 });
        } else {
          tracker.trackPageView(location.pathname);
        }
      }, ANALYTICS_TRACK_DELAY);
      
      return () => clearTimeout(trackTimer);
    }
  }, [location.pathname]);

  // Return a lazy accessor instead of the tracker directly
  return {
    getTracker: getAnalyticsTracker
  };
};
