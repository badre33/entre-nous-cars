import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, Phone, Users, Clock, Star } from "lucide-react";

const WhyBenatna = () => {
  const benefits = [
    {
      icon: Shield,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Pas de paiement en ligne",
      description: "Réglez sur place, en toute confiance. Aucun risque."
    },
    {
      icon: CheckCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Aucun frais caché",
      description: "Le prix annoncé est le prix final. Transparence totale."
    },
    {
      icon: Phone,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: "Assistance humaine",
      description: "Un vrai interlocuteur qui répond rapidement sur WhatsApp."
    },
    {
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Adapté aux MRE & touristes",
      description: "Nous comprenons vos besoins spécifiques depuis l'étranger."
    },
    {
      icon: Clock,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      title: "Flexibilité maximale",
      description: "Modification ou annulation facile. On s'adapte à vous."
    },
    {
      icon: Star,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Véhicules fiables",
      description: "Partenaires locaux vérifiés, voitures récentes et entretenues."
    }
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Pourquoi choisir Benatna ?
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Une location simple et transparente, pensée pour les MRE et touristes
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${benefit.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBenatna;
