import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Check } from "lucide-react";
import { useSwipeToClose } from "@/hooks/useSwipeToClose";
import { cn } from "@/lib/utils";

interface CarPreviewDialogProps {
  car: {
    id: number;
    image: string;
    name: string;
    brand: string;
    type: string;
    category: string;
    city: string;
    priceDisplay: string;
    badges?: string[];
    conditions: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onShowAvailability: () => void;
  onWhatsAppClick: () => void;
}

export default function CarPreviewDialog({
  car,
  isOpen,
  onClose,
  onShowAvailability,
  onWhatsAppClick,
}: CarPreviewDialogProps) {
  const { dragOffset, isDragging, handlers } = useSwipeToClose({
    onClose,
    threshold: 100,
  });

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn("max-w-2xl", isDragging && "transition-none")}
        style={{ transform: `translateY(${Math.max(0, dragOffset)}px)` }}
      >
        <div 
          className="w-12 h-1 bg-muted rounded-full mx-auto mt-2 mb-4 cursor-grab active:cursor-grabbing touch-target"
          {...handlers}
        />
        <DialogHeader>
          <DialogTitle className="text-2xl">{car.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
            {car.badges && (
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {car.badges.map((badge, idx) => (
                  <Badge key={idx} className="text-xs">{badge}</Badge>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Marque</p>
              <p className="font-semibold">{car.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-semibold">{car.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Catégorie</p>
              <p className="font-semibold">{car.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ville</p>
              <p className="font-semibold">{car.city}</p>
            </div>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Prix</p>
            <p className="text-3xl font-bold text-primary">{car.priceDisplay}</p>
            <p className="text-xs text-muted-foreground">par jour</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Conditions</p>
            <div className="space-y-1">
              {car.conditions.map((condition, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" />
                  <span>{condition}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onShowAvailability}
            >
              <CalendarCheck className="w-4 h-4 mr-2" />
              Disponibilités
            </Button>
            <Button 
              className="flex-1"
              onClick={onWhatsAppClick}
            >
              Contacter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
