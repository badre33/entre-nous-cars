import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Phone } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
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
      <Header />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityAgadir}
          alt="Location de voiture à Agadir"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
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
