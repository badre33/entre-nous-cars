import { useEffect } from 'react';

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

export const CrispChat = () => {
  useEffect(() => {
    // Defer Crisp loading to avoid blocking main thread
    const loadCrisp = () => {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "feb4da32-b19c-457b-b58f-ddb65ee9524f";
      
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    };

    // Load after idle to not impact TBT
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(loadCrisp, { timeout: 4000 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(loadCrisp, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};
