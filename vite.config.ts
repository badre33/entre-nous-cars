import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

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
  },
  plugins: [
    react(),
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
