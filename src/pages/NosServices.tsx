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
      aeroport: 'bg-blue-500 text-white shadow-blue-500/30',
      jeune: 'bg-emerald-500 text-white shadow-emerald-500/30',
      'longue-duree': 'bg-violet-500 text-white shadow-violet-500/30',
      suv: 'bg-amber-500 text-white shadow-amber-500/30',
      special: 'bg-rose-500 text-white shadow-rose-500/30',
    };
    return colors[category];
  };

  const getCategoryGradient = (category: Service['category']) => {
    const gradients = {
      aeroport: 'from-blue-500/20 to-blue-600/5',
      jeune: 'from-emerald-500/20 to-emerald-600/5',
      'longue-duree': 'from-violet-500/20 to-violet-600/5',
      suv: 'from-amber-500/20 to-amber-600/5',
      special: 'from-rose-500/20 to-rose-600/5',
    };
    return gradients[category];
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
        <title>Services Location Voiture Maroc | Benatna</title>
        <meta 
          name="description" 
          content="Services location voiture au Maroc : aéroports, jeune conducteur, longue durée, SUV 4x4. Dès 150 DH/jour. Réservez via WhatsApp." 
        />
        <meta 
          name="keywords" 
          content="services location voiture maroc, location aéroport, jeune conducteur, longue durée, suv 4x4, voiture luxe" 
        />
        <link rel="canonical" href="https://benatna.ma/nos-services" />
        <meta property="og:title" content="Services Location Voiture Maroc | Benatna" />
        <meta property="og:description" content="Services location voiture au Maroc : aéroports, jeune conducteur, longue durée, SUV. Dès 150 DH/jour." />
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
            <Card 
              key={service.id} 
              className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col bg-gradient-to-br ${getCategoryGradient(service.category)}`}
            >
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
              
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {service.popular && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg animate-pulse">
                    ⭐ Populaire
                  </Badge>
                )}
                <Badge className={`absolute top-3 left-3 shadow-lg ${getCategoryColor(service.category)}`}>
                  {getCategoryLabel(service.category)}
                </Badge>
                
                {/* Price overlay on image */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                  <p className="text-xs text-muted-foreground">À partir de</p>
                  <p className="text-lg font-bold text-primary">{service.priceFrom}</p>
                </div>
              </div>

              <CardHeader className="relative">
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {service.shortDescription}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-2.5">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm group/item">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border/50">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Link to={service.slug} className="flex items-center justify-center gap-2">
                    Découvrir ce service
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
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
