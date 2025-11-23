import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, AlertCircle, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";
import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const ConditionsLocationMaroc = () => {
  const faqs = [
    {
      question: "Quelles sont les conditions générales pour louer une voiture au Maroc ?",
      answer: "Pour louer une voiture au Maroc, vous devez remplir ces conditions : 1) Avoir au moins 21 ans et un permis depuis 2 ans minimum, 2) Présenter une pièce d'identité valide et un permis de conduire (international si hors UE), 3) Fournir un justificatif de domicile récent, 4) Disposer d'un moyen de paiement pour la caution (carte bancaire ou espèces), 5) Accepter les conditions générales de location et signer le contrat."
    },
    {
      question: "Puis-je conduire hors routes goudronnées avec une voiture de location ?",
      answer: "La conduite hors routes goudronnées est autorisée UNIQUEMENT avec les véhicules 4x4 (Duster, RAV4, etc.) et avec l'assurance tous risques. Pour les citadines et berlines, toute utilisation hors route (pistes désert, chemins non goudronnés) annule l'assurance et vous expose à payer l'intégralité des réparations en cas de dommage. Si vous prévoyez des trajets hors route, louez impérativement un 4x4 et informez-nous de votre itinéraire."
    },
    {
      question: "Puis-je traverser la frontière vers l'Algérie ou l'Espagne avec la voiture ?",
      answer: "Non, il est strictement interdit de sortir du territoire marocain avec un véhicule de location. Les frontières terrestres (Algérie, Mauritanie) et maritimes (ferry vers Espagne) sont interdites. Cette interdiction est due aux restrictions d'assurance et douanières. Si vous tentez de franchir une frontière, vous serez en infraction et devrez payer des pénalités importantes. Le véhicule doit rester au Maroc pendant toute la durée de location."
    },
    {
      question: "Que se passe-t-il si je rends la voiture en retard ?",
      answer: "En cas de retard de restitution : Moins de 2h de retard : tolérance gratuite si vous nous prévenez. Entre 2h et 6h : facturation d'une demi-journée supplémentaire. Plus de 6h : facturation d'une journée complète au tarif en vigueur. Retard non signalé de plus de 24h : considéré comme vol présumé, police contactée. Nous vous recommandons de toujours nous prévenir en cas d'imprévu, nous trouverons une solution."
    },
    {
      question: "L'assurance couvre-t-elle les dommages causés par un tiers ?",
      answer: "Oui, notre assurance responsabilité civile (RC) obligatoire couvre les dommages matériels et corporels que vous pourriez causer à un tiers lors d'un accident dont vous seriez responsable (jusqu'à 50 millions DH). Pour les dommages subis par VOTRE véhicule de location, cela dépend : si l'autre conducteur est identifié et responsable, son assurance paie. Si délit de fuite ou responsabilité partagée, votre franchise s'applique (sauf si vous avez l'option sans franchise)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Conditions Location Voiture Maroc - CGV & Règlement | Benatna</title>
        <meta name="description" content="Conditions générales location voiture Maroc : âge, permis, assurance, interdictions, retour véhicule. Guide complet des règles et obligations à respecter." />
        <meta name="keywords" content="conditions location voiture maroc, cgv location maroc, règlement location voiture, obligations locataire maroc, contrat location" />
      </Helmet>

      <CanonicalTag path="/conditions-location-voiture-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Conditions Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Conditions Générales de Location Voiture Maroc",
            "description": "Conditions générales et règlement pour la location de voiture au Maroc avec Benatna",
            "provider": {
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
            { label: "Informations", href: "/faq" },
            { label: "Conditions Location", href: "/conditions-location-voiture-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Conditions Générales</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Conditions Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Règlement, Obligations & Droits du Locataire
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Questions ? Contactez-nous</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">21 ans</div>
                  <div className="text-sm text-muted-foreground">Min Requis</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">2 ans</div>
                  <div className="text-sm text-muted-foreground">Permis Min</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Assistance</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Transparent</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* General Conditions Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Conditions Générales de Location
              </h2>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-primary" />
                    1. Conditions d'Éligibilité
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Âge minimum :</strong> 21 ans avec permis depuis 2 ans (25 ans pour véhicules luxe)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Permis valide :</strong> Permis marocain, européen, ou international pour autres pays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Documents :</strong> Pièce d'identité, permis, justificatif domicile obligatoires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Caution :</strong> Carte bancaire ou espèces pour dépôt de garantie</span>
                    </li>
                  </ul>
                  <Button asChild variant="link" className="mt-3 pl-0">
                    <Link to="/age-minimum-location-voiture-maroc">→ Voir détails âge & permis</Link>
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="text-primary" />
                    2. Assurances et Protections
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">Inclus Automatiquement :</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Responsabilité Civile (RC) :</strong> Dommages causés aux tiers (obligatoire par loi)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Assurance de base (CDW) :</strong> Dommages au véhicule avec franchise 3000-8000 DH</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Assistance 24/7 :</strong> Dépannage, remorquage, véhicule de remplacement si panne</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">Options Payantes Recommandées :</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Sans Franchise (SCDW) :</strong> +50-120 DH/jour, 0 DH à payer en cas de dommage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Protection Vol & Incendie :</strong> Couverture vol et dégâts incendie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span><strong>Protection Conducteur :</strong> Indemnités en cas de blessure conducteur</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button asChild variant="link" className="mt-3 pl-0">
                    <Link to="/assurance-tous-risques-maroc">→ Détails assurances</Link>
                  </Button>
                </Card>

                <Card className="p-6 border-2 border-destructive/50">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="text-destructive" />
                    3. Interdictions et Restrictions
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2 text-destructive">❌ Strictement Interdit :</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Sortie du territoire :</strong> Impossible de franchir frontières (Algérie, Espagne...)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Conduite hors route :</strong> Pistes non goudronnées interdites (sauf 4x4 autorisés)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Sous-location :</strong> Interdiction de louer le véhicule à un tiers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Courses et compétitions :</strong> Utilisation sportive interdite</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Conduite en état d'ivresse :</strong> Taux alcoolémie légal 0.2g/L max</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                          <span><strong>Conducteur non déclaré :</strong> Seuls conducteurs inscrits sur contrat autorisés</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-destructive/10 p-4 rounded">
                      <p className="text-sm">
                        <strong>⚠️ Conséquences en cas d'infraction :</strong> Annulation de l'assurance, 
                        paiement intégral des réparations, pénalités contractuelles, poursuites judiciaires possibles.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="text-primary" />
                    4. Restitution du Véhicule
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Carburant :</strong> Le véhicule doit être rendu avec le même niveau de carburant qu'au départ (plein généralement). Sinon : facturation carburant manquant + 50 DH frais service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Propreté :</strong> Véhicule doit être rendu propre (état initial). Intérieur très sale : facturation nettoyage 200-500 DH</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Horaire :</strong> Respecter horaire convenu. Tolérance 2h si prévenu. Au-delà : facturation journée supplémentaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>État général :</strong> Inspection contradictoire effectuée ensemble. Constat des dommages éventuels avec photos</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">5. Kilométrage</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Kilométrage illimité :</strong> Inclus sur la plupart de nos véhicules (citadines, SUV, berlines)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Véhicules luxe :</strong> Parfois limité à 200-300 km/jour. Supplément 2-3 DH/km au-delà</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>Le kilométrage est indiqué clairement sur votre contrat de location</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">6. Conducteurs Additionnels</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Gratuit chez Benatna :</strong> Ajoutez jusqu'à 2 conducteurs additionnels sans frais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Conditions :</strong> Même conditions que conducteur principal (21 ans, 2 ans permis)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Déclaration obligatoire :</strong> Tout conducteur doit être inscrit sur le contrat avec documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                      <span className="text-destructive"><strong>Important :</strong> Conducteur non déclaré = assurance annulée en cas d'accident</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">7. Responsabilité en Cas d'Accident</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">À Faire Immédiatement :</h4>
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Sécuriser la zone et allumer feux de détresse</li>
                        <li>Appeler police (19) si blessés ou dégâts importants</li>
                        <li>Remplir constat amiable avec l'autre partie si possible</li>
                        <li>Prendre photos de tous les angles (véhicules, lieux, plaques)</li>
                        <li>Contacter Benatna assistance 24/7 : +212 6 99 02 45 26</li>
                        <li>Ne pas quitter les lieux avant autorisation police</li>
                      </ol>
                    </div>

                    <div className="bg-card/50 p-4 rounded">
                      <h4 className="font-bold mb-2">Franchise Applicable :</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Avec assurance de base :</strong> Franchise 3000-8000 DH selon véhicule</li>
                        <li>• <strong>Avec option sans franchise :</strong> 0 DH à payer</li>
                        <li>• <strong>Si autre responsable identifié :</strong> Son assurance paie, vous ne payez rien</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Questions Fréquentes - Conditions Location
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
                Conditions Claires et Transparentes
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Chez Benatna, pas de clause cachée. Tout est expliqué clairement avant signature. 
                Louez en toute confiance et sérénité.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Ma Voiture</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Questions sur CGV ?</Link>
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

export default ConditionsLocationMaroc;