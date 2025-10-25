import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, MapPin, Car } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-rent.jpg";
import carClio from "@/assets/car-clio.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carDuster from "@/assets/car-duster.jpg";
import carPeugeot208 from "@/assets/car-peugeot-208.jpg";
import carVwGolf from "@/assets/car-vw-golf.jpg";
import carHyundaiTucson from "@/assets/car-hyundai-tucson.jpg";
import carKiaSportage from "@/assets/car-kia-sportage.jpg";
import carMercedesC from "@/assets/car-mercedes-c.jpg";
import carAudiA4 from "@/assets/car-audi-a4.jpg";
import carBmwX3 from "@/assets/car-bmw-x3.jpg";
import carCitroenC3 from "@/assets/car-citroen-c3.jpg";
import carFordFocus from "@/assets/car-ford-focus.jpg";
import carNissanQashqai from "@/assets/car-nissan-qashqai.jpg";
import carSeatIbiza from "@/assets/car-seat-ibiza.jpg";
import carFiatTipo from "@/assets/car-fiat-tipo.jpg";

const cars = [
  // Renault
  {
    id: 1,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: ["Caution: 5000 MAD", "300 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 2,
    image: carClio,
    name: "Renault Clio",
    brand: "Renault",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: ["Caution: 4500 MAD", "300 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Toyota
  {
    id: 3,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 450,
    priceDisplay: "450 MAD",
    conditions: ["Caution: 6000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 4,
    image: carCorolla,
    name: "Toyota Corolla",
    brand: "Toyota",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: ["Caution: 6000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  
  // Dacia
  {
    id: 5,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Manuelle",
    category: "SUV",
    city: "Casablanca",
    price: 400,
    priceDisplay: "400 MAD",
    conditions: ["Caution: 5500 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 6,
    image: carDuster,
    name: "Dacia Duster",
    brand: "Dacia",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 480,
    priceDisplay: "480 MAD",
    conditions: ["Caution: 6500 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  
  // Peugeot
  {
    id: 7,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Automatique",
    category: "Citadine",
    city: "Casablanca",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: ["Caution: 4500 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 8,
    image: carPeugeot208,
    name: "Peugeot 208",
    brand: "Peugeot",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 310,
    priceDisplay: "310 MAD",
    conditions: ["Caution: 4000 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Volkswagen
  {
    id: 9,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 420,
    priceDisplay: "420 MAD",
    conditions: ["Caution: 5500 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 10,
    image: carVwGolf,
    name: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Manuelle",
    category: "Berline",
    city: "Marrakech",
    price: 390,
    priceDisplay: "390 MAD",
    conditions: ["Caution: 5000 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Hyundai
  {
    id: 11,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 520,
    priceDisplay: "520 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 12,
    image: carHyundaiTucson,
    name: "Hyundai Tucson",
    brand: "Hyundai",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 510,
    priceDisplay: "510 MAD",
    conditions: ["Caution: 7000 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  
  // Kia
  {
    id: 13,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Automatique",
    category: "SUV",
    city: "Tanger",
    price: 500,
    priceDisplay: "500 MAD",
    conditions: ["Caution: 6800 MAD", "400 km/jour inclus", "Âge minimum: 25 ans"]
  },
  {
    id: 14,
    image: carKiaSportage,
    name: "Kia Sportage",
    brand: "Kia",
    type: "Manuelle",
    category: "SUV",
    city: "Marrakech",
    price: 470,
    priceDisplay: "470 MAD",
    conditions: ["Caution: 6500 MAD", "400 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Mercedes
  {
    id: 15,
    image: carMercedesC,
    name: "Mercedes Classe C",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 850,
    priceDisplay: "850 MAD",
    conditions: ["Caution: 10000 MAD", "400 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 16,
    image: carMercedesC,
    name: "Mercedes Classe C",
    brand: "Mercedes",
    type: "Automatique",
    category: "Berline",
    city: "Marrakech",
    price: 880,
    priceDisplay: "880 MAD",
    conditions: ["Caution: 10000 MAD", "400 km/jour inclus", "Âge minimum: 28 ans"]
  },
  
  // Audi
  {
    id: 17,
    image: carAudiA4,
    name: "Audi A4",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 800,
    priceDisplay: "800 MAD",
    conditions: ["Caution: 9500 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
  },
  {
    id: 18,
    image: carAudiA4,
    name: "Audi A4",
    brand: "Audi",
    type: "Automatique",
    category: "Berline",
    city: "Tanger",
    price: 820,
    priceDisplay: "820 MAD",
    conditions: ["Caution: 9500 MAD", "400 km/jour inclus", "Âge minimum: 27 ans"]
  },
  
  // BMW
  {
    id: 19,
    image: carBmwX3,
    name: "BMW X3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Casablanca",
    price: 950,
    priceDisplay: "950 MAD",
    conditions: ["Caution: 11000 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  {
    id: 20,
    image: carBmwX3,
    name: "BMW X3",
    brand: "BMW",
    type: "Automatique",
    category: "SUV",
    city: "Marrakech",
    price: 970,
    priceDisplay: "970 MAD",
    conditions: ["Caution: 11000 MAD", "450 km/jour inclus", "Âge minimum: 28 ans"]
  },
  
  // Citroën
  {
    id: 21,
    image: carCitroenC3,
    name: "Citroën C3",
    brand: "Citroën",
    type: "Manuelle",
    category: "Citadine",
    city: "Rabat",
    price: 300,
    priceDisplay: "300 MAD",
    conditions: ["Caution: 4000 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 22,
    image: carCitroenC3,
    name: "Citroën C3",
    brand: "Citroën",
    type: "Automatique",
    category: "Citadine",
    city: "Tanger",
    price: 330,
    priceDisplay: "330 MAD",
    conditions: ["Caution: 4500 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Ford
  {
    id: 23,
    image: carFordFocus,
    name: "Ford Focus",
    brand: "Ford",
    type: "Automatique",
    category: "Berline",
    city: "Casablanca",
    price: 380,
    priceDisplay: "380 MAD",
    conditions: ["Caution: 5200 MAD", "350 km/jour inclus", "Âge minimum: 23 ans"]
  },
  {
    id: 24,
    image: carFordFocus,
    name: "Ford Focus",
    brand: "Ford",
    type: "Manuelle",
    category: "Berline",
    city: "Marrakech",
    price: 350,
    priceDisplay: "350 MAD",
    conditions: ["Caution: 4800 MAD", "350 km/jour inclus", "Âge minimum: 22 ans"]
  },
  
  // Nissan
  {
    id: 25,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Automatique",
    category: "SUV",
    city: "Rabat",
    price: 490,
    priceDisplay: "490 MAD",
    conditions: ["Caution: 6500 MAD", "380 km/jour inclus", "Âge minimum: 24 ans"]
  },
  {
    id: 26,
    image: carNissanQashqai,
    name: "Nissan Qashqai",
    brand: "Nissan",
    type: "Manuelle",
    category: "SUV",
    city: "Tanger",
    price: 460,
    priceDisplay: "460 MAD",
    conditions: ["Caution: 6000 MAD", "380 km/jour inclus", "Âge minimum: 23 ans"]
  },
  
  // Seat
  {
    id: 27,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Manuelle",
    category: "Citadine",
    city: "Casablanca",
    price: 290,
    priceDisplay: "290 MAD",
    conditions: ["Caution: 3800 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  {
    id: 28,
    image: carSeatIbiza,
    name: "Seat Ibiza",
    brand: "Seat",
    type: "Automatique",
    category: "Citadine",
    city: "Marrakech",
    price: 320,
    priceDisplay: "320 MAD",
    conditions: ["Caution: 4200 MAD", "250 km/jour inclus", "Âge minimum: 21 ans"]
  },
  
  // Fiat
  {
    id: 29,
    image: carFiatTipo,
    name: "Fiat Tipo",
    brand: "Fiat",
    type: "Automatique",
    category: "Berline",
    city: "Rabat",
    price: 370,
    priceDisplay: "370 MAD",
    conditions: ["Caution: 5000 MAD", "330 km/jour inclus", "Âge minimum: 22 ans"]
  },
  {
    id: 30,
    image: carFiatTipo,
    name: "Fiat Tipo",
    brand: "Fiat",
    type: "Manuelle",
    category: "Berline",
    city: "Tanger",
    price: 340,
    priceDisplay: "340 MAD",
    conditions: ["Caution: 4600 MAD", "330 km/jour inclus", "Âge minimum: 22 ans"]
  }
];

const Louer = () => {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const cities = ["Casablanca", "Marrakech", "Tanger", "Rabat"];
  
  // Toutes les marques de véhicules
  const brands = [
    "Audi", "BMW", "Mercedes",
    "Renault", "Peugeot", "Citroën", "Dacia",
    "Toyota", "Nissan", "Honda", "Hyundai", "Kia", "Mazda", "Suzuki", "Mitsubishi",
    "Volkswagen", "Opel", "Ford", "Fiat", "Seat", "Skoda",
    "Chevrolet"
  ].sort();
  
  // Toutes les catégories de véhicules
  const categories = [
    "Berline", "SUV", "Citadine", "Monospace", "4x4", "Break", "Utilitaire", "Cabriolet"
  ].sort();
  
  const types = ["Automatique", "Manuelle"];

  const filteredCars = cars.filter(car => {
    if (selectedCity && selectedCity !== "all" && car.city !== selectedCity) return false;
    if (selectedType && selectedType !== "all" && car.type !== selectedType) return false;
    if (selectedBrand && selectedBrand !== "all" && car.brand !== selectedBrand) return false;
    if (selectedCategory && selectedCategory !== "all" && car.category !== selectedCategory) return false;
    return true;
  });

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
          
          {/* Search Bar */}
          <Card className="max-w-4xl mx-auto rounded-2xl shadow-xl">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Ville
                  </label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="bg-secondary/20 border-0">
                      <SelectValue placeholder="Toutes les villes" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="all">Toutes les villes</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date de début
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Date de fin
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-secondary/20 border-0",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP", { locale: fr }) : "Sélectionner"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Marque
                  </label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-secondary/20 border-0">
                      <SelectValue placeholder="Toutes les marques" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="all">Toutes les marques</SelectItem>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Catégorie
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-secondary/20 border-0">
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Transmission
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-secondary/20 border-0">
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="all">Tous les types</SelectItem>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Available Cars */}
      <section className="py-20">
        <div className="container">
          <div className="mb-8">
            <h2 className="text-2xl font-barlow font-semibold mb-2">
              {filteredCars.length} véhicule{filteredCars.length > 1 ? 's' : ''} disponible{filteredCars.length > 1 ? 's' : ''}
            </h2>
            <p className="text-muted-foreground">
              Toutes les voitures proviennent d'agences professionnelles vérifiées
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
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
                      <p className="text-sm text-muted-foreground">{car.category} • {car.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{car.priceDisplay}</p>
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
