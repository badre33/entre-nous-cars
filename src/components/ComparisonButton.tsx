import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison, MAX_COMPARISON } from "@/contexts/ComparisonContext";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface ComparisonButtonProps {
  onClick: () => void;
}

export default function ComparisonButton({ onClick }: ComparisonButtonProps) {
  const { selectedCars } = useComparison();
  const canClickRef = useRef(false);

  useEffect(() => {
    // Empêcher les clicks immédiats lors de l'apparition du bouton
    canClickRef.current = false;
    const timer = setTimeout(() => {
      canClickRef.current = true;
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCars.length]);

  if (selectedCars.length === 0) return null;

  const handleClick = () => {
    if (canClickRef.current) {
      onClick();
    }
  };

  return (
    <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] md:bottom-8 left-4 right-4 md:left-auto md:right-8 z-40 animate-scale-in">
      <Button
        onClick={handleClick}
        size="lg"
        className={cn(
          "group relative w-full md:w-auto min-h-12 h-auto md:h-14 py-3 px-3 md:px-6 shadow-xl hover:shadow-2xl touch-target touch-feedback",
          "bg-[#25D366] hover:bg-[#128C7E] text-white",
          "transition-all duration-300 md:hover:scale-105"
        )}
      >
        <MessageCircle className="mr-2 h-6 w-6 md:h-5 md:w-5" />
        <span className="font-semibold text-sm whitespace-normal md:whitespace-nowrap">Envoyer sur WhatsApp</span>
        <Badge
          variant="secondary"
          className={cn(
            "ml-2 h-7 w-7 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center",
            "bg-white text-[#128C7E] font-bold text-base md:text-sm",
            "animate-pulse"
          )}
        >
          {selectedCars.length}
        </Badge>
      </Button>
      <p className="sr-only md:not-sr-only md:text-center md:text-xs md:text-white md:bg-black/60 md:backdrop-blur-sm md:rounded-full md:px-3 md:py-1 md:mt-2">
        {selectedCars.length}/{MAX_COMPARISON} véhicule{selectedCars.length > 1 ? "s" : ""} sélectionné{selectedCars.length > 1 ? "s" : ""}
      </p>
    </div>
  );
}
