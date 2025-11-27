import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationPattern {
  from: string;
  to: string;
  count: number;
  lastVisited: number;
}

const STORAGE_KEY = 'nav_patterns';
const MAX_PATTERNS = 50;

/**
 * Tracks user navigation patterns to predict likely next routes
 */
export const useNavigationPatterns = () => {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current && previousPath.current !== location.pathname) {
      // Record the navigation pattern
      recordNavigation(previousPath.current, location.pathname);
    }
    previousPath.current = location.pathname;
  }, [location.pathname]);

  return null;
};

/**
 * Records a navigation from one route to another
 */
const recordNavigation = (from: string, to: string) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const patterns: NavigationPattern[] = stored ? JSON.parse(stored) : [];

    // Find existing pattern
    const existingIndex = patterns.findIndex(
      p => p.from === from && p.to === to
    );

    if (existingIndex >= 0) {
      patterns[existingIndex].count++;
      patterns[existingIndex].lastVisited = Date.now();
    } else {
      patterns.push({
        from,
        to,
        count: 1,
        lastVisited: Date.now(),
      });
    }

    // Keep only top patterns
    patterns.sort((a, b) => b.count - a.count);
    const limitedPatterns = patterns.slice(0, MAX_PATTERNS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedPatterns));
  } catch (error) {
    console.error('Failed to record navigation pattern:', error);
  }
};

/**
 * Gets the most likely next routes from current path
 */
export const getPredictedRoutes = (currentPath: string, limit = 5): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const patterns: NavigationPattern[] = JSON.parse(stored);
    
    // Filter patterns from current path and sort by count
    const relevantPatterns = patterns
      .filter(p => p.from === currentPath)
      .sort((a, b) => {
        // Weight by both count and recency
        const scoreA = a.count * (1 + (Date.now() - a.lastVisited) / 86400000);
        const scoreB = b.count * (1 + (Date.now() - b.lastVisited) / 86400000);
        return scoreB - scoreA;
      })
      .slice(0, limit)
      .map(p => p.to);

    return relevantPatterns;
  } catch (error) {
    console.error('Failed to get predicted routes:', error);
    return [];
  }
};

/**
 * Gets global popular routes regardless of current path
 */
export const getPopularRoutes = (limit = 10): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const patterns: NavigationPattern[] = JSON.parse(stored);
    
    // Aggregate counts by destination
    const routeCounts = new Map<string, number>();
    patterns.forEach(p => {
      const current = routeCounts.get(p.to) || 0;
      routeCounts.set(p.to, current + p.count);
    });

    // Sort and return top routes
    return Array.from(routeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([route]) => route);
  } catch (error) {
    console.error('Failed to get popular routes:', error);
    return [];
  }
};
