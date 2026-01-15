import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, User, Clock, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CanonicalTag } from "@/components/CanonicalTag";
import { FAQSchemaEnriched } from "@/components/schemas/FAQSchemaEnriched";

import { BreadcrumbsEnriched } from "@/components/BreadcrumbsEnriched";

const LocationAvecChauffeur = () => {
  const faqs = [
    {
      question: "Quelles sont les qualifications de vos chauffeurs ?",
      answer: "Tous nos chauffeurs sont des professionnels expérimentés avec minimum 5 ans d'expérience, permis professionnel valide, connaissance parfaite du français et de l'arabe, formation service client, et maîtrise complète des routes marocaines. Ils sont également formés aux premiers secours et vérifient le véhicule avant chaque prestation."
    },
    {
      question: "Le chauffeur peut-il servir de guide touristique ?",
      answer: "Oui, nos chauffeurs connaissent parfaitement les sites touristiques, restaurants authentiques, et meilleures routes panoramiques du Maroc. Ils peuvent vous conseiller sur les lieux à visiter, horaires d'ouverture, et traditions locales. Pour un service de guide officiel certifié, nous pouvons également organiser cela en supplément."
    },
    {
      question: "Puis-je demander un chauffeur anglophone ou hispanophone ?",
      answer: "Oui, nous proposons des chauffeurs francophones, anglophones et hispanophones selon disponibilité. Indiquez votre préférence linguistique lors de la réservation. Les chauffeurs multilingues sont particulièrement disponibles à Marrakech, Casablanca, et Rabat."
    },
    {
      question: "Les frais de route du chauffeur sont-ils inclus dans le tarif ?",
      answer: "Oui, nos tarifs incluent déjà : salaire du chauffeur, repas du chauffeur pendant la journée, hébergement du chauffeur pour circuits multi-jours. Vous payez uniquement le véhicule + le service chauffeur indiqué. Le carburant est à votre charge ou peut être inclus sur demande (forfait à définir selon itinéraire)."
    },
    {
      question: "Puis-je réserver un chauffeur pour plusieurs jours consécutifs ?",
      answer: "Oui, nos chauffeurs sont disponibles pour des prestations multi-jours : circuits désert (3-7 jours), road trips côte atlantique, tournées professionnelles, mariages sur plusieurs jours. Tarifs dégressifs à partir de 3 jours consécutifs. Contactez-nous pour un devis personnalisé incluant hébergement chauffeur si nécessaire."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Location Voiture Avec Chauffeur Maroc - Confort & Sérénité | Benatna</title>
        <meta name="description" content="Louez une voiture avec chauffeur professionnel au Maroc. Francophone, expérimenté, connaissance parfaite des routes. Dès 800 DH/jour. Casablanca, Marrakech, tout le Maroc." />
        <meta name="keywords" content="location voiture avec chauffeur maroc, chauffeur privé maroc, location avec conducteur casablanca, chauffeur professionnel marrakech" />
      </Helmet>

      <CanonicalTag path="/location-avec-chauffeur-maroc" />
      <FAQSchemaEnriched faqs={faqs} pageName="Location Voiture Avec Chauffeur Maroc" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Location Voiture Avec Chauffeur Maroc",
            "description": "Service de location de voiture avec chauffeur professionnel au Maroc. Chauffeurs expérimentés, véhicules confort, disponibles 24/7.",
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
              "price": "800",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "800",
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
            { label: "Location Avec Chauffeur", href: "/location-avec-chauffeur-maroc" }
          ]}
        />

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <User className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Chauffeur Professionnel Inclus</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
                Location Voiture Avec Chauffeur Maroc
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Profitez de Votre Séjour, On Conduit Pour Vous
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/contact">Demander un Devis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/louer">Voir Nos Véhicules</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">5+ ans</div>
                  <div className="text-sm text-muted-foreground">Expérience</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Professionnels</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Disponibles</div>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary mb-1">800 DH</div>
                  <div className="text-sm text-muted-foreground">Dès /jour</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Nos Services de Chauffeur Privé
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Card className="p-6">
                  <User className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Chauffeur Professionnel Francophone</h3>
                  <p className="text-muted-foreground mb-4">
                    Nos chauffeurs parlent parfaitement français, arabe, et pour certains anglais/espagnol. 
                    Formés au service client haut de gamme, ils assurent votre confort et sécurité.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Minimum 5 ans d'expérience</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Permis professionnel valide</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Formation premiers secours</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <MapPin className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Connaissance Parfaite Routes Marocaines</h3>
                  <p className="text-muted-foreground mb-4">
                    Nos chauffeurs connaissent toutes les routes du Maroc : autoroutes, nationales, pistes 
                    du désert, et routes de l'Atlas. Ils vous conduisent en sécurité partout.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Itinéraires optimisés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Conseils sites touristiques</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>GPS + carte routière</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Clock className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Flexibilité Horaires 8h, 10h ou 12h/jour</h3>
                  <p className="text-muted-foreground mb-4">
                    Choisissez la formule qui correspond à votre programme : demi-journée pour visites 
                    express, journée complète pour circuits touristiques, ou multi-jours pour road trips.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Ponctualité garantie</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Disponible week-ends & jours fériés</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Prolongations possibles</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6">
                  <Star className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">Véhicules Confort ou Luxe au Choix</h3>
                  <p className="text-muted-foreground mb-4">
                    Sélectionnez le véhicule adapté à vos besoins : berlines confort (Mercedes Classe E, 
                    BMW Série 5), SUV spacieux (Land Cruiser), ou vans familiaux (Mercedes Vito).
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Climatisation performante</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Sièges cuir et confortables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Eau minérale offerte</span>
                    </li>
                  </ul>
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
                Tarifs Chauffeur Privé
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Half Day (8h)</h3>
                  <div className="text-3xl font-bold text-primary mb-2">800 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">+ Location véhicule</div>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>8 heures de conduite</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Maximum 150 km inclus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Idéal visites urbaines</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 text-center border-2 border-primary">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                    Populaire
                  </div>
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Full Day (12h)</h3>
                  <div className="text-3xl font-bold text-primary mb-2">1200 DH</div>
                  <div className="text-sm text-muted-foreground mb-4">+ Location véhicule</div>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>12 heures de conduite</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Maximum 300 km inclus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Circuits touristiques</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 text-center">
                  <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Multi-jours</h3>
                  <div className="text-3xl font-bold text-primary mb-2">Sur Devis</div>
                  <div className="text-sm text-muted-foreground mb-4">Tarifs dégressifs</div>
                  <ul className="text-sm text-left space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>3 jours et plus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Hébergement chauffeur inclus</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Road trips Atlas, désert</span>
                    </li>
                  </ul>
                </Card>
              </div>

              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Inclus dans tous les tarifs chauffeur</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Chauffeur professionnel expérimenté</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Repas du chauffeur pendant service</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Hébergement chauffeur (multi-jours)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Eau minérale pour passagers</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>GPS et assistance téléphonique</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Conseils itinéraires et sites</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Cas d'Usage Chauffeur Privé
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">🏜️ Circuits Touristiques</h3>
                  <p className="text-muted-foreground mb-3">
                    Atlas en 4x4, désert de Merzouga, cascades d'Ouzoud, vallée du Dadès, 
                    gorges du Todra. Profitez des paysages sans stress de conduite.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Idéal pour : Familles, seniors, photographes
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">💼 Déplacements Professionnels</h3>
                  <p className="text-muted-foreground mb-3">
                    Meetings entre plusieurs villes, tournées commerciales, salons professionnels. 
                    Travaillez pendant les trajets, arrivez reposé.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Idéal pour : Cadres, commerciaux, entrepreneurs
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">✈️ Transferts Aéroport-Hôtel</h3>
                  <p className="text-muted-foreground mb-3">
                    Accueil personnalisé à l'aéroport avec panneau nominatif, assistance bagages, 
                    transfert direct à votre hôtel. Service VIP disponible.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Idéal pour : Arrivées tardives, groupes, VIP
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-3">💒 Mariages et Événements</h3>
                  <p className="text-muted-foreground mb-3">
                    Location avec chauffeur pour mariages, anniversaires, soirées d'entreprise. 
                    Véhicules décorés sur demande, service impeccable.
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Idéal pour : Mariés, organisateurs événements
                  </p>
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
                Questions Fréquentes - Chauffeur Privé
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
                Réservez Votre Chauffeur Privé
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Profitez du Maroc sans conduire. Confort, sécurité, et sérénité garantis 
                avec nos chauffeurs professionnels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/contact">Demander un Devis Chauffeur</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg">
                  <Link to="/louer">Voir Nos Véhicules</Link>
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

export default LocationAvecChauffeur;