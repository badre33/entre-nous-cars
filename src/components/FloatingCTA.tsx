import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const FloatingCTA = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 left-4 sm:left-24 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <Link to="/louer">
        <Button
          size="lg"
          className="rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-base"
        >
          <Car className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">{t('common.rent')}</span>
          <span className="sm:hidden">{t('common.rent')}</span>
        </Button>
      </Link>
    </div>
  );
};
