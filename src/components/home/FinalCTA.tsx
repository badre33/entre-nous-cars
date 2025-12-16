import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface FinalCTAProps {
  onWhatsAppClick: () => void;
}

const FinalCTA = ({ onWhatsAppClick }: FinalCTAProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80">
      <div className="container px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Prêt à réserver votre voiture ?
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          Vérifiez la disponibilité en quelques secondes sur WhatsApp. Réponse rapide garantie.
        </p>
        <Button 
          onClick={onWhatsAppClick}
          size="lg"
          className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
        >
          <MessageCircle className="w-6 h-6 mr-3" />
          Vérifier la disponibilité sur WhatsApp
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
