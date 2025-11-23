import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EnhancedBreadcrumbs } from '@/components/EnhancedBreadcrumbs';
import { CanonicalTag } from '@/components/CanonicalTag';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { comparisons, comparisonCategories } from '@/data/comparisonsData';
import { Search, Car, Briefcase, MapPin, Layers, ArrowRight } from 'lucide-react';

const iconMap = {
  'car': Car,
  'briefcase': Briefcase,
  'map-pin': MapPin,
  'layers': Layers,
};

export default function ComparatifsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredComparisons = comparisons.filter(comp => {
    const matchesSearch = searchTerm === '' || 
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.introduction.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || comp.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides Comparatifs', url: '/comparatifs' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Guides Comparatifs Location Voiture Maroc - Choisir en Toute Connaissance | Benatna</title>
        <meta 
          name="description" 
          content="Tous nos comparatifs location voiture Maroc : Duster vs Captur, Aéroport vs Centre-ville, Courte vs Longue durée. Guides détaillés pour choisir intelligemment." 
        />
        <meta 
          name="keywords" 
          content="comparatif voiture maroc, duster vs captur, guide location, aéroport vs centre-ville, économique vs premium" 
        />
        <meta property="og:title" content="Guides Comparatifs Location Voiture Maroc" />
        <meta property="og:type" content="website" />
      </Helmet>

      <CanonicalTag path="/comparatifs" />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <EnhancedBreadcrumbs items={breadcrumbItems} />
            
            <div className="max-w-4xl mx-auto text-center mt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Guides Comparatifs Location Voiture Maroc
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Des comparatifs détaillés pour vous aider à choisir le meilleur véhicule, service et formule selon vos besoins
              </p>

              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un comparatif (ex: Duster, aéroport, longue durée...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="rounded-full"
              >
                Tous ({comparisons.length})
              </Button>
              {comparisonCategories.map((category) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap];
                const count = comparisons.filter(c => c.category === category.id).length;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Comparisons Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredComparisons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  Aucun comparatif trouvé pour "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredComparisons.map((comparison) => {
                  const category = comparisonCategories.find(c => c.id === comparison.category);
                  return (
                    <Card key={comparison.id} className="hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <h2 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                            {comparison.title}
                          </h2>
                          {category && (
                            <Badge variant="secondary" className="shrink-0 ml-2">
                              {category.label}
                            </Badge>
                          )}
                        </div>

                        {/* Items Images */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={comparison.item1.image}
                              alt={comparison.item1.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={comparison.item2.image}
                              alt={comparison.item2.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                          {comparison.introduction}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm">
                            <span className="text-muted-foreground">{comparison.faq.length} questions</span>
                          </div>
                          <Button asChild size="sm" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                            <Link to={`/comparatif/${comparison.slug}`}>
                              Comparer
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Besoin d'Aide pour Choisir ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe est disponible 7j/7 pour vous conseiller gratuitement sur le véhicule et la formule les mieux adaptés à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/louer">Voir Tous les Véhicules</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Demander un Conseil</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
