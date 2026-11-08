import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

const buildTimestamp = new Date().toISOString();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Injecter le timestamp de build pour la détection de version
  define: {
    __BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
  },
  build: {
    // Use default chunking & minification to maximize React compatibility
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },
  // Retirer les console.log/debugger du bundle de production
  esbuild: mode === "production" ? { drop: ["console", "debugger"] } : undefined,
  plugins: [
    {
      name: "benatna-build-version",
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ version: buildTimestamp, timestamp: Date.parse(buildTimestamp) }) });
      },
    } satisfies Plugin,
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null, // Manual registration for better LCP control
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "robots.txt"],
      manifest: {
        name: "Benatna – Location de voiture à Casablanca",
        short_name: "Benatna",
        description: "Location de voiture à Casablanca et à l’aéroport Mohammed V. Livraison à Rabat sur demande, livraison gratuite convenue à l’avance.",
        theme_color: "#ffda00",
        background_color: "#000000",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        categories: ["travel", "business"],
        lang: "fr",
        dir: "ltr",
        id: "/",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        shortcuts: [
          {
            name: "Louer une voiture",
            short_name: "Louer",
            description: "Voir les voitures et les prix",
            url: "/louer",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
          },
          {
            name: "Aéroport Mohammed V",
            short_name: "Aéroport",
            description: "Location de voiture livrée à l’aéroport de Casablanca",
            url: "/location-voiture-aeroport-casablanca",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
          },
          {
            name: "Contact",
            short_name: "Contact",
            description: "Nous contacter",
            url: "/contact",
            icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
          }
        ]
      },
      workbox: {
        // Precache startup assets only. Visited route chunks use runtimeCaching below;
        // a first visit must not download every admin and SEO page.
        globPatterns: ["**/*.{css,woff2}", "assets/index-*.js"],
        navigateFallback: null,
        navigationPreload: true,
        navigateFallbackDenylist: [/^\/api/, /^\/version\.json/],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          // Never replace a document or a 404 with a precached home page.
          // Online visits always receive the current route HTML from the server.
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkOnly",
          },
          // Chunks JS hashés - NetworkFirst pour éviter les mismatches
          {
            urlPattern: /\/assets\/[^/?]+\.js(?:\?.*)?$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "js-chunks-cache",
              // Hashed public JS is identical across Origin variants (module vs fetch).
              matchOptions: { ignoreVary: true },
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 1 jour
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // CSS chunks - NetworkFirst également
          {
            urlPattern: /\/assets\/[^/?]+\.css(?:\?.*)?$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "css-chunks-cache",
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // Images - CacheFirst car elles sont stables
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          // Google Fonts stylesheets
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          // Google Fonts files
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          // API calls - NetworkFirst avec timeout court
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/functions\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          // CDN assets - CacheFirst
          {
            urlPattern: /^https:\/\/.*\.(?:googleapis|gstatic|unpkg|jsdelivr)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
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
