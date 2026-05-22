import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import { MetaPixel } from "@/components/MetaPixel";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { SitelinksSearchBoxSchema } from "@/components/schemas";
import { CanonicalUrl } from "@/components/CanonicalUrl";
import { IntelligentRoutePrefetcher } from "@/components/IntelligentRoutePrefetcher";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import React, { lazy, Suspense, useEffect, useState, ComponentType } from "react";

// Import critical navigation component directly to avoid dependency chain
import { BottomNavigation } from "@/components/BottomNavigation";

import { PageSkeleton } from "@/components/PageSkeleton";
import { analyticsTracker } from "@/utils/analyticsTracker";

// Code splitting avec React.lazy - Homepage not lazy loaded for better LCP
import Index from "./pages/Index";

// Critical pages - likely to be visited first
const NosServices = lazy(() => import("./pages/NosServices"));
const Louer = lazy(() => import("./pages/Louer"));
const Contact = lazy(() => import("./pages/Contact"));

// Main city pages
const LocationVoitureCasablanca = lazy(() => import("./pages/LocationVoitureCasablanca"));
const LocationVoitureMarrakech = lazy(() => import("./pages/LocationVoitureMarrakech"));
const LocationVoitureRabat = lazy(() => import("./pages/LocationVoitureRabat"));
const LocationVoitureTanger = lazy(() => import("./pages/LocationVoitureTanger"));
const LocationVoitureAgadir = lazy(() => import("./pages/LocationVoitureAgadir"));
const LocationVoitureFes = lazy(() => import("./pages/LocationVoitureFes"));

// Secondary pages
const Partenaires = lazy(() => import("./pages/Partenaires"));
const APropos = lazy(() => import("./pages/APropos"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Glossaire = lazy(() => import("./pages/Glossaire"));
const ComparatifsList = lazy(() => import("./pages/ComparatifsList"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));

// Special pages
const LocationSansCarteMarrakech = lazy(() => import("./pages/LocationSansCarteMarrakech"));
const LocationSansCarteCasablanca = lazy(() => import("./pages/LocationSansCarteCasablanca"));

// Aéroports (6 pages)
const LocationAeroportCasablanca = lazy(() => import("./pages/LocationAeroportCasablanca"));
const LocationAeroportMarrakech = lazy(() => import("./pages/LocationAeroportMarrakech"));
const LocationAeroportAgadir = lazy(() => import("./pages/LocationAeroportAgadir"));
const LocationAeroportTanger = lazy(() => import("./pages/LocationAeroportTanger"));
const LocationAeroportFes = lazy(() => import("./pages/LocationAeroportFes"));
const LocationAeroportRabat = lazy(() => import("./pages/LocationAeroportRabat"));

// Thématiques (15 pages)
const LocationMariageMaroc = lazy(() => import("./pages/LocationMariageMaroc"));
const LocationLongueDureeCasablanca = lazy(() => import("./pages/LocationLongueDureeCasablanca"));
const LocationLongueDureeMarrakech = lazy(() => import("./pages/LocationLongueDureeMarrakech"));
const LocationJeuneConducteurCasablanca = lazy(() => import("./pages/LocationJeuneConducteurCasablanca"));
const LocationJeuneConducteurMarrakech = lazy(() => import("./pages/LocationJeuneConducteurMarrakech"));
const LocationJeuneConducteurRabat = lazy(() => import("./pages/LocationJeuneConducteurRabat"));
const LocationSUVAtlas = lazy(() => import("./pages/LocationSUVAtlas"));
const Location4x4Desert = lazy(() => import("./pages/Location4x4Desert"));
const LocationSUVSudMaroc = lazy(() => import("./pages/LocationSUVSudMaroc"));
const LocationLuxeEvenement = lazy(() => import("./pages/LocationLuxeEvenement"));
const LocationWeekendMarrakech = lazy(() => import("./pages/LocationWeekendMarrakech"));
const LocationElectriqueCasablanca = lazy(() => import("./pages/LocationElectriqueCasablanca"));
const LocationVanFamilleMaroc = lazy(() => import("./pages/LocationVanFamilleMaroc"));
const LocationCabrioletAgadir = lazy(() => import("./pages/LocationCabrioletAgadir"));
const LocationUtilitaireCasablanca = lazy(() => import("./pages/LocationUtilitaireCasablanca"));

// CAN 2025 pages
const LocationCAN2025 = lazy(() => import("./pages/LocationCAN2025"));
const CAN2025Casablanca = lazy(() => import("./pages/CAN2025Casablanca"));
const CAN2025Rabat = lazy(() => import("./pages/CAN2025Rabat"));
const CAN2025Marrakech = lazy(() => import("./pages/CAN2025Marrakech"));
const CAN2025Agadir = lazy(() => import("./pages/CAN2025Agadir"));
const CAN2025Fes = lazy(() => import("./pages/CAN2025Fes"));
const CAN2025Tanger = lazy(() => import("./pages/CAN2025Tanger"));

// Quartiers Casablanca (5 pages)
const LocationVoitureAinDiabCasablanca = lazy(() => import("./pages/LocationVoitureAinDiabCasablanca"));
const LocationVoitureMaarifCasablanca = lazy(() => import("./pages/LocationVoitureMaarifCasablanca"));
const LocationVoitureAnfaCasablanca = lazy(() => import("./pages/LocationVoitureAnfaCasablanca"));
const LocationVoitureSidiMaaroufCasablanca = lazy(() => import("./pages/LocationVoitureSidiMaaroufCasablanca"));
const LocationVoitureHassanCasablanca = lazy(() => import("./pages/LocationVoitureHassanCasablanca"));

// Quartiers Marrakech (6 pages)
const LocationVoitureGuelizMarrakech = lazy(() => import("./pages/LocationVoitureGuelizMarrakech"));
const LocationVoitureHivernageMarrakech = lazy(() => import("./pages/LocationVoitureHivernageMarrakech"));
const LocationVoitureMedinaMarrakech = lazy(() => import("./pages/LocationVoitureMedinaMarrakech"));
const LocationVoiturePalmeraieMarrakech = lazy(() => import("./pages/LocationVoiturePalmeraieMarrakech"));
const LocationVoitureRouteOurikaMarrakech = lazy(() => import("./pages/LocationVoitureRouteOurikaMarrakech"));

// 404 page
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth and Analytics pages
const Auth = lazy(() => import("./pages/Auth"));
const AnalyticsDashboard = lazy(() => import("./pages/Analytics"));

// Analytics tracking component - deferred to avoid FID impact
const AnalyticsTrackerComponent = () => {
  const location = useLocation();
  const isInitialized = React.useRef(false);

  useEffect(() => {
    // Initialize tracker once
    if (!isInitialized.current) {
      analyticsTracker.init();
      isInitialized.current = true;
    }
  }, []);

  useEffect(() => {
    // Defer analytics tracking to avoid blocking main thread during navigation
    const trackWithDelay = () => {
      analyticsTracker.trackPageView(location.pathname);
    };

    // Use requestIdleCallback for non-blocking analytics
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(trackWithDelay, { timeout: 1000 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(trackWithDelay, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return null;
};

// Crisp Chat - loaded deferred
const CrispLoader = () => {
  const [CrispChat, setCrispChat] = useState<ComponentType | null>(null);

  useEffect(() => {
    const loadCrisp = async () => {
      const module = await import("@/components/CrispChat");
      setCrispChat(() => module.CrispChat);
    };

    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => loadCrisp(), { timeout: 5000 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(loadCrisp, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return CrispChat ? <CrispChat /> : null;
};

// Runtime dynamic import loader - loads BackToTop only
const DeferredComponents = () => {
  const [BackToTop, setBackToTop] = useState<ComponentType | null>(null);

  useEffect(() => {
    const loadBackToTop = async () => {
      const bttModule = await import("@/components/BackToTop");
      setBackToTop(() => bttModule.BackToTop);
    };

    // Use requestIdleCallback to start loading after idle
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        setTimeout(loadBackToTop, 3000);
      }, { timeout: 5000 });
      return () => cancelIdleCallback(idleId);
    } else {
      const timer = setTimeout(loadBackToTop, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return BackToTop ? <BackToTop /> : null;
};

const App = () => {
  // Create QueryClient inside component to avoid initialization timing issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
          <BrowserRouter>
            <CanonicalUrl />
            <OrganizationSchema />
            <SitelinksSearchBoxSchema />
            <MetaPixel />
            <AnalyticsTrackerComponent />
            <IntelligentRoutePrefetcher />
            <Analytics />
            <SpeedInsights />
            <LanguageProvider>
              <ComparisonProvider>
                <Toaster />
                <Sonner />
                <ScrollToTop />
                <Suspense fallback={<PageSkeleton />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/nos-services" element={<NosServices />} />
                    <Route path="/louer" element={<Louer />} />
                    <Route path="/partenaires" element={<Partenaires />} />
                    <Route path="/a-propos" element={<APropos />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/glossaire" element={<Glossaire />} />
                    <Route path="/comparatifs" element={<ComparatifsList />} />
                    <Route path="/comparatif/:slug" element={<ComparisonPage />} />
                    <Route path="/location-voiture-casablanca" element={<LocationVoitureCasablanca />} />
                    <Route path="/location-voiture-marrakech" element={<LocationVoitureMarrakech />} />
                    <Route path="/location-voiture-rabat" element={<LocationVoitureRabat />} />
                    <Route path="/location-voiture-tanger" element={<LocationVoitureTanger />} />
                    <Route path="/location-voiture-agadir" element={<LocationVoitureAgadir />} />
                    <Route path="/location-voiture-fes" element={<LocationVoitureFes />} />
                    <Route path="/location-voiture-sans-carte-credit-marrakech" element={<LocationSansCarteMarrakech />} />
                    <Route path="/location-voiture-sans-carte-credit-casablanca" element={<LocationSansCarteCasablanca />} />
                    {/* Aéroports */}
                    <Route path="/location-voiture-aeroport-casablanca" element={<LocationAeroportCasablanca />} />
                    <Route path="/location-voiture-aeroport-marrakech" element={<LocationAeroportMarrakech />} />
                    <Route path="/location-voiture-aeroport-agadir" element={<LocationAeroportAgadir />} />
                    <Route path="/location-voiture-aeroport-tanger" element={<LocationAeroportTanger />} />
                    <Route path="/location-voiture-aeroport-fes" element={<LocationAeroportFes />} />
                    <Route path="/location-voiture-aeroport-rabat" element={<LocationAeroportRabat />} />
                    {/* Thématiques */}
                    <Route path="/location-voiture-mariage-maroc" element={<LocationMariageMaroc />} />
                    <Route path="/location-longue-duree-casablanca" element={<LocationLongueDureeCasablanca />} />
                    <Route path="/location-longue-duree-marrakech" element={<LocationLongueDureeMarrakech />} />
                    <Route path="/location-jeune-conducteur-casablanca" element={<LocationJeuneConducteurCasablanca />} />
                    <Route path="/location-jeune-conducteur-marrakech" element={<LocationJeuneConducteurMarrakech />} />
                    <Route path="/location-jeune-conducteur-rabat" element={<LocationJeuneConducteurRabat />} />
                    <Route path="/location-suv-atlas" element={<LocationSUVAtlas />} />
                    <Route path="/location-4x4-desert" element={<Location4x4Desert />} />
                    <Route path="/location-suv-sud-maroc" element={<LocationSUVSudMaroc />} />
                    <Route path="/location-voiture-luxe-evenement" element={<LocationLuxeEvenement />} />
                    <Route path="/location-weekend-marrakech" element={<LocationWeekendMarrakech />} />
                    <Route path="/location-voiture-electrique-casablanca" element={<LocationElectriqueCasablanca />} />
                    <Route path="/location-van-famille-maroc" element={<LocationVanFamilleMaroc />} />
                    <Route path="/location-cabriolet-agadir" element={<LocationCabrioletAgadir />} />
                    <Route path="/location-utilitaire-demenagement-casablanca" element={<LocationUtilitaireCasablanca />} />
                    <Route path="/location-voiture-can-2025-maroc" element={<LocationCAN2025 />} />
                    {/* CAN 2025 Villes-Stades */}
                    <Route path="/location-voiture-can-2025-casablanca" element={<CAN2025Casablanca />} />
                    <Route path="/location-voiture-can-2025-rabat" element={<CAN2025Rabat />} />
                    <Route path="/location-voiture-can-2025-marrakech" element={<CAN2025Marrakech />} />
                    <Route path="/location-voiture-can-2025-agadir" element={<CAN2025Agadir />} />
                    <Route path="/location-voiture-can-2025-fes" element={<CAN2025Fes />} />
                    <Route path="/location-voiture-can-2025-tanger" element={<CAN2025Tanger />} />
                    {/* Quartiers Casablanca - SEO Hyper-Local */}
                    <Route path="/location-voiture-ain-diab-casablanca" element={<LocationVoitureAinDiabCasablanca />} />
                    <Route path="/location-voiture-maarif-casablanca" element={<LocationVoitureMaarifCasablanca />} />
                    <Route path="/location-voiture-anfa-casablanca" element={<LocationVoitureAnfaCasablanca />} />
                    <Route path="/location-voiture-sidi-maarouf-casablanca" element={<LocationVoitureSidiMaaroufCasablanca />} />
                    <Route path="/location-voiture-hassan-casablanca" element={<LocationVoitureHassanCasablanca />} />
                    {/* Quartiers Marrakech - SEO Hyper-Local */}
                    <Route path="/location-voiture-gueliz-marrakech" element={<LocationVoitureGuelizMarrakech />} />
                    <Route path="/location-voiture-hivernage-marrakech" element={<LocationVoitureHivernageMarrakech />} />
                    <Route path="/location-voiture-medina-marrakech" element={<LocationVoitureMedinaMarrakech />} />
                    <Route path="/location-voiture-palmeraie-marrakech" element={<LocationVoiturePalmeraieMarrakech />} />
                    <Route path="/location-voiture-route-ourika-marrakech" element={<LocationVoitureRouteOurikaMarrakech />} />
                    {/* Auth & Analytics */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/analytics" element={<AnalyticsDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <BottomNavigation />
                <DeferredComponents />
                <CrispLoader />
              </ComparisonProvider>
            </LanguageProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
  );
};

export default App;
