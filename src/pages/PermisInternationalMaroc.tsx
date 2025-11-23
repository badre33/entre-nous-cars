import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Globe, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const PermisInternationalMaroc = () => {
  const faqs = [
    {
      question: "Le permis de conduire international est-il obligatoire au Maroc ?",
      answer: "Le permis international n'est PAS obligatoire pour tous. Si vous avez un permis européen (France, Belgique, Suisse, etc.), vous pouvez conduire directement au Maroc avec votre permis national. Pour les permis USA, Canada, et la plupart des pays hors UE, le permis international est fortement recommandé voire obligatoire selon les loueurs. Il s'agit d'une traduction officielle de votre permis national."
    },
    {
      question: "Comment obtenir un permis de conduire international ?",
      answer: "La procédure varie selon votre pays : En France : demande en ligne sur le site ANTS (permisdeconduire.ants.gouv.fr), gratuit, délai 2-4 semaines. En Belgique : via votre commune, environ 20€, délivrance immédiate. Au Canada : via CAA/AAA, environ 25 CAD, photo requise. Aux USA : via AAA, environ 20 USD. Le permis international est valable 3 ans et ne remplace pas votre permis national."
    },
    {
      question: "Puis-je louer une voiture au Maroc avec un permis américain sans permis international ?",
      answer: "Techniquement, le permis américain seul n'est pas suffisant selon la loi marocaine. Cependant, certains loueurs l'acceptent à leurs risques. Chez Benatna, nous recommandons FORTEMENT le permis international pour les conducteurs américains. En cas de contrôle de police, vous risquez une amende sans permis international. Pour éviter tout problème, obtenez votre permis international via AAA avant votre voyage."
    },
    {
      question: "Quelle est la durée de validité du permis international au Maroc ?",
      answer: "Le permis de conduire international est valable 3 ans à partir de sa date de délivrance, ou jusqu'à l'expiration de votre permis national si celle-ci intervient avant. Au Maroc, vous pouvez l'utiliser pendant toute sa durée de validité. IMPORTANT : vous devez TOUJOURS avoir votre permis national original avec vous, le permis international seul n'est pas valable."
    },
    {
      question: "Que faire si mon permis international a expiré pendant mon séjour au Maroc ?",
      answer: "Si votre permis international expire pendant votre location au Maroc, vous devez impérativement : 1) Contacter votre ambassade ou consulat pour savoir s'ils peuvent émettre un nouveau permis, 2) Si vous avez un permis européen, continuer avec votre permis national uniquement (accepté). Si vous avez un permis hors-UE et pas de permis international valide, vous ne pourrez légalement plus conduire. Prévoyez toujours une marge de sécurité sur la validité."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Permis International Location Maroc - Guide Complet | Benatna</title>
        <meta name="description" content="Permis de conduire international au Maroc : obligatoire ou pas ? Comment l'obtenir ? Quels pays concernés ? Guide complet pour louer votre voiture en toute légalité." />
        <meta name="keywords" content="permis international maroc, permis conduire international location, idp morocco, permis européen maroc, permis américain maroc" />
      </Helmet>

      <CanonicalTag path="/permis-international-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Permis International Location Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Permis de Conduire International au Maroc : Guide Complet",
            "description": "Tout savoir sur le permis international pour conduire au Maroc : quels pays concernés, comment l'obtenir, validité.",
            "author": {
              "@type": "Organization",
              "name": "Benatna"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Benatna",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.benatna.com/logo-benatna.png"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Guide", href: "/faq" },
            { label: "Permis International", href: "/permis-international-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Guide Permis International</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Permis International Location Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Obligatoire ou Pas ? Comment l'Obtenir ?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/documents-necessaires-location-maroc">Voir Tous Documents</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">3 ans</div>
                  <div className="text-sm text-muted-foreground">Validité</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">150+</div>
                  <div className="text-sm text-muted-foreground">Pays Acceptés</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">UE OK</div>
                  <div className="text-sm text-muted-foreground">Sans IDP</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">Gratuit</div>
                  <div className="text-sm text-muted-foreground">En France</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Do I Need International Permit Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Ai-je Besoin d'un Permis International au Maroc ?
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="p-6 border-2 border-primary">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    ✅ Permis National Suffisant
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Vous pouvez conduire au Maroc avec votre permis national uniquement si vous êtes ressortissant de :
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Union Européenne :</strong> France, Belgique, Allemagne, Italie, Espagne, Portugal, Pays-Bas, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>EEE :</strong> Norvège, Islande, Liechtenstein</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Suisse</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Royaume-Uni</strong> (permis britannique accepté)</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-2 border-destructive/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-destructive" />
                    ⚠️ Permis International Requis
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Le permis international est <strong>obligatoire ou fortement recommandé</strong> pour :
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>États-Unis & Canada</strong> (fortement recommandé)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>Asie :</strong> Chine, Japon, Inde, Corée, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>Amérique Latine :</strong> Brésil, Argentine, Mexique, etc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>Océanie :</strong> Australie, Nouvelle-Zélande</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      <span><strong>Moyen-Orient :</strong> Émirats, Arabie Saoudite, etc.</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">💡 Notre Recommandation</h3>
                <p className="text-muted-foreground">
                  Même si vous avez un permis européen, nous vous recommandons d'obtenir un permis international 
                  si vous comptez voyager dans des zones reculées du Maroc ou si vous souhaitez avoir une traduction 
                  officielle de votre permis en cas de contrôle de police. C'est gratuit dans la plupart des pays 
                  européens et cela vous évitera tout malentendu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get International Permit Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Comment Obtenir un Permis International ?
              </h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">🇫🇷 France</h3>
                      <p className="text-muted-foreground mb-4">
                        Demande en ligne gratuite via le site officiel ANTS.
                      </p>
                      <div className="bg-card/50 p-4 rounded-lg mb-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Site :</strong> permisdeconduire.ants.gouv.fr</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Prix :</strong> Gratuit</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Délai :</strong> 2 à 4 semaines (envoi postal)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Documents requis :</strong> Copie CNI, permis, justificatif domicile, photo d'identité</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">🇧🇪 Belgique</h3>
                      <p className="text-muted-foreground mb-4">
                        Demande via votre commune avec délivrance immédiate.
                      </p>
                      <div className="bg-card/50 p-4 rounded-lg mb-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Lieu :</strong> Maison communale</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Prix :</strong> Environ 20€</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Délai :</strong> Immédiat (même jour)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Documents requis :</strong> Carte d'identité, permis de conduire, photo d'identité récente</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">🇺🇸 États-Unis</h3>
                      <p className="text-muted-foreground mb-4">
                        Demande via AAA (American Automobile Association).
                      </p>
                      <div className="bg-card/50 p-4 rounded-lg mb-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Lieu :</strong> Bureaux AAA ou en ligne (aaa.com)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Prix :</strong> 20 USD</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Délai :</strong> Immédiat en agence, ou 2-3 semaines en ligne</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Documents requis :</strong> Permis valide, 2 photos passeport format</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">🇨🇦 Canada</h3>
                      <p className="text-muted-foreground mb-4">
                        Demande via CAA (Canadian Automobile Association).
                      </p>
                      <div className="bg-card/50 p-4 rounded-lg mb-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Lieu :</strong> Bureaux CAA</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Prix :</strong> 25 CAD</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Délai :</strong> Immédiat en agence</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Documents requis :</strong> Permis canadien, 2 photos format passeport</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <FileText className="w-12 h-12 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">🇨🇭 Suisse</h3>
                      <p className="text-muted-foreground mb-4">
                        Demande via TCS (Touring Club Suisse) ou ACS.
                      </p>
                      <div className="bg-card/50 p-4 rounded-lg mb-3">
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Lieu :</strong> Bureaux TCS ou communes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Prix :</strong> 15-20 CHF</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Délai :</strong> Immédiat</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span><strong>Documents requis :</strong> Permis suisse, photo identité</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Questions Fréquentes - Permis International
              </h2>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-bold mb-3 flex items-start gap-2">
                      <span className="text-primary">Q:</span>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground pl-6">
                      <strong className="text-primary">R:</strong> {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/20 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Permis Prêt ? Réservez Votre Voiture !
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Avec votre permis international ou européen, réservez dès maintenant 
                et explorez le Maroc en toute liberté.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Ma Voiture</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/documents-necessaires-location-maroc">Voir Tous Documents</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PermisInternationalMaroc;