import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import LazyCarImage from "@/components/LazyCarImage";
import { calculateDays, calculateTotalPrice, calculateDailyPrice, formatPrice } from "@/utils/priceCalculations";
import { generateCarImageAlt } from "@/utils/seoHelpers";
// import { ViewCounter } from "@/components/ViewCounter";
// import { UrgencyBadge } from "@/components/UrgencyBadge";


// Helper: convert car name to slug for /vehicule/:slug route
const getVehicleSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/é|è|ê/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/^renault-megane-cactus$/, 'renault-megane')
    .replace(/^vw-/, 'volkswagen-')
    .replace(/^volkswagen-/, 'vw-')
    .replace(/^bmw-serie-/, 'bmw-')
    .replace(/^mercedes-classe-/, 'mercedes-classe-')
    .replace(/^volkswagen-touareg$/, 'vw-touareg')
    .replace(/^volkswagen-golf$/, 'vw-golf');
};

interface CarCardProps {
  car: {
    id: number;
    image: string;
    name: string;
    brand: string;
    type: string;
    category: string;
    city: string;
    priceDisplay: string;
    badges?: string[];
  };
  viewMode: 'carousel' | 'grid' | 'list';
  startDate?: Date;
  endDate?: Date;
  isInComparison: boolean;
  onToggleComparison: () => void;
  onShowAvailability: () => void;
  onWhatsAppClick: () => void;
}

export default function CarCard({
  car,
  viewMode,
  startDate,
  endDate,
  isInComparison,
  onToggleComparison,
  onShowAvailability,
  onWhatsAppClick
}: CarCardProps) {
  const days = calculateDays(startDate, endDate);
  const basePrice = parseInt(car.priceDisplay.replace(/[^\d]/g, ''));
  
  const priceInfo = days > 0 ? {
    total: formatPrice(calculateTotalPrice(basePrice, days)),
    days,
    discount: days >= 7 ? Math.round((1 - calculateDailyPrice(basePrice, days) / basePrice) * 100) : 0
  } : null;

  // Générer l'alt tag SEO optimisé
  const imageAlt = generateCarImageAlt(car.name, car.city, car.category, car.priceDisplay);

  // Vue Liste (compacte, horizontale)
  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border mb-3">
        <CardContent className="p-3">
          <div className="flex gap-3">
            <Link to={`/vehicule/${getVehicleSlug(car.name)}`} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden block hover:opacity-90 transition-opacity">
              <LazyCarImage 
                src={car.image} 
                alt={imageAlt}
                className="w-full h-full object-cover object-center"
              />
              {car.badges && car.badges.length > 0 && (
                <Badge className="absolute top-1 left-1 text-xs py-0 px-1.5 bg-destructive/90">
                  {car.badges[0].replace('🔥 ', '')}
                </Badge>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="text-sm font-semibold truncate">{car.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{car.category} • {car.type}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {priceInfo ? (
                    <>
                      <p className="text-base font-bold text-primary">{priceInfo.total}</p>
                      <p className="text-xs text-muted-foreground">{priceInfo.days}j</p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-bold text-primary">{car.priceDisplay}</p>
                      <p className="text-xs text-muted-foreground">/j</p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="w-2.5 h-2.5" />
                <span className="truncate">{car.city}</span>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="outline" className="h-11 text-sm flex-1" onClick={onShowAvailability}>
                  <CalendarCheck className="w-3 h-3 mr-1" />
                  Dispo
                </Button>
                <Button size="sm" className="h-11 text-sm flex-1" onClick={onWhatsAppClick}>
                  WhatsApp
                </Button>
                <div
                  className={cn(
                    "h-10 w-10 flex items-center justify-center rounded border cursor-pointer transition-all",
                    isInComparison ? "bg-primary border-primary" : "border-border"
                  )}
                  onClick={onToggleComparison}
                >
                  <Checkbox checked={isInComparison} className="pointer-events-none h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vue Grille (2 colonnes, compact)
  if (viewMode === 'grid') {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all duration-200 border h-full">
        <Link to={`/vehicule/${getVehicleSlug(car.name)}`} className="relative h-32 overflow-hidden bg-muted block hover:opacity-90 transition-opacity">
          <LazyCarImage 
            src={car.image} 
            alt={imageAlt}
            className="w-full h-full object-cover object-center"
          />
          
          {/* ViewCounter - Temporairement désactivé
          <div className="absolute bottom-2 left-2 z-10">
            <ViewCounter 
              vehicleName={car.name}
              baseViews={Math.floor(Math.random() * 4) + 2}
            />
          </div>
          */}
          
          <div className="absolute top-1.5 right-1.5 z-10">
            <div
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-sm cursor-pointer transition-all",
                isInComparison ? "bg-primary" : "bg-background/80 border border-border"
              )}
              onClick={onToggleComparison}
            >
              <Checkbox checked={isInComparison} className="pointer-events-none h-3.5 w-3.5" />
            </div>
          </div>
          {car.badges && car.badges.length > 0 && (
            <Badge className="absolute top-1.5 left-1.5 text-xs py-0 px-1.5 bg-destructive/90">
              {car.badges[0].replace('🔥 ', '')}
            </Badge>
          )}
        </Link>
        <CardContent className="p-3">
          <div className="mb-2">
            <h3 className="text-sm font-semibold truncate mb-0.5">{car.name}</h3>
            <p className="text-xs text-muted-foreground truncate">{car.category}</p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-2.5 h-2.5" />
              <span className="truncate">{car.city}</span>
            </div>
            <div className="text-right">
              {priceInfo ? (
                <>
                  <p className="text-sm font-bold text-primary">{priceInfo.total}</p>
                  <p className="text-xs text-muted-foreground">{priceInfo.days}j</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-primary">{car.priceDisplay}</p>
                  <p className="text-xs text-muted-foreground">/j</p>
                </>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Button size="sm" variant="outline" className="w-full h-11 text-sm" onClick={onShowAvailability}>
              <CalendarCheck className="w-3 h-3 mr-1" />
              Disponibilités
            </Button>
            <Button size="sm" className="w-full h-11 text-sm" onClick={onWhatsAppClick}>
              WhatsApp
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vue Carrousel (par défaut, carte complète)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border h-full">
      <Link to={`/vehicule/${getVehicleSlug(car.name)}`} className="relative h-48 overflow-hidden bg-muted block hover:opacity-90 transition-opacity">
        <LazyCarImage 
          src={car.image} 
          alt={imageAlt}
          className="w-full h-full object-cover object-center"
        />
        
        {/* ViewCounter - Temporairement désactivé
        <div className="absolute bottom-2 left-2 z-10">
          <ViewCounter 
            vehicleName={car.name}
            baseViews={Math.floor(Math.random() * 5) + 2}
          />
        </div>
        */}
        
        {/* UrgencyBadge - Temporairement désactivé
        {Math.random() > 0.7 && (
          <div className="absolute bottom-2 right-2 z-10">
            <UrgencyBadge 
              type={Math.random() > 0.5 ? 'limited' : 'popular'}
              count={Math.floor(Math.random() * 3) + 1}
            />
          </div>
        )}
        */}
        
        <div className="absolute top-2 right-2 z-10">
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all cursor-pointer backdrop-blur-sm touch-target",
              isInComparison
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/90 border border-border"
            )}
            onClick={onToggleComparison}
          >
            <Checkbox
              checked={isInComparison}
              className="pointer-events-none h-4 w-4"
            />
            <span className="text-xs font-medium">Comparer</span>
          </div>
        </div>
        {car.badges && car.badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {car.badges.slice(0, 2).map((badge, idx) => (
              <Badge 
                key={`${car.id}-badge-${idx}`}
                className={cn(
                  "text-xs py-0.5 px-2",
                  badge.includes('Populaire') && 'bg-destructive/90',
                  badge.includes('Disponible') && 'bg-secondary/90 animate-pulse',
                  badge.includes('Nouveau') && 'bg-accent/90'
                )}
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-2">
            <h3 className="text-lg font-barlow font-semibold mb-0.5 line-clamp-1">{car.name}</h3>
            <p className="text-xs text-muted-foreground">{car.category} • {car.type}</p>
          </div>
          <div className="text-right flex-shrink-0">
            {priceInfo ? (
              <>
                <p className="text-xl font-bold text-primary">{priceInfo.total}</p>
                <p className="text-xs text-muted-foreground">{priceInfo.days} jour{priceInfo.days > 1 ? 's' : ''}</p>
                {priceInfo.discount > 0 && (
                  <p className="text-xs text-secondary font-medium">-{priceInfo.discount}%</p>
                )}
              </>
            ) : (
              <>
                <p className="text-xl font-bold text-primary">{car.priceDisplay}</p>
                <p className="text-xs text-muted-foreground">par jour</p>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{car.city}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <Button 
            variant="outline"
            size="sm"
            className="w-full rounded-full touch-target text-xs" 
            onClick={onShowAvailability}
          >
            <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
            Disponibilités
          </Button>
          <Button 
            size="sm"
            className="w-full rounded-full touch-target text-xs" 
            onClick={onWhatsAppClick}
          >
            Contacter WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
