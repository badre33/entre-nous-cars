import { useState } from "react";
import { cn } from "@/lib/utils";

interface LazyCarImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LazyCarImage({ src, alt, className }: LazyCarImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate WebP source if original is JPG/PNG
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebP = /\.(jpg|jpeg|png)$/i.test(src);

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <picture>
        {hasWebP && (
          <source srcSet={webpSrc} type="image/webp" />
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
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
    </div>
  );
}
