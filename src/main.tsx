// ChunkErrorHandler doit être importé en premier pour intercepter les erreurs de chargement
import './utils/chunkErrorHandler';
import './utils/versionCheck';

// Sentry — error monitoring (init before React mounts so all errors get captured)
import * as Sentry from '@sentry/react';

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
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'NetworkError when attempting to fetch resource',
      'Failed to fetch',
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
  // If react-snap has pre-rendered HTML into #root, hydrate it (don't re-render).
  // Otherwise (dev mode, or route not in reactSnap config), do a normal render.
  const hasPreRenderedContent = rootElement.hasChildNodes() && rootElement.children.length > 0;
  if (hasPreRenderedContent) {
    hydrateRoot(rootElement, <App />);
  } else {
    createRoot(rootElement).render(<App />);
  }
}
