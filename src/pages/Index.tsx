import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/AnimatedCounter";
import { HeroSearchForm } from "@/components/HeroSearchForm";
import { FloatingCTA } from "@/components/FloatingCTA";
import { SEOLinks } from "@/components/SEOLinks";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useIntelligentPreloader } from "@/hooks/useIntelligentPreloader";
import { StructuredData } from "@/components/StructuredData";
import { generateHeroImageAlt, generateCityImageAlt } from "@/utils/seoHelpers";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ReviewsSchema } from "@/components/ReviewsSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { HreflangTags } from "@/utils/hreflangHelper";
import { EnhancedAggregateRatingSchema, IndividualReviewsSchema, OpeningHoursSchema, SitelinksSearchBoxSchema, BreadcrumbListSchema, createBreadcrumbs } from "@/components/schemas";
import { globalReviews } from "@/data/reviewsData";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
// WebP optimized images (compressed and resized for display)
import cityCasablanca from "@/assets/city-casablanca-optimized.webp";
import cityMarrakech from "@/assets/city-marrakech-optimized.webp";
import cityRabat from "@/assets/city-rabat-optimized.webp";
import cityTanger from "@/assets/city-tanger.jpg";
import cityAgadir from "@/assets/city-agadir.jpg";
import cityFes from "@/assets/city-fes.jpg";

// Hero image: WebP in public folder for LCP optimization
const heroImageWebp = "/hero-home-new.webp";

const Index = () => {
  const { t } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // WORKAROUND: react-helmet-async fails to update document.title here.
  // Force-set via useEffect to preserve Lighthouse SEO score (was 100, dropped to 57).
  useEffect(() => {
    const FORCED_TITLE_HOMEPAGE = "Location Voiture Maroc dès 300 DH/jour - Sans Carte de Crédit | Benatna";
    const FORCED_DESC_HOMEPAGE = "Location de voiture au Maroc avec Benatna. Casablanca, Marrakech, Rabat, Agadir. Prix dès 300 DH/jour, livraison aéroport, sans carte de crédit.";
    document.title = FORCED_TITLE_HOMEPAGE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', FORCED_DESC_HOMEPAGE);
  }, []);
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
    { name: "Casablanca", image: cityCasablanca, vehicles: 52, slug: "Casablanca" },
    { name: "Marrakech", image: cityMarrakech, vehicles: 50, slug: "Marrakech" },
    { name: "Rabat", image: cityRabat, vehicles: 50, slug: "Rabat" },
    { name: "Tanger", image: cityTanger, vehicles: 50, slug: "Tanger" },
    { name: "Agadir", image: cityAgadir, vehicles: 50, slug: "Agadir" },
    { name: "Fès", image: cityFes, vehicles: 50, slug: "Fès" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Benatna - Location de Voiture au Maroc | Prix dès 300 DH/jour</title>
        <meta name="description" content="Location de voiture au Maroc avec Benatna. Casablanca, Marrakech, Rabat, Agadir. Prix dès 300 DH/jour, livraison aéroport, agences vérifiées." />
        <meta name="keywords" content="location voiture maroc, location auto casablanca, louer voiture marrakech, location véhicule rabat, rent car morocco, agence location voiture, voiture de tourisme maroc" />
        <link rel="canonical" href="https://benatna.ma/" />
        <meta property="og:title" content="Benatna - Location de Voiture au Maroc" />
        <meta property="og:description" content="La plateforme marocaine qui réunit les agences de location de voitures locales de confiance. Prix transparents. Processus digital. Sans surprises." />
        <meta property="og:url" content="https://benatna.ma/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <HreflangTags path="/" />
      <StructuredData type="home" />
      <ServiceSchema />
      <HowToSchema />
      <OfferSchema />
      <ReviewsSchema
        reviews={[
          {
            name: 'Amina Benali',
            location: 'Casablanca',
            rating: 5,
            comment: 'Service impeccable ! J\'ai loué une Clio pour visiter Marrakech. La voiture était propre, récente et le prix très compétitif. Je recommande vivement Benatna.',
            date: 'Il y a 2 jours',
            car: 'Renault Clio',
          },
          {
            name: 'Youssef Alami',
            location: 'Rabat',
            rating: 5,
            comment: 'Excellente expérience du début à la fin. L\'assistance client est réactive et professionnelle. J\'ai eu un surclassement gratuit vers un SUV. Merci !',
            date: 'Il y a 5 jours',
            car: 'Dacia Duster',
          },
          {
            name: 'Sofia Mansouri',
            location: 'Marrakech',
            rating: 5,
            comment: 'Parfait pour mon séjour touristique ! La réservation en ligne est simple et rapide. La voiture m\'attendait à l\'aéroport. Aucun souci pendant toute la durée de location.',
            date: 'Il y a 1 semaine',
            car: 'Toyota Yaris',
          },
          {
            name: 'Mehdi Tazi',
            location: 'Fès',
            rating: 5,
            comment: 'Très bonne agence ! Prix transparents, pas de frais cachés. La voiture était en parfait état. Je loue régulièrement chez Benatna et je ne suis jamais déçu.',
            date: 'Il y a 2 semaines',
            car: 'Toyota Corolla',
          },
          {
            name: 'Karima El Fassi',
            location: 'Tanger',
            rating: 5,
            comment: 'Location ultra simple, voiture nickel et tarifs imbattables. L\'équipe Benatna est top !',
            date: 'Il y a 3 semaines',
            car: 'Hyundai i20',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
      />
      
      {/* Schema AggregateRating pour étoiles Google */}
      <EnhancedAggregateRatingSchema 
        entityType="Organization"
        entityName="Benatna Location de Voiture Maroc"
      />
      <IndividualReviewsSchema
        reviews={globalReviews.slice(0, 10)}
        entityType="Organization"
      />
      <OpeningHoursSchema 
        entityType="Organization"
        entityName="Benatna Location de Voiture Maroc"
      />
      
      {/* Product Schema pour top 20 véhicules */}
      <VehicleProductSchemas limit={20} />
      
      {/* BreadcrumbList Schema (Homepage) */}
      <BreadcrumbListSchema items={[createBreadcrumbs.home()]} />
      
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
          
          {/* Mobile: Quick trust indicators in hero */}
          <div className="flex sm:hidden items-center justify-center gap-4 mt-2 animate-fade-in [animation-delay:600ms]">
            <div className="flex items-center gap-1.5 text-white/90 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="font-semibold">4.8</span>
              <span className="text-white/70">(1200+ avis)</span>
            </div>
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

      {/* Stats Section - Compact on mobile */}
      <section className="py-8 sm:py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div 
          ref={statsAnimation.ref}
          className="container px-4 sm:px-6"
        >
          {/* Mobile: Horizontal compact stats */}
          <div className={`grid grid-cols-3 sm:hidden gap-2 max-w-md mx-auto transition-all duration-700 ${
            statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center p-3 bg-card rounded-xl shadow-sm border border-border/30">
              <span className="text-2xl font-bold text-primary block">302+</span>
              <p className="text-xs text-muted-foreground mt-0.5">Voitures</p>
            </div>
            <div className="text-center p-3 bg-card rounded-xl shadow-sm border border-border/30">
              <span className="text-2xl font-bold text-secondary block">24+</span>
              <p className="text-xs text-muted-foreground mt-0.5">Agences</p>
            </div>
            <div className="text-center p-3 bg-card rounded-xl shadow-sm border border-border/30">
              <span className="text-2xl font-bold text-accent block">1200+</span>
              <p className="text-xs text-muted-foreground mt-0.5">Clients</p>
            </div>
          </div>
          
          {/* Desktop: Full stats */}
          <div className={`hidden sm:grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto transition-all duration-700 ${
            statsAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold text-primary">
                  <AnimatedCounter end={302} suffix="+" />
                </span>
              </div>
              <p className="text-xl font-semibold mb-2">{t('home.availableCars')}</p>
              <p className="text-sm text-muted-foreground px-4">
                {t('home.inCities')}
              </p>
            </div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold text-secondary">
                  <AnimatedCounter end={24} suffix="+" />
                </span>
              </div>
              <p className="text-xl font-semibold mb-2">{t('home.partnerAgencies')}</p>
              <p className="text-sm text-muted-foreground px-4">
                {t('home.verifiedTrusted')}
              </p>
            </div>
            
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-bold text-accent">
                  <AnimatedCounter end={1200} suffix="+" />
                </span>
              </div>
              <p className="text-xl font-semibold mb-2">{t('home.satisfiedClients')}</p>
              <p className="text-sm text-muted-foreground px-4">
                {t('home.sinceLaunch')}
              </p>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            {/* Google Reviews */}
            <div className="flex items-center gap-2 sm:gap-3 bg-card px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-sm font-semibold">Google</p>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold">4.8</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 fill-yellow-400" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TripAdvisor */}
            <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#00AA6C"/>
                  <path d="M8.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="white"/>
                  <circle cx="8.5" cy="10" r="0.8" fill="#000"/>
                  <circle cx="15.5" cy="10" r="0.8" fill="#000"/>
                  <path d="M4 10c0-2.5 2-4.5 4.5-4.5 1.3 0 2.4.5 3.2 1.3.8-.8 1.9-1.3 3.2-1.3 2.5 0 4.5 2 4.5 4.5" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
                <div className="text-left">
                  <p className="text-sm font-semibold">TripAdvisor</p>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">4.9</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-[#00AA6C]" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trustpilot */}
            <div className="flex items-center gap-3 bg-card px-6 py-4 rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2">
                <div className="bg-[#00B67A] w-6 h-6 rounded flex items-center justify-center">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold">Trustpilot</p>
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">4.7</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-[#00B67A]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <p className="font-bold text-2xl">50+</p>
                <p className="text-sm text-muted-foreground">Agences partenaires</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl">300+</p>
                <p className="text-sm text-muted-foreground">Véhicules disponibles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-bold text-2xl">6</p>
                <p className="text-sm text-muted-foreground">Villes couvertes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* World Cup 2026 — Morocco qualified, group C — first match Morocco-Brazil June 13 */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 text-base px-6 py-2 bg-gradient-to-r from-primary to-accent text-white border-0">
                🏆 Événement Spécial
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Coupe du Monde 2026 — Maroc qualifié
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Coupe d'Afrique des Nations • 21 Déc 2025 - 18 Jan 2026
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">6 Villes Hôtes</h3>
                      <p className="text-muted-foreground text-sm">
                        Casablanca, Rabat, Marrakech, Agadir, Fès, Tanger
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-xs">Stades Modernes</Badge>
                    <Badge variant="outline" className="text-xs">Accès Optimisé</Badge>
                    <Badge variant="outline" className="text-xs">Parking Disponible</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl">
                <CardContent className="pt-8 pb-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Offres Spéciales</h3>
                      <p className="text-muted-foreground text-sm">
                        Tarifs groupes, réservation anticipée, véhicules adaptés
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="text-xs">-15% Groupes</Badge>
                    <Badge variant="outline" className="text-xs">SUV & Vans</Badge>
                    <Badge variant="outline" className="text-xs">Annulation Flexible</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link to="/location-voiture-coupe-monde-2026-maroc">
                <Button size="lg" className="rounded-full text-lg px-10 h-14 bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Voir Nos Offres Coupe du Monde 2026
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Réservez maintenant pour la Coupe du Monde 2026. Maroc-Brésil le 13 juin. Tarifs MRE spéciaux.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                      loading="lazy"
                      data-city-image
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-barlow font-bold text-white mb-1">{city.name}</h3>
                      <p className="text-white/90 text-xs sm:text-sm font-medium">
                        {city.vehicles} {t('common.vehicles')}
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

      {/* For Whom */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
        <div className="container px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 sm:mb-6 px-4">{t('forWho.title')}</h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-muted-foreground mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
            {t('forWho.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Voyageurs & Expats */}
            <div className="text-center">
              <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-barlow font-semibold mb-3 sm:mb-4">{t('forWho.travelers')}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                  {t('forWho.travelersText')}
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.airportPickup')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.airportPickupText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.digitalProcess')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.digitalProcessText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.transparentPrices')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.transparentPricesText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.multilingualSupport')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.multilingualSupportText')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-primary">{t('forWho.useCaseLabel')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('forWho.travelersUseCase')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Résidents */}
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">{t('forWho.residents')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('forWho.residentsText')}
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.flexibleRentals')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.flexibleRentalsText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.wideChoice')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.wideChoiceText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.residentRates')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.residentRatesText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.deliveryAvailable')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.deliveryAvailableText')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-secondary">{t('forWho.useCaseLabel')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('forWho.residentsUseCase')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Agences de location */}
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">{t('forWho.agencies')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('forWho.agenciesText')}
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.wideClientele')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.wideClienteleText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.digitalPlatform')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.digitalPlatformText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.fairCommission')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.fairCommissionText')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">{t('forWho.dedicatedSupport')}</p>
                      <p className="text-sm text-muted-foreground">{t('forWho.dedicatedSupportText')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-accent">{t('forWho.benefitsLabel')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('forWho.agenciesBenefits')}
                  </p>
                </div>
                
                <Link to="/partenaires" className="mt-4">
                  <Button variant="partner" size="sm" className="w-full group">
                    {t('forWho.becomePartner')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Loyalty Program */}
      <LoyaltyProgram />

      {/* SEO Links & Content */}
      <SEOLinks />
      </main>

      <Footer />
      
      {/* Floating CTA Button */}
      <FloatingCTA />
      
      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
