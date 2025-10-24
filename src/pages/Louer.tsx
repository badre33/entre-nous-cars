import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Car } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-rent.jpg";
import carClio from "@/assets/car-clio.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carDuster from "@/assets/car-duster.jpg";

const cars = [
  {
    id: 1,
    image: carClio,
    name: "Renault Clio",
    type: "Automatique",
    city: "Casablanca",
    price: "350 MAD",
    conditions: ["Caution: 5000 MAD", "300 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 2,
    image: carCorolla,
    name: "Toyota Corolla",
    type: "Automatique",
    city: "Marrakech",
    price: "450 MAD",
    conditions: ["Caution: 6000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 3,
    image: carDuster,
    name: "Dacia Duster",
    type: "Manuelle",
    city: "Agadir",
    price: "400 MAD",
    conditions: ["Caution: 5500 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 4,
    image: carClio,
    name: "Renault Clio",
    type: "Manuelle",
    city: "Tanger",
    price: "320 MAD",
    conditions: ["Caution: 4500 MAD", "300 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 5,
    image: carCorolla,
    name: "Toyota Corolla",
    type: "Automatique",
    city: "Rabat",
    price: "460 MAD",
    conditions: ["Caution: 6000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 6,
    image: carDuster,
    name: "Dacia Duster",
    type: "Automatique",
    city: "Casablanca",
    price: "480 MAD",
    conditions: ["Caution: 6500 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  }
];

const Louer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero with Search */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center mb-8 text-white drop-shadow-lg">
            Trouvez votre voiture idéale
          </h1>
          
          {/* Search Bar (Static for MVP) */}
          <Card className="max-w-4xl mx-auto rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Ville</label>
                    <Input 
                      placeholder="Casablanca, Marrakech..." 
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Dates</label>
                    <Input 
                      placeholder="15/01 → 20/01" 
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                  <Car className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Type</label>
                    <Input 
                      placeholder="Berline, SUV..." 
                      className="border-0 p-0 h-auto focus-visible:ring-0"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Cars */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden border-2 hover:shadow-xl transition-shadow rounded-2xl group">
                <div className="aspect-video bg-card overflow-hidden">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-barlow font-semibold mb-1">{car.name}</h3>
                      <p className="text-sm text-muted-foreground">{car.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{car.price}</p>
                      <p className="text-xs text-muted-foreground">par jour</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{car.city}</span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {car.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full rounded-full">
                    Demander cette voiture
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="py-12 bg-secondary/30">
        <div className="container text-center">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tous les véhicules proviennent d'agences professionnelles vérifiées — pas de particuliers.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Louer;
