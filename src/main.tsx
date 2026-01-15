// ChunkErrorHandler doit être importé en premier pour intercepter les erreurs de chargement
import './utils/chunkErrorHandler';
import './utils/versionCheck';

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("React version (runtime):", React.version);

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element #root not found in DOM");
} else {
  createRoot(rootElement).render(<App />);
}
