# Code Splitting Implementation Guide

## Overview
This document explains the code splitting strategy implemented to reduce the initial JavaScript bundle size and improve First Contentful Paint (FCP).

## Changes Made

### 1. Enhanced Vite Build Configuration (`vite.config.ts`)

#### Intelligent Chunk Splitting
Implemented a smart `manualChunks` function that automatically groups code into logical chunks:

- **Vendor Chunks**: Separated by library type
  - `react-vendor`: React core libraries (react, react-dom, react-router)
  - `ui-vendor`: UI component libraries (@radix-ui, lucide-react)
  - `query-vendor`: Data fetching library (@tanstack/react-query)
  - `vendor`: Other third-party libraries

- **Route-Based Chunks**: Grouped by page category
  - `pages-can2025`: All CAN 2025 event pages
  - `pages-airports`: Airport location pages
  - `pages-casablanca`: Casablanca neighborhood pages
  - `pages-marrakech`: Marrakech neighborhood pages
  - `pages-special`: Special service pages (young drivers, long-term rental)
  - `pages-core`: Core pages (blog, services, about, contact)

- **Component Chunks**: Separated by function
  - `components-schemas`: Schema.org structured data components
  - `components-ui`: Reusable UI components

#### Benefits
- Smaller initial bundle size
- Better browser caching (changes to one page don't invalidate others)
- Parallel downloads for better loading performance
- Reduced download size for repeat visitors

### 2. Optimized Route Loading (`src/App.tsx`)

#### Keep Critical Pages Non-Lazy
The homepage (`Index`) remains directly imported (not lazy loaded) to ensure:
- Fastest possible initial render
- Best FCP score
- No loading delay for the most visited page

#### All Other Routes Use React.lazy()
Every other page is lazy loaded, organized by category:
- Critical pages (Services, Rent, Contact)
- Main city pages
- Secondary informational pages
- Special service pages
- Airport pages
- Neighborhood pages
- CAN 2025 event pages

### 3. Route Prefetching (`src/components/RoutePrefetcher.tsx`)

Created an intelligent prefetching system that:
- Predicts likely next navigation based on current route
- Preloads chunks for likely destinations after initial page load
- Uses smart timing to avoid interfering with initial render

#### Prefetch Rules
- **From homepage**: Prefetch /louer, /nos-services, and major city pages (after 2s)
- **From vehicle listing**: Prefetch city pages and contact (after 1s)
- **From city pages**: Prefetch contact and vehicle listing (after 1s)

### 4. Resource Hints in HTML (`index.html`)

Added optimizations for faster resource loading:
- Upgraded Facebook Pixel connection from `dns-prefetch` to `preconnect` for faster loading
- Added `modulepreload` for main TypeScript module
- Maintained existing font preloading and LCP image preloading

## Performance Impact

### Expected Improvements
1. **Reduced Initial Bundle Size**: 30-50% reduction in initial JavaScript
2. **Faster FCP**: 200-500ms improvement from smaller initial bundle
3. **Better Caching**: Changes to one page won't invalidate all chunks
4. **Improved Perceived Performance**: Smart prefetching makes navigation feel instant

### Bundle Size Breakdown (Estimated)
- **Before**: ~400KB initial JS bundle
- **After**: 
  - Homepage + React vendor: ~180KB
  - UI vendor: ~60KB
  - Query vendor: ~40KB
  - Other chunks loaded on demand

## How It Works

### Initial Load
1. Browser loads HTML
2. Preconnects to critical domains (fonts, Facebook Pixel)
3. Loads only critical chunks:
   - Homepage component
   - React vendor bundle
   - UI vendor bundle
   - Core CSS

### Navigation
1. User clicks a link
2. React Router intercepts navigation
3. If chunk not loaded, React.lazy() loads it dynamically
4. Suspense shows PageSkeleton during load
5. Page renders when chunk arrives

### Prefetching
1. After initial page load (with delay)
2. RoutePrefetcher analyzes current route
3. Begins downloading likely next chunks in background
4. When user navigates, chunk is already cached

## Monitoring

### Key Metrics to Track
1. **First Contentful Paint (FCP)**: Should improve by 200-500ms
2. **Time to Interactive (TTI)**: Should improve with smaller initial bundle
3. **Total Bundle Size**: Monitor in build output
4. **Cache Hit Rate**: Higher with granular chunking

### Build Analysis
Run build to see chunk sizes:
```bash
npm run build
```

Look for:
- `react-vendor.js` size
- `pages-*.js` chunk sizes
- Total bundle size reduction

## Best Practices Maintained

1. ✅ Homepage not lazy loaded (critical for FCP)
2. ✅ All routes use React.lazy() except homepage
3. ✅ Suspense boundary with good loading state
4. ✅ Error boundary wraps entire app
5. ✅ Smart prefetching doesn't interfere with initial load
6. ✅ Vendor code separated from application code
7. ✅ Related pages grouped into logical chunks

## Future Optimizations

Consider these additional improvements:
1. **Critical CSS**: Inline above-the-fold CSS in HTML
2. **Component-level splitting**: Lazy load heavy components (maps, charts)
3. **Route-based preloading**: Preload on hover/focus of navigation links
4. **Image optimization**: Convert more images to WebP/AVIF
5. **HTTP/3**: Enable on server for better multiplexing

## Testing

### Manual Testing
1. Open DevTools Network tab
2. Load homepage
3. Verify only critical chunks load initially
4. Navigate to another page
5. Verify page-specific chunk loads on demand

### Performance Testing
1. Run Lighthouse audit
2. Check FCP score improvement
3. Monitor Total Blocking Time (TBT)
4. Verify bundle sizes in build output

## Troubleshooting

### If FCP doesn't improve
- Check if homepage chunk is too large
- Verify font preloading is working
- Check for render-blocking resources
- Ensure critical CSS isn't blocking

### If navigation feels slow
- Increase prefetch timing
- Add more routes to prefetch rules
- Consider eager loading for high-traffic pages

### If chunks are too small
- Adjust grouping rules in manualChunks
- Combine related pages into fewer chunks
- Set minimum chunk size threshold
