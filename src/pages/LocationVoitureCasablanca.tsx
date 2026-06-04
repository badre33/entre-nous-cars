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
  Quote
} from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { CityLocalBusinessSchema } from "@/components/CityLocalBusinessSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import HowToSchema from "@/components/HowToSchema";
import { OfferSchema } from "@/components/OfferSchema";
import { BUSINESS_INFO } from "@/constants/businessInfo";
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
import cityCasablanca from "@/assets/city-casablanca.jpg";

// FAQ data for schema and display
const casablancaFAQs = [
  {
    question: "Faut-il une caution pour louer une voiture à Casablanca ?",
    answer: "Oui, une caution est généralement demandée. Son montant varie selon le véhicule choisi (entre 2 000 et 5 000 DH). Chez Benatna, plusieurs de nos agences partenaires acceptent le paiement de la caution en espèces, ce qui vous évite d'avoir une carte de crédit."
  },
  {
    question: "Peut-on louer une voiture à l'aéroport Mohammed V de Casablanca ?",
    answer: "Absolument. Nos agences partenaires proposent un service de livraison gratuite à l'aéroport Mohammed V, disponible 24h/24. Un agent vous attend à votre arrivée avec les clés du véhicule, pour un départ immédiat."
  },
  {
    question: "Quels documents sont nécessaires pour louer une voiture à Casablanca ?",
    answer: "Vous aurez besoin d'un permis de conduire valide (depuis au moins 1 an), d'une pièce d'identité (CIN pour les résidents marocains ou passeport pour les étrangers), et d'un justificatif de domicile récent. Pour les touristes, un permis international peut être requis selon le pays d'origine."
  },
  {
    question: "Puis-je louer une voiture pour une courte ou longue durée ?",
    answer: "Oui, nos offres s'adaptent à tous les besoins : location à la journée, au week-end, à la semaine ou au mois. Pour les locations longue durée (30 jours et plus), vous bénéficiez de tarifs dégressifs avantageux, jusqu'à -15% sur le prix journalier."
  },
  {
    question: "L'assurance est-elle incluse dans le tarif de location ?",
    answer: "Oui, tous nos véhicules sont couverts par une assurance responsabilité civile incluse dans le prix. Vous pouvez également opter pour une assurance tous risques avec franchise réduite pour une tranquillité totale pendant votre séjour."
  },
  {
    question: "Peut-on restituer le véhicule dans une autre ville que Casablanca ?",
    answer: "Oui, le service aller-simple est disponible vers les principales villes du Maroc (Marrakech, Rabat, Tanger, Agadir, Fès). Des frais de transfert peuvent s'appliquer selon la destination. Contactez-nous pour un devis personnalisé."
  }
];

// Customer reviews localized to Casablanca
const casablancaTestimonials = [
  {
    name: "Youssef M.",
    location: "Casablanca",
    rating: 5,
    comment: "Service impeccable à l'aéroport Mohammed V. L'agent m'attendait à la sortie avec une Dacia Duster impeccable. Processus rapide et prix conforme au devis.",
    date: "Janvier 2025"
  },
  {
    name: "Claire D.",
    location: "France",
    rating: 5,
    comment: "Première location au Maroc et excellente expérience. La Clio était récente et propre. Livraison à mon hôtel à Ain Diab sans supplément. Je recommande !",
    date: "Décembre 2024"
  },
  {
    name: "Hamid B.",
    location: "Casablanca",
    rating: 5,
    comment: "Location longue durée pour 3 mois. Tarif très compétitif et véhicule fiable. Le support WhatsApp est réactif pour toute question.",
    date: "Novembre 2024"
  }
];

const LocationVoitureCasablanca = () => {

  // WORKAROUND react-helmet-async: force-set document.title, meta description,
  // canonical and OG tags via direct DOM API. Helmet leaks default values.
  useEffect(() => {
    document.title = "Location Voiture Casablanca dès 300 DH/jour | Sans Carte de Crédit - Benatna";
    const setMeta = (selector: string, attr: string, value: string, key: string, keyVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement(selector.includes('link') ? 'link' : 'meta');
        el.setAttribute(key, keyVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', "Location de voiture à Casablanca dès 300 DH/jour. Agences locales vérifiées, livraison aéroport Mohammed V, sans carte de crédit.", 'name', 'description');
    setMeta('link[rel="canonical"]', 'href', "https://benatna.ma/location-voiture-casablanca", 'rel', 'canonical');
    setMeta('meta[property="og:title"]', 'content', "Location Voiture Casablanca dès 300 DH/jour | Sans Carte de Crédit - Benatna", 'property', 'og:title');
    setMeta('meta[property="og:description"]', 'content', "Location de voiture à Casablanca dès 300 DH/jour. Agences locales vérifiées, livraison aéroport Mohammed V, sans carte de crédit.", 'property', 'og:description');
    setMeta('meta[property="og:url"]', 'content', "https://benatna.ma/location-voiture-casablanca", 'property', 'og:url');
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Location Voiture Casablanca dès 300 DH/jour | Sans Carte de Crédit - Benatna</title>
        <meta 
          name="description" 
          content="Louez une voiture à Casablanca dès 300 DH/jour. Livraison gratuite aéroport Mohammed V, large choix de véhicules, agences locales vérifiées. Réservez en ligne." 
        />
        <link rel="canonical" href="https://benatna.ma/location-voiture-casablanca" />
        <meta property="og:title" content="Location Voiture Casablanca | Agences Locales - Benatna" />
        <meta property="og:description" content="Louez une voiture à Casablanca avec Benatna. Agences locales vérifiées, prix transparents, réservation simple." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-casablanca" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://benatna.ma/og-image.png" />
      </Helmet>

      {/* Hreflang Tags */}
      <HreflangTags path="/location-voiture-casablanca" />

      {/* Structured Data Schemas */}
      <StructuredData type="rental" />
      <ServiceSchema city="Casablanca" />
      <HowToSchema city="Casablanca" />
      <OfferSchema city="Casablanca" />
      
      <CityLocalBusinessSchema
        cityName="Casablanca"
        latitude="33.5731"
        longitude="-7.5898"
        address="Aéroport Mohammed V"
        postalCode="27000"
        telephone="+212699024526"
        priceRange="150-900 MAD"
      />

      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Casablanca"
      />

      <PriceRangeOfferSchema 
        minPrice="300"
        maxPrice="900"
        city="Casablanca"
        discount={{ percentage: 15, minDays: 30 }}
      />

      <MultiLocationSchema 
        locations={[
          {
            name: "Aéroport Mohammed V",
            address: "Aéroport Mohammed V, Terminal 1 et 2",
            city: "Casablanca",
            postalCode: "27000",
            latitude: "33.3676",
            longitude: "-7.5898",
            description: "Livraison gratuite 24/7 à l'aéroport international de Casablanca."
          },
          {
            name: "Centre-ville Casablanca",
            address: "Boulevard Mohammed V",
            city: "Casablanca",
            postalCode: "20000",
            latitude: "33.5731",
            longitude: "-7.6019",
            description: "Point de retrait central, proche des hôtels et quartiers d'affaires."
          },
          {
            name: "Sidi Maarouf",
            address: "Quartier Sidi Maarouf",
            city: "Casablanca",
            postalCode: "20190",
            latitude: "33.5350",
            longitude: "-7.6580",
            description: "Zone d'affaires et commerciale, idéal pour les professionnels."
          },
          {
            name: "Ain Diab",
            address: "Corniche Ain Diab",
            city: "Casablanca",
            postalCode: "20050",
            latitude: "33.5985",
            longitude: "-7.6704",
            description: "Front de mer, parfait pour les séjours balnéaires et touristiques."
          }
        ]}
      />

      <OpeningHoursSchema 
        city="Casablanca"
        entityType="LocalBusiness"
        address="Aéroport Mohammed V"
        latitude="33.3676"
        longitude="-7.5898"
      />

      <VehicleProductSchemas city="Casablanca" />

      <FAQSchemaEnriched 
        pageName="Location de Voiture à Casablanca"
        faqs={casablancaFAQs}
      />

      <Header />

      {/* Breadcrumbs */}
      <EnhancedBreadcrumbs 
        items={[
          createBreadcrumbs.home(),
          createBreadcrumbs.services(),
          createBreadcrumbs.city("Casablanca", "casablanca")
        ]}
        showIcons={true}
      />

      {/* Hero Section */}
      <section className="relative min-h-[320px] sm:min-h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityCasablanca}
          alt={generateCityImageAlt("Casablanca")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Location de Voiture à Casablanca – Louez Simplement avec Benatna
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Agences locales vérifiées • Prix transparents • Livraison aéroport 24/7
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Casablanca">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  Trouver ma voiture à Casablanca
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite louer une voiture à Casablanca."
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

          {/* Introduction Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Casablanca, capitale économique du Maroc, est une métropole vibrante qui ne dort jamais. 
                Avec ses 4 millions d'habitants, ses quartiers d'affaires modernes et sa corniche 
                méditerranéenne, la ville s'étend sur plus de 200 km². Que vous arriviez pour affaires, 
                pour visiter la majestueuse Mosquée Hassan II ou pour explorer les environs du Maroc, 
                disposer de votre propre véhicule change tout.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Louer une voiture à Casablanca vous offre une liberté totale pour naviguer entre 
                Ain Diab, le Morocco Mall, les quartiers des Habous et Sidi Maarouf sans dépendre 
                des taxis ou des transports en commun. C'est aussi le point de départ idéal pour 
                rejoindre Rabat (90 km), El Jadida (100 km) ou Marrakech (240 km). Pour{" "}
                <Link to="/louer?city=Casablanca" className="text-primary hover:underline">
                  voir les voitures disponibles à Casablanca
                </Link>, consultez notre catalogue.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Benatna connecte les voyageurs aux meilleures agences de location casablancaises. 
                Notre plateforme 100 % digitale vous permet de comparer, réserver et récupérer 
                votre véhicule en toute simplicité, avec la garantie de prix transparents et 
                d'un accompagnement humain à chaque étape.
              </p>
            </div>
          </section>

          {/* Bloc A - Contexte local Casablanca */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              La mobilité à Casablanca : un enjeu quotidien
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Dans une ville aussi étendue que Casablanca, les déplacements représentent un défi 
                permanent. Entre les quartiers d'affaires de Sidi Maarouf et Ain Sebaa, les zones 
                commerciales du centre-ville et les secteurs résidentiels périphériques, les distances 
                se comptent en dizaines de kilomètres. Pour les professionnels en déplacement, 
                les cadres en mission ou les entrepreneurs locaux, la voiture devient un outil 
                de productivité indispensable.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contrairement aux taxis qui imposent leurs itinéraires ou aux applications VTC 
                parfois indisponibles aux heures de pointe, la location de véhicule vous garantit 
                une autonomie totale. Vous planifiez vos rendez-vous sans contrainte horaire, 
                vous enchaînez les réunions dans différents quartiers, vous accédez aux zones 
                industrielles excentrées. Cette flexibilité fait gagner un temps précieux aux 
                professionnels qui souhaitent{" "}
                <Link to="/louer?city=Casablanca" className="text-primary hover:underline">
                  réserver une voiture à Casablanca
                </Link>{" "}
                pour optimiser leur agenda.
              </p>
            </div>
          </section>

          {/* Bloc B - MRE et visiteurs */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Location de voiture pour MRE et visiteurs internationaux
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Chaque année, des centaines de milliers de Marocains résidant à l'étranger (MRE) 
                rentrent au pays pour les vacances, les fêtes ou les événements familiaux. 
                À leur arrivée à l'aéroport Mohammed V, la question du transport se pose 
                immédiatement. Plutôt que de dépendre de proches ou de multiplier les trajets 
                en taxi, la location de voiture offre une solution simple et économique pour 
                profiter pleinement de son séjour.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Que vous reveniez pour deux semaines ou deux mois, Benatna propose des formules 
                adaptées à toutes les durées. Les visiteurs internationaux apprécient 
                particulièrement la transparence de notre service : pas de frais cachés, 
                pas de négociation au comptoir, un prix clair dès la réservation en ligne. 
                Depuis l'aéroport ou votre hôtel en centre-ville, récupérez votre véhicule 
                et partez sereinement explorer Casablanca et ses environs. Pour{" "}
                <Link to="/louer?city=Casablanca" className="text-primary hover:underline">
                  consulter les véhicules disponibles
                </Link>, notre catalogue est accessible 24h/24.
              </p>
            </div>
          </section>

          {/* Section: Pourquoi louer avec Benatna */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Pourquoi louer une voiture à Casablanca avec Benatna ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Agences locales vérifiées</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous sélectionnons uniquement des partenaires de confiance, évalués et validés 
                    pour leur sérieux et la qualité de leur flotte.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Prix transparents</h3>
                  <p className="text-sm text-muted-foreground">
                    Le tarif affiché est le tarif final. Pas de frais cachés, pas de mauvaises 
                    surprises au moment de récupérer votre véhicule.
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
                    Réservez en quelques clics depuis votre téléphone. Recevez votre confirmation 
                    instantanément et gérez tout depuis notre plateforme.
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
              Types de véhicules disponibles à Casablanca
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
                      Renault Clio, Dacia Sandero, Peugeot 208
                    </p>
                    <p className="text-muted-foreground">
                      Idéales pour circuler dans les ruelles du centre-ville et se garer facilement. 
                      Économiques en carburant, parfaites pour les trajets urbains quotidiens.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 300 DH/jour</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Berlines</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Toyota Corolla, Volkswagen Jetta, Peugeot 308
                    </p>
                    <p className="text-muted-foreground">
                      Confort et espace pour vos déplacements professionnels ou familiaux. 
                      Coffre spacieux pour les bagages, climatisation performante.
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
                      Polyvalents pour la ville comme pour les excursions vers l'Atlas ou le désert. 
                      Position de conduite surélevée, parfaits pour les routes variées du Maroc.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 350 DH/jour</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Vans & véhicules familiaux</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Dacia Jogger, Peugeot Rifter, Renault Kangoo
                    </p>
                    <p className="text-muted-foreground">
                      7 à 9 places pour les familles nombreuses ou les groupes d'amis. 
                      Grand espace de chargement pour les voyages avec beaucoup de bagages.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 400 DH/jour</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Aéroport et quartiers clés */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Louer une voiture à Casablanca : aéroport et quartiers clés
            </h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
              Nos agences partenaires vous livrent votre véhicule où vous le souhaitez à Casablanca. 
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
                      <h3 className="font-semibold mb-2">Aéroport Mohammed V</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Principal hub international du Maroc. Service de livraison gratuite 
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
                        Boulevard Mohammed V, Place des Nations Unies. Idéal si vous logez 
                        dans un hôtel du centre ou si vous avez des rendez-vous d'affaires.
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
                      <h3 className="font-semibold mb-2">Sidi Maarouf</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier d'affaires moderne avec Casanearshore et nombreuses entreprises. 
                        Accès rapide à l'autoroute vers Marrakech.
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
                      <h3 className="font-semibold mb-2">Ain Diab</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Corniche et front de mer. Parfait pour les séjours balnéaires et les 
                        hôtels de la côte. Ambiance vacances garantie.
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
                      <h3 className="font-semibold mb-2">Bourgogne</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier résidentiel central, proche du parc de la Ligue Arabe et 
                        des commerces du centre. Accès facile à toute la ville.
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
                      <h3 className="font-semibold mb-2">Autre lieu ?</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Vous souhaitez être livré ailleurs à Casablanca ? Contactez-nous et 
                        nous organisons la livraison selon vos besoins.
                      </p>
                      <a 
                        href="https://wa.me/212699024526?text=Bonjour, je souhaite une livraison personnalisée à Casablanca."
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
              Conseils pratiques pour conduire à Casablanca
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
                      Casablanca connaît un trafic dense, particulièrement aux heures de pointe 
                      (8h-10h et 17h-19h30). Les grands axes comme le Boulevard Zerktouni, 
                      l'Avenue des FAR et la route de l'aéroport peuvent être très chargés. 
                      Prévoyez une marge de temps pour vos rendez-vous importants.
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
                      Les zones de stationnement payant sont marquées en bleu, avec des gardiens 
                      (5-10 DH/heure). Les centres commerciaux (Morocco Mall, Anfa Place) offrent 
                      des parkings gratuits. Pour une journée entière, comptez 20-40 DH dans 
                      un parking couvert sécurisé.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Heures de pointe</h3>
                    <p className="text-muted-foreground">
                      Évitez si possible les trajets entre 8h-10h (entrée au travail) et 
                      17h-19h30 (sortie). Le vendredi après la prière du midi et le dimanche 
                      soir sont également des moments de forte affluence. 
                      Les week-ends sont généralement plus fluides.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Fuel className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Carburant et autoroutes</h3>
                    <p className="text-muted-foreground">
                      Nombreuses stations-service 24h/24 (Afriquia, Total, Shell). 
                      Gasoil : ~13-14 DH/L, essence : ~15-16 DH/L. 
                      Péages autoroute : Casablanca-Rabat (20 DH), Casablanca-Marrakech (90 DH). 
                      Autoroutes modernes et bien entretenues.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Questions fréquentes – Location de voiture à Casablanca
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {casablancaFAQs.map((faq, index) => (
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
              Avis de nos clients à Casablanca
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {casablancaTestimonials.map((testimonial, index) => (
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
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Note moyenne : <span className="font-semibold">4.8/5</span> basée sur plus de 1 200 avis clients
              </p>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Prêt à explorer Casablanca en toute liberté ?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Comparez les offres de nos agences partenaires et réservez votre véhicule 
              en quelques clics. Prix transparents, sans mauvaises surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/louer?city=Casablanca">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 w-full sm:w-auto"
                >
                  Trouver ma voiture à Casablanca
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite louer une voiture à Casablanca."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg px-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Parler à un conseiller
                </Button>
              </a>
            </div>
          </section>

          {/* Internal Links Section - max 2 liens vers autres villes */}
          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-6 text-center">
              Découvrez aussi nos autres destinations
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/location-voiture-marrakech"
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
              >
                Location voiture Marrakech
              </Link>
              <Link 
                to="/location-voiture-rabat"
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
              >
                Location voiture Rabat
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationVoitureCasablanca;
