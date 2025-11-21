import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CallButton } from "@/components/CallButton";
import { BUSINESS_INFO } from "@/constants/businessInfo";
import { Calendar, MapPin, Trophy, Users, Car, Shield, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const LocationCAN2025 = () => {
  const { language } = useLanguage();
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Contenu multilingue
  const content = {
    fr: {
      title: "Location Voiture CAN 2025 Maroc | Coupe d'Afrique des Nations",
      metaDescription: "Location de voiture pour la CAN 2025 au Maroc. Tarifs spéciaux supporters, véhicules disponibles toutes villes-stades. Réservation anticipée dès 200 DH/jour.",
      h1: "Location de Voiture CAN 2025 Maroc",
      subtitle: "Suivez la Coupe d'Afrique des Nations en toute liberté",
      eventDates: "21 Décembre 2025 - 18 Janvier 2026",
      heroText: "Le Maroc accueille la Coupe d'Afrique des Nations 2025 ! Louez votre véhicule avec Benatna pour suivre votre équipe dans les 6 villes-stades. Tarifs spéciaux groupes de supporters.",
    },
    en: {
      title: "Car Rental AFCON 2025 Morocco | Africa Cup of Nations",
      metaDescription: "Car rental for AFCON 2025 in Morocco. Special rates for supporters, vehicles available in all host cities. Early booking from 200 MAD/day.",
      h1: "Car Rental AFCON 2025 Morocco",
      subtitle: "Follow the Africa Cup of Nations with total freedom",
      eventDates: "December 21, 2025 - January 18, 2026",
      heroText: "Morocco hosts the Africa Cup of Nations 2025! Rent your vehicle with Benatna to follow your team across 6 stadium cities. Special group rates for supporters.",
    },
    es: {
      title: "Alquiler Coches CAN 2025 Marruecos | Copa África Naciones",
      metaDescription: "Alquiler de coches para la CAN 2025 en Marruecos. Tarifas especiales para aficionados, vehículos disponibles en todas las ciudades. Reserva desde 200 MAD/día.",
      h1: "Alquiler Coches CAN 2025 Marruecos",
      subtitle: "Sigue la Copa de África con total libertad",
      eventDates: "21 Diciembre 2025 - 18 Enero 2026",
      heroText: "¡Marruecos acoge la Copa de África 2025! Alquila tu vehículo con Benatna para seguir a tu equipo en 6 ciudades-estadios. Tarifas especiales para grupos.",
    }
  };

  const t = content[language as keyof typeof content] || content.fr;

  const stadiumCities = [
    { name: "Casablanca", stadium: "Stade Mohammed V", capacity: "67,000", matches: "8 matchs" },
    { name: "Rabat", stadium: "Complexe Sportif Moulay Abdellah", capacity: "52,000", matches: "7 matchs" },
    { name: "Marrakech", stadium: "Stade de Marrakech", capacity: "45,000", matches: "6 matchs" },
    { name: "Agadir", stadium: "Stade d'Agadir", capacity: "45,000", matches: "6 matchs" },
    { name: "Fès", stadium: "Complexe Sportif de Fès", capacity: "45,000", matches: "5 matchs" },
    { name: "Tanger", stadium: "Stade Ibn Batouta", capacity: "65,000", matches: "6 matchs" }
  ];

  const vehicleRecommendations = [
    {
      category: language === 'en' ? "Individual Supporters & Couples" : language === 'es' ? "Aficionados Individuales y Parejas" : "Supporters Individuels & Couples",
      vehicles: language === 'en' ? "Economy car (Clio, 208, Sandero)" : language === 'es' ? "Coche económico (Clio, 208, Sandero)" : "Citadine automatique (Clio, 208, Sandero)",
      price: "200 DH/jour",
      ideal: language === 'en' ? "City travel, easy parking near stadiums" : language === 'es' ? "Viajes urbanos, aparcamiento fácil cerca de estadios" : "Déplacements ville, parking facile près stades"
    },
    {
      category: language === 'en' ? "Groups 4-5 Supporters" : language === 'es' ? "Grupos 4-5 Aficionados" : "Groupes 4-5 Supporters",
      vehicles: language === 'en' ? "Spacious sedan (Corolla, Jetta, Octavia)" : language === 'es' ? "Sedán espacioso (Corolla, Jetta, Octavia)" : "Berline spacieuse (Corolla, Jetta, Octavia)",
      price: "300 DH/jour",
      ideal: language === 'en' ? "Comfort + luggage, inter-city trips" : language === 'es' ? "Confort + equipaje, viajes interurbanos" : "Confort + bagages, trajets inter-villes"
    },
    {
      category: language === 'en' ? "Groups 5-7 Supporters" : language === 'es' ? "Grupos 5-7 Aficionados" : "Groupes 5-7 Supporters",
      vehicles: language === 'en' ? "7-seat SUV (Duster, Captur, Qashqai)" : language === 'es' ? "SUV 7 plazas (Duster, Captur, Qashqai)" : "SUV 7 places (Duster, Captur, Qashqai)",
      price: "400 DH/jour",
      ideal: language === 'en' ? "Large groups, maximum space" : language === 'es' ? "Grupos grandes, espacio máximo" : "Grands groupes, espace maximal"
    },
    {
      category: language === 'en' ? "Delegations & VIP" : language === 'es' ? "Delegaciones y VIP" : "Délégations & VIP",
      vehicles: language === 'en' ? "Premium vehicle (Mercedes C, BMW 3, Audi A4)" : language === 'es' ? "Vehículo premium (Mercedes C, BMW 3, Audi A4)" : "Véhicule premium (Mercedes C, BMW 3, Audi A4)",
      price: "800 DH/jour",
      ideal: language === 'en' ? "Premium comfort, prestigious image" : language === 'es' ? "Confort premium, imagen prestigiosa" : "Confort premium, image prestigieuse"
    }
  ];

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": language === 'en' ? "Africa Cup of Nations 2025" : language === 'es' ? "Copa de África 2025" : "Coupe d'Afrique des Nations 2025",
    "description": t.metaDescription,
    "startDate": "2025-12-21",
    "endDate": "2026-01-18",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": [
      {
        "@type": "Place",
        "name": "Stade Mohammed V",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Casablanca",
          "addressCountry": "MA"
        }
      },
      {
        "@type": "Place",
        "name": "Complexe Sportif Moulay Abdellah",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rabat",
          "addressCountry": "MA"
        }
      }
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "MAD",
      "lowPrice": "200",
      "highPrice": "800",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01",
      "url": "https://benatna.ma/location-voiture-can-2025-maroc"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Confederation of African Football (CAF)",
      "url": "https://www.cafonline.com"
    },
    "provider": {
      "@type": "AutoRental",
      "name": BUSINESS_INFO.name,
      "telephone": BUSINESS_INFO.phone,
      "url": BUSINESS_INFO.website
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="keywords" content="location voiture CAN 2025, rent car AFCON Morocco, voiture coupe afrique, car rental morocco cup nations, location auto supporters CAN, véhicule coupe afrique maroc, alquiler coches CAN Marruecos" />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="fr" href="https://benatna.ma/location-voiture-can-2025-maroc" />
        <link rel="alternate" hrefLang="en" href="https://benatna.ma/en/car-rental-afcon-2025-morocco" />
        <link rel="alternate" hrefLang="es" href="https://benatna.ma/es/alquiler-coches-can-2025-marruecos" />
        <link rel="alternate" hrefLang="x-default" href="https://benatna.ma/location-voiture-can-2025-maroc" />
        
        <link rel="canonical" href="https://benatna.ma/location-voiture-can-2025-maroc" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.metaDescription} />
        <meta property="og:url" content="https://benatna.ma/location-voiture-can-2025-maroc" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://benatna.ma/og-can-2025.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.metaDescription} />
        
        {/* Event Schema */}
        <script type="application/ld+json">
          {JSON.stringify(eventSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <Breadcrumbs />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] animate-pulse"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-base px-6 py-2 animate-bounce">
              <Trophy className="w-5 h-5 mr-2" />
              {t.eventDates}
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight">
              {t.h1}
            </h1>
            
            <p className="text-xl sm:text-2xl mb-4 max-w-3xl mx-auto font-medium drop-shadow-lg">
              {t.subtitle}
            </p>
            
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-white/90">
              {t.heroText}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/louer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-2xl hover:scale-105 transition-transform">
                  <Car className="w-5 h-5 mr-2" />
                  {language === 'en' ? "Book Your Vehicle" : language === 'es' ? "Reserve Su Vehículo" : "Réserver Votre Véhicule"}
                </Button>
              </Link>
              <CallButton variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 h-auto text-lg">
                {language === 'en' ? "Call Us" : language === 'es' ? "Llámenos" : "Nous Appeler"}
              </CallButton>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-3xl font-bold text-white">6</div>
                  <div className="text-sm text-white/80">{language === 'en' ? "Host Cities" : language === 'es' ? "Ciudades Sede" : "Villes-Stades"}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-3xl font-bold text-white">24</div>
                  <div className="text-sm text-white/80">{language === 'en' ? "Teams" : language === 'es' ? "Equipos" : "Équipes"}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-sm text-white/80">{language === 'en' ? "Vehicles" : language === 'es' ? "Vehículos" : "Véhicules"}</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="pt-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-white/80">{language === 'en' ? "Support" : language === 'es' ? "Soporte" : "Assistance"}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Villes-Stades Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {language === 'en' ? "🏟️ Stadium Cities & Match Schedule" : language === 'es' ? "🏟️ Ciudades Estadios y Calendario" : "🏟️ Villes-Stades & Calendrier des Matchs"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Follow your team across 6 host cities. Book your vehicle for each stage." 
                : language === 'es'
                ? "Sigue a tu equipo en 6 ciudades sede. Reserva tu vehículo para cada etapa."
                : "Suivez votre équipe dans les 6 villes-stades. Réservez votre véhicule pour chaque étape."}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stadiumCities.map((city, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                        <p className="text-sm text-muted-foreground">{city.stadium}</p>
                      </div>
                      <Badge variant="secondary">{city.matches}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{language === 'en' ? "Capacity" : language === 'es' ? "Capacidad" : "Capacité"}: {city.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <Link to={`/location-voiture-${city.name.toLowerCase()}`} className="text-primary hover:underline">
                          {language === 'en' ? "Rent in" : language === 'es' ? "Alquilar en" : "Louer à"} {city.name}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Véhicules Recommandés */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              {language === 'en' ? "🚗 Recommended Vehicles for Supporters" : language === 'es' ? "🚗 Vehículos Recomendados para Aficionados" : "🚗 Véhicules Recommandés pour Supporters"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {language === 'en'
                ? "Choose your vehicle based on group size and travel needs during AFCON 2025."
                : language === 'es'
                ? "Elige tu vehículo según el tamaño del grupo y necesidades de viaje durante la CAN 2025."
                : "Choisissez votre véhicule selon la taille de votre groupe et vos besoins de déplacement pendant la CAN 2025."}
            </p>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {vehicleRecommendations.map((rec, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-2 text-primary">{rec.category}</h3>
                    <p className="text-sm mb-3">{rec.vehicles}</p>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="text-base px-4 py-1">{rec.price}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {language === 'en' ? "per day" : language === 'es' ? "por día" : "par jour"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec.ideal}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/louer">
                <Button size="lg" className="px-8">
                  {language === 'en' ? "View All Vehicles" : language === 'es' ? "Ver Todos los Vehículos" : "Voir Tous les Véhicules"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Avantages Benatna CAN */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {language === 'en' ? "✨ Why Choose Benatna for AFCON 2025?" : language === 'es' ? "✨ ¿Por Qué Elegir Benatna para la CAN 2025?" : "✨ Pourquoi Choisir Benatna pour la CAN 2025 ?"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? "Booking Guarantee" : language === 'es' ? "Garantía de Reserva" : "Garantie Réservation"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? "Book now, guaranteed vehicle even during high demand."
                      : language === 'es'
                      ? "Reserve ahora, vehículo garantizado incluso en alta demanda."
                      : "Réservez maintenant, véhicule garanti même en période de forte affluence."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? "Special Group Rates" : language === 'es' ? "Tarifas Especiales Grupos" : "Tarifs Spéciaux Groupes"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? "Up to 20% discount for supporter groups (3+ vehicles)."
                      : language === 'es'
                      ? "Hasta 20% descuento para grupos de aficionados (3+ vehículos)."
                      : "Jusqu'à -20% pour groupes de supporters (3+ véhicules)."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">
                    {language === 'en' ? "24/7 Assistance" : language === 'es' ? "Asistencia 24/7" : "Assistance 24/7"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en'
                      ? "Multilingual support (FR/EN/ES) throughout the tournament."
                      : language === 'es'
                      ? "Soporte multilingüe (FR/EN/ES) durante todo el torneo."
                      : "Support multilingue (FR/EN/ES) pendant toute la compétition."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ CAN */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              {language === 'en' ? "❓ Frequently Asked Questions - AFCON 2025" : language === 'es' ? "❓ Preguntas Frecuentes - CAN 2025" : "❓ Questions Fréquentes - CAN 2025"}
            </h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-left">
                  {language === 'en'
                    ? "Can I book a vehicle for the entire AFCON 2025 period?"
                    : language === 'es'
                    ? "¿Puedo reservar un vehículo para todo el período de la CAN 2025?"
                    : "Puis-je réserver un véhicule pour toute la durée de la CAN 2025 ?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Yes! We offer special long-term rental rates for the entire tournament (Dec 21 - Jan 18). You benefit from up to 20% discount for bookings over 14 days. Ideal to follow your team from group stage to final."
                    : language === 'es'
                    ? "¡Sí! Ofrecemos tarifas especiales de alquiler a largo plazo para todo el torneo (21 dic - 18 ene). Te beneficias de hasta 20% de descuento para reservas superiores a 14 días. Ideal para seguir a tu equipo desde la fase de grupos hasta la final."
                    : "Oui ! Nous proposons des tarifs longue durée spéciaux pour toute la compétition (21 déc - 18 jan). Vous bénéficiez de -20% pour les locations de plus de 14 jours. Idéal pour suivre votre équipe des phases de poules à la finale."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger className="text-left">
                  {language === 'en'
                    ? "Do you offer airport pickup during AFCON?"
                    : language === 'es'
                    ? "¿Ofrecen recogida en el aeropuerto durante la CAN?"
                    : "Proposez-vous la livraison à l'aéroport pendant la CAN ?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Absolutely! We offer free airport delivery for rentals of 7+ days during AFCON. For shorter rentals, delivery costs 150-200 MAD depending on the city. Available at all major airports: Casablanca, Marrakech, Rabat, Agadir, Fes, Tangier."
                    : language === 'es'
                    ? "¡Por supuesto! Ofrecemos entrega gratuita en el aeropuerto para alquileres de 7+ días durante la CAN. Para alquileres más cortos, la entrega cuesta 150-200 MAD según la ciudad. Disponible en todos los aeropuertos principales: Casablanca, Marrakech, Rabat, Agadir, Fez, Tánger."
                    : "Absolument ! Nous offrons la livraison gratuite à l'aéroport pour les locations de 7+ jours pendant la CAN. Pour les locations plus courtes, la livraison coûte 150-200 DH selon la ville. Disponible dans tous les aéroports majeurs : Casablanca, Marrakech, Rabat, Agadir, Fès, Tanger."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger className="text-left">
                  {language === 'en'
                    ? "Are there special rates for supporter groups?"
                    : language === 'es'
                    ? "¿Hay tarifas especiales para grupos de aficionados?"
                    : "Y a-t-il des tarifs spéciaux pour les groupes de supporters ?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Yes! We offer group discounts: -10% for 2-3 vehicles, -15% for 4-5 vehicles, -20% for 6+ vehicles booked together. Perfect for fan clubs, delegations, or groups of friends traveling together to follow their team."
                    : language === 'es'
                    ? "¡Sí! Ofrecemos descuentos grupales: -10% para 2-3 vehículos, -15% para 4-5 vehículos, -20% para 6+ vehículos reservados juntos. Perfecto para clubes de aficionados, delegaciones o grupos de amigos que viajan juntos para seguir a su equipo."
                    : "Oui ! Nous offrons des réductions groupes : -10% pour 2-3 véhicules, -15% pour 4-5 véhicules, -20% pour 6+ véhicules réservés ensemble. Parfait pour clubs de supporters, délégations ou groupes d'amis voyageant ensemble pour suivre leur équipe."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger className="text-left">
                  {language === 'en'
                    ? "Can I drop off the vehicle in a different city?"
                    : language === 'es'
                    ? "¿Puedo devolver el vehículo en otra ciudad?"
                    : "Puis-je restituer le véhicule dans une autre ville ?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Yes, one-way rentals are possible between our 6 host cities. Fees apply: 200-500 MAD depending on distance. Example: Pick up in Casablanca, follow matches in Rabat, Fes, return in Tangier. This is very practical for itinerant supporters."
                    : language === 'es'
                    ? "Sí, los alquileres de ida son posibles entre nuestras 6 ciudades sede. Se aplican tarifas: 200-500 MAD según la distancia. Ejemplo: Recogida en Casablanca, seguimiento de partidos en Rabat, Fez, devolución en Tánger. Muy práctico para aficionados itinerantes."
                    : "Oui, la location aller simple est possible entre nos 6 villes-stades. Frais applicables : 200-500 DH selon la distance. Exemple : Récupération à Casablanca, suivi des matchs à Rabat, Fès, restitution à Tanger. Très pratique pour supporters itinérants."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger className="text-left">
                  {language === 'en'
                    ? "What about parking near stadiums during matches?"
                    : language === 'es'
                    ? "¿Qué pasa con el aparcamiento cerca de los estadios durante los partidos?"
                    : "Qu'en est-il du stationnement près des stades lors des matchs ?"}
                </AccordionTrigger>
                <AccordionContent>
                  {language === 'en'
                    ? "Each host stadium has official parking (15-30 MAD). We recommend arriving 2-3 hours before kickoff to find a spot. Alternative: Park in city center and use shuttle services organized for the tournament. We provide a practical parking guide with your vehicle."
                    : language === 'es'
                    ? "Cada estadio sede tiene aparcamiento oficial (15-30 MAD). Recomendamos llegar 2-3 horas antes del inicio para encontrar plaza. Alternativa: Aparcar en el centro y usar servicios de lanzadera organizados para el torneo. Proporcionamos una guía práctica de aparcamientos con tu vehículo."
                    : "Chaque stade-hôte dispose de parkings officiels (15-30 DH). Nous recommandons d'arriver 2-3h avant le coup d'envoi pour trouver une place. Alternative : se garer en centre-ville et utiliser les navettes organisées pour la compétition. Nous fournissons un guide pratique des parkings avec votre véhicule."}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {language === 'en'
                ? "Ready for the AFCON 2025 Adventure?"
                : language === 'es'
                ? "¿Listo para la Aventura de la CAN 2025?"
                : "Prêts pour l'Aventure de la CAN 2025 ?"}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {language === 'en'
                ? "Book your vehicle now and secure the best rates for the biggest African football event."
                : language === 'es'
                ? "Reserva tu vehículo ahora y asegura las mejores tarifas para el mayor evento futbolístico africano."
                : "Réservez votre véhicule maintenant et sécurisez les meilleurs tarifs pour le plus grand événement footballistique africain."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/louer">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 h-auto shadow-2xl">
                  <Car className="w-5 h-5 mr-2" />
                  {language === 'en' ? "Book Now" : language === 'es' ? "Reservar Ahora" : "Réserver Maintenant"}
                </Button>
              </Link>
              <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(language === 'en' ? "Hello, I want to rent a vehicle for AFCON 2025" : language === 'es' ? "Hola, quiero alquilar un vehículo para la CAN 2025" : "Bonjour, je souhaite louer un véhicule pour la CAN 2025")}`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-6 h-auto text-lg">
                  {language === 'en' ? "WhatsApp Us" : language === 'es' ? "Contáctenos" : "Contactez WhatsApp"}
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

export default LocationCAN2025;
