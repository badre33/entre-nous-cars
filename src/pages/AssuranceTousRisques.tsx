import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Shield, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { ServiceSchema } from "@/components/ServiceSchema";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const AssuranceTousRisques = () => {
  const faqs = [
    {
      question: "Quelle est la différence entre assurance de base et tous risques ?",
      answer: "L'assurance de base (CDW) couvre les dommages au véhicule mais avec une franchise importante (3000-8000 DH). L'assurance tous risques élimine cette franchise et ajoute des garanties supplémentaires : vol, incendie, bris de glace, dommages aux pneus, et protection du conducteur. Vous êtes ainsi couvert à 100% sans aucune participation financière en cas de sinistre."
    },
    {
      question: "L'assurance tous risques couvre-t-elle les dommages causés aux tiers ?",
      answer: "Oui, notre assurance tous risques inclut automatiquement la responsabilité civile (RC) qui couvre les dommages matériels et corporels causés aux tiers lors d'un accident dont vous seriez responsable. Cette garantie est obligatoire au Maroc et couvre jusqu'à 50 millions de DH de dommages aux tiers."
    },
    {
      question: "Suis-je couvert en cas de vol du véhicule avec assurance tous risques ?",
      answer: "Oui, notre assurance tous risques inclut une protection complète contre le vol du véhicule et de ses équipements, sans franchise. En cas de vol, vous devez : 1) Déclarer le vol à la police dans les 24h, 2) Nous informer immédiatement, 3) Fournir le récépissé de plainte. Aucun montant ne vous sera facturé."
    },
    {
      question: "Que se passe-t-il si je conduis hors routes goudronnées ?",
      answer: "La conduite sur pistes non goudronnées est autorisée pour les 4x4 uniquement, avec l'assurance tous risques. Pour les autres véhicules, la conduite hors route annule les garanties. Nous recommandons de louer un 4x4 Duster ou RAV4 pour les excursions désert/Atlas. Informez-nous de votre itinéraire lors de la réservation pour validation."
    },
    {
      question: "L'assurance tous risques couvre-t-elle tous les conducteurs ?",
      answer: "L'assurance tous risques couvre tous les conducteurs âgés de 21 ans minimum avec 2 ans de permis, déclarés sur le contrat de location. Il est obligatoire d'ajouter les conducteurs additionnels lors de la réservation (gratuit chez Benatna). Un conducteur non déclaré ne sera pas couvert par l'assurance en cas de sinistre."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Assurance Tous Risques Location Voiture Maroc - Protection Complète | Benatna</title>
        <meta name="description" content="Assurance tous risques incluse pour votre location au Maroc : 0 franchise, vol, incendie, bris de glace. Protection totale dès 70 DH/jour. Conduisez sans stress." />
        <meta name="keywords" content="assurance tous risques location maroc, cdw location voiture, protection totale location maroc, assurance vol incendie maroc" />
      </Helmet>

      <CanonicalTag path="/assurance-tous-risques-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Assurance Tous Risques Location Voiture Maroc" />
      <ServiceSchema
        name="Assurance Tous Risques Location Voiture Maroc"
        description="Assurance tous risques complète pour location de voiture au Maroc. Protection sans franchise contre accidents, vol, incendie et bris de glace."
        provider="Benatna"
        areaServed="Maroc"
        availableChannel={[
          { "@type": "WebSite", "url": "https://www.benatna.com" },
          { "@type": "ContactPoint", "telephone": "+212-6-00-00-00-00", "contactType": "Réservations" }
        ]}
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/nos-services" },
            { label: "Assurance Tous Risques", href: "/assurance-tous-risques-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Protection Complète Tous Risques</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Assurance Tous Risques Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Couverture Maximale Sans Franchise - Roulez en Toute Sécurité
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Avec Tous Risques</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Demander un Devis</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Couverture</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">0 DH</div>
                  <div className="text-sm text-muted-foreground">Franchise</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">8+</div>
                  <div className="text-sm text-muted-foreground">Garanties</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Assistance</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Comparaison des Protections d'Assurance
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {/* Base */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Assurance de Base (CDW)</h3>
                  <div className="text-2xl font-bold mb-4">Incluse</div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Dommages véhicule avec franchise 5000 DH</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Responsabilité civile tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Vol non couvert</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">Bris de glace non couvert</span>
                    </li>
                  </ul>
                </Card>

                {/* Sans Franchise */}
                <Card className="p-6 border-2 border-primary/50">
                  <h3 className="text-xl font-bold mb-4">Sans Franchise (SCDW)</h3>
                  <div className="text-2xl font-bold text-primary mb-4">+50-80 DH/jour</div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Dommages véhicule <strong>0 DH franchise</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Responsabilité civile tiers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Vol et incendie couverts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Bris de glace couvert</span>
                    </li>
                  </ul>
                </Card>

                {/* Tous Risques */}
                <Card className="p-6 border-2 border-primary relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Recommandé
                  </div>
                  <h3 className="text-xl font-bold mb-4">Tous Risques (Full)</h3>
                  <div className="text-2xl font-bold text-primary mb-4">+70-120 DH/jour</div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Tout inclus 0 DH franchise</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>RC tiers illimitée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Vol, incendie, bris de glace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Dommages pneus + dessous véhicule</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Protection conducteur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Assistance 24/7 premium</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Details */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                8 Garanties Incluses dans l'Assurance Tous Risques
              </h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">1. Collision et Dommages Tous Accidents (CDW)</h3>
                      <p className="text-muted-foreground">
                        Tous les dommages causés au véhicule lors d'une collision ou accident sont couverts à 100% 
                        sans franchise : carrosserie, pare-chocs, phares, capot, portes, ailes, etc.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">2. Protection Vol et Tentative de Vol (TP)</h3>
                      <p className="text-muted-foreground">
                        Couverture complète en cas de vol du véhicule ou de ses équipements, ainsi qu'en cas de 
                        dommages causés lors d'une tentative de vol. Nécessite une déclaration de police dans les 24h.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">3. Incendie et Catastrophes Naturelles</h3>
                      <p className="text-muted-foreground">
                        Protection contre les dommages causés par un incendie, la foudre, une explosion, 
                        ainsi que les catastrophes naturelles (inondations, tempêtes, etc.).
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">4. Bris de Glace Intégral (WDW)</h3>
                      <p className="text-muted-foreground">
                        Tous les éléments vitrés sont couverts : pare-brise avant et arrière, vitres latérales, 
                        rétroviseurs, phares, et optiques. Remplacement gratuit sans franchise.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">5. Dommages aux Pneus et Jantes (TPC)</h3>
                      <p className="text-muted-foreground">
                        Couverture des crevaisons, éclatements, déchirures et dommages aux jantes. 
                        Service de dépannage et remplacement gratuit des pneus endommagés.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">6. Protection Dessous de Véhicule (UDC)</h3>
                      <p className="text-muted-foreground">
                        Couverture des dommages au bas de caisse, échappement, réservoir, carter moteur et 
                        boîte de vitesses. Particulièrement important pour routes marocaines et pistes.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">7. Responsabilité Civile Étendue (LDW)</h3>
                      <p className="text-muted-foreground">
                        Couverture illimitée des dommages matériels et corporels causés aux tiers. 
                        Protection jusqu'à 50 millions de DH conforme à la réglementation marocaine.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">8. Protection du Conducteur (PAI)</h3>
                      <p className="text-muted-foreground">
                        Indemnisation en cas de blessures du conducteur lors d'un accident, incluant frais 
                        médicaux, hospitalisation, et indemnités journalières jusqu'à 100,000 DH.
                      </p>
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
                Questions Fréquentes - Assurance Tous Risques
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
                Roulez Protégé à 100%
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Choisissez l'assurance tous risques et profitez de votre location 
                au Maroc en toute tranquillité, sans aucun souci.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Avec Tous Risques</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/location-sans-franchise-maroc">Comparer les Protections</Link>
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

export default AssuranceTousRisques;