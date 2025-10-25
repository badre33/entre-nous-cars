import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: "Ahmed Bennani",
    agency: "Atlas Car Rental",
    city: "Marrakech",
    rating: 5,
    text: t('testimonials.ahmed'),
    initials: "AB",
    color: "bg-primary"
  },
  {
    id: 2,
    name: "Fatima Alaoui",
    agency: "Sahara Voyages Auto",
    city: "Casablanca",
    rating: 5,
    text: t('testimonials.fatima'),
    initials: "FA",
    color: "bg-secondary"
  },
  {
    id: 3,
    name: "Youssef Tazi",
    agency: "Imperial Rent",
    city: "Fès",
    rating: 5,
    text: t('testimonials.youssef'),
    initials: "YT",
    color: "bg-accent"
  },
  {
    id: 4,
    name: "Karim El Fassi",
    agency: "Rabat Premium Cars",
    city: "Rabat",
    rating: 5,
    text: t('testimonials.karim'),
    initials: "KF",
    color: "bg-primary"
  },
  {
    id: 5,
    name: "Nadia Chraibi",
    agency: "Atlantic Location",
    city: "Agadir",
    rating: 5,
    text: t('testimonials.nadia'),
    initials: "NC",
    color: "bg-secondary"
  },
  {
    id: 6,
    name: "Omar Bensouda",
    agency: "Mediterranean Auto",
    city: "Tanger",
    rating: 5,
    text: t('testimonials.omar'),
    initials: "OB",
    color: "bg-accent"
  }
];

export const PartnerTestimonials = () => {
  const { t } = useLanguage();
  const testimonialsData = testimonials(t);
  
  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">{t('partners.testimonialsTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('partners.testimonialsSubtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="border-2 hover:shadow-lg transition-all rounded-2xl relative">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar className={`${testimonial.color} text-white`}>
                    <AvatarFallback className={`${testimonial.color} text-white`}>
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.agency} • {testimonial.city}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24+</div>
            <p className="text-sm text-muted-foreground">{t('testimonials.activeAgencies')}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">{t('testimonials.satisfactionRate')}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">+40%</div>
            <p className="text-sm text-muted-foreground">{t('testimonials.averageGrowth')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
