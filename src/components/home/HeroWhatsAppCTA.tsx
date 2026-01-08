import { Shield, CheckCircle, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { RentalRequestForm } from "@/components/RentalRequestForm";

interface HeroWhatsAppCTAProps {
  onWhatsAppClick: () => void;
}

// Mobile-optimized hero image path - using compressed version for better LCP
const heroImageMobile = "/hero-home-mobile-optimized.webp";
const heroImageDesktop = "/hero-home-new.webp";

const HeroWhatsAppCTA = ({ onWhatsAppClick }: HeroWhatsAppCTAProps) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
      {/* Solid background color shows instantly for fast FCP/LCP perception */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#2d2d2d]" />
      
      {/* Hero image optimized for LCP - uses ONLY optimized versions */}
      <img 
        src={heroImageMobile} 
        alt="Location de voiture au Maroc - Benatna"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        width={768}
        height={432}
        sizes="(max-width: 768px) 100vw, 1920px"
        srcSet={`${heroImageMobile} 768w, ${heroImageDesktop} 1920w`}
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
        
        {/* Rental Request Form */}
        <RentalRequestForm />
      </div>
    </section>
  );
};

export default HeroWhatsAppCTA;
