import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { analytics } from "@/utils/analytics";

const WhatsAppButton = () => {
  const location = useLocation();
  const whatsappNumber = "212699024526";
  
  // Hide on pages with their own sticky CTA
  const hiddenRoutes = ['/louer', '/partenaires', '/'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  
  // Generate context-aware pre-filled message
  const getMessage = () => {
    const path = location.pathname;
    
    if (path.includes('casablanca')) {
      if (path.includes('aeroport')) {
        return "Bonjour, j'arrive à l'aéroport de Casablanca et je souhaite louer une voiture du [date] au [date].";
      }
      return "Bonjour, je souhaite louer une voiture à Casablanca du [date] au [date].";
    }
    if (path.includes('rabat')) {
      if (path.includes('aeroport')) {
        return "Bonjour, j'arrive à l'aéroport de Rabat et je souhaite louer une voiture du [date] au [date].";
      }
      return "Bonjour, je souhaite louer une voiture à Rabat du [date] au [date].";
    }
    if (path.includes('marrakech')) {
      if (path.includes('aeroport')) {
        return "Bonjour, j'arrive à l'aéroport de Marrakech et je souhaite louer une voiture du [date] au [date].";
      }
      return "Bonjour, je souhaite louer une voiture à Marrakech du [date] au [date].";
    }
    if (path.includes('can-2025')) {
      return "Bonjour, je souhaite louer une voiture pour la CAN 2025 au Maroc du [date] au [date].";
    }
    if (path.includes('agadir')) {
      return "Bonjour, je souhaite louer une voiture à Agadir du [date] au [date].";
    }
    if (path.includes('tanger')) {
      return "Bonjour, je souhaite louer une voiture à Tanger du [date] au [date].";
    }
    if (path.includes('fes')) {
      return "Bonjour, je souhaite louer une voiture à Fès du [date] au [date].";
    }
    
    return "Bonjour, je souhaite louer une voiture au Maroc du [date] au [date].";
  };
  
  const handleClick = () => {
    analytics.trackEvent('whatsapp_click', { page: location.pathname });
    const message = getMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
