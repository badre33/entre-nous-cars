import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { BackToTop } from "@/components/BackToTop";
import { AIAssistant } from "@/components/AIAssistant";
import { BottomNavigation } from "@/components/BottomNavigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import { lazy, Suspense, useEffect } from "react";
import LoadingCar from "@/components/LoadingCar";
import { analytics } from "@/utils/analytics";

// Code splitting avec React.lazy
const Index = lazy(() => import("./pages/Index"));
const Louer = lazy(() => import("./pages/Louer"));
const Partenaires = lazy(() => import("./pages/Partenaires"));
const APropos = lazy(() => import("./pages/APropos"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Contact = lazy(() => import("./pages/Contact"));
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

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
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
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <WhatsAppButton />
                <div className="hidden md:block">
                  <AIAssistant />
                </div>
                <BackToTop />
                <BottomNavigation />
              </ComparisonProvider>
            </LanguageProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
