import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Zap, MapPin, Sparkles } from "lucide-react";
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
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-background" />
        <div className="container relative text-center max-w-5xl px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t('about.title')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 font-bold leading-tight">
            {t('about.title')}
          </h1>
          <div className="prose prose-lg sm:prose-xl max-w-4xl mx-auto">
            {t('about.intro').split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/5">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('about.missionTitle')}
              </h2>
              <div className="space-y-4">
                {t('about.missionText').split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-300" />
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutImage} 
                  alt={t('about.missionTitle')}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/10" />
        <div className="container relative max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mx-auto">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('about.visionTitle')}
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {t('about.visionText').split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADN / Values */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-background to-primary/5">
        <div className="container px-4 sm:px-6">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">ADN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('about.adnTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              {t('about.adnSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <Card className="group relative border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl overflow-hidden bg-gradient-to-br from-card to-primary/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              <CardContent className="relative pt-10 sm:pt-12 pb-8 sm:pb-10 text-center px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.value1')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value1Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl overflow-hidden bg-gradient-to-br from-card to-secondary/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all" />
              <CardContent className="relative pt-10 sm:pt-12 pb-8 sm:pb-10 text-center px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-secondary/10 group-hover:bg-secondary/20 transition-all">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-secondary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.value2')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value2Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl overflow-hidden bg-gradient-to-br from-card to-accent/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
              <CardContent className="relative pt-10 sm:pt-12 pb-8 sm:pb-10 text-center px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-all">
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.value3')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value3Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-3xl overflow-hidden bg-gradient-to-br from-card to-primary/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
              <CardContent className="relative pt-10 sm:pt-12 pb-8 sm:pb-10 text-center px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                  <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('about.value4')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value4Text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Human Technology */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container relative max-w-5xl px-4 sm:px-6">
          <Card className="relative border-2 border-primary/20 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent" />
            <CardContent className="relative p-8 sm:p-12 md:p-16 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl bg-primary/10">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                {t('about.humanTechTitle')}
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {t('about.humanTechText').split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default APropos;
