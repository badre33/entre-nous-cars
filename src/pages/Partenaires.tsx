import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { TrendingUp, Eye, FileText, Zap, MessageCircle } from "lucide-react";
import { useState, useEffect, useRef, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PartnerTestimonials } from "@/components/PartnerTestimonials";
import { RevenueCalculator } from "@/components/RevenueCalculator";
import { StructuredData } from "@/components/StructuredData";
import { useLanguage, useTr } from "@/contexts/LanguageContext";
import { HreflangTags } from "@/utils/hreflangHelper";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { StickyCTA } from "@/components/StickyCTA";
import heroImage from "@/assets/hero-partners.jpg";
import { PHONE_COUNTRY_CODES } from "@/utils/bookingApi";
import { checkPartner, PARTNER_CITIES, type PartnerCheck, type RegisterPartnerResult, partnerPersistenceEnabled, partnerWhatsAppText, registerPartner } from "@/utils/partnerApi";

const PAGE_META: Record<string, { title: string; desc: string }> = {
  fr: {
    title: "Devenir Partenaire Benatna — Loueurs de voitures au Maroc",
    desc: "Rejoignez le réseau Benatna : visibilité nationale, demandes qualifiées de touristes et MRE, outil de gestion gratuit. Inscription en 2 minutes.",
  },
  en: {
    title: "Become a Benatna Partner — Car rental agencies in Morocco",
    desc: "Join the Benatna network: nationwide visibility, qualified requests from tourists and Moroccans abroad, free management tool. Sign up in 2 minutes.",
  },
  es: {
    title: "Sé Partner de Benatna — Agencias de alquiler en Marruecos",
    desc: "Únete a la red Benatna: visibilidad nacional, solicitudes cualificadas de turistas y marroquíes en el extranjero, herramienta de gestión gratuita.",
  },
};

const Partenaires = () => {
  const { t, language } = useLanguage();
  const tr = useTr();
  const pageMeta = PAGE_META[language] ?? PAGE_META.fr;
  const { toast } = useToast();
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const offersAnimation = useScrollAnimation(0.2);
  const howItWorksAnimation = useScrollAnimation(0.2);
  const testimonialsAnimation = useScrollAnimation(0.2);
  const calculatorAnimation = useScrollAnimation(0.2);
  
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mql.matches);
    const handleResize = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handleResize);

    let rafId: number | null = null;
    let isScrolling = false;
    const updateParallax = () => {
      if (mql.matches) {
        setParallaxOffset(window.scrollY * 0.5);
      }
      isScrolling = false;
    };
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(updateParallax);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      mql.removeEventListener('change', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  
  const [partnerDone, setPartnerDone] = useState(false);
  const [partnerError, setPartnerError] = useState('');
  const [partnerFallback, setPartnerFallback] = useState('');
  const partnerKey = useRef<string>(crypto.randomUUID());

  const openPartnerWhatsApp = (text: string) => {
    window.open(`https://wa.me/212699024526?text=${encodeURIComponent(text)}`, '_blank');
  };

  const submitPartner = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = new FormData(e.currentTarget);
    const text = (name: string) => String(values.get(name) ?? '');
    const city = text('ville') === 'Rabat' ? 'Rabat' : 'Casablanca';
    const input = {
      agencyName: text('agence'), city, countryCode: text('indicatif') || '+212', phone: text('tel'),
      email: text('email'), fleetSize: text('flotte'), message: text('message'), language,
      idempotencyKey: partnerKey.current,
    } as const;
    const checked = checkPartner(input);
    setPartnerFallback('');
    if (!checked.ok) {
      setPartnerError({
        agency: tr("Indiquez le nom de votre agence.", "Enter your agency name.", "Indica el nombre de tu agencia."),
        contact: tr("Indiquez un téléphone ou un e-mail.", "Enter a phone number or an email.", "Indica un teléfono o un e-mail."),
        phone: tr("Ce numéro de téléphone n'est pas valide.", "This phone number is not valid.", "Este número de teléfono no es válido."),
        email: tr("Cette adresse e-mail n'est pas valide.", "This email address is not valid.", "Esta dirección de e-mail no es válida."),
        fleet: tr("Le nombre de voitures doit être un nombre entier.", "The number of cars must be a whole number.", "El número de coches debe ser un número entero."),
      }[(checked as Extract<PartnerCheck, { ok: false }>).field]);
      return;
    }
    setPartnerError('');
    if (!partnerPersistenceEnabled()) { openPartnerWhatsApp(partnerWhatsAppText(input)); return; }
    setIsSubmitting(true);
    const result = await registerPartner(input);
    setIsSubmitting(false);
    if (result.ok) {
      partnerKey.current = crypto.randomUUID();
      setPartnerDone(true);
      return;
    }
    if ((result as Extract<RegisterPartnerResult, { ok: false }>).reason === 'rate_limited') {
      setPartnerError(tr("Plusieurs inscriptions ont déjà été reçues avec ce contact aujourd'hui. Nous revenons vers vous.", "Several registrations were already received with this contact today. We will get back to you.", "Ya recibimos varias inscripciones con este contacto hoy. Te contactaremos."));
      return;
    }
    setPartnerError(tr("L'inscription n'a pas pu être confirmée. Vous pouvez réessayer ou nous l'envoyer sur WhatsApp.", "Your registration could not be confirmed. You can try again or send it to us on WhatsApp.", "No se pudo confirmar tu inscripción. Puedes reintentar o enviárnosla por WhatsApp."));
    setPartnerFallback(partnerWhatsAppText(input));
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.desc} />
        <meta property="og:title" content={pageMeta.title} />
        <meta property="og:description" content={pageMeta.desc} />
        <meta name="keywords" content="partenaire location voiture maroc, agence location auto partenariat, devenir partenaire benatna, réseau location véhicule maroc" />
      </Helmet>
      <HreflangTags path="/partenaires" />
      <StructuredData type="partners" />
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[400px] sm:min-h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: isDesktop ? `translateY(${parallaxOffset}px)` : 'none'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="container relative z-10 text-center text-white px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
            {t('partners.heroTitle')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white/95 font-medium px-2 leading-relaxed">
            {t('partners.heroSubtitle')}
          </p>
          <Button size="lg" variant="partner" className="rounded-full text-sm sm:text-base lg:text-lg px-6 sm:px-8 h-11 sm:h-12" onClick={scrollToForm}>
            {t('partners.joinBenatna')}
          </Button>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div 
          ref={offersAnimation.ref}
          className="container px-4 sm:px-6"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-12 sm:mb-16 transition-all duration-700 px-4 ${
            offersAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>{t('partners.whatWeOffer')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
        <div className="container px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-12 sm:mb-16">{t('partners.howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
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
      <section className="py-12 sm:py-16 lg:py-20" ref={formRef}>
        <div className="container max-w-2xl px-4 sm:px-6">
          <Card className="border-2 rounded-2xl shadow-lg">
            <CardContent className="p-6 sm:p-8 md:p-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-3">{t('partners.joinForm')}</h2>
              <p className="text-center text-muted-foreground mb-6 sm:mb-8">
                {tr("Trois informations suffisent : votre agence, votre ville et un moyen de vous joindre. Nous vérifions votre agence (appel, registre de commerce, ICE) seulement quand une première demande vous est attribuée.",
                  "Three details are enough: your agency, your city and a way to reach you. We verify your agency (call, trade register, ICE) only when a first request is assigned to you.",
                  "Bastan tres datos: tu agencia, tu ciudad y una forma de contactarte. Verificamos tu agencia (llamada, registro mercantil, ICE) solo cuando se te asigna una primera solicitud.")}
              </p>
              {partnerDone ? (
                <div role="status" className="text-center space-y-3">
                  <p className="text-xl font-semibold">{tr("Inscription reçue, merci.", "Registration received, thank you.", "Inscripción recibida, gracias.")}</p>
                  <p className="text-muted-foreground">{tr("Nous vous contactons dès qu'une demande correspond à votre ville.", "We will contact you as soon as a request matches your city.", "Te contactaremos en cuanto una solicitud corresponda a tu ciudad.")}</p>
                </div>
              ) : (
              <form className="space-y-6" noValidate onSubmit={(e) => { void submitPartner(e); }}>
                <div>
                  <label htmlFor="partner-agency" className="block text-sm font-medium mb-2">{t('partners.agencyName')}</label>
                  <Input id="partner-agency" name="agence" maxLength={80} autoComplete="organization" placeholder={tr("Votre agence de location", "Your rental agency", "Tu agencia de alquiler")} className="rounded-lg" required />
                </div>
                <div>
                  <label htmlFor="partner-city" className="block text-sm font-medium mb-2">{tr("Ville", "City", "Ciudad")}</label>
                  <select id="partner-city" name="ville" defaultValue="Casablanca" className="w-full border border-input rounded-lg bg-white p-2 min-h-10">
                    {PARTNER_CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <fieldset className="space-y-4">
                  <legend className="text-sm font-medium">{tr("Pour vous joindre : téléphone ou e-mail (l'un des deux suffit)", "How to reach you: phone or email (either is enough)", "Para contactarte: teléfono o e-mail (basta con uno)")}</legend>
                  <div>
                    <label htmlFor="partner-phone" className="block text-sm mb-2">{t('partners.phone')}</label>
                    <div className="flex gap-2">
                      <select aria-label={tr("Indicatif", "Country code", "Prefijo")} name="indicatif" defaultValue="+212" className="border border-input rounded-lg bg-white p-2 min-h-10">
                        {PHONE_COUNTRY_CODES.map(code => <option key={code} value={code}>{code}</option>)}
                      </select>
                      <Input id="partner-phone" name="tel" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={40} placeholder="06 12 34 56 78" className="rounded-lg flex-1" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="partner-email" className="block text-sm mb-2">{t('partners.email')}</label>
                    <Input id="partner-email" name="email" type="email" autoComplete="email" maxLength={120} placeholder={tr("contact@votre-agence.ma", "contact@your-agency.ma", "contacto@tu-agencia.ma")} className="rounded-lg" />
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="partner-fleet" className="block text-sm font-medium mb-2">{tr("Nombre de voitures (facultatif)", "Number of cars (optional)", "Número de coches (opcional)")}</label>
                  <Input id="partner-fleet" name="flotte" type="number" inputMode="numeric" min={1} max={5000} className="rounded-lg" />
                </div>
                <div>
                  <label htmlFor="partner-message" className="block text-sm font-medium mb-2">{t('partners.message')}</label>
                  <Textarea id="partner-message" name="message" maxLength={1000}
                    placeholder={tr("Parlez-nous de votre agence…", "Tell us about your agency…", "Háblanos de tu agencia…")}
                    className="rounded-lg min-h-[120px]"
                  />
                </div>
                {partnerError && <p role="alert" className="text-sm font-medium text-destructive">{partnerError}</p>}
                {partnerFallback && (
                  <Button type="button" variant="outline" size="lg" className="w-full rounded-full" onClick={() => openPartnerWhatsApp(partnerFallback)}>
                    {t('partners.sendWhatsApp')}
                  </Button>
                )}
                <Button type="submit" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? tr("Envoi…", "Sending…", "Enviando…") : partnerPersistenceEnabled() ? tr("M'inscrire comme loueur partenaire", "Sign up as a partner agency", "Inscribirme como agencia asociada") : t('partners.sendWhatsApp')}
                </Button>
              </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      
      {/* Sticky "Rejoindre" CTA on Mobile */}
      <StickyCTA
        label={t('partners.joinBenatna')}
        onClick={scrollToForm}
        icon={MessageCircle}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/90"
      />
    </div>
  );
};

export default Partenaires;
