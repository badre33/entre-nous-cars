import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Navigation } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { FAQSchemaEnriched } from "@/components/schemas";
import { vehicleDetails } from "@/data/vehicleDetails";
import { neighborhoods } from "@/data/neighborhoodsData";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import type { Neighborhood } from "@/data/neighborhoodsData";

interface NeighborhoodPageProps {
  neighborhood: Neighborhood;
}

/**
 * Page Template Générique pour Quartiers Ultra-Locaux
 * Optimisée SEO pour "location voiture [quartier]"
 * FAQ schema ; aucune fausse adresse d’agence (Benatna livre, sans agence)
 */
export const NeighborhoodPage = ({ neighborhood }: NeighborhoodPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{neighborhood.title}</title>
        <meta name="description" content={neighborhood.metaDescription} />
        <meta name="keywords" content={`location voiture ${neighborhood.name.toLowerCase()}, location auto ${neighborhood.name.toLowerCase()}, louer voiture ${neighborhood.city.toLowerCase()} ${neighborhood.name.toLowerCase()}, location véhicule ${neighborhood.name.toLowerCase()}`} />
        <meta property="og:title" content={neighborhood.title} />
        <meta property="og:description" content={neighborhood.metaDescription} />
        <meta property="og:url" content={`https://benatna.ma/${neighborhood.slug}`} />
      </Helmet>
      
      {/* FAQ Schema pour Rich Snippets */}
      <FAQSchemaEnriched 
        pageName={`Location Voiture ${neighborhood.name}`}
        faqs={neighborhood.faqs}
      />
      
      {/* Product Schema véhicules ville */}
      <VehicleProductSchemas city={neighborhood.city} />
      
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">{neighborhood.city} • {neighborhood.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {neighborhood.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {neighborhood.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={`/louer?city=${neighborhood.city}`}>
                <Button size="lg" className="text-lg px-8">
                  Réserver
                </Button>
              </Link>
              <CallButton 
                variant="outline"
                size="lg"
                className="text-lg px-8"
              >
                Appeler
              </CallButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container px-4">
          
          {/* Points Forts */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pourquoi louer une voiture à {neighborhood.name} ?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {neighborhood.highlights.map((highlight, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Points de Livraison */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Où récupérer la voiture ? Livraison gratuite, convenue à l’avance</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhood.deliveryPoints.map((point, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Navigation className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{point.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{point.address}</p>
                        <p className="text-sm">{point.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Lieux d'Intérêt */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">À voir autour de {neighborhood.name}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {neighborhood.landmarks.map((landmark, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border">
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span>{landmark}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Véhicules Populaires */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Voitures conseillées à {neighborhood.name}</h2>
            <div className="flex flex-wrap gap-3">
              {neighborhood.popularVehicles.map((vehicle) => {
                const v = Object.values(vehicleDetails).find(d => d.name === vehicle);
                return v ? (
                  <Link key={vehicle} to={`/vehicule/${v.slug}`} className="px-5 py-3 bg-primary/10 rounded-full text-primary font-semibold hover:bg-primary/20">
                    {vehicle} <span className="font-normal text-foreground/80">dès {v.priceFrom} DH/jour</span>
                  </Link>
                ) : (
                  <span key={vehicle} className="px-5 py-3 bg-primary/10 rounded-full text-primary font-semibold">{vehicle}</span>
                );
              })}
            </div>
          </section>

          {/* Conseils */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Conseils pratiques</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {neighborhood.tips.map((tip, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground">{tip}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Questions fréquentes : {neighborhood.name}</h2>
            <div className="space-y-4">
              {neighborhood.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-3 text-primary">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Maillage quartiers */}
          <nav aria-label={`Autres quartiers de ${neighborhood.city}`} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Location dans les autres quartiers</h2>
            <div className="flex flex-wrap gap-3">
              {neighborhoods.filter(n => n.city === neighborhood.city && n.slug !== neighborhood.slug).map(n => (
                <Link key={n.slug} to={`/${n.slug}`} className="rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary">Location voiture {n.name}</Link>
              ))}
              {neighborhood.city === "Casablanca" && (
                <Link to="/location-voiture-aeroport-casablanca" className="rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary">Aéroport Mohammed V</Link>
              )}
            </div>
          </nav>

          {/* CTA Final */}
          <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Une voiture pour votre séjour à {neighborhood.name} ?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Demandez votre voiture sur WhatsApp et profitez de la livraison gratuite par le loueur partenaire à {neighborhood.name}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to={`/louer?city=${neighborhood.city}`}>
                <Button size="lg" className="text-lg px-8">
                  Voir les voitures et les prix
                </Button>
              </Link>
              <Link to={`/location-voiture-${neighborhood.citySlug}`}>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Location à {neighborhood.city}
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};
