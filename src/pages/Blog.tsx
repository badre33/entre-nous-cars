import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, MapPin, Car, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  const { t } = useLanguage();
  const categories = ["Tous", "Conduite", "Tourisme", "Assurance", "Budget", "Pratique", "À propos"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-8">{t('blog.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('blog.subtitle')}
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
            {blogArticles.map((article) => (
              <Link 
                key={article.id}
                to={`/blog/${article.slug}`}
              >
                <Card 
                  className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer h-full"
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
              </Link>
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
