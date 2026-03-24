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
    const viewportHeight = window.innerHeight;
    
    // Batch all layout reads first to avoid forced reflows
    const elementsData: { url: string | null; rect: DOMRect }[] = [];
    
    targets.forEach(({ selector, attribute = "src" }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        elementsData.push({
          url: el.getAttribute(attribute),
          rect: el.getBoundingClientRect()
        });
      });
    });
    
    // Then process the data without triggering reflows
    elementsData.forEach(({ url, rect }) => {
      const isInViewport = rect.top < viewportHeight && rect.bottom > 0;
      const isJustBelow = rect.top > viewportHeight && rect.top < viewportHeight * 2;
      
      if (isJustBelow && !isInViewport && url && !preloadedUrls.current.has(url)) {
        nextImages.push(url);
      }
    });
    
    return nextImages.slice(0, 3);
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
    let timeoutId: ReturnType<typeof setTimeout>;
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
