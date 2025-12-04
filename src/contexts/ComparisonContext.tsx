import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { trackAddToCart } from "@/components/MetaPixel";

interface Car {
  id: number;
  image: string;
  name: string;
  brand: string;
  type: string;
  category: string;
  city: string;
  price: number;
  priceDisplay: string;
  conditions: string[];
  badges?: string[];
}

interface ComparisonContextType {
  selectedCars: Car[];
  addToComparison: (car: Car) => void;
  removeFromComparison: (carId: number) => void;
  clearComparison: () => void;
  isInComparison: (carId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const MAX_COMPARISON = 3;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);

  const addToComparison = (car: Car) => {
    if (selectedCars.length >= MAX_COMPARISON) {
      toast({
        title: "Limite atteinte",
        description: `Vous pouvez comparer jusqu'à ${MAX_COMPARISON} véhicules maximum.`,
        variant: "destructive",
      });
      return;
    }

    if (selectedCars.find(c => c.id === car.id)) {
      toast({
        title: "Déjà ajouté",
        description: "Ce véhicule est déjà dans votre liste de comparaison.",
      });
      return;
    }

    setSelectedCars(prev => [...prev, car]);
    
    // Track AddToCart event for Meta Pixel
    trackAddToCart({
      content_name: car.name,
      content_ids: [car.id.toString()],
      content_type: 'vehicle',
      value: car.price,
      currency: 'MAD'
    });
    
    toast({
      title: "Ajouté à la comparaison",
      description: `${car.name} a été ajouté à la comparaison.`,
    });
  };

  const removeFromComparison = (carId: number) => {
    setSelectedCars(prev => prev.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setSelectedCars([]);
  };

  const isInComparison = (carId: number) => {
    return selectedCars.some(car => car.id === carId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        selectedCars,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider");
  }
  return context;
}
