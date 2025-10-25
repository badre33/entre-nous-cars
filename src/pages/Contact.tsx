import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-8">{t('contact.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="border-2 rounded-2xl shadow-lg">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl mb-8">{t('contact.title')}</h2>
                <p className="text-muted-foreground mb-6 text-center">
                  {t('contactForm.fillForm')}
                </p>
                <form 
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const nom = formData.get('nom') as string;
                    const tel = formData.get('tel') as string;
                    const email = formData.get('email') as string;
                    const message = formData.get('message') as string;
                    
                    const whatsappMessage = `Nouveau message de contact\n\nNom: ${nom}\nTéléphone: ${tel}\nEmail: ${email}\n\nMessage:\n${message}`;
                    
                    window.open(
                      `https://wa.me/212699024526?text=${encodeURIComponent(whatsappMessage)}`,
                      '_blank'
                    );
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                    <Input name="nom" placeholder="Votre nom" className="rounded-lg" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contactForm.phoneLabel')}</label>
                    <Input name="tel" type="tel" placeholder={t('contactForm.phonePlaceholder')} className="rounded-lg" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                    <Input name="email" type="email" placeholder="votre@email.com" className="rounded-lg" required />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea 
                      name="message"
                      placeholder="Comment pouvons-nous vous aider ?" 
                      className="rounded-lg min-h-[160px]"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full rounded-full">
                    {t('contactForm.sendWhatsApp')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-2 rounded-2xl hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-barlow font-semibold mb-2">{t('contactForm.whatsAppPhone')}</h3>
                      <p className="text-muted-foreground mb-2">
                        {t('contactForm.contactDirectly')}
                      </p>
                      <p className="text-lg font-medium text-foreground">+212 699 024 526</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-barlow font-semibold mb-2">{t('contactForm.emailLabel')}</h3>
                      <p className="text-muted-foreground mb-2">
                        {t('contactForm.emailText')}
                      </p>
                      <p className="text-lg font-medium text-foreground">contact@benatna.ma</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
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
