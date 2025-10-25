import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, addDays, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvailabilityCalendarProps {
  carName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (start: Date, end: Date) => void;
}

// Simuler les disponibilités (dans un vrai projet, cela viendrait d'une API)
const getAvailabilityForDate = (date: Date): 'available' | 'limited' | 'unavailable' => {
  const day = date.getDate();
  const month = date.getMonth();
  
  // Simulation : certains jours sont indisponibles ou limités
  if (day % 7 === 0) return 'unavailable';
  if (day % 5 === 0) return 'limited';
  return 'available';
};

const AvailabilityCalendar = ({ carName, isOpen, onClose, onSelectDates }: AvailabilityCalendarProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const today = new Date();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const availability = getAvailabilityForDate(date);
    if (availability === 'unavailable') return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onSelectDates(startDate, endDate);
      onClose();
    }
  };

  const getAlternativeDates = () => {
    const alternatives: Date[] = [];
    let checkDate = addDays(today, 1);
    let found = 0;

    while (found < 3) {
      if (getAvailabilityForDate(checkDate) === 'available') {
        alternatives.push(checkDate);
        found++;
      }
      checkDate = addDays(checkDate, 1);
    }

    return alternatives;
  };

  const modifiers = {
    available: (date: Date) => getAvailabilityForDate(date) === 'available' && date >= today,
    limited: (date: Date) => getAvailabilityForDate(date) === 'limited' && date >= today,
    unavailable: (date: Date) => getAvailabilityForDate(date) === 'unavailable' || date < today,
    selected: (date: Date) => {
      if (!startDate) return false;
      if (!endDate) return isSameDay(date, startDate);
      return date >= startDate && date <= endDate;
    }
  };

  const modifiersClassNames = {
    available: "bg-secondary/20 hover:bg-secondary/40 text-foreground",
    limited: "bg-accent/30 hover:bg-accent/50 text-foreground",
    unavailable: "bg-destructive/20 text-muted-foreground line-through cursor-not-allowed hover:bg-destructive/20",
    selected: "bg-primary text-primary-foreground hover:bg-primary"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Disponibilités - {carName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Légende */}
          <div className="flex flex-wrap gap-4 justify-center p-4 bg-secondary/10 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-secondary/40 rounded" />
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent/50 rounded" />
              <span className="text-sm">Peu disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive/30 rounded" />
              <span className="text-sm">Indisponible</span>
            </div>
          </div>

          {/* Calendrier */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleDateSelect}
              disabled={(date) => getAvailabilityForDate(date) === 'unavailable' || date < today}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              locale={fr}
              className="pointer-events-auto border rounded-lg p-4"
              numberOfMonths={2}
            />
          </div>

          {/* Dates sélectionnées */}
          {startDate && (
            <div className="p-4 bg-primary/10 rounded-lg space-y-2">
              <p className="font-medium">Dates sélectionnées :</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span className="font-semibold">{format(startDate, "dd MMM yyyy", { locale: fr })}</span>
                </div>
                {endDate && (
                  <>
                    <span>→</span>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="font-semibold">{format(endDate, "dd MMM yyyy", { locale: fr })}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Suggestions de dates alternatives */}
          {!startDate && (
            <div className="p-4 bg-secondary/10 rounded-lg space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">Dates disponibles à venir :</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getAlternativeDates().map((date, idx) => (
                  <Badge 
                    key={idx}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleDateSelect(date)}
                  >
                    {format(date, "dd MMM yyyy", { locale: fr })}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!startDate || !endDate}
              className="rounded-full"
            >
              Confirmer les dates
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityCalendar;
