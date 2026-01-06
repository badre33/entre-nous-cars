/**
 * Utility pour précharger les images critiques
 * Améliore le LCP (Largest Contentful Paint)
 */

interface PreloadImageOptions {
  as?: 'image';
  type?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  media?: string;
}

export const preloadImage = (
  href: string, 
  options: PreloadImageOptions = {}
): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = options.as || 'image';
  link.href = href;
  
  if (options.type) {
    link.type = options.type;
  }
  
  if (options.fetchPriority) {
    link.setAttribute('fetchpriority', options.fetchPriority);
  }
  
  if (options.media) {
    link.media = options.media;
  }
  
  document.head.appendChild(link);
};

/**
 * Précharger les images hero et above-the-fold
 */
export const preloadCriticalImages = () => {
  const isMobile = window.innerWidth < 768;
  
  // Preload appropriate hero image based on viewport - using optimized versions
  const heroImages = isMobile
    ? [{ href: '/hero-home-mobile-optimized.webp', type: 'image/webp' }]
    : [{ href: '/hero-home-new.webp', type: 'image/webp' }];

  heroImages.forEach(img => {
    preloadImage(img.href, { 
      type: img.type, 
      fetchPriority: 'high' 
    });
  });
};

/**
 * Précharger les images selon le viewport
 */
export const preloadResponsiveImage = (
  basePath: string,
  formats: string[] = ['webp', 'jpg']
) => {
  const isMobile = window.innerWidth < 768;
  const suffix = isMobile ? '-mobile' : '';
  
  formats.forEach(format => {
    preloadImage(`${basePath}${suffix}.${format}`, {
      type: `image/${format}`,
      fetchPriority: 'high',
      media: isMobile ? '(max-width: 767px)' : '(min-width: 768px)'
    });
  });
};

/**
 * Lazy load non-critical images avec IntersectionObserver
 */
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    images.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback pour anciens navigateurs
    images.forEach((img) => {
      const image = img as HTMLImageElement;
      image.src = image.dataset.src || '';
    });
  }
};
