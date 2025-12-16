import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { HreflangTags } from "@/utils/hreflangHelper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, serviceCategories, Service } from "@/data/servicesData";
import { ArrowRight, Check, Grid3x3, Plane, UserCheck, Calendar, Mountain, Sparkles } from "lucide-react";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";
import { PullToRefreshIndicator } from "@/components/PullToRefreshIndicator";
import { toast } from "sonner";

const iconMap = {
  Grid3x3,
  Plane,
  UserCheck,
  Calendar,
  Mountain,
  Sparkles,
};

const NosServices = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Pull to refresh sur mobile
  const { isPulling, isRefreshing, pullDistance, pullPercentage } = usePullToRefresh({
    onRefresh: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
      toast.success("Services actualisés !");
    },
    threshold: 80,
    resistance: 2.5
  });

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const getCategoryColor = (category: Service['category']) => {
    const colors = {
      aeroport: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      jeune: 'bg-green-500/10 text-green-700 dark:text-green-400',
      'longue-duree': 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      suv: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
      special: 'bg-pink-500/10 text-pink-700 dark:text-pink-400',
    };
    return colors[category];
  };

  const getCategoryLabel = (category: Service['category']) => {
    const labels = {
      aeroport: 'Aéroport',
      jeune: 'Jeune -25 ans',
      'longue-duree': 'Longue Durée',
      suv: 'SUV 4x4',
      special: 'Spécial',
    };
    return labels[category];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PullToRefreshIndicator 
        isPulling={isPulling}
        isRefreshing={isRefreshing}
        pullDistance={pullDistance}
        pullPercentage={pullPercentage}
      />
      
      <Helmet>
        <title>Nos Services de Location de Voiture au Maroc | Benatna</title>
        <meta 
          name="description" 
          content="Découvrez tous nos services de location : aéroports, jeune conducteur, longue durée, SUV 4x4, véhicules de luxe et spéciaux. Tarifs dès 150 DH/jour partout au Maroc." 
        />
        <meta 
          name="keywords" 
          content="services location voiture maroc, location aéroport, jeune conducteur, longue durée, suv 4x4, voiture luxe" 
        />
        <link rel="canonical" href="https://benatna.ma/nos-services" />
        <meta property="og:title" content="Nos Services de Location de Voiture au Maroc | Benatna" />
        <meta property="og:description" content="Découvrez tous nos services de location adaptés à vos besoins : aéroports, jeune conducteur, longue durée, SUV, véhicules spéciaux." />
        <meta property="og:url" content="https://benatna.ma/nos-services" />
      </Helmet>
      <HreflangTags path="/nos-services" />

      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/hero-home-new.webp')] bg-cover bg-center opacity-20" />
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-in text-white leading-tight">
              Nos Services de Location de Voiture
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 animate-fade-in [animation-delay:200ms] px-2">
              Une gamme complète de services adaptés à tous vos besoins de mobilité au Maroc. 
              Des tarifs transparents, une flotte récente et un service client disponible 24/7.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center text-sm animate-fade-in [animation-delay:400ms] text-white/90">
              <div className="flex items-center gap-2 justify-center">
                <Check className="h-5 w-5 text-primary" />
                <span>21+ services spécialisés</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="h-5 w-5 text-primary" />
                <span>6 villes du Maroc</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="h-5 w-5 text-primary" />
                <span>Tarifs dès 150 DH/jour</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container px-4 py-12">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 h-auto bg-muted/50 p-2">
            {serviceCategories.map((cat) => {
              const Icon = iconMap[cat.icon as keyof typeof iconMap];
              return (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mt-8 text-center text-muted-foreground">
          <p>
            {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
            {activeCategory !== 'all' && ` dans la catégorie "${serviceCategories.find(c => c.id === activeCategory)?.label}"`}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {service.popular && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    Populaire
                  </Badge>
                )}
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(service.category)}`}>
                  {getCategoryLabel(service.category)}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">À partir de</p>
                  <p className="text-lg font-bold text-primary">{service.priceFrom}</p>
                </div>
                <Button asChild size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                  <Link to={service.slug}>
                    Découvrir
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16 mb-20">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Vous ne trouvez pas le service adapté ?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Notre équipe est à votre écoute pour créer une offre sur-mesure adaptée à vos besoins spécifiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90"
              >
                <Link to="/contact">
                  Nous contacter
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/louer">
                  Voir tous les véhicules
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NosServices;
