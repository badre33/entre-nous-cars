import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, CheckCircle, Star, Navigation } from "lucide-react";
import { CallButton } from "@/components/CallButton";
import { 
  MultiLocationSchema,
  FAQSchemaEnriched,
  OpeningHoursSchema,
  EnhancedAggregateRatingSchema
} from "@/components/schemas";
import { VehicleProductSchemas } from "@/components/VehicleProductSchemas";
import type { Neighborhood } from "@/data/neighborhoodsData";

interface NeighborhoodPageProps {
  neighborhood: Neighborhood;
}

/**
 * Page Template Générique pour Quartiers Ultra-Locaux
 * Optimisée SEO pour "location voiture [quartier]"
 * Multi-Location Schema + FAQ + Opening Hours
 */
export const NeighborhoodPage = ({ neighborhood }: NeighborhoodPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{neighborhood.title}</title>
        <meta name="description" content={neighborhood.metaDescription} />
        <meta name="keywords" content={`location voiture ${neighborhood.name.toLowerCase()}, location auto ${neighborhood.name.toLowerCase()}, louer voiture ${neighborhood.city.toLowerCase()} ${neighborhood.name.toLowerCase()}, location véhicule ${neighborhood.name.toLowerCase()}`} />
        <link rel="canonical" href={`https://benatna.ma/${neighborhood.slug}`} />
        <meta property="og:title" content={neighborhood.title} />
        <meta property="og:description" content={neighborhood.metaDescription} />
        <meta property="og:url" content={`https://benatna.ma/${neighborhood.slug}`} />
      </Helmet>
      
      {/* Multi-Location Schema pour SEO hyper-local */}
      <MultiLocationSchema locations={neighborhood.deliveryPoints.map(point => ({
        ...point,
        city: neighborhood.city,
        postalCode: neighborhood.city === "Casablanca" ? "20000" : 
                    neighborhood.city === "Marrakech" ? "40000" : "30000"
      }))} />
      
      {/* FAQ Schema pour Rich Snippets */}
      <FAQSchemaEnriched 
        pageName={`Location Voiture ${neighborhood.name}`}
        faqs={neighborhood.faqs}
      />
      
      {/* Opening Hours 24/7 */}
      <OpeningHoursSchema 
        city={`${neighborhood.city} - ${neighborhood.name}`}
        entityType="LocalBusiness"
        address={neighborhood.deliveryPoints[0].address}
        latitude={neighborhood.deliveryPoints[0].latitude}
        longitude={neighborhood.deliveryPoints[0].longitude}
      />
      
      {/* Aggregate Rating */}
      <EnhancedAggregateRatingSchema 
        entityType="LocalBusiness"
        entityName={`Benatna Location Voiture ${neighborhood.name} ${neighborhood.city}`}
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
                  Réserver Maintenant
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pourquoi Louer une Voiture à {neighborhood.name} ?</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Points de Livraison à {neighborhood.name}</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Lieux d'Intérêt Proches</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Véhicules Populaires à {neighborhood.name}</h2>
            <div className="flex flex-wrap gap-3">
              {neighborhood.popularVehicles.map((vehicle, index) => (
                <div key={index} className="px-6 py-3 bg-primary/10 rounded-full text-primary font-semibold">
                  {vehicle}
                </div>
              ))}
            </div>
          </section>

          {/* Conseils */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Conseils pour {neighborhood.name}</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Questions Fréquentes - {neighborhood.name}</h2>
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

          {/* CTA Final */}
          <section className="text-center py-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Prêt à Explorer {neighborhood.name} ?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Réservez votre voiture maintenant et profitez de la livraison gratuite à {neighborhood.name}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to={`/louer?city=${neighborhood.city}`}>
                <Button size="lg" className="text-lg px-8">
                  Voir les Véhicules Disponibles
                </Button>
              </Link>
              <Link to={`/location-voiture-${neighborhood.citySlug}`}>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Autres Quartiers {neighborhood.city}
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
