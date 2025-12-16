import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, MapPin, Phone, Clock, Users, Star, ArrowRight, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { StructuredData } from "@/components/StructuredData";
import { HreflangTags } from "@/utils/hreflangHelper";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ReviewsSchema } from "@/components/ReviewsSchema";
import { EnhancedAggregateRatingSchema, BreadcrumbListSchema, createBreadcrumbs } from "@/components/schemas";
import { globalReviews } from "@/data/reviewsData";

// WebP optimized images
import cityCasablanca from "@/assets/city-casablanca-optimized.webp";
import cityMarrakech from "@/assets/city-marrakech-optimized.webp";
import cityRabat from "@/assets/city-rabat-optimized.webp";

const heroImageWebp = "/hero-home-new.webp";

const Index = () => {
  const { t } = useLanguage();
  
  const whatsappNumber = "212699024526";
  
  const openWhatsApp = (city?: string) => {
    const message = city 
      ? `Bonjour, je souhaite louer une voiture à ${city} du [date] au [date].`
      : `Bonjour, je souhaite louer une voiture au Maroc du [date] au [date].`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const cities = [
    { name: "Casablanca", image: cityCasablanca, slug: "/location-voiture-casablanca" },
    { name: "Rabat", image: cityRabat, slug: "/location-voiture-rabat" },
    { name: "Marrakech", image: cityMarrakech, slug: "/location-voiture-marrakech" },
    { name: "Aéroport Casablanca", image: cityCasablanca, slug: "/location-voiture-aeroport-casablanca" },
    { name: "Aéroport Rabat", image: cityRabat, slug: "/location-voiture-aeroport-rabat" },
    { name: "Aéroport Marrakech", image: cityMarrakech, slug: "/location-voiture-aeroport-marrakech" },
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
        averageRating={4.8}
        totalReviews={1247}
      />
      
      <Header />
      
      {/* HERO SECTION - Above the fold */}
      <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src={heroImageWebp} 
          alt="Location de voiture au Maroc"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        
        <div className="container relative z-10 text-center text-white px-4 py-8">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.8/5 - Plus de 1200 clients satisfaits</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in max-w-4xl mx-auto">
            Louez une voiture au Maroc
            <span className="block text-primary mt-2">en quelques minutes, sans stress.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] leading-relaxed">
            Disponible à Casablanca, Rabat, Marrakech & aéroports.
            <span className="block mt-1">Service simple, rapide et humain – même depuis l'étranger.</span>
          </p>
          
          {/* PRIMARY CTA */}
          <div className="animate-fade-in [animation-delay:400ms]">
            <Button 
              onClick={() => openWhatsApp()}
              size="lg"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6 h-auto rounded-full shadow-2xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 font-semibold"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Louer maintenant sur WhatsApp
            </Button>
            <p className="text-white/70 text-sm mt-4">Réponse rapide • Pas de paiement en ligne</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - 3 Steps */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Comment ça marche ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary/30 mb-2">01</div>
              <h3 className="font-semibold text-lg mb-2">Choisissez votre ville & dates</h3>
              <p className="text-muted-foreground text-sm">Casablanca, Rabat, Marrakech ou directement à l'aéroport</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
              </div>
              <div className="text-4xl font-bold text-primary/30 mb-2">02</div>
              <h3 className="font-semibold text-lg mb-2">Contactez-nous sur WhatsApp</h3>
              <p className="text-muted-foreground text-sm">Réponse rapide, conseils personnalisés, sans engagement</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-primary/30 mb-2">03</div>
              <h3 className="font-semibold text-lg mb-2">Récupérez votre voiture</h3>
              <p className="text-muted-foreground text-sm">Véhicule prêt à votre arrivée, livraison possible</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BENATNA - Trust & Differentiation */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Pourquoi choisir Benatna ?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Une location simple et transparente, pensée pour les MRE et touristes
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Pas de paiement en ligne</h3>
                <p className="text-sm text-muted-foreground">Réglez sur place, en toute confiance. Aucun risque.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Aucun frais caché</h3>
                <p className="text-sm text-muted-foreground">Le prix annoncé est le prix final. Transparence totale.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Assistance humaine</h3>
                <p className="text-sm text-muted-foreground">Un vrai interlocuteur qui répond rapidement sur WhatsApp.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Adapté aux MRE & touristes</h3>
                <p className="text-sm text-muted-foreground">Nous comprenons vos besoins spécifiques depuis l'étranger.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="font-semibold mb-2">Flexibilité maximale</h3>
                <p className="text-sm text-muted-foreground">Modification ou annulation facile. On s'adapte à vous.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Véhicules fiables</h3>
                <p className="text-sm text-muted-foreground">Partenaires locaux vérifiés, voitures récentes et entretenues.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CITIES & LOCATIONS */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Où louer votre voiture ?
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Disponible dans les principales villes et aéroports du Maroc
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {cities.map((city) => (
              <Link key={city.name} to={city.slug}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border-0">
                  <div className="relative h-32 sm:h-40">
                    <img 
                      src={city.image} 
                      alt={`Location voiture ${city.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base">{city.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section className="py-16 md:py-20">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by MRE & international travelers</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Ce que disent nos clients
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CAN 2025 mention */}
          <div className="mt-12 text-center">
            <Card className="inline-block border-primary/20 bg-primary/5">
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base">
                  🏆 <strong>CAN 2025 au Maroc</strong> - Réservez votre voiture dès maintenant pour l'événement !
                </p>
                <Link to="/location-voiture-can-2025-maroc" className="text-primary hover:underline text-sm mt-2 inline-block">
                  En savoir plus →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Prêt à réserver votre voiture ?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Vérifiez la disponibilité en quelques secondes sur WhatsApp. Réponse rapide garantie.
          </p>
          <Button 
            onClick={() => openWhatsApp()}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Vérifier la disponibilité sur WhatsApp
          </Button>
        </div>
      </section>

      <Footer />
      
      {/* Sticky WhatsApp CTA - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-background/95 backdrop-blur-sm border-t border-border p-3 safe-area-pb">
        <Button 
          onClick={() => openWhatsApp()}
          className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-base font-semibold rounded-xl shadow-lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Louer maintenant sur WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Index;
