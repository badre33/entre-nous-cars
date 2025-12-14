import { Link } from "react-router-dom";
import { Star, Users, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Import images
import carDuster from "@/assets/car-duster.jpg";
import carClio from "@/assets/car-clio.jpg";
import carCorolla from "@/assets/car-corolla.jpg";
import carTucson from "@/assets/car-hyundai-tucson.jpg";

const popularVehicles = [
  {
    id: 1,
    name: "Dacia Duster",
    image: carDuster,
    price: 350,
    rating: 4.8,
    reviews: 127,
    badge: "Plus demandé",
  },
  {
    id: 2,
    name: "Renault Clio",
    image: carClio,
    price: 250,
    rating: 4.7,
    reviews: 98,
    badge: "Économique",
  },
  {
    id: 3,
    name: "Toyota Corolla",
    image: carCorolla,
    price: 400,
    rating: 4.9,
    reviews: 84,
    badge: "Fiable",
  },
  {
    id: 4,
    name: "Hyundai Tucson",
    image: carTucson,
    price: 450,
    rating: 4.8,
    reviews: 76,
    badge: "Familial",
  },
];

export const PopularVehicles = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Véhicules populaires
            </h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Réservés cette semaine
            </p>
          </div>
          <Link to="/louer">
            <Button variant="ghost" size="sm" className="gap-1">
              Voir tout
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {popularVehicles.map((vehicle) => (
            <Link key={vehicle.id} to="/louer" className="group">
              <Card className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={`Location ${vehicle.name} au Maroc`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Badge 
                    className="absolute top-2 left-2 text-xs bg-primary/90 text-primary-foreground"
                  >
                    {vehicle.badge}
                  </Badge>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm md:text-base text-foreground truncate">
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{vehicle.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({vehicle.reviews} avis)
                    </span>
                  </div>
                  <p className="mt-2 text-sm">
                    <span className="font-bold text-primary">{vehicle.price} DH</span>
                    <span className="text-muted-foreground text-xs">/jour</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
