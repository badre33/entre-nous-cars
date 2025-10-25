import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Car, Calendar, DollarSign } from "lucide-react";

export const RevenueCalculator = () => {
  const [vehicleCount, setVehicleCount] = useState([10]);
  const [averagePrice, setAveragePrice] = useState([400]);
  const [occupancyRate, setOccupancyRate] = useState([70]);

  // Calculs
  const daysPerMonth = 30;
  const occupiedDays = Math.round((daysPerMonth * occupancyRate[0]) / 100);
  const monthlyRevenuePerCar = occupiedDays * averagePrice[0];
  const totalMonthlyRevenue = monthlyRevenuePerCar * vehicleCount[0];
  const yearlyRevenue = totalMonthlyRevenue * 12;
  
  // Commission Benatna (15%)
  const benatnaCommission = 0.15;
  const netMonthlyRevenue = totalMonthlyRevenue * (1 - benatnaCommission);
  const netYearlyRevenue = yearlyRevenue * (1 - benatnaCommission);

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Simulez vos revenus potentiels</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estimez combien vous pourriez gagner en rejoignant Benatna
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Controls */}
          <Card className="border-2 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Paramètres de simulation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Vehicle Count */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2 text-base">
                    <Car className="w-5 h-5" />
                    Nombre de véhicules
                  </Label>
                  <span className="text-2xl font-bold text-primary">{vehicleCount[0]}</span>
                </div>
                <Slider
                  value={vehicleCount}
                  onValueChange={setVehicleCount}
                  min={1}
                  max={50}
                  step={1}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 véhicule</span>
                  <span>50 véhicules</span>
                </div>
              </div>

              {/* Average Daily Price */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2 text-base">
                    <DollarSign className="w-5 h-5" />
                    Prix moyen par jour
                  </Label>
                  <span className="text-2xl font-bold text-secondary">{averagePrice[0]} MAD</span>
                </div>
                <Slider
                  value={averagePrice}
                  onValueChange={setAveragePrice}
                  min={200}
                  max={1000}
                  step={50}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>200 MAD</span>
                  <span>1 000 MAD</span>
                </div>
              </div>

              {/* Occupancy Rate */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5" />
                    Taux d'occupation
                  </Label>
                  <span className="text-2xl font-bold text-accent">{occupancyRate[0]}%</span>
                </div>
                <Slider
                  value={occupancyRate}
                  onValueChange={setOccupancyRate}
                  min={30}
                  max={95}
                  step={5}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30%</span>
                  <span>95%</span>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  = {occupiedDays} jours loués par mois
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            <Card className="border-2 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Chiffre d'affaires brut mensuel</p>
                <p className="text-4xl font-bold text-primary mb-1">{formatMAD(totalMonthlyRevenue)}</p>
                <p className="text-xs text-muted-foreground">
                  Avant commission Benatna (15%)
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Revenu net mensuel</p>
                <p className="text-4xl font-bold text-secondary mb-1">{formatMAD(netMonthlyRevenue)}</p>
                <p className="text-xs text-muted-foreground">
                  Après commission Benatna
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Revenu net annuel</p>
                <p className="text-4xl font-bold text-accent mb-1">{formatMAD(netYearlyRevenue)}</p>
                <p className="text-xs text-muted-foreground">
                  Sur 12 mois
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 rounded-2xl bg-muted/30">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Ce qui est inclus :
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Visibilité nationale sur Benatna.ma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Gestion automatisée des réservations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Support client 7j/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Paiements sécurisés et rapides</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          * Cette simulation est indicative et basée sur des moyennes du marché. 
          Les revenus réels dépendent de nombreux facteurs : qualité de votre flotte, 
          saisonnalité, localisation, etc.
        </p>
      </div>
    </section>
  );
};
