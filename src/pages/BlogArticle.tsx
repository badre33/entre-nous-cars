import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogArticles } from "@/data/blogArticles";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/ShareButton";

const BlogArticle = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const headerAnimation = useScrollAnimation(0.2);
  const contentAnimation = useScrollAnimation(0.1);
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t('blogArticle.notFound')}</h1>
            <Link to="/blog">
              <Button>{t('blogArticle.backToBlog')}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get translated content if available
  const articleIndex = blogArticles.findIndex(a => a.slug === slug);
  const articleKey = `article${articleIndex + 1}`;
  const translatedTitle = t(`blogArticles.${articleKey}.title`);
  const translatedExcerpt = t(`blogArticles.${articleKey}.excerpt`);
  const translatedCategory = t(`blogArticles.${articleKey}.category`);
  const translatedContent = t(`blogArticles.${articleKey}.content`);
  
  // Use translated content if available, otherwise fallback to original
  const content = Array.isArray(translatedContent) ? translatedContent : article.content;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Breadcrumbs />
        <article className="flex-1 py-12">
          <div className="container max-w-4xl">
            <Skeleton className="h-8 w-32 mb-8" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-96 w-full mb-8" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </article>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      
      <article className="flex-1 py-12">
        <div className="container max-w-4xl">
          {/* Back Button */}
          <div
            ref={headerAnimation.ref}
            className={`transition-all duration-500 ${
              headerAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <Link to="/blog">
              <Button variant="ghost" className="mb-8 group hover:shadow-lg transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-2 transition-transform duration-300" />
                {t('blogArticle.backToArticles')}
              </Button>
            </Link>
          </div>

          {/* Article Header */}
          <header 
            ref={contentAnimation.ref}
            className={`mb-12 transition-all duration-700 ${
              contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Badge className="mb-4 animate-fade-in hover:scale-110 transition-transform duration-300">
              {translatedCategory}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-barlow font-bold mb-4 animate-fade-in [animation-delay:100ms]">
              {translatedTitle}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 animate-fade-in [animation-delay:200ms]">
              {translatedExcerpt}
            </p>
            <div className="flex items-center gap-4 text-muted-foreground animate-fade-in [animation-delay:300ms]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
            </div>
          </header>

          {/* Share Button with Native API */}
          <div className="mb-8 animate-fade-in [animation-delay:400ms]">
            <ShareButton
              title={translatedTitle}
              text={translatedExcerpt}
              url={window.location.href}
              variant="outline"
              size="default"
            />
          </div>

          {/* Article Image */}
          <div className="mb-12 rounded-xl overflow-hidden group animate-fade-in [animation-delay:500ms]">
            <img 
              src={article.image} 
              alt={translatedTitle}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none animate-fade-in [animation-delay:600ms]">
            {content.map((paragraph, index) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <p key={index} className="text-lg leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  );
                } else if (paragraph.startsWith('-')) {
                  return (
                    <p key={index} className="text-lg leading-relaxed pl-4 border-l-4 border-primary/30">
                      {paragraph.replace('- ', '')}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-lg leading-relaxed text-foreground/90">
                      {paragraph}
                    </p>
                  );
                }
              })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4">{t('blogArticle.readyToRent')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('blogArticle.findPerfectCar')}
            </p>
            <Link to="/louer">
              <Button size="lg" className="rounded-full hover:scale-110 transition-transform duration-300">
                {t('blogArticle.viewCars')}
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogArticle;
