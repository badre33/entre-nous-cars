import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Bennani",
    agency: "Atlas Car Rental",
    city: "Marrakech",
    rating: 5,
    text: "Depuis qu'on a rejoint Benatna, notre taux de réservation a augmenté de 40%. La plateforme est simple à utiliser et l'équipe est très réactive. On reçoit des clients de qualité qui recherchent vraiment un service local et authentique.",
    initials: "AB",
    color: "bg-primary"
  },
  {
    id: 2,
    name: "Fatima Alaoui",
    agency: "Sahara Voyages Auto",
    city: "Casablanca",
    rating: 5,
    text: "Benatna nous a permis de nous développer sans investir dans du marketing coûteux. Les 15% de commission sont très raisonnables comparés aux 30-35% que prennent les grandes plateformes internationales. Et surtout, pas de frais cachés !",
    initials: "FA",
    color: "bg-secondary"
  },
  {
    id: 3,
    name: "Youssef Tazi",
    agency: "Imperial Rent",
    city: "Fès",
    rating: 5,
    text: "Ce qui m'a convaincu avec Benatna, c'est leur approche humaine. On ne se sent pas comme un simple numéro. L'équipe comprend nos contraintes d'agence locale et travaille avec nous, pas contre nous. Les paiements sont toujours à l'heure.",
    initials: "YT",
    color: "bg-accent"
  },
  {
    id: 4,
    name: "Karim El Fassi",
    agency: "Rabat Premium Cars",
    city: "Rabat",
    rating: 5,
    text: "J'étais sceptique au début, mais après 6 mois sur Benatna, on a rempli 25% de notre flotte grâce à la plateforme. Les clients viennent déjà informés et prêts à louer. Ça nous fait gagner un temps précieux sur la négociation.",
    initials: "KF",
    color: "bg-primary"
  },
  {
    id: 5,
    name: "Nadia Chraibi",
    agency: "Atlantic Location",
    city: "Agadir",
    rating: 5,
    text: "Benatna a transformé notre façon de travailler. Avant, on passait des heures à répondre à des demandes WhatsApp désorganisées. Maintenant, tout est centralisé, professionnel, et les clients nous trouvent facilement. Notre chiffre a augmenté de 35% en un an.",
    initials: "NC",
    color: "bg-secondary"
  },
  {
    id: 6,
    name: "Omar Bensouda",
    agency: "Mediterranean Auto",
    city: "Tanger",
    rating: 5,
    text: "En tant que petite agence familiale, on ne pouvait pas rivaliser avec les grandes franchises. Benatna nous a donné une vitrine professionnelle et crédible. On est sur le même pied d'égalité que les gros acteurs, et nos clients apprécient le service personnalisé qu'on offre.",
    initials: "OB",
    color: "bg-accent"
  }
];

export const PartnerTestimonials = () => {
  const { t } = useLanguage();
  
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
          {testimonials.map((testimonial) => (
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
            <p className="text-sm text-muted-foreground">Agences partenaires actives</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Taux de satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">+40%</div>
            <p className="text-sm text-muted-foreground">Croissance moyenne du CA</p>
          </div>
        </div>
      </div>
    </section>
  );
};
