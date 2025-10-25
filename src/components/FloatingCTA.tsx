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
      className={`fixed bottom-6 left-6 z-40 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <Link to="/louer">
        <Button
          size="lg"
          className="rounded-full shadow-2xl px-6 py-6 text-base font-semibold hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Car className="w-5 h-5" />
          {t('common.bookNow')}
        </Button>
      </Link>
    </div>
  );
};
