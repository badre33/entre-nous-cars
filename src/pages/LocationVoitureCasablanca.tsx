import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { CityLocalBusinessSchema } from "@/components/CityLocalBusinessSchema";
import { ReviewsSchema } from "@/components/ReviewsSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { CallButton } from "@/components/CallButton";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { generateCityImageAlt } from "@/utils/seoHelpers";
import { HreflangTags } from "@/utils/hreflangHelper";
import { 
  EnhancedAggregateRatingSchema, 
  PriceRangeOfferSchema, 
  FAQSchemaEnriched,
  MultiLocationSchema,
  IndividualReviewsSchema
} from "@/components/schemas";
import { casablancaReviews } from "@/data/reviewsData";
import cityCasablanca from "@/assets/city-casablanca.jpg";

const LocationVoitureCasablanca = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Casablanca | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Casablanca avec Benatna. Aéroport Mohammed V, Centre-ville, Ain Diab. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture casablanca, location auto casablanca aeroport, louer voiture casablanca pas cher, location véhicule casa, rent car casablanca airport" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-casablanca" />
        <meta property="og:title" content="Location de Voiture à Casablanca | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Casablanca avec Benatna. Aéroport, centre-ville, livraison gratuite. Prix transparents, sans surprises." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-casablanca" />
      </Helmet>
      <HreflangTags path="/location-voiture-casablanca" />
      <StructuredData type="rental" />
      <ServiceSchema city="Casablanca" />
      <HowToSchema city="Casablanca" />
      <OfferSchema city="Casablanca" />
      <CityLocalBusinessSchema
        cityName="Casablanca"
        latitude="33.5731"
        longitude="-7.5898"
        address="Aéroport Mohammed V"
        postalCode="27000"
        telephone="+212699024526"
        priceRange="150-800 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Amina Benali',
            location: 'Casablanca',
            rating: 5,
            comment: 'Service impeccable ! J\'ai loué une Clio pour visiter Marrakech. La voiture était propre, récente et le prix très compétitif.',
            date: 'Il y a 2 jours',
            car: 'Renault Clio',
          },
          {
            name: 'Karim Bouazza',
            location: 'Casablanca',
            rating: 5,
            comment: 'Livraison rapide à l\'aéroport Mohammed V. Processus simple et efficace. Je recommande !',
            date: 'Il y a 5 jours',
          },
          {
            name: 'Fatima Zahra',
            location: 'Casablanca',
            rating: 5,
            comment: 'Excellent rapport qualité-prix. Voiture récente et bien entretenue.',
            date: 'Il y a 1 semaine',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
        city="Casablanca"
      />
      
      {/* Quick Win 1: Enhanced Aggregate Rating */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Casablanca"
      />
      <IndividualReviewsSchema
        reviews={casablancaReviews}
        entityType="LocalBusiness"
        city="Casablanca"
      />
      
      {/* Quick Win 2: Price Range Offer Schema */}
      <PriceRangeOfferSchema 
        minPrice="150"
        maxPrice="800"
        city="Casablanca"
        discount={{ percentage: 10, minDays: 30 }}
      />
      
      {/* Quick Win 3: Multi-Location Schema */}
      <MultiLocationSchema 
        locations={[
          {
            name: "Aéroport Mohammed V",
            address: "Aéroport Mohammed V, Terminal 1 et 2",
            city: "Casablanca",
            postalCode: "27000",
            latitude: "33.3676",
            longitude: "-7.5898",
            description: "Point de retrait principal à l'aéroport Mohammed V, disponible 24/7 avec service de livraison express."
          },
          {
            name: "Centre-ville Casablanca",
            address: "Boulevard Mohammed V",
            city: "Casablanca",
            postalCode: "20000",
            latitude: "33.5731",
            longitude: "-7.6019",
            description: "Agence en centre-ville, proche des quartiers d'affaires et commerciaux."
          },
          {
            name: "Ain Diab",
            address: "Corniche Ain Diab",
            city: "Casablanca",
            postalCode: "20050",
            latitude: "33.5985",
            longitude: "-7.6704",
            description: "Point de retrait à Ain Diab, idéal pour les séjours balnéaires."
          }
        ]}
      />
      
      {/* Quick Win 4: FAQ Schema Enrichi */}
      <FAQSchemaEnriched 
        pageName="Location de Voiture à Casablanca"
        faqs={[
          {
            question: "Quel est le prix de la location de voiture à Casablanca ?",
            answer: "Les prix démarrent à 150 DH/jour pour une voiture économique. Nous proposons des réductions pour les locations longue durée : -5% à partir de 7 jours, -10% à partir de 30 jours."
          },
          {
            question: "Puis-je louer une voiture à l'aéroport Mohammed V ?",
            answer: "Oui, nous proposons un service de livraison gratuite à l'aéroport Mohammed V 24/7. Notre équipe vous attend à votre arrivée avec le véhicule de votre choix."
          },
          {
            question: "Faut-il une carte de crédit pour louer ?",
            answer: "Non, la location sans carte de crédit est possible chez Benatna. Nous acceptons les paiements en espèces, virement bancaire ou carte bancaire classique."
          },
          {
            question: "Quels documents sont nécessaires pour louer une voiture à Casablanca ?",
            answer: "Vous aurez besoin d'une carte d'identité nationale (CIN) ou passeport, d'un permis de conduire valide depuis au moins 1 an, et d'un justificatif de domicile récent."
          },
          {
            question: "L'assurance est-elle incluse dans le prix ?",
            answer: "Oui, l'assurance tous risques est incluse dans tous nos tarifs. Vous êtes couvert pour les dommages au véhicule et la responsabilité civile, avec une franchise réduite."
          }
        ]}
      />
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityCasablanca}
          alt={generateCityImageAlt("Casablanca")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Casablanca
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 150 DH/jour • Aéroport Mohammed V • Livraison gratuite
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Casablanca">
                <Button size="lg" className="text-lg px-8">
                  Réserver Maintenant
                </Button>
              </Link>
              <CallButton 
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
              >
                Appeler
              </CallButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container px-4">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Véhicules Disponibles</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">150 DH</div>
                <div className="text-sm text-muted-foreground">Prix à partir de</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Service Client</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary mb-2">
                  4.8 <Star className="h-6 w-6 fill-primary" />
                </div>
                <div className="text-sm text-muted-foreground">Note Moyenne</div>
              </CardContent>
            </Card>
          </div>

          {/* SEO Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Casablanca : Guide Complet 2025</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Casablanca</strong> ? Benatna vous propose le plus grand choix de véhicules dans la capitale économique du Maroc. Que vous arriviez à l&apos;aéroport Mohammed V, que vous soyez en centre-ville ou à Ain Diab, nous avons la solution parfaite pour vos besoins de mobilité.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Casablanca</strong> se distingue par sa simplicité et sa transparence. Plus de 50 véhicules disponibles, des prix clairs dès 150 DH/jour, et une réservation en 2 minutes chrono. Que vous ayez besoin d&apos;une citadine pour vos déplacements urbains ou d&apos;un SUV pour explorer le Maroc, Benatna a le véhicule qu&apos;il vous faut.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Casablanca ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Casablanca, poumon économique du Maroc, est une ville dynamique qui s&apos;étend sur plus de 220 km². Avec ses quartiers d&apos;affaires comme le Maarif et Ain Sebâa, ses zones commerciales à l&apos;Anfaplace et Morocco Mall, et ses plages le long de la corniche d&apos;Ain Diab, la voiture devient rapidement indispensable pour optimiser vos déplacements.
                  </p>
                  <p>
                    <strong>Louer une voiture à Casablanca</strong> vous offre la liberté de découvrir la ville à votre rythme, sans dépendre des taxis ou des transports en commun. Vous pouvez facilement visiter la majestueuse Mosquée Hassan II, flâner dans le quartier des Habous, explorer les Roches Noires, ou vous rendre à votre rendez-vous d&apos;affaires à Sidi Maarouf en toute autonomie. De plus, Casablanca est le point de départ idéal pour des excursions vers Rabat (90 km), El Jadida (100 km) ou même Marrakech (240 km).
                  </p>
                  <p>
                    Le réseau routier casablancais est bien développé avec des autoroutes modernes, des boulevards larges et une signalisation claire. La ville dispose également de nombreux parkings sécurisés dans tous les quartiers. Avec votre voiture de location, vous gagnez en flexibilité horaire et en confort, particulièrement appréciable lors des chaudes journées d&apos;été ou pour vos déplacements professionnels.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 10 des Lieux à Visiter en Voiture à Casablanca</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Casablanca</strong>, découvrez les incontournables de la métropole marocaine :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Mosquée Hassan II :</strong> Chef-d&apos;œuvre architectural au bord de l&apos;Atlantique, la 3ème plus grande mosquée au monde. Parking disponible sur place. Visites guidées quotidiennes (sauf vendredi matin).
                    </li>
                    <li>
                      <strong>Corniche d&apos;Ain Diab :</strong> 6 km de front de mer avec restaurants, clubs, plages privées et publiques. Idéal pour une balade en fin d&apos;après-midi. Nombreux parkings le long de la corniche.
                    </li>
                    <li>
                      <strong>Morocco Mall :</strong> Plus grand centre commercial d&apos;Afrique avec aquarium géant, 600 boutiques, restaurants gastronomiques. Parking gratuit de 3 000 places.
                    </li>
                    <li>
                      <strong>Quartier des Habous :</strong> Médina moderne construite dans les années 1930, parfaite pour acheter de l&apos;artisanat marocain. Souks traditionnels, pâtisseries orientales, cafés typiques.
                    </li>
                    <li>
                      <strong>Place Mohammed V :</strong> Cœur administratif de Casablanca entouré d&apos;édifices art déco et mauresque. Fontaines musicales, pigeons, architecture coloniale française.
                    </li>
                    <li>
                      <strong>Ancienne Médina :</strong> Quartier historique authentique avec ses ruelles étroites, artisans, échoppes traditionnelles. Marché aux puces le dimanche matin.
                    </li>
                    <li>
                      <strong>Parc de la Ligue Arabe :</strong> Plus grand espace vert de Casablanca (30 hectares), palmiers centenaires, allées ombragées, restaurants et cafés. Parking gratuit disponible.
                    </li>
                    <li>
                      <strong>Villa des Arts :</strong> Musée d&apos;art contemporain dans une magnifique villa art déco. Expositions d&apos;artistes marocains et internationaux. Entrée gratuite.
                    </li>
                    <li>
                      <strong>Twin Center :</strong> Tours jumelles emblématiques (28 étages), centre commercial, restaurants panoramiques au sommet. Vue spectaculaire sur toute la ville.
                    </li>
                    <li>
                      <strong>Marché Central :</strong> Marché couvert historique avec fruits, légumes, poissons frais, épices, fleurs. Ambiance authentique casablancaise. Ouvert le matin.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Casablanca</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>Circulation :</strong> Évitez les heures de pointe (8h-10h et 17h-19h30) sur les grands axes comme le Boulevard Zerktouni et l&apos;Avenue des FAR. Le trafic peut être dense en centre-ville.
                  </p>
                  <p>
                    <strong>Stationnement :</strong> Privilégiez les parkings sécurisés (20-30 DH/jour). En voirie, respectez les zones payantes marquées en bleu (gardiens de parking sur place). Prix moyen : 5-10 DH/heure.
                  </p>
                  <p>
                    <strong>Autoroutes :</strong> Casablanca est connectée par autoroute à toutes les grandes villes. Péages électroniques disponibles. Tarifs : Casablanca-Rabat (20 DH), Casablanca-Marrakech (90 DH).
                  </p>
                  <p>
                    <strong>Carburant :</strong> Nombreuses stations-service 24h/24 (Afriquia, Total, Shell). Prix moyen : 13-14 DH/litre pour le gasoil, 15-16 DH/litre pour l&apos;essence sans plomb.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Choisir Benatna pour Louer une Voiture à Casablanca ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison gratuite à l'aéroport Mohammed V",
                    "Sans carte de crédit nécessaire",
                    "Assurance tous risques incluse",
                    "Kilométrage illimité sur tous les véhicules",
                    "Réservation en ligne en 2 minutes",
                    "Service client 24/7 en français et arabe",
                    "Annulation gratuite jusqu'à 48h avant"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Casablanca</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Aéroport Mohammed V</h3>
                          <p className="text-sm text-muted-foreground">Terminal 1 & 2 - Livraison gratuite - Disponible 24h/24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Centre-Ville Casablanca</h3>
                          <p className="text-sm text-muted-foreground">Boulevard Mohamed V - À proximité des hôtels - Horaires flexibles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Quartier Ain Diab</h3>
                          <p className="text-sm text-muted-foreground">Front de mer - Livraison à votre hôtel - Service premium</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Types de Véhicules Disponibles à Casablanca</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>Citadines (Clio, Sandero) :</strong> Parfaites pour la ville, à partir de 150 DH/jour</li>
                    <li><strong>Berlines (Corolla, Jetta) :</strong> Confort et espace, à partir de 250 DH/jour</li>
                    <li><strong>SUV (Duster, Tiguan) :</strong> Polyvalents et spacieux, à partir de 350 DH/jour</li>
                    <li><strong>Véhicules de luxe (Mercedes, BMW) :</strong> Premium et prestigieux, à partir de 800 DH/jour</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Voiture Casablanca</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Quel est le prix moyen pour louer une voiture à Casablanca ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Nos prix commencent à partir de 150 DH/jour pour une citadine. Le prix final dépend du type de véhicule, de la durée de location et de la saison. Tous nos tarifs sont transparents et incluent l&apos;assurance de base.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Peut-on louer une voiture sans carte de crédit à Casablanca ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui ! Chez Benatna, vous pouvez réserver avec une carte de débit ou payer en espèces. Nous sommes l&apos;une des rares plateformes au Maroc à offrir cette flexibilité.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">La livraison à l&apos;aéroport Mohammed V est-elle gratuite ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui, nous offrons la livraison et la récupération gratuites à l&apos;aéroport Mohammed V de Casablanca, 24h/24 et 7j/7. Votre véhicule vous attend dès votre arrivée.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Réservez Maintenant</h3>
                  <div className="space-y-4">
                    <Link to="/louer?city=Casablanca">
                      <Button className="w-full" size="lg">
                        Voir les Véhicules
                      </Button>
                    </Link>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Besoin d&apos;aide ?</p>
                      <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-primary font-semibold hover:underline">
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Autres Villes Populaires</h3>
                  <div className="space-y-2">
                    {['Marrakech', 'Rabat', 'Tanger', 'Agadir', 'Fès'].map(city => (
                      <Link 
                        key={city}
                        to={`/location-voiture-${city.toLowerCase()}`}
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Location voiture {city} →
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Prêt à Louer Votre Voiture à Casablanca ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Rejoignez des milliers de clients satisfaits qui ont choisi Benatna pour leur location de voiture à Casablanca
              </p>
              <Link to="/louer?city=Casablanca">
                <Button size="lg" className="text-lg px-8">
                  Réserver Maintenant
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationVoitureCasablanca;
