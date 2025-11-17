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
      // Navigate to /louer with search params
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
      className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-5 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3">
        {/* City Selection */}
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <label htmlFor="city" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{t('common.city')}</span>
            <span className="sm:hidden">Ville</span>
          </label>
          <select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-2 sm:px-3 py-3 sm:py-2.5 min-h-[48px] border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 bg-white text-base sm:text-sm touch-target touch-feedback cursor-pointer"
            autoComplete="address-level2"
            required
          >
            <option value="" className="text-gray-500">Ville</option>
            {cities.map((c) => (
              <option key={c} value={c} className="text-gray-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{t('common.startDate')}</span>
            <span className="sm:hidden">Début</span>
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={today}
            className="px-2 sm:px-3 py-3 sm:py-2.5 min-h-[48px] border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-base sm:text-sm touch-target touch-feedback cursor-pointer"
            autoComplete="off"
            required
          />
        </div>

        {/* Start Time */}
        <div className="flex flex-col">
          <label htmlFor="startTime" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Heure</span>
            <span className="sm:hidden">H</span>
          </label>
          <input
            id="startTime"
            name="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="px-2 sm:px-3 py-3 sm:py-2.5 min-h-[48px] border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-base sm:text-sm touch-target touch-feedback cursor-pointer"
            required
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{t('common.endDate')}</span>
            <span className="sm:hidden">Fin</span>
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || tomorrow}
            className="px-2 sm:px-3 py-3 sm:py-2.5 min-h-[48px] border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-base sm:text-sm touch-target touch-feedback cursor-pointer"
            autoComplete="off"
            required
          />
        </div>

        {/* End Time */}
        <div className="flex flex-col">
          <label htmlFor="endTime" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Heure</span>
            <span className="sm:hidden">H</span>
          </label>
          <input
            id="endTime"
            name="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="px-2 sm:px-3 py-3 sm:py-2.5 min-h-[48px] border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-base sm:text-sm touch-target touch-feedback cursor-pointer"
            required
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end col-span-2 sm:col-span-3 lg:col-span-1">
          <Button 
            type="submit"
            size="lg" 
            className="w-full py-3 sm:py-2.5 min-h-[48px] rounded-lg text-base sm:text-sm font-semibold h-auto touch-target touch-feedback"
          >
            <Search className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">{t('common.search')}</span>
            <span className="sm:hidden">Rechercher</span>
          </Button>
        </div>
      </div>
    </form>
  );
};
