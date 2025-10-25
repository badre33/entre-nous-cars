import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, MapPin, Car, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogArticles } from "@/data/blogArticles";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import { BlogCard } from "@/components/BlogCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";

const Blog = () => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const heroAnimation = useScrollAnimation(0.2);
  const categoriesAnimation = useScrollAnimation(0.2);
  
  const categories = [
    t('blog.all'), 
    t('blog.driving'), 
    t('blog.tourism'), 
    t('blog.insurance'), 
    t('blog.budget'), 
    t('blog.practical'), 
    t('blog.aboutCat')
  ];

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div 
          ref={heroAnimation.ref}
          className={`container text-center max-w-4xl transition-all duration-700 ${
            heroAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-5xl md:text-6xl mb-8 animate-fade-in">{t('blog.title')}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in [animation-delay:200ms]">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-card border-b">
        <div 
          ref={categoriesAnimation.ref}
          className="container"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Badge 
                key={category} 
                variant="outline" 
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground 
                  transition-all duration-300 hover:scale-110 hover:shadow-lg
                  ${categoriesAnimation.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                  }`}
                style={{ 
                  transitionDelay: categoriesAnimation.isVisible ? `${index * 50}ms` : '0ms' 
                }}
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
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article, index) => {
                const articleKey = `article${index + 1}`;
                const translatedTitle = t(`blogArticles.${articleKey}.title`) !== `blogArticles.${articleKey}.title` 
                  ? t(`blogArticles.${articleKey}.title`) 
                  : article.title;
                const translatedExcerpt = t(`blogArticles.${articleKey}.excerpt`) !== `blogArticles.${articleKey}.excerpt` 
                  ? t(`blogArticles.${articleKey}.excerpt`) 
                  : article.excerpt;
                const translatedCategory = t(`blogArticles.${articleKey}.category`) !== `blogArticles.${articleKey}.category` 
                  ? t(`blogArticles.${articleKey}.category`) 
                  : article.category;
                
                return (
                  <BlogCard
                    key={article.id}
                    article={article}
                    translatedTitle={translatedTitle}
                    translatedExcerpt={translatedExcerpt}
                    translatedCategory={translatedCategory}
                    readMoreText={t('blog.readMore')}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Content Sections */}
      <section className="py-20 bg-secondary/30">
        <div className="container max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12">
                  <Car className="w-8 h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">{t('guides.drivingTipsCard')}</h3>
                <p className="text-muted-foreground">
                  {t('guides.drivingTipsCardText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-secondary/30 group-hover:scale-110 group-hover:rotate-12">
                  <MapPin className="w-8 h-8 text-secondary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">{t('guides.travelGuidesCard')}</h3>
                <p className="text-muted-foreground">
                  {t('guides.travelGuidesCardText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:bg-accent/30 group-hover:scale-110 group-hover:rotate-12">
                  <Shield className="w-8 h-8 text-accent transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-barlow font-semibold mb-3">{t('guides.localPracticesCard')}</h3>
                <p className="text-muted-foreground">
                  {t('guides.localPracticesCardText')}
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
