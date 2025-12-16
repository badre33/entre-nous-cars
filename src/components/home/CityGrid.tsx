import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface City {
  name: string;
  image: string;
  slug: string;
  guideSlug: string;
}

interface CityGridProps {
  cities: City[];
}

const CityGrid = ({ cities }: CityGridProps) => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Où louer votre voiture ?
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Disponible dans les principales villes et aéroports du Maroc
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {cities.map((city) => (
            <Card key={city.name} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0">
              <div className="relative h-32 sm:h-40">
                <img 
                  src={city.image} 
                  alt={`Location voiture ${city.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white font-semibold text-sm sm:text-base">{city.name}</h3>
                </div>
              </div>
              <div className="p-3 flex gap-2">
                <Button asChild size="sm" className="flex-1 text-xs">
                  <Link to={`/louer?city=${city.slug}`}>Voir les voitures</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="flex-1 text-xs">
                  <Link to={city.guideSlug}>Guide location</Link>
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
