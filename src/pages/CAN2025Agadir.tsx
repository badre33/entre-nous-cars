import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Car, Hotel, Bus, Plane, Clock, Users, Trophy, Waves } from "lucide-react";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { EventSchema } from "@/components/schemas";
import canHeroImage from "@/assets/can-2025-hero.jpg";

const CAN2025Agadir = () => {
  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Agadir - Stade d'Agadir | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Agadir. Plages, stade moderne, parking. 6 matchs. Réservez dès 300 DH/jour." />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-agadir" />
      </Helmet>
      
      {/* Event Schema CAN 2025 Agadir */}
      <EventSchema 
        eventName="CAN 2025 - Matchs à Agadir"
        eventDescription="6 matchs de la Coupe d'Afrique des Nations 2025 au Stade d'Agadir. Combinez football et vacances balnéaires avec notre service de location de voiture."
        startDate="2025-12-21"
        endDate="2026-01-18"
        location={{
          name: "Stade d'Agadir",
          city: "Agadir",
          address: "Route de l'Aéroport, Agadir"
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
            <img src={canHeroImage} alt="Stade Agadir CAN 2025" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white"><Trophy className="w-4 h-4 mr-2" />6 Matchs CAN 2025</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Agadir - Perle du Souss
            </h1>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              45,000 places • 300 jours de soleil • Plages & Football
            </p>
            <Link to="/louer"><Button size="lg" className="bg-primary"><Car className="w-5 h-5 mr-2" />Réserver</Button></Link>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Agadir - Football & Balnéaire</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card><CardContent className="pt-6 text-center"><Users className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">45,000</p><p className="text-sm text-muted-foreground">Places</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Trophy className="w-12 h-12 mx-auto mb-4 text-accent" /><p className="text-2xl font-bold">6 Matchs</p><p className="text-sm text-muted-foreground">Phase groupes</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Waves className="w-12 h-12 mx-auto mb-4 text-secondary" /><p className="text-2xl font-bold">10 km</p><p className="text-sm text-muted-foreground">De plage</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Plane className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">25 min</p><p className="text-sm text-muted-foreground">Aéroport</p></CardContent></Card>
            </div>

            <Card className="mb-12 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Waves className="w-6 h-6 text-primary" />
                  Agadir: Football + Vacances
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">🏖️ Activités</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 10 km de plages dorées</li>
                      <li>• Sports nautiques (surf, jet-ski)</li>
                      <li>• Souk El Had (plus grand souk du Maroc)</li>
                      <li>• Vallée du Paradis & Paradise Valley</li>
                      <li>• Kasbah d'Agadir Oufella</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">🚗 Accès Stade</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Parking: 1,000 places (20 DH)</li>
                      <li>• Depuis aéroport: 25 min via N1</li>
                      <li>• Depuis centre: 15 min</li>
                      <li>• Location voiture recommandée</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <Hotel className="w-10 h-10 mb-4 text-primary" />
                  <h4 className="font-bold text-lg mb-2">Hôtels Balnéaires</h4>
                  <p className="text-sm text-muted-foreground">Resorts all-inclusive de 600 à 2500 DH/nuit</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Car className="w-10 h-10 mb-4 text-accent" />
                  <h4 className="font-bold text-lg mb-2">Excursions</h4>
                  <p className="text-sm text-muted-foreground">Explorez Essaouira, Taroudant entre matchs</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <Waves className="w-10 h-10 mb-4 text-secondary" />
                  <h4 className="font-bold text-lg mb-2">Plage & CAN</h4>
                  <p className="text-sm text-muted-foreground">Matchs le soir, plage la journée ☀️</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">CAN 2025 à Agadir = Football + Vacances</h2>
            <p className="text-xl mb-8">Profitez des matchs ET de la plage ☀️🏖️</p>
            <Link to="/louer"><Button size="lg" className="bg-white text-primary">Réserver Ma Voiture</Button></Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Agadir;
