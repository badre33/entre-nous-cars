import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { HreflangTags } from "@/utils/hreflangHelper";
import { useState } from "react";
import { z } from "zod";

// Validation schema
const contactSchema = z.object({
  nom: z.string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  tel: z.string()
    .trim()
    .regex(/^(\+212|0)[5-7]\d{8}$/, { message: "Numéro de téléphone marocain invalide" }),
  email: z.string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  message: z.string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" })
});

const Contact = () => {

  // WORKAROUND react-helmet-async: force-set document.title, meta description,
  // canonical and OG tags via direct DOM API. Helmet leaks default values.
  useEffect(() => {
    document.title = "Contact Benatna - WhatsApp +212 699 024 526 | Location Voiture Maroc";
    const setMeta = (selector: string, attr: string, value: string, key: string, keyVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.includes('link') ? 'link' : 'meta');
        el.setAttribute(key, keyVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Contactez Benatna par WhatsApp +212 699 024 526, formulaire ou email. Service 7j/7. Location de voiture au Maroc dès 300 DH/jour.", 'name', 'description');
    setMeta('link[rel="canonical"]', 'href', "https://benatna.ma/contact", 'rel', 'canonical');
    setMeta('meta[property="og:title"]', 'content', "Contact Benatna - WhatsApp +212 699 024 526 | Location Voiture Maroc", 'property', 'og:title');
    setMeta('meta[property="og:description"]', 'content', "Contactez Benatna par WhatsApp +212 699 024 526, formulaire ou email. Service 7j/7. Location de voiture au Maroc dès 300 DH/jour.", 'property', 'og:description');
    setMeta('meta[property="og:url"]', 'content', "https://benatna.ma/contact", 'property', 'og:url');
  }, []);
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const heroAnimation = useScrollAnimation(0.2);
  const formAnimation = useScrollAnimation(0.2);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contactez-nous - Benatna | Location de Voiture au Maroc</title>
        <meta name="description" content="Contactez l'équipe Benatna pour toute question sur la location de voiture au Maroc. Support client disponible par téléphone, email ou formulaire en ligne." />
        <meta name="keywords" content="contact benatna, service client location voiture, aide location auto maroc, numéro téléphone benatna" />
        <link rel="canonical" href="https://benatna.ma/contact" />
        <meta property="og:title" content="Contactez-nous - Benatna" />
        <meta property="og:description" content="Notre équipe est à votre disposition pour toute question sur la location de voiture au Maroc." />
        <meta property="og:url" content="https://benatna.ma/contact" />
      </Helmet>
      <HreflangTags path="/contact" />
      <Header />
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div 
          ref={heroAnimation.ref}
          className={`container text-center max-w-4xl px-4 sm:px-6 transition-all duration-700 ${
            heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 animate-fade-in">{t('contact.title')}</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in [animation-delay:200ms] px-2">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container max-w-6xl px-4 sm:px-6">
          <div 
            ref={formAnimation.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 transition-all duration-700 ${
              formAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Form */}
            <Card className="border-2 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">{t('contact.title')}</h2>
                <p className="text-muted-foreground text-sm sm:text-base mb-4 sm:mb-6 text-center">
                  {t('contactForm.fillForm')}
                </p>
                <form 
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      nom: formData.get('nom') as string,
                      tel: formData.get('tel') as string,
                      email: formData.get('email') as string,
                      message: formData.get('message') as string,
                    };
                    
                    // Validate with zod
                    try {
                      contactSchema.parse(data);
                      
                      const whatsappMessage = `Nouveau message de contact\n\nNom: ${data.nom}\nTéléphone: ${data.tel}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
                      
                      toast({
                        title: "✓ Message envoyé !",
                        description: "Nous vous répondrons dans les plus brefs délais",
                      });
                      
                      // Capture form ref BEFORE setTimeout to avoid TypeError:
                      // e.currentTarget becomes null after React pools the event.
                      const formEl = e.currentTarget;
                      setTimeout(() => {
                        setIsSubmitting(false);
                        window.open(
                          `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`,
                          '_blank'
                        );
                        // Reset form (guarded — formEl might be detached if user navigated away)
                        if (formEl && typeof formEl.reset === 'function') {
                          formEl.reset();
                        }
                      }, 1000);
                    } catch (error) {
                      setIsSubmitting(false);
                      if (error instanceof z.ZodError) {
                        toast({
                          title: "Erreur de validation",
                          description: error.errors[0].message,
                          variant: "destructive",
                        });
                      }
                    }
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                    <Input 
                      name="nom" 
                      type="text"
                      placeholder={t('contactForm.namePlaceholder')} 
                      className="rounded-lg min-h-[48px] text-base touch-target" 
                      autoComplete="name"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contactForm.phoneLabel')}</label>
                    <Input 
                      name="tel" 
                      type="tel" 
                      placeholder="+212 6XX XXX XXX" 
                      className="rounded-lg min-h-[48px] text-base touch-target" 
                      autoComplete="tel"
                      inputMode="tel"
                      pattern="(\+212|0)[5-7]\d{8}"
                      required 
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format: +212 6XX XXX XXX ou 06XX XXX XXX</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                    <Input 
                      name="email" 
                      type="email" 
                      placeholder={t('contactForm.emailPlaceholder')} 
                      className="rounded-lg min-h-[48px] text-base touch-target" 
                      autoComplete="email"
                      inputMode="email"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contactForm.messageLabel')}</label>
                    <Textarea 
                      name="message"
                      placeholder={t('contactForm.messagePlaceholder')} 
                      className="rounded-lg min-h-[160px] text-base"
                      maxLength={1000}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Maximum 1000 caractères</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full rounded-full text-lg min-h-[56px] hover:scale-105 transition-transform duration-300 touch-target touch-feedback"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi..." : t('contactForm.sendWhatsApp')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-2 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-barlow font-semibold mb-2">{t('contactForm.whatsAppPhone')}</h3>
                      <p className="text-muted-foreground mb-2">
                        {t('contactForm.contactDirectly')}
                      </p>
                      <a 
                        href={`https://wa.me/${BUSINESS_INFO.whatsapp}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-barlow font-semibold mb-2">{t('contactForm.emailLabel')}</h3>
                      <p className="text-muted-foreground mb-2">
                        {t('contactForm.emailText')}
                      </p>
                      <a 
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="text-lg font-medium text-secondary hover:text-secondary/80 transition-colors"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-barlow font-semibold mb-4">{t('contactForm.openingHours')}</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{t('contactForm.mondayToSaturday')}</p>
                    <p>{t('contactForm.sunday')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
