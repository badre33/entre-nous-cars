import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface HeroWhatsAppCTAProps {
  heroImageUrl: string;
  onWhatsAppClick: () => void;
}

const HeroWhatsAppCTA = ({ heroImageUrl, onWhatsAppClick }: HeroWhatsAppCTAProps) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-[85vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Solid background color shows instantly for fast FCP/LCP perception */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]" />
      
      {/* Hero image optimized for LCP - loads over the placeholder */}
      <img 
        src={heroImageUrl} 
        alt="Location de voiture au Maroc - Benatna"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={1920}
        height={1080}
        sizes="100vw"
        srcSet={`${heroImageUrl} 1920w`}
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      
      <div className="container relative z-10 text-center text-white px-4 py-8">
        {/* Trust badges - no animation for faster LCP */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">{t("homepage.trustBadgeVerified")}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">{t("homepage.trustBadgeTransparent")}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-sm font-medium">{t("homepage.trustBadgeWhatsApp")}</span>
          </div>
        </div>
        
        {/* Main headline - LCP critical, no animation delay */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight max-w-4xl mx-auto">
          {t("homepage.heroTitle")}
          <span className="block text-primary mt-2">{t("homepage.heroTitleHighlight")}</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t("homepage.heroSubtitle")}
          <span className="block mt-1">{t("homepage.heroSubtitle2")}</span>
        </p>
        
        {/* PRIMARY CTA */}
        <div>
          <Button 
            onClick={onWhatsAppClick}
            size="lg"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg px-8 py-6 h-auto rounded-full shadow-2xl hover:shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 font-semibold"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            {t("homepage.heroCTA")}
          </Button>
          <p className="text-white/70 text-sm mt-4">{t("homepage.heroNote")}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroWhatsAppCTA;
