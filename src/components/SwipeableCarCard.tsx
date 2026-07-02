import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, CalendarCheck, Eye } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";
import LazyCarImage from "@/components/LazyCarImage";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useLongPress } from "@/hooks/useLongPress";
import { hapticAddToCompare, hapticRemoveFromCompare } from "@/utils/haptics";
import { calculateDays, calculateTotalPrice, calculateDailyPrice, formatPrice, getDiscountPercentage, currentDailyPrice } from "@/utils/priceCalculations";
import { currentContextBadge } from "@/lib/pricing";
import { generateCarImageAlt } from "@/utils/seoHelpers";


const getVehicleSlug = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/é|è|ê/g, 'e')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/^volkswagen-/, 'vw-')
    .replace(/^bmw-serie-/, 'bmw-');
};

interface SwipeableCarCardProps {
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
  onPreview?: () => void;
}

export default function SwipeableCarCard({
  car,
  viewMode,
  startDate,
  endDate,
  isInComparison,
  onToggleComparison,
  onShowAvailability,
  onWhatsAppClick,
  onPreview
}: SwipeableCarCardProps) {
  const navigate = useNavigate();
  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if click is on the card itself, not on a button
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[role="checkbox"]')) {
      return;
    }
    navigate(`/vehicule/${getVehicleSlug(car.name)}`);
  };

  const [swipeOffset, setSwipeOffset] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const days = calculateDays(startDate, endDate);
  const basePrice = parseInt(car.priceDisplay.replace(/[^\d]/g, ''));

  // Prix journalier courant (moteur dynamique : saison + événement marocain)
  const dailyPriceNow = currentDailyPrice(basePrice, car.city);
  const contextBadge = currentContextBadge();
  const discountHint = getDiscountPercentage(7); // hint "économisez X% dès 7 jours"

  const priceInfo = days > 0 ? {
    total: formatPrice(calculateTotalPrice(basePrice, days, { city: car.city })),
    daily: calculateDailyPrice(basePrice, days, { city: car.city }),
    days,
    discount: getDiscountPercentage(days)
  } : null;

  const imageAlt = generateCarImageAlt(car.name, car.city, car.category, car.priceDisplay);

  // Gestion du swipe horizontal
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => {
      // Swipe left = ajouter à la comparaison
      if (!isInComparison) {
        if (isInComparison) {
          hapticRemoveFromCompare();
        } else {
          hapticAddToCompare();
        }
        onToggleComparison();
        setShowQuickActions(true);
        setTimeout(() => setShowQuickActions(false), 2000);
      }
    },
    onSwipeRight: () => {
      // Swipe right = ouvrir disponibilités
      onShowAvailability();
    },
    threshold: 80
  });

  // Gestion du long press pour preview
  const longPressHandlers = useLongPress({
    onLongPress: () => {
      if (onPreview) onPreview();
    },
    delay: 600
  });

  // Vue Liste (compacte)
  if (viewMode === 'list') {
    return (
      <Card 
        ref={cardRef}
        onClick={handleCardClick}
        className={cn(
          "overflow-hidden hover:shadow-md transition-all duration-200 border mb-3 cursor-pointer",
          showQuickActions && "ring-2 ring-primary"
        )}
        {...swipeHandlers}
        {...longPressHandlers}
      >
        <CardContent className="p-3">
          <div className="flex gap-3">
            <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <LazyCarImage 
                src={car.image} 
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
              {car.badges && car.badges.length > 0 && (
                <Badge className="absolute top-1 left-1 text-xs py-0 px-1.5 bg-destructive/90">
                  {car.badges[0].replace('🔥 ', '')}
                </Badge>
              )}
            </div>
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
                      {priceInfo.discount > 0 && (
                        <p className="text-[10px] text-secondary font-medium">-{priceInfo.discount}%</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-base font-bold text-primary">{dailyPriceNow} DH</p>
                      <p className="text-xs text-muted-foreground">/jour</p>
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
                    "h-11 w-11 flex items-center justify-center rounded border cursor-pointer transition-all",
                    isInComparison ? "bg-primary border-primary" : "border-border"
                  )}
                  onClick={() => {
                    if (isInComparison) {
                      hapticRemoveFromCompare();
                    } else {
                      hapticAddToCompare();
                    }
                    onToggleComparison();
                  }}
                >
                  <Checkbox checked={isInComparison} className="pointer-events-none h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Indicateur de swipe */}
        {showQuickActions && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded animate-fade-in">
            {isInComparison ? "Ajouté ✓" : "Retiré"}
          </div>
        )}
      </Card>
    );
  }

  // Vue Grille
  if (viewMode === 'grid') {
    return (
      <Card 
        ref={cardRef}
        onClick={handleCardClick}
        className={cn(
          "overflow-hidden hover:shadow-md transition-all duration-200 border h-full cursor-pointer",
          showQuickActions && "ring-2 ring-primary"
        )}
        {...swipeHandlers}
        {...longPressHandlers}
      >
        <div className="relative bg-muted">
          <AspectRatio ratio={16 / 9}>
            <LazyCarImage 
              src={car.image} 
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute top-1.5 right-1.5 z-10">
            <div
              className={cn(
                "h-11 w-11 flex items-center justify-center rounded-full backdrop-blur-sm cursor-pointer transition-all",
                isInComparison ? "bg-primary" : "bg-background/80 border border-border"
              )}
              onClick={() => {
                if (isInComparison) {
                  hapticRemoveFromCompare();
                } else {
                  hapticAddToCompare();
                }
                onToggleComparison();
              }}
            >
              <Checkbox checked={isInComparison} className="pointer-events-none h-3.5 w-3.5" />
            </div>
          </div>
          {car.badges && car.badges.length > 0 && (
            <Badge className="absolute top-1.5 left-1.5 text-xs py-0 px-1.5 bg-destructive/90">
              {car.badges[0].replace('🔥 ', '')}
            </Badge>
          )}
        </div>
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
                  {priceInfo.discount > 0 && (
                    <p className="text-[10px] text-secondary font-medium">-{priceInfo.discount}%</p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-primary">{dailyPriceNow} DH</p>
                  <p className="text-xs text-muted-foreground">/jour</p>
                </>
              )}
            </div>
          </div>
          {!priceInfo && contextBadge && (
            <div className="mb-2">
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-secondary/50 text-secondary">
                {contextBadge}
              </Badge>
            </div>
          )}
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
        
        {showQuickActions && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded animate-fade-in z-20">
            Ajouté ✓
          </div>
        )}
      </Card>
    );
  }

  // Vue Carrousel (par défaut)
  return (
    <Card 
      ref={cardRef}
      onClick={handleCardClick}
      className={cn(
        "overflow-hidden hover:shadow-lg transition-all duration-300 border h-full relative cursor-pointer",
        showQuickActions && "ring-2 ring-primary"
      )}
      {...swipeHandlers}
      {...longPressHandlers}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <LazyCarImage 
          src={car.image} 
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        
        {/* Instructions de swipe au premier affichage */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 text-xs text-white/80 backdrop-blur-sm bg-black/30 px-2 py-1 rounded">
          <span>← Comparer</span>
          <span>Dispo →</span>
        </div>
        
        <div className="absolute top-2 right-2 z-10">
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full transition-all cursor-pointer backdrop-blur-sm touch-target",
              isInComparison
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/90 border border-border"
            )}
            onClick={() => {
              if (isInComparison) {
                hapticRemoveFromCompare();
              } else {
                hapticAddToCompare();
              }
              onToggleComparison();
            }}
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
      </div>
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
                <p className="text-xl font-bold text-primary">{dailyPriceNow} DH</p>
                <p className="text-xs text-muted-foreground">par jour</p>
                {contextBadge && (
                  <p className="text-[10px] text-secondary font-medium mt-0.5">{contextBadge}</p>
                )}
                {discountHint > 0 && (
                  <p className="text-[10px] text-muted-foreground">-{discountHint}% dès 7 jours</p>
                )}
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
      
      {showQuickActions && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg animate-scale-in z-30">
          <div className="flex items-center gap-2">
            <Checkbox checked className="h-5 w-5" />
            <span className="font-semibold">Ajouté à la comparaison</span>
          </div>
        </div>
      )}
    </Card>
  );
}
