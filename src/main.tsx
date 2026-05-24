// IMPORTANT: chunk error handler imported FIRST to intercept loading errors
import './utils/chunkErrorHandler';
import './utils/versionCheck';

// Sentry — error monitoring (init before React mounts so all errors get captured)
import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN && import.meta.env.PROD) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    // Performance monitoring — adjust if quota becomes an issue
    tracesSampleRate: 0.1,
    // Session Replay — captures user sessions when errors happen (very useful)
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Filter out noisy errors
    ignoreErrors: [
      // Browser extensions
      /chrome-extension:\/\//,
      /moz-extension:\/\//,
      // ResizeObserver warnings (browser quirk, not actionable)
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      // Network errors that aren't our fault
      'NetworkError when attempting to fetch resource',
      'Failed to fetch',
    ],
  });
}

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("React version (runtime):", React.version);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element #root not found in DOM");
  Sentry.captureMessage("Root element #root not found in DOM", "fatal");
} else {
  createRoot(rootElement).render(<App />);
}
