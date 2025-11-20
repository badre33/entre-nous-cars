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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in">
              {config.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:200ms]">
              {config.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Link to={config.cta.buttonLink}>
                <Button size="lg" className="text-lg px-8">
                  {config.cta.buttonText}
                </Button>
              </Link>
              <CallButton 
                size="lg"
                className="text-lg px-8"
              >
                Appeler
              </CallButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {config.content.intro}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-12 mb-16">
              {config.content.sections.map((section, index) => (
                <section key={index} className="scroll-mt-20">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            {/* FAQ Section */}
            {config.content.faq && config.content.faq.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Questions Fréquentes
                </h2>
                <div className="space-y-4">
                  {config.content.faq.map((faq, index) => (
                    <Card key={index} className="border-2">
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-3 flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground pl-7">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {config.cta.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {config.cta.subtitle}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to={config.cta.buttonLink}>
                    <Button size="lg" className="text-lg px-8">
                      {config.cta.buttonText}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <CallButton 
                    size="lg"
                    variant="outline"
                    className="text-lg px-8"
                  >
                    Contactez-nous
                  </CallButton>
                </div>
              </CardContent>
            </Card>

            {/* Related Services - Section prominent pour maillage interne SEO */}
            {config.relatedServices && config.relatedServices.length > 0 && (
              <section className="mt-16 mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    Services Connexes
                  </h2>
                  <p className="text-muted-foreground">
                    Découvrez nos autres services de location adaptés à vos besoins
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.relatedServices.map((service, index) => (
                    <Link key={index} to={service.link}>
                      <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105 h-full group">
                        <CardContent className="pt-6 pb-6">
                          <div className="flex items-start gap-3 mb-3">
                            <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform" />
                            <h3 className="font-semibold text-lg leading-tight">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {service.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Related Pages - Section secondaire */}
            {config.relatedPages && config.relatedPages.length > 0 && (
              <section className="mt-12">
                <h2 className="text-xl font-semibold mb-6">Pages Connexes</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {config.relatedPages.map((page, index) => (
                    <Link key={index} to={page.link}>
                      <Card className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <CardContent className="pt-6 flex items-center justify-between">
                          <span className="font-medium">{page.title}</span>
                          <ArrowRight className="h-5 w-5 text-primary" />
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
