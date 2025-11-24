import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Prefetches likely next routes based on current page
 * This improves perceived performance by preloading chunks before navigation
 */
export const RoutePrefetcher = () => {
  const location = useLocation();

  useEffect(() => {
    const prefetchRoute = (path: string) => {
      // Use link prefetch to preload the route chunk
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'script';
      // Vite generates chunks with predictable patterns
      link.href = `/src/pages${path}.tsx`;
      document.head.appendChild(link);
    };

    // Prefetch likely next pages based on current route
    if (location.pathname === '/') {
      // From homepage, users likely go to these pages
      setTimeout(() => {
        prefetchRoute('/Louer');
        prefetchRoute('/NosServices');
        prefetchRoute('/LocationVoitureCasablanca');
        prefetchRoute('/LocationVoitureMarrakech');
      }, 2000); // Prefetch after 2 seconds to not interfere with initial load
    } else if (location.pathname === '/louer') {
      // From vehicle listing, likely to go to city pages
      setTimeout(() => {
        prefetchRoute('/LocationVoitureCasablanca');
        prefetchRoute('/LocationVoitureMarrakech');
        prefetchRoute('/Contact');
      }, 1000);
    } else if (location.pathname.includes('/location-voiture-')) {
      // From city pages, likely to check contact or other cities
      setTimeout(() => {
        prefetchRoute('/Contact');
        prefetchRoute('/Louer');
      }, 1000);
    }
  }, [location.pathname]);

  return null;
};
