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
import { EnhancedAggregateRatingSchema, IndividualReviewsSchema, OpeningHoursSchema } from "@/components/schemas";
import { fesReviews } from "@/data/reviewsData";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import cityFes from "@/assets/city-fes.jpg";

const LocationVoitureFes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Fès | Prix Dès 200 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Fès avec Benatna. Aéroport Saïss, Médina, ville nouvelle. Prix transparents dès 200 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture fes, location auto fes aeroport, louer voiture fes medina, location véhicule fes, rent car fez morocco" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-fes" />
        <meta property="og:title" content="Location de Voiture à Fès | Prix Dès 200 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Fès avec Benatna. Aéroport Saïss, Médina impériale, livraison gratuite. Explorez la capitale spirituelle." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-fes" />
      </Helmet>
      <StructuredData type="rental" />
      <ServiceSchema city="Fès" />
      <HowToSchema city="Fes" />
      <OfferSchema city="Fès" />
      <CityLocalBusinessSchema
        cityName="Fès"
        latitude="34.0331"
        longitude="-5.0003"
        address="Aéroport Fès-Saïss"
        postalCode="30000"
        telephone="+212699024526"
        priceRange="150-750 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Mehdi Tazi',
            location: 'Fès',
            rating: 5,
            comment: 'Très bonne agence ! Prix transparents, pas de frais cachés. La voiture était en parfait état. Je loue régulièrement chez Benatna.',
            date: 'Il y a 2 semaines',
          },
          {
            name: 'Leila Benjelloun',
            location: 'Fès',
            rating: 5,
            comment: 'Parfait pour découvrir Fès et ses environs. Service professionnel.',
            date: 'Il y a 5 jours',
          },
          {
            name: 'Amine Fassi',
            location: 'Fès',
            rating: 5,
            comment: 'Excellent service à Fès. Je recommande sans hésiter !',
            date: 'Il y a 1 semaine',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
        city="Fès"
      />
      
      {/* Schema AggregateRating pour étoiles Google */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Fès"
      />
      <IndividualReviewsSchema
        reviews={fesReviews}
        entityType="LocalBusiness"
        city="Fès"
      />
      <OpeningHoursSchema 
        city="Fès"
        entityType="LocalBusiness"
        address="Aéroport Fès-Saïss"
        latitude="34.0331"
        longitude="-5.0003"
      />
      
      {/* Product Schema véhicules Fès */}
      <VehicleProductSchemas city="Fès" />
      
      <Header />
      <Breadcrumbs />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityFes}
          alt={generateCityImageAlt("Fès")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Fès
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 200 DH/jour • Aéroport Saïss • Médina Impériale
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Fès">
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
                <div className="text-3xl font-bold text-primary mb-2">200 DH</div>
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
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Fès : Capitale Spirituelle du Maroc</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Fès</strong> ? Benatna vous propose le meilleur service de location dans la plus ancienne ville impériale du Maroc. Que vous arriviez à l&apos;aéroport Fès-Saïss, que vous séjourniez dans la Médina ou en ville nouvelle, explorez Fès et ses environs en toute liberté.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Fès</strong> est idéal pour découvrir le patrimoine millénaire de la ville. Plus de 50 véhicules disponibles, des prix clairs dès 200 DH/jour. Visitez les tanneries, la Médina UNESCO, Meknès, Volubilis ou partez vers Chefchaouen !
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Fès ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Fès, berceau de la civilisation marocaine et capitale spirituelle du royaume, est une ville fascinante où cohabitent trois cités distinctes : Fès el-Bali (la vieille médina médiévale), Fès el-Jdid (la ville nouvelle du XIIIe siècle) et la ville moderne construite sous le protectorat français. <strong>Louer une voiture à Fès</strong> devient indispensable pour naviguer entre ces différents quartiers éloignés les uns des autres et pour découvrir les trésors des environs.
                  </p>
                  <p>
                    La médina de Fès el-Bali, plus grande médina médiévale au monde et classée UNESCO, est certes piétonne (vous devrez y laisser votre voiture dans un parking périphérique). Mais une fois votre exploration terminée, votre voiture vous permettra de rejoindre facilement les autres sites : le Palais Royal à Fès el-Jdid, les poteries de Fès el-Jdid, le quartier moderne de Ville Nouvelle avec ses boulevards haussmanniens, ou encore le Borj Nord avec sa vue panoramique sur toute la ville.
                  </p>
                  <p>
                    Fès occupe surtout une position géographique exceptionnelle pour explorer le Nord et le Centre du Maroc. En moins d&apos;une heure, vous atteignez Meknès (60 km), autre ville impériale majestueuse avec ses monumentales portes Bab Mansour. À 30 km, les ruines romaines de Volubilis, site UNESCO parmi les mieux préservés d&apos;Afrique du Nord, vous plongent dans l&apos;histoire antique. Plus loin, Ifrane (65 km), surnommée « la Suisse marocaine », offre un dépaysement total avec son architecture alpine et ses forêts de cèdres où vivent les singes magots. Chefchaouen (200 km, 3h30), la ville bleue du Rif, est également accessible en excursion. Les routes depuis Fès sont excellentes, notamment l&apos;autoroute vers Meknès et la route nationale vers le Moyen-Atlas.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 11 des Lieux à Visiter en Voiture depuis Fès</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Fès</strong>, explorez les trésors du Nord :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Meknès (60 km, 50min) :</strong> Ville impériale UNESCO, monumentale porte Bab Mansour, médina, écuries royales Heri es-Souani (pour 12 000 chevaux !), mausolée Moulay Ismail. Architecture grandiose du XVIIe siècle. Incontournable.
                    </li>
                    <li>
                      <strong>Volubilis (90 km, 1h15) :</strong> Site archéologique romain UNESCO, mosaïques exceptionnelles (Orphée, Bacchus), arc de triomphe, colonnes majestueuses. Mieux préservée cité romaine d&apos;Afrique du Nord. Vue sur le Djebel Zerhoun sacré.
                    </li>
                    <li>
                      <strong>Ifrane (65 km, 1h) :</strong> La Suisse marocaine, architecture alpine, propreté exemplaire, université Al Akhawayn, parc national, station de ski Michliffen (hiver), lion de pierre emblématique. Fraîcheur en été, neige en hiver.
                    </li>
                    <li>
                      <strong>Azrou (75 km, 1h15) :</strong> Ville berbère, forêt de cèdres millénaires (Cèdre Gouraud 800 ans), singes magots apprivoisés, artisanat bois de cèdre, tapis berbères. Altitude 1 250m. Arrêt obligé vers le Sud.
                    </li>
                    <li>
                      <strong>Chefchaouen (200 km, 3h30) :</strong> La perle bleue du Rif, médina entièrement bleue Instagram-friendly, artisanat local, cascades Akchour à proximité, randonnées montagnes Rif. Route panoramique mais longue. Week-end recommandé.
                    </li>
                    <li>
                      <strong>Sefrou (30 km, 35min) :</strong> Petite ville authentique surnommée « jardin du Maroc », ancienne médina juive, cascades en centre-ville, festival des cerises (juin), grottes préhistoriques. Peu touristique, authentique.
                    </li>
                    <li>
                      <strong>Sources thermales Moulay Yacoub (20 km, 25min) :</strong> Station thermale naturelle depuis l&apos;époque romaine, eaux chaudes sulfureuses (54°C), bains publics et hammams modernes, propriétés thérapeutiques reconnues. Détente garantie.
                    </li>
                    <li>
                      <strong>Lac Dayet Aoua (10 km, 15min) :</strong> Petit lac naturel en bordure de forêt, pique-niques, promenades à cheval, café panoramique. Très fréquenté week-ends par familles fassis. Calme en semaine.
                    </li>
                    <li>
                      <strong>Moulay Idriss Zerhoun (80 km, 1h) :</strong> Ville sainte musulmane, mausolée du fondateur premier État marocain, village blanc perché colline sacrée, pèlerinage annuel (moussem). Vue panoramique depuis terrasses.
                    </li>
                    <li>
                      <strong>Barrage Idriss 1er (70 km, 1h) :</strong> Grand lac artificiel, pêche (carpe, black-bass), pique-nique au bord de l&apos;eau, vue sur montagnes Rif. Spot calme week-end nature. Peu développé touristiquement.
                    </li>
                    <li>
                      <strong>Bhalil (30 km, 40min) :</strong> Village berbère troglodyte unique, maisons creusées dans la roche (habitées !), église franciscaine, tapis tissés main, atmosphère hors du temps. Visite guidée maisons recommandée (50 DH).
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Fès et ses Environs</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>Dans Fès :</strong> Médina totalement piétonne (laisser voiture parking Bab Boujeloud, Bab Ftouh : 20 DH/jour). Ville Nouvelle circulation fluide sauf heures pointe Avenue Hassan II. Suivre panneaux « Médina » ou « Ville Nouvelle » selon besoin.
                  </p>
                  <p>
                    <strong>Route Meknès/Volubilis :</strong> Autoroute moderne gratuite vers Meknès (A2). Puis route nationale N13 vers Volubilis bien entretenue. Signalisation claire. Site Volubilis parking 10 DH. Combiner les deux en demi-journée facilement.
                  </p>
                  <p>
                    <strong>Moyen-Atlas (Ifrane, Azrou) :</strong> Route N8 excellente état, paysages spectaculaires. En hiver (décembre-mars) risque neige/verglas sur cols, chaînes recommandées. Stations-service régulières. Singes magots forêt Azrou : ne pas sortir nourriture voiture (ils ouvrent portières !).
                  </p>
                  <p>
                    <strong>Général :</strong> Fès très bien connectée. GPS utile quartiers périphériques. Prix carburant : 13-14 DH/l (gasoil), 15-16 DH/l (essence). Gardiens parking omniprésents (5-10 DH pourboire apprécié). Conduite courtoise, klaxon fréquent mais non agressif.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Fès avec Benatna ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison aéroport Saïss gratuite",
                    "Sans carte de crédit nécessaire",
                    "Parfait circuits impériaux",
                    "Kilométrage illimité",
                    "Idéal visiter Moyen-Atlas",
                    "Véhicules climatisés",
                    "Service client 24/7"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Fès</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Aéroport Fès-Saïss</h3>
                          <p className="text-sm text-muted-foreground">Terminal arrivées - Livraison gratuite - Disponible 24h/24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Ville Nouvelle Fès</h3>
                          <p className="text-sm text-muted-foreground">Avenue Hassan II - Zone moderne - Horaires flexibles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Médina de Fès</h3>
                          <p className="text-sm text-muted-foreground">Livraison à votre riad - Bab Boujeloud - Service premium</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Excursions au Départ de Fès</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>Meknès (60 km) :</strong> Ville impériale, patrimoine UNESCO</li>
                    <li><strong>Volubilis (90 km) :</strong> Ruines romaines spectaculaires</li>
                    <li><strong>Ifrane (65 km) :</strong> La Suisse marocaine, station de ski</li>
                    <li><strong>Chefchaouen (200 km) :</strong> La perle bleue du Rif</li>
                    <li><strong>Sefrou (30 km) :</strong> Ville des cerises, cascades</li>
                    <li><strong>Moyen-Atlas :</strong> Forêts de cèdres, singes magots</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Fès</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Puis-je stationner près de la Médina de Fès ?</h3>
                      <p className="text-sm text-muted-foreground">
                        La Médina de Fès est piétonne. Nous vous conseillons de stationner dans les parkings sécurisés à proximité (Bab Boujeloud, Bab Ftouh) à environ 20 DH/jour. Votre riad pourra vous guider vers le parking le plus proche.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Quel véhicule pour visiter le Moyen-Atlas ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour explorer le Moyen-Atlas et ses routes montagneuses (Ifrane, Azrou, forêts de cèdres), nous recommandons un SUV pour plus de confort et de sécurité. Disponibles à partir de 350 DH/jour.
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
                    <Link to="/louer?city=Fès">
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
                    {['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Agadir'].map(city => (
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
              <h2 className="text-2xl font-bold mb-4">Prêt à Explorer Fès en Voiture ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Découvrez la capitale spirituelle du Maroc avec Benatna
              </p>
              <Link to="/louer?city=Fès">
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

export default LocationVoitureFes;
