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

  const searchSchema = z.object({
    city: z.string().min(1, { message: t('common.selectCity') }),
    startDate: z.string().min(1, { message: "Veuillez sélectionner une date de début" }),
    endDate: z.string().min(1, { message: "Veuillez sélectionner une date de fin" }),
  }).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      searchSchema.parse({ city, startDate, endDate });
      // Navigate to /louer with search params
      const params = new URLSearchParams({
        city,
        startDate,
        endDate,
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
      className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl mx-auto mt-6 sm:mt-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* City Selection */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {t('common.city')}
          </label>
          <select
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-gray-900 bg-white text-sm sm:text-base touch-target touch-feedback"
            autoComplete="address-level2"
            required
          >
            <option value="" className="text-gray-500">{t('common.selectCity')}</option>
            {cities.map((c) => (
              <option key={c} value={c} className="text-gray-900">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col">
          <label htmlFor="startDate" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {t('common.startDate')}
          </label>
          <div className="relative">
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="px-3 sm:px-4 py-2.5 sm:py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-sm sm:text-base touch-target touch-feedback"
              autoComplete="off"
              required
            />
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {t('common.endDate')}
          </label>
          <div className="relative">
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || tomorrow}
              className="px-3 sm:px-4 py-2.5 sm:py-3 min-h-[48px] border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all w-full text-gray-900 bg-white [color-scheme:light] text-sm sm:text-base touch-target touch-feedback"
              autoComplete="off"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end sm:col-span-1">
          <Button 
            type="submit"
            size="lg" 
            className="w-full py-2.5 sm:py-3 min-h-[48px] rounded-lg text-sm sm:text-base font-semibold h-auto touch-target touch-feedback"
          >
            <Search className="w-5 h-5 mr-2" />
            {t('common.search')}
          </Button>
        </div>
      </div>
    </form>
  );
};
