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
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-8">{t('about.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('about.intro')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl mb-6">{t('about.missionTitle')}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
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
      <section className="py-20 bg-secondary/20">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl mb-8">{t('about.visionTitle')}</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('about.visionText')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">{t('about.valuesTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Heart className="w-12 h-12 mb-6 text-primary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('about.value1')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('about.value1Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Shield className="w-12 h-12 mb-6 text-secondary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('about.value2')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('about.value2Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Zap className="w-12 h-12 mb-6 text-accent mx-auto" />
                <h3 className="text-xl font-semibold mb-4">{t('about.value3')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('about.value3Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <MapPin className="w-12 h-12 mb-6 text-primary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('about.value4')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('about.value4Text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Benatna */}
      <section className="py-20 bg-card">
        <div className="container max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-center mb-8">{t('about.whyBenatnaTitle')}</h2>
          <p className="text-xl text-center text-muted-foreground leading-relaxed mb-12">
            {t('about.whyBenatnaText')}
          </p>
          
          <Card className="border-2 rounded-2xl bg-secondary/30">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-barlow font-semibold mb-4">
                {t('about.humanTechTitle')}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
