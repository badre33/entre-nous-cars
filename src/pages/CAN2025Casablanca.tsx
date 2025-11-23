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
import { EventSchema } from "@/components/schemas";
import canHeroImage from "@/assets/can-2025-hero.jpg";

const CAN2025Casablanca = () => {
  const parkingInfo = [
    { name: "Parking Officiel Stade", distance: "100m", capacity: "2000 places", price: "20 DH" },
    { name: "Parking Casa-Anfa", distance: "500m", capacity: "500 places", price: "15 DH" },
    { name: "Parking Zerktouni", distance: "800m", capacity: "300 places", price: "10 DH" },
  ];

  const hotels = [
    { name: "Hyatt Regency Casablanca", distance: "3km", stars: 5, price: "1200 DH/nuit" },
    { name: "Kenzi Tower Hotel", distance: "2.5km", stars: 5, price: "900 DH/nuit" },
    { name: "Novotel Casablanca", distance: "4km", stars: 4, price: "650 DH/nuit" },
    { name: "Ibis Casa Sidi Maarouf", distance: "5km", stars: 3, price: "400 DH/nuit" },
  ];

  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Casablanca - Stade Mohammed V | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Casablanca. Parking Stade Mohammed V, navettes aéroport, hébergements. 8 matchs CAN. Réservez dès 200 DH/jour." />
        <meta name="keywords" content="location voiture CAN Casablanca, stade mohammed v parking, navette aeroport casablanca CAN, hotel proche stade casablanca" />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-casablanca" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            "name": "CAN 2025 - Matchs Casablanca",
            "location": {
              "@type": "StadiumOrArena",
              "name": "Stade Mohammed V",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Casablanca",
                "addressCountry": "MA"
              }
            },
            "startDate": "2025-12-21",
            "endDate": "2026-01-18"
          })}
        </script>
      </Helmet>
      
      {/* Quick Win 6: Event Schema CAN 2025 */}
      <EventSchema 
        eventName="CAN 2025 - Matchs à Casablanca"
        eventDescription="8 matchs de la Coupe d'Afrique des Nations 2025 au Stade Mohammed V de Casablanca. Location de voiture avec parking stade, navettes aéroport et hébergements disponibles."
        startDate="2025-12-21"
        endDate="2026-01-18"
        location={{
          name: "Stade Mohammed V",
          city: "Casablanca",
          address: "Avenue My Youssef, Casablanca"
        }}
        offers={{
          price: "200",
          priceCurrency: "MAD",
          availability: "https://schema.org/InStock"
        }}
      />

      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={canHeroImage} alt="Stade Mohammed V Casablanca CAN 2025" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white border-0">
              <Trophy className="w-4 h-4 mr-2" />
              8 Matchs CAN 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Casablanca - Stade Mohammed V
            </h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              67,000 places • Parking 2,500 places • Navettes aéroport
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/louer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Car className="w-5 h-5 mr-2" />
                  Réserver Votre Véhicule
                </Button>
              </Link>
              <a href={`tel:${BUSINESS_INFO.phoneRaw}`}>
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  Appelez-nous
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Info Stade */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Stade Mohammed V - Informations Pratiques</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-bold">67,000</p>
                  <p className="text-sm text-muted-foreground">Capacité</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <p className="text-2xl font-bold">8 Matchs</p>
                  <p className="text-sm text-muted-foreground">Dont 1 Demi-finale</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <ParkingCircle className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <p className="text-2xl font-bold">2,500</p>
                  <p className="text-sm text-muted-foreground">Places parking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-2xl font-bold">15 min</p>
                  <p className="text-sm text-muted-foreground">Depuis centre-ville</p>
                </CardContent>
              </Card>
            </div>

            {/* Parkings */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ParkingCircle className="w-6 h-6 text-primary" />
                Parkings Disponibles
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
                      <Badge className="mt-3" variant="secondary">Réservation recommandée</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Accès Aéroport */}
            <Card className="mb-12 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Plane className="w-6 h-6 text-primary" />
                  Accès depuis l'Aéroport Mohammed V
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Car className="w-5 h-5 text-primary" />
                      En voiture de location
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Distance: 35 km (30 min sans trafic)</li>
                      <li>• Itinéraire: Autoroute A3 → Sortie Casa-Anfa</li>
                      <li>• Livraison gratuite à l'aéroport (location 7+ jours)</li>
                      <li>• GPS inclus dans toutes nos locations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Bus className="w-5 h-5 text-secondary" />
                      Transports publics
                    </h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Train: Aéroport → Casa Voyageurs (30 min)</li>
                      <li>• Puis Tramway ligne T1 vers Sidi Moumen</li>
                      <li>• Navettes spéciales CAN disponibles</li>
                      <li>• Bus 110 direct (1h, 40 DH)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hébergements */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Hotel className="w-6 h-6 text-primary" />
                Hébergements Proches du Stade
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
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {hotel.distance} du stade
                        </p>
                        <p className="text-primary font-bold text-lg mt-3">{hotel.price}</p>
                      </div>
                      <Badge className="mt-3" variant="outline">Réservation anticipée recommandée</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                💡 Conseil: Réservez votre hébergement dès maintenant, les prix augmentent pendant la CAN
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Réservez Votre Voiture pour la CAN 2025</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Profitez des matchs à Casablanca en toute liberté. Tarifs spéciaux supporters dès 200 DH/jour.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/louer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Car className="w-5 h-5 mr-2" />
                  Voir les Véhicules Disponibles
                </Button>
              </Link>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Bonjour, je souhaite louer une voiture pour la CAN 2025 à Casablanca`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Casablanca;
