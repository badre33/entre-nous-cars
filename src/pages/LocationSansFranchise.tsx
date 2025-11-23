import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Shield, Car, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";

import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const LocationSansFranchise = () => {
  const faqs = [
    {
      question: "Qu'est-ce que la franchise en location de voiture au Maroc ?",
      answer: "La franchise est le montant qui reste à votre charge en cas d'accident, de vol ou de dommages au véhicule loué. Par exemple, avec une franchise de 5000 DH, vous devrez payer ce montant en cas de sinistre, même si vous avez une assurance. L'option sans franchise élimine complètement cette responsabilité financière."
    },
    {
      question: "La protection sans franchise est-elle vraiment totale chez Benatna ?",
      answer: "Oui, notre option sans franchise couvre 100% des dommages : collisions, vol, incendie, bris de glace, dommages aux pneus et même les dégâts au châssis. Vous ne payez aucun montant en cas de sinistre, quelle que soit sa nature. Seules exclusions : conduite en état d'ivresse et utilisation hors route non autorisée."
    },
    {
      question: "Combien coûte l'option sans franchise chez Benatna ?",
      answer: "Le supplément sans franchise varie de 50 à 120 DH par jour selon le type de véhicule. Citadines : +50 DH/jour, SUV et 4x4 : +80 DH/jour, Véhicules de luxe : +120 DH/jour. Ce tarif est bien inférieur au risque financier d'une franchise standard de 3000 à 8000 DH."
    },
    {
      question: "Puis-je ajouter la protection sans franchise après avoir réservé ?",
      answer: "Oui, vous pouvez ajouter l'option sans franchise jusqu'au moment du retrait du véhicule. Nous vous recommandons toutefois de l'inclure lors de votre réservation en ligne pour bénéficier des meilleurs tarifs et garantir sa disponibilité. Contactez-nous par WhatsApp au +212 6 00 00 00 00 pour modifier votre réservation."
    },
    {
      question: "Que se passe-t-il en cas d'accident avec l'option sans franchise ?",
      answer: "Avec notre protection sans franchise, vous n'avez aucun montant à payer en cas d'accident. Vous devez simplement : 1) Établir un constat amiable avec l'autre partie si possible, 2) Contacter notre assistance 24/7, 3) Remplir le formulaire de déclaration. Nous gérons ensuite toutes les démarches administratives et la réparation du véhicule sans vous facturer de franchise."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Location Voiture Sans Franchise Maroc - Protection Maximale 0 DH | Benatna</title>
        <meta name="description" content="Louez votre voiture au Maroc avec 0 DH de franchise. Protection totale incluse : accidents, vol, bris de glace. Conduisez l'esprit tranquille dès 50 DH/jour. Réservation immédiate." />
        <meta name="keywords" content="location voiture sans franchise maroc, location sans caution maroc, assurance tous risques maroc, rachat franchise location maroc, cdw location voiture" />
      </Helmet>

      <CanonicalTag path="/location-sans-franchise-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Location Voiture Sans Franchise Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Location Voiture Sans Franchise Maroc",
            "description": "Service de location de voiture au Maroc avec protection sans franchise 0 DH. Couverture totale des dommages, vol, et bris de glace.",
            "provider": {
              "@type": "Organization",
              "name": "Benatna",
              "url": "https://www.benatna.com",
              "telephone": "+212699024526"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Maroc"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "MAD",
              "price": "50",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "50",
                "priceCurrency": "MAD",
                "unitText": "jour"
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
            { label: "Services", href: "/nos-services" },
            { label: "Location Sans Franchise", href: "/location-sans-franchise-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Protection Maximale 0 DH Franchise</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Location Voiture Sans Franchise Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Roulez l'Esprit Tranquille - Aucune Franchise en Cas de Sinistre
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Sans Franchise</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Demander un Devis</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">0 DH</div>
                  <div className="text-sm text-muted-foreground">Franchise</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Couverture</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Assistance</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">+50 DH</div>
                  <div className="text-sm text-muted-foreground">Dès /jour</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Franchise Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Qu'est-ce que la Franchise en Location de Voiture ?
              </h2>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground">
                  La franchise (appelée aussi "déductible") est le montant qui reste à votre charge en cas d'accident, 
                  de vol, ou de dommages au véhicule loué, même si vous avez souscrit une assurance de base. 
                  Ce montant varie généralement entre 3000 et 8000 DH selon le type de véhicule au Maroc.
                </p>
                
                <p className="text-muted-foreground">
                  <strong>Exemple concret :</strong> Vous louez une voiture avec une franchise de 5000 DH. 
                  En cas d'accident causant 15000 DH de dégâts, vous devrez payer 5000 DH de votre poche, 
                  même avec l'assurance de base. Avec notre option <strong>sans franchise</strong>, vous payez 0 DH.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-destructive/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-destructive">❌</span> Avec Franchise Standard
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Franchise de 3000 à 8000 DH à payer en cas de sinistre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Stress et inquiétude pendant toute la location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Risque financier important en cas d'accident</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Démarches administratives complexes</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" /> Sans Franchise Benatna
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>0 DH</strong> de franchise sur tous dommages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Tranquillité d'esprit totale pendant votre séjour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Protection complète : vol, incendie, bris de glace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Assistance 24/7 et gestion simplifiée</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Notre Offre Sans Franchise : Couverture Complète
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Collision & Dommages</h3>
                  <p className="text-muted-foreground">
                    Tous les dommages accidentels au véhicule couverts à 100%, 
                    y compris carrosserie, pare-chocs, phares, et châssis.
                  </p>
                </Card>

                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Vol & Incendie</h3>
                  <p className="text-muted-foreground">
                    Protection complète contre le vol du véhicule ou de ses équipements, 
                    ainsi que les dommages causés par un incendie.
                  </p>
                </Card>

                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Bris de Glace</h3>
                  <p className="text-muted-foreground">
                    Pare-brise, vitres latérales, lunette arrière, et rétroviseurs 
                    entièrement couverts sans aucune participation.
                  </p>
                </Card>

                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Dommages Pneus</h3>
                  <p className="text-muted-foreground">
                    Crevaisons, éclatements, et dommages aux jantes couverts. 
                    Remplacement gratuit en cas de dommage.
                  </p>
                </Card>

                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Dessous Véhicule</h3>
                  <p className="text-muted-foreground">
                    Protection du bas de caisse et des organes mécaniques situés 
                    sous le véhicule (échappement, réservoir, etc.).
                  </p>
                </Card>

                <Card className="p-6">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Accessoires</h3>
                  <p className="text-muted-foreground">
                    GPS, sièges bébé, coffre de toit et tous les accessoires 
                    fournis avec le véhicule entièrement couverts.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Tarifs Protection Sans Franchise
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Citadines & Compactes</h3>
                  <div className="text-3xl font-bold text-primary mb-2">+50 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">par jour</div>
                  <p className="text-sm text-muted-foreground">
                    Renault Clio, Dacia Sandero, Peugeot 208
                  </p>
                </Card>

                <Card className="p-6 text-center border-2 border-primary">
                  <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">SUV & 4x4</h3>
                  <div className="text-3xl font-bold text-primary mb-2">+80 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">par jour</div>
                  <p className="text-sm text-muted-foreground">
                    Dacia Duster, Renault Captur, Toyota RAV4
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <Car className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Luxe & Premium</h3>
                  <div className="text-3xl font-bold text-primary mb-2">+120 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">par jour</div>
                  <p className="text-sm text-muted-foreground">
                    Mercedes Classe E, BMW Série 5, Audi A6
                  </p>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="text-primary" />
                  Économies Réelles
                </h3>
                <p className="text-muted-foreground mb-4">
                  <strong>Exemple concret :</strong> Location d'un Dacia Duster pendant 7 jours
                </p>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Coût protection sans franchise (7 jours × 80 DH)</span>
                    <strong>560 DH</strong>
                  </li>
                  <li className="flex justify-between text-destructive">
                    <span>VS Franchise standard en cas de sinistre</span>
                    <strong>5000 DH</strong>
                  </li>
                  <li className="flex justify-between text-primary pt-2 border-t">
                    <span><strong>Économie potentielle</strong></span>
                    <strong>4440 DH</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Questions Fréquentes - Location Sans Franchise
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
                Prêt à Rouler Sans Inquiétude ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Réservez maintenant votre véhicule avec protection sans franchise 
                et profitez de votre séjour au Maroc en toute sérénité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Avec Protection</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Contactez-nous</Link>
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

export default LocationSansFranchise;