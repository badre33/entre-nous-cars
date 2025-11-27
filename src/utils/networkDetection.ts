/**
 * Network quality detection for intelligent prefetching
 */

export type NetworkQuality = 'slow' | 'moderate' | 'fast' | 'unknown';

/**
 * Detects the user's network quality
 */
export const detectNetworkQuality = (): NetworkQuality => {
  // Check if Network Information API is available
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    if (connection) {
      // Use effective type if available
      if (connection.effectiveType) {
        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            return 'slow';
          case '3g':
            return 'moderate';
          case '4g':
          case '5g':
            return 'fast';
        }
      }

      // Use downlink speed as fallback (Mbps)
      if (typeof connection.downlink === 'number') {
        if (connection.downlink < 1) return 'slow';
        if (connection.downlink < 5) return 'moderate';
        return 'fast';
      }
    }
  }

  // Check saveData preference
  if ('connection' in navigator && (navigator as any).connection?.saveData) {
    return 'slow'; // Respect user's data saving preference
  }

  return 'unknown';
};

/**
 * Determines if prefetching should be enabled based on network
 */
export const shouldPrefetch = (): boolean => {
  const quality = detectNetworkQuality();
  
  // Don't prefetch on slow connections
  if (quality === 'slow') return false;
  
  // Check battery status if available
  if ('getBattery' in navigator) {
    (navigator as any).getBattery().then((battery: any) => {
      // Don't prefetch if battery is low and not charging
      if (battery.level < 0.2 && !battery.charging) {
        return false;
      }
    });
  }

  return true;
};

/**
 * Gets the number of routes to prefetch based on network quality
 */
export const getPrefetchLimit = (): number => {
  const quality = detectNetworkQuality();
  
  switch (quality) {
    case 'slow':
      return 0; // No prefetching
    case 'moderate':
      return 2; // Prefetch only 2 most likely routes
    case 'fast':
      return 5; // Prefetch up to 5 routes
    case 'unknown':
      return 3; // Conservative default
  }
};

/**
 * Monitors network quality changes
 */
export const onNetworkChange = (callback: (quality: NetworkQuality) => void) => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection) {
      const handler = () => callback(detectNetworkQuality());
      connection.addEventListener('change', handler);
      return () => connection.removeEventListener('change', handler);
    }
  }
  return () => {};
};
