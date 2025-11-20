import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Phone } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { CityLocalBusinessSchema } from "@/components/CityLocalBusinessSchema";
import { ReviewsSchema } from "@/components/ReviewsSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { generateCityImageAlt } from "@/utils/seoHelpers";
import cityAgadir from "@/assets/city-agadir.jpg";

const LocationVoitureAgadir = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Agadir | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Agadir avec Benatna. Aéroport Al Massira, corniche, plages. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture agadir, location auto agadir aeroport, louer voiture agadir corniche, location véhicule agadir plage, rent car agadir" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-agadir" />
        <meta property="og:title" content="Location de Voiture à Agadir | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Agadir avec Benatna. Aéroport Al Massira, corniche, livraison gratuite. Explorez le Sud du Maroc." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-agadir" />
      </Helmet>
      <StructuredData type="rental" />
      <ServiceSchema city="Agadir" />
      <HowToSchema city="Agadir" />
      <CityLocalBusinessSchema
        cityName="Agadir"
        latitude="30.4278"
        longitude="-9.5981"
        address="Aéroport Agadir Al Massira"
        postalCode="80000"
        telephone="+212699024526"
        priceRange="150-900 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Ahmed Benkirane',
            location: 'Agadir',
            rating: 5,
            comment: 'Super expérience à Agadir. Voiture idéale pour la plage et les excursions.',
            date: 'Il y a 2 jours',
          },
          {
            name: 'Salma Ouazzani',
            location: 'Agadir',
            rating: 5,
            comment: 'Service au top ! Livraison à l\'aéroport Al Massira impeccable.',
            date: 'Il y a 1 semaine',
          },
          {
            name: 'Khalid Moussaoui',
            location: 'Agadir',
            rating: 5,
            comment: 'Excellent rapport qualité-prix pour Agadir. Je recommande vivement.',
            date: 'Il y a 2 semaines',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
        city="Agadir"
      />
      <Header />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityAgadir}
          alt={generateCityImageAlt("Agadir")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Location de Voiture à Agadir
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Prix transparents dès 150 DH/jour • Aéroport Al Massira • Corniche
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Agadir">
                <Button size="lg" className="text-lg px-8">
                  Réserver Maintenant
                </Button>
              </Link>
              <a href="tel:+212699024526">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                  <Phone className="mr-2 h-5 w-5" />
                  Appeler
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-muted/30 border-b">
        <div className="container px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/louer" className="hover:text-foreground">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Agadir</span>
          </nav>
        </div>
      </div>

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
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Agadir : Capitale du Sud</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Agadir</strong> ? Benatna vous propose le meilleur service de location dans la perle du Sud. Que vous arriviez à l&apos;aéroport Al Massira, que vous séjourniez sur la corniche ou dans le centre-ville, explorez Agadir et le Sud du Maroc en toute liberté.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Agadir</strong> est idéal pour profiter des plages, du soleil et des excursions. Plus de 50 véhicules disponibles, des prix clairs dès 150 DH/jour. Visitez Paradise Valley, Taghazout, Essaouira ou partez explorer l&apos;Anti-Atlas !
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Agadir ?</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Agadir, destination balnéaire phare du Maroc avec ses 300 jours de soleil par an et ses 10 km de plages de sable fin, attire chaque année des centaines de milliers de visiteurs en quête de détente et d&apos;évasion. <strong>Louer une voiture à Agadir</strong> transforme radicalement votre séjour en vous offrant une liberté totale pour explorer cette région exceptionnelle du Sud marocain.
                  </p>
                  <p>
                    Agadir elle-même s&apos;étend largement : de la corniche touristique avec ses hôtels resort au quartier populaire de Talborjt avec son souk animé, du port de pêche au nouveau quartier moderne de Founty. Se déplacer en taxi peut vite devenir fastidieux et coûteux pour visiter la ville, surtout si vous voulez vous rendre plusieurs fois par jour à la plage depuis votre hôtel.
                  </p>
                  <p>
                    Mais c&apos;est vraiment dans les alentours qu&apos;Agadir révèle ses plus beaux trésors. À seulement 35 km, Paradise Valley offre des piscines naturelles paradisiaques nichées dans des gorges rocheuses spectaculaires - un joyau accessible uniquement en voiture. Taghazout, à 20 km au nord, est devenu un spot de surf mondialement reconnu avec une ambiance bohème incomparable. Plus loin, vous pouvez rejoindre Essaouira (180 km) pour une escapade côtière, explorer les villages berbères authentiques de l&apos;Anti-Atlas, découvrir Tiznit la ville de l&apos;argent (90 km), ou encore Taroudant (85 km), surnommée « la grand-mère de Marrakech ». Les routes du Sud marocain sont excellentes, bien signalisées, et les paysages sont à couper le souffle : arganiers, palmiers, kasbahs ocres, montagnes arides.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Top 12 des Lieux à Visiter en Voiture depuis Agadir</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Avec votre <strong>voiture de location à Agadir</strong>, découvrez le Sud marocain :
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <strong>Paradise Valley (35 km, 45min) :</strong> Oasis verdoyante avec piscines naturelles d&apos;eau turquoise, palmiers, gorges rocheuses spectaculaires. Randonnée facile, baignade rafraîchissante. Incontournable en été. Route derniers km non goudronnée (SUV recommandé).
                    </li>
                    <li>
                      <strong>Taghazout (20 km, 25min) :</strong> Village de surf hippie-chic, spot de renommée mondiale, école de surf, cafés bohèmes, murales street art. Plages Hash Point, Anchor Point, Killer Point. Ambiance décontractée internationale.
                    </li>
                    <li>
                      <strong>Essaouira (180 km, 2h30) :</strong> Ville fortifiée UNESCO en bord d&apos;Atlantique, médina blanche et bleue, port de pêche animé, galeries d&apos;art, restaurants fruits de mer. Capitale africaine du vent (kitesurf). Week-end idéal.
                    </li>
                    <li>
                      <strong>Taroudant (85 km, 1h15) :</strong> La petite Marrakech du Sud, remparts ocres majestueux, souks authentiques (épices, argent, tapis), place Assarag, jardins Salam. Moins touristique. Architecture berbère préservée.
                    </li>
                    <li>
                      <strong>Tiznit (90 km, 1h15) :</strong> Ville fortifiée, capitale marocaine de l&apos;argent, bijouterie traditionnelle berbère, souks spécialisés, oasis. Porte du désert et de l&apos;Anti-Atlas. Authenticité garantie.
                    </li>
                    <li>
                      <strong>Immouzer (65 km, 1h15) :</strong> Village de montagne, cascades (impressionnantes février-avril), palmeraies, miel local réputé, amandiers en fleurs (janvier-février). Route panoramique sinueuse. Fraîcheur en été.
                    </li>
                    <li>
                      <strong>Sidi Ifni (170 km, 2h30) :</strong> Ancien comptoir espagnol, architecture art déco coloniale, plage de Legzira (arches naturelles effondrées mais site magnifique), ambiance paisible. Étape vers Sidi Ifni-Mirleft.
                    </li>
                    <li>
                      <strong>Massa (45 km, 50min) :</strong> Parc National Souss-Massa, lagune ornithologique (flamants roses, ibis chauves), plage sauvage infinie, village de pêcheurs. Paradis oiseaux migrateurs. Entrée parc 20 DH.
                    </li>
                    <li>
                      <strong>Tamraght (15 km, 20min) :</strong> Village de surf entre Agadir et Taghazout, spots Devil&apos;s Rock et Boilers, ambiance familiale, moins bondé que Taghazout. Restaurants surf camps. Idéal débutants.
                    </li>
                    <li>
                      <strong>Imi Ouaddar (30 km, 40min) :</strong> Embouchure de l&apos;oued Souss, réserve ornithologique, banc de sable, plage déserte. Observation ibis chauve en danger. Calme absolu.
                    </li>
                    <li>
                      <strong>Crocoparc (15 km, 20min) :</strong> Parc aux crocodiles du Nil (300 spécimens), jardin botanique luxuriant, sentiers ombragés. Parfait avec enfants. Entrée 80 DH adulte. Restaurant sur place.
                    </li>
                    <li>
                      <strong>Vallée du Souss (variable) :</strong> Paysages agricoles fertiles, bananeraies, vergers agrumes, villages berbères, maisons en pisé. Routes secondaires paisibles. Coopératives huile d&apos;argan.
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Conseils de Conduite à Agadir et ses Environs</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    <strong>En ville :</strong> Circulation fluide à Agadir. Grands boulevards (Boulevard Mohammed V, Boulevard Hassan II) facilitent déplacements. Respectez limitations 60 km/h en ville. Tramway en projet mais pas encore opérationnel.
                  </p>
                  <p>
                    <strong>Stationnement :</strong> Nombreux parkings gratuits près plages corniche. Centre-ville et souk Talborjt : parkings payants (10-20 DH/jour) ou gardiens informels (5 DH pourboire). Hôtels disposent généralement parking inclus.
                  </p>
                  <p>
                    <strong>Routes vers Paradise Valley :</strong> Route N8 puis piste 5 derniers km (bosses, ornières). SUV ou 4x4 fortement recommandé pour confort et sécurité. Citadine possible mais conduite prudente obligatoire. Y aller tôt le matin (moins monde, fraîcheur).
                  </p>
                  <p>
                    <strong>Côte vers Taghazout/Essaouira :</strong> Route côtière R301 magnifique, virages panoramiques. Stations-service nombreuses. Attention chèvres/moutons traversant route dans villages. Couchers soleil spectaculaires depuis route. Prix carburant : 13-14 DH/l (gasoil), 15-16 DH/l (essence).
                    </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Pourquoi Louer une Voiture à Agadir avec Benatna ?</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Prix transparents sans frais cachés",
                    "Livraison aéroport Al Massira gratuite",
                    "Sans carte de crédit nécessaire",
                    "Parfait pour vacances balnéaires",
                    "Kilométrage illimité",
                    "Idéal surf trip Taghazout",
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
                <h2 className="text-2xl font-bold mb-4">Points de Retrait à Agadir</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Aéroport Al Massira</h3>
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
                          <h3 className="font-semibold mb-1">Corniche d&apos;Agadir</h3>
                          <p className="text-sm text-muted-foreground">Front de mer - Livraison à votre hôtel - Zone touristique</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Centre-Ville Agadir</h3>
                          <p className="text-sm text-muted-foreground">Talborjt - Proximité souks - Service rapide</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Excursions au Départ d&apos;Agadir</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>Paradise Valley (35 km) :</strong> Oasis naturel, piscines naturelles</li>
                    <li><strong>Taghazout (20 km) :</strong> Village de surf, plages magnifiques</li>
                    <li><strong>Essaouira (180 km) :</strong> Ville fortifiée, médina UNESCO</li>
                    <li><strong>Tiznit (90 km) :</strong> Ville fortifiée, capitale de l&apos;argent</li>
                    <li><strong>Taroudant (85 km) :</strong> La petite Marrakech du Sud</li>
                    <li><strong>Anti-Atlas :</strong> Paysages montagneux spectaculaires</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Questions Fréquentes - Location Agadir</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Quel véhicule pour aller à Paradise Valley ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Pour Paradise Valley, nous recommandons un SUV ou un 4x4 car la route comporte quelques passages non goudronnés. Ces véhicules sont disponibles à partir de 350 DH/jour.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">Livrez-vous aux hôtels de la corniche ?</h3>
                      <p className="text-sm text-muted-foreground">
                        Oui ! Nous proposons la livraison gratuite à tous les hôtels de la corniche d&apos;Agadir. Profitez de votre voiture dès votre arrivée à l&apos;hôtel.
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
                    <Link to="/louer?city=Agadir">
                      <Button className="w-full" size="lg">
                        Voir les Véhicules
                      </Button>
                    </Link>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">Besoin d&apos;aide ?</p>
                      <a href="tel:+212699024526" className="text-primary font-semibold hover:underline">
                        +212 699 024 526
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Autres Villes Populaires</h3>
                  <div className="space-y-2">
                    {['Casablanca', 'Marrakech', 'Rabat', 'Tanger', 'Fès'].map(city => (
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
              <h2 className="text-2xl font-bold mb-4">Prêt à Explorer Agadir en Voiture ?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Découvrez le Sud du Maroc avec Benatna
              </p>
              <Link to="/louer?city=Agadir">
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

export default LocationVoitureAgadir;
