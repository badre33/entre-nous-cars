import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search, Clock } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
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

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Générer les options de dates (30 prochains jours)
  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(Date.now() + i * 86400000);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
      });
    }
    return dates;
  };

  // Générer les options d'heures
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        times.push({ value: `${hour}:${minute}`, label: `${hour}:${minute}` });
      }
    }
    return times;
  };

  const dateOptions = generateDateOptions();
  const timeOptions = generateTimeOptions();

  return (
    <div className="w-full px-4">
      <form 
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-5 w-full max-w-md mx-auto lg:max-w-4xl"
      >
        {/* Mobile: Selects personnalisés */}
        <div className="flex flex-col gap-4 lg:hidden">
          {/* Ville */}
          <div className="w-full space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-4 h-4" />
              Ville
            </Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Sélectionnez une ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date de début */}
          <div className="w-full space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4" />
              Date de début
            </Label>
            <Select value={startDate} onValueChange={setStartDate}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Sélectionnez une date" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date.value} value={date.value}>{date.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Heure de début */}
          <div className="w-full space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4" />
              Heure de début
            </Label>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Sélectionnez une heure" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>{time.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date de fin */}
          <div className="w-full space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-4 h-4" />
              Date de fin
            </Label>
            <Select value={endDate} onValueChange={setEndDate}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Sélectionnez une date" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map((date) => (
                  <SelectItem key={date.value} value={date.value}>{date.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Heure de fin */}
          <div className="w-full space-y-2">
            <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Clock className="w-4 h-4" />
              Heure de fin
            </Label>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Sélectionnez une heure" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>{time.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bouton recherche mobile */}
          <Button 
            type="submit" 
            size="lg"
            className="w-full h-14 text-lg font-semibold mt-2"
          >
            <Search className="w-5 h-5 mr-2" />
            Rechercher
          </Button>
        </div>

        {/* Desktop: Grid horizontal avec inputs natifs */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-3 items-end">;
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
                className="w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
                required
              />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
                required
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
                className="w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
                required
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2.5 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
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