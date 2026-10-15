import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSearchForm } from "@/components/HeroSearchForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIntelligentPreloader } from "@/hooks/useIntelligentPreloader";
import { StructuredData } from "@/components/StructuredData";
import { generateHeroImageAlt, generateCityImageAlt } from "@/utils/seoHelpers";
import { HreflangTags } from "@/utils/hreflangHelper";

// ⚡ PERF: composants below-the-fold lazy-loaded (réduit TBT + LCP)
const AnimatedCounter = lazy(() => import("@/components/AnimatedCounter"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA").then(m => ({ default: m.FloatingCTA })));
const SEOLinks = lazy(() => import("@/components/SEOLinks").then(m => ({ default: m.SEOLinks })));

// ⚡ PERF: schemas SEO JSON-LD lazy-loaded (Google Bot exécute JS, pas grave)
const ServiceSchema = lazy(() => import("@/components/ServiceSchema").then(m => ({ default: m.ServiceSchema })));
const HowToSchema = lazy(() => import("@/components/HowToSchema"));
const OfferSchema = lazy(() => import("@/components/OfferSchema").then(m => ({ default: m.OfferSchema })));
const VehicleProductSchemas = lazy(() => import("@/components/VehicleProductSchemas").then(m => ({ default: m.VehicleProductSchemas })));
const OpeningHoursSchema = lazy(() => import("@/components/schemas").then(m => ({ default: m.OpeningHoursSchema })));
const SitelinksSearchBoxSchema = lazy(() => import("@/components/schemas").then(m => ({ default: m.SitelinksSearchBoxSchema })));
const BreadcrumbListSchema = lazy(() => import("@/components/schemas").then(m => ({ default: m.BreadcrumbListSchema })));

// createBreadcrumbs est une simple fn, on la garde synchrone
import { createBreadcrumbs } from "@/components/schemas";
// WebP optimized images (compressed and resized for display)
import cityCasablanca from "@/assets/city-casablanca-optimized.webp";
import cityRabat from "@/assets/city-rabat-optimized.webp";

// Hero image: WebP in public folder for LCP optimization
const heroImageWebp = "/hero-home-new.webp";

// Metas multilingues de la page d'accueil (FR canonique, EN /en, ES /es)
const HOME_META: Record<string, { title: string; desc: string; url: string }> = {
  fr: {
    title: "Benatna — Location de voiture à Casablanca",
    desc: "Des loueurs basés à Casablanca pour vos séjours et vacances. Prise en charge en ville ou à l’aéroport Mohammed V. Rabat sur demande, à confirmer.",
    url: "https://benatna.ma/",
  },
  en: {
    title: "Benatna — Car rental in Casablanca",
    desc: "Casablanca-based agencies for your holidays and stays. City or Mohammed V Airport pickup. Rabat delivery on request, subject to confirmation.",
    url: "https://benatna.ma/en",
  },
  es: {
    title: "Benatna — Alquiler de coches en Casablanca",
    desc: "Agencias en Casablanca para vacaciones y estancias. Recogida en ciudad o aeropuerto Mohammed V. Rabat bajo petición y confirmación.",
    url: "https://benatna.ma/es",
  },
};

const Index = () => {
  const { t, language } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Les métadonnées sont posées par Helmet plus bas. Elles l'étaient aussi
  // directement dans le DOM ici : cette balise <meta name="description">
  // survivait à la navigation et polluait ensuite TOUTES les autres pages
  // avec la description de l'accueil.
  const homeMeta = HOME_META[language] ?? HOME_META.fr;
  const [isDesktop, setIsDesktop] = useState(false);
  const statsAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const whyAnimation = useScrollAnimation(0.2);
  const citiesAnimation = useScrollAnimation(0.2);

  // Préchargement intelligent des images suivantes
  useIntelligentPreloader([
    { selector: 'img[data-city-image]', attribute: 'src' },
    { selector: 'img[loading="lazy"]', attribute: 'src' }
  ], 0.6);

  useEffect(() => {
    // Check if desktop once on mount to avoid reflow during render
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();

    // Use matchMedia for resize detection (no reflow)
    const mql = window.matchMedia('(min-width: 768px)');
    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handleResize);

    // Defer parallax setup to avoid blocking FID
    let rafId: number | null = null;
    let isScrolling = false;

    const updateParallax = () => {
      // Only update if desktop (already in state, no reflow)
      if (mql.matches) {
        const offset = window.scrollY;
        setParallaxOffset(offset * 0.5);
      }
      isScrolling = false;
    };

    const handleScroll = () => {
      // Throttle with requestAnimationFrame to avoid blocking main thread
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    // Defer scroll listener registration to improve FID
    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      mql.removeEventListener('change', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const popularCities = [
    { name: "Casablanca", image: cityCasablanca, vehicles: "Casablanca", slug: "Casablanca" },
    { name: "Rabat", image: cityRabat, vehicles: "Sur demande", slug: "Rabat" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{homeMeta.title}</title>
        <meta name="description" content={homeMeta.desc} />
        <meta name="keywords" content="location voiture casablanca, aéroport Mohammed V, loueur Casablanca, livraison Rabat sur demande" />
        <meta property="og:title" content={homeMeta.title} />
        <meta property="og:description" content={homeMeta.desc} />
      </Helmet>
      <HreflangTags path="/" />
      <StructuredData type="home" />
      {/* ⚡ PERF: schemas JSON-LD lazy (Google Bot exécute JS depuis 2019) */}
      <Suspense fallback={null}>
      <ServiceSchema />
      <HowToSchema />
      <OfferSchema />


      {/* Schema AggregateRating pour étoiles Google */}


      <OpeningHoursSchema
        entityType="Organization"
        entityName="Benatna Location de Voiture Maroc"
      />

      {/* Product Schema pour top 20 véhicules */}
      <VehicleProductSchemas limit={20} />

      {/* BreadcrumbList Schema (Homepage) */}
      <BreadcrumbListSchema items={[createBreadcrumbs.home()]} />
      </Suspense>

      <Header />

      <main>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[560px] sm:min-h-[600px] md:h-[650px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        {/* LCP-optimized WebP hero image from public folder for fast discovery */}
        <img
          src={heroImageWebp}
          alt={generateHeroImageAlt()}
          className="absolute inset-0 w-full h-full object-cover parallax-bg transition-transform duration-300"
          style={{
            transform: isDesktop ? `translateY(${parallaxOffset}px)` : 'none'
          }}
          width="1920"
          height="1080"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="container relative z-10 text-center text-white px-3 sm:px-6 animate-fade-in py-4 sm:py-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 sm:mb-5 text-white drop-shadow-lg animate-fade-in leading-tight font-pacifico">
            {t('home.heroTitle')}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-7 max-w-3xl mx-auto text-white/90 font-medium animate-fade-in [animation-delay:200ms] leading-relaxed px-1">
            {t('home.heroSubtitle')}
          </p>

          {/* USP badges — angle anti-franchise : tout inclus, pas de frais cachés */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4 animate-fade-in [animation-delay:300ms] px-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 text-primary rounded-full text-xs sm:text-sm font-semibold shadow-md backdrop-blur-sm whitespace-nowrap">
              <span className="text-sm sm:text-base">💰</span>
              <span>Dès <strong>300 DH</strong>/jour</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 text-primary rounded-full text-xs sm:text-sm font-semibold shadow-md backdrop-blur-sm whitespace-nowrap">
              <span className="text-sm sm:text-base">💳</span>
              <span>Sans CB bloquée</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/95 text-primary rounded-full text-xs sm:text-sm font-semibold shadow-md backdrop-blur-sm whitespace-nowrap">
              <span className="text-sm sm:text-base">📱</span>
              <span>WhatsApp en 2 min</span>
            </span>
          </div>

          {/* Slogan anti-franchise : prix transparent, tous clients egaux */}
          <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 animate-fade-in [animation-delay:350ms] px-2">
            <p className="text-base sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg text-center">
              ✨ Le prix annoncé est le prix payé.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-white/85 mt-1 text-center max-w-2xl">
              Pas de surcharge jeune conducteur • Pas d'empreinte CB bloquée • Pas de frais aéroport cachés • Tout client traité de la même manière
            </p>
          </div>

          {/* Search Form */}
          <div className="animate-fade-in [animation-delay:400ms] max-w-5xl mx-auto mb-4 sm:mb-7 px-0 sm:px-4">
            <HeroSearchForm />
          </div>

          {/* Desktop: Partner CTA */}
          <div className="hidden sm:flex gap-3 sm:gap-4 justify-center flex-wrap animate-fade-in [animation-delay:600ms]">
            <Link to="/partenaires">
              <Button size="lg" variant="partner" className="rounded-full text-sm sm:text-base lg:text-lg px-5 sm:px-7 h-10 sm:h-11">
                {t('home.becomePartner')}
              </Button>
            </Link>
          </div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 text-sm sm:text-base">
              Simple et Rapide
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">{t('home.howItWorks')}</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Louez votre voiture en 3 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {/* Connection lines between steps */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-30" />

            {/* Step 1 */}
            <Card className="relative border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-3xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-12 pb-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    1
                  </div>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-primary transition-colors">
                  {t('home.step1Title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('home.step1Text')}
                </p>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-primary">30 secondes</p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="relative border-2 hover:border-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-3xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-12 pb-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    2
                  </div>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-secondary transition-colors">
                  {t('home.step2Title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('home.step2Text')}
                </p>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-secondary">2 minutes</p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="relative border-2 hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-3xl group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="pt-12 pb-8 text-center relative z-10">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    3
                  </div>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-accent transition-colors">
                  {t('home.step3Title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('home.step3Text')}
                </p>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-accent">Instantané</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Prêt à démarrer votre aventure ?
            </p>
            <Link to="/louer">
              <Button size="lg" className="rounded-full group h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
                Trouver ma voiture
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Notre modèle — storytelling startup marocaine + comparateur Avis */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container relative z-10 px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-10 sm:mb-14">
            <Badge variant="secondary" className="mb-4 text-sm sm:text-base">
              🇲🇦 Startup marocaine
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              On a fait le calcul pour vous.
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Une Renault Clio, un mois en août, à Casablanca :
            </p>
          </div>

          {/* Tableau comparatif Avis vs Benatna */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-10">
            <Card className="border-2 border-destructive/30 bg-destructive/5">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-medium text-destructive mb-1">Chez Avis Maroc</p>
                <p className="text-3xl sm:text-5xl font-bold mb-1">9 000 DH</p>
                <p className="text-xs text-muted-foreground mb-4">minimum — et plus de 10 000 DH en haute saison</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>❌ Empreinte carte 8 000 dh</li>
                  <li>❌ Surcoût jeune conducteur</li>
                  <li>❌ Voiture « ou similaire »</li>
                  <li>❌ CA qui repart hors du Maroc</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary bg-primary/5 shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-medium text-primary mb-1">Chez Benatna</p>
                <p className="text-3xl sm:text-5xl font-bold mb-4 text-primary">7 000 DH</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>✅ Zéro caution CB bloquée</li>
                  <li>✅ Pas de surcoût jeune conducteur</li>
                  <li>✅ La voiture que vous voyez, vous la conduisez</li>
                  <li>✅ CA 100% réinvesti au Maroc</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <p className="text-xl sm:text-2xl font-bold">
              Vous économisez <span className="text-secondary">2 000 à 3 000 dh</span>. Sur une seule location.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Benatna est une <strong>startup marocaine</strong> qui rassemble les <strong>milliers d'agences de location locales</strong> sur une seule plateforme. Une fois unies, elles font <strong>rapport de force face aux grosses franchises internationales</strong> — Avis, Hertz, Europcar, Sixt. Vous accédez à un choix immense de véhicules au meilleur prix, et chaque dirham dépensé reste au Maroc.
            </p>
          </div>

          <div className="text-center">
            <Link to="/notre-histoire" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold underline underline-offset-4">
              Lire notre histoire complète →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Benatna */}
      <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="container relative z-10 px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="secondary" className="mb-4 text-sm sm:text-base">
              Nos Avantages
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">{t('home.whyBenatna')}</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Ce qui nous rend différents et meilleurs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Transparency */}
            <Card className="relative border-2 hover:border-primary transition-all duration-500 hover:shadow-2xl rounded-3xl group overflow-hidden bg-card/50 backdrop-blur">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    100%
                  </Badge>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-primary transition-colors">
                  {t('home.transparencyTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('home.transparencyText')}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Prix garantis sans frais cachés</span>
                </div>
              </CardContent>
            </Card>

            {/* Simplicity */}
            <Card className="relative border-2 hover:border-secondary transition-all duration-500 hover:shadow-2xl rounded-3xl group overflow-hidden bg-card/50 backdrop-blur">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                    Facile
                  </Badge>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-secondary transition-colors">
                  {t('home.simplicityTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('home.simplicityText')}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                  <CheckCircle className="w-4 h-4" />
                  <span>Réservation en moins de 3 minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Trust */}
            <Card className="relative border-2 hover:border-accent transition-all duration-500 hover:shadow-2xl rounded-3xl group overflow-hidden bg-card/50 backdrop-blur">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500" />
              <CardContent className="pt-12 pb-8 relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                    Local
                  </Badge>
                </div>
                <h3 className="text-2xl font-barlow font-bold mb-4 group-hover:text-accent transition-colors">
                  {t('home.trustTitle')}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t('home.trustText')}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                  <CheckCircle className="w-4 h-4" />
                  <span>Agences vérifiées et certifiées</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl">Loueurs locaux</p>
                <p className="text-sm text-muted-foreground">Agences partenaires</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl">Sur demande</p>
                <p className="text-sm text-muted-foreground">Disponibilité à confirmer</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl">Casablanca</p>
                <p className="text-sm text-muted-foreground">Zone principale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Cup 2026 — Morocco qualified, group C — first match Morocco-Brazil June 13 */}


      {/* Popular Cities */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 px-4">{t('home.popularCities')}</h2>
          <p className="text-center text-muted-foreground text-sm sm:text-base mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            {t('home.popularCitiesSubtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {popularCities.map((city) => (
              <Link
                key={city.name}
                to={`/louer?city=${encodeURIComponent(city.slug)}`}
                className="group"
              >
                <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img
                      src={city.image}
                      alt={generateCityImageAlt(city.name)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      width="800"
                      height="500"
                      decoding="async"
                      loading="lazy"
                      data-city-image
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-barlow font-bold text-white mb-1">{city.name}</h3>
                      <p className="text-white/90 text-xs sm:text-sm font-medium">
                        {city.name === "Rabat" ? "Livraison sur demande, à confirmer" : "Prise en charge en ville et à l’aéroport Mohammed V"}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        Explorer
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 text-center space-y-5">
        <h2 className="text-3xl">MRE, touristes et vacanciers : votre séjour commence à Casablanca</h2>
        <p>Voitures de tourisme pour trois jours minimum et six mois maximum. Prise en charge à Casablanca ; livraison à Rabat sur demande, faisabilité et frais à confirmer.</p>
        <p>Pas de vans, minibus, utilitaires, prestations de mariage, événementielles ou locations professionnelles.</p>
        <Link className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3" to="/prise-en-charge-casablanca-rabat">Arriver en gare ou à l’aéroport : préparer ma prise en charge</Link>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl mb-4">{t('guides.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('guides.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link to="/blog/assurance-voiture-maroc" className="group">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop"
                    alt="Conseils de conduite au Maroc"
                    width="800"
                    height="500"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <span className="text-white font-medium text-xs sm:text-sm bg-primary/90 px-2 sm:px-3 py-1 rounded-full">
                      {t('guides.drivingCategory')}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                    {t('guides.article1Title')}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                    {t('guides.article1Text')}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm">
                    <span>{t('guides.readArticle')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/blog/conseils-conduite-maroc" className="group">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop"
                    alt="Road trips au Maroc"
                    width="800"
                    height="500"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-medium text-sm bg-secondary/90 px-3 py-1 rounded-full">
                      {t('guides.tourismCategory')}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-colors">
                    {t('guides.article2Title')}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t('guides.article2Text')}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>{t('guides.readArticle')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/blog/road-trips-maroc" className="group">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop"
                    alt="Assurance voiture au Maroc"
                    width="800"
                    height="500"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-medium text-sm bg-accent/90 px-3 py-1 rounded-full">
                      Assurance
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-colors">
                    Comprendre l'assurance voiture
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Tout savoir sur l'assurance, la franchise et la protection
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>Lire l'article</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/blog">
              <Button size="lg" variant="outline" className="rounded-full group h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
                Voir tous les articles
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-6 sm:mb-8 px-4">{t('home.ourMission')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground leading-relaxed px-4">
            {t('home.missionText')}
          </p>
          <div className="text-center mt-8 sm:mt-12">
            <Link to="/louer">
              <Button size="lg" className="rounded-full group h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
                {t('home.discoverCars')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ⚡ PERF: composants below-the-fold en Suspense (chargés en arrière-plan) */}
      <Suspense fallback={null}>
        {/* Customer Reviews */}


        {/* Loyalty Program */}

        {/* SEO Links & Content */}
        <SEOLinks />
      </Suspense>
      </main>

      <Footer />

      {/* ⚡ PERF: éléments flottants lazy (chargés après idle) */}
      <Suspense fallback={null}>
        <FloatingCTA />
      </Suspense>
    </div>
  );
};

export default Index;
