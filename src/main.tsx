// FICHIER : src/main.tsx (à remplacer dans le repo)
// Phase C — Adapter pour hydrate quand le HTML est pré-rendu, sinon render normal.
//
// Pourquoi : si on appelle createRoot().render() sur un container qui a déjà
// du contenu pré-rendu, React écrase tout → on perd l'avantage SSG.
// Si on utilise hydrateRoot() à la place, React "attache" ses event handlers
// au HTML existant sans le re-renderer (instantané, pas de flash).
//
// On détecte "HTML pré-rendu présent" en checkant si #root a des enfants.

// IMPORTANT: chunk error handler imported FIRST to intercept loading errors
import "./utils/chunkErrorHandler";
import "./utils/versionCheck";

// Sentry — error monitoring (init before React mounts so all errors get captured)
import * as Sentry from "@sentry/react";

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN && import.meta.env.PROD) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    ignoreErrors: [
      /chrome-extension:\/\//,
      /moz-extension:\/\//,
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      "NetworkError when attempting to fetch resource",
      "Failed to fetch",
    ],
  });
}

import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("React version (runtime):", React.version);

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element #root not found in DOM");
  Sentry.captureMessage("Root element #root not found in DOM", "fatal");
} else {
  // Si le HTML pré-rendu a déjà injecté du contenu dans #root, on hydrate.
  // Sinon (dev, ou page non pré-rendue), on render normalement.
  const hasPreRenderedContent = rootElement.hasChildNodes() && rootElement.children.length > 0;

  if (hasPreRenderedContent) {
    // Hydratation : React attache ses listeners sans toucher au DOM existant.
    // Doit être appelé avec le MÊME arbre React qui a été utilisé pour pré-rendre.
    hydrateRoot(rootElement, <App />);
  } else {
    // Render classique (dev mode ou route non listée dans prerender-routes)
    createRoot(rootElement).render(<App />);
  }
}
