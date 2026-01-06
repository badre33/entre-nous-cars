import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface City {
  nameKey: string;
  image: string;
  imageLarge?: string;
  slug: string;
  guideSlug: string;
}

interface CityGridProps {
  cities: City[];
}

const CityGrid = ({ cities }: CityGridProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          {t("homepage.citiesTitle")}
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          {t("homepage.citiesSubtitle")}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <Card key={city.nameKey} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0">
              <div className="relative h-32 sm:h-40">
                <img 
                  src={city.image} 
                  srcSet={city.imageLarge ? `${city.image} 400w, ${city.imageLarge} 896w` : undefined}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 288px"
                  alt={`Location voiture ${t(city.nameKey)}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  width="288"
                  height="160"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{t(city.nameKey)}</h3>
                </div>
              </div>
              <div className="p-3 flex gap-2">
                <Button asChild size="sm" className="flex-1 text-xs">
                  <Link to={`/louer?city=${city.slug}`}>{t("homepage.viewCars")}</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
                  <Link to={city.guideSlug}>{t("homepage.guideLink")}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityGrid;
