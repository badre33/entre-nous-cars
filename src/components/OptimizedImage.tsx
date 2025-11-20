import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill";
}

/**
 * Component d'image ultra-optimisé pour Core Web Vitals
 * - Support WebP automatique avec fallback
 * - Lazy loading avec IntersectionObserver
 * - Preload pour images critiques
 * - Responsive avec srcset
 * - Blur-up placeholder
 */
export const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  priority = false,
  aspectRatio = "16/9",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  objectFit = "cover"
}: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate WebP version of the image
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Generate srcset for responsive images
  const generateSrcSet = (imageSrc: string) => {
    const basePath = imageSrc.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const ext = imageSrc.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '';
    return `${basePath}${ext} 1x, ${basePath}@2x${ext} 2x`;
  };

  useEffect(() => {
    if (priority) {
      // Preload critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = webpSrc;
      link.type = 'image/webp';
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, webpSrc]);

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
        rootMargin: '50px', // Load slightly before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    if (!isInView) return;

    // Try WebP first, fallback to original
    const checkWebP = new Image();
    checkWebP.onload = () => setImgSrc(webpSrc);
    checkWebP.onerror = () => setImgSrc(src);
    checkWebP.src = webpSrc;
  }, [isInView, webpSrc, src]);

  return (
    <div 
      ref={imgRef} 
      className={cn("relative overflow-hidden bg-muted/50", className)}
      style={{ aspectRatio }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 animate-pulse" />
      )}
      {imgSrc && (
        <picture>
          <source srcSet={generateSrcSet(webpSrc)} type="image/webp" />
          <source srcSet={generateSrcSet(src)} type="image/jpeg" />
          <img
            src={imgSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className={cn(
              "w-full h-full transition-opacity duration-500",
              "will-change-auto", // Hardware acceleration optimization
              loaded ? "opacity-100" : "opacity-0"
            )}
            style={{ objectFit }}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
          />
        </picture>
      )}
    </div>
  );
};
