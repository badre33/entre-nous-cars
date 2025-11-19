import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Phone } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import cityFes from "@/assets/city-fes.jpg";

const LocationVoitureFes = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Location de Voiture à Fès | Prix Dès 150 DH/jour - Benatna</title>
        <meta name="description" content="Location de voiture à Fès avec Benatna. Aéroport Saïss, Médina, ville nouvelle. Prix transparents dès 150 DH/jour. Sans carte de crédit. Réservation en 2 minutes !" />
        <meta name="keywords" content="location voiture fes, location auto fes aeroport, louer voiture fes medina, location véhicule fes, rent car fez morocco" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-fes" />
        <meta property="og:title" content="Location de Voiture à Fès | Prix Dès 150 DH/jour" />
        <meta property="og:description" content="Louez une voiture à Fès avec Benatna. Aéroport Saïss, Médina impériale, livraison gratuite. Explorez la capitale spirituelle." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-fes" />
      </Helmet>
      <StructuredData type="rental" />
      <Header />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityFes}
          alt="Location de voiture à Fès"
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
              Prix transparents dès 150 DH/jour • Aéroport Saïss • Médina Impériale
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Fès">
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
            <span className="text-foreground">Fès</span>
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
                <h2 className="text-3xl font-bold mb-4">Location de Voiture à Fès : Capitale Spirituelle du Maroc</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>
                    Vous cherchez à <strong>louer une voiture à Fès</strong> ? Benatna vous propose le meilleur service de location dans la plus ancienne ville impériale du Maroc. Que vous arriviez à l&apos;aéroport Fès-Saïss, que vous séjourniez dans la Médina ou en ville nouvelle, explorez Fès et ses environs en toute liberté.
                  </p>
                  <p>
                    Notre <strong>service de location de voiture à Fès</strong> est idéal pour découvrir le patrimoine millénaire de la ville. Plus de 50 véhicules disponibles, des prix clairs dès 150 DH/jour. Visitez les tanneries, la Médina UNESCO, Meknès, Volubilis ou partez vers Chefchaouen !
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
