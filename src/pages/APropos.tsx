import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Zap, MapPin, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { HreflangTags } from "@/utils/hreflangHelper";
import aboutImage from "@/assets/about-mission.jpg";

const APropos = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>À Propos de Benatna | Location Voiture Maroc</title>
        <meta name="description" content="Découvrez Benatna : location de voiture simple et transparente au Maroc. Prix sans frais cachés, assistance 24/7. Réservez via WhatsApp." />
        <meta name="keywords" content="à propos benatna, mission benatna, valeurs location voiture, qui sommes nous, entreprise location maroc" />
        <link rel="canonical" href="https://benatna.ma/a-propos" />
        <meta property="og:title" content="À Propos de Benatna | Location Voiture Maroc" />
        <meta property="og:description" content="Découvrez Benatna : location de voiture simple et transparente au Maroc. Prix sans frais cachés." />
        <meta property="og:url" content="https://benatna.ma/a-propos" />
      </Helmet>
      <HreflangTags path="/a-propos" />
      <Header />
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--secondary-rgb),0.1),transparent_50%)]" />
        <div className="container relative text-center max-w-5xl px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 font-bold leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {t('about.title')}
            </span>
          </h1>
          <div className="prose prose-lg sm:prose-xl max-w-4xl mx-auto animate-fade-in [animation-delay:400ms]">
            {t('about.intro').split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="container px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {t('about.missionTitle')}
                </span>
              </h2>
              <div className="space-y-5">
                {t('about.missionText').split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/30 pl-4 py-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 relative group animate-fade-in [animation-delay:200ms]">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-3xl group-hover:blur-[4rem] transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border/50">
                <img 
                  src={aboutImage} 
                  alt={t('about.missionTitle')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl" />
        <div className="container relative max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-8 sm:space-y-10 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                {t('about.visionTitle')}
              </span>
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {t('about.visionText').split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-colors">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADN / Values */}
      <section className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container px-4 sm:px-6 relative">
          <div className="text-center space-y-6 sm:space-y-8 mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                {t('about.adnTitle')}
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('about.adnSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            <Card className="group relative border-2 border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden bg-gradient-to-br from-card via-primary/5 to-card animate-fade-in">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <CardContent className="relative pt-12 sm:pt-14 pb-10 sm:pb-12 text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{t('about.value1')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value1Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-secondary/20 hover:border-secondary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden bg-gradient-to-br from-card via-secondary/10 to-card animate-fade-in [animation-delay:200ms]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/30 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
              <CardContent className="relative pt-12 sm:pt-14 pb-10 sm:pb-12 text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-secondary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">{t('about.value2')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value2Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-accent/20 hover:border-accent transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden bg-gradient-to-br from-card via-accent/5 to-card animate-fade-in [animation-delay:400ms]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/30 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              <CardContent className="relative pt-12 sm:pt-14 pb-10 sm:pb-12 text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{t('about.value3')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value3Text')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="group relative border-2 border-primary/20 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-3xl overflow-hidden bg-gradient-to-br from-card via-primary/5 to-card animate-fade-in [animation-delay:600ms]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <CardContent className="relative pt-12 sm:pt-14 pb-10 sm:pb-12 text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{t('about.value4')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t('about.value4Text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Human Technology */}
      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.15),transparent_70%)]" />
        <div className="container relative max-w-5xl px-4 sm:px-6">
          <Card className="relative border-2 border-primary/30 hover:border-primary/50 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <CardContent className="relative p-10 sm:p-14 md:p-20 text-center space-y-8">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl animate-pulse">
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent leading-tight">
                {t('about.humanTechTitle')}
              </h2>
              <div className="space-y-6 max-w-3xl mx-auto">
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
