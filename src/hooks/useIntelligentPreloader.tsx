import { useEffect, useRef, useCallback } from "react";

interface PreloadTarget {
  selector: string;
  attribute?: string;
}

/**
 * Hook pour précharger intelligemment les images suivantes
 * Détecte le scroll vers le bas et précharge les 2-3 prochaines images
 */
export const useIntelligentPreloader = (
  targets: PreloadTarget[],
  threshold = 0.7
) => {
  const preloadedUrls = useRef(new Set<string>());
  const isPreloading = useRef(false);

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
    
    targets.forEach(({ selector, attribute = "src" }) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        const isJustBelow = rect.top > window.innerHeight && rect.top < window.innerHeight * 2;
        
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

  const handleScroll = useCallback(() => {
    if (isPreloading.current) return;
    
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    
    // Précharger quand on atteint 70% de la page
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
    // Throttle scroll event
    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        handleScroll();
        clearTimeout(timeoutId);
      }, 200);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return { preloadedCount: preloadedUrls.current.size };
};
