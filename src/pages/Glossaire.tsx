import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EnhancedBreadcrumbs } from '@/components/EnhancedBreadcrumbs';
import { CanonicalTag } from '@/components/CanonicalTag';
import { FAQSchemaEnriched } from '@/components/schemas/FAQSchemaEnriched';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { glossaryTerms, categories, type GlossaryTerm } from '@/data/glossaryTerms';
import { Search, Shield, FileText, Car, Navigation, CreditCard, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '@/constants/businessInfo';

const iconMap = {
  'shield': Shield,
  'file-text': FileText,
  'car': Car,
  'navigation': Navigation,
  'credit-card': CreditCard,
  'book-open': BookOpen,
};

export default function Glossaire() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) => {
      const matchesSearch = searchTerm === '' || 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    const grouped: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  const alphabetLetters = Object.keys(groupedTerms).sort();

  // Convert to FAQ format for schema
  const faqData = glossaryTerms.map(term => ({
    question: term.term,
    answer: term.definition
  }));

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Glossaire Location Voiture', url: '/glossaire' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Glossaire Location Voiture Maroc - 50+ Termes Expliqués | Benatna</title>
        <meta 
          name="description" 
          content="Découvrez notre glossaire complet de la location de voiture au Maroc : assurance, franchise, caution, kilométrage illimité... Plus de 50 termes expliqués simplement." 
        />
        <meta 
          name="keywords" 
          content="glossaire location voiture, lexique automobile maroc, termes location, assurance voiture maroc, franchise location, définitions auto" 
        />
        <meta property="og:title" content="Glossaire Location Voiture Maroc - 50+ Termes Expliqués" />
        <meta property="og:description" content="Tous les termes de la location automobile au Maroc expliqués : assurance, caution, franchise, kilométrage..." />
        <meta property="og:type" content="website" />
      </Helmet>

      <CanonicalTag path="/glossaire" />
      <FAQSchemaEnriched faqs={faqData} pageName="Glossaire Location Voiture Maroc" />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <EnhancedBreadcrumbs items={breadcrumbItems} />
            
            <div className="max-w-4xl mx-auto text-center mt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Glossaire Location Voiture Maroc
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Plus de 50 termes essentiels expliqués simplement pour comprendre votre location de voiture au Maroc
              </p>

              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher un terme (ex: franchise, assurance, caution...)"
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
                Tous ({glossaryTerms.length})
              </Button>
              {categories.map((category) => {
                const Icon = iconMap[category.icon as keyof typeof iconMap];
                const count = glossaryTerms.filter(t => t.category === category.id).length;
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

        {/* Terms List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  Aucun terme trouvé pour "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-12">
                {/* Alphabet Navigation */}
                <div className="flex flex-wrap gap-2 justify-center pb-6 border-b">
                  {alphabetLetters.map((letter) => (
                    <a
                      key={letter}
                      href={`#letter-${letter}`}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground font-semibold transition-colors"
                    >
                      {letter}
                    </a>
                  ))}
                </div>

                {/* Terms by Letter */}
                {alphabetLetters.map((letter) => (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">{letter}</h2>
                    <div className="space-y-6">
                      {groupedTerms[letter].map((term) => {
                        const category = categories.find(c => c.id === term.category);
                        const Icon = category ? iconMap[category.icon as keyof typeof iconMap] : FileText;
                        
                        return (
                          <Card key={term.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6">
                              <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                  <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-grow space-y-3">
                                  <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-2xl font-bold text-foreground">
                                      {term.term}
                                    </h3>
                                    {category && (
                                      <Badge variant="secondary" className="shrink-0">
                                        {category.label}
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <p className="text-base text-muted-foreground leading-relaxed">
                                    {term.definition}
                                  </p>

                                  {/* Related Terms */}
                                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                                    <div className="pt-3 border-t">
                                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                                        Termes associés :
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {term.relatedTerms.map((relatedId) => {
                                          const relatedTerm = glossaryTerms.find(t => t.id === relatedId);
                                          if (!relatedTerm) return null;
                                          return (
                                            <a
                                              key={relatedId}
                                              href={`#letter-${relatedTerm.term[0].toUpperCase()}`}
                                              className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                                            >
                                              {relatedTerm.term}
                                            </a>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Related Pages */}
                                  {term.relatedPages && term.relatedPages.length > 0 && (
                                    <div className="pt-3 border-t">
                                      <p className="text-sm font-semibold text-muted-foreground mb-2">
                                        Pages liées :
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {term.relatedPages.map((page, idx) => (
                                          <Link
                                            key={idx}
                                            to={page.url}
                                            className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                                          >
                                            {page.label}
                                            <ExternalLink className="h-3 w-3" />
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Des Questions sur Votre Location ?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre équipe Benatna est disponible 7j/7 pour répondre à toutes vos questions sur la location de voiture au Maroc.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/louer">Réserver Maintenant</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Nous Contacter</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp {BUSINESS_INFO.whatsapp}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Comprendre la Location de Voiture au Maroc</h2>
              <p>
                Ce glossaire complet vous aide à comprendre tous les termes techniques et administratifs liés à la <strong>location de voiture au Maroc</strong>. 
                Que vous soyez touriste, expatrié ou professionnel, maîtriser ce vocabulaire vous permettra de louer en toute confiance.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Pourquoi ce Glossaire est-il Important ?</h3>
              <ul className="space-y-2">
                <li><strong>Éviter les Surprises</strong> : Comprenez ce que vous signez (caution, franchise, assurances)</li>
                <li><strong>Comparer les Offres</strong> : Identifiez les vraies différences entre loueurs marocains</li>
                <li><strong>Économiser</strong> : Choisissez les bonnes options (rachat de franchise, kilométrage...)</li>
                <li><strong>Conduire Serein</strong> : Connaissez vos droits et obligations sur les routes du Maroc</li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">Termes Essentiels à Connaître</h3>
              <p>
                Les 5 termes les plus importants en location au Maroc sont : <strong>Franchise</strong> (montant à votre charge en cas de sinistre), 
                <strong> Caution</strong> (dépôt de garantie bloqué), <strong>Assurance Tous Risques</strong> (protection maximale), 
                <strong> Kilométrage Illimité</strong> (liberté totale de mouvement), et <strong>Permis de Conduire</strong> (document obligatoire valide).
              </p>

              <div className="bg-primary/5 p-6 rounded-lg mt-8">
                <h3 className="text-xl font-bold mb-3">💡 Conseil Benatna</h3>
                <p className="mb-0">
                  Avant de signer votre contrat de location au Maroc, assurez-vous de bien comprendre ces 3 points clés : 
                  le montant exact de la <strong>caution</strong>, les conditions de la <strong>franchise</strong>, 
                  et la politique de <strong>carburant</strong>. Ces éléments impactent directement votre budget final.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
