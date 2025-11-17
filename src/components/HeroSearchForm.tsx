import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 max-w-4xl mx-auto w-full"
    >
      {/* Mobile: Stack vertical complet */}
      <div className="flex flex-col gap-4 lg:hidden">
        {/* Ville */}
        <div className="w-full">
          <label htmlFor="city-mobile" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Ville</span>
          </label>
          <select
            id="city-mobile"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
            style={{ fontSize: '16px' }}
            required
          >
            <option value="">Sélectionnez une ville</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Date de début */}
        <div className="w-full">
          <label htmlFor="start-date-mobile" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Date de début</span>
          </label>
          <input
            type="date"
            id="start-date-mobile"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
            style={{ fontSize: '16px' }}
            required
          />
        </div>

        {/* Heure de début */}
        <div className="w-full">
          <label htmlFor="start-time-mobile" className="block text-sm font-semibold text-gray-700 mb-2">
            Heure de début
          </label>
          <input
            type="time"
            id="start-time-mobile"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
            style={{ fontSize: '16px' }}
            required
          />
        </div>

        {/* Date de fin */}
        <div className="w-full">
          <label htmlFor="end-date-mobile" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Date de fin</span>
          </label>
          <input
            type="date"
            id="end-date-mobile"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || tomorrow}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
            style={{ fontSize: '16px' }}
            required
          />
        </div>

        {/* Heure de fin */}
        <div className="w-full">
          <label htmlFor="end-time-mobile" className="block text-sm font-semibold text-gray-700 mb-2">
            Heure de fin
          </label>
          <input
            type="time"
            id="end-time-mobile"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900"
            style={{ fontSize: '16px' }}
            required
          />
        </div>

        {/* Bouton recherche mobile */}
        <Button 
          type="submit" 
          size="lg"
          className="w-full py-6 text-lg font-semibold"
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher
        </Button>
      </div>

      {/* Desktop: Grid horizontal */}
      <div className="hidden lg:grid lg:grid-cols-7 gap-3 items-end">
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
  );
};