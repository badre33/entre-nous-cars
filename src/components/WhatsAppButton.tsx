import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { analytics } from "@/utils/analytics";
import { WHATSAPP_NUMBER, generateSimpleMessage } from "@/utils/whatsapp";

const WhatsAppButton = () => {
  const location = useLocation();
  
  // Hide on pages with their own sticky CTA
  const hiddenRoutes = ['/louer', '/partenaires', '/'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  
  // Extract city from URL path
  const getCityFromPath = (): string | undefined => {
    const path = location.pathname.toLowerCase();
    
    const cityMappings: Record<string, string> = {
      'casablanca': 'Casablanca',
      'rabat': 'Rabat', 
      'marrakech': 'Marrakech',
      'agadir': 'Agadir',
      'tanger': 'Tanger',
      'fes': 'Fès',
    };
    
    for (const [key, value] of Object.entries(cityMappings)) {
      if (path.includes(key)) {
        // Check if it's an airport
        if (path.includes('aeroport')) {
          return `Aéroport ${value}`;
        }
        return value;
      }
    }
    
    // Special cases
    if (path.includes('can-2025')) {
      return 'CAN 2025 Maroc';
    }
    
    return undefined;
  };
  
  const handleClick = () => {
    analytics.trackEvent('whatsapp_click', { page: location.pathname });
    const city = getCityFromPath();
    const message = generateSimpleMessage(city);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-4 z-50 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#0d6e57] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 w-14 h-14 flex items-center justify-center"
      aria-label="Contacter sur WhatsApp"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
    </button>
  );
};

export default WhatsAppButton;
