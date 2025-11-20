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
import cityMarrakech from "@/assets/city-marrakech.jpg";

const LocationVoitureMarrakech = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Marrakech | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Marrakech avec Benatna. Aéroport Menara, Médina, Guéliz. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture marrakech, location auto marrakech aeroport, louer voiture marrakech pas cher, location véhicule marrakech, rent car marrakech menara" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-marrakech" />
        <meta property="og:title" content="Location de Voiture à Marrakech | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Marrakech avec Benatna. Aéroport Menara, Médina, Guéliz, livraison gratuite. Prix transparents, sans surprises." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-marrakech" />
      </Helmet>
      <StructuredData type="rental" />
      <ServiceSchema city="Marrakech" />
      <CityLocalBusinessSchema
        cityName="Marrakech"
        latitude="31.6295"
        longitude="-7.9811"
        address="Aéroport Marrakech Menara"
        postalCode="40000"
        telephone="+212699024526"
        priceRange="150-900 MAD"
      />
      <ReviewsSchema 
        reviews={[
          {
            name: 'Sofia Mansouri',
            location: 'Marrakech',
            rating: 5,
            comment: 'Parfait pour mon séjour touristique ! La réservation en ligne est simple et rapide. La voiture m\'attendait à l\'aéroport.',
            date: 'Il y a 1 semaine',
          },
          {
            name: 'Hassan Idrissi',
            location: 'Marrakech',
            rating: 5,
            comment: 'Service excellent à Marrakech. Voiture propre et récente.',
            date: 'Il y a 3 jours',
          },
          {
            name: 'Laila Benani',
            location: 'Marrakech',
            rating: 5,
            comment: 'Très satisfaite de ma location. Prix compétitifs et équipe professionnelle.',
            date: 'Il y a 2 semaines',
          },
        ]}
        averageRating={4.8}
        totalReviews={1247}
        city="Marrakech"
      />
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityMarrakech}
          alt="Location de voiture à Marrakech"
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

      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b">
        <div className="container px-4 py-3">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Accueil</Link>
            <span className="mx-2">/</span>
            <Link to="/louer" className="hover:text-foreground">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Marrakech</span>
          </nav>
        </div>
      </div>

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
