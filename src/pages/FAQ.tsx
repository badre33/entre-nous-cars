import { Helmet } from "react-helmet-async";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import { HreflangTags } from "@/utils/hreflangHelper";
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
import { SITE_STATS } from "@/data/siteStats";

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
          "text": "Réserver sur Benatna est simple : 1) Choisissez votre ville et dates, 2) Sélectionnez votre véhicule, 3) Remplissez vos coordonnées, 4) Confirmez votre réservation. Le tout en moins de 2 minutes ! Vous recevrez une confirmation immédiate par email et SMS."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je modifier ou annuler ma réservation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Vous pouvez modifier ou annuler votre réservation gratuitement jusqu'à 48 heures avant la date de prise en charge. Au-delà de ce délai, des frais peuvent s'appliquer selon les conditions de l'agence partenaire."
        }
      },
      {
        "@type": "Question",
        "name": "Recevrai-je une confirmation de réservation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument ! Dès que votre réservation est confirmée, vous recevrez un email avec tous les détails, un SMS avec votre numéro de réservation, les coordonnées de l'agence partenaire et les instructions pour la prise en charge du véhicule."
        }
      },
      {
        "@type": "Question",
        "name": "Combien de temps à l'avance dois-je réserver ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez réserver jusqu'à la dernière minute si des véhicules sont disponibles. Cependant, nous recommandons de réserver au moins 48 heures à l'avance pour garantir la disponibilité et bénéficier des meilleurs prix, surtout en haute saison."
        }
      },
      {
        "@type": "Question",
        "name": "Quels sont les prix de location de voiture au Maroc ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos prix varient selon le type de véhicule : Citadines (Clio, Sandero) à partir de 150 DH/jour, Berlines (Corolla, Jetta) à partir de 250 DH/jour, SUV (Duster, Tiguan) à partir de 350 DH/jour, Véhicules premium à partir de 800 DH/jour. Tous nos prix incluent l'assurance de base et le kilométrage illimité."
        }
      },
      {
        "@type": "Question",
        "name": "Y a-t-il des frais cachés ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, chez Benatna nous affichons des prix 100% transparents. Le prix que vous voyez inclut l'assurance au tiers, le kilométrage illimité, la TVA et l'assistance 24/7. Les seuls frais supplémentaires possibles sont optionnels (chauffeur, GPS, siège bébé, assurance tous risques)."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je louer une voiture sans carte de crédit ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Chez Benatna, vous avez plusieurs options de paiement : Carte de débit (Visa, Mastercard), Espèces à la récupération du véhicule, Virement bancaire. Nous sommes l'une des rares plateformes au Maroc à offrir cette flexibilité sans carte de crédit."
        }
      },
      {
        "@type": "Question",
        "name": "Quand dois-je payer ma réservation ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le paiement dépend de l'agence partenaire. Option 1 : Paiement en ligne lors de la réservation (sécurisé). Option 2 : Paiement à la récupération du véhicule (espèces ou carte). L'option disponible sera clairement indiquée lors de votre réservation."
        }
      },
      {
        "@type": "Question",
        "name": "Quels documents sont nécessaires pour louer une voiture ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour les Marocains : Carte d'identité nationale (CIN) valide, Permis de conduire valide (+ de 2 ans), Moyen de paiement. Pour les étrangers : Passeport valide, Permis de conduire national + Permis international (recommandé), Moyen de paiement."
        }
      },
      {
        "@type": "Question",
        "name": "Quel âge minimum pour louer une voiture ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'âge minimum est généralement de 21 ans avec un permis de conduire valide depuis au moins 2 ans. Pour certains véhicules premium ou SUV, l'âge minimum peut être de 25 ans. Des frais supplémentaires peuvent s'appliquer pour les conducteurs de moins de 25 ans."
        }
      },
      {
        "@type": "Question",
        "name": "Ai-je besoin d'un permis international ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pour les touristes étrangers, le permis international est fortement recommandé mais pas toujours obligatoire. Pour l'Europe, USA, Canada : Permis national suffit souvent, mais permis international recommandé. Pour les autres pays : Permis international généralement requis. Nous vous conseillons de toujours avoir les deux documents."
        }
      },
      {
        "@type": "Question",
        "name": "Quelles assurances sont incluses dans le prix ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tous nos véhicules incluent l'assurance au tiers (obligatoire au Maroc), qui couvre les dommages causés à des tiers, les blessures aux passagers tiers et l'assistance routière 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "Dois-je prendre l'assurance tous risques ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'assurance tous risques (CDW) est optionnelle mais fortement recommandée. Elle vous protège contre les dommages au véhicule loué (accident, vandalisme), le vol du véhicule et le bris de glace. Prix : environ 80-150 DH/jour selon le véhicule."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce que la franchise en cas d'accident ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La franchise est le montant qui reste à votre charge en cas de dommages au véhicule, même avec l'assurance tous risques. Elle varie généralement entre 3,000 et 10,000 DH selon le véhicule. Vous pouvez réduire ou supprimer cette franchise avec une assurance complémentaire."
        }
      },
      {
        "@type": "Question",
        "name": "Où puis-je récupérer ma voiture ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos agences partenaires proposent plusieurs points de récupération : Aéroports (Casablanca, Marrakech, Agadir, Rabat, Tanger, Fès), Centres-villes dans toutes les grandes villes, Livraison gratuite à votre hôtel ou adresse dans certaines villes. Le lieu exact sera confirmé lors de votre réservation."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je restituer le véhicule dans une autre ville ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, le one-way (aller simple) est possible entre les principales villes du Maroc. Des frais de restitution s'appliquent selon la distance entre les villes de prise en charge et de restitution. Ces frais seront clairement indiqués avant la confirmation de votre réservation."
        }
      },
      {
        "@type": "Question",
        "name": "Que se passe-t-il si mon vol est retardé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pas de problème ! Indiquez votre numéro de vol lors de la réservation. Nos agences partenaires surveillent les horaires de vol et vous attendront en cas de retard. Si le retard est important (plus de 3 heures), contactez l'agence pour les prévenir."
        }
      },
      {
        "@type": "Question",
        "name": "Le véhicule est-il livré avec le plein de carburant ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, politique plein-plein : Vous recevez le véhicule avec le plein de carburant et devez le restituer avec le plein. Si vous ne faites pas le plein, le carburant manquant vous sera facturé au prix fort + frais de service."
        }
      },
      {
        "@type": "Question",
        "name": "Le kilométrage est-il illimité ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Tous nos véhicules incluent le kilométrage illimité. Vous pouvez rouler autant que vous le souhaitez sans frais supplémentaires. C'est inclus dans le prix affiché."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je conduire au-delà des frontières marocaines ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, les véhicules loués au Maroc ne sont pas autorisés à sortir du territoire marocain. Cette restriction est imposée par les assurances et les agences de location. Toute tentative de franchir la frontière peut entraîner l'annulation de votre assurance."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je ajouter un conducteur supplémentaire ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, vous pouvez ajouter un ou plusieurs conducteurs supplémentaires. Chaque conducteur additionnel doit remplir les mêmes conditions (âge, permis, documents) que le conducteur principal. Des frais peuvent s'appliquer selon l'agence (environ 50-100 DH/jour)."
        }
      },
      {
        "@type": "Question",
        "name": "Que faire en cas de panne ou d'accident ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En cas de panne : Contactez immédiatement l'assistance 24/7 de l'agence (numéro sur le contrat). Un véhicule de remplacement ou une réparation sera organisée rapidement. En cas d'accident : 1) Sécurisez la scène, 2) Appelez la police (19), 3) Contactez l'agence immédiatement, 4) Prenez des photos, 5) Remplissez un constat amiable si possible. Ne quittez JAMAIS les lieux avant l'arrivée de la police."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je traverser les frontières avec une voiture de location ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non, les véhicules loués au Maroc ne peuvent pas sortir du territoire marocain. Cette restriction est imposée par les assurances. Toute tentative peut entraîner l'annulation de votre contrat et de votre assurance."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le carburant et qui doit faire le plein ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Politique plein-plein : Vous recevez le véhicule avec le réservoir plein et devez le restituer plein. Gardez le ticket de la dernière station-service. Si vous ne faites pas le plein, des frais de carburant + frais de service vous seront facturés."
        }
      },
      {
        "@type": "Question",
        "name": "Y a-t-il une caution à verser ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, une caution (dépôt de garantie) est demandée à la prise en charge du véhicule. Montant : 2000-10000 MAD selon le véhicule. Méthode : Empreinte carte bancaire (montant bloqué) ou espèces. La caution est restituée à la restitution du véhicule si aucun dommage n'est constaté."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je annuler ma réservation et être remboursé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, selon les conditions de l'agence partenaire. Généralement : Annulation gratuite jusqu'à 48h avant la prise en charge. Entre 48h et 24h : frais de 50%. Moins de 24h : frais de 100%. Vérifiez les conditions spécifiques lors de votre réservation."
        }
      },
      {
        "@type": "Question",
        "name": "Les véhicules sont-ils équipés de GPS ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certains véhicules récents possèdent un GPS intégré. Sinon, vous pouvez louer un GPS (50-80 MAD/jour) ou utiliser votre smartphone avec Google Maps ou Maps.me (fonctionne hors ligne). La plupart des voyageurs utilisent leur téléphone, ce qui est gratuit et efficace."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je louer un siège auto pour bébé ou enfant ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, des sièges auto sont disponibles en option : Siège bébé (0-1 an) : 50 MAD/jour. Siège enfant (1-4 ans) : 40 MAD/jour. Rehausseur (4-10 ans) : 30 MAD/jour. Réservez à l'avance car les stocks sont limités. Vous pouvez aussi apporter le vôtre."
        }
      },
      {
        "@type": "Question",
        "name": "Les routes au Maroc sont-elles en bon état ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui ! Le réseau routier marocain est l'un des meilleurs d'Afrique. Plus de 1800 km d'autoroutes modernes relient les grandes villes. Les routes nationales principales sont bien entretenues. Seules certaines routes secondaires en montagne ou dans le désert peuvent être plus difficiles."
        }
      },
      {
        "@type": "Question",
        "name": "Benatna est-il fiable et sécurisé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Absolument ! Benatna vérifie toutes ses agences partenaires selon des critères stricts : licences officielles, assurances à jour, état de la flotte, avis clients. Paiements sécurisés. Support client disponible 24/7. Plus de ${SITE_STATS.totalCustomers} clients satisfaits depuis 2024 avec ${SITE_STATS.satisfactionRate}% de satisfaction.`
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je réserver pour quelqu'un d'autre ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, vous pouvez réserver et payer pour une autre personne. Indiquez lors de la réservation le nom du conducteur principal qui récupérera le véhicule. Cette personne devra présenter ses propres documents (permis, ID) lors de la prise en charge."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>FAQ Location Voiture Maroc | Benatna</title>
        <meta name="description" content="Questions fréquentes sur la location de voiture au Maroc : documents, prix, assurances, paiement. Réponses claires par Benatna." />
        <meta name="keywords" content="faq location voiture maroc, questions location auto, documents nécessaires location voiture, assurance location maroc" />
        <link rel="canonical" href="https://benatna.ma/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <HreflangTags path="/faq" />
      <Header />
      <Breadcrumbs />

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

                    <AccordionItem value="drive-5">
                      <AccordionTrigger>Y a-t-il une caution à verser ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui, une caution est demandée (2000-10000 MAD selon le véhicule). Elle peut être versée par empreinte carte bancaire ou en espèces. La caution est restituée à la restitution si aucun dommage n&apos;est constaté.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="drive-6">
                      <AccordionTrigger>Les véhicules sont-ils équipés de GPS ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Certains véhicules récents possèdent un GPS intégré. Sinon, vous pouvez louer un GPS (50-80 MAD/jour) ou utiliser votre smartphone avec Google Maps (gratuit et efficace).
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="drive-7">
                      <AccordionTrigger>Puis-je louer un siège auto pour bébé ?</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Oui, des sièges auto sont disponibles en option (30-50 MAD/jour selon l&apos;âge). Réservez à l&apos;avance car les stocks sont limités.
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
