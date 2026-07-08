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
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { SitelinksSearchBoxSchema } from "@/components/schemas";
import { CanonicalUrl } from "@/components/CanonicalUrl";
// MetaPixel, IntelligentRoutePrefetcher, Analytics, SpeedInsights are lazy-loaded
// in DeferredComponents below to reduce initial bundle size (TBT optimization)
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
const NotreHistoire = lazy(() => import("./pages/NotreHistoire"));
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

// Évènements 2026 (Coupe du Monde + Été — peak season)
const LocationCoupeMonde2026 = lazy(() => import("./pages/LocationCoupeMonde2026"));
const LocationEte2026 = lazy(() => import("./pages/LocationEte2026"));

// Sprint MRE/touristes — pages stratégiques
const LocationTangerMedPort = lazy(() => import("./pages/LocationTangerMedPort"));
const LocationMREMaroc = lazy(() => import("./pages/LocationMREMaroc"));
const LocationCircuitVillesImperiales = lazy(() => import("./pages/LocationCircuitVillesImperiales"));

// Sprint 2 — Gares + quartiers Rabat
const LocationGareCasaVoyageurs = lazy(() => import("./pages/LocationGareCasaVoyageurs"));
const LocationGareMarrakech = lazy(() => import("./pages/LocationGareMarrakech"));
const LocationAgdalRabat = lazy(() => import("./pages/LocationAgdalRabat"));
const LocationSouissiRabat = lazy(() => import("./pages/LocationSouissiRabat"));
const PrixLocationVoiture2026 = lazy(() => import("./pages/PrixLocationVoiture2026"));

// Sprint $38k — Pages keywords concurrents
const LocationVoitureAutomatiqueCasablanca = lazy(() => import("./pages/LocationVoitureAutomatiqueCasablanca"));
const LocationVoitureAutomatiqueMarrakech = lazy(() => import("./pages/LocationVoitureAutomatiqueMarrakech"));
const CautionLocationVoitureMaroc = lazy(() => import("./pages/CautionLocationVoitureMaroc"));
const LocationVoitureGareOncfMaroc = lazy(() => import("./pages/LocationVoitureGareOncfMaroc"));
const TopActivitesMarrakechVoiture = lazy(() => import("./pages/TopActivitesMarrakechVoiture"));

// Sprint $38k V3 — Hub guide + 10 sub-pages longue traîne
const GuideMaroc = lazy(() => import("./pages/GuideMaroc"));
const PermisInternationalMaroc = lazy(() => import("./pages/PermisInternationalMaroc"));
const AgeMinimumLocationVoitureMaroc = lazy(() => import("./pages/AgeMinimumLocationVoitureMaroc"));
const EviterArnaquesLocationVoitureMaroc = lazy(() => import("./pages/EviterArnaquesLocationVoitureMaroc"));
const PeagesAutorouteMaroc2026 = lazy(() => import("./pages/PeagesAutorouteMaroc2026"));
const PrixEssenceGasoilMaroc2026 = lazy(() => import("./pages/PrixEssenceGasoilMaroc2026"));
const ConduireMarocPermisEtranger = lazy(() => import("./pages/ConduireMarocPermisEtranger"));
const LocationVoitureAvecChauffeurMaroc = lazy(() => import("./pages/LocationVoitureAvecChauffeurMaroc"));
const AccidentVoitureLocationMaroc = lazy(() => import("./pages/AccidentVoitureLocationMaroc"));
const CourteVsLongueDureeLocationVoitureMaroc = lazy(() => import("./pages/CourteVsLongueDureeLocationVoitureMaroc"));
const EssenceOuDieselLocationVoitureMaroc = lazy(() => import("./pages/EssenceOuDieselLocationVoitureMaroc"));
const BenatnaVsFranchises = lazy(() => import("./pages/BenatnaVsFranchises"));
const VehicleDetail = lazy(() => import("./pages/VehicleDetail"));

// Sprint GEO — 4 pages optimisées LLM
const TopAgencesLocationMaroc2026 = lazy(() => import("./pages/TopAgencesLocationMaroc2026"));
const LouerVoitureMarocFaqComplete = lazy(() => import("./pages/LouerVoitureMarocFaqComplete"));
const PermisEtrangerDouaneMRE = lazy(() => import("./pages/PermisEtrangerDouaneMRE"));
const AvisClientsBenatna2026 = lazy(() => import("./pages/AvisClientsBenatna2026"));
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


// Runtime dynamic import loader - loads non-critical components after page is interactive
// This significantly reduces TBT (Total Blocking Time) on mobile by ~40-60% by moving
// MetaPixel, Vercel Analytics/SpeedInsights, IntelligentRoutePrefetcher, BackToTop,
// and WhatsAppButton out of the initial bundle.
const DeferredComponents = () => {
  const [BackToTop, setBackToTop] = useState<ComponentType | null>(null);
  const [WhatsApp, setWhatsApp] = useState<ComponentType | null>(null);
  const [MetaPixel, setMetaPixel] = useState<ComponentType | null>(null);
  const [Prefetcher, setPrefetcher] = useState<ComponentType | null>(null);
  const [VercelAnalytics, setVercelAnalytics] = useState<ComponentType | null>(null);
  const [VercelSpeedInsights, setVercelSpeedInsights] = useState<ComponentType | null>(null);

  useEffect(() => {
    // PHASE 1 (early, ~500ms): conversion-critical + analytics that should capture LCP
    const loadEarly = async () => {
      try {
        const [waModule, vaModule, vsModule] = await Promise.all([
          import("@/components/WhatsAppButton"),
          import("@vercel/analytics/react"),
          import("@vercel/speed-insights/react"),
        ]);
        setWhatsApp(() => waModule.default);
        setVercelAnalytics(() => vaModule.Analytics);
        setVercelSpeedInsights(() => vsModule.SpeedInsights);
      } catch (e) {
        // Fail silently — these are non-critical
      }
    };

    // PHASE 2 (later, ~1.5s after idle): truly optional features
    const loadLate = async () => {
      try {
        const [bttModule, mpModule, prefModule] = await Promise.all([
          import("@/components/BackToTop"),
          import("@/components/MetaPixel"),
          import("@/components/IntelligentRoutePrefetcher"),
        ]);
        setBackToTop(() => bttModule.BackToTop);
        setMetaPixel(() => mpModule.MetaPixel);
        setPrefetcher(() => prefModule.IntelligentRoutePrefetcher);
      } catch (e) {
        // Fail silently — these are non-critical
      }
    };

    let cleanupEarly: (() => void) | undefined;
    let cleanupLate: (() => void) | undefined;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const earlyId = requestIdleCallback(() => {
        const t = setTimeout(loadEarly, 300);
        cleanupEarly = () => clearTimeout(t);
      }, { timeout: 1500 });

      const lateId = requestIdleCallback(() => {
        const t = setTimeout(loadLate, 1500);
        cleanupLate = () => clearTimeout(t);
      }, { timeout: 4000 });

      return () => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          cancelIdleCallback(earlyId);
          cancelIdleCallback(lateId);
        }
        cleanupEarly?.();
        cleanupLate?.();
      };
    } else {
      // Safari iOS fallback (no requestIdleCallback)
      const t1 = setTimeout(loadEarly, 800);
      const t2 = setTimeout(loadLate, 2000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  return (
    <>
      {WhatsApp && <WhatsApp />}
      {BackToTop && <BackToTop />}
      {MetaPixel && <MetaPixel />}
      {Prefetcher && <Prefetcher />}
      {VercelAnalytics && <VercelAnalytics />}
      {VercelSpeedInsights && <VercelSpeedInsights />}
    </>
  );
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
            {/* MetaPixel, IntelligentRoutePrefetcher, Analytics, SpeedInsights are now in DeferredComponents below */}
            <AnalyticsTrackerComponent />
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
                    <Route path="/notre-histoire" element={<NotreHistoire />} />
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
                    <Route path="/location-voiture-coupe-monde-2026-maroc" element={<LocationCoupeMonde2026 />} />
                    <Route path="/location-voiture-ete-2026-maroc" element={<LocationEte2026 />} />
                    <Route path="/location-voiture-tanger-med-port" element={<LocationTangerMedPort />} />
                    <Route path="/location-voiture-mre-maroc" element={<LocationMREMaroc />} />
                    <Route path="/location-voiture-circuit-villes-imperiales" element={<LocationCircuitVillesImperiales />} />
                    <Route path="/location-voiture-gare-casa-voyageurs" element={<LocationGareCasaVoyageurs />} />
                    <Route path="/location-voiture-gare-marrakech" element={<LocationGareMarrakech />} />
                    <Route path="/location-voiture-agdal-rabat" element={<LocationAgdalRabat />} />
                    <Route path="/location-voiture-souissi-rabat" element={<LocationSouissiRabat />} />
                    <Route path="/prix-location-voiture-maroc-2026" element={<PrixLocationVoiture2026 />} />
                    <Route path="/location-voiture-automatique-casablanca" element={<LocationVoitureAutomatiqueCasablanca />} />
                    <Route path="/location-voiture-automatique-marrakech" element={<LocationVoitureAutomatiqueMarrakech />} />
                    <Route path="/caution-location-voiture-maroc" element={<CautionLocationVoitureMaroc />} />
                    <Route path="/location-voiture-gare-oncf-maroc" element={<LocationVoitureGareOncfMaroc />} />
                    <Route path="/top-activites-marrakech-en-voiture" element={<TopActivitesMarrakechVoiture />} />
                    <Route path="/guide-maroc" element={<GuideMaroc />} />
                    <Route path="/permis-international-maroc-location-voiture" element={<PermisInternationalMaroc />} />
                    <Route path="/age-minimum-location-voiture-maroc" element={<AgeMinimumLocationVoitureMaroc />} />
                    <Route path="/eviter-arnaques-location-voiture-maroc" element={<EviterArnaquesLocationVoitureMaroc />} />
                    <Route path="/peages-autoroute-maroc-tarifs-2026" element={<PeagesAutorouteMaroc2026 />} />
                    <Route path="/prix-essence-gasoil-maroc-2026" element={<PrixEssenceGasoilMaroc2026 />} />
                    <Route path="/conduire-maroc-permis-etranger" element={<ConduireMarocPermisEtranger />} />
                    <Route path="/location-voiture-avec-chauffeur-maroc" element={<LocationVoitureAvecChauffeurMaroc />} />
                    <Route path="/accident-voiture-location-maroc-que-faire" element={<AccidentVoitureLocationMaroc />} />
                    <Route path="/courte-vs-longue-duree-location-voiture-maroc" element={<CourteVsLongueDureeLocationVoitureMaroc />} />
                    <Route path="/essence-ou-diesel-location-voiture-maroc" element={<EssenceOuDieselLocationVoitureMaroc />} />
                    <Route path="/benatna-vs-avis-hertz-europcar-sixt" element={<BenatnaVsFranchises />} />
                    <Route path="/vehicule/:slug" element={<VehicleDetail />} />
                    <Route path="/top-agences-location-voiture-maroc-2026" element={<TopAgencesLocationMaroc2026 />} />
                    <Route path="/louer-voiture-maroc-faq-complete" element={<LouerVoitureMarocFaqComplete />} />
                    <Route path="/permis-etranger-douane-mre-location-voiture" element={<PermisEtrangerDouaneMRE />} />
                    <Route path="/avis-clients-benatna-2026" element={<AvisClientsBenatna2026 />} />
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
