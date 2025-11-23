import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, RefreshCw, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";

import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const AnnulationGratuite = () => {
  const faqs = [
    {
      question: "Jusqu'à quand puis-je annuler gratuitement ma réservation ?",
      answer: "Vous pouvez annuler gratuitement votre réservation jusqu'à 48 heures avant la date de prise en charge du véhicule. Au-delà de ce délai (moins de 48h), des frais d'annulation de 50% du montant total s'appliquent. Si vous annulez moins de 24h avant ou en cas de non-présentation, 100% du montant sera facturé."
    },
    {
      question: "Comment annuler ma réservation en ligne ?",
      answer: "Pour annuler votre réservation : 1) Connectez-vous à votre espace client sur benatna.com avec votre email de réservation, 2) Accédez à 'Mes réservations', 3) Sélectionnez la réservation à annuler, 4) Cliquez sur 'Annuler' et confirmez. Vous recevrez immédiatement un email de confirmation d'annulation. Vous pouvez aussi nous contacter par WhatsApp ou téléphone."
    },
    {
      question: "Sous quel délai serais-je remboursé après annulation ?",
      answer: "Le remboursement est traité immédiatement après validation de l'annulation. Si vous avez payé par carte bancaire, le remboursement apparaîtra sur votre compte sous 3 à 7 jours ouvrés selon votre banque. Si vous avez payé en espèces ou n'avez fait qu'une pré-réservation, aucun remboursement n'est nécessaire car aucun prélèvement n'a été effectué."
    },
    {
      question: "Puis-je modifier ma réservation au lieu de l'annuler ?",
      answer: "Oui ! La modification de réservation est gratuite jusqu'à 24h avant la prise en charge. Vous pouvez modifier : dates de location, heures de retrait/restitution, lieu de prise en charge ou retour, type de véhicule (selon disponibilité). Connectez-vous à votre espace client ou contactez-nous. Si le nouveau tarif est supérieur, vous paierez la différence. Si inférieur, nous vous remboursons."
    },
    {
      question: "Que se passe-t-il si je ne me présente pas pour récupérer le véhicule ?",
      answer: "En cas de non-présentation (no-show) sans annulation préalable, vous serez facturé 100% du montant de la réservation. Nous vous encourageons fortement à annuler même à la dernière minute si vous ne pouvez pas venir. Si vous avez un empêchement imprévu (vol retardé, urgence), contactez-nous immédiatement : nous étudierons chaque situation au cas par cas avec bienveillance."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Annulation Gratuite Location Voiture Maroc - Modification Flexible | Benatna</title>
        <meta name="description" content="Annulation gratuite jusqu'à 48h avant votre location au Maroc. Modification réservation flexible. Remboursement rapide. Réservez sans risque avec Benatna." />
        <meta name="keywords" content="annulation gratuite location voiture maroc, modification réservation maroc, remboursement location voiture, annulation sans frais maroc" />
      </Helmet>

      <CanonicalTag path="/annulation-gratuite-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Annulation Gratuite Location Voiture Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Annulation Gratuite Location Voiture Maroc",
            "description": "Politique d'annulation gratuite flexible pour location de voiture au Maroc. Annulation jusqu'à 48h avant sans frais.",
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
            "termsOfService": "Annulation gratuite jusqu'à 48 heures avant la prise en charge"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <BreadcrumbsEnriched 
          items={[
            { label: "Accueil", href: "/" },
            { label: "Services", href: "/nos-services" },
            { label: "Annulation Gratuite", href: "/annulation-gratuite-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <RefreshCw className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Annulation Gratuite 48h</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Annulation Gratuite Location Voiture Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Réservez Sans Risque - Modifiez ou Annulez Gratuitement
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
                  <div className="text-2xl font-bold text-primary mb-1">48h</div>
                  <div className="text-sm text-muted-foreground">Avant Gratuit</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Remboursé</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">24h</div>
                  <div className="text-sm text-muted-foreground">Modif Gratuite</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">0 DH</div>
                  <div className="text-sm text-muted-foreground">Frais Cachés</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Pourquoi Choisir Notre Politique d'Annulation Flexible ?
              </h2>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-muted-foreground">
                  Chez Benatna, nous comprenons que les plans peuvent changer : vols retardés, changements 
                  d'itinéraire, imprévus personnels... C'est pourquoi nous offrons une des politiques 
                  d'annulation les plus flexibles du marché marocain : <strong>annulation gratuite jusqu'à 48h avant</strong>, 
                  modification gratuite jusqu'à 24h avant, et remboursement rapide garanti.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Réservez Sans Risque</h3>
                  <p className="text-muted-foreground">
                    Planifiez vos voyages en toute confiance. Si vos projets changent, vous pouvez 
                    annuler ou modifier gratuitement votre réservation jusqu'à 48h avant. Aucun frais 
                    caché, aucune mauvaise surprise.
                  </p>
                </Card>

                <Card className="p-6">
                  <Clock className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Remboursement Rapide</h3>
                  <p className="text-muted-foreground">
                    Dès validation de votre annulation, le remboursement est traité immédiatement. 
                    Vous recevez vos fonds sous 3 à 7 jours sur votre compte bancaire. Transparence 
                    totale et suivi en temps réel.
                  </p>
                </Card>

                <Card className="p-6">
                  <RefreshCw className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Modification Gratuite</h3>
                  <p className="text-muted-foreground">
                    Changement de dates, de lieu, ou de véhicule ? Pas de problème ! Modifiez votre 
                    réservation gratuitement jusqu'à 24h avant la prise en charge. Nous nous adaptons 
                    à vos besoins.
                  </p>
                </Card>

                <Card className="p-6">
                  <Calendar className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Planification Sereine</h3>
                  <p className="text-muted-foreground">
                    Réservez votre voiture dès maintenant pour bénéficier des meilleurs tarifs, 
                    même si vos dates ne sont pas 100% confirmées. Vous pourrez toujours ajuster 
                    ou annuler sans frais.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Politique d'Annulation Détaillée
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center border-2 border-primary">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    48h+
                  </div>
                  <h3 className="text-xl font-bold mb-2">Annulation Gratuite</h3>
                  <div className="text-3xl font-bold text-primary mb-4">0 DH</div>
                  <p className="text-muted-foreground">
                    Annulation plus de 48h avant la prise en charge : <strong>remboursement intégral</strong> 
                    garanti sous 3-7 jours.
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="bg-secondary text-secondary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    48h
                  </div>
                  <h3 className="text-xl font-bold mb-2">Annulation Tardive</h3>
                  <div className="text-3xl font-bold text-secondary mb-4">50%</div>
                  <p className="text-muted-foreground">
                    Annulation entre 24h et 48h avant : <strong>50% du montant facturé</strong>. 
                    Vous récupérez 50% du montant payé.
                  </p>
                </Card>

                <Card className="p-6 text-center">
                  <div className="bg-destructive text-destructive-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    24h
                  </div>
                  <h3 className="text-xl font-bold mb-2">Dernière Minute</h3>
                  <div className="text-3xl font-bold text-destructive mb-4">100%</div>
                  <p className="text-muted-foreground">
                    Annulation moins de 24h avant ou no-show : <strong>100% du montant facturé</strong>. 
                    Contactez-nous en cas d'urgence.
                  </p>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Exceptions et Cas Particuliers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong>Vol retardé/annulé :</strong> Avec justificatif de la compagnie aérienne, 
                      nous proposons un report gratuit ou remboursement total, même moins de 48h avant.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong>Urgence médicale :</strong> Avec certificat médical, annulation possible 
                      sans frais quel que soit le délai.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong>Événements exceptionnels :</strong> Catastrophes naturelles, restrictions 
                      gouvernementales, fermetures frontières : remboursement intégral garanti.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>
                      <strong>Locations longue durée (7+ jours) :</strong> Conditions d'annulation 
                      négociables. Contactez-nous pour discuter d'arrangements particuliers.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modification Policy Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Modification de Réservation
              </h2>

              <div className="space-y-6 mb-12">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Calendar className="text-primary" />
                    Modification Gratuite jusqu'à 24h Avant
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Vous pouvez modifier gratuitement votre réservation jusqu'à 24 heures avant la prise 
                    en charge. Les modifications possibles incluent :
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Dates de location (début/fin)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Heures retrait/restitution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Lieu prise en charge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Lieu retour véhicule</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Type de véhicule (si dispo)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Options (assurance, GPS, etc.)</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <RefreshCw className="text-primary" />
                    Comment Modifier Votre Réservation ?
                  </h3>
                  <ol className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                      <span>Connectez-vous à votre espace client sur benatna.com</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                      <span>Accédez à "Mes réservations" et sélectionnez la réservation concernée</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                      <span>Cliquez sur "Modifier" et apportez vos changements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                      <span>Validez et recevez votre nouvelle confirmation par email</span>
                    </li>
                  </ol>
                  <p className="text-sm text-muted-foreground mt-4">
                    Vous pouvez aussi nous contacter par WhatsApp (+212 6 00 00 00 00) ou téléphone 
                    pour modifier votre réservation. Notre équipe vous assistera immédiatement.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-primary/50">
                  <h3 className="text-xl font-bold mb-3">Différence de Tarif</h3>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      Si votre modification entraîne un changement de tarif :
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Tarif supérieur :</strong> Vous payez uniquement la différence de prix 
                          entre l'ancienne et la nouvelle réservation.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span>
                          <strong>Tarif inférieur :</strong> Nous vous remboursons la différence dans les 
                          3-7 jours sur votre moyen de paiement initial.
                        </span>
                      </li>
                    </ul>
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
                Questions Fréquentes - Annulation & Modification
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
                Réservez en Toute Confiance
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Profitez de notre politique d'annulation flexible et réservez dès maintenant 
                pour garantir votre véhicule. Vous pourrez toujours modifier ou annuler sans frais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/louer">Réserver Sans Risque</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/contact">Questions ? Contactez-nous</Link>
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

export default AnnulationGratuite;