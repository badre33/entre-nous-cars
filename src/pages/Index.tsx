import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { HreflangTags } from "@/utils/hreflangHelper";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ReviewsSchema } from "@/components/ReviewsSchema";
import { EnhancedAggregateRatingSchema, BreadcrumbListSchema, createBreadcrumbs } from "@/components/schemas";
import { globalReviews } from "@/data/reviewsData";
import { SITE_STATS } from "@/data/siteStats";
import { generateSimpleMessage, openWhatsApp } from "@/utils/whatsapp";
import {
  HeroWhatsAppCTA,
  HowItWorks,
  WhyBenatna,
  CityGrid,
  Testimonials,
  FinalCTA,
  MobileStickyCTA
} from "@/components/home";

// WebP optimized images
import cityCasablanca from "@/assets/city-casablanca-optimized.webp";
import cityMarrakech from "@/assets/city-marrakech-optimized.webp";
import cityRabat from "@/assets/city-rabat-optimized.webp";

const heroImageWebp = "/hero-home-new.webp";

const Index = () => {
  const handleWhatsAppClick = (city?: string) => {
    openWhatsApp(generateSimpleMessage(city));
  };

  const cities = [
    { name: "Casablanca", image: cityCasablanca, slug: "casablanca", guideSlug: "/location-voiture-casablanca" },
    { name: "Rabat", image: cityRabat, slug: "rabat", guideSlug: "/location-voiture-rabat" },
    { name: "Marrakech", image: cityMarrakech, slug: "marrakech", guideSlug: "/location-voiture-marrakech" },
    { name: "Aéroport Casablanca", image: cityCasablanca, slug: "casablanca", guideSlug: "/location-voiture-aeroport-casablanca" },
    { name: "Aéroport Rabat", image: cityRabat, slug: "rabat", guideSlug: "/location-voiture-aeroport-rabat" },
    { name: "Aéroport Marrakech", image: cityMarrakech, slug: "marrakech", guideSlug: "/location-voiture-aeroport-marrakech" },
  ];

  const testimonials = [
    {
      name: "Youssef A.",
      location: "France → Casablanca",
      comment: "Service impeccable ! J'ai réservé depuis Paris, tout était prêt à mon arrivée. Aucun stress.",
      rating: 5
    },
    {
      name: "Sarah M.",
      location: "Belgique → Marrakech", 
      comment: "Enfin une agence qui répond rapidement sur WhatsApp. Très pratique pour nous les MRE.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Benatna - Location de Voiture au Maroc | Simple, Rapide, Sans Stress</title>
        <meta name="description" content="Louez une voiture au Maroc en quelques minutes. Casablanca, Marrakech, Rabat & aéroports. Service humain et réactif via WhatsApp. Pas de paiement en ligne." />
        <link rel="canonical" href="https://benatna.ma/" />
      </Helmet>
      <HreflangTags path="/" />
      <StructuredData type="home" />
      <ServiceSchema />
      <EnhancedAggregateRatingSchema entityType="Organization" entityName="Benatna Location de Voiture Maroc" />
      <BreadcrumbListSchema items={[createBreadcrumbs.home()]} />
      <ReviewsSchema
        reviews={globalReviews.slice(0, 3).map(r => ({
          name: r.author,
          location: "Maroc",
          rating: r.rating,
          comment: r.text,
          date: r.date,
          car: r.title || "Véhicule"
        }))}
        averageRating={SITE_STATS.ratingAverage}
        totalReviews={SITE_STATS.ratingCount}
      />
      
      <Header />
      
      <HeroWhatsAppCTA 
        heroImageUrl={heroImageWebp} 
        onWhatsAppClick={() => handleWhatsAppClick()} 
      />
      
      <HowItWorks />
      
      <WhyBenatna />
      
      <CityGrid cities={cities} />
      
      <Testimonials testimonials={testimonials} />
      
      <FinalCTA onWhatsAppClick={() => handleWhatsAppClick()} />
      
      <Footer />
      
      <MobileStickyCTA onWhatsAppClick={() => handleWhatsAppClick()} />
    </div>
  );
};

export default Index;
