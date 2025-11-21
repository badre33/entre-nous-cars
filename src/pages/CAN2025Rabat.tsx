import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Car, Hotel, Bus, Plane, Clock, Users, Trophy, ParkingCircle } from "lucide-react";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import canHeroImage from "@/assets/can-2025-hero.jpg";

const CAN2025Rabat = () => {
  const parkingInfo = [
    { name: "Parking Complexe Sportif", distance: "50m", capacity: "1500 places", price: "20 DH" },
    { name: "Parking Hay Riad", distance: "400m", capacity: "400 places", price: "15 DH" },
    { name: "Parking Avenue Imam Malik", distance: "600m", capacity: "250 places", price: "10 DH" },
  ];

  const hotels = [
    { name: "Sofitel Rabat Jardin des Roses", distance: "4km", stars: 5, price: "1400 DH/nuit" },
    { name: "Farah Rabat", distance: "3km", stars: 5, price: "950 DH/nuit" },
    { name: "Ibis Rabat Agdal", distance: "2km", stars: 3, price: "450 DH/nuit" },
    { name: "Golden Tulip Rabat", distance: "3.5km", stars: 4, price: "700 DH/nuit" },
  ];

  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Rabat - Complexe Moulay Abdellah | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Rabat. Parking Complexe Sportif, navettes, hébergements. 7 matchs CAN. Réservez dès 200 DH/jour." />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-rabat" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumbs />

        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={canHeroImage} alt="Complexe Sportif Moulay Abdellah Rabat" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white border-0">
              <Trophy className="w-4 h-4 mr-2" />
              7 Matchs CAN 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Rabat - Complexe Moulay Abdellah
            </h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              52,000 places • Capitale • Parking 1,500 places
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/louer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Car className="w-5 h-5 mr-2" />
                  Réserver Votre Véhicule
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Complexe Sportif Moulay Abdellah</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-bold">52,000</p>
                  <p className="text-sm text-muted-foreground">Capacité</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <p className="text-2xl font-bold">7 Matchs</p>
                  <p className="text-sm text-muted-foreground">Phase groupes + 1/8</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <ParkingCircle className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <p className="text-2xl font-bold">1,500</p>
                  <p className="text-sm text-muted-foreground">Places parking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-bold">10 min</p>
                  <p className="text-sm text-muted-foreground">Depuis centre</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ParkingCircle className="w-6 h-6 text-primary" />
                Parkings à Rabat
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {parkingInfo.map((parking) => (
                  <Card key={parking.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <h4 className="font-bold text-lg mb-3">{parking.name}</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-semibold">Distance:</span> {parking.distance}</p>
                        <p><span className="font-semibold">Capacité:</span> {parking.capacity}</p>
                        <p className="text-primary font-bold text-lg">{parking.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="mb-12 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Plane className="w-6 h-6 text-primary" />
                  Accès depuis l'Aéroport Rabat-Salé
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2">En voiture</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Distance: 15 km (20 min)</li>
                      <li>• Itinéraire: Route 1 → Avenue Hassan II</li>
                      <li>• Livraison gratuite aéroport (7+ jours)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Transports publics</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Tramway depuis Salé (30 min)</li>
                      <li>• Navettes CAN spéciales</li>
                      <li>• Taxis disponibles 24/7</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Hotel className="w-6 h-6 text-primary" />
                Hébergements à Rabat
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {hotels.map((hotel) => (
                  <Card key={hotel.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg">{hotel.name}</h4>
                        <div className="flex gap-0.5">
                          {[...Array(hotel.stars)].map((_, i) => (
                            <span key={i} className="text-yellow-500">⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" />
                        {hotel.distance} du stade
                      </p>
                      <p className="text-primary font-bold text-lg">{hotel.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Louez Votre Voiture à Rabat</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Découvrez la capitale pendant la CAN 2025. Tarifs spéciaux dès 200 DH/jour.
            </p>
            <Link to="/louer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Réserver Maintenant
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Rabat;
