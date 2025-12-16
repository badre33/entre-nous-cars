import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  comment: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section className="py-16 md:py-20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-primary">Trusted by MRE & international travelers</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Ce que disent nos clients
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CAN 2025 mention */}
        <div className="mt-12 text-center">
          <Card className="inline-block border-primary/20 bg-primary/5">
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base">
                🏆 <strong>CAN 2025 au Maroc</strong> - Réservez votre voiture dès maintenant pour l'événement !
              </p>
              <Link to="/location-voiture-can-2025-maroc" className="text-primary hover:underline text-sm mt-2 inline-block">
                En savoir plus →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
