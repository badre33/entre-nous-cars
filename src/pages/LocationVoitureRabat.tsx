import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Phone } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
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
      <Header />

      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityRabat}
          alt="Location de voiture à Rabat"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
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
            <span className="text-foreground">Rabat</span>
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
