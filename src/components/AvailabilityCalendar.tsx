import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

interface AvailabilityCalendarProps {
  carName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectDates: (start: Date, end: Date) => void;
}

// Toutes les dates futures sont disponibles

const AvailabilityCalendar = ({ carName, isOpen, onClose, onSelectDates }: AvailabilityCalendarProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const today = new Date();
  const isMobile = useIsMobile();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Permettre toute sélection de date future
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
    if (startDate) {
      const finalEndDate = endDate ?? startDate;
      onSelectDates(startDate, finalEndDate);
      onClose();
    }
  };

  const modifiers = {
    selected: (date: Date) => {
      if (!startDate) return false;
      if (!endDate) return isSameDay(date, startDate);
      return date >= startDate && date <= endDate;
    }
  };

  const modifiersClassNames = {
    selected: "bg-primary text-primary-foreground hover:bg-primary"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-full max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-6rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Disponibilités - {carName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Calendrier */}
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < today}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              locale={fr}
              className="pointer-events-auto border rounded-lg p-4"
              numberOfMonths={isMobile ? 1 : 2}
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


          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!startDate}
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
