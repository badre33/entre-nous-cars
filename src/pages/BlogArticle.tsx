import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogArticles } from "@/data/blogArticles";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ShareButton } from "@/components/ShareButton";

/**
 * Rendu du texte enrichi des articles : **gras** et liens [texte](/url).
 * Sans ceci, les articles affichaient les astérisques et les crochets en clair,
 * et il était impossible de créer des liens du blog vers les pages de location.
 */
const renderInline = (text: string, keyPrefix: string) => {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-b${i}`}>{match[1]}</strong>);
    } else {
      const label = match[2];
      const href = match[3];
      parts.push(
        href.startsWith("/") ? (
          <Link key={`${keyPrefix}-l${i}`} to={href} className="text-primary underline underline-offset-2 hover:no-underline">
            {label}
          </Link>
        ) : (
          <a key={`${keyPrefix}-l${i}`} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:no-underline">
            {label}
          </a>
        )
      );
    }
    lastIndex = pattern.lastIndex;
    i++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
};

/** Convertit une date française ("21 janvier 2025") en ISO pour les métadonnées. */
const MONTHS_FR: Record<string, string> = {
  janvier: "01", février: "02", fevrier: "02", mars: "03", avril: "04", mai: "05",
  juin: "06", juillet: "07", août: "08", aout: "08", septembre: "09",
  octobre: "10", novembre: "11", décembre: "12", decembre: "12"
};
const toIsoDate = (frDate: string): string => {
  const m = frDate.trim().toLowerCase().match(/^(\d{1,2})\s+([a-zéûôà]+)\s+(\d{4})$/);
  if (!m) return frDate;
  const month = MONTHS_FR[m[2]];
  if (!month) return frDate;
  return `${m[3]}-${month}-${m[1].padStart(2, "0")}`;
};

const BlogArticle = () => {
  const { slug } = useParams();
  // Écran de chargement factice de 600 ms supprimé : l'article est déjà dans
  // le bundle. Google capturait régulièrement le squelette à la place du texte.
  const [isLoading] = useState(false);
  const headerAnimation = useScrollAnimation(0.2);
  const contentAnimation = useScrollAnimation(0.1);
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
            <Link to="/blog">
              <Button>Retour au blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
      <Helmet>
        <title>{article.title} | Benatna</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:image" content={article.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={toIsoDate(article.date)} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={article.image} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.metaDescription,
            "image": article.image?.startsWith("http") ? article.image : `https://benatna.ma${article.image}`,
            "datePublished": toIsoDate(article.date),
            "dateModified": toIsoDate(article.date),
            "articleSection": article.category,
            "inLanguage": "fr-MA",
            "author": { "@type": "Organization", "name": "Benatna", "url": "https://benatna.ma" },
            "publisher": {
              "@type": "Organization",
              "name": "Benatna",
              "url": "https://benatna.ma",
              "logo": { "@type": "ImageObject", "url": "https://benatna.ma/logo.png" }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://benatna.ma/blog/${article.slug}`
            }
          })}
        </script>
      </Helmet>
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
                Retour aux articles
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
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-barlow font-bold mb-4 animate-fade-in [animation-delay:100ms]">
              {article.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 animate-fade-in [animation-delay:200ms]">
              {article.excerpt}
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
              title={article.title}
              text={article.excerpt}
              url={window.location.href}
              variant="outline"
              size="default"
            />
          </div>

          {/* Article Image */}
          <div className="mb-12 rounded-xl overflow-hidden group animate-fade-in [animation-delay:500ms]">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none animate-fade-in [animation-delay:600ms]">
            {article.content.map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-2xl font-bold mt-8 mb-4">
                      {renderInline(paragraph.replace(/^###\s*/, ''), `h3-${index}`)}
                    </h3>
                  );
                } else if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={index} className="text-3xl font-bold mt-12 mb-6">
                      {renderInline(paragraph.replace(/^##\s*/, ''), `h2-${index}`)}
                    </h2>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <p key={index} className="text-lg leading-relaxed font-medium">
                      {renderInline(paragraph, `n-${index}`)}
                    </p>
                  );
                } else if (paragraph.startsWith('-')) {
                  return (
                    <p key={index} className="text-lg leading-relaxed pl-4 border-l-4 border-primary/30">
                      {renderInline(paragraph.replace(/^-\s*/, ''), `li-${index}`)}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className="text-lg leading-relaxed text-foreground/90">
                      {renderInline(paragraph, `p-${index}`)}
                    </p>
                  );
                }
              })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl text-center hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4">Prêt à louer votre voiture ?</h3>
            <p className="text-muted-foreground mb-6">
              Trouvez le véhicule idéal pour votre voyage au Maroc.
            </p>
            <Link to="/louer">
              <Button size="lg" className="rounded-full hover:scale-110 transition-transform duration-300">
                Voir les véhicules
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
