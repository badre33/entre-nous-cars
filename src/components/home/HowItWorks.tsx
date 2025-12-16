import { MapPin, MessageCircle, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Comment ça marche ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary/30 mb-2">01</div>
            <h3 className="font-semibold text-lg mb-2">Choisissez votre ville & dates</h3>
            <p className="text-muted-foreground text-sm">Casablanca, Rabat, Marrakech ou directement à l'aéroport</p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <div className="text-4xl font-bold text-primary/30 mb-2">02</div>
            <h3 className="font-semibold text-lg mb-2">Contactez-nous sur WhatsApp</h3>
            <p className="text-muted-foreground text-sm">Réponse rapide, conseils personnalisés, sans engagement</p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-4xl font-bold text-primary/30 mb-2">03</div>
            <h3 className="font-semibold text-lg mb-2">Récupérez votre voiture</h3>
            <p className="text-muted-foreground text-sm">Véhicule prêt à votre arrivée, livraison possible</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
