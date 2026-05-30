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

const CAN2025Marrakech = () => {
  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Marrakech - Stade de Marrakech | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Marrakech. Parking stade, navettes aéroport Menara, hébergements. 6 matchs. Réservez dès 200 DH/jour." />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-marrakech" />
      </Helmet>
      
      {/* Event Schema CAN 2025 Marrakech */}
      <EventSchema 
        eventName="CAN 2025 - Matchs à Marrakech"
        eventDescription="6 matchs de la Coupe d'Afrique des Nations 2025 au Stade de Marrakech. Location de voiture avec parking stade, navettes aéroport Menara et hébergements disponibles."
        startDate="2025-12-21"
        endDate="2026-01-18"
        location={{
          name: "Stade de Marrakech",
          city: "Marrakech",
          address: "Route de l'Ourika, Marrakech"
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

        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={canHeroImage} alt="Stade de Marrakech CAN 2025" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white">
              <Trophy className="w-4 h-4 mr-2" />
              6 Matchs CAN 2025
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Marrakech - Perle du Sud
            </h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              45,000 places • 10 min de l'aéroport • Médina UNESCO
            </p>
            <Link to="/louer">
              <Button size="lg" className="bg-primary">
                <Car className="w-5 h-5 mr-2" />
                Réserver Votre Véhicule
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Stade de Marrakech - Ville Rouge</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card><CardContent className="pt-6 text-center"><Users className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">45,000</p><p className="text-sm text-muted-foreground">Places</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Trophy className="w-12 h-12 mx-auto mb-4 text-accent" /><p className="text-2xl font-bold">6 Matchs</p><p className="text-sm text-muted-foreground">CAN 2025</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Plane className="w-12 h-12 mx-auto mb-4 text-secondary" /><p className="text-2xl font-bold">10 min</p><p className="text-sm text-muted-foreground">Aéroport Menara</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Hotel className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">500+</p><p className="text-sm text-muted-foreground">Hôtels & Riads</p></CardContent></Card>
            </div>

            <Card className="mb-12">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Points d'Intérêt à Marrakech
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">🕌 Sites Touristiques</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Place Jemaa el-Fna (7km du stade)</li>
                      <li>• Jardin Majorelle (5km)</li>
                      <li>• Palais Bahia (8km)</li>
                      <li>• Médina historique (UNESCO)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">🚗 Accès & Parking</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Parking stade: 1,200 places (20 DH)</li>
                      <li>• Aéroport Menara: 10 min en voiture</li>
                      <li>• Centre-ville: 15 min</li>
                      <li>• Autoroute A7 vers Casablanca</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Hotel className="w-10 h-10 mb-4 text-primary" />
                  <h4 className="font-bold text-lg mb-2">Hébergements</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Plus de 500 hôtels et riads, de 300 DH à 3000+ DH/nuit
                  </p>
                  <Badge variant="secondary">Réservation anticipée</Badge>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Car className="w-10 h-10 mb-4 text-accent" />
                  <h4 className="font-bold text-lg mb-2">Location Voiture</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Idéal pour explorer l'Atlas et Essaouira entre les matchs
                  </p>
                  <Badge variant="secondary">dès 200 DH/jour</Badge>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Bus className="w-10 h-10 mb-4 text-secondary" />
                  <h4 className="font-bold text-lg mb-2">Navettes CAN</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Navettes spéciales depuis hôtels et Jemaa el-Fna
                  </p>
                  <Badge variant="secondary">50 DH A/R</Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Vivez la CAN 2025 à Marrakech</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Football + Médina + Atlas = Expérience inoubliable 🏆
            </p>
            <Link to="/louer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Réserver Votre Voiture
              </Button>
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Marrakech;
