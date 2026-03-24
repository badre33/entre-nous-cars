import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Wallet, CreditCard, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";

import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const PaiementEspecesSansCarte = () => {
  const faqs = [
    {
      question: "Puis-je vraiment louer une voiture sans carte bancaire au Maroc ?",
      answer: "Oui, chez Benatna vous pouvez louer une voiture en payant en espèces, sans carte bancaire. Vous devez simplement présenter : pièce d'identité valide, permis de conduire depuis 2 ans minimum, justificatif d'adresse récent, et caution en espèces. La caution vous sera restituée intégralement en fin de location si aucun dommage."
    },
    {
      question: "Quel est le montant de la caution en espèces ?",
      answer: "La caution varie selon le type de véhicule loué : Citadines (Clio, Sandero) : 3000 DH, SUV (Duster, Captur) : 5000 DH, Véhicules premium : 8000 DH. Cette caution vous est restituée à 100% si le véhicule est rendu sans dommage, avec le plein de carburant, et propre. Le remboursement se fait immédiatement en espèces."
    },
    {
      question: "Puis-je payer le carburant en espèces également ?",
      answer: "Oui, toutes les stations-service au Maroc acceptent le paiement en espèces (Dirhams). Vous devez rendre le véhicule avec le plein de carburant, comme reçu. Si vous le rendez avec moins de carburant, nous facturerons le complément + frais de service (50 DH) qui sera déduit de votre caution."
    },
    {
      question: "Acceptez-vous les cartes de débit ou prépayées ?",
      answer: "Oui, nous acceptons les cartes de débit Visa/Mastercard et les cartes prépayées avec logo Visa ou Mastercard pour le paiement de la location. Cependant, pour la caution, une carte de crédit ou un dépôt en espèces reste nécessaire. Les cartes prépayées ne peuvent pas être utilisées pour la caution car nous ne pouvons pas bloquer un montant dessus."
    },
    {
      question: "Y a-t-il des frais supplémentaires pour paiement en espèces ?",
      answer: "Non, le paiement en espèces ne génère aucun frais supplémentaire chez Benatna. C'est le même tarif qu'avec carte bancaire. Nous encourageons même le paiement en espèces car cela réduit nos frais de transaction, et nous répercutons ces économies sur nos prix compétitifs. Pas de frais cachés, transparence totale."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Location Voiture Paiement Espèces Maroc - Sans Carte Bancaire | Benatna</title>
        <meta name="description" content="Louez votre voiture au Maroc en payant en espèces, sans carte bancaire. Caution cash acceptée. Citadines dès 200 DH/jour. Casablanca, Marrakech, Agadir." />
        <meta name="keywords" content="location voiture paiement espèces maroc, location sans carte bancaire maroc, paiement cash location voiture, caution espèces maroc" />
      </Helmet>

      <CanonicalTag path="/paiement-especes-sans-carte-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Paiement Espèces Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Location Voiture Paiement Espèces Sans Carte Maroc",
            "description": "Service de location de voiture au Maroc avec paiement en espèces. Caution cash acceptée, pas de carte bancaire obligatoire.",
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
            "paymentAccepted": "Cash"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/nos-services" },
            { label: "Paiement Espèces", href: "/paiement-especes-sans-carte-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Paiement Cash Accepté</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Location Voiture Paiement Espèces Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Louez Sans Carte Bancaire - Paiement & Caution en Cash
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Nous Contacter</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Cash OK</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">0 DH</div>
                  <div className="text-sm text-muted-foreground">Frais Cachés</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">Immédiat</div>
                  <div className="text-sm text-muted-foreground">Remb. Caution</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">200 DH</div>
                  <div className="text-sm text-muted-foreground">Dès /jour</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Cash Payment Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Pourquoi Choisir le Paiement en Espèces ?
              </h2>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground">
                  Beaucoup de loueurs au Maroc refusent les locations sans carte bancaire, imposant 
                  des frais élevés ou exigeant des cartes de crédit internationales. Chez Benatna, 
                  nous comprenons que tous les voyageurs n'ont pas accès à une carte de crédit, 
                  et nous proposons donc une solution flexible : <strong>paiement et caution en espèces acceptés</strong>.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    Avantages Paiement Espèces
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Pas besoin de carte bancaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Aucun frais de transaction bancaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Contrôle total de vos dépenses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Remboursement caution immédiat en cash</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Pas de blocage longue durée sur carte</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Wallet className="text-primary" />
                    Qui Peut Bénéficier ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Voyageurs sans carte de crédit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Carte bancaire bloquée ou expirée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Jeunes conducteurs sans carte crédit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Clients préférant paiement cash</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Entreprises locales marocaines</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Comment Louer en Payant Espèces ?
              </h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Réservation en Ligne ou par Téléphone</h3>
                      <p className="text-muted-foreground">
                        Réservez votre véhicule sur notre site en sélectionnant "Paiement en espèces" 
                        au moment du paiement, ou contactez-nous par WhatsApp/téléphone pour réserver 
                        directement. Aucun paiement en ligne requis.
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
                      <h3 className="text-xl font-bold mb-2">Préparer Vos Documents</h3>
                      <p className="text-muted-foreground mb-3">
                        Avant le retrait du véhicule, assurez-vous d'avoir :
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Pièce d'identité valide (CIN, passeport)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Permis de conduire valide (2 ans minimum)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>Justificatif de domicile récent (facture, attestation)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Paiement Location + Caution en Espèces</h3>
                      <p className="text-muted-foreground mb-3">
                        Au moment du retrait du véhicule, vous payez en espèces :
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-primary flex-shrink-0" />
                          <span><strong>Montant de la location</strong> (nombre de jours × tarif/jour + options)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-primary flex-shrink-0" />
                          <span><strong>Caution</strong> de 3000 à 8000 DH selon véhicule (restituée en fin de location)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Restitution Véhicule & Caution</h3>
                      <p className="text-muted-foreground">
                        À la fin de votre location, vous rendez le véhicule propre, avec le plein de carburant. 
                        Nous inspectons le véhicule ensemble. Si aucun dommage, nous vous restituons immédiatement 
                        votre caution en espèces, en main propre. Simple et transparent !
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Deposit Amounts Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Montants Caution en Espèces
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Citadines & Économiques</h3>
                  <div className="text-3xl font-bold text-primary mb-4">3000 DH</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Renault Clio</li>
                    <li>• Dacia Sandero</li>
                    <li>• Peugeot 208</li>
                    <li>• Hyundai i20</li>
                  </ul>
                </Card>

                <Card className="p-6 text-center border-2 border-primary">
                  <h3 className="text-xl font-bold mb-2">SUV & 4x4</h3>
                  <div className="text-3xl font-bold text-primary mb-4">5000 DH</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Dacia Duster</li>
                    <li>• Renault Captur</li>
                    <li>• Nissan Qashqai</li>
                    <li>• Toyota RAV4</li>
                  </ul>
                </Card>

                <Card className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Premium & Luxe</h3>
                  <div className="text-3xl font-bold text-primary mb-4">8000 DH</div>
                  <ul className="text-sm text-left space-y-2">
                    <li>• Mercedes Classe E</li>
                    <li>• BMW Série 5</li>
                    <li>• Audi A6</li>
                    <li>• Range Rover</li>
                  </ul>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="text-primary" />
                  Important à Savoir sur la Caution
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>La caution vous est <strong>restituée à 100% en espèces</strong> si le véhicule est rendu sans dommage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Le remboursement est <strong>immédiat</strong> après inspection du véhicule ensemble</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>Vous recevez un <strong>reçu officiel</strong> lors du dépôt de la caution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>En cas de dommages, seul le montant réel des réparations est retenu (avec devis)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Modes de Paiement Acceptés chez Benatna
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CreditCard className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Espèces (Cash)</h3>
                  <p className="text-muted-foreground mb-4">
                    Dirhams marocains (MAD) acceptés pour le paiement de la location et de la caution.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Aucun frais supplémentaire</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Remboursement caution immédiat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Reçu officiel fourni</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <CreditCard className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Cartes Bancaires</h3>
                  <p className="text-muted-foreground mb-4">
                    Visa, Mastercard, et cartes de débit acceptées pour le paiement (pas pour caution si débit).
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Paiement sécurisé en ligne</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Cartes de crédit pour caution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Cartes prépayées OK pour paiement</span>
                    </li>
                  </ul>
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
                Questions Fréquentes - Paiement Espèces
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
                Louez Dès Maintenant Sans Carte Bancaire
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Payez en espèces et profitez d'une location flexible sans contraintes bancaires. 
                Caution restituée immédiatement en fin de location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver en Espèces</Link>
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

export default PaiementEspecesSansCarte;