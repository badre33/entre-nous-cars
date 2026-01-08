import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, MapPin, Car, Send } from "lucide-react";
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
import { openWhatsApp } from "@/utils/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

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

export const RentalRequestForm = () => {
  const { t } = useLanguage();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [city, setCity] = useState<string>("");
  const [carType, setCarType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-card/95 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl border border-border/50">
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

          {/* Type de véhicule */}
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

        {/* Submit Button */}
        <div className="mt-4 md:mt-6">
          <Button 
            type="submit" 
            size="lg"
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold h-12 px-8 text-base"
          >
            <Send className="mr-2 h-5 w-5" />
            Demander un devis gratuit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RentalRequestForm;
