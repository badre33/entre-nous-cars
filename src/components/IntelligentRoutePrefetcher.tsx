import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPredictedRoutes, getPopularRoutes, useNavigationPatterns } from '@/hooks/useNavigationPatterns';
import { shouldPrefetch, getPrefetchLimit, onNetworkChange, detectNetworkQuality } from '@/utils/networkDetection';

/**
 * Route to chunk mapping for Vite's code splitting
 */
const ROUTE_TO_CHUNK: Record<string, string> = {
  '/louer': '/src/pages/Louer.tsx',
  '/nos-services': '/src/pages/NosServices.tsx',
  '/contact': '/src/pages/Contact.tsx',
  '/location-voiture-casablanca': '/src/pages/LocationVoitureCasablanca.tsx',
  '/location-voiture-marrakech': '/src/pages/LocationVoitureMarrakech.tsx',
  '/location-voiture-rabat': '/src/pages/LocationVoitureRabat.tsx',
  '/location-voiture-tanger': '/src/pages/LocationVoitureTanger.tsx',
  '/location-voiture-agadir': '/src/pages/LocationVoitureAgadir.tsx',
  '/location-voiture-fes': '/src/pages/LocationVoitureFes.tsx',
  '/partenaires': '/src/pages/Partenaires.tsx',
  '/a-propos': '/src/pages/APropos.tsx',
  '/blog': '/src/pages/Blog.tsx',
  '/faq': '/src/pages/FAQ.tsx',
};

/**
 * Priority-based intelligent route prefetcher
 * Uses navigation patterns, network quality, and idle time to optimize prefetching
 */
export const IntelligentRoutePrefetcher = () => {
  const location = useLocation();
  const [networkQuality, setNetworkQuality] = useState(detectNetworkQuality());
  const prefetchedRoutes = useRef(new Set<string>());
  const idleCallbackId = useRef<number | null>(null);

  // Track navigation patterns
  useNavigationPatterns();

  // Monitor network changes
  useEffect(() => {
    const unsubscribe = onNetworkChange(setNetworkQuality);
    return unsubscribe;
  }, []);

  // Main prefetching logic
  useEffect(() => {
    // Clear previous idle callback
    if (idleCallbackId.current) {
      cancelIdleCallback(idleCallbackId.current);
    }

    // Check if we should prefetch
    if (!shouldPrefetch()) {
      console.log('[Prefetch] Skipping - network conditions not suitable');
      return;
    }

    const limit = getPrefetchLimit();
    if (limit === 0) return;

    // Use requestIdleCallback for non-blocking prefetch
    const scheduleIdlePrefetch = () => {
      idleCallbackId.current = requestIdleCallback(
        () => {
          performIntelligentPrefetch(location.pathname, limit);
        },
        { timeout: 2000 } // Fallback timeout
      );
    };

    // Wait a bit before prefetching to not interfere with page load
    const timer = setTimeout(scheduleIdlePrefetch, 1000);

    return () => {
      clearTimeout(timer);
      if (idleCallbackId.current) {
        cancelIdleCallback(idleCallbackId.current);
      }
    };
  }, [location.pathname, networkQuality]);

  const performIntelligentPrefetch = (currentPath: string, limit: number) => {
    // Strategy 1: Prefetch predicted routes based on user patterns
    const predictedRoutes = getPredictedRoutes(currentPath, Math.ceil(limit * 0.6));
    
    // Strategy 2: Prefetch popular routes as secondary priority
    const popularRoutes = getPopularRoutes(Math.ceil(limit * 0.4));
    
    // Strategy 3: Fallback to static rules for new users
    const staticRules = getStaticPrefetchRules(currentPath);

    // Combine all strategies with priority
    const routesToPrefetch = [
      ...predictedRoutes,
      ...popularRoutes,
      ...staticRules,
    ]
      .filter((route, index, self) => self.indexOf(route) === index) // Remove duplicates
      .filter(route => !prefetchedRoutes.current.has(route)) // Skip already prefetched
      .slice(0, limit); // Respect limit

    // Prefetch routes
    routesToPrefetch.forEach((route, index) => {
      // Stagger prefetching to avoid network congestion
      setTimeout(() => {
        prefetchRoute(route);
        prefetchedRoutes.current.add(route);
      }, index * 300); // 300ms delay between each prefetch
    });

    if (routesToPrefetch.length > 0) {
      console.log(`[Prefetch] Prefetching ${routesToPrefetch.length} routes:`, routesToPrefetch);
    }
  };

  return null;
};

/**
 * Prefetch a specific route chunk
 */
const prefetchRoute = (path: string) => {
  const chunkPath = ROUTE_TO_CHUNK[path];
  if (!chunkPath) return;

  try {
    // Use link prefetch for better browser optimization
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'script';
    link.href = chunkPath;
    link.crossOrigin = 'anonymous';
    
    // Add to head
    document.head.appendChild(link);

    // Clean up old prefetch links after some time
    setTimeout(() => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    }, 60000); // Remove after 1 minute
  } catch (error) {
    console.error(`[Prefetch] Failed to prefetch ${path}:`, error);
  }
};

/**
 * Static prefetch rules for common navigation patterns
 * Used as fallback when no user data is available
 */
const getStaticPrefetchRules = (currentPath: string): string[] => {
  const rules: Record<string, string[]> = {
    '/': ['/louer', '/nos-services', '/location-voiture-casablanca', '/location-voiture-marrakech'],
    '/louer': ['/location-voiture-casablanca', '/location-voiture-marrakech', '/contact'],
    '/location-voiture-casablanca': ['/contact', '/louer', '/nos-services'],
    '/location-voiture-marrakech': ['/contact', '/louer', '/nos-services'],
    '/nos-services': ['/louer', '/contact'],
    '/blog': ['/blog', '/contact'],
    '/faq': ['/contact', '/louer'],
  };

  return rules[currentPath] || ['/contact', '/louer'];
};
