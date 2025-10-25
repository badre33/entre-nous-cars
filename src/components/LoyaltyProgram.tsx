import { Star, Gift, Crown, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: 'Bronze',
    icon: Star,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    rentals: '1-3 locations',
    benefits: ['5% de réduction', 'Support prioritaire', 'Assurance incluse'],
  },
  {
    name: 'Argent',
    icon: Gift,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    rentals: '4-9 locations',
    benefits: ['10% de réduction', 'Surclassement gratuit', 'Check-in express', 'Kilométrage illimité'],
  },
  {
    name: 'Or',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    rentals: '10-19 locations',
    benefits: ['15% de réduction', 'Véhicule premium', 'Conciergerie 24/7', 'Transfert aéroport gratuit'],
  },
  {
    name: 'Platine',
    icon: Trophy,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    rentals: '20+ locations',
    benefits: ['20% de réduction', 'Flotte exclusive', 'Service VIP', 'Accès lounge partenaires'],
  },
];

export const LoyaltyProgram = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">
            Programme de Fidélité
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plus vous roulez, plus vous gagnez
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Profitez d'avantages exclusifs à chaque location. Accumulez des points et 
            débloquez des récompenses exceptionnelles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <Card 
                key={index} 
                className={`border-2 ${tier.borderColor} hover:shadow-lg transition-all hover:scale-105`}
              >
                <CardContent className="p-6">
                  <div className={`${tier.bgColor} rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className={`h-8 w-8 ${tier.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center mb-2">{tier.name}</h3>
                  <p className="text-sm text-center text-muted-foreground mb-4">
                    {tier.rentals}
                  </p>

                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className={`${tier.color} mt-0.5`}>✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Inscription automatique dès votre première location • Points valables 2 ans
          </p>
        </div>
      </div>
    </section>
  );
};
