import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
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
    startDate: z.string().min(1, { message: t('common.startDate') }),
    endDate: z.string().min(1, { message: t('common.endDate') }),
  }).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: t('common.endDate'),
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
          title: "Erreur",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 max-w-4xl mx-auto mt-6 sm:mt-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* City Selection */}
        <div className="flex flex-col">
          <label htmlFor="city" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            {t('common.city')}
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-900 bg-white text-sm sm:text-base"
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
          <label htmlFor="startDate" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            {t('common.startDate')}
          </label>
          <div className="relative">
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={today}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-gray-900 bg-white [color-scheme:light] text-sm sm:text-base"
              required
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none hidden sm:block" />
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <label htmlFor="endDate" className="text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
            {t('common.endDate')}
          </label>
          <div className="relative">
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || today}
              className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all w-full text-gray-900 bg-white [color-scheme:light] text-sm sm:text-base"
              required
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none hidden sm:block" />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end sm:col-span-1">
          <Button 
            type="submit"
            size="lg" 
            className="w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold h-auto"
          >
            {t('common.search')}
          </Button>
        </div>
      </div>
    </form>
  );
};
