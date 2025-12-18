import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Wallet, CreditCard, AlertCircle, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const GuideCautionLocation = () => {
  const faqs = [
    {
      question: "Quel est le montant de la caution pour louer une voiture au Maroc ?",
      answer: "Le montant de la caution varie selon le type de véhicule loué et le loueur. Chez Benatna : Citadines (Clio, Sandero) : 3000 DH, SUV et 4x4 (Duster, Captur, RAV4) : 5000 DH, Véhicules de luxe et premium : 8000 DH. Cette caution couvre la franchise en cas de dommages au véhicule. Elle vous est restituée intégralement si le véhicule est rendu sans dommage et avec le plein de carburant."
    },
    {
      question: "Comment est bloquée la caution avec une carte bancaire ?",
      answer: "Avec une carte bancaire, la caution est pré-autorisée (bloquée temporairement) sur votre carte de crédit au moment du retrait du véhicule. Ce n'est pas un débit réel, juste un blocage. Le montant reste indisponible sur votre carte pendant toute la durée de location. À la restitution du véhicule, si aucun dommage, nous annulons la pré-autorisation. Le déblocage effectif prend 5 à 10 jours selon votre banque."
    },
    {
      question: "Puis-je payer la caution en espèces ?",
      answer: "Oui, chez Benatna nous acceptons les cautions en espèces (Dirhams). C'est une excellente option si vous n'avez pas de carte de crédit. Vous payez le montant de la caution en liquide au moment du retrait, et nous vous remettons un reçu officiel. À la fin de location, si aucun dommage, nous vous restituons immédiatement votre caution en espèces. C'est rapide et sans délai bancaire."
    },
    {
      question: "Que se passe-t-il en cas de dommages au véhicule ?",
      answer: "Si le véhicule subit des dommages pendant votre location : 1) Nous établissons un constat contradictoire ensemble à la restitution, 2) Le montant des réparations est estimé (devis garage), 3) Ce montant est retenu sur votre caution, dans la limite de la franchise (3000-8000 DH selon véhicule), 4) Si vous avez l'option sans franchise, rien n'est retenu. Seuls les dommages réels sont facturés, avec justificatifs transparents."
    },
    {
      question: "Combien de temps pour récupérer ma caution ?",
      answer: "Le délai dépend du mode de paiement : Caution en espèces : remboursement immédiat en main propre à la restitution (0 jour). Caution par carte bancaire : déblocage de la pré-autorisation sous 5 à 10 jours ouvrés selon votre banque. Nous annulons la pré-autorisation dès la restitution, mais le délai de réapparition des fonds sur votre compte dépend des délais bancaires (hors de notre contrôle)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Caution Location Voiture Maroc | Guide Benatna</title>
        <meta name="description" content="Guide caution location voiture au Maroc : montants 2000-10000 DH, paiement carte ou espèces, délai remboursement. Tout savoir." />
        <meta name="keywords" content="caution location voiture maroc, montant caution maroc, depot garantie location, franchise location maroc, remboursement caution" />
      </Helmet>

      <CanonicalTag path="/caution-location-voiture-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Caution Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Guide Caution Location Voiture au Maroc",
            "description": "Tout savoir sur la caution de location de voiture au Maroc : montants, modes de paiement, remboursement.",
            "author": {
              "@type": "Organization",
              "name": "Benatna"
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
            { label: "Guide Caution", href: "/caution-location-voiture-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Guide Caution Complète</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Caution Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Montants, Modes de Paiement & Remboursement
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/paiement-especes-sans-carte-maroc">Paiement Espèces</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">3000</div>
                  <div className="text-sm text-muted-foreground">DH Min</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">8000</div>
                  <div className="text-sm text-muted-foreground">DH Max</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Remboursé</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">0 jour</div>
                  <div className="text-sm text-muted-foreground">Si Espèces</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Caution Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Qu'est-ce que la Caution de Location ?
              </h2>

              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground">
                  La caution (également appelée <strong>dépôt de garantie</strong> ou <strong>deposit</strong>) 
                  est une somme d'argent bloquée temporairement par le loueur au moment du retrait du véhicule. 
                  Elle sert de garantie en cas de dommages au véhicule, de vol, ou de non-respect des conditions 
                  de location (retour sans carburant, retard non signalé, etc.).
                </p>
                
                <p className="text-muted-foreground">
                  <strong>Important :</strong> La caution correspond généralement au montant de la franchise 
                  d'assurance. Si vous avez souscrit l'option "sans franchise", vous ne paierez rien même en 
                  cas de dommages, mais la caution reste obligatoire comme garantie.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    Si Aucun Problème
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Véhicule rendu sans dommage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Plein de carburant effectué</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Véhicule propre (état initial)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>➜ <strong>Caution restituée à 100%</strong></span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 border-2 border-destructive/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-destructive" />
                    Si Problème Constaté
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                      <span>Dommages au véhicule (rayure, choc...)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                      <span>Carburant manquant (facturé + frais)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                      <span>Retard excessif non signalé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                      <span>➜ <strong>Montant retenu sur caution</strong></span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deposit Amounts Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Montants de Caution chez Benatna
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Citadines & Économiques</h3>
                  <div className="text-4xl font-bold text-primary mb-4">3000 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">~ 280 EUR</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Renault Clio</li>
                    <li>• Dacia Sandero</li>
                    <li>• Peugeot 208</li>
                    <li>• Hyundai i20</li>
                    <li>• Fiat 500</li>
                  </ul>
                </Card>

                <Card className="p-6 text-center border-2 border-primary">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Plus Populaire
                  </div>
                  <h3 className="text-xl font-bold mb-2">SUV & 4x4</h3>
                  <div className="text-4xl font-bold text-primary mb-4">5000 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">~ 460 EUR</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Dacia Duster</li>
                    <li>• Renault Captur</li>
                    <li>• Nissan Qashqai</li>
                    <li>• Toyota RAV4</li>
                    <li>• Peugeot 3008</li>
                  </ul>
                </Card>

                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Premium & Luxe</h3>
                  <div className="text-4xl font-bold text-primary mb-4">8000 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">~ 740 EUR</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Mercedes Classe E</li>
                    <li>• BMW Série 5</li>
                    <li>• Audi A6</li>
                    <li>• Range Rover</li>
                    <li>• Porsche Cayenne</li>
                  </ul>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <DollarSign className="text-primary" />
                  Option Sans Franchise = 0 DH en Cas de Dommage
                </h3>
                <p className="text-muted-foreground mb-3">
                  Même avec la caution, vous pouvez souscrire notre option <strong>Sans Franchise</strong> (+50 à 120 DH/jour) :
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>La caution reste obligatoire (pour garantie)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Mais en cas de dommages, <strong>rien n'est retenu</strong> sur votre caution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Vous récupérez 100% de votre caution quoi qu'il arrive</span>
                  </li>
                </ul>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/location-sans-franchise-maroc">En savoir plus sur Sans Franchise</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Modes de Paiement de la Caution
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CreditCard className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Carte de Crédit</h3>
                  <p className="text-muted-foreground mb-4">
                    Mode de paiement standard accepté par tous les loueurs.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-bold mb-2">✅ Avantages :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Pas de liquide à transporter</li>
                        <li>• Blocage temporaire (pas de débit réel)</li>
                        <li>• Accepté internationalement</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">⚠️ Inconvénients :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Délai déblocage 5-10 jours</li>
                        <li>• Montant indisponible pendant location</li>
                        <li>• Carte débit souvent refusée pour caution</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-card/50 p-3 rounded text-sm">
                    <strong>Cartes acceptées :</strong> Visa, Mastercard (crédit uniquement)
                  </div>
                </Card>

                <Card className="p-6 border-2 border-primary">
                  <Wallet className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Espèces (Cash)</h3>
                  <p className="text-muted-foreground mb-4">
                    Solution flexible acceptée chez Benatna si vous n'avez pas de carte crédit.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-bold mb-2">✅ Avantages :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• <strong>Remboursement immédiat</strong> en main propre</li>
                        <li>• Aucun délai bancaire</li>
                        <li>• Pas besoin de carte de crédit</li>
                        <li>• Reçu officiel fourni</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">⚠️ Inconvénients :</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• Somme importante à transporter</li>
                        <li>• Dirhams uniquement (pas EUR/USD)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-3 rounded text-sm">
                    <strong>Notre recommandation :</strong> Option idéale pour remboursement rapide
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Process Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Processus de Remboursement de la Caution
              </h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Inspection Contradictoire du Véhicule</h3>
                      <p className="text-muted-foreground">
                        À la restitution, nous inspectons ensemble le véhicule (extérieur, intérieur, niveau carburant, 
                        équipements). Vous êtes présent et pouvez constater l'état avec nous. Si tout est OK, nous 
                        validons la restitution sans retenue.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Validation et Signature</h3>
                      <p className="text-muted-foreground">
                        Si aucun problème n'est constaté, nous signons ensemble le formulaire de restitution confirmant 
                        que le véhicule est rendu en bon état. Ce document atteste que vous n'avez rien à payer.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Remboursement Immédiat ou Déblocage</h3>
                      <div className="space-y-3">
                        <div className="bg-card/50 p-4 rounded">
                          <h4 className="font-bold mb-2">🏦 Si Caution par Carte Bancaire :</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• Nous annulons la pré-autorisation immédiatement dans notre système</li>
                            <li>• Votre banque reçoit la notification d'annulation</li>
                            <li>• Délai de déblocage des fonds : 5 à 10 jours ouvrés selon votre banque</li>
                            <li>• Vous recevez un email de confirmation de déblocage</li>
                          </ul>
                        </div>

                        <div className="bg-primary/10 p-4 rounded">
                          <h4 className="font-bold mb-2">💵 Si Caution en Espèces :</h4>
                          <ul className="space-y-2 text-sm">
                            <li>• <strong>Remboursement immédiat en main propre</strong></li>
                            <li>• Vous repartez avec vos dirhams directement</li>
                            <li>• Aucun délai, aucune attente</li>
                            <li>• Reçu de remboursement fourni</li>
                          </ul>
                        </div>
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
                Questions Fréquentes - Caution Location
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
                Caution Claire et Transparente
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Chez Benatna, pas de surprise : montants affichés clairement, remboursement garanti 
                si véhicule rendu sans dommage. Louez en toute confiance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Ma Voiture</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/paiement-especes-sans-carte-maroc">Payer en Espèces</Link>
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

export default GuideCautionLocation;