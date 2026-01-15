// ChunkErrorHandler doit être importé en premier pour intercepter les erreurs de chargement
import './utils/chunkErrorHandler';

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __APP_BOOTED__?: boolean;
  }
}

// Defer non-critical initialization
const initNonCritical = () => {
  import('./utils/versionCheck');
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element #root not found in DOM");
} else {
  createRoot(rootElement).render(<App />);

  // Mark app as booted for the HTML watchdog (helps diagnose blank-screen issues)
  window.__APP_BOOTED__ = true;
  window.dispatchEvent(new Event('app:booted'));

  // Load non-critical utilities after render
  if ('requestIdleCallback' in window) {
    requestIdleCallback(initNonCritical, { timeout: 3000 });
  } else {
    setTimeout(initNonCritical, 1000);
  }
}
