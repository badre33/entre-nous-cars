import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { LongTailPageConfig } from "@/data/longTailPages";
import { StructuredData } from "@/components/StructuredData";
import { StickyProgress } from "@/components/StickyProgress";

interface LongTailPageProps {
  config: LongTailPageConfig;
}

/**
 * Composant réutilisable pour toutes les landing pages SEO longue traîne
 * Optimisé pour la conversion et le référencement
 */
export const LongTailPage = ({ config }: LongTailPageProps) => {
  // Construire le breadcrumb enrichi
  const breadcrumbItems = [];
  
  // Ajouter "Services" comme niveau intermédiaire
  breadcrumbItems.push({
    label: "Nos Services",
    href: "/nos-services"
  });
  
  // Ajouter la catégorie si elle existe
  if (config.category) {
    breadcrumbItems.push({
      label: config.category.label,
      href: config.category.href
    });
  }
  
  // Ajouter la page actuelle (sans href car c'est la page courante)
  breadcrumbItems.push({
    label: config.title
  });

  // Préparer les sections pour la navigation sticky
  const sections = config.content.sections.map((section, index) => ({
    id: `section-${index}`,
    title: section.title
  }));

  // Ajouter la section FAQ si elle existe
  if (config.content.faq && config.content.faq.length > 0) {
    sections.push({
      id: "faq-section",
      title: "Questions Fréquentes"
    });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={config.keywords} />
        <link rel="canonical" href={`https://benatna.ma/${config.slug}`} />
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:url" content={`https://benatna.ma/${config.slug}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <StructuredData type="rental" />
      
      <Header />
      <BreadcrumbsEnriched items={breadcrumbItems} />
      <StickyProgress sections={sections} />

      {/* Hero Section - optimisé mobile */}
      <section className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-12 md:py-16 lg:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              {config.h1}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 animate-fade-in [animation-delay:200ms] leading-relaxed">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Link to={config.cta.buttonLink} className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 min-h-[48px] md:min-h-[44px] touch-target">
                  {config.cta.buttonText}
                </Button>
              </Link>
              <CallButton 
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 min-h-[48px] md:min-h-[44px] touch-target"
              >
                Appeler
              </CallButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - optimisé mobile */}
      <main className="flex-1 py-8 md:py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-sm md:prose-lg max-w-none mb-8 md:mb-12">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {config.content.intro}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 md:space-y-12 mb-12 md:mb-16">
              {config.content.sections.map((section, index) => (
                <section key={index} id={`section-${index}`} className="scroll-mt-24">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm md:prose-lg max-w-none text-muted-foreground">
                    <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {section.content}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            {/* FAQ Section - optimisé mobile */}
            {config.content.faq && config.content.faq.length > 0 && (
              <section id="faq-section" className="mb-12 md:mb-16 scroll-mt-24">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 text-center">
                  Questions Fréquentes
                </h2>
                <div className="space-y-3 md:space-y-4">
                  {config.content.faq.map((faq, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                        <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                          <span className="leading-tight">{faq.question}</span>
                        </h3>
                        <p className="text-muted-foreground pl-6 md:pl-7 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section - optimisé mobile */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-8 md:pt-12 pb-8 md:pb-12 text-center px-4 md:px-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                  {config.cta.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  {config.cta.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
                  <Link to={config.cta.buttonLink} className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 min-h-[48px] md:min-h-[44px] touch-target">
                      {config.cta.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </Link>
                  <CallButton 
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 min-h-[48px] md:min-h-[44px] touch-target"
                  >
                    Contactez-nous
                  </CallButton>
                </div>
              </CardContent>
            </Card>

            {/* Related Services - optimisé mobile */}
            {config.relatedServices && config.relatedServices.length > 0 && (
              <section className="mt-12 md:mt-16 mb-8 md:mb-12">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 leading-tight">
                    Services Connexes
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base">
                    Découvrez nos autres services de location adaptés à vos besoins
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {config.relatedServices.map((service, index) => (
                    <Link key={index} to={service.link}>
                      <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full group touch-target">
                        <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                          <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5 md:mt-1 group-hover:translate-x-1 transition-transform" />
                            <h3 className="font-semibold text-base md:text-lg leading-tight">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 pl-6 md:pl-8">
                            {service.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Pages - optimisé mobile */}
            {config.relatedPages && config.relatedPages.length > 0 && (
              <section className="mt-8 md:mt-12">
                <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Pages Connexes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {config.relatedPages.map((page, index) => (
                    <Link key={index} to={page.link}>
                      <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 touch-target">
                        <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6 flex items-center justify-between">
                          <span className="font-medium text-sm md:text-base">{page.title}</span>
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
