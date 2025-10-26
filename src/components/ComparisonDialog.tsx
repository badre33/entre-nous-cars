import { X, Scale, MapPin, Car, Gauge, Check, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useComparison } from "@/contexts/ComparisonContext";
import { toast } from "@/hooks/use-toast";

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

  const handleGroupRequest = () => {
    const vehiclesList = selectedCars.map(car => `${car.name} - ${car.city}`).join('\n');
    const message = `Bonjour, je souhaite une demande groupée pour les véhicules suivants :\n\n${vehiclesList}\n\nPouvez-vous me communiquer les disponibilités et tarifs ?`;
    const whatsappUrl = `https://wa.me/212699024526?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Demande envoyée",
      description: "Votre demande groupée a été envoyée via WhatsApp.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-background/95 backdrop-blur-lg z-10 border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">Comparaison de véhicules</DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedCars.length} véhicule{selectedCars.length > 1 ? "s" : ""} sélectionné{selectedCars.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleGroupRequest}
                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Demande groupée
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearComparison}
                className="text-destructive hover:bg-destructive/10"
              >
                Tout effacer
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Card View for Mobile */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedCars.map((car) => (
              <div
                key={car.id}
                className="relative border rounded-xl overflow-hidden bg-card hover:shadow-xl transition-all duration-300"
              >
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-3 right-3 z-10 h-8 w-8 p-0 rounded-full shadow-lg"
                  onClick={() => removeFromComparison(car.id)}
                >
                  <X className="h-4 w-4" />
                </Button>

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

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">{car.name}</h3>
                    <p className="text-sm text-muted-foreground">{car.brand}</p>
                  </div>

                  <Separator />

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

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Conditions</h4>
                    <div className="space-y-1.5">
                      {car.conditions.slice(0, 3).map((condition, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {car.priceDisplay}
                      </p>
                      <p className="text-xs text-muted-foreground">par jour</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="rounded-xl border bg-card shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[200px] font-bold">Caractéristiques</TableHead>
                    {selectedCars.map((car) => (
                      <TableHead key={car.id} className="text-center min-w-[250px]">
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative w-full h-32 rounded-lg overflow-hidden">
                            <img
                              src={car.image}
                              alt={car.name}
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
                              onClick={() => removeFromComparison(car.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-base">{car.name}</p>
                            <p className="text-xs text-muted-foreground">{car.brand}</p>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" />
                        Type
                      </div>
                    </TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-center">{car.type}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Gauge className="h-4 w-4 text-primary" />
                        Catégorie
                      </div>
                    </TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-center">{car.category}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        Ville
                      </div>
                    </TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-center">
                        <Badge variant="outline">{car.city}</Badge>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30">Prix / jour</TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-center">
                        <p className="text-xl font-bold text-primary">{car.priceDisplay}</p>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30">Badges</TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-center">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {car.badges && car.badges.length > 0 ? (
                            car.badges.map((badge, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-muted/30 align-top">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        Conditions
                      </div>
                    </TableCell>
                    {selectedCars.map((car) => (
                      <TableCell key={car.id} className="text-left align-top">
                        <div className="space-y-1">
                          {car.conditions.slice(0, 4).map((condition, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs">
                              <Check className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{condition}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">Intéressé par ces véhicules ?</p>
                <p className="text-sm text-muted-foreground">
                  Envoyez une demande groupée pour tous les véhicules sélectionnés
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleGroupRequest}
                className="bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary hover:to-secondary/90 shadow-lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer la demande groupée
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
