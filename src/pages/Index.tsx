import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-home.jpg";
import cityCasablanca from "@/assets/city-casablanca.jpg";
import cityMarrakech from "@/assets/city-marrakech.jpg";
import cityRabat from "@/assets/city-rabat.jpg";
import cityTanger from "@/assets/city-tanger.jpg";
import cityAgadir from "@/assets/city-agadir.jpg";
import cityFes from "@/assets/city-fes.jpg";

const Index = () => {
  const [parallaxOffset, setParallaxOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setParallaxOffset(offset * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const popularCities = [
    { name: "Casablanca", image: cityCasablanca, vehicles: 52, slug: "Casablanca" },
    { name: "Marrakech", image: cityMarrakech, vehicles: 43, slug: "Marrakech" },
    { name: "Rabat", image: cityRabat, vehicles: 28, slug: "Rabat" },
    { name: "Tanger", image: cityTanger, vehicles: 26, slug: "Tanger" },
    { name: "Agadir", image: cityAgadir, vehicles: 12, slug: "Agadir" },
    { name: "Fès", image: cityFes, vehicles: 15, slug: "Fès" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section with Parallax */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Preloaded image for LCP optimization */}
        <img 
          src={heroImage} 
          alt="Benatna - Location de voitures au Maroc"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover parallax-bg"
          style={{ 
            transform: `translateY(${parallaxOffset}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white drop-shadow-lg">
            La mobilité, entre nous.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/95 font-medium">
            La plateforme marocaine qui réunit les agences de location de voitures locales de confiance. 
            Prix transparents. Processus digital. Sans surprises.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/louer">
              <Button size="lg" className="rounded-full text-lg px-8">
                Louer une voiture
              </Button>
            </Link>
            <Link to="/partenaires">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20">
                Devenir partenaire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">Choisissez votre ville et vos dates</h3>
                <p className="text-muted-foreground">
                  Sélectionnez votre destination et la période de location en quelques clics
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">Choisissez votre véhicule</h3>
                <p className="text-muted-foreground">
                  Parcourez notre sélection de voitures disponibles auprès d'agences vérifiées
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">Récupérez votre véhicule</h3>
                <p className="text-muted-foreground">
                  Sans paperasse ni attente – tout est déjà réglé en ligne
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Benatna */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Pourquoi Benatna</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl bg-card">
              <CardContent className="pt-12 pb-8">
                <Shield className="w-12 h-12 mb-6 text-primary" />
                <h3 className="text-2xl font-barlow font-semibold mb-4">Transparence</h3>
                <p className="text-muted-foreground">
                  Pas de changement de prix de dernière minute. Ce que vous voyez, c'est ce que vous payez.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl bg-card">
              <CardContent className="pt-12 pb-8">
                <CheckCircle className="w-12 h-12 mb-6 text-secondary" />
                <h3 className="text-2xl font-barlow font-semibold mb-4">Simplicité</h3>
                <p className="text-muted-foreground">
                  Réservation 100% en ligne. Plus besoin de formulaires papier ni d'attente au comptoir.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl bg-card">
              <CardContent className="pt-12 pb-8">
                <MapPin className="w-12 h-12 mb-6 text-accent" />
                <h3 className="text-2xl font-barlow font-semibold mb-4">Confiance locale</h3>
                <p className="text-muted-foreground">
                  Uniquement des agences professionnelles vérifiées. Des acteurs marocains de confiance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-4">Villes populaires</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Découvrez notre sélection de véhicules dans les principales villes du Maroc
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCities.map((city) => (
              <Link 
                key={city.name}
                to={`/louer?city=${encodeURIComponent(city.slug)}`}
                className="group"
              >
                <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={city.image} 
                      alt={`Location de voiture à ${city.name}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-barlow font-bold text-white mb-1">{city.name}</h3>
                      <p className="text-white/90 text-sm font-medium">
                        {city.vehicles} véhicules disponibles
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
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
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Pour qui ?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-barlow font-semibold mb-4">Voyageurs & expats</h3>
                <p className="text-muted-foreground">
                  Des voitures fiables dès votre arrivée, sans stress ni surprise
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-barlow font-semibold mb-4">Résidents</h3>
                <p className="text-muted-foreground">
                  Louez quand vous voulez, sans engagement, pour tous vos déplacements
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-barlow font-semibold mb-4">Agences de location</h3>
                <p className="text-muted-foreground">
                  Plus de réservations, plus de visibilité, zéro franchise internationale
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-8">Notre mission</h2>
          <p className="text-xl text-center text-muted-foreground leading-relaxed">
            Le Maroc regorge d'agences locales sérieuses, mais la plupart restent invisibles. 
            Benatna les réunit sur une seule plateforme digitale de confiance — une véritable 
            alternative aux franchises internationales.
          </p>
          <div className="text-center mt-12">
            <Link to="/louer">
              <Button size="lg" className="rounded-full group">
                Découvrir les voitures disponibles
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
