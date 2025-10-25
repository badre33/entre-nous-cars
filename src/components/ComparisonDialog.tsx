import { X, Scale, MapPin, Car, Gauge, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useComparison } from "@/contexts/ComparisonContext";

interface ComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComparisonDialog({
  open,
  onOpenChange,
}: ComparisonDialogProps) {
  const { selectedCars, removeFromComparison, clearComparison } = useComparison();

  if (selectedCars.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-background z-10 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Comparaison de véhicules</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedCars.length} véhicule{selectedCars.length > 1 ? "s" : ""} sélectionné{selectedCars.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearComparison}
              className="text-destructive hover:bg-destructive/10"
            >
              Tout effacer
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="relative border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-shadow duration-300"
              >
                {/* Remove button */}
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-3 right-3 z-10 h-8 w-8 p-0 rounded-full shadow-lg"
                  onClick={() => removeFromComparison(car.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Car Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  {car.badges && car.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {car.badges.map((badge, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-background/90 backdrop-blur-sm text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.brand}</p>
                  </div>

                  <Separator />

                  {/* Specs */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">{car.type}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Gauge className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Catégorie:</span>
                      <span className="font-medium">{car.category}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Ville:</span>
                      <span className="font-medium">{car.city}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Conditions */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Conditions</h4>
                    <div className="space-y-1.5">
                      {car.conditions.map((condition, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {car.priceDisplay}
                      </p>
                      <p className="text-xs text-muted-foreground">par jour</p>
                    </div>
                    <Button size="sm">
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
