import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogArticles } from "@/data/blogArticles";

const BlogArticle = () => {
  const { slug } = useParams();
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[400px] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container py-8">
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-white/90">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="space-y-6">
              {article.content.map((paragraph, index) => {
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
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-4">Prêt à louer une voiture ?</h3>
            <p className="text-muted-foreground mb-6">
              Trouvez le véhicule idéal pour votre prochain voyage au Maroc
            </p>
            <Link to="/louer">
              <Button size="lg" className="rounded-full">
                Voir les voitures disponibles
              </Button>
            </Link>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Link to="/blog">
              <Button variant="outline" className="rounded-full group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour aux articles
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
