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
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { CallButton } from "@/components/CallButton";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { SITE_STATS } from "@/data/siteStats";
import { generateCityImageAlt } from "@/utils/seoHelpers";
import { HreflangTags } from "@/utils/hreflangHelper";
import { 
  EnhancedAggregateRatingSchema, 
  PriceRangeOfferSchema, 
  FAQSchemaEnriched,
  MultiLocationSchema,
  OpeningHoursSchema
} from "@/components/schemas";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import cityMarrakech from "@/assets/city-marrakech.jpg";

const LocationVoitureMarrakech = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de voiture à Marrakech | Benatna – Loueurs locaux</title>
        <meta name="description" content="Location de voiture à Marrakech avec Benatna. Aéroport Menara, Médina, Guéliz. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture marrakech, location auto marrakech aeroport, louer voiture marrakech pas cher, location véhicule marrakech, rent car marrakech menara" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-marrakech" />
        <meta property="og:title" content="Location de Voiture à Marrakech | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Marrakech avec Benatna. Aéroport Menara, Médina, Guéliz, livraison gratuite. Prix transparents, sans surprises." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-marrakech" />
      </Helmet>
      <HreflangTags path="/location-voiture-marrakech" />
      <StructuredData type="rental" />
      <ServiceSchema city="Marrakech" />
      <HowToSchema city="Marrakech" />
      <OfferSchema city="Marrakech" />
      <CityLocalBusinessSchema
        cityName="Marrakech"
        latitude="31.6295"
        longitude="-7.9811"
        address="Aéroport Marrakech Menara"
        postalCode="40000"
        priceRange="150-900 MAD"
      />
      
      {/* Only aggregate rating schema - uses SITE_STATS via BUSINESS_INFO */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Marrakech"
      />
      
      {/* Schema Prix pour affichage dans Google */}
      <PriceRangeOfferSchema 
        minPrice="150"
        maxPrice="900"
        city="Marrakech"
        discount={{ percentage: 10, minDays: 30 }}
      />
      
      {/* Multi-Location pour SEO local */}
      <MultiLocationSchema 
        locations={[
          {
            name: "Aéroport Marrakech-Ménara",
            address: "Aéroport Marrakech-Ménara, Hall Arrivées",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6069",
            longitude: "-8.0363",
            description: "Point de retrait principal à l'aéroport de Marrakech, disponible 24/7 avec service express."
          },
          {
            name: "Place Jemaa El-Fna",
            address: "Place Jemaa El-Fna, Médina",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6259",
            longitude: "-7.9893",
            description: "Point de retrait en plein cœur de la médina, idéal pour les touristes."
          },
          {
            name: "Guéliz Centre-ville",
            address: "Avenue Mohammed V, Guéliz",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6295",
            longitude: "-7.9811",
            description: "Agence au centre du quartier moderne de Guéliz, proche des commerces."
          }
        ]}
      />
      
      {/* Opening Hours Schema pour Google Maps */}
      <OpeningHoursSchema 
        city="Marrakech"
        entityType="LocalBusiness"
        address="Aéroport Marrakech-Ménara"
        latitude="31.6069"
        longitude="-8.0363"
      />
      
      {/* Product Schema véhicules Marrakech */}
      <VehicleProductSchemas city="Marrakech" />
      
      {/* FAQ Schema pour Rich Snippets */}
      <FAQSchemaEnriched 
        pageName="Location de Voiture à Marrakech"
        faqs={[
          {
            question: "Quel est le prix de la location de voiture à Marrakech ?",
            answer: "Les tarifs démarrent à 150 DH/jour pour une voiture économique à Marrakech. Réductions longue durée : -5% dès 7 jours, -10% dès 30 jours. Assurance tous risques incluse."
          },
          {
            question: "Peut-on louer une voiture à l'aéroport de Marrakech ?",
            answer: "Oui, nous proposons un service de livraison gratuite à l'aéroport Marrakech-Ménara 24/7. Votre véhicule vous attend dès votre arrivée au hall des arrivées."
          },
          {
            question: "Est-ce possible de louer sans carte de crédit à Marrakech ?",
            answer: "Absolument ! Chez Benatna, la location sans carte de crédit est notre spécialité. Paiement en espèces, virement ou carte bancaire classique accepté."
          },
          {
            question: "Quels sont les meilleurs endroits à visiter en voiture depuis Marrakech ?",
            answer: "Depuis Marrakech, vous pouvez facilement rejoindre Essaouira (2h30), la vallée de l'Ourika (1h), le désert d'Agafay (45min) et les cascades d'Ouzoud (2h30) avec votre voiture de location."
          },
          {
            question: "L'assurance est-elle obligatoire pour louer une voiture à Marrakech ?",
            answer: "Oui, l'assurance est obligatoire et INCLUSE dans tous nos tarifs. Vous bénéficiez d'une couverture tous risques avec franchise réduite, sans frais supplémentaires."
          }
        ]}
      />
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityMarrakech}
          alt={generateCityImageAlt("Marrakech")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Marrakech
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 150 DH/jour • Aéroport Menara • Livraison gratuite
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Marrakech">
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
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Marrakech : Guide Complet 2025</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Marrakech</strong> ? Benatna vous propose le plus grand choix de véhicules dans la ville ocre. Que vous arriviez à l&apos;aéroport Marrakech-Menara, que vous séjourniez dans la Médina ou au quartier Guéliz, nous avons la solution parfaite pour explorer Marrakech et ses environs.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Marrakech</strong> se distingue par sa simplicité et sa transparence. Plus de 50 véhicules disponibles, des prix clairs dès 150 DH/jour, et une réservation en 2 minutes. Partez à la découverte des jardins Majorelle, de la place Jemaa el-Fna, de l&apos;Atlas ou du désert d&apos;Agafay en toute liberté !
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Marrakech ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Marrakech, perle du Sud marocain, est bien plus qu&apos;une simple ville touristique : c&apos;est une porte d&apos;entrée vers des paysages exceptionnels. <strong>Louer une voiture à Marrakech</strong> transforme complètement votre expérience de voyage. La ville elle-même s&apos;étend largement au-delà de la Médina historique, avec des quartiers modernes comme Guéliz et l&apos;Hivernage, ainsi que des attractions éloignées comme les jardins de la Palmeraie (8 km du centre).
                  </p>
                  <p>
                    Mais surtout, c&apos;est dans les alentours que la magie opère vraiment. À moins d&apos;une heure de route, vous accédez à la vallée de l&apos;Ourika avec ses cascades rafraîchissantes et ses villages berbères authentiques, au désert d&apos;Agafay qui offre des paysages lunaires spectaculaires, ou encore aux contreforts du Haut Atlas. Sans voiture, ces merveilles restent difficiles d&apos;accès et nécessitent des tours organisés coûteux avec horaires imposés.
                  </p>
                  <p>
                    Avec votre propre véhicule, vous partez quand vous voulez, vous vous arrêtez où vous voulez, et vous explorez à votre rythme. Vous pouvez facilement rejoindre Essaouira (180 km, 2h30) pour une journée au bord de l&apos;Atlantique, ou pousser jusqu&apos;à Ait Ben Haddou (190 km, 3h30), la célèbre kasbah classée UNESCO. Les routes marocaines autour de Marrakech sont en excellent état, bien signalisées, et offrent des panoramas à couper le souffle.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 12 des Lieux à Visiter en Voiture depuis Marrakech</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Marrakech</strong>, explorez ces destinations incontournables :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Vallée de l&apos;Ourika (60 km, 1h) :</strong> Villages berbères en terrasses, cascades de Setti Fatma, restaurants au bord de la rivière. Route panoramique magnifique. Idéal en été pour la fraîcheur.
                    </li>
                    <li>
                      <strong>Essaouira (180 km, 2h30) :</strong> Ville côtière fortifiée UNESCO, médina blanche et bleue, port de pêche animé, plages de surf. Spécialités fruits de mer. Parfait pour un week-end.
                    </li>
                    <li>
                      <strong>Désert d&apos;Agafay (40 km, 45min) :</strong> Paysages désertiques lunaires à deux pas de Marrakech. Camps de luxe, balades à dromadaire, couchers de soleil spectaculaires. Route accessible en citadine.
                    </li>
                    <li>
                      <strong>Cascades d&apos;Ouzoud (150 km, 2h30) :</strong> Les plus belles cascades du Maroc (110m de haut), singes magots, restaurants panoramiques, baignade possible. Incontournable en été.
                    </li>
                    <li>
                      <strong>Ait Ben Haddou (190 km, 3h30) :</strong> Kasbah fortifiée UNESCO, décor de Game of Thrones et Gladiator. Route du col Tizi n&apos;Tichka (2 260m d&apos;altitude) avec vues époustouflantes sur l&apos;Atlas.
                    </li>
                    <li>
                      <strong>Lac Lalla Takerkoust (40 km, 50min) :</strong> Lac artificiel au pied de l&apos;Atlas, restaurants flottants, sports nautiques, vue sur les montagnes enneigées (hiver). Atmosphère paisible.
                    </li>
                    <li>
                      <strong>Vallée du Zat (70 km, 1h30) :</strong> Vallée secrète avec villages traditionnels, arganiers, vergers, vue sur le Jbel Toubkal (4 167m). Route moins fréquentée que l&apos;Ourika.
                    </li>
                    <li>
                      <strong>Jardins de la Palmeraie (8 km, 15min) :</strong> Oasis de 15 000 palmiers, circuits quad et buggy, golfs, hôtels de luxe. Échappée nature à deux pas de la ville.
                    </li>
                    <li>
                      <strong>Barrage Moulay Hassan (85 km, 1h30) :</strong> Grand lac de retenue, pêche, pique-nique, villages alentours. Cadre montagnard apaisant. Route panoramique.
                    </li>
                    <li>
                      <strong>Amizmiz (55 km, 1h15) :</strong> Ville berbère authentique, souk hebdomadaire le mardi (le plus grand de la région), artisanat local, tapis berbères. Peu touristique.
                    </li>
                    <li>
                      <strong>Ouirgane (60 km, 1h15) :</strong> Village de montagne, randonnées dans le Parc National du Toubkal, auberges de charme, cuisine du terroir. Point de départ pour trek atlas.
                    </li>
                    <li>
                      <strong>Sidi Kaouki (200 km, 3h) :</strong> Village de surf hippie chic près d&apos;Essaouira, plages sauvages, camps bohèmes, école de surf. Ambiance décontractée.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Marrakech</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>En ville :</strong> La circulation à Marrakech peut être dense, surtout autour de la place Jemaa el-Fna et dans Guéliz. Soyez vigilants aux scooters et vélos. Les ronds-points sont nombreux - priorité à droite sauf indication contraire.
                  </p>
                  <p>
                    <strong>Stationnement :</strong> La Médina est piétonne. Parkings recommandés : Jemaa el-Fna (15 DH/h), Bab Doukkala, Parking Koutoubia. Gardiens de parking omniprésents (5-10 DH pourboire apprécié).
                  </p>
                  <p>
                    <strong>Routes montagneuses :</strong> Pour l&apos;Atlas (Ourika, Ouzoud, Ait Ben Haddou), les routes sont sinueuses mais bien entretenues. Un SUV est recommandé pour plus de confort. Vérifiez la météo en hiver (neige possible sur les cols).
                  </p>
                  <p>
                    <strong>Distances :</strong> GPS indispensable pour les villages reculés. Prévoyez eau et snacks pour les longues routes. Stations-service régulières sur les axes principaux. Prix carburant : 13-14 DH/l (gasoil), 15-16 DH/l (essence).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Choisir Benatna pour Louer une Voiture à Marrakech ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison gratuite à l'aéroport Menara",
                    "Sans carte de crédit nécessaire",
                    "Assurance tous risques incluse",
                    "Kilométrage illimité sur tous les véhicules",
                    "Réservation en ligne en 2 minutes",
                    "Service client 24/7 en français et arabe",
                    "Véhicules récents et bien entretenus"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Marrakech</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Aéroport Marrakech-Menara</h3>
                          <p className="text-sm text-muted-foreground">Terminal principal - Livraison gratuite - Disponible 24h/24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Guéliz - Centre Ville</h3>
                          <p className="text-sm text-muted-foreground">Avenue Mohammed V - À proximité des hôtels - Horaires flexibles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Médina de Marrakech</h3>
                          <p className="text-sm text-muted-foreground">Livraison à votre riad - Service premium - Proximité Jemaa el-Fna</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Excursions au Départ de Marrakech en Voiture</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre voiture de location, explorez les merveilles autour de Marrakech :
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Vallée de l&apos;Ourika (60 km) :</strong> Cascades, villages berbères et paysages montagneux</li>
                    <li><strong>Essaouira (180 km) :</strong> Ville côtière fortifiée, parfaite pour un week-end</li>
                    <li><strong>Désert d&apos;Agafay (40 km) :</strong> Paysages désertiques à 30 minutes de Marrakech</li>
                    <li><strong>Ouzoud (150 km) :</strong> Les plus belles cascades du Maroc</li>
                    <li><strong>Ait Ben Haddou (190 km) :</strong> Kasbah classée UNESCO, décor de Game of Thrones</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Voiture Marrakech</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Quel est le prix pour louer une voiture à Marrakech ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Nos prix commencent à partir de 150 DH/jour pour une citadine. Le prix varie selon le type de véhicule (citadine, SUV, berline) et la durée de location. Tous nos tarifs incluent l&apos;assurance de base et le kilométrage illimité.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">La livraison à l&apos;aéroport Menara est-elle gratuite ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui, nous offrons la livraison et la récupération gratuites à l&apos;aéroport Marrakech-Menara, 24h/24. Votre véhicule vous attend dès votre arrivée au terminal.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Puis-je aller dans l&apos;Atlas avec une voiture de location ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui ! Pour les routes montagneuses de l&apos;Atlas, nous recommandons un SUV ou un 4x4 pour plus de confort et de sécurité. Ces véhicules sont parfaits pour explorer la vallée de l&apos;Ourika ou aller jusqu&apos;à Ait Ben Haddou.
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
                    <Link to="/louer?city=Marrakech">
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
                    {['Casablanca', 'Rabat', 'Tanger', 'Agadir', 'Fès'].map(city => (
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
              <h2 className="text-2xl font-bold mb-4">Prêt à Explorer Marrakech en Voiture ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Rejoignez des milliers de voyageurs qui ont choisi Benatna pour leur location de voiture à Marrakech
              </p>
              <Link to="/louer?city=Marrakech">
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

export default LocationVoitureMarrakech;
