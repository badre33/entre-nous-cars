import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadCriticalImages } from "./utils/imagePreloader";

// Précharger les images critiques pour améliorer LCP
preloadCriticalImages();

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker after initial render to avoid blocking FCP
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .catch((error) => console.log('SW registration failed:', error));
  });
}
