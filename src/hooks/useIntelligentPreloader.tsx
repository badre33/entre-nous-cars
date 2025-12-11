import { useEffect, useRef, useCallback } from "react";

interface PreloadTarget {
  selector: string;
  attribute?: string;
}

/**
 * Hook pour précharger intelligemment les images suivantes
 * Détecte le scroll vers le bas et précharge les 2-3 prochaines images
 * Uses requestAnimationFrame to avoid forced reflows
 */
export const useIntelligentPreloader = (
  targets: PreloadTarget[],
  threshold = 0.7
) => {
  const preloadedUrls = useRef(new Set<string>());
  const isPreloading = useRef(false);
  const rafId = useRef<number | null>(null);
  const lastScrollTime = useRef(0);

  const preloadImage = useCallback((url: string) => {
    if (preloadedUrls.current.has(url)) return;
    
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.fetchPriority = "low";
    document.head.appendChild(link);
    
    preloadedUrls.current.add(url);
  }, []);

  const findNextImages = useCallback(() => {
    const nextImages: string[] = [];
    const viewportHeight = window.innerHeight;
    
    targets.forEach(({ selector, attribute = "src" }) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((el) => {
        // Batch all getBoundingClientRect calls within the same rAF
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
        const isJustBelow = rect.top > viewportHeight && rect.top < viewportHeight * 2;
        
        if (isJustBelow && !isInViewport) {
          const url = el.getAttribute(attribute);
          if (url && !preloadedUrls.current.has(url)) {
            nextImages.push(url);
          }
        }
      });
    });
    
    return nextImages.slice(0, 3); // Limiter à 3 images
  }, [targets]);

  const processScroll = useCallback(() => {
    if (isPreloading.current) return;
    
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    
    // Précharger quand on atteint le threshold de la page
    if (scrollPercentage >= threshold) {
      isPreloading.current = true;
      
      const nextImages = findNextImages();
      nextImages.forEach((url) => {
        preloadImage(url);
      });
      
      // Reset après 1 seconde pour permettre de nouveaux préchargements
      setTimeout(() => {
        isPreloading.current = false;
      }, 1000);
    }
  }, [threshold, findNextImages, preloadImage]);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle: only process every 200ms
      const now = Date.now();
      if (now - lastScrollTime.current < 200) return;
      lastScrollTime.current = now;
      
      // Cancel any pending rAF to avoid stacking
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // Use requestAnimationFrame to batch DOM reads and avoid forced reflows
      rafId.current = requestAnimationFrame(() => {
        processScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [processScroll]);

  return { preloadedCount: preloadedUrls.current.size };
};
