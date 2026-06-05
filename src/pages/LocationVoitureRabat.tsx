import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { EnhancedBreadcrumbs } from "@/components/EnhancedBreadcrumbs";
import { createBreadcrumbs } from "@/components/schemas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  CheckCircle, 
  Star, 
  Car, 
  Shield, 
  Clock, 
  Headphones,
  Building2,
  Plane,
  Navigation,
  ParkingCircle,
  Fuel,
  AlertTriangle,
  Quote,
  Briefcase
} from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { CityLocalBusinessSchema } from "@/components/CityLocalBusinessSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { generateCityImageAlt } from "@/utils/seoHelpers";
import { HreflangTags } from "@/utils/hreflangHelper";
import { 
  EnhancedAggregateRatingSchema, 
  PriceRangeOfferSchema, 
  FAQSchemaEnriched,
  MultiLocationSchema,
  OpeningHoursSchema
} from "@/components/schemas";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import cityRabat from "@/assets/city-rabat.jpg";

// FAQ data for schema and display
const rabatFAQs = [
  {
    question: "Proposez-vous des locations longue durée à Rabat ?",
    answer: "Oui, la location longue durée est notre spécialité à Rabat. Nous proposons des tarifs dégressifs attractifs : -10% à partir de 7 jours, -15% à partir de 30 jours. Idéal pour les missions professionnelles, les expatriés en transition ou les MRE de retour pour plusieurs mois."
  },
  {
    question: "Peut-on louer une voiture à l'aéroport Rabat-Salé ?",
    answer: "Absolument. Nos agences partenaires proposent un service de livraison gratuite à l'aéroport Rabat-Salé, disponible 24h/24. Un agent vous attend à votre arrivée avec les clés du véhicule, pour un départ immédiat vers le centre-ville ou Hay Riad."
  },
  {
    question: "Livrez-vous les véhicules aux bureaux et administrations ?",
    answer: "Oui, c'est un service très demandé à Rabat. Nous livrons gratuitement dans les quartiers administratifs (Agdal, Hay Riad, Souissi) et aux sièges d'entreprises. Pratique pour les professionnels qui enchaînent les réunions dans différents ministères."
  },
  {
    question: "Quels documents sont nécessaires pour louer une voiture à Rabat ?",
    answer: "Vous aurez besoin d'un permis de conduire valide (depuis au moins 1 an), d'une pièce d'identité (CIN pour les résidents marocains ou passeport pour les étrangers), et d'un justificatif de domicile récent. Pour les touristes, un permis international peut être requis."
  },
  {
    question: "L'assurance est-elle incluse dans le tarif de location ?",
    answer: "Oui, tous nos véhicules sont couverts par une assurance responsabilité civile incluse dans le prix. Pour les locations professionnelles, nous recommandons l'assurance tous risques avec franchise réduite, particulièrement adaptée aux déplacements intensifs."
  },
  {
    question: "Peut-on restituer le véhicule dans une autre ville que Rabat ?",
    answer: "Oui, le service aller-simple est disponible vers Casablanca (très demandé pour l'axe économique), Tanger, Marrakech et Agadir. Des frais de transfert peuvent s'appliquer selon la destination. Contactez-nous pour un devis personnalisé."
  }
];

// Customer reviews localized to Rabat
const rabatTestimonials = [
  {
    name: "Karim A.",
    location: "Rabat",
    rating: 5,
    comment: "Location de 3 mois pour une mission professionnelle. Tarif très compétitif, véhicule fiable et service irréprochable. La livraison au bureau à Hay Riad était parfaite.",
    date: "Janvier 2025"
  },
  {
    name: "Sophie M.",
    location: "France",
    rating: 5,
    comment: "De retour au Maroc pour deux mois de vacances. Récupération simple à l'aéroport Rabat-Salé, Dacia Duster impeccable. J'ai pu visiter Chefchaouen et Meknès sans contrainte.",
    date: "Décembre 2024"
  },
  {
    name: "Mohamed B.",
    location: "Rabat",
    rating: 5,
    comment: "Consultant indépendant, j'ai besoin d'un véhicule flexible pour mes rendez-vous entre Rabat et Casablanca. Benatna m'offre cette souplesse avec un excellent rapport qualité-prix.",
    date: "Novembre 2024"
  }
];

const LocationVoitureRabat = () => {

  // WORKAROUND react-helmet-async: force-set document.title, meta description,
  // canonical and OG tags via direct DOM API. Helmet leaks default values.
  useEffect(() => {
    document.title = "Location Voiture Rabat dès 300 DH/jour | Sans Carte de Crédit - Benatna";
    const setMeta = (selector: string, attr: string, value: string, key: string, keyVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.includes('link') ? 'link' : 'meta');
        el.setAttribute(key, keyVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Location de voiture à Rabat dès 300 DH/jour. Agences locales vérifiées, livraison aéroport Rabat-Salé, sans carte de crédit.", 'name', 'description');
    setMeta('link[rel="canonical"]', 'href', "https://benatna.ma/location-voiture-rabat", 'rel', 'canonical');
    setMeta('meta[property="og:title"]', 'content', "Location Voiture Rabat dès 300 DH/jour | Sans Carte de Crédit - Benatna", 'property', 'og:title');
    setMeta('meta[property="og:description"]', 'content', "Location de voiture à Rabat dès 300 DH/jour. Agences locales vérifiées, livraison aéroport Rabat-Salé, sans carte de crédit.", 'property', 'og:description');
    setMeta('meta[property="og:url"]', 'content', "https://benatna.ma/location-voiture-rabat", 'property', 'og:url');
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Location Voiture Rabat dès 300 DH/jour | Sans Carte de Crédit - Benatna</title>
        <meta 
          name="description" 
          content="Louez une voiture à Rabat dès 300 DH/jour. Livraison aéroport Rabat-Salé, agences locales vérifiées, processus 100% digital. Sans frais cachés." 
        />
        <link rel="canonical" href="https://benatna.ma/location-voiture-rabat" />
        <meta property="og:title" content="Location Voiture Rabat | Agences Locales - Benatna" />
        <meta property="og:description" content="Louez une voiture à Rabat avec Benatna. Agences locales fiables, prix transparents, réservation simple." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-rabat" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://benatna.ma/og-image.png" />
      </Helmet>

      {/* Hreflang Tags */}
      <HreflangTags path="/location-voiture-rabat" />

      {/* Structured Data Schemas */}
      <StructuredData type="rental" />
      <ServiceSchema city="Rabat" />
      <HowToSchema city="Rabat" />
      <OfferSchema city="Rabat" />
      
      <CityLocalBusinessSchema
        cityName="Rabat"
        latitude="33.9716"
        longitude="-6.8498"
        address="Aéroport Rabat-Salé"
        postalCode="10000"
        telephone="+212699024526"
        priceRange="150-800 MAD"
      />

      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Rabat"
      />

      <PriceRangeOfferSchema 
        minPrice="300"
        maxPrice="800"
        city="Rabat"
        discount={{ percentage: 15, minDays: 30 }}
      />

      <MultiLocationSchema 
        locations={[
          {
            name: "Aéroport Rabat-Salé",
            address: "Aéroport International Rabat-Salé",
            city: "Rabat",
            postalCode: "11000",
            latitude: "34.0531",
            longitude: "-6.7519",
            description: "Livraison gratuite 24/7 à l'aéroport Rabat-Salé."
          },
          {
            name: "Centre-ville Rabat",
            address: "Avenue Mohammed V",
            city: "Rabat",
            postalCode: "10000",
            latitude: "33.9716",
            longitude: "-6.8498",
            description: "Point de retrait central, proche des administrations et hôtels."
          },
          {
            name: "Agdal",
            address: "Quartier Agdal",
            city: "Rabat",
            postalCode: "10090",
            latitude: "33.9850",
            longitude: "-6.8600",
            description: "Quartier résidentiel et commercial, nombreux bureaux d'entreprises."
          },
          {
            name: "Hay Riad",
            address: "Hay Riad",
            city: "Rabat",
            postalCode: "10100",
            latitude: "33.9580",
            longitude: "-6.8890",
            description: "Zone ministérielle et d'affaires, idéal pour les professionnels."
          }
        ]}
      />

      <OpeningHoursSchema 
        city="Rabat"
        entityType="LocalBusiness"
        address="Aéroport Rabat-Salé"
        latitude="34.0531"
        longitude="-6.7519"
      />

      <VehicleProductSchemas city="Rabat" />

      <FAQSchemaEnriched 
        pageName="Location de Voiture à Rabat"
        faqs={rabatFAQs}
      />

      <Header />

      {/* Breadcrumbs */}
      <EnhancedBreadcrumbs 
        items={[
          createBreadcrumbs.home(),
          createBreadcrumbs.services(),
          createBreadcrumbs.city("Rabat", "rabat")
        ]}
        showIcons={true}
      />

      {/* Hero Section */}
      <section className="relative min-h-[320px] sm:min-h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityRabat}
          alt={generateCityImageAlt("Rabat")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Location de Voiture à Rabat – Louez Simplement avec Benatna
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Agences locales fiables • Prix transparents • Idéal longue durée et professionnels
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Rabat">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  Trouver ma voiture à Rabat
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite louer une voiture à Rabat."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="text-lg px-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20"
                >
                  Contacter un conseiller
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4">

          {/* Introduction Section - minimum 200 mots, mot-clé dans les 80 premiers mots */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                La <strong>location de voiture à Rabat</strong> est la solution privilégiée par 
                les professionnels, les familles et les voyageurs qui souhaitent se déplacer 
                librement dans la capitale administrative du Maroc. Ville où se concentrent 
                ministères, ambassades, sièges d'institutions et quartiers résidentiels haut de gamme, 
                Rabat exige une mobilité optimale pour naviguer efficacement entre ses différents pôles.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Avec près d'un million d'habitants et une agglomération étendue incluant Salé et Témara, 
                les déplacements professionnels et familiaux nécessitent un véhicule personnel. 
                Le réseau de tramway, bien que pratique, ne dessert pas tous les quartiers d'affaires. 
                Les taxis peuvent être difficiles à trouver aux heures de pointe. Louer une voiture 
                vous offre la flexibilité indispensable pour vos rendez-vous à Hay Riad, vos réunions 
                à Agdal, vos visites aux administrations de Souissi et vos escapades dans les quartiers 
                historiques de la médina. Pour{" "}
                <Link to="/louer?city=Rabat" className="text-primary hover:underline">
                  voir les voitures disponibles à Rabat
                </Link>, consultez notre catalogue.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rabat est également le point de départ idéal pour rejoindre Casablanca (90 km), 
                Meknès (140 km), les plages de Moulay Bousselham ou la ville bleue de Chefchaouen (250 km). 
                Benatna connecte les professionnels et voyageurs aux meilleures agences de location 
                de la capitale. Notre plateforme 100 % digitale vous permet de comparer les offres, 
                réserver en ligne et récupérer votre véhicule en toute simplicité, avec la garantie 
                de prix transparents et d'un accompagnement humain à chaque étape de votre location.
              </p>
            </div>
          </section>

          {/* Bloc A - Contexte local Rabat */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Rabat : la mobilité au cœur de la vie professionnelle
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dans la capitale administrative, les déplacements font partie intégrante du quotidien 
                professionnel. Les ministères sont répartis entre Agdal, Hay Riad et le centre-ville, 
                les entreprises occupent des zones d'activité éloignées les unes des autres, et les 
                réunions s'enchaînent dans différents quartiers. Pour les consultants, les cadres 
                en mission ou les entrepreneurs, la voiture devient un outil de productivité essentiel.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contrairement aux taxis parfois difficiles à trouver aux heures de pointe, ou au 
                tramway qui ne dessert pas tous les quartiers d'affaires, la location de véhicule 
                vous garantit une autonomie totale. Vous planifiez vos rendez-vous sans contrainte, 
                vous rejoignez facilement Casablanca par l'autoroute pour une journée de travail, 
                vous accédez aux zones périphériques. Cette flexibilité est précieuse pour ceux 
                qui souhaitent{" "}
                <Link to="/louer?city=Rabat" className="text-primary hover:underline">
                  réserver une voiture à Rabat
                </Link>{" "}
                pour optimiser leur emploi du temps.
              </p>
            </div>
          </section>

          {/* Bloc B - MRE et familles */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Location de voiture pour MRE et familles établies à Rabat
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chaque année, de nombreux Marocains résidant à l'étranger (MRE) reviennent à Rabat 
                pour les vacances, les fêtes religieuses ou les événements familiaux. À leur arrivée 
                à l'aéroport Rabat-Salé, disposer d'un véhicule simplifie considérablement le séjour : 
                courses au Morocco Mall, visites aux proches à Témara ou Salé, escapades vers les 
                plages de Harhoura.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pour les familles résidentes, la location longue durée représente souvent une 
                alternative économique à l'achat d'un second véhicule. Benatna propose des formules 
                adaptées à toutes les durées, avec des tarifs dégressifs attractifs. Depuis l'aéroport 
                ou votre domicile à Souissi, récupérez votre véhicule et profitez de votre séjour 
                en toute sérénité. Pour{" "}
                <Link to="/louer?city=Rabat" className="text-primary hover:underline">
                  consulter les véhicules disponibles
                </Link>, notre catalogue est accessible 24h/24.
              </p>
            </div>
          </section>

          {/* Section: Pourquoi louer avec Benatna */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Pourquoi louer une voiture à Rabat avec Benatna ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Agences locales vérifiées</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous sélectionnons uniquement des partenaires de confiance à Rabat, 
                    évalués pour leur sérieux et la qualité de leur flotte.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Adapté aux professionnels</h3>
                  <p className="text-sm text-muted-foreground">
                    Tarifs longue durée, livraison au bureau, véhicules confort : 
                    notre offre répond aux besoins des professionnels en mission.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Processus 100 % digital</h3>
                  <p className="text-sm text-muted-foreground">
                    Réservez en quelques clics depuis votre téléphone. Confirmation 
                    instantanée et gestion complète depuis notre plateforme.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Support client réactif</h3>
                  <p className="text-sm text-muted-foreground">
                    Une question ? Un imprévu ? Notre équipe vous répond par WhatsApp 7j/7, 
                    en français et en arabe.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section: Types de véhicules */}
          <section className="mb-16 bg-muted/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Types de véhicules disponibles à Rabat
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Citadines</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Renault Clio, Dacia Sandero, Toyota Yaris
                    </p>
                    <p className="text-muted-foreground">
                      Parfaites pour les déplacements urbains et le stationnement en centre-ville. 
                      Économiques en carburant, idéales pour les trajets quotidiens.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 300 DH/jour</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Berlines confort</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Toyota Corolla, Volkswagen Jetta, Peugeot 308
                    </p>
                    <p className="text-muted-foreground">
                      Confort et prestance pour vos déplacements professionnels. 
                      Idéales pour les rendez-vous clients et les trajets Rabat-Casablanca.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 250 DH/jour</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">SUV</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Dacia Duster, Hyundai Tucson, Volkswagen Tiguan
                    </p>
                    <p className="text-muted-foreground">
                      Polyvalents pour la ville comme pour les excursions vers Meknès ou le Rif. 
                      Position de conduite surélevée, parfaits pour les familles.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 350 DH/jour</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Véhicules longue durée</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Berlines et SUV récents, contrats flexibles
                    </p>
                    <p className="text-muted-foreground">
                      Pour les missions de plusieurs semaines ou mois. Tarifs dégressifs, 
                      kilométrage adapté, maintenance incluse. La solution professionnelle.
                    </p>
                    <p className="text-primary font-medium mt-2">Tarifs dégressifs sur devis</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Aéroport et quartiers clés */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Louer une voiture à Rabat : aéroport et quartiers clés
            </h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
              Nos agences partenaires vous livrent votre véhicule où vous le souhaitez à Rabat. 
              Flexibilité totale pour récupérer et restituer votre voiture.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Aéroport Rabat-Salé</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Principal aéroport de la capitale. Service de livraison gratuite 
                        disponible 24h/24, 7j/7. Notre agent vous attend à la sortie des arrivées.
                      </p>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Livraison gratuite
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Centre-ville</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Avenue Mohammed V, gare Rabat-Ville. Idéal si vous arrivez 
                        par TGV ou si vous logez dans un hôtel du centre historique.
                      </p>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Livraison possible
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Agdal</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier résidentiel et commercial animé. Nombreux bureaux d'entreprises, 
                        restaurants et commerces. Accès facile au tramway.
                      </p>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Livraison possible
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Hay Riad</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Zone ministérielle et d'affaires. Mega Mall, sièges d'entreprises 
                        et administrations. Très demandé par les professionnels.
                      </p>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Livraison possible
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Souissi</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier résidentiel huppé, ambassades et villas. Calme et verdoyant, 
                        proche des institutions internationales.
                      </p>
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        Livraison possible
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Navigation className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Salé ou autre lieu ?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Vous souhaitez être livré à Salé, Témara ou ailleurs ? Contactez-nous 
                        et nous organisons la livraison selon vos besoins.
                      </p>
                      <a 
                        href="https://wa.me/212699024526?text=Bonjour, je souhaite une livraison personnalisée à Rabat."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        Demander un devis →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section: Conseils pratiques */}
          <section className="mb-16 bg-muted/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Conseils pratiques pour conduire à Rabat
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Circulation</h3>
                    <p className="text-muted-foreground">
                      Rabat est moins dense que Casablanca, mais les heures de pointe 
                      (8h-9h30 et 17h-18h30) peuvent être chargées sur les grands axes : 
                      Avenue Mohammed V, Avenue Hassan II, route de Hay Riad. Le tramway 
                      partage certaines voies, attention aux feux spécifiques.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ParkingCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Stationnement</h3>
                    <p className="text-muted-foreground">
                      Zones bleues payantes en centre-ville (5 DH/heure). Parkings souterrains : 
                      Bab El Had, gare Rabat-Ville (20-30 DH/jour). Hay Riad et Agdal offrent 
                      plus de facilités. Les gardiens informels attendent 5-10 DH de pourboire.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Zones administratives</h3>
                    <p className="text-muted-foreground">
                      Les ministères sont répartis entre Agdal, Hay Riad et le centre-ville. 
                      Prévoyez 15-20 minutes de trajet entre les quartiers aux heures de pointe. 
                      Le stationnement est souvent limité près des administrations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Fuel className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Axe Rabat–Casablanca</h3>
                    <p className="text-muted-foreground">
                      Autoroute A1 moderne et fluide (péage 20 DH). 90 km en environ 1h. 
                      Nombreuses stations-service 24h/24. Gasoil : ~13-14 DH/L, essence : ~15-16 DH/L. 
                      Trajets quotidiens fréquents pour les professionnels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Questions fréquentes – Location de voiture à Rabat
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {rabatFAQs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Avis de nos clients à Rabat
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {rabatTestimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary/20 mb-2" />
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Internal Links Section - max 2 liens vers autres villes */}
          <section className="mb-16">
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
              Découvrez aussi nos autres destinations
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/location-voiture-casablanca"
                className="px-4 py-2 bg-muted hover:bg-primary/10 rounded-full text-sm font-medium transition-colors"
              >
                Location voiture Casablanca
              </Link>
              <Link 
                to="/location-voiture-marrakech"
                className="px-4 py-2 bg-muted hover:bg-primary/10 rounded-full text-sm font-medium transition-colors"
              >
                Location voiture Marrakech
              </Link>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prêt à louer votre voiture à Rabat ?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Que ce soit pour une mission professionnelle, un séjour familial ou une exploration 
              du nord du Maroc, Benatna vous connecte aux meilleures agences de la capitale.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/louer?city=Rabat">
                <Button size="lg" className="text-lg px-8">
                  Trouver ma voiture à Rabat
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite un devis pour une location à Rabat."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Demander un devis
                </Button>
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationVoitureRabat;
