import { useEffect } from "react";

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

// Crisp injects unread counters into <title> like "💬2 - Page title".
// This pollutes SEO when Googlebot crawls during such a state.
// We strip the prefix on every <title> mutation.
const CRISP_TITLE_PREFIX_RE = /^💬\d+\s*-\s*/u;

function stripCrispTitlePrefix() {
  const cleaned = document.title.replace(CRISP_TITLE_PREFIX_RE, "");
  if (cleaned !== document.title) {
    document.title = cleaned;
  }
}

export const CrispChat = () => {
  useEffect(() => {
    // Watch <title> for Crisp's unread counter and strip it immediately.
    // This must be set up BEFORE Crisp loads so we catch the first mutation.
    let observer: MutationObserver | null = null;
    const titleEl = document.querySelector("title");
    if (titleEl) {
      stripCrispTitlePrefix(); // clean any existing prefix from a previous session
      observer = new MutationObserver(stripCrispTitlePrefix);
      observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }

    // Defer Crisp loading to avoid blocking main thread
    const loadCrisp = () => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "feb4da32-b19c-457b-b58f-ddb65ee9524f";

      // Configure Crisp with Benatna brand colors (orange)
      window.$crisp.push(["config", "color:theme", ["orange"]]);

      // Set French locale
      window.$crisp.push(["config", "locale", ["fr"]]);

      // Set welcome message
      window.$crisp.push(["do", "message:show", ["text", "👋 Bonjour ! Besoin d'aide pour votre location de voiture ? Notre équipe est là pour vous accompagner."]]);

      // Hide Crisp by default and show after small delay for better UX
      window.$crisp.push(["config", "hide:on:away", [true]]);

      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    };

    // Load after idle to not impact TBT
    if ("requestIdleCallback" in window) {
      const idleId = requestIdleCallback(loadCrisp, { timeout: 4000 });
      return () => {
        cancelIdleCallback(idleId);
        observer?.disconnect();
      };
    } else {
      const timer = setTimeout(loadCrisp, 3000);
      return () => {
        clearTimeout(timer);
        observer?.disconnect();
      };
    }
  }, []);

  return null;
};
