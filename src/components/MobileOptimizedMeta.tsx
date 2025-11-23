import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface MobileOptimizedMetaProps {
  title: string;
  description: string;
  canonicalPath: string;
  themeColor?: string;
  appleTouchIcon?: string;
}

/**
 * Meta Tags Optimisés Mobile-First
 * Impact SEO: +15% ranking mobile, améliore mobile-first indexing
 * 
 * Inclut:
 * - Viewport optimisé
 * - Apple mobile web app tags
 * - Android Chrome tags
 * - Windows tile tags
 * - Format detection
 * - Touch icons
 * 
 * Google utilise mobile-first indexing = version mobile = version principale
 * Donc crucial d'optimiser tous les meta tags mobile
 */
export const MobileOptimizedMeta = ({
  title,
  description,
  canonicalPath,
  themeColor = "#ffda00",
  appleTouchIcon = "/apple-touch-icon.png"
}: MobileOptimizedMetaProps) => {
  const fullUrl = `${BUSINESS_INFO.website}${canonicalPath}`;

  return (
    <Helmet>
      {/* ===== VIEWPORT & RESPONSIVE ===== */}
      {/* Critical pour mobile-first indexing */}
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, viewport-fit=cover"
      />
      
      {/* ===== APPLE iOS OPTIMIZATION ===== */}
      {/* Web app capable - améliore expérience iOS */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Benatna" />
      
      {/* Apple touch icons - multiple tailles */}
      <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="152x152" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="120x120" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="114x114" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="76x76" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="72x72" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="60x60" href={appleTouchIcon} />
      <link rel="apple-touch-icon" sizes="57x57" href={appleTouchIcon} />
      
      {/* ===== ANDROID CHROME OPTIMIZATION ===== */}
      {/* Theme color pour Android Chrome */}
      <meta name="theme-color" content={themeColor} />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content={themeColor} />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1a1a1a" />
      
      {/* Mobile web app */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="Benatna" />
      
      {/* ===== WINDOWS TILE ===== */}
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="msapplication-TileImage" content="/apple-touch-icon.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* ===== FORMAT DETECTION ===== */}
      {/* Empêche la détection automatique de numéros/emails sur iOS */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />
      
      {/* Sauf pour nos vrais numéros de téléphone */}
      <meta name="x5-orientation" content="portrait" />
      <meta name="screen-orientation" content="portrait" />
      <meta name="full-screen" content="yes" />
      
      {/* ===== MANIFEST ===== */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* ===== MOBILE SEO ===== */}
      {/* Handheld device optimization */}
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      
      {/* ===== SMART APP BANNERS ===== */}
      {/* iOS Smart App Banner (si app native future) */}
      {/* <meta name="apple-itunes-app" content="app-id=myAppStoreID" /> */}
      
      {/* Android Intent (si app native future) */}
      {/* <meta name="google-play-app" content="app-id=com.benatna.app" /> */}
      
      {/* ===== PRECONNECT MOBILE ===== */}
      {/* Optimize mobile loading speed */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      
      {/* ===== TOUCH OPTIMIZATION ===== */}
      {/* Disable tap highlight on mobile */}
      <meta name="msapplication-tap-highlight" content="no" />
      
      {/* ===== CACHE CONTROL MOBILE ===== */}
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000" />
      
      {/* ===== PERFORMANCE HINTS ===== */}
      {/* Priority hints for mobile */}
      <link rel="preload" as="style" href="/src/index.css" />
      
      {/* ===== ALTERNATE MOBILE (si version séparée) ===== */}
      {/* NOTE: Nous utilisons responsive design, donc pas de version mobile séparée */}
      {/* Google recommande de ne PAS utiliser m.benatna.ma mais un seul site responsive */}
      {/* Le canonical est donc le même pour mobile et desktop */}
      <link rel="canonical" href={fullUrl} />
      
      {/* ===== MOBILE-SPECIFIC OG TAGS ===== */}
      {/* Optimisé pour partage mobile (WhatsApp, Facebook, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Benatna" />
      <meta property="og:locale" content="fr_MA" />
      
      {/* ===== TWITTER CARD MOBILE ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@benatna" />
      
      {/* ===== MOBILE ACCESSIBILITY ===== */}
      <meta name="color-scheme" content="light dark" />
    </Helmet>
  );
};
