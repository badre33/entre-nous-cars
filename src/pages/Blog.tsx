import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, MapPin, Car, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "10 conseils essentiels pour conduire au Maroc",
      excerpt: "Découvrez les bonnes pratiques et règles de conduite pour rouler en toute sécurité sur les routes marocaines.",
      category: "Conduite",
      date: "15 janvier 2025",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=500&fit=crop",
      content: [
        "La conduite au Maroc peut être une expérience enrichissante si vous connaissez les bonnes pratiques locales.",
        "1. Respectez les limites de vitesse : 120 km/h sur autoroute, 100 km/h sur route nationale, 60 km/h en ville.",
        "2. Soyez vigilant aux intersections : les priorités ne sont pas toujours respectées.",
        "3. Utilisez votre klaxon avec modération, c'est une pratique courante mais pas obligatoire.",
        "4. Anticipez les comportements des autres conducteurs, notamment les deux-roues.",
        "5. Prévoyez du temps supplémentaire pour vos trajets, surtout en ville.",
        "6. Gardez vos documents sur vous : permis de conduire, carte grise, assurance.",
        "7. Faites attention aux animaux sur les routes rurales.",
        "8. Évitez de conduire la nuit sur les routes secondaires.",
        "9. Stationnez dans des zones surveillées, surtout en ville.",
        "10. En cas de problème, contactez votre agence de location immédiatement."
      ]
    },
    {
      id: 2,
      title: "Les plus beaux road trips au Maroc en voiture",
      excerpt: "De Marrakech à Merzouga, découvrez les itinéraires incontournables pour explorer le Maroc en liberté.",
      category: "Tourisme",
      date: "10 janvier 2025",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop",
      content: [
        "Le Maroc offre des paysages extraordinaires qui se découvrent parfaitement en voiture.",
        "Itinéraire 1 : La Route des Kasbahs (Marrakech - Ouarzazate - Merzouga)",
        "Durée recommandée : 4 à 5 jours",
        "Points d'intérêt : Vallée du Dadès, Gorges du Todra, Dunes de Merzouga",
        "Type de véhicule conseillé : SUV ou 4x4 pour plus de confort",
        "Itinéraire 2 : La Côte Atlantique (Casablanca - Essaouira - Agadir)",
        "Durée recommandée : 3 à 4 jours",
        "Points d'intérêt : Plages, ports de pêche, médinas côtières",
        "Type de véhicule conseillé : Berline ou citadine",
        "Itinéraire 3 : Le Nord Montagneux (Tanger - Chefchaouen - Fès)",
        "Durée recommandée : 4 jours",
        "Points d'intérêt : Montagnes du Rif, ville bleue de Chefchaouen, médina de Fès",
        "Type de véhicule conseillé : Berline confortable",
        "Conseils pratiques : Réservez vos hébergements à l'avance en haute saison, prévoyez de l'eau et des snacks, et n'hésitez pas à faire des pauses pour admirer les paysages."
      ]
    },
    {
      id: 3,
      title: "Comprendre l'assurance voiture au Maroc",
      excerpt: "Tout ce que vous devez savoir sur l'assurance, la franchise et la protection lors de votre location.",
      category: "Assurance",
      date: "5 janvier 2025",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
      content: [
        "L'assurance est un élément crucial lors de la location d'une voiture au Maroc.",
        "Types d'assurance disponibles :",
        "Assurance au tiers : Obligatoire, couvre les dommages causés à des tiers.",
        "Assurance tous risques : Recommandée, couvre également les dommages à votre véhicule.",
        "Protection vol et incendie : Souvent incluse dans l'assurance tous risques.",
        "La franchise : montant qui reste à votre charge en cas de sinistre.",
        "Franchise standard : généralement entre 3000 et 8000 MAD selon le véhicule.",
        "Option zéro franchise : possible moyennant un supplément journalier.",
        "Ce qui est couvert : accidents de circulation, vol, incendie, bris de glace.",
        "Ce qui n'est pas couvert : négligence grave, conduite en état d'ivresse, dommages au bas de caisse sur pistes non autorisées.",
        "Documents nécessaires en cas d'accident : constat amiable, photos, coordonnées des témoins.",
        "Conseil : Prenez des photos du véhicule avant de partir et vérifiez bien l'état du véhicule avec l'agence.",
        "En cas de sinistre : contactez immédiatement votre agence de location et les autorités si nécessaire."
      ]
    },
    {
      id: 4,
      title: "Budget location de voiture au Maroc : guide complet",
      excerpt: "Combien coûte vraiment une location de voiture ? Nos conseils pour optimiser votre budget.",
      category: "Budget",
      date: "28 décembre 2024",
      image: "https://images.unsplash.com/photo-1554224311-beee460201f1?w=800&h=500&fit=crop",
      content: [
        "Louer une voiture au Maroc peut être très économique si vous savez comment vous y prendre.",
        "Prix moyens par catégorie (par jour, assurance comprise) :",
        "Citadine économique : 250 à 350 MAD/jour",
        "Berline confort : 400 à 600 MAD/jour",
        "SUV : 600 à 900 MAD/jour",
        "4x4 premium : 1000 à 1500 MAD/jour",
        "Facteurs qui influencent le prix :",
        "La saison : haute saison (été, vacances) = prix plus élevés",
        "La durée : locations longues = tarifs dégressifs",
        "La ville : les grandes villes touristiques peuvent être plus chères",
        "L'âge du conducteur : surcharge pour les moins de 25 ans (environ 50-100 MAD/jour)",
        "Le type d'assurance : tous risques plus cher que tiers",
        "Frais additionnels à prévoir :",
        "Carburant : environ 12-14 MAD/litre pour l'essence",
        "Péages autoroutiers : 5 à 20 MAD par section",
        "Parking surveillé : 5 à 20 MAD par période",
        "Conducteur supplémentaire : 50 à 100 MAD/jour",
        "GPS : souvent gratuit ou 30-50 MAD/jour",
        "Conseils pour économiser :",
        "Réservez à l'avance pour bénéficier des meilleurs tarifs",
        "Comparez les offres sur Benatna pour trouver le meilleur rapport qualité/prix",
        "Optez pour une location longue durée si vous restez plusieurs semaines",
        "Vérifiez ce qui est inclus dans le prix (kilométrage illimité, deuxième conducteur)",
        "Rendez le véhicule avec le plein fait pour éviter les frais de remplissage"
      ]
    },
    {
      id: 5,
      title: "Stationnement au Maroc : tout ce qu'il faut savoir",
      excerpt: "Parkings surveillés, gardiens, zones bleues... Le guide pratique du stationnement dans les villes marocaines.",
      category: "Pratique",
      date: "20 décembre 2024",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=500&fit=crop",
      content: [
        "Le stationnement au Maroc fonctionne différemment selon les villes et les quartiers.",
        "Les gardiens de parking (gardiens informels) :",
        "Présents dans presque toutes les rues des grandes villes",
        "Portent souvent un gilet ou un badge",
        "Vous aident à vous garer et surveillent votre véhicule",
        "Tarif habituel : 2 à 5 MAD pour quelques heures, 5 à 10 MAD pour la journée",
        "Conseil : donnez toujours un pourboire au gardien, c'est une pratique courante et appréciée",
        "Les parkings surveillés officiels :",
        "Plus sécurisés, surtout pour les longues durées",
        "Tarifs : 5 à 10 MAD par heure, 20 à 50 MAD par 24h",
        "Souvent situés près des centres commerciaux, hôtels et sites touristiques",
        "Ticket à l'entrée, paiement à la sortie",
        "Les zones bleues (stationnement payant) :",
        "Présentes dans les centre-villes (Casablanca, Rabat, Marrakech)",
        "Horodateurs ou tickets à acheter chez les commerçants",
        "Tarif horaire : 2 à 5 MAD",
        "Attention aux PV en cas de non-paiement",
        "Règles importantes :",
        "Ne stationnez jamais sur les passages piétons ou devant les accès",
        "Évitez de laisser des objets de valeur visibles dans la voiture",
        "Verrouillez toujours votre véhicule",
        "Dans les médinas : privilégiez les parkings à l'entrée, les ruelles sont souvent inaccessibles en voiture",
        "Où se garer selon les villes :",
        "Marrakech : Parkings Jemaa el-Fna, Koutoubia, ou votre riad",
        "Casablanca : Parkings souterrains du centre, Morocco Mall, Twin Center",
        "Rabat : Parkings de l'Agdal, Hassan, Kasbah des Oudayas",
        "Fès : Parkings aux portes de la médina (Bab Boujloud, Bab Ftouh)"
      ]
    },
    {
      id: 6,
      title: "Carburant au Maroc : prix, stations-service et conseils",
      excerpt: "Où faire le plein, combien ça coûte et comment optimiser votre consommation de carburant.",
      category: "Pratique",
      date: "15 décembre 2024",
      image: "https://images.unsplash.com/photo-1545262810-77515befe149?w=800&h=500&fit=crop",
      content: [
        "Comprendre le système de carburant au Maroc vous aidera à mieux gérer votre budget.",
        "Types de carburant disponibles :",
        "Essence sans plomb : le plus courant pour les voitures de location",
        "Gasoil (diesel) : pour certains véhicules, généralement moins cher",
        "Gasoil 50 (diesel premium) : disponible dans certaines stations",
        "Prix actuels (janvier 2025, indicatifs) :",
        "Essence sans plomb : environ 13 MAD/litre",
        "Gasoil : environ 11 MAD/litre",
        "Note : Les prix sont fixés par l'État et identiques dans toutes les stations",
        "Stations-service au Maroc :",
        "Réseau dense dans les villes et sur les grands axes",
        "Marques principales : Total, Shell, Afriquia, Winxo, Petrom",
        "Services : pompes avec personnel (pas de self-service partout)",
        "Pourboire apprécié : 2 à 5 MAD pour le pompiste",
        "Horaires : généralement 6h-22h, certaines 24h/24 sur autoroutes",
        "Conseils pratiques :",
        "Vérifiez le type de carburant de votre véhicule dans le contrat de location",
        "Faites toujours le plein dans les stations officielles",
        "Sur les longs trajets, ne laissez pas le réservoir descendre sous 1/4",
        "Dans le désert ou zones reculées, prévoyez large car les stations sont espacées",
        "Gardez vos tickets de carburant si demandé par l'agence",
        "Retour du véhicule :",
        "La plupart des locations incluent 'retour plein pour plein'",
        "Faites le plein juste avant de rendre le véhicule",
        "Si vous ne le faites pas, l'agence appliquera un tarif majoré (souvent 15-18 MAD/litre)",
        "Économie de carburant :",
        "Adoptez une conduite souple et anticipez les freinages",
        "Utilisez la climatisation avec modération",
        "Vérifiez la pression des pneus régulièrement",
        "Évitez de surcharger le véhicule"
      ]
    }
  ];

  const categories = ["Tous", "Conduite", "Tourisme", "Assurance", "Budget", "Pratique"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-8">Conseils & Guides</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Tout ce que vous devez savoir pour louer et conduire au Maroc en toute sérénité. 
            Conseils pratiques, guides touristiques et bonnes pratiques locales.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card border-b">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant="outline" 
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 backdrop-blur">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Lire la suite</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Sections */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Car className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">Conseils de conduite</h3>
                <p className="text-muted-foreground">
                  Maîtrisez les spécificités de la conduite au Maroc
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">Guides touristiques</h3>
                <p className="text-muted-foreground">
                  Découvrez les plus beaux itinéraires du pays
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">Pratiques locales</h3>
                <p className="text-muted-foreground">
                  Comprenez les usages et coutumes marocaines
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
