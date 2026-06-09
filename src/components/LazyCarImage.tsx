import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyCarImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  mobileOptimized?: boolean;
}

export default function LazyCarImage({ 
  src, 
  alt, 
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  mobileOptimized = true
}: LazyCarImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Note: WebP files need to be manually converted or generated via build process
  // For now, we'll rely on browser caching and lazy loading
  // To enable WebP: convert images manually or use vite-plugin-imagemin
  
  // Generate srcset for responsive images with proper densities
  const generateSrcSet = (imageSrc: string) => {
    // Provide 1x and 2x versions for retina displays
    return `${imageSrc} 1x, ${imageSrc} 2x`;
  };

  // Intersection Observer for lazy loading with mobile-optimized margins
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        // Load images sooner on mobile for better UX
        rootMargin: mobileOptimized ? '200px' : '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, mobileOptimized]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden bg-muted", className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse" />
      )}
      {(isInView || priority) && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          data-car-image
          className={cn(
            "w-full h-full object-cover object-center transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
            // Hardware acceleration for smoother scrolling on mobile
            "transform-gpu will-change-auto"
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
}
