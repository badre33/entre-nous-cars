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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div 
          ref={heroAnimation.ref}
          className={`container text-center max-w-4xl px-4 sm:px-6 transition-all duration-700 ${
            heroAnimation.isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 animate-fade-in">{t('blog.title')}</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed animate-fade-in [animation-delay:200ms] px-2">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 sm:py-8 bg-card border-b">
        <div 
          ref={categoriesAnimation.ref}
          className="container px-4 sm:px-6"
        >
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category, index) => (
              <Badge 
                key={category} 
                variant="outline" 
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground 
                  transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-lg
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
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container max-w-6xl px-4 sm:px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      <section className="py-12 sm:py-16 lg:py-20 bg-secondary/30">
        <div className="container max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12">
                  <Car className="w-7 h-7 sm:w-8 sm:h-8 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-2 sm:mb-3">{t('guides.drivingTipsCard')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {t('guides.drivingTipsCardText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:bg-secondary/30 group-hover:scale-110 group-hover:rotate-12">
                  <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-secondary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-2 sm:mb-3">{t('guides.travelGuidesCard')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {t('guides.travelGuidesCardText')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 transition-all duration-500 group-hover:bg-accent/30 group-hover:scale-110 group-hover:rotate-12">
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-accent transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-lg sm:text-xl font-barlow font-semibold mb-2 sm:mb-3">{t('guides.localPracticesCard')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
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
