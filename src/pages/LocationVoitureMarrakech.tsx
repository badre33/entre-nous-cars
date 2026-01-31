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
  Mountain,
  Camera
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
import cityMarrakech from "@/assets/city-marrakech.jpg";

// FAQ data for schema and display
const marrakechFAQs = [
  {
    question: "Faut-il une caution pour louer une voiture à Marrakech ?",
    answer: "Oui, une caution est généralement demandée. Son montant varie selon le véhicule choisi (entre 2 000 et 5 000 DH). Chez Benatna, plusieurs de nos agences partenaires acceptent le paiement de la caution en espèces, ce qui vous évite d'avoir une carte de crédit."
  },
  {
    question: "Peut-on louer une voiture à l'aéroport Marrakech-Menara ?",
    answer: "Absolument. Nos agences partenaires proposent un service de livraison gratuite à l'aéroport Marrakech-Menara, disponible 24h/24. Un agent vous attend à votre arrivée avec les clés du véhicule, pour un départ immédiat vers la Médina ou Guéliz."
  },
  {
    question: "Quels documents sont nécessaires pour louer une voiture à Marrakech ?",
    answer: "Vous aurez besoin d'un permis de conduire valide (depuis au moins 1 an), d'une pièce d'identité (CIN pour les résidents marocains ou passeport pour les étrangers), et d'un justificatif de domicile récent. Pour les touristes, un permis international peut être requis selon le pays d'origine."
  },
  {
    question: "Quel véhicule choisir pour explorer l'Atlas depuis Marrakech ?",
    answer: "Pour les routes de montagne vers l'Ourika, Ouirgane ou le col du Tizi n'Tichka, un SUV comme le Dacia Duster ou Hyundai Tucson offre le meilleur compromis confort/praticité. Pour les routes goudronnées vers Essaouira ou Agafay, une berline ou citadine suffit amplement."
  },
  {
    question: "L'assurance est-elle incluse dans le tarif de location ?",
    answer: "Oui, tous nos véhicules sont couverts par une assurance responsabilité civile incluse dans le prix. Vous pouvez également opter pour une assurance tous risques avec franchise réduite pour une tranquillité totale pendant votre séjour."
  },
  {
    question: "Peut-on restituer le véhicule dans une autre ville que Marrakech ?",
    answer: "Oui, le service aller-simple est disponible vers les principales villes du Maroc (Casablanca, Rabat, Tanger, Agadir, Fès). Des frais de transfert peuvent s'appliquer selon la destination. Contactez-nous pour un devis personnalisé."
  }
];

// Customer reviews localized to Marrakech
const marrakechTestimonials = [
  {
    name: "Sophie L.",
    location: "France",
    rating: 5,
    comment: "Parfait pour notre road trip vers l'Atlas ! La Duster nous attendait à Menara et nous avons pu partir directement vers la vallée de l'Ourika. Service impeccable et prix transparent.",
    date: "Janvier 2025"
  },
  {
    name: "Karim A.",
    location: "Marrakech",
    rating: 5,
    comment: "Location longue durée pour 2 mois. Tarif très compétitif comparé aux grandes enseignes. Véhicule récent et bien entretenu. Le support WhatsApp répond rapidement.",
    date: "Décembre 2024"
  },
  {
    name: "Maria G.",
    location: "Espagne",
    rating: 5,
    comment: "Nous avons loué une voiture pour visiter Essaouira et les cascades d'Ouzoud. Réservation simple, livraison à notre riad dans la Médina. Je recommande vivement !",
    date: "Novembre 2024"
  }
];

const LocationVoitureMarrakech = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Location Voiture Marrakech | Agences Locales - Benatna</title>
        <meta 
          name="description" 
          content="Louez une voiture à Marrakech avec Benatna. Agences locales vérifiées, prix transparents, livraison aéroport Menara 24/7. Explorez l'Atlas et le Sud." 
        />
        <link rel="canonical" href="https://benatna.ma/location-voiture-marrakech" />
        <meta property="og:title" content="Location Voiture Marrakech | Agences Locales - Benatna" />
        <meta property="og:description" content="Louez une voiture à Marrakech avec Benatna. Agences locales vérifiées, prix transparents, réservation simple." />
        <meta property="og:url" content="https://benatna.ma/location-voiture-marrakech" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://benatna.ma/og-image.png" />
      </Helmet>

      {/* Hreflang Tags */}
      <HreflangTags path="/location-voiture-marrakech" />

      {/* Structured Data Schemas */}
      <StructuredData type="rental" />
      <ServiceSchema city="Marrakech" />
      <HowToSchema city="Marrakech" />
      <OfferSchema city="Marrakech" />
      
      <CityLocalBusinessSchema
        cityName="Marrakech"
        latitude="31.6295"
        longitude="-7.9811"
        address="Aéroport Marrakech-Menara"
        postalCode="40000"
        telephone="+212699024526"
        priceRange="150-900 MAD"
      />

      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName="Benatna Location de Voiture Marrakech"
      />

      <PriceRangeOfferSchema 
        minPrice="150"
        maxPrice="900"
        city="Marrakech"
        discount={{ percentage: 15, minDays: 30 }}
      />

      <MultiLocationSchema 
        locations={[
          {
            name: "Aéroport Marrakech-Menara",
            address: "Aéroport Marrakech-Menara, Terminal Arrivées",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6069",
            longitude: "-8.0363",
            description: "Livraison gratuite 24/7 à l'aéroport international de Marrakech."
          },
          {
            name: "Guéliz Centre-ville",
            address: "Avenue Mohammed V, Guéliz",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6295",
            longitude: "-7.9811",
            description: "Quartier moderne de Marrakech, proche des commerces et restaurants."
          },
          {
            name: "Médina - Place Jemaa el-Fna",
            address: "Périphérie Médina, Marrakech",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6259",
            longitude: "-7.9893",
            description: "Livraison à votre riad ou hôtel dans la Médina historique."
          },
          {
            name: "Hivernage",
            address: "Quartier Hivernage",
            city: "Marrakech",
            postalCode: "40000",
            latitude: "31.6185",
            longitude: "-8.0125",
            description: "Quartier huppé, proche des hôtels de luxe et du Palais des Congrès."
          }
        ]}
      />

      <OpeningHoursSchema 
        city="Marrakech"
        entityType="LocalBusiness"
        address="Aéroport Marrakech-Menara"
        latitude="31.6069"
        longitude="-8.0363"
      />

      <VehicleProductSchemas city="Marrakech" />

      <FAQSchemaEnriched 
        pageName="Location de Voiture à Marrakech"
        faqs={marrakechFAQs}
      />

      <Header />

      {/* Breadcrumbs */}
      <EnhancedBreadcrumbs 
        items={[
          createBreadcrumbs.home(),
          createBreadcrumbs.services(),
          createBreadcrumbs.city("Marrakech", "marrakech")
        ]}
        showIcons={true}
      />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <img 
          src={cityMarrakech}
          alt={generateCityImageAlt("Marrakech")}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          sizes="100vw"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/40" />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Location de Voiture à Marrakech – Louez Simplement avec Benatna
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Agences locales vérifiées • Prix transparents • Livraison aéroport 24/7
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/louer?city=Marrakech">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  Trouver ma voiture à Marrakech
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite louer une voiture à Marrakech."
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
                Marrakech, la ville ocre, est l'une des destinations les plus emblématiques du Maroc. 
                Entre sa Médina millénaire classée UNESCO, ses souks envoûtants et la majestueuse 
                chaîne de l'Atlas en toile de fond, la ville fascine des millions de visiteurs chaque année. 
                Que vous arriviez pour un week-end romantique, un voyage en famille ou une aventure 
                dans le désert, disposer de votre propre véhicule transforme complètement votre expérience.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Louer une voiture à Marrakech vous offre une liberté totale pour explorer non seulement 
                la ville – de Guéliz moderne à la Palmeraie verdoyante – mais aussi ses environs 
                exceptionnels : la vallée de l'Ourika (1h), le désert d'Agafay (45 min), Essaouira (2h30) 
                ou les cascades d'Ouzoud (2h30). Pour{" "}
                <Link to="/louer?city=Marrakech" className="text-primary hover:underline">
                  voir les voitures disponibles à Marrakech
                </Link>, consultez notre catalogue.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Benatna connecte les voyageurs aux meilleures agences de location marrakchies. 
                Notre plateforme 100 % digitale vous permet de comparer, réserver et récupérer 
                votre véhicule en toute simplicité, avec la garantie de prix transparents et 
                d'un accompagnement humain à chaque étape.
              </p>
            </div>
          </section>

          {/* Bloc A - Contexte local Marrakech */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Marrakech : une ville à explorer au volant
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contrairement à ce que l'on pourrait croire, Marrakech ne se limite pas à sa Médina 
                piétonne. La ville s'étend sur plus de 230 km², englobant des quartiers très différents : 
                Guéliz et l'Hivernage au nord-ouest avec leurs boulevards modernes, la Palmeraie au 
                nord-est avec ses milliers de palmiers et complexes hôteliers, ou encore la route de 
                l'Ourika au sud qui mène directement vers les montagnes de l'Atlas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pour les touristes comme pour les professionnels en déplacement, la voiture devient 
                rapidement indispensable. Elle permet de relier l'aéroport Menara à votre hébergement 
                en 20 minutes, d'enchaîner les visites (Jardin Majorelle, Palais Bahia, Ménara) sans 
                attendre de taxi, ou de partir en excursion à la journée vers des sites naturels 
                inaccessibles autrement. Cette autonomie fait gagner un temps précieux aux voyageurs 
                qui souhaitent{" "}
                <Link to="/louer?city=Marrakech" className="text-primary hover:underline">
                  réserver une voiture à Marrakech
                </Link>{" "}
                pour profiter pleinement de leur séjour.
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
                Marrakech attire chaque année des centaines de milliers de Marocains résidant à 
                l'étranger (MRE) et de touristes internationaux. À leur arrivée à l'aéroport 
                Marrakech-Menara, la question du transport se pose immédiatement. Entre les taxis 
                parfois peu fiables et les navettes organisées aux horaires rigides, la location 
                de voiture s'impose comme la solution la plus flexible et économique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Que vous reveniez au pays pour les fêtes ou que vous découvriez le Maroc pour 
                la première fois, Benatna propose des formules adaptées à toutes les durées. 
                Les visiteurs internationaux apprécient particulièrement la transparence de 
                notre service : pas de frais cachés, pas de négociation au comptoir, un prix 
                clair dès la réservation en ligne. Depuis l'aéroport ou votre riad dans la Médina, 
                récupérez votre véhicule et partez sereinement explorer Marrakech et le Sud marocain. 
                Pour{" "}
                <Link to="/louer?city=Marrakech" className="text-primary hover:underline">
                  consulter les véhicules disponibles
                </Link>, notre catalogue est accessible 24h/24.
              </p>
            </div>
          </section>

          {/* Bloc C - Marrakech point de départ excursions */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Marrakech : porte d'entrée vers l'Atlas, le désert et la côte
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Louer une voiture à Marrakech, c'est s'ouvrir un monde d'excursions inoubliables. 
                En moins d'une heure, vous atteignez la vallée de l'Ourika, ses cascades et ses villages 
                berbères accrochés à flanc de montagne. Le désert d'Agafay, aux portes de la ville, offre 
                un avant-goût des dunes avec ses camps de luxe étoilés. Les amateurs de routes sinueuses 
                empruntent le mythique col du Tizi n'Tichka pour rejoindre Ouarzazate et les studios de cinéma.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Côté océan, Essaouira et ses remparts portugais se situent à 2h30 de route – idéal pour 
                une escapade de 2 jours. Les cascades d'Ouzoud, les plus hautes du Maroc, méritent également 
                le détour. Avec un véhicule adapté, ces destinations deviennent accessibles en toute autonomie, 
                sans dépendre d'excursions organisées. Pour{" "}
                <Link to="/louer?city=Marrakech" className="text-primary hover:underline">
                  explorer les voitures disponibles à Marrakech
                </Link>, consultez notre sélection de SUV, berlines et citadines adaptés à chaque aventure.
              </p>
            </div>
          </section>

          {/* Section: Pourquoi louer avec Benatna */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Pourquoi louer une voiture à Marrakech avec Benatna ?
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
              Types de véhicules disponibles à Marrakech
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
                      Parfaites pour circuler dans Guéliz et les environs de Marrakech. 
                      Compactes, économiques et faciles à garer près des souks et restaurants.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 150 DH/jour</p>
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
                      Confort et espace pour les longs trajets vers Essaouira, Ouarzazate ou Agadir. 
                      Climatisation performante, coffre spacieux pour les bagages.
                    </p>
                    <p className="text-primary font-medium mt-2">À partir de 250 DH/jour</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mountain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">SUV</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      Dacia Duster, Hyundai Tucson, Volkswagen Tiguan
                    </p>
                    <p className="text-muted-foreground">
                      Idéaux pour les routes de montagne vers l'Atlas et les excursions hors des 
                      sentiers battus. Position de conduite surélevée, robustes et polyvalents.
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
                      Parfaits pour les circuits d'une semaine à travers le Sud marocain.
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
              Louer une voiture à Marrakech : aéroport et quartiers clés
            </h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">
              Nos agences partenaires vous livrent votre véhicule où vous le souhaitez à Marrakech. 
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
                      <h3 className="font-semibold mb-2">Aéroport Marrakech-Menara</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Principal aéroport de Marrakech, à 6 km du centre. Service de livraison 
                        gratuite disponible 24h/24. Notre agent vous attend à la sortie des arrivées.
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
                      <h3 className="font-semibold mb-2">Guéliz</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier moderne de Marrakech, avenue Mohammed V. Commerces, restaurants, 
                        hôtels de standing. Accès facile vers toutes les directions.
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
                      <Camera className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Médina / Place Jemaa el-Fna</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Cœur historique de Marrakech. Livraison possible en périphérie de la Médina 
                        (parkings Bab Doukkala, Koutoubia). Idéal pour les riads.
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
                      <h3 className="font-semibold mb-2">Hivernage</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Quartier huppé avec ses hôtels de luxe, casinos et le Palais des Congrès. 
                        Proche du centre, ambiance chic et internationale.
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
                      <h3 className="font-semibold mb-2">Palmeraie</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Oasis de 15 000 palmiers au nord de Marrakech. Resorts, golfs, activités 
                        quad. Ambiance nature à 15 min du centre-ville.
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
                        Vous souhaitez être livré ailleurs à Marrakech ? Contactez-nous et 
                        nous organisons la livraison selon vos besoins.
                      </p>
                      <a 
                        href="https://wa.me/212699024526?text=Bonjour, je souhaite une livraison personnalisée à Marrakech."
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
              Conseils pratiques pour conduire à Marrakech
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
                      La circulation à Marrakech est dense autour de Guéliz et de la Médina, 
                      surtout aux heures de pointe (8h-10h et 17h-19h). Les scooters et vélos 
                      sont nombreux. Restez vigilant aux ronds-points et dans les ruelles 
                      étroites des quartiers résidentiels.
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
                      La Médina est entièrement piétonne. Parkings recommandés : Place Jemaa el-Fna 
                      (15 DH/h), Bab Doukkala, Koutoubia. Gardiens de parking présents partout 
                      (5-10 DH pourboire). Les hôtels et riads proposent souvent des parkings sécurisés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mountain className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Routes de montagne</h3>
                    <p className="text-muted-foreground">
                      Les routes vers l'Atlas (Ourika, Tizi n'Tichka) sont bien goudronnées mais 
                      sinueuses. Prévoyez 30 % de temps supplémentaire par rapport au GPS. 
                      En hiver, vérifiez l'état des cols (neige possible au-dessus de 2 000 m). 
                      Un SUV est recommandé pour les pistes secondaires.
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
                      Péages : Marrakech-Casablanca (90 DH), Marrakech-Agadir (75 DH). 
                      Faites le plein avant de partir vers les zones montagneuses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Questions fréquentes – Location de voiture à Marrakech
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {marrakechFAQs.map((faq, index) => (
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
              Avis de nos clients à Marrakech
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {marrakechTestimonials.map((testimonial, index) => (
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
              Prêt à explorer Marrakech et le Sud marocain ?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-lg">
              Comparez les offres de nos agences partenaires et réservez votre véhicule 
              en quelques clics. Prix transparents, sans mauvaises surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/louer?city=Marrakech">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 w-full sm:w-auto"
                >
                  Trouver ma voiture à Marrakech
                </Button>
              </Link>
              <a 
                href="https://wa.me/212699024526?text=Bonjour, je souhaite louer une voiture à Marrakech."
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
                to="/location-voiture-casablanca"
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
              >
                Location voiture Casablanca
              </Link>
              <Link 
                to="/location-voiture-agadir"
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
              >
                Location voiture Agadir
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationVoitureMarrakech;
