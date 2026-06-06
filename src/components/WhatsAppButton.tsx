import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { analytics } from "@/utils/analytics";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Compute contextual default message based on current page
  const getDefaultMessage = (): string => {
    const path = window.location.pathname.toLowerCase();
    // City + airport pages
    if (path.includes("aeroport-casablanca")) return "Bonjour, je souhaite louer une voiture à l'aéroport Mohammed V Casablanca (CMN). Pouvez-vous me proposer les véhicules disponibles ?";
    if (path.includes("aeroport-marrakech")) return "Bonjour, je souhaite louer une voiture à l'aéroport Marrakech-Menara (RAK). Pouvez-vous me proposer les véhicules disponibles ?";
    if (path.includes("aeroport-rabat")) return "Bonjour, je souhaite louer une voiture à l'aéroport Rabat-Salé (RBA). Pouvez-vous me proposer les véhicules disponibles ?";
    if (path.includes("aeroport-tanger")) return "Bonjour, je souhaite louer une voiture à l'aéroport Tanger Ibn Battouta (TNG). Pouvez-vous me proposer les véhicules disponibles ?";
    if (path.includes("aeroport-agadir")) return "Bonjour, je souhaite louer une voiture à l'aéroport Agadir Al-Massira (AGA). Pouvez-vous me proposer les véhicules disponibles ?";
    if (path.includes("aeroport-fes")) return "Bonjour, je souhaite louer une voiture à l'aéroport Fès-Saïss (FEZ). Pouvez-vous me proposer les véhicules disponibles ?";
    // Strategic pages
    if (path.includes("tanger-med-port")) return "Bonjour, j'arrive au port Tanger Med en ferry. Je souhaite louer une voiture à la livraison. Pouvez-vous m'envoyer les véhicules disponibles ?";
    if (path.includes("mre-maroc")) return "Bonjour, je suis MRE et je rentre au Maroc. Je souhaite louer une voiture sans carte de crédit internationale. Quels sont les véhicules disponibles et les modalités de paiement ?";
    if (path.includes("coupe-monde-2026")) return "Bonjour, je rentre au Maroc pour la Coupe du Monde 2026 (groupe Maroc). Je cherche une voiture pour la période juin-juillet. Pouvez-vous me proposer ?";
    if (path.includes("ete-2026")) return "Bonjour, je prépare mon été 2026 au Maroc et souhaite réserver une voiture en avance. Pouvez-vous me proposer les véhicules et tarifs ?";
    if (path.includes("circuit-villes-imperiales")) return "Bonjour, je prépare un circuit des villes impériales (Casa-Rabat-Meknès-Fès-Marrakech). Pouvez-vous me conseiller un véhicule adapté ?";
    if (path.includes("gare-casa-voyageurs")) return "Bonjour, j'arrive à la gare Casa-Voyageurs par train Al Boraq. Je souhaite récupérer une voiture sur place. Quels véhicules sont disponibles ?";
    if (path.includes("gare-marrakech")) return "Bonjour, j'arrive à la gare ONCF Marrakech par train. Je souhaite récupérer une voiture sur place. Quels véhicules sont disponibles ?";
    if (path.includes("agdal-rabat")) return "Bonjour, je souhaite une location de voiture corporate à Agdal Rabat. Livraison à mon hôtel/bureau possible ?";
    if (path.includes("souissi-rabat")) return "Bonjour, je souhaite louer une voiture à Souissi Rabat (livraison villa/école possible). Quels véhicules disponibles ?";
    if (path.includes("sans-carte-credit")) return "Bonjour, je souhaite louer une voiture sans carte de crédit (paiement espèces/virement). Pouvez-vous me confirmer les modalités ?";
    if (path.includes("prix-location-voiture-maroc-2026")) return "Bonjour, j'ai vu votre grille tarifaire 2026. Pouvez-vous me confirmer le tarif et la disponibilité pour mes dates ?";
    if (path.includes("longue-duree")) return "Bonjour, je cherche une location longue durée (1+ mois). Pouvez-vous me proposer un devis mensuel ?";
    if (path.includes("jeune-conducteur")) return "Bonjour, je suis jeune conducteur (moins de 25 ans). Quels véhicules et conditions me proposez-vous ?";
    if (path.includes("mariage")) return "Bonjour, je prépare un mariage et cherche une voiture de luxe pour le jour J. Pouvez-vous me proposer ?";
    // City pages (generic)
    const cityMatch = path.match(/location-voiture-(casablanca|marrakech|rabat|tanger|agadir|fes)/);
    if (cityMatch) return `Bonjour, je souhaite louer une voiture à ${cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1)}. Pouvez-vous me proposer les véhicules disponibles ?`;
    // /louer
    if (path === "/louer" || path.startsWith("/louer/")) return "Bonjour, je consulte votre catalogue de véhicules. Pouvez-vous me confirmer la disponibilité et un devis ?";
    // Default
    return "Bonjour, je souhaite louer une voiture au Maroc. Pouvez-vous me proposer les véhicules et tarifs ?";
  };

  const [message, setMessage] = useState(() => typeof window !== "undefined" ? getDefaultMessage() : "");
  const location = useLocation();
  const whatsappNumber = "212699024526";
  
  // Ne pas afficher sur les pages avec StickyCTA
  const hiddenRoutes = ['/louer', '/partenaires'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  
  const handleOpen = () => {
    setIsOpen(true);
    analytics.trackChatOpened('whatsapp');
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      analytics.trackEvent('whatsapp_message_sent', { message_length: message.length });
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-[208px] md:bottom-24 left-4 right-4 md:left-6 md:right-auto md:w-[350px] z-50 shadow-2xl animate-scale-in">
          <CardHeader className="bg-[#25D366] text-white p-4 rounded-t-lg flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="font-semibold">Benatna</h3>
                <p className="text-xs text-white/90">En ligne</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-[#E5DDD5] p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
              <div className="bg-white rounded-lg p-3 shadow-sm mb-3 max-w-[85%]">
                <p className="text-sm">
                  Bonjour ! 👋
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%]">
                <p className="text-sm">
                  Comment pouvons-nous vous aider aujourd'hui ?
                </p>
              </div>
            </div>
            <div className="p-4 bg-white border-t flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                className="bg-[#25D366] hover:bg-[#128C7E]"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button - Optimized for mobile touch */}
      <button
        onClick={handleOpen}
        className="fixed bottom-[144px] md:bottom-24 right-4 md:right-auto md:left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] active:bg-[#0d6e57] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group touch-target touch-feedback w-[64px] h-[64px] md:w-[56px] md:h-[56px] flex items-center justify-center"
        aria-label="Ouvrir le chat WhatsApp"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isOpen ? (
          <X className="w-7 h-7 md:w-6 md:h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 md:w-6 md:h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              1
            </span>
          </>
        )}
        {!isOpen && (
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Besoin d'aide ? Discutons !
          </span>
        )}
      </button>
    </>
  );
};

export default WhatsAppButton;
