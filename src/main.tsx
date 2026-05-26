// IMPORTANT: chunk error handler imported FIRST to intercept loading errors
import './utils/chunkErrorHandler';
import './utils/versionCheck';

// Sentry — DEFERRED dynamic import to reduce initial bundle TBT (~260KB savings).
// Replay integration removed (~80KB saved). Errors that happen in the first ~500ms
// are NOT reported to Sentry (acceptable trade-off for mobile performance).
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

if (SENTRY_DSN && import.meta.env.PROD && typeof window !== 'undefined') {
  const initSentry = () => {
    import('@sentry/react').then((Sentry) => {
      Sentry.init({
        dsn: SENTRY_DSN,
        environment: import.meta.env.MODE,
        tracesSampleRate: 0.1,
        integrations: [Sentry.browserTracingIntegration()],
        ignoreErrors: [
          /chrome-extension:\/\//,
          /moz-extension:\/\//,
          'ResizeObserver loop limit exceeded',
          'ResizeObserver loop completed with undelivered notifications',
          'NetworkError when attempting to fetch resource',
          'Failed to fetch',
        ],
      });
    }).catch(() => {
      // Sentry failed to load — non-critical, continue silently
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initSentry, { timeout: 2500 });
  } else {
    setTimeout(initSentry, 1500);
  }
}

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("React version (runtime):", React.version);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element #root not found in DOM');
  // Sentry deferred — root-missing failure logged to console only
} else {
  createRoot(rootElement).render(<App />);
}
