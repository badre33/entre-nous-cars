import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { analytics } from "@/utils/analytics";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openError, setOpenError] = useState('');

  const getDefaultMessage = (): string => "Bonjour Benatna, je souhaite préparer une location de voiture de tourisme à Casablanca, de trois jours minimum à six mois maximum.\n\nDates : \nModèle souhaité : \nPoint d’arrivée (gare ou aéroport desservi) : \n\nUne livraison à Rabat peut être demandée depuis Casablanca. Merci de confirmer la disponibilité, le tarif final et les conditions. La livraison est gratuite et convenue à l’avance.";

  const [message, setMessage] = useState(() => typeof window !== "undefined" ? getDefaultMessage() : "");
  const location = useLocation();
  const whatsappNumber = "212699024526";
  
  // Ne pas afficher sur les pages avec StickyCTA
  const hiddenRoutes = ['/louer', '/partenaires', '/auth', '/analytics', '/demandes'];
  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }
  
  const handleOpen = () => {
    if (isOpen) { setIsOpen(false); return; }
    setOpenError('');
    setIsOpen(true);
    analytics.trackChatOpened('whatsapp');
  };
  
  const openRequest = (value: string) => {
    const popup = window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(value)}`, '_blank');
    if (popup) { setIsOpen(false); setOpenError(''); }
    else setOpenError('Ouverture demandée. Si WhatsApp ne s’ouvre pas, autorisez les fenêtres puis réessayez. Aucun message n’a été confirmé.');
  };
  const sendMessage = () => { if (message.trim()) openRequest(message); };

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
                <p className="text-xs text-white/90">Préparez votre demande</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer la préparation WhatsApp"
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            {openError && <p role="alert" className="p-3">{openError}</p>}
            <div className="bg-[#E5DDD5] p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
              <button
                onClick={() => {
                  openRequest(getDefaultMessage());
                }}
                className="w-full bg-primary text-primary-foreground rounded-lg p-3 mb-3 shadow-sm text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                🚗 Demander un véhicule
              </button>
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
                aria-label="Message à préparer dans WhatsApp"
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                aria-label="Ouvrir WhatsApp avec ce message"
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
        aria-label={isOpen ? "Fermer le widget WhatsApp" : "Ouvrir le chat WhatsApp"}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isOpen ? (
          <X className="w-7 h-7 md:w-6 md:h-6" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7 md:w-6 md:h-6" />
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
