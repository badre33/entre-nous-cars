import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Shield, CheckCircle, Clock, MapPin, Car, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { HreflangTags } from "@/utils/hreflangHelper";
import LazyCarImage from "@/components/LazyCarImage";

// Car images
import carClio from "@/assets/car-clio.jpg";
import carDuster from "@/assets/car-duster.jpg";
import carPeugeot208 from "@/assets/car-peugeot-208.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carMercedesC from "@/assets/car-mercedes-c.jpg";
import carBmwX3 from "@/assets/car-bmw-x3.jpg";

const Louer = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const whatsappNumber = "212699024526";
  
  const openWhatsApp = (carName?: string) => {
    let message = "Bonjour, je souhaite louer une voiture";
    if (carName) {
      message += ` (${carName})`;
    }
    if (selectedCity) {
      message += ` à ${selectedCity}`;
    }
    message += " du [date] au [date].";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const cities = [
    { value: "casablanca", label: "Casablanca" },
    { value: "rabat", label: "Rabat" },
    { value: "marrakech", label: "Marrakech" },
    { value: "aeroport-casablanca", label: "Aéroport Casablanca" },
    { value: "aeroport-rabat", label: "Aéroport Rabat" },
    { value: "aeroport-marrakech", label: "Aéroport Marrakech" },
  ];

  const categories = [
    { value: "economique", label: "Économique" },
    { value: "berline", label: "Berline" },
    { value: "suv", label: "SUV" },
    { value: "luxe", label: "Luxe" },
  ];

  const featuredCars = [
    { name: "Renault Clio", category: "Économique", price: "350 MAD/jour", image: carClio, popular: true },
    { name: "Peugeot 208", category: "Économique", price: "340 MAD/jour", image: carPeugeot208 },
    { name: "Dacia Duster", category: "SUV", price: "400 MAD/jour", image: carDuster, popular: true },
    { name: "Toyota Corolla", category: "Berline", price: "450 MAD/jour", image: carCorolla },
    { name: "Mercedes Classe C", category: "Luxe", price: "850 MAD/jour", image: carMercedesC },
    { name: "BMW X3", category: "SUV Premium", price: "950 MAD/jour", image: carBmwX3 },
  ];

  const filteredCars = useMemo(() => {
    if (!selectedCategory) return featuredCars;
    return featuredCars.filter(car => 
      car.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Louer une Voiture au Maroc | Réservation Simple via WhatsApp | Benatna</title>
        <meta name="description" content="Louez une voiture au Maroc facilement via WhatsApp. Casablanca, Rabat, Marrakech. Pas de paiement en ligne, pas de frais cachés. Réponse rapide garantie." />
        <link rel="canonical" href="https://benatna.ma/louer" />
      </Helmet>
      <HreflangTags path="/louer" />
      <StructuredData type="rental" />
      
      <Header />
      
      {/* Hero / Reassurance Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Louez votre voiture <span className="text-primary">sans stress</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Pas de paiement en ligne • Pas de formulaire compliqué • Réponse rapide sur WhatsApp
            </p>
            
            {/* Trust badges inline */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Paiement sur place</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Prix transparents</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950/30 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-400">Réponse rapide</span>
              </div>
            </div>
            
            {/* Primary CTA */}
            <Button 
              onClick={() => openWhatsApp()}
              size="lg"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6 h-auto rounded-full shadow-xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 font-semibold"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Demander un devis sur WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Simple Process Explanation */}
      <section className="py-12 border-b border-border">
        <div className="container px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            Comment réserver ?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
              <span className="font-medium">Cliquez sur WhatsApp</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
              <span className="font-medium">Indiquez vos dates</span>
            </div>
            <ChevronRight className="hidden md:block w-5 h-5 text-muted-foreground" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
              <span className="font-medium">Recevez votre devis</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Cars Section */}
      <section className="py-12">
        <div className="container px-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px]">
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Car className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Type de véhicule" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Car Examples */}
          <h3 className="text-xl font-semibold text-center mb-6">
            Exemples de véhicules disponibles
          </h3>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Contactez-nous pour connaître la disponibilité exacte
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {filteredCars.map((car, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50" onClick={() => openWhatsApp(car.name)}>
                <div className="relative aspect-[4/3]">
                  <LazyCarImage 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {car.popular && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      Populaire
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3 sm:p-4">
                  <h4 className="font-semibold text-sm sm:text-base truncate">{car.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{car.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm">{car.price}</span>
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* View more CTA */}
          <div className="text-center mt-8">
            <Button 
              onClick={() => openWhatsApp()}
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <MessageCircle className="w-5 h-5 mr-2 text-[#25D366]" />
              Voir plus de véhicules sur WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Reassurance Block */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-center mb-8">
              Pourquoi passer par WhatsApp ?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Réponse en moins de 30 minutes</p>
                  <p className="text-sm text-muted-foreground">Disponibilité confirmée rapidement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Conseils personnalisés</p>
                  <p className="text-sm text-muted-foreground">On vous guide selon vos besoins</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Pas d'engagement</p>
                  <p className="text-sm text-muted-foreground">Demandez un devis sans obligation</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Modifications faciles</p>
                  <p className="text-sm text-muted-foreground">Changez vos dates en un message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-[#25D366] to-[#128C7E]">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Prêt à louer ?
          </h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto">
            Envoyez-nous un message et recevez votre devis personnalisé en quelques minutes.
          </p>
          <Button 
            onClick={() => openWhatsApp()}
            size="lg"
            className="bg-white text-[#25D366] hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Louer maintenant sur WhatsApp
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

export default Louer;
