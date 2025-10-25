import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { TrendingUp, Eye, FileText, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PartnerTestimonials } from "@/components/PartnerTestimonials";
import { RevenueCalculator } from "@/components/RevenueCalculator";
import { StructuredData } from "@/components/StructuredData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-partners.jpg";

const Partenaires = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const offersAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const testimonialsAnimation = useScrollAnimation(0.2);
  const calculatorAnimation = useScrollAnimation(0.2);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setParallaxOffset(offset * 0.5);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Devenir Partenaire Benatna - Agence de Location de Voiture au Maroc</title>
        <meta name="description" content="Rejoignez le réseau Benatna et boostez votre activité de location de voitures au Maroc. Visibilité nationale, réservations en ligne, outil de gestion gratuit." />
        <meta name="keywords" content="partenaire location voiture maroc, agence location auto partenariat, devenir partenaire benatna, réseau location véhicule maroc" />
        <link rel="canonical" href="https://benatna.ma/partenaires" />
      </Helmet>
      <StructuredData type="partners" />
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section with Parallax */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl mb-6 text-white drop-shadow-lg">
            {t('partners.heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/95 font-medium">
            {t('partners.heroSubtitle')}
          </p>
          <Button size="lg" variant="partner" className="rounded-full text-lg px-8" onClick={scrollToForm}>
            {t('partners.joinBenatna')}
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div 
          ref={offersAnimation.ref}
          className="container"
        >
          <h2 className={`text-4xl md:text-5xl text-center mb-16 transition-all duration-700 ${
            offersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>{t('partners.whatWeOffer')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:shadow-2xl transition-all duration-500 rounded-2xl hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="pt-12 pb-8 text-center">
                <TrendingUp className="w-12 h-12 mb-6 text-primary mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('partners.bookingsTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('partners.bookingsText')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Eye className="w-12 h-12 mb-6 text-secondary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('partners.visibilityTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('partners.visibilityText')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <FileText className="w-12 h-12 mb-6 text-accent mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('partners.imageTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('partners.imageText')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:shadow-lg transition-shadow rounded-2xl">
              <CardContent className="pt-12 pb-8 text-center">
                <Zap className="w-12 h-12 mb-6 text-primary mx-auto" />
                <h3 className="text-xl font-barlow font-semibold mb-4">{t('partners.processTitle')}</h3>
                <p className="text-muted-foreground text-sm">
                  {t('partners.processText')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-4xl md:text-5xl text-center mb-16">{t('partners.howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-barlow font-semibold mb-4">{t('partners.step1')}</h3>
              <p className="text-muted-foreground">
                {t('partners.step1Text')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-barlow font-semibold mb-4">{t('partners.step2')}</h3>
              <p className="text-muted-foreground">
                {t('partners.step2Text')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-barlow font-semibold mb-4">{t('partners.step3')}</h3>
              <p className="text-muted-foreground">
                {t('partners.step3Text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Testimonials */}
      <PartnerTestimonials />

      {/* Revenue Calculator */}
      <RevenueCalculator />

      {/* Join Form */}
      <section className="py-20" ref={formRef}>
        <div className="container max-w-2xl">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl text-center mb-8">{t('partners.joinForm')}</h2>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const agence = formData.get('agence') as string;
                  const villes = formData.get('villes') as string;
                  const flotte = formData.get('flotte') as string;
                  const tel = formData.get('tel') as string;
                  const email = formData.get('email') as string;
                  const message = formData.get('message') as string;
                  
                  let whatsappMessage = `Nouvelle candidature partenaire\n\nNom de l'agence: ${agence}\nVille(s): ${villes}\nTaille de la flotte: ${flotte} véhicules\nTéléphone: ${tel}\nEmail: ${email}`;
                  
                  if (message) {
                    whatsappMessage += `\n\nMessage:\n${message}`;
                  }
                  
                  window.open(
                    `https://wa.me/212699024526?text=${encodeURIComponent(whatsappMessage)}`,
                    '_blank'
                  );
                }}
              >
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.agencyName')}</label>
                  <Input name="agence" placeholder="Votre agence de location" className="rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.cities')}</label>
                  <Input name="villes" placeholder="Casablanca, Marrakech..." className="rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.fleetSize')}</label>
                  <Input name="flotte" type="number" placeholder="Nombre de véhicules" className="rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.phone')}</label>
                  <Input name="tel" type="tel" placeholder="+212 ..." className="rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.email')}</label>
                  <Input name="email" type="email" placeholder="contact@votre-agence.ma" className="rounded-lg" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('partners.message')}</label>
                  <Textarea 
                    name="message"
                    placeholder="Parlez-nous de votre agence..." 
                    className="rounded-lg min-h-[120px]"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full rounded-full">
                  {t('partners.sendWhatsApp')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partenaires;
