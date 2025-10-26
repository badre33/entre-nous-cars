import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useComparison } from "@/contexts/ComparisonContext";
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
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 animate-scale-in">
      <Button
        onClick={handleClick}
        size="lg"
        className={cn(
          "group relative h-16 md:h-14 px-6 shadow-xl hover:shadow-2xl touch-target touch-feedback",
          "bg-gradient-to-r from-primary to-primary/80",
          "hover:from-primary hover:to-primary/90",
          "transition-all duration-300 hover:scale-105 min-w-[160px] md:min-w-0"
        )}
      >
        <Scale className="mr-2 h-6 w-6 md:h-5 md:w-5 transition-transform group-hover:rotate-12" />
        <span className="font-semibold text-base md:text-sm">Comparer</span>
        <Badge
          variant="secondary"
          className={cn(
            "ml-2 h-7 w-7 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center",
            "bg-white text-primary font-bold text-base md:text-sm",
            "animate-pulse"
          )}
        >
          {selectedCars.length}
        </Badge>
      </Button>
    </div>
  );
}
