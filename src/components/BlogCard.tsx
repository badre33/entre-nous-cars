import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ShareButton } from "@/components/ShareButton";

interface BlogCardProps {
  article: {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
  };
  translatedTitle: string;
  translatedExcerpt: string;
  translatedCategory: string;
  readMoreText: string;
  index: number;
}

export const BlogCard = ({ 
  article, 
  translatedTitle, 
  translatedExcerpt, 
  translatedCategory, 
  readMoreText,
  index 
}: BlogCardProps) => {
  const cardAnimation = useScrollAnimation(0.1);

  return (
    <div
      ref={cardAnimation.ref}
      className={`transition-all duration-500 ${
        cardAnimation.isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card 
        className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] group h-full"
      >
        <Link to={`/blog/${article.slug}`}>
          <div className="relative h-48 overflow-hidden">
            <img 
              src={article.image} 
              alt={translatedTitle}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 backdrop-blur">
                {translatedCategory}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <h3 className="text-xl font-barlow font-semibold mb-3 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1">
              {translatedTitle}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {translatedExcerpt}
            </p>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-primary font-medium">
                <span>{readMoreText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          </CardContent>
        </Link>
        <div className="px-6 pb-4">
          <ShareButton
            title={translatedTitle}
            text={translatedExcerpt}
            url={`${window.location.origin}/blog/${article.slug}`}
            variant="ghost"
            size="sm"
            className="w-full"
          />
        </div>
      </Card>
    </div>
  );
};
