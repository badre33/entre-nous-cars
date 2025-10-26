import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Zap, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import aboutImage from "@/assets/about-mission.jpg";

const APropos = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8">{t('about.title')}</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-2">
            {t('about.intro')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">{t('about.missionTitle')}</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
              <img 
                src={aboutImage} 
                alt={t('about.missionTitle')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
        <div className="container max-w-4xl text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8">{t('about.visionTitle')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed px-2">
            {t('about.visionText')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-12 sm:mb-16">{t('about.valuesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center px-4">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 text-primary mx-auto" />
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-3 sm:mb-4">{t('about.value1')}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {t('about.value1Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center px-4">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 text-secondary mx-auto" />
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-3 sm:mb-4">{t('about.value2')}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {t('about.value2Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center px-4">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 text-accent mx-auto" />
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{t('about.value3')}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {t('about.value3Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-8 sm:pt-12 pb-6 sm:pb-8 text-center px-4">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 text-primary mx-auto" />
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-3 sm:mb-4">{t('about.value4')}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {t('about.value4Text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Benatna */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="container max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-6 sm:mb-8">{t('about.whyBenatnaTitle')}</h2>
          <p className="text-base sm:text-lg md:text-xl text-center text-muted-foreground leading-relaxed mb-8 sm:mb-12 px-2">
            {t('about.whyBenatnaText')}
          </p>
          
          <Card className="border-2 rounded-2xl bg-secondary/30">
            <CardContent className="p-6 sm:p-8 md:p-12 text-center">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-barlow font-semibold mb-3 sm:mb-4">
                {t('about.humanTechTitle')}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                {t('about.humanTechText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APropos;
