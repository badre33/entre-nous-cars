# Benatna.ma — Contexte projet pour Claude Code

## Stack
- **Vite + React 18 + TypeScript** (SPA)
- **Tailwind CSS + shadcn/ui**
- **Hébergement** : Vercel (auto-deploy sur push main)
- **Repo** : github.com/badre33/entre-nous-cars (privé)
- **Domaine** : benatna.ma
- **Backend** : Supabase (auth + DB)
- **PWA** activée (service worker)

## Identité
- **Owner** : Badre Harkaoui (badreharkaoui@gmail.com, WhatsApp +212 699 024 526)
- **Société** : CONNECTICITY MOROCCO SARL (RC Casa 444813, siège Maarif)
- **Positionnement** : marketplace location voiture Maroc, ciblant **MRE (30%) + touristes EU francophones (40%) + Marocains (30%)**
- **Concurrents** : Hertz, Avis, Europcar, Sixt (franchises internationales — c'est le vrai bench, pas les loueurs low-cost locaux)
- **USP** : sans CB internationale, paiement DH/€/virement SEPA/Cash Plus, WhatsApp 2 min, prix tout inclus
- **Slogan** : "Le prix annoncé est le prix payé"

## Structure clé du code

### Pages principales
- `src/pages/Index.tsx` — homepage avec hero + slogan anti-franchise
- `src/pages/Louer.tsx` — catalogue véhicules (~111 fiches, ~40 modèles uniques)
- `src/pages/VehicleDetail.tsx` — fiche véhicule avec carousel + tabs (Présentation/Équipements/Conditions)
- Pages SEO long-tail : `src/data/additionalLongTailPages.ts` + wrappers dans `src/pages/`

### Composants critiques
- `src/components/SwipeableCarCard.tsx` — **LE composant utilisé pour les cards /louer** (pas CarCard.tsx qui existe mais n'est plus utilisé)
- `src/components/CarCard.tsx` — legacy, à supprimer un jour
- `src/components/Header.tsx` — menu burger mobile (a un bug réparé sur le scroll)

### Données
- `src/data/topVehiclesData.ts` — petite liste vedettes homepage (~10 modèles)
- `src/pages/Louer.tsx` — gros catalogue inline (~111 fiches)
- `src/data/vehicleDetails.ts` — fiches détaillées pour `/vehicule/:slug` (~40 modèles avec photos + options complètes)

## Catalogue actuel (juin 2026)

### Modèles présents (~40 uniques)
- **Économique** (300-380 DH) : Dacia Sandero/Logan/Stepway, Renault Clio, Hyundai Accent/i20, Opel Corsa, Peugeot 208, Seat Ibiza
- **Mid** (400-650 DH) : Dacia Duster/Jogger, VW Golf, VW T-Roc, Hyundai Bayon/Tucson, Kia Sportage, Cupra Formentor
- **Premium** (700-1050 DH) : Mercedes (Classe A/C/E, CLA, GLA-GLE), Audi (A3/A4/A6, Q3/Q5), BMW Série 5, VW Touareg, Hyundai Santa Fe
- **Luxe** (1100-2200 DH) : BMW X5, Audi (Q7/Q8), Range Rover Evoque, Porsche Macan, Hyundai Staria (van 9 places)
- **Ultra-Luxe** (1850-3600 DH) : Range Rover Sport, Porsche Cayenne, Mercedes Classe G

### Modèles retirés (selon décisions user)
Jaguar, Maserati, Lexus, Volvo, Honda, Chevrolet, Suzuki, Ford, Fiat, SEAT (sauf Ibiza), Kia (sauf Sportage), Toyota, Peugeot (sauf 208), Opel (sauf Corsa), Mitsubishi, Skoda, Tesla, Audi A7/A1, BMW Série 1/3/X1/X2/X3, cabriolets, électriques, Nissan (X-Trail/Juke/Qashqai/Micra/Note/Sunny), Renault Mégane/Austral/Arkana, Citroën, Range Rover Velar, Porsche 911/Panamera, Mercedes Classe E Cabriolet

## SEO

### Sitemap : 94 URLs
- Pages villes, aéroports, quartiers
- 17 pages stratégiques Sprint $38k (Auto Casa/Marrakech, Caution, Top agences, FAQ complète, etc.)
- Page comparative `/benatna-vs-avis-hertz-europcar-sixt`
- Pages GEO LLM-optimisées

### Analytics
- GA4 actif (ID via gtag dans index.html)
- Vercel Analytics + Speed Insights
- Supabase tracker custom forwardé vers GA4

### Verrification
- Google Search Console : ✅ (meta `google-site-verification`)
- Bing Webmaster : ✅ (meta `msvalidate.01`)

## Conventions

### Photos véhicules
- Stockées dans `src/assets/car-*.jpg`
- Le user a un dossier `/Documents/Claude/Projects/Benatna/Photo véhicule/` avec ses vraies photos de flotte
- Format attendu : portrait smartphone (~1080x1920)
- Pour ajouter une photo : copier dans `src/assets/car-{model-slug}.jpg`, l'import est automatique via les fichiers TS

### Object-position par modèle
Le fichier `src/components/CarCard.tsx` (et SwipeableCarCard.tsx si propagé) a un helper `getObjectPosition(name)` qui ajuste le crop CSS par modèle (Cupra/Tucson/Mercedes ont des positions spécifiques).

### Commits
- Convention : `type(scope): description`
- Types : `feat`, `fix`, `chore`, `feat(seo)`, `fix(catalog)`, etc.
- Auto-deploy Vercel sur push `main`

## Tâches en cours / à faire

### Pending importantes
1. **Photos manquantes (Cursor user)** : Dacia Sandero, Dacia Logan, Opel Corsa, Renault Clio nouvelle photo. Les photos actuelles sont des stocks IA. Le user a refusé qu'on lui demande de redéposer. Solution : prendre photos depuis Wikimedia Commons ou Unsplash et les copier dans `src/assets/`.
2. **H1 multiple sur /louer** (bug #83) : il y a `<h3>` 618 et `<h2>` 1 — hiérarchie sémantique cassée
3. **Images home sans width/height** (bug #85) : CLS metric à fixer
4. **Content thin** (bug #86) : `/blog` 1190 chars et `/contact` 1388 chars trop courts
5. **Routing multilingue** (#67) : à planifier (FR/EN/ES éventuellement)
6. **Audit RLS Supabase** (#32) : en cours, à finaliser

### Actions humaines à faire par user (templates fournis)
- Fichier `GEO-actions-humaines.md` : TripAdvisor profile, Reddit thread, Routard reply
- Fichier `Local-SEO-Google-Business-Profile.md` : GBP setup + 20 citations NAP + 12 posts pré-rédigés
- **Révoquer PAT GitHub** : `(le PAT que tu as donné en session)` (encore valide, à supprimer sur github.com/settings/tokens)

## Workflow recommandé Claude Code

1. Clone le repo : `git clone https://github.com/badre33/entre-nous-cars.git`
2. `npm install`
3. `npm run dev` pour dev local
4. `npm run build` avant chaque commit (vérifier build OK)
5. Push sur `main` → Vercel auto-deploy (~2-3 min)

## Notes critiques

- **iOS Safari cache agressif** : à chaque déploiement, le user doit "Effacer historique et données de site" pour voir les changements
- **SwipeableCarCard.tsx** est le bon composant à modifier (pas CarCard.tsx)
- **L'heure du user** : timezone Africa/Casablanca. Vérifier avant toute formule "bonne X" — la mémoire user dit de ne JAMAIS mettre une formule liée à l'heure sans avoir vérifié.
