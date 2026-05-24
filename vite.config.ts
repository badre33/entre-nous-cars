// FICHIER : vite.config.ts (à remplacer dans le repo)
// Phase C — Pre-rendering avec vite-plugin-prerender-spa
//
// Modifications par rapport au vite.config.ts actuel :
// 1. Import du plugin prerender
// 2. Ajout du plugin dans la liste plugins (APRÈS le build Vite, AVANT VitePWA)
// 3. Liste des routes importée depuis prerender-routes.ts (à créer dans /scripts)
//
// Le reste (PWA config, runtime caching, etc.) est INCHANGÉ.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { PrerenderSPAPlugin } from "vite-plugin-prerender-spa";
import prerenderRoutes from "./scripts/prerender-routes";

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
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
  },
  plugins: [
    react(),

    // PRE-RENDERING — uniquement en production (skip en dev pour la vitesse)
    mode === "production" && PrerenderSPAPlugin({
      routes: prerenderRoutes,
      renderer: {
        // Attendre que React + Helmet + Schema soient injectés avant la capture
        renderAfterTime: 5000,
        // OU plus robuste : attendre un selecteur spécifique présent dans toutes les pages
        // renderAfterElementExists: "#root [data-prerender-ready]",
        headless: true,
        timeout: 30000,
      },
      // Post-processeur : enlève les artefacts de Crisp/Helmet qui se sont injectés
      // pendant la capture mais qu'on ne veut pas dans le HTML statique
      postProcess(renderedRoute) {
        // Nettoie le title pollué par Crisp (au cas où le MutationObserver ne se déclenche pas)
        renderedRoute.html = renderedRoute.html.replace(
          /<title>💬\d+\s*-\s*([^<]+)<\/title>/g,
          "<title>$1</title>"
        );
        // Retirer le script de Crisp injecté dynamiquement — il sera re-injecté côté client
        renderedRoute.html = renderedRoute.html.replace(
          /<script[^>]*src=["']https:\/\/client\.crisp\.chat\/[^"']+["'][^>]*><\/script>/g,
          ""
        );
        return renderedRoute;
      },
    }),

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
          { src: "/favicon.ico", sizes: "64x64 32x32 24x24 16x16", type: "image/x-icon" },
          { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png", purpose: "any maskable" },
          { src: "/og-image.png", sizes: "1200x630", type: "image/png", purpose: "any" },
        ],
        shortcuts: [
          { name: "Louer une voiture", short_name: "Louer", description: "Voir tous les véhicules disponibles", url: "/louer", icons: [{ src: "/favicon.ico", sizes: "64x64" }] },
          { name: "Nos Services", short_name: "Services", description: "Découvrir nos services", url: "/nos-services", icons: [{ src: "/favicon.ico", sizes: "64x64" }] },
          { name: "Contact", short_name: "Contact", description: "Nous contacter", url: "/contact", icons: [{ src: "/favicon.ico", sizes: "64x64" }] },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/, /^\/version\.json/],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/benatna\.ma\/(?!assets\/).*$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/.*\.[a-f0-9]+\.js$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "js-chunks-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/.*\.[a-f0-9]+\.css$/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "css-chunks-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/functions\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 5 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.(?:googleapis|gstatic|unpkg|jsdelivr)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "cdn-cache",
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
      devOptions: { enabled: false, type: "module" },
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
