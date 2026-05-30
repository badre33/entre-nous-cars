import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { EnhancedBreadcrumbs } from '@/components/EnhancedBreadcrumbs';
import { CanonicalTag } from '@/components/CanonicalTag';
import { FAQSchemaEnriched } from '@/components/schemas/FAQSchemaEnriched';
import { ComparisonSchema } from '@/components/schemas/ComparisonSchema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { comparisons, type Comparison } from '@/data/comparisonsData';
import { Check, X, Trophy, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '@/constants/businessInfo';

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = comparisons.find(c => c.slug === slug);

  if (!comparison) {
    return <Navigate to="/404" replace />;
  }

  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Comparatifs', url: '/comparatifs' },
    { name: comparison.title, url: `/comparatif/${comparison.slug}` }
  ];

  const getWinnerBadge = (item: 'item1' | 'item2') => {
    if (comparison.verdict.winner === item) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Trophy className="h-3 w-3 mr-1" />
          Recommandé
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>{comparison.metaTitle}</title>
        <meta name="description" content={comparison.metaDescription} />
        <meta property="og:title" content={comparison.metaTitle} />
        <meta property="og:description" content={comparison.metaDescription} />
        <meta property="og:type" content="article" />
      </Helmet>

      <CanonicalTag path={`/comparatif/${comparison.slug}`} />
      <FAQSchemaEnriched faqs={comparison.faq} pageName={comparison.title} />
      <ComparisonSchema
        item1Name={comparison.item1.name}
        item2Name={comparison.item2.name}
        item1Price={comparison.item1.price}
        item2Price={comparison.item2.price}
        item1Image={comparison.item1.image}
        item2Image={comparison.item2.image}
        comparisonTitle={comparison.title}
        comparisonDescription={comparison.introduction}
      />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <EnhancedBreadcrumbs items={breadcrumbItems} />
            
            <div className="max-w-4xl mx-auto text-center mt-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                {comparison.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {comparison.introduction}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Header with images */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Item 1 */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    {getWinnerBadge('item1')}
                  </div>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={comparison.item1.image}
                      alt={comparison.item1.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">{comparison.item1.name}</h2>
                    {comparison.item1.price && (
                      <p className="text-xl font-semibold text-primary mb-4">
                        {comparison.item1.price}
                      </p>
                    )}
                    {comparison.item1.specs && (
                      <div className="space-y-2 text-sm">
                        {Object.entries(comparison.item1.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Item 2 */}
                <Card className="relative overflow-hidden">
                  <div className="absolute top-4 right-4 z-10">
                    {getWinnerBadge('item2')}
                  </div>
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={comparison.item2.image}
                      alt={comparison.item2.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold mb-2">{comparison.item2.name}</h2>
                    {comparison.item2.price && (
                      <p className="text-xl font-semibold text-primary mb-4">
                        {comparison.item2.price}
                      </p>
                    )}
                    {comparison.item2.specs && (
                      <div className="space-y-2 text-sm">
                        {Object.entries(comparison.item2.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Pros/Cons Comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Item 1 Pros/Cons */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-green-600 dark:text-green-400 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Avantages
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item1.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
                        <X className="h-5 w-5" />
                        Inconvénients
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item1.cons.map((con, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{con}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Idéal pour
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item1.bestFor.map((use, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{use}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Item 2 Pros/Cons */}
                <Card>
                  <CardContent className="pt-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-green-600 dark:text-green-400 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        Avantages
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item2.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{pro}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400 flex items-center gap-2">
                        <X className="h-5 w-5" />
                        Inconvénients
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item2.cons.map((con, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{con}</li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-primary" />
                        Idéal pour
                      </h3>
                      <ul className="space-y-2">
                        {comparison.item2.bestFor.map((use, idx) => (
                          <li key={idx} className="text-sm leading-relaxed">{use}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Verdict */}
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl sm:text-3xl font-bold">Notre Verdict</h2>
                  </div>
                  
                  <p className="text-xl font-semibold mb-6 text-foreground">
                    {comparison.verdict.summary}
                  </p>

                  <div className="prose prose-lg max-w-none">
                    <p className="whitespace-pre-line leading-relaxed">
                      {comparison.verdict.recommendation}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button asChild size="lg" className="flex-1">
                      <Link to="/louer">
                        Réserver Maintenant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="flex-1">
                      <a href={`https://wa.me/${BUSINESS_INFO.whatsapp.replace(/\s/g, '')}`} target="_blank" rel="noopener noreferrer">
                        Conseil Personnalisé
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {comparison.faq.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Questions Fréquentes</h2>
                <div className="space-y-6">
                  {comparison.faq.map((faq, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Comparisons */}
        {comparison.relatedComparisons && comparison.relatedComparisons.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Comparatifs Similaires</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {comparison.relatedComparisons.map(relatedId => {
                    const related = comparisons.find(c => c.id === relatedId);
                    if (!related) return null;
                    return (
                      <Card key={relatedId} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                          <h3 className="text-xl font-bold mb-3">{related.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {related.introduction}
                          </p>
                          <Button asChild variant="outline" className="w-full">
                            <Link to={`/comparatif/${related.slug}`}>
                              Voir le Comparatif
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
