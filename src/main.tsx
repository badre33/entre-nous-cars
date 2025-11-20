import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadCriticalImages } from "./utils/imagePreloader";

// Précharger les images critiques pour améliorer LCP
preloadCriticalImages();

createRoot(document.getElementById("root")!).render(<App />);
