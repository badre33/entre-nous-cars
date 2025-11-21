# Mobile Gestures - Guide d'utilisation

Ce dossier contient tous les hooks et composants pour implémenter des gestures natives mobiles avec haptic feedback.

## 🎯 Hooks Disponibles

### `useSwipeGesture`
Détecte les swipes horizontaux sur un élément.

```tsx
import { useSwipeGesture } from "@/hooks/useSwipeGesture";

const handlers = useSwipeGesture({
  onSwipeLeft: () => console.log("Swipe left!"),
  onSwipeRight: () => console.log("Swipe right!"),
  threshold: 50, // Distance minimale en px (défaut: 50)
  hapticFeedback: true // Active le retour haptique (défaut: true)
});

return <div {...handlers}>Swipe me!</div>;
```

### `useLongPress`
Détecte un appui long sur un élément.

```tsx
import { useLongPress } from "@/hooks/useLongPress";

const longPressHandlers = useLongPress({
  onLongPress: () => console.log("Long press detected!"),
  delay: 500, // Délai en ms (défaut: 500)
  hapticFeedback: true
});

return (
  <button 
    {...longPressHandlers}
    onClick={() => {
      if (!longPressHandlers.shouldPreventClick()) {
        console.log("Normal click");
      }
    }}
  >
    Hold me!
  </button>
);
```

### `useSwipeToClose`
Permet de fermer un modal/drawer en le glissant vers le bas.

```tsx
import { useSwipeToClose } from "@/hooks/useSwipeToClose";
import { cn } from "@/lib/utils";

const { dragOffset, isDragging, handlers } = useSwipeToClose({
  onClose: () => setIsOpen(false),
  threshold: 100 // Distance minimale pour fermer (défaut: 100)
});

return (
  <DialogContent 
    {...handlers}
    className={cn(isDragging && "transition-none")}
    style={{ transform: `translateY(${Math.max(0, dragOffset)}px)` }}
  >
    <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-2 cursor-grab" />
    {/* Contenu */}
  </DialogContent>
);
```

## 📱 Composants Prêts à l'Emploi

### `SwipeableCarCard`
Card de voiture avec tous les gestures intégrés :
- **Swipe gauche** : Ajouter à la comparaison
- **Swipe droite** : Voir les disponibilités  
- **Long press** : Preview détaillée

```tsx
import SwipeableCarCard from "@/components/SwipeableCarCard";

<SwipeableCarCard
  car={car}
  viewMode="carousel" // ou "grid" ou "list"
  startDate={startDate}
  endDate={endDate}
  isInComparison={isInComparison(car.id)}
  onToggleComparison={() => toggleComparison(car.id)}
  onShowAvailability={() => showAvailability(car)}
  onWhatsAppClick={() => contactWhatsApp(car)}
  onPreview={() => setPreviewCar(car)}
/>
```

### `CarPreviewDialog`
Modal de preview avec swipe-to-close intégré.

```tsx
import CarPreviewDialog from "@/components/CarPreviewDialog";

<CarPreviewDialog
  car={selectedCar}
  isOpen={isPreviewOpen}
  onClose={() => setIsPreviewOpen(false)}
  onShowAvailability={() => showAvailability()}
  onWhatsAppClick={() => contactWhatsApp()}
/>
```

### `FilterBottomSheet`
Bottom sheet avec swipe-to-close pour les filtres.

```tsx
import { FilterBottomSheet } from "@/components/FilterBottomSheet";

<FilterBottomSheet
  title="Sélectionner une ville"
  description="Choisissez votre ville"
  options={cities.map(city => ({ value: city, label: city }))}
  selectedValue={selectedCity}
  onValueChange={setSelectedCity}
  triggerLabel="Ville"
/>
```

## 🔧 Haptic Feedback

Le fichier `src/utils/haptics.ts` contient toutes les fonctions de retour haptique :

```tsx
import { 
  triggerHaptic,
  hapticSwipe,
  hapticLongPress,
  hapticAddToCompare,
  hapticRemoveFromCompare,
  hapticClose,
  hapticSelect
} from "@/utils/haptics";

// Exemples
hapticSwipe(); // Vibration légère pour swipe
hapticLongPress(); // Vibration moyenne pour long press
hapticAddToCompare(); // Pattern success pour ajout
hapticSelect(); // Vibration courte pour sélection

// Personnalisé
triggerHaptic('heavy'); // 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error'
```

## 🎨 Best Practices

1. **Toujours fournir un feedback visuel** en plus du haptic feedback
2. **Afficher des instructions** pour les nouveaux utilisateurs (tooltips, hints)
3. **Tester sur plusieurs appareils** - tous ne supportent pas l'API Vibration
4. **Éviter les vibrations trop fréquentes** - peut être irritant
5. **Permettre de désactiver** les gestures si nécessaire
6. **Combiner plusieurs gestures** pour une UX riche (ex: swipe + long press)

## 📊 Support Navigateurs

- **iOS Safari** : ✅ Plein support
- **Android Chrome** : ✅ Plein support  
- **Desktop** : ⚠️ Touch events supportés via souris mais sans haptic feedback

## 🚀 Prochaines Étapes

- [ ] Pinch-to-zoom sur les images
- [ ] Shake-to-refresh
- [ ] Double-tap actions
- [ ] Pull-to-refresh avancé
- [ ] Tutorial overlay pour onboarding

## 📝 Documentation Complète

Voir `MOBILE_GESTURES_GUIDE.md` à la racine pour une documentation plus détaillée.
