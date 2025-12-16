import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, MessageCircle } from "lucide-react";

interface HeroWhatsAppCTAProps {
  heroImageUrl: string;
  onWhatsAppClick: () => void;
}

const HeroWhatsAppCTA = ({ heroImageUrl, onWhatsAppClick }: HeroWhatsAppCTAProps) => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      <img 
        src={heroImageUrl} 
        alt="Location de voiture au Maroc"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="container relative z-10 text-center text-white px-4 py-8">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Agences vérifiées</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Prix transparents</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-sm font-medium">Support WhatsApp 7j/7</span>
          </div>
        </div>
        
        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in max-w-4xl mx-auto">
          Louez une voiture au Maroc
          <span className="block text-primary mt-2">en quelques minutes, sans stress.</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] leading-relaxed">
          Disponible à Casablanca, Rabat, Marrakech & aéroports.
          <span className="block mt-1">Service simple, rapide et humain – même depuis l'étranger.</span>
        </p>
        
        {/* PRIMARY CTA */}
        <div className="animate-fade-in [animation-delay:400ms]">
          <Button 
            onClick={onWhatsAppClick}
            size="lg"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6 h-auto rounded-full shadow-2xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Louer maintenant sur WhatsApp
          </Button>
          <p className="text-white/70 text-sm mt-4">Réponse rapide • Pas de paiement en ligne</p>
        </div>
      </div>
    </section>
  );
};

export default HeroWhatsAppCTA;
