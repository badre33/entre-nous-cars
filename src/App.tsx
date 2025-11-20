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
import { lazy, Suspense, useEffect, useState } from "react";

// Import critical navigation component directly to avoid dependency chain
import { BottomNavigation } from "@/components/BottomNavigation";

// Lazy load truly non-critical components - will be deferred
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));
const AIAssistant = lazy(() => import("@/components/AIAssistant").then(m => ({ default: m.AIAssistant })));
const BackToTop = lazy(() => import("@/components/BackToTop").then(m => ({ default: m.BackToTop })));
import LoadingCar from "@/components/LoadingCar";
import { analytics } from "@/utils/analytics";

// Code splitting avec React.lazy - Homepage not lazy loaded for better LCP
import Index from "./pages/Index";
const Louer = lazy(() => import("./pages/Louer"));
const Partenaires = lazy(() => import("./pages/Partenaires"));
const APropos = lazy(() => import("./pages/APropos"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const LocationVoitureCasablanca = lazy(() => import("./pages/LocationVoitureCasablanca"));
const LocationVoitureMarrakech = lazy(() => import("./pages/LocationVoitureMarrakech"));
const LocationVoitureRabat = lazy(() => import("./pages/LocationVoitureRabat"));
const LocationVoitureTanger = lazy(() => import("./pages/LocationVoitureTanger"));
const LocationVoitureAgadir = lazy(() => import("./pages/LocationVoitureAgadir"));
const LocationVoitureFes = lazy(() => import("./pages/LocationVoitureFes"));
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
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location]);

  return null;
};

// Deferred component loader to reduce initial dependency chain
const DeferredComponents = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer loading non-critical components until after initial render
    const timer = setTimeout(() => setShouldLoad(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <WhatsAppButton />
      <div className="hidden md:block">
        <AIAssistant />
      </div>
      <BackToTop />
    </Suspense>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <OrganizationSchema />
            <MetaPixel />
            <AnalyticsTracker />
            <LanguageProvider>
              <ComparisonProvider>
                <Toaster />
                <Sonner />
                <ScrollToTop />
                <Suspense fallback={<LoadingCar />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/louer" element={<Louer />} />
                    <Route path="/partenaires" element={<Partenaires />} />
                    <Route path="/a-propos" element={<APropos />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<FAQ />} />
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

export default App;
