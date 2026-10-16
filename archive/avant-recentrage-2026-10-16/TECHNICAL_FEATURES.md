# Documentation Technique - Benatna

## 🚀 Fonctionnalités Techniques Avancées

### 1. Service Worker & Cache Intelligent

Le projet utilise **Workbox** via `vite-plugin-pwa` pour un cache intelligent et performant.

#### Stratégies de Cache Configurées

**Cache First (Ressources statiques)**
- Google Fonts (1 an)
- Images (30 jours)
- CDN externes (1 an)

**Network First (API)**
- Edge Functions Supabase (5 minutes)
- Timeout réseau: 10 secondes

#### Utilisation
Le Service Worker est automatiquement enregistré. Les ressources sont mises en cache selon les stratégies définies dans `vite.config.ts`.

---

### 2. Analytics & Tracking des Conversions

Système d'analytics complet pour tracker les conversions et le comportement utilisateur.

#### Événements Disponibles

```typescript
import { analytics } from '@/utils/analytics';

// Recherche de voiture
analytics.trackSearchPerformed('Casablanca', { 
  start: '2024-01-01', 
  end: '2024-01-07' 
});

// Vue d'un véhicule
analytics.trackCarViewed('Renault', 'Clio');

// Début de réservation
analytics.trackBookingStarted('Dacia Duster', 250);

// Formulaires
analytics.trackPartnerFormSubmitted();
analytics.trackContactFormSubmitted();

// Engagement
analytics.trackEmailSubscribed('exit_popup');
analytics.trackChatOpened('ai_assistant');

// Navigation
analytics.trackOutboundClick('https://partner.com', 'Partner Link');
```

#### Intégration Google Analytics 4

Les événements sont automatiquement envoyés à GA4 si `gtag` est disponible.

```html
<!-- Ajoutez dans index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

### 3. Error Boundaries React

Protection complète contre les erreurs JavaScript avec UI de secours élégante.

#### Utilisation Basique

```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

#### Avec Fallback Personnalisé

```typescript
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>
```

#### Fonctionnalités
- ✅ Capture toutes les erreurs React
- ✅ UI de secours professionnelle
- ✅ Boutons "Réessayer" et "Accueil"
- ✅ Stack trace en développement
- ✅ Log automatique des erreurs
- ✅ Prêt pour intégration Sentry/Rollbar

---

### 4. A/B Testing Infrastructure

Framework complet pour tester différentes variantes et optimiser les conversions.

#### Utilisation en React

```typescript
import { useABTest, AB_TESTS } from '@/utils/abTesting';

function MyComponent() {
  const variant = useABTest(AB_TESTS.HERO_CTA);

  return (
    <div>
      {variant === 'A' ? (
        <Button>Réserver maintenant</Button>
      ) : (
        <Button>Voir les voitures</Button>
      )}
    </div>
  );
}
```

#### Utilisation en JavaScript Vanilla

```typescript
import { abTesting, AB_TESTS } from '@/utils/abTesting';

// Initialiser un test
const variant = abTesting.initTest(AB_TESTS.PRICING_DISPLAY);

// Vérifier la variante
if (abTesting.isVariantA(AB_TESTS.PRICING_DISPLAY)) {
  // Afficher prix mensuel
} else {
  // Afficher prix total
}
```

#### Tests Prédéfinis

```typescript
export const AB_TESTS = {
  HERO_CTA: 'hero_cta_variant',           // CTA hero section
  PRICING_DISPLAY: 'pricing_display',      // Affichage prix
  LOYALTY_BADGE: 'loyalty_badge_position', // Position badge fidélité
  SEARCH_FORM: 'search_form_layout',       // Layout formulaire
};
```

#### API Complete

```typescript
// Activer/désactiver un test
abTesting.setTestEnabled('test_name', true);

// Obtenir tous les tests actifs
const activeTests = abTesting.getActiveTests();

// Réinitialiser tous les tests
abTesting.clearTests();
```

#### Combinaison avec Analytics

```typescript
const variant = useABTest(AB_TESTS.HERO_CTA);

useEffect(() => {
  analytics.trackEvent('ab_test_exposure', {
    test_name: AB_TESTS.HERO_CTA,
    variant: variant,
  });
}, [variant]);
```

---

## 📊 Monitoring et Debugging

### Console en Développement

Tous les événements analytics et A/B tests sont loggés en développement:

```bash
📊 Analytics Event: { name: 'search_performed', ... }
🧪 A/B Test "hero_cta_variant" assigned variant: B
```

### Accès aux Données

```typescript
// Voir tous les événements analytics
console.log(analytics.getEvents());

// Voir tous les tests A/B actifs
console.log(abTesting.getActiveTests());
```

---

## 🔒 Sécurité

- ✅ Service Worker avec stratégies de cache sécurisées
- ✅ Error boundaries pour prévenir les crashes
- ✅ Analytics sans données personnelles sensibles
- ✅ A/B tests stockés en localStorage (côté client uniquement)

---

## 🚀 Performance

- ✅ Cache intelligent pour ressources statiques
- ✅ Network First pour données API
- ✅ Code splitting avec React.lazy
- ✅ Lazy loading des images
- ✅ PWA pour installation native

---

## 📈 Prochaines Étapes

### Analytics Avancés
- [ ] Intégrer Mixpanel ou Amplitude
- [ ] Tracking des funnel de conversion
- [ ] Heatmaps avec Hotjar
- [ ] Session replay

### A/B Testing
- [ ] Dashboard de gestion des tests
- [ ] Calcul automatique de signification statistique
- [ ] Intégration avec Google Optimize
- [ ] Tests multi-variantes (MVT)

### Error Monitoring
- [ ] Intégrer Sentry pour error tracking
- [ ] Alertes automatiques par email
- [ ] Source maps pour stack traces en production
- [ ] Performance monitoring
