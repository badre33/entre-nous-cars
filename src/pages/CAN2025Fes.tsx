import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Car, Hotel, Plane, Users, Trophy } from "lucide-react";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { EventSchema } from "@/components/schemas";
import canHeroImage from "@/assets/can-2025-hero.jpg";

const CAN2025Fes = () => {
  return (
    <>
      <Helmet>
        <title>Location Voiture CAN 2025 Fès - Complexe Sportif | Benatna</title>
        <meta name="description" content="Location voiture CAN 2025 à Fès. Médina UNESCO, parking stade. 5 matchs. Réservez dès 300 DH/jour." />
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-fes" />
      </Helmet>
      
      {/* Event Schema CAN 2025 Fès */}
      <EventSchema 
        eventName="CAN 2025 - Matchs à Fès"
        eventDescription="5 matchs de la Coupe d'Afrique des Nations 2025 au Complexe Sportif de Fès. Découvrez la capitale spirituelle avec votre voiture de location."
        startDate="2025-12-21"
        endDate="2026-01-18"
        location={{
          name: "Complexe Sportif de Fès",
          city: "Fès",
          address: "Route Ain Chkef, Fès"
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
            <img src={canHeroImage} alt="Complexe Sportif Fès" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-primary/90 text-white"><Trophy className="w-4 h-4 mr-2" />5 Matchs CAN</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-2xl">
              Location Voiture CAN 2025<br />Fès - Capitale Spirituelle
            </h1>
            <p className="text-xl mb-6">45,000 places • Médina UNESCO • Histoire millénaire</p>
            <Link to="/louer"><Button size="lg" className="bg-primary"><Car className="w-5 h-5 mr-2" />Réserver</Button></Link>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Fès - Patrimoine & Football</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card><CardContent className="pt-6 text-center"><Users className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">45,000</p><p className="text-sm text-muted-foreground">Capacité</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Trophy className="w-12 h-12 mx-auto mb-4 text-accent" /><p className="text-2xl font-bold">5 Matchs</p><p className="text-sm text-muted-foreground">Phase groupes</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><MapPin className="w-12 h-12 mx-auto mb-4 text-secondary" /><p className="text-2xl font-bold">UNESCO</p><p className="text-sm text-muted-foreground">Médina</p></CardContent></Card>
              <Card><CardContent className="pt-6 text-center"><Plane className="w-12 h-12 mx-auto mb-4 text-primary" /><p className="text-2xl font-bold">15 min</p><p className="text-sm text-muted-foreground">Aéroport Fès-Saïss</p></CardContent></Card>
            </div>

            <Card className="mb-12">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">Découvrez Fès pendant la CAN</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">🕌 Sites UNESCO</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Médina de Fès el-Bali (plus grande médina du monde)</li>
                      <li>• Université Al-Qarawiyyin (plus ancienne université)</li>
                      <li>• Tanneries Chouara</li>
                      <li>• Medersa Bou Inania</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3">🚗 Informations Pratiques</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Parking stade: 900 places</li>
                      <li>• Médina piétonne (parking périphérique)</li>
                      <li>• Aéroport: 15 min du centre</li>
                      <li>• Location voiture: essentielle pour excursions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card><CardContent className="pt-6"><Hotel className="w-10 h-10 mb-4 text-primary" /><h4 className="font-bold mb-2">Riads & Hôtels</h4><p className="text-sm text-muted-foreground">Riads traditionnels 400-1500 DH, hôtels modernes disponibles</p></CardContent></Card>
              <Card><CardContent className="pt-6"><Car className="w-10 h-10 mb-4 text-accent" /><h4 className="font-bold mb-2">Excursions</h4><p className="text-sm text-muted-foreground">Ifrane, Volubilis, Meknès entre les matchs</p></CardContent></Card>
              <Card><CardContent className="pt-6"><MapPin className="w-10 h-10 mb-4 text-secondary" /><h4 className="font-bold mb-2">Culture</h4><p className="text-sm text-muted-foreground">Artisanat, gastronomie, histoire millénaire</p></CardContent></Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">CAN 2025 à Fès = Football + Culture</h2>
            <p className="text-xl mb-8">Vivez l'authenticité marocaine 🕌</p>
            <Link to="/louer"><Button size="lg" className="bg-white text-primary">Réserver</Button></Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CAN2025Fes;
