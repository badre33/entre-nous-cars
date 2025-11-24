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
