import { useState, useMemo } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, MapPin, Car, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { openWhatsApp } from "@/utils/whatsapp";
import LazyCarImage from "@/components/LazyCarImage";

// Car images
import carClio from "@/assets/car-clio.jpg";
import carDuster from "@/assets/car-duster.jpg";
import carPeugeot208 from "@/assets/car-peugeot-208.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carMercedesC from "@/assets/car-mercedes-c.jpg";
import carBmwX3 from "@/assets/car-bmw-x3.jpg";
import carPeugeot3008 from "@/assets/car-peugeot-3008.jpg";
import carToyotaRav4 from "@/assets/car-toyota-rav4.jpg";
import carHyundaiTucson from "@/assets/car-hyundai-tucson.jpg";
import carMercedesGLC from "@/assets/car-mercedes-glc.jpg";
import carVWGolf from "@/assets/car-vw-golf.jpg";
import carRenaultMegane from "@/assets/car-renault-megane.jpg";

const cities = [
  { value: "casablanca", label: "Casablanca" },
  { value: "marrakech", label: "Marrakech" },
  { value: "rabat", label: "Rabat" },
  { value: "agadir", label: "Agadir" },
  { value: "tanger", label: "Tanger" },
  { value: "fes", label: "Fès" },
];

const carTypes = [
  { value: "economique", label: "Économique" },
  { value: "compacte", label: "Compacte" },
  { value: "suv", label: "SUV / 4x4" },
  { value: "berline", label: "Berline" },
  { value: "luxe", label: "Luxe" },
  { value: "utilitaire", label: "Utilitaire" },
];

// All available vehicles
const allVehicles = [
  // Économique
  { name: "Renault Clio", category: "economique", categoryLabel: "Économique", price: "350 MAD/jour", image: carClio, popular: true },
  { name: "Peugeot 208", category: "economique", categoryLabel: "Économique", price: "340 MAD/jour", image: carPeugeot208 },
  
  // SUV
  { name: "Dacia Duster", category: "suv", categoryLabel: "SUV / 4x4", price: "400 MAD/jour", image: carDuster, popular: true },
  { name: "Peugeot 3008", category: "suv", categoryLabel: "SUV / 4x4", price: "550 MAD/jour", image: carPeugeot3008 },
  { name: "Toyota RAV4", category: "suv", categoryLabel: "SUV / 4x4", price: "600 MAD/jour", image: carToyotaRav4 },
  { name: "Hyundai Tucson", category: "suv", categoryLabel: "SUV / 4x4", price: "500 MAD/jour", image: carHyundaiTucson },
  { name: "BMW X3", category: "suv", categoryLabel: "SUV / 4x4", price: "950 MAD/jour", image: carBmwX3 },
  { name: "Mercedes GLC", category: "suv", categoryLabel: "SUV / 4x4", price: "1000 MAD/jour", image: carMercedesGLC },
  
  // Berline
  { name: "Toyota Corolla", category: "berline", categoryLabel: "Berline", price: "450 MAD/jour", image: carCorolla },
  { name: "VW Golf", category: "berline", categoryLabel: "Berline", price: "420 MAD/jour", image: carVWGolf },
  { name: "Renault Megane", category: "berline", categoryLabel: "Berline", price: "400 MAD/jour", image: carRenaultMegane },
  
  // Luxe
  { name: "Mercedes Classe C", category: "luxe", categoryLabel: "Luxe", price: "850 MAD/jour", image: carMercedesC },
];

export const RentalRequestForm = () => {
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [city, setCity] = useState<string>("");
  const [carType, setCarType] = useState<string>("");

  // Filter vehicles based on selected car type (city doesn't filter - all vehicles available everywhere)
  const filteredVehicles = useMemo(() => {
    if (!carType) return allVehicles;
    return allVehicles.filter(car => car.category === carType);
  }, [carType]);

  // Show results when city OR carType is selected
  const showResults = city !== "" || carType !== "";

  const handleVehicleClick = (vehicleName: string) => {
    const cityLabel = cities.find(c => c.value === city)?.label || city;
    
    let message = `Bonjour, je souhaite louer une ${vehicleName}`;
    
    if (cityLabel) {
      message += ` à ${cityLabel}`;
    }
    
    if (pickupDate) {
      message += `\n📅 Départ: ${format(pickupDate, "dd MMMM yyyy", { locale: fr })}`;
    }
    
    if (returnDate) {
      message += `\n📅 Retour: ${format(returnDate, "dd MMMM yyyy", { locale: fr })}`;
    }
    
    message += `\n\nMerci de me contacter avec les disponibilités et tarifs.`;
    
    openWhatsApp(message);
  };

  const handleSubmitAll = () => {
    const cityLabel = cities.find(c => c.value === city)?.label || city;
    const carLabel = carTypes.find(c => c.value === carType)?.label || carType;
    
    let message = `Bonjour, je souhaite louer une voiture`;
    
    if (cityLabel) {
      message += ` à ${cityLabel}`;
    }
    
    if (carLabel) {
      message += ` (${carLabel})`;
    }
    
    if (pickupDate) {
      message += `\n📅 Départ: ${format(pickupDate, "dd MMMM yyyy", { locale: fr })}`;
    }
    
    if (returnDate) {
      message += `\n📅 Retour: ${format(returnDate, "dd MMMM yyyy", { locale: fr })}`;
    }
    
    message += `\n\nMerci de me contacter avec les disponibilités et tarifs.`;
    
    openWhatsApp(message);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Search Form */}
      <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl border border-border/50">
        {/* Reassurance message */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          ✅ Tous nos véhicules sont disponibles dans toutes les villes et pour toutes les dates
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Ville */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Ville
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full h-11 bg-background">
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              Type de véhicule
            </label>
            <Select value={carType} onValueChange={setCarType}>
              <SelectTrigger className="w-full h-11 bg-background">
                <SelectValue placeholder="Tous types" />
              </SelectTrigger>
              <SelectContent>
                {carTypes.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date de départ */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Date de départ
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-background",
                    pickupDate ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {pickupDate ? (
                    format(pickupDate, "dd MMM yyyy", { locale: fr })
                  ) : (
                    <span>Sélectionner</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Date de retour */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Date de retour
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-11 justify-start text-left font-normal bg-background",
                    returnDate ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {returnDate ? (
                    format(returnDate, "dd MMM yyyy", { locale: fr })
                  ) : (
                    <span>Sélectionner</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) => date < (pickupDate || new Date())}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Info message */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Sélectionnez une ville ou un type de véhicule pour voir les disponibilités
          </p>
        </div>
      </div>

      {/* Search Results - Always visible when city or carType selected */}
      {showResults && (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-lg font-semibold">
              {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} disponible{filteredVehicles.length > 1 ? 's' : ''}
              {city && ` à ${cities.find(c => c.value === city)?.label}`}
            </h3>
            {carType && (
              <Badge variant="secondary" className="text-sm">
                {carTypes.find(c => c.value === carType)?.label}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredVehicles.map((vehicle, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50"
                onClick={() => handleVehicleClick(vehicle.name)}
              >
                <div className="relative aspect-[4/3]">
                  <LazyCarImage 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {vehicle.popular && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                      Populaire
                    </Badge>
                  )}
                </div>
                <CardContent className="p-2 sm:p-3">
                  <h4 className="font-semibold text-sm truncate">{vehicle.name}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{vehicle.categoryLabel}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-xs sm:text-sm">{vehicle.price}</span>
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA to contact */}
          <div className="mt-6 text-center">
            <Button 
              onClick={handleSubmitAll}
              size="lg"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold h-12 px-8 text-base"
            >
              <Send className="mr-2 h-5 w-5" />
              Demander un devis gratuit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalRequestForm;
