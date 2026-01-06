import { lazy, Suspense, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { generateSimpleMessage, openWhatsApp } from "@/utils/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

// Deferred SEO schemas to improve TTI - loaded after paint
const DeferredSchemas = () => {
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [schemas, setSchemas] = useState<any>(null);

  useEffect(() => {
    const loadSchemas = async () => {
      const [structuredData, hreflang, service, schemaModule] = await Promise.all([
        import("@/components/StructuredData"),
        import("@/utils/hreflangHelper"),
        import("@/components/ServiceSchema"),
        import("@/components/schemas"),
      ]);
      setSchemas({
        StructuredData: structuredData.StructuredData,
        HreflangTags: hreflang.HreflangTags,
        ServiceSchema: service.ServiceSchema,
        EnhancedAggregateRatingSchema: schemaModule.EnhancedAggregateRatingSchema,
        BreadcrumbListSchema: schemaModule.BreadcrumbListSchema,
        createBreadcrumbs: schemaModule.createBreadcrumbs,
      });
      setLoaded(true);
    };

    // Defer schemas to after paint for better TTI
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadSchemas(), { timeout: 3000 });
    } else {
      setTimeout(loadSchemas, 1000);
    }
  }, []);

  if (!loaded || !schemas) return null;

  const { StructuredData, HreflangTags, ServiceSchema, EnhancedAggregateRatingSchema, BreadcrumbListSchema, createBreadcrumbs } = schemas;

  return (
    <>
      <HreflangTags path="/" />
      <StructuredData type="home" />
      <ServiceSchema />
      <EnhancedAggregateRatingSchema entityType="Organization" entityName="Benatna Location de Voiture Maroc" />
      <BreadcrumbListSchema items={[createBreadcrumbs.home()]} />
    </>
  );
};

// Above-the-fold components - eagerly loaded
import {
  HeroWhatsAppCTA,
  HowItWorks,
  WhyBenatna,
  MobileStickyCTA
} from "@/components/home";

// Below-the-fold components - lazy loaded for better FCP
const CityGrid = lazy(() => import("@/components/home/CityGrid"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const FinalCTA = lazy(() => import("@/components/home/FinalCTA"));
const Footer = lazy(() => import("@/components/Footer"));

// WebP optimized images
import cityCasablanca from "@/assets/city-casablanca-optimized.webp";
import cityMarrakech from "@/assets/city-marrakech-optimized.webp";
import cityRabat from "@/assets/city-rabat-optimized.webp";
// Small optimized versions for grid display
import cityCasablancaSmall from "@/assets/city-casablanca-small.webp";
import cityMarrakechSmall from "@/assets/city-marrakech-small.webp";
import cityRabatSmall from "@/assets/city-rabat-small.webp";

const heroImageWebp = "/hero-home-new.webp";

// Minimal loading skeleton for lazy components
const SectionSkeleton = () => (
  <div className="py-16 animate-pulse">
    <div className="container px-4">
      <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = (city?: string) => {
    openWhatsApp(generateSimpleMessage(city));
  };

  const cities = [
    { nameKey: "homepage.casablanca", image: cityCasablancaSmall, imageLarge: cityCasablanca, slug: "casablanca", guideSlug: "/location-voiture-casablanca" },
    { nameKey: "homepage.rabat", image: cityRabatSmall, imageLarge: cityRabat, slug: "rabat", guideSlug: "/location-voiture-rabat" },
    { nameKey: "homepage.marrakech", image: cityMarrakechSmall, imageLarge: cityMarrakech, slug: "marrakech", guideSlug: "/location-voiture-marrakech" },
    { nameKey: "homepage.airportCasablanca", image: cityCasablancaSmall, imageLarge: cityCasablanca, slug: "casablanca", guideSlug: "/location-voiture-aeroport-casablanca" },
    { nameKey: "homepage.airportRabat", image: cityRabatSmall, imageLarge: cityRabat, slug: "rabat", guideSlug: "/location-voiture-aeroport-rabat" },
    { nameKey: "homepage.airportMarrakech", image: cityMarrakechSmall, imageLarge: cityMarrakech, slug: "marrakech", guideSlug: "/location-voiture-aeroport-marrakech" },
  ];

  const testimonials = [
    {
      nameKey: "homepage.testimonial1Name",
      locationKey: "homepage.testimonial1Location",
      commentKey: "homepage.testimonial1Comment",
      rating: 5
    },
    {
      nameKey: "homepage.testimonial2Name",
      locationKey: "homepage.testimonial2Location", 
      commentKey: "homepage.testimonial2Comment",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{t("homepage.metaTitle")}</title>
        <meta name="description" content={t("homepage.metaDescription")} />
        <link rel="canonical" href="https://benatna.ma/" />
      </Helmet>
      {/* Deferred schemas for better TTI */}
      <DeferredSchemas />
      
      <Header />
      
      <HeroWhatsAppCTA 
        heroImageUrl={heroImageWebp} 
        onWhatsAppClick={() => handleWhatsAppClick()} 
      />
      
      <HowItWorks />
      
      <WhyBenatna />
      
      {/* Below-the-fold sections with lazy loading */}
      <Suspense fallback={<SectionSkeleton />}>
        <CityGrid cities={cities} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials testimonials={testimonials} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <FinalCTA onWhatsAppClick={() => handleWhatsAppClick()} />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
        <Footer />
      </Suspense>
      
      <MobileStickyCTA onWhatsAppClick={() => handleWhatsAppClick()} />
    </div>
  );
};

export default Index;
