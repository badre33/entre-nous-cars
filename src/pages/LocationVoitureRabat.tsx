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
import { SITE_STATS } from "@/data/siteStats";
import { generateCityImageAlt } from "@/utils/seoHelpers";
import { EnhancedAggregateRatingSchema, IndividualReviewsSchema, OpeningHoursSchema } from "@/components/schemas";
import { rabatReviews } from "@/data/reviewsData";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import cityRabat from "@/assets/city-rabat.jpg";

const LocationVoitureRabat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Rabat | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Rabat avec Benatna. Capitale du Maroc, centre-ville, gare. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture rabat, location auto rabat centre ville, louer voiture rabat pas cher, location véhicule capitale maroc, rent car rabat" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-rabat" />
        <meta property="og:title" content="Location de Voiture à Rabat | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Rabat avec Benatna. Centre-ville, gare, livraison gratuite. Prix transparents, capitale du Maroc." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-rabat" />
      </Helmet>
      <StructuredData type="rental" />
      <ServiceSchema city="Rabat" />
      <HowToSchema city="Rabat" />
      <OfferSchema city="Rabat" />
      <CityLocalBusinessSchema
        cityName="Rabat"
        latitude="33.9716"
        longitude="-6.8498"
        address="Aéroport Rabat-Salé"
        postalCode="10000"
        telephone="+212699024526"
        priceRange="150-800 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Youssef Alami',
            location: 'Rabat',
            rating: 5,
            comment: 'Excellente expérience du début à la fin. L\'assistance client est réactive et professionnelle. J\'ai eu un surclassement gratuit vers un SUV.',
            date: 'Il y a 5 jours',
          },
          {
            name: 'Nadia Tahiri',
            location: 'Rabat',
            rating: 5,
            comment: 'Service impeccable à Rabat. Livraison à l\'heure et voiture en excellent état.',
            date: 'Il y a 1 semaine',
          },
          {
            name: 'Omar Benjelloun',
            location: 'Rabat',
            rating: 5,
            comment: 'Très professionnel. Je recommande pour la location à Rabat.',
            date: 'Il y a 10 jours',
          },
        ]}
        averageRating={SITE_STATS.ratingAverage}
        totalReviews={SITE_STATS.ratingCount}
        city="Rabat"
      />
      
      {/* Schema AggregateRating pour étoiles Google */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Rabat"
      />
      <IndividualReviewsSchema
        reviews={rabatReviews}
        entityType="LocalBusiness"
        city="Rabat"
      />
      <OpeningHoursSchema 
        city="Rabat"
        entityType="LocalBusiness"
        address="Aéroport Rabat-Salé"
        latitude="34.0331"
        longitude="-6.7519"
      />
      
      {/* Product Schema véhicules Rabat */}
      <VehicleProductSchemas city="Rabat" />
      
      <Header />
      <Breadcrumbs />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityRabat}
          alt={generateCityImageAlt("Rabat")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Rabat
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 150 DH/jour • Capitale du Maroc • Livraison gratuite
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Rabat">
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


      <main className="flex-1 py-12">
        <div className="container px-4">
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

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Rabat : Capitale du Maroc</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Rabat</strong> ? Benatna vous propose le meilleur service de location dans la capitale administrative du Maroc. Que vous soyez en déplacement professionnel ou touristique, explorez Rabat et ses environs en toute liberté.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Rabat</strong> se distingue par sa simplicité et sa transparence. Plus de 50 véhicules disponibles, des prix clairs dès 150 DH/jour. Visitez la Tour Hassan, le Mausolée Mohammed V, la Kasbah des Oudayas ou partez en excursion vers Casablanca ou Meknès !
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Rabat ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Rabat, capitale politique et administrative du Royaume du Maroc, est une ville moderne et verdoyante qui allie harmonieusement patrimoine historique et développement contemporain. <strong>Louer une voiture à Rabat</strong> vous permet d&apos;optimiser vos déplacements dans cette ville étendue où les points d&apos;intérêt sont dispersés : des institutions gouvernementales d&apos;Agdal aux plages de Salé, de la médina historique aux quartiers résidentiels de Souissi.
                  </p>
                  <p>
                    Pour les voyageurs d&apos;affaires, la voiture est quasiment indispensable à Rabat. Les ministères, ambassades et sièges d&apos;entreprises sont répartis dans toute la ville, et les réunions professionnelles nécessitent souvent de traverser plusieurs quartiers. Les taxis peuvent être difficiles à trouver aux heures de pointe, et le tramway, bien qu&apos;efficace, ne dessert pas tous les quartiers d&apos;affaires.
                  </p>
                  <p>
                    Rabat offre également une position géographique stratégique pour explorer le nord du Maroc. En moins de deux heures, vous pouvez rejoindre Casablanca (90 km), Meknès (140 km) ou Asilah (100 km). La route vers Chefchaouen (250 km), la fameuse ville bleue, traverse des paysages magnifiques du Rif. Le réseau routier depuis Rabat est excellent, avec des autoroutes modernes et une signalisation claire. De plus, le trafic est généralement plus fluide qu&apos;à Casablanca, ce qui rend la conduite agréable et peu stressante.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 10 des Lieux à Visiter en Voiture à Rabat</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Rabat</strong>, découvrez les trésors de la capitale :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Kasbah des Oudayas :</strong> Forteresse du XIIe siècle avec ruelles bleues et blanches, vue panoramique sur l&apos;océan et l&apos;embouchure du Bouregreg. Café maure authentique avec thé à la menthe. Parking à proximité.
                    </li>
                    <li>
                      <strong>Tour Hassan et Mausolée Mohammed V :</strong> Monument emblématique de Rabat, minaret inachevé de 44m, colonnes romaines, architecture mauresque majestueuse. Site classé UNESCO. Parking gratuit disponible.
                    </li>
                    <li>
                      <strong>Chellah :</strong> Nécropole mérinide et site romain antique (Sala Colonia), jardins luxuriants, cigognes nichant sur les ruines. Ambiance paisible. Entrée 70 DH. Parking à l&apos;entrée.
                    </li>
                    <li>
                      <strong>Médina de Rabat :</strong> Souk traditionnel authentique moins touristique que Marrakech, Souk Sebbat (artisanat), Rue des Consuls (bijoux, tapis). Architecture andalouse. Parkings en périphérie.
                    </li>
                    <li>
                      <strong>Palais Royal :</strong> Résidence officielle du Roi (non visitable), architecture impressionnante, gardes à cheval en costume traditionnel. Place du Mechouar. Photos autorisées de l&apos;extérieur.
                    </li>
                    <li>
                      <strong>Plage de Rabat :</strong> Longue plage familiale, surf, restaurants de poissons grillés, corniche animée le week-end. Accès facile en voiture. Parkings payants (10 DH).
                    </li>
                    <li>
                      <strong>Jardins d&apos;Essais Botaniques :</strong> Plus de 650 espèces végétales, jardins français, japonais, andalou. Oasis de calme de 17 hectares. Parfait pour pique-nique. Entrée gratuite.
                    </li>
                    <li>
                      <strong>Musée Mohammed VI d&apos;Art Moderne :</strong> Architecture contemporaine, collections d&apos;art moderne marocain et africain, expositions temporaires. Quartier Hay Riad. Parking sur place.
                    </li>
                    <li>
                      <strong>Forêt de Maâmora :</strong> Plus grande forêt de chênes-lièges au monde (130 000 ha), pistes cyclables, aires de pique-nique. À 20 km de Rabat. Échappée nature.
                    </li>
                    <li>
                      <strong>Marina Bouregreg :</strong> Port de plaisance moderne, restaurants chics, promenade le long du fleuve, vue sur Salé. Animations culturelles. Parking sécurisé.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Rabat</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>Circulation :</strong> Rabat est moins chaotique que Casablanca. Heures de pointe à éviter : 8h-9h30 et 17h-18h30 sur les grands axes (Avenue Mohammed V, Avenue Hassan II). Le tramway partage certaines voies, respectez les feux tricolores spécifiques.
                  </p>
                  <p>
                    <strong>Stationnement :</strong> Zones bleues payantes en centre-ville (5 DH/heure). Parkings souterrains : Avenue Allal Ben Abdellah, Bab El Had (20-30 DH/jour). Les gardiens informels vous aident à vous garer moyennant pourboire (5-10 DH).
                  </p>
                  <p>
                    <strong>Quartiers d&apos;affaires :</strong> Agdal et Hay Riad concentrent ministères et entreprises. Circulation fluide mais stationnement limité. Prévoyez d&apos;arriver 15 minutes en avance pour trouver une place.
                  </p>
                  <p>
                    <strong>Routes vers autres villes :</strong> Autoroute A1 vers Casablanca (péage 20 DH), A2 vers Tanger (péage 70 DH). Routes nationales bien entretenues. GPS recommandé pour quartiers périphériques.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Rabat avec Benatna ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison gratuite en centre-ville",
                    "Sans carte de crédit nécessaire",
                    "Parfait pour déplacements professionnels",
                    "Kilométrage illimité",
                    "Réservation instantanée",
                    "Service client 24/7",
                    "Véhicules récents et confortables"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Rabat</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Gare Rabat-Ville</h3>
                          <p className="text-sm text-muted-foreground">Centre-ville - Accessible TGV - Horaires flexibles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Centre-Ville Rabat</h3>
                          <p className="text-sm text-muted-foreground">Avenue Mohammed V - Quartier administratif - Service premium</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Quartier Agdal</h3>
                          <p className="text-sm text-muted-foreground">Livraison à votre hôtel - Zone résidentielle</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Excursions au Départ de Rabat</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>Casablanca (90 km) :</strong> Capitale économique, mosquée Hassan II</li>
                    <li><strong>Meknès (140 km) :</strong> Ville impériale, patrimoine UNESCO</li>
                    <li><strong>Chefchaouen (250 km) :</strong> La perle bleue du Rif</li>
                    <li><strong>Asilah (100 km) :</strong> Ville côtière fortifiée</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Rabat</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Proposez-vous des tarifs préférentiels pour déplacements professionnels ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui ! Nous offrons des tarifs dégressifs pour les locations de moyenne et longue durée, parfaits pour les déplacements professionnels à Rabat. Contactez-nous pour un devis personnalisé.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Puis-je récupérer ma voiture à la gare de Rabat ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Absolument ! Nous proposons la livraison gratuite à la gare Rabat-Ville. Idéal si vous arrivez par TGV depuis Casablanca ou Tanger.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Réservez Maintenant</h3>
                  <div className="space-y-4">
                    <Link to="/louer?city=Rabat">
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
                    {['Casablanca', 'Marrakech', 'Tanger', 'Agadir', 'Fès'].map(city => (
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

          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
            <CardContent className="pt-6 text-center">
              <h2 className="text-2xl font-bold mb-4">Prêt à Louer Votre Voiture à Rabat ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Explorez la capitale du Maroc avec Benatna
              </p>
              <Link to="/louer?city=Rabat">
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

export default LocationVoitureRabat;
