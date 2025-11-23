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
import { EnhancedAggregateRatingSchema, IndividualReviewsSchema } from "@/components/schemas";
import { tangerReviews } from "@/data/reviewsData";
import cityTanger from "@/assets/city-tanger.jpg";

const LocationVoitureTanger = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Tanger | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Tanger avec Benatna. Aéroport, port, centre-ville. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture tanger, location auto tanger aeroport, louer voiture tanger port, location véhicule tanger, rent car tangier" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-tanger" />
        <meta property="og:title" content="Location de Voiture à Tanger | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Tanger avec Benatna. Aéroport, port, livraison gratuite. Explorez le détroit de Gibraltar." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-tanger" />
      </Helmet>
      <StructuredData type="rental" />
      <ServiceSchema city="Tanger" />
      <HowToSchema city="Tanger" />
      <OfferSchema city="Tanger" />
      <CityLocalBusinessSchema
        cityName="Tanger"
        latitude="35.7595"
        longitude="-5.8340"
        address="Aéroport Tanger Ibn Battouta"
        postalCode="90000"
        telephone="+212699024526"
        priceRange="150-850 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Karima El Fassi',
            location: 'Tanger',
            rating: 5,
            comment: 'Location ultra simple, voiture nickel et tarifs imbattables. L\'équipe Benatna est top !',
            date: 'Il y a 3 semaines',
          },
          {
            name: 'Rachid Senhaji',
            location: 'Tanger',
            rating: 5,
            comment: 'Parfait pour visiter le Nord du Maroc. Service rapide et efficace.',
            date: 'Il y a 1 semaine',
          },
          {
            name: 'Meryem Chaoui',
            location: 'Tanger',
            rating: 5,
            comment: 'Très contente de mon expérience à Tanger. Je recommande !',
            date: 'Il y a 4 jours',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
        city="Tanger"
      />
      
      {/* Schema AggregateRating pour étoiles Google */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Tanger"
      />
      <IndividualReviewsSchema
        reviews={tangerReviews}
        entityType="LocalBusiness"
        city="Tanger"
      />
      
      <Header />
      <Breadcrumbs />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityTanger}
          alt={generateCityImageAlt("Tanger")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Tanger
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 150 DH/jour • Aéroport & Port • Livraison gratuite
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Tanger">
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
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Tanger : Porte de l&apos;Afrique</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Tanger</strong> ? Benatna vous propose le meilleur service de location dans la perle du Nord. Que vous arriviez par l&apos;aéroport, le port Tanger Med ou le port ville, explorez cette ville cosmopolite et ses environs en toute liberté.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Tanger</strong> se distingue par sa disponibilité 24/7. Plus de 50 véhicules, des prix clairs dès 150 DH/jour. Visitez le Cap Spartel, les grottes d&apos;Hercule, Asilah ou partez explorer Chefchaouen et Tétouan !
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Tanger ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Tanger, ville mythique située au carrefour de l&apos;Europe et de l&apos;Afrique, de l&apos;Atlantique et de la Méditerranée, est une destination fascinante qui mérite d&apos;être explorée bien au-delà de sa médina historique. <strong>Louer une voiture à Tanger</strong> devient vite indispensable pour découvrir les trésors cachés de cette région au patrimoine exceptionnel.
                  </p>
                  <p>
                    La ville elle-même s&apos;étend sur une vaste zone côtière. Le centre historique (Médina, Kasbah) est éloigné des plages modernes comme Plage Malabata ou Achakar. Les quartiers d&apos;affaires comme Tanger City Center et la nouvelle marina sont également excentrés. Sans voiture, vous passeriez votre temps à négocier avec les taxis ou à attendre des transports en commun limités.
                  </p>
                  <p>
                    Mais c&apos;est surtout dans les environs que la voiture devient irremplaçable. À 15 km, le Cap Spartel marque la rencontre spectaculaire entre océan Atlantique et mer Méditerranée, avec son phare emblématique et ses vues panoramiques. Les grottes d&apos;Hercule, site mythologique fascinant, se trouvent à 20 km. Plus loin, Asilah (45 km), charmante ville fortifiée aux murs colorés, Chefchaouen (120 km), la célèbre ville bleue perchée dans le Rif, ou encore Tétouan (60 km) avec sa médina UNESCO, sont autant d&apos;excursions fabuleuses facilement accessibles en voiture. La région du Nord marocain offre des paysages variés : montagnes du Rif, plages sauvages, forêts verdoyantes, villages berbères authentiques.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 11 des Lieux à Visiter en Voiture depuis Tanger</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Tanger</strong>, explorez le Nord marocain :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Cap Spartel (15 km, 25min) :</strong> Point le plus au nord-ouest de l&apos;Afrique, phare historique (1864), vue sur le détroit de Gibraltar et côtes espagnoles par temps clair. Café panoramique. Coucher de soleil magique.
                    </li>
                    <li>
                      <strong>Grottes d&apos;Hercule (20 km, 30min) :</strong> Cavités naturelles en forme de carte d&apos;Afrique, légende mythologique (Hercule s&apos;y reposa), restaurants de poissons à proximité. Site emblématique. Entrée 10 DH.
                    </li>
                    <li>
                      <strong>Chefchaouen (120 km, 2h) :</strong> La perle bleue du Maroc, médina entièrement peinte en bleu, artisanat local, cascades Akchour à proximité. Route montagneuse panoramique à travers le Rif. Incontournable.
                    </li>
                    <li>
                      <strong>Asilah (45 km, 45min) :</strong> Ville fortifiée portugaise, remparts en bord de mer, médina aux fresques murales, festival d&apos;art en été, plages Paradise et Briech. Ambiance bohème.
                    </li>
                    <li>
                      <strong>Tétouan (60 km, 1h) :</strong> Médina UNESCO, architecture andalouse préservée, marché artisanal, école des arts traditionnels. Capitale culturelle du Nord. Moins touristique que Tanger.
                    </li>
                    <li>
                      <strong>Ksar Sghir (35 km, 40min) :</strong> Petit port de pêche authentique, vestiges de forteresse portugaise, plage familiale tranquille, restaurants de poissons frais. Hors des sentiers battus.
                    </li>
                    <li>
                      <strong>Cabo Negro (25 km, 30min) :</strong> Station balnéaire chic entre Tétouan et M&apos;diq, marina, plage de sable fin, golfs, villas luxueuses. Activités nautiques. Calme et raffiné.
                    </li>
                    <li>
                      <strong>Forêt Rmilate (40 km, 50min) :</strong> Forêt méditerranéenne dense, randonnées pédestres, aires de pique-nique, singes magots parfois visibles. Échappée nature fraîche en été.
                    </li>
                    <li>
                      <strong>Plage Sidi Kacem (12 km, 20min) :</strong> Grande plage populaire des Tangérois, sports nautiques, cafés en bord de mer, surf. Animations le week-end. Parking gratuit.
                    </li>
                    <li>
                      <strong>Village d&apos;Achakar (20 km, 25min) :</strong> Plages sauvages et préservées (Dragons, Dalia), caps rocheux, vue sur détroit, restaurants panoramiques. Idéal baignades tranquilles.
                    </li>
                    <li>
                      <strong>Martil (70 km, 1h15) :</strong> Station balnéaire familiale, longue plage de sable, corniche animée, cafés et restaurants. Très fréquentée l&apos;été par familles marocaines.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Tanger</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>Centre-ville :</strong> Circulation dense autour de la Grand Socco et du port. Médina piétonne - parkings recommandés : Parking Ibn Batouta, Parking Zoco Alto (15-20 DH/jour). Quartiers modernes (Malabata, Boukhalef) bien desservis.
                  </p>
                  <p>
                    <strong>Routes côtières :</strong> Corniche magnifique mais route sinueuse jusqu&apos;au Cap Spartel. Conduite prudente recommandée. Nombreux points de vue pour s&apos;arrêter et photographier. Respect des limitations (60-80 km/h).
                  </p>
                  <p>
                    <strong>Chefchaouen :</strong> Route de montagne avec virages serrés mais bien entretenue (RN2). Vues spectaculaires sur le Rif. Prévoir 2h minimum. SUV recommandé en hiver (risque neige). Stations-service régulières.
                  </p>
                  <p>
                    <strong>Pour Européens :</strong> Conduite à droite comme en Europe. Permis européen accepté. Attention aux piétons traversant hors passages. Klaxon utilisé fréquemment (pas d&apos;agressivité). Prix essence : 15-16 DH/l.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Tanger avec Benatna ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison aéroport & port gratuite",
                    "Sans carte de crédit nécessaire",
                    "Idéal voyageurs depuis l'Europe",
                    "Kilométrage illimité",
                    "Service 24/7 (port & aéroport)",
                    "Véhicules récents",
                    "Assurance tous risques disponible"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Tanger</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Aéroport Ibn Batouta</h3>
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
                          <h3 className="font-semibold mb-1">Port Tanger Ville</h3>
                          <p className="text-sm text-muted-foreground">Terminal ferry - Arrivée depuis Tarifa/Algésiras - Service 24/7</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Centre-Ville Tanger</h3>
                          <p className="text-sm text-muted-foreground">Boulevard Pasteur - Médina - Horaires flexibles</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Excursions au Départ de Tanger</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>Cap Spartel (15 km) :</strong> Où l&apos;Atlantique rencontre la Méditerranée</li>
                    <li><strong>Grottes d&apos;Hercule (20 km) :</strong> Site mythologique spectaculaire</li>
                    <li><strong>Asilah (45 km) :</strong> Ville côtière fortifiée et ses murailles</li>
                    <li><strong>Chefchaouen (120 km) :</strong> La perle bleue du Maroc</li>
                    <li><strong>Tétouan (60 km) :</strong> Médina UNESCO, capitale du Nord</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Tanger</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Puis-je récupérer ma voiture au port de Tanger ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui ! Nous proposons la livraison gratuite au port Tanger Ville, idéal si vous arrivez en ferry depuis l&apos;Espagne (Tarifa, Algésiras). Service disponible 24/7.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Mon permis européen est-il valable à Tanger ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui, votre permis de conduire européen est accepté au Maroc. Un permis international est recommandé mais pas obligatoire pour la plupart des pays européens.
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
                    <Link to="/louer?city=Tanger">
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
                    {['Casablanca', 'Marrakech', 'Rabat', 'Agadir', 'Fès'].map(city => (
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
              <h2 className="text-2xl font-bold mb-4">Prêt à Explorer Tanger en Voiture ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Découvrez la porte de l&apos;Afrique avec Benatna
              </p>
              <Link to="/louer?city=Tanger">
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

export default LocationVoitureTanger;
