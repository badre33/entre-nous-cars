import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Shield, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-home-new.png";
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
    { name: "Marrakech", image: cityMarrakech, vehicles: 50, slug: "Marrakech" },
    { name: "Rabat", image: cityRabat, vehicles: 50, slug: "Rabat" },
    { name: "Tanger", image: cityTanger, vehicles: 50, slug: "Tanger" },
    { name: "Agadir", image: cityAgadir, vehicles: 50, slug: "Agadir" },
    { name: "Fès", image: cityFes, vehicles: 50, slug: "Fès" },
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
          <h2 className="text-4xl md:text-5xl text-center mb-6">Pour qui ?</h2>
          <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Benatna s'adapte à tous vos besoins de mobilité au Maroc, que vous soyez de passage ou résident
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Voyageurs & Expats */}
            <div className="text-center">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-barlow font-semibold mb-4">Voyageurs & expats</h3>
                <p className="text-muted-foreground mb-6">
                  Des voitures fiables dès votre arrivée, sans stress ni surprise
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Récupération à l'aéroport</p>
                      <p className="text-sm text-muted-foreground">Votre voiture vous attend dès votre atterrissage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Processus 100% digital</p>
                      <p className="text-sm text-muted-foreground">Réservez en ligne, pas de paperasse sur place</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Prix transparents</p>
                      <p className="text-sm text-muted-foreground">Aucun frais caché ni mauvaise surprise</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Support multilingue</p>
                      <p className="text-sm text-muted-foreground">Français, anglais, arabe : on vous comprend</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-primary">Cas d'usage :</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Road trip de 7 jours entre Marrakech et Merzouga, location mensuelle pour un expatrié en mission
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
                <h3 className="text-2xl font-barlow font-semibold mb-4">Résidents</h3>
                <p className="text-muted-foreground mb-6">
                  Louez quand vous voulez, sans engagement, pour tous vos déplacements
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Locations flexibles</p>
                      <p className="text-sm text-muted-foreground">Un weekend, une semaine, un mois : vous décidez</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Large choix de véhicules</p>
                      <p className="text-sm text-muted-foreground">Citadine, SUV, 4x4 selon vos besoins du moment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Tarifs résidents</p>
                      <p className="text-sm text-muted-foreground">Réductions sur les locations longue durée</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Livraison possible</p>
                      <p className="text-sm text-muted-foreground">Le véhicule vient à vous, où que vous soyez</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-secondary">Cas d'usage :</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Voiture de remplacement pendant une réparation, véhicule spacieux pour un déménagement
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
                <h3 className="text-2xl font-barlow font-semibold mb-4">Agences de location</h3>
                <p className="text-muted-foreground mb-6">
                  Plus de réservations, plus de visibilité, zéro franchise internationale
                </p>
                
                <div className="space-y-4 text-left flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Accès à une clientèle large</p>
                      <p className="text-sm text-muted-foreground">Touchez voyageurs et résidents en un clic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Plateforme digitale complète</p>
                      <p className="text-sm text-muted-foreground">Gérez vos réservations et votre flotte en ligne</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Commission équitable</p>
                      <p className="text-sm text-muted-foreground">Pas de frais cachés, pas de franchise exorbitante</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Support dédié</p>
                      <p className="text-sm text-muted-foreground">Une équipe à votre écoute pour vous accompagner</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm font-medium text-accent">Bénéfices :</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Augmentez votre taux d'occupation, valorisez votre flotte, développez votre activité
                  </p>
                </div>
                
                <Link to="/partenaires" className="mt-4">
                  <Button variant="outline" size="sm" className="w-full group">
                    Devenir partenaire
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
            <h2 className="text-4xl md:text-5xl mb-4">Conseils & Guides</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez nos articles pour préparer votre location et profiter au mieux de votre séjour au Maroc
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link to="/blog/assurance-voiture-maroc" className="group">
              <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop" 
                    alt="Conseils de conduite au Maroc"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-medium text-sm bg-primary/90 px-3 py-1 rounded-full">
                      Conduite
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-colors">
                    10 conseils essentiels pour conduire au Maroc
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Les bonnes pratiques et règles à connaître pour rouler en toute sécurité
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>Lire l'article</span>
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
                      Tourisme
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-colors">
                    Les plus beaux road trips au Maroc
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    De Marrakech à Merzouga, les itinéraires incontournables
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm">
                    <span>Lire l'article</span>
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

          <div className="text-center">
            <Link to="/blog">
              <Button size="lg" variant="outline" className="rounded-full group">
                Voir tous les articles
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-8">Notre mission</h2>
          <p className="text-xl text-center text-muted-foreground leading-relaxed">
            Le Maroc regorge d'agences locales sérieuses, mais la plupart restent invisibles. 
            Benatna les réunit sur une seule plateforme digitale de confiance, une véritable 
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
