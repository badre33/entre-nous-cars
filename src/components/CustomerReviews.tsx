import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SITE_STATS } from '@/data/siteStats';

const reviews = [
  {
    name: 'Amina Benali',
    location: 'Casablanca',
    rating: 5,
    comment: 'Service impeccable ! J\'ai loué une Clio pour visiter Marrakech. La voiture était propre, récente et le prix très compétitif. Je recommande vivement Benatna.',
    date: 'Il y a 2 jours',
    verified: true,
    avatar: '/placeholder.svg',
    car: 'Renault Clio',
  },
  {
    name: 'Youssef Alami',
    location: 'Rabat',
    rating: 5,
    comment: 'Excellente expérience du début à la fin. L\'assistance client est réactive et professionnelle. J\'ai eu un surclassement gratuit vers un SUV. Merci !',
    date: 'Il y a 5 jours',
    verified: true,
    avatar: '/placeholder.svg',
    car: 'Dacia Duster',
  },
  {
    name: 'Sofia Mansouri',
    location: 'Marrakech',
    rating: 5,
    comment: 'Parfait pour mon séjour touristique ! La réservation en ligne est simple et rapide. La voiture m\'attendait à l\'aéroport. Aucun souci pendant toute la durée de location.',
    date: 'Il y a 1 semaine',
    verified: true,
    avatar: '/placeholder.svg',
    car: 'Peugeot 208',
  },
  {
    name: 'Mehdi Tazi',
    location: 'Fès',
    rating: 5,
    comment: 'Très bonne agence ! Prix transparents, pas de frais cachés. La voiture était en parfait état. Je loue régulièrement chez Benatna et je ne suis jamais déçu.',
    date: 'Il y a 2 semaines',
    verified: true,
    avatar: '/placeholder.svg',
    car: 'Toyota Corolla',
  },
];

export const CustomerReviews = () => {
  const averageRating = SITE_STATS.ratingAverage;
  const totalReviews = SITE_STATS.ratingCount;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 sm:h-6 sm:w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-xl sm:text-2xl font-bold">{averageRating}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
            Ce que disent nos clients
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Plus de {totalReviews.toLocaleString()} avis vérifiés
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((review, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-xs sm:text-sm">{review.name}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            ✓ Vérifié
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex mb-2 sm:mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 h-5 w-5 sm:h-6 sm:w-6 text-primary/20" />
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 pl-3 sm:pl-4">
                    {review.comment}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t">
                  <span className="text-xs text-primary font-medium">
                    {review.car}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tous les avis sont vérifiés et proviennent de clients ayant effectué une réservation
          </p>
        </div>
      </div>
    </section>
  );
};
