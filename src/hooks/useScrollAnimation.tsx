import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use requestAnimationFrame to avoid forced reflows
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after first trigger to prevent unnecessary checks
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '50px' } // Add rootMargin for smoother transitions
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};
