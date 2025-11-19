import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyCarImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function LazyCarImage({ 
  src, 
  alt, 
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: LazyCarImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate WebP source URL
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebP = /\.(jpg|jpeg|png)$/i.test(src);

  // Generate srcset for responsive images
  const generateSrcSet = (imageSrc: string) => {
    return `${imageSrc} 1x, ${imageSrc} 2x`;
  };

  // Intersection Observer for lazy loading
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
        rootMargin: '100px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden bg-muted", className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted animate-pulse" />
      )}
      {isInView && (
        <picture>
          {hasWebP && (
            <source 
              srcSet={generateSrcSet(webpSrc)} 
              type="image/webp"
              sizes={sizes}
            />
          )}
          <img
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => {
              setError(true);
              setLoaded(true);
            }}
          />
        </picture>
      )}
    </div>
  );
}
