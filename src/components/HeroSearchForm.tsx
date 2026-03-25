import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search, Clock, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cities = ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir", "Fès"];

export const HeroSearchForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");

  const searchSchema = z.object({
    city: z.string().min(1, { message: t('common.selectCity') }),
    startDate: z.string().min(1, { message: "Veuillez sélectionner une date de début" }),
    endDate: z.string().min(1, { message: "Veuillez sélectionner une date de fin" }),
    startTime: z.string().min(1, { message: "Veuillez sélectionner une heure de début" }),
    endTime: z.string().min(1, { message: "Veuillez sélectionner une heure de fin" }),
  }).refine((data) => {
    const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
    const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
    return endDateTime > startDateTime;
  }, {
    message: "La date et l'heure de fin doivent être après la date et l'heure de début",
    path: ["endDate"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      searchSchema.parse({ city, startDate, endDate, startTime, endTime });
      const params = new URLSearchParams({
        city,
        startDate,
        endDate,
        startTime,
        endTime,
      });
      navigate(`/louer?${params.toString()}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  // Quick access - go directly to /louer
  const handleQuickAccess = () => {
    navigate('/louer');
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Générer les options de dates (30 prochains jours)
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(Date.now() + i * 86400000);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
      });
    }
    return dates;
  };

  // Générer les options d'heures simplifiées
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 7; h < 22; h++) {
      const hour = h.toString().padStart(2, '0');
      times.push({ value: `${hour}:00`, label: `${hour}:00` });
    }
    return times;
  };

  const dateOptions = generateDateOptions();
  const timeOptions = generateTimeOptions();

  return (
    <div className="w-full px-2 sm:px-4">
      {/* Mobile: Formulaire simplifié et compact */}
      <div className="lg:hidden">
        <form 
          onSubmit={handleSearch}
          className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl p-4 w-full max-w-sm mx-auto"
        >
          {/* Ville - Full width */}
          <div className="mb-3">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full h-14 text-base font-medium border-2 border-border/50 focus:border-primary touch-feedback rounded-xl">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <SelectValue placeholder="Où voulez-vous louer ?" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c} className="text-base py-3">{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date début - combiné sur une ligne */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Début</Label>
              <Select value={startDate} onValueChange={setStartDate}>
                <SelectTrigger className="w-full h-12 text-sm border-2 border-border/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <SelectValue placeholder="Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {dateOptions.map((date) => (
                    <SelectItem key={date.value} value={date.value} className="text-sm py-2">{date.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Heure</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger className="w-full h-12 text-sm border-2 border-border/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <SelectValue placeholder="Heure" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-sm py-2">{time.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date fin - combiné sur une ligne */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Fin</Label>
              <Select value={endDate} onValueChange={setEndDate}>
                <SelectTrigger className="w-full h-12 text-sm border-2 border-border/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <SelectValue placeholder="Date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {dateOptions.map((date) => (
                    <SelectItem key={date.value} value={date.value} className="text-sm py-2">{date.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Heure</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger className="w-full h-12 text-sm border-2 border-border/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <SelectValue placeholder="Heure" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((time) => (
                    <SelectItem key={time.value} value={time.value} className="text-sm py-2">{time.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bouton recherche mobile - prominent */}
          <Button 
            type="submit" 
            size="lg"
            className="w-full h-14 text-lg font-bold touch-feedback rounded-xl shadow-lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </Button>
        </form>

        {/* Quick access button - prominent CTA below form */}
        <button
          type="button"
          onClick={handleQuickAccess}
          className="w-full max-w-sm mx-auto mt-3 flex items-center justify-center gap-2 text-white/90 hover:text-white py-2 font-medium transition-colors touch-feedback"
        >
          <span>Voir tous les véhicules</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Desktop: Grid horizontal avec inputs natifs */}
      <form 
        onSubmit={handleSearch}
        className="hidden lg:block bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-full max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-7 gap-3 items-end">
          {/* Ville */}
          <div className="col-span-1">
            <label htmlFor="city-desktop" className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{t('common.city')}</span>
            </label>
            <select
              id="city-desktop"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
              required
            >
              <option value="">Ville</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date début */}
          <div className="col-span-2">
            <label htmlFor="start-date-desktop" className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Début</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                id="start-date-desktop"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
                className="w-full px-2 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 text-sm"
                required
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-2 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 text-sm"
                required
                aria-label="Heure de début"
              />
            </div>
          </div>

          {/* Date fin */}
          <div className="col-span-2">
            <label htmlFor="end-date-desktop" className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Fin</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                id="end-date-desktop"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || tomorrow}
                className="w-full px-2 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 text-sm"
                required
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-2 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* Bouton recherche desktop */}
          <div className="col-span-2">
            <Button 
              type="submit" 
              size="lg"
              className="w-full"
            >
              <Search className="w-5 h-5 mr-2" />
              Rechercher
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
