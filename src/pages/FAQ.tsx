import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Comment réserver une voiture sur Benatna ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Réserver sur Benatna est simple : 1) Choisissez votre ville et dates, 2) Sélectionnez votre véhicule, 3) Remplissez vos coordonnées, 4) Confirmez votre réservation. Le tout en moins de 2 minutes !"
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les documents nécessaires pour louer une voiture au Maroc ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous aurez besoin : d'un permis de conduire valide (+ de 2 ans), d'une pièce d'identité (CIN ou passeport), et d'un moyen de paiement. Pour les étrangers, un permis international est recommandé mais pas toujours obligatoire."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je louer une voiture sans carte de crédit ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Chez Benatna, vous pouvez réserver avec une carte de débit ou même payer en espèces à la récupération du véhicule. Nous sommes l'une des rares plateformes au Maroc à offrir cette flexibilité."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQ - Questions Fréquentes Location de Voiture au Maroc | Benatna</title>
        <meta name="description" content="Toutes vos questions sur la location de voiture au Maroc avec Benatna : Prix, documents nécessaires, assurances, livraison, paiement. Réponses claires et complètes." />
        <meta name="keywords" content="faq location voiture maroc, questions location auto, documents nécessaires location voiture, assurance location maroc" />
        <link rel="canonical" href="https://benatna.ma/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container px-4 text-center">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Questions Fréquentes</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement les réponses à toutes vos questions sur la location de voiture au Maroc
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container px-4 max-w-4xl">
            <div className="space-y-8">
              {/* Réservation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Réservation & Processus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Comment réserver une voiture sur Benatna ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Réserver sur Benatna est simple et rapide :
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Choisissez votre ville et vos dates de location</li>
                          <li>Parcourez notre catalogue et sélectionnez votre véhicule</li>
                          <li>Remplissez vos coordonnées (nom, email, téléphone)</li>
                          <li>Confirmez votre réservation</li>
                        </ol>
                        Le tout en moins de 2 minutes ! Vous recevrez une confirmation immédiate par email et SMS.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Puis-je modifier ou annuler ma réservation ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui ! Vous pouvez modifier ou annuler votre réservation gratuitement jusqu&apos;à 48 heures avant la date de prise en charge. Au-delà de ce délai, des frais peuvent s&apos;appliquer selon les conditions de l&apos;agence partenaire.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Recevrai-je une confirmation de réservation ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Absolument ! Dès que votre réservation est confirmée, vous recevrez :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Un email de confirmation avec tous les détails</li>
                          <li>Un SMS avec votre numéro de réservation</li>
                          <li>Les coordonnées de l&apos;agence partenaire</li>
                          <li>Les instructions pour la prise en charge du véhicule</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>Combien de temps à l&apos;avance dois-je réserver ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Vous pouvez réserver jusqu&apos;à la dernière minute si des véhicules sont disponibles. Cependant, nous recommandons de réserver au moins 48 heures à l&apos;avance pour garantir la disponibilité et bénéficier des meilleurs prix, surtout en haute saison (été, fêtes de fin d&apos;année).
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Prix & Paiement */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Prix & Paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="price-1">
                      <AccordionTrigger>Quels sont les prix de location de voiture au Maroc ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nos prix varient selon le type de véhicule et la durée de location :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Citadines (Clio, Sandero) :</strong> à partir de 150 DH/jour</li>
                          <li><strong>Berlines (Corolla, Jetta) :</strong> à partir de 250 DH/jour</li>
                          <li><strong>SUV (Duster, Tiguan) :</strong> à partir de 350 DH/jour</li>
                          <li><strong>Véhicules premium :</strong> à partir de 800 DH/jour</li>
                        </ul>
                        Tous nos prix incluent l&apos;assurance de base et le kilométrage illimité.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price-2">
                      <AccordionTrigger>Y a-t-il des frais cachés ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Non, chez Benatna nous affichons des prix 100% transparents. Le prix que vous voyez inclut :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>L&apos;assurance au tiers (obligatoire)</li>
                          <li>Le kilométrage illimité</li>
                          <li>La TVA</li>
                          <li>L&apos;assistance 24/7</li>
                        </ul>
                        Les seuls frais supplémentaires possibles sont optionnels (chauffeur, GPS, siège bébé, assurance tous risques).
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price-3">
                      <AccordionTrigger>Puis-je louer une voiture sans carte de crédit ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui ! Chez Benatna, vous avez plusieurs options de paiement :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Carte de débit (Visa, Mastercard)</li>
                          <li>Espèces à la récupération du véhicule</li>
                          <li>Virement bancaire</li>
                        </ul>
                        Nous sommes l&apos;une des rares plateformes au Maroc à offrir cette flexibilité sans carte de crédit.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price-4">
                      <AccordionTrigger>Quand dois-je payer ma réservation ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Le paiement dépend de l&apos;agence partenaire :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Option 1 :</strong> Paiement en ligne lors de la réservation (sécurisé)</li>
                          <li><strong>Option 2 :</strong> Paiement à la récupération du véhicule (espèces ou carte)</li>
                        </ul>
                        L&apos;option disponible sera clairement indiquée lors de votre réservation.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Documents & Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Documents & Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="doc-1">
                      <AccordionTrigger>Quels documents sont nécessaires pour louer une voiture ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <strong>Pour les Marocains :</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Carte d&apos;identité nationale (CIN) valide</li>
                          <li>Permis de conduire valide (+ de 2 ans)</li>
                          <li>Moyen de paiement</li>
                        </ul>
                        <br />
                        <strong>Pour les étrangers :</strong>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Passeport valide</li>
                          <li>Permis de conduire national + Permis international (recommandé)</li>
                          <li>Moyen de paiement</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="doc-2">
                      <AccordionTrigger>Quel âge minimum pour louer une voiture ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        L&apos;âge minimum est généralement de <strong>21 ans</strong> avec un permis de conduire valide depuis au moins 2 ans. Pour certains véhicules premium ou SUV, l&apos;âge minimum peut être de 25 ans. Des frais supplémentaires peuvent s&apos;appliquer pour les conducteurs de moins de 25 ans.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="doc-3">
                      <AccordionTrigger>Ai-je besoin d&apos;un permis international ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Pour les touristes étrangers, le permis international est <strong>fortement recommandé</strong> mais pas toujours obligatoire. Cela dépend de votre pays d&apos;origine :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Europe, USA, Canada :</strong> Permis national suffit souvent, mais permis international recommandé</li>
                          <li><strong>Autres pays :</strong> Permis international généralement requis</li>
                        </ul>
                        Nous vous conseillons de toujours avoir les deux documents pour éviter tout problème.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Assurances */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Assurances</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="insurance-1">
                      <AccordionTrigger>Quelles assurances sont incluses dans le prix ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Tous nos véhicules incluent <strong>l&apos;assurance au tiers</strong> (obligatoire au Maroc), qui couvre :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Les dommages causés à des tiers</li>
                          <li>Les blessures aux passagers tiers</li>
                          <li>L&apos;assistance routière 24/7</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="insurance-2">
                      <AccordionTrigger>Dois-je prendre l&apos;assurance tous risques ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        L&apos;assurance tous risques (CDW) est <strong>optionnelle mais fortement recommandée</strong>. Elle vous protège contre :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Les dommages au véhicule loué (accident, vandalisme)</li>
                          <li>Le vol du véhicule</li>
                          <li>Le bris de glace</li>
                        </ul>
                        Prix : environ 80-150 DH/jour selon le véhicule. Cela vous évite de payer des frais importants en cas d&apos;incident.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="insurance-3">
                      <AccordionTrigger>Qu&apos;est-ce que la franchise en cas d&apos;accident ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        La franchise est le montant qui reste à votre charge en cas de dommages au véhicule, même avec l&apos;assurance tous risques. Elle varie généralement entre 3,000 et 10,000 DH selon le véhicule. Vous pouvez réduire ou supprimer cette franchise avec une assurance complémentaire.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Récupération & Restitution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Récupération & Restitution</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pickup-1">
                      <AccordionTrigger>Où puis-je récupérer ma voiture ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Nous proposons la récupération dans toutes les grandes villes du Maroc :
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Casablanca (aéroport Mohammed V, centre-ville)</li>
                          <li>Marrakech (aéroport Menara, Médina, Guéliz)</li>
                          <li>Rabat (centre-ville, gare)</li>
                          <li>Tanger (aéroport, port, centre-ville)</li>
                          <li>Agadir (aéroport Al Massira, corniche)</li>
                          <li>Fès (aéroport Saïss, Médina)</li>
                        </ul>
                        La livraison à l&apos;aéroport ou à votre hôtel est souvent gratuite !
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pickup-2">
                      <AccordionTrigger>Puis-je restituer le véhicule dans une autre ville ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui, la restitution dans une autre ville (one-way) est possible moyennant des frais supplémentaires qui varient selon la distance. Par exemple : Casablanca → Marrakech (environ 500 DH), Casablanca → Agadir (environ 800 DH). Contactez-nous pour connaître les tarifs exacts.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pickup-3">
                      <AccordionTrigger>Que se passe-t-il si mon vol est retardé ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Pas de problème ! Nos agences partenaires suivent les horaires des vols en temps réel. En cas de retard, votre véhicule sera disponible à votre arrivée sans frais supplémentaires. Nous vous recommandons de nous informer dès que possible du retard pour optimiser l&apos;attente.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="pickup-4">
                      <AccordionTrigger>Le véhicule est-il livré avec le plein de carburant ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui, tous nos véhicules sont livrés avec le <strong>plein de carburant</strong>. Vous devrez le restituer avec le même niveau de carburant. Si le réservoir n&apos;est pas plein au retour, des frais de carburant + frais de service seront appliqués.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Conduite & Utilisation */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Conduite & Utilisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="drive-1">
                      <AccordionTrigger>Le kilométrage est-il illimité ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui ! Tous nos véhicules incluent le <strong>kilométrage illimité</strong>. Vous pouvez parcourir tout le Maroc sans frais supplémentaires. Parfait pour les road trips !
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="drive-2">
                      <AccordionTrigger>Puis-je conduire au-delà des frontières marocaines ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Non, les véhicules loués au Maroc ne peuvent pas sortir du territoire marocain pour des raisons d&apos;assurance. Si vous souhaitez visiter des pays voisins, vous devrez louer un véhicule dans chaque pays.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="drive-3">
                      <AccordionTrigger>Puis-je ajouter un conducteur supplémentaire ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui, vous pouvez ajouter un ou plusieurs conducteurs supplémentaires moyennant des frais (environ 50 DH/jour/conducteur). Le conducteur supplémentaire doit respecter les mêmes conditions (âge, permis) que le conducteur principal et être présent lors de la prise en charge.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="drive-4">
                      <AccordionTrigger>Que faire en cas de panne ou d&apos;accident ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        En cas de panne ou d&apos;accident :
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Assurez-vous que tout le monde va bien et mettez-vous en sécurité</li>
                          <li>Appelez immédiatement l&apos;agence partenaire (numéro d&apos;urgence 24/7 fourni)</li>
                          <li>En cas d&apos;accident, faites un constat amiable avec l&apos;autre partie</li>
                          <li>Contactez les autorités si nécessaire (police, pompiers)</li>
                        </ol>
                        L&apos;assistance routière 24/7 est incluse dans tous nos contrats.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Contact CTA */}
            <Card className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
              <CardContent className="pt-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas la réponse à votre question ?</h2>
                <p className="text-muted-foreground mb-6">
                  Notre équipe est disponible 24/7 pour répondre à toutes vos questions
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="tel:+212699024526">
                    <Button size="lg">
                      <Phone className="mr-2 h-5 w-5" />
                      +212 699 024 526
                    </Button>
                  </a>
                  <Link to="/contact">
                    <Button size="lg" variant="outline">
                      <Mail className="mr-2 h-5 w-5" />
                      Nous Contacter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
