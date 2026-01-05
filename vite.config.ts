import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// Plugin to make CSS non-render-blocking by using media="print" technique
function asyncCssPlugin(): Plugin {
  return {
    name: 'async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Transform regular CSS links to async loading using media="print" trick
      // This prevents render-blocking while ensuring CSS loads
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        `<link rel="stylesheet" href="$1" media="print" onload="this.media='all';this.onload=null;">
<noscript><link rel="stylesheet" href="$1"></noscript>`
      );
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Injecter le timestamp de build pour la détection de version
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    // Use default chunking & minification to maximize React compatibility
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Isolate Supabase client into its own chunk - loaded only when needed
          if (id.includes('@supabase') || id.includes('supabase-js')) {
            return 'supabase-client';
          }
          // React core - minimal vendor chunk
          if (id.includes('node_modules/react-dom')) {
            return 'react-dom';
          }
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-is')) {
            return 'react-core';
          }
          // Router in separate chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          // Tanstack query - defer loading
          if (id.includes('@tanstack')) {
            return 'tanstack';
          }
          // Isolate radix-ui components by category
          if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-drawer')) {
            return 'ui-dialogs';
          }
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Date utilities
          if (id.includes('date-fns')) {
            return 'date-utils';
          }
          // Form handling
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'forms';
          }
          // Charts/visualization
          if (id.includes('recharts') || id.includes('d3')) {
            return 'charts';
          }
          // Analytics and tracking in separate chunk
          if (id.includes('analyticsTracker') || id.includes('analytics')) {
            return 'analytics';
          }
          // Lucide icons - commonly tree-shaken but still large
          if (id.includes('lucide-react')) {
            return 'icons';
          }
        },
      },
    },
  },
  plugins: [
    react(),
    asyncCssPlugin(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null, // Manual registration for better LCP control
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "robots.txt"],
      manifest: {
        name: "Benatna – Location de Voiture au Maroc",
        short_name: "Benatna",
        description: "Location de voiture au Maroc. Prix transparents, processus digital, sans surprises. Disponible dans 6 villes.",
        theme_color: "#ffda00",
        background_color: "#f5ffe4",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        categories: ["travel", "business"],
        lang: "fr",
        dir: "ltr",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/og-image.png",
            sizes: "1200x630",
            type: "image/png",
            purpose: "any",
          },
        ],
        shortcuts: [
          {
            name: "Louer une voiture",
            short_name: "Louer",
            description: "Voir tous les véhicules disponibles",
            url: "/louer",
            icons: [{ src: "/favicon.ico", sizes: "64x64" }]
          },
          {
            name: "Nos Services",
            short_name: "Services",
            description: "Découvrir nos services",
            url: "/nos-services",
            icons: [{ src: "/favicon.ico", sizes: "64x64" }]
          },
          {
            name: "Contact",
            short_name: "Contact",
            description: "Nous contacter",
            url: "/contact",
            icons: [{ src: "/favicon.ico", sizes: "64x64" }]
          }
        ]
      },
      workbox: {
        // STABILITÉ > OFFLINE : pas de precaching des pages
        globPatterns: ["**/*.{ico,png,jpg,jpeg,svg,webp,woff2}"], // Seulement assets statiques
        // DÉSACTIVÉ : navigateFallback cause des versions obsolètes
        // navigateFallback: '/index.html',
        navigateFallbackDenylist: [/.*/], // Bloquer tout fallback
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // Pages HTML - NetworkOnly : TOUJOURS frais, jamais de cache
          {
            urlPattern: /^https:\/\/.*\/(?!assets\/).*$/i,
            handler: "NetworkOnly",
            options: {
              cacheName: "pages-no-cache",
            },
          },
          // Chunks JS - NetworkOnly : TOUJOURS frais
          {
            urlPattern: /\/assets\/.*\.js$/i,
            handler: "NetworkOnly",
            options: {
              cacheName: "js-no-cache",
            },
          },
          // CSS - NetworkOnly : TOUJOURS frais
          {
            urlPattern: /\/assets\/.*\.css$/i,
            handler: "NetworkOnly",
            options: {
              cacheName: "css-no-cache",
            },
          },
          // Images - CacheFirst (seul cache autorisé, assets vraiment statiques)
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
          // Fonts Google - CacheFirst (vraiment statiques)
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          // Font stylesheets - StaleWhileRevalidate
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "font-stylesheets-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
          // API calls - NetworkOnly : données TOUJOURS fraîches
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: "NetworkOnly",
            options: {
              cacheName: "api-no-cache",
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
        type: 'module',
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    },
    dedupe: ["react", "react-dom"],
  },
}));
