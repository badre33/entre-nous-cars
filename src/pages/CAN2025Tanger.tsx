import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Car, Hotel, Plane, Users, Trophy, Anchor } from "lucide-react";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import canHeroImage from "@/assets/can-2025-hero.jpg";

const CAN2025Tanger = () => {
  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Tanger - Stade Ibn Batouta | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Tanger. Stade Ibn Batouta, détroit Gibraltar. 6 matchs. Dès 200 DH/jour." />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-tanger" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Breadcrumbs />

        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={canHeroImage} alt="Stade Ibn Batouta Tanger" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white"><Trophy className="w-4 h-4 mr-2" />6 Matchs CAN</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Tanger - Porte de l'Afrique
            </h1>
            <p className="text-xl mb-6">65,000 places • Détroit Gibraltar • Ville cosmopolite</p>
            <Link to="/louer"><Button size="lg" className="bg-primary"><Car className="w-5 h-5 mr-2" />Réserver</Button></Link>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tanger - Football & Méditerranée</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card><CardContent className="pt-6 text-center"><Users className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">65,000</p><p className="text-sm text-muted-foreground">Plus grand stade CAN</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Trophy className="w-12 h-12 mx-auto mb-4 text-accent" /><p className="text-2xl font-bold">6 Matchs</p><p className="text-sm text-muted-foreground">+ 1 Quart</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Anchor className="w-12 h-12 mx-auto mb-4 text-secondary" /><p className="text-2xl font-bold">14 km</p><p className="text-sm text-muted-foreground">Détroit Gibraltar</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Plane className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">20 min</p><p className="text-sm text-muted-foreground">Aéroport Ibn Battouta</p></CardContent></Card>
            </div>

            <Card className="mb-12">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Tanger - Entre Deux Continents</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">🌊 Attractions</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Grottes d'Hercule</li>
                      <li>• Cap Spartel (point rencontre Atlantique-Méditerranée)</li>
                      <li>• Médina & Kasbah</li>
                      <li>• Port Tanger Med (plus grand d'Afrique)</li>
                      <li>• Corniche & plages</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">🚗 Infos Stade</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Stade Ibn Batouta (65,000 places)</li>
                      <li>• Parking: 2,000 places (20 DH)</li>
                      <li>• 10 min du centre-ville</li>
                      <li>• Accès autoroute A1 (vers Tétouan, Rabat)</li>
                      <li>• Location voiture: idéale pour côtes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card><CardContent className="pt-6"><Hotel className="w-10 h-10 mb-4 text-primary" /><h4 className="font-bold mb-2">Hôtels Vue Mer</h4><p className="text-sm text-muted-foreground">500-2000 DH/nuit, réservation anticipée conseillée</p></CardContent></Card>
              <Card><CardContent className="pt-6"><Car className="w-10 h-10 mb-4 text-accent" /><h4 className="font-bold mb-2">Road Trip</h4><p className="text-sm text-muted-foreground">Tétouan, Chefchaouen accessibles en voiture</p></CardContent></Card>
              <Card><CardContent className="pt-6"><Anchor className="w-10 h-10 mb-4 text-secondary" /><h4 className="font-bold mb-2">Europe à 14km</h4><p className="text-sm text-muted-foreground">Vue sur l'Espagne depuis Cap Spartel</p></CardContent></Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">CAN 2025 à Tanger = Football International</h2>
            <p className="text-xl mb-8">Plus grand stade de la compétition 🏆</p>
            <Link to="/louer"><Button size="lg" className="bg-white text-primary">Réserver Ma Voiture</Button></Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Tanger;
