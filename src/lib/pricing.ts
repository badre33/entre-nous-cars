/**
 * Benatna — Moteur de pricing dynamique
 *
 * Formule :
 *   Prix_final = Prix_base × K_saison × MAX(1.0, K_event) × K_ville × K_weekend × K_durée
 *
 * Bornes : Prix_base × 0.55 ≤ Prix_final ≤ Prix_base × 1.80
 *
 * Le prix_base est le prix de référence hors saison (mai/octobre) tel que
 * stocké dans le catalogue véhicules (src/pages/Louer.tsx).
 */

export interface PricingContext {
  date?: Date;              // date de départ, par défaut = today
  duration?: number;        // en jours, par défaut = 1
  city?: string;
  endDate?: Date;           // si fourni, duration est recalculé
}

export interface PricingResult {
  dailyPrice: number;       // prix journalier arrondi (DH)
  totalPrice: number;       // prix total pour la durée (DH)
  basePrice: number;        // prix pivot du catalogue
  savings: number;          // économies vs (basePrice × duration)
  discountPct: number;      // % de réduction final vs base × duration
  monthCoef: number;
  eventCoef: number;
  eventName: string | null;
  durationCoef: number;
  cityCoef: number;
  weekendCoef: number;
  badge: string | null;     // ex: "🌞 Prix été"
  breakdown: string[];      // lignes explicatives ex: ["Été (juillet) +25%", "-15% dès 7 jours"]
}

// =====================================================================
// K_SAISON — coefficient mensuel
// =====================================================================
// Index 0 = janvier, 11 = décembre
const MONTHLY_COEF: number[] = [
  0.85, // Janvier — basse, MRE rentrent
  0.80, // Février — basse + Ramadan possible
  0.90, // Mars — Ramadan possible / Aïd
  1.00, // Avril — post-Aïd
  1.00, // Mai — baseline (Aïd al-Adha capté par K_event)
  1.10, // Juin — début haute saison
  1.25, // Juillet — pic MRE + Fête du Trône
  1.30, // Août — pic absolu + triple pont
  1.10, // Septembre — rentrée MRE + Mawlid
  1.00, // Octobre — baseline
  0.95, // Novembre — fêtes nationales
  1.20, // Décembre — MRE hiver + fêtes
];

const MONTH_LABELS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
];

// =====================================================================
// K_EVENT — table des événements marocains (religieux + national)
// Dates 2026-2028 pour couvrir 3 saisons. À maintenir chaque année.
//
// Chaque événement a 2 fenêtres imbriquées :
//   - rampStart → start   : ramp-up (les gens commencent à réserver)
//                           applique `rampCoef` (plus doux)
//   - start → end          : plein tarif événement, applique `coef`
//
// Les MRE réservent 1-2 semaines avant, les Marocains 3-7 jours avant.
// Le ramp-up capte cette demande anticipée.
// =====================================================================
interface EventRange {
  rampStart: string;  // début du ramp-up (peut être = start si pas de ramp)
  start: string;      // début du plein tarif
  end: string;        // fin du plein tarif
}

interface MoroccanEvent {
  name: string;
  coef: number;       // coef pendant l'événement (plein tarif)
  rampCoef: number;   // coef pendant le ramp-up (avant l'événement)
  badge: string;
  ranges: EventRange[];
}

const EVENTS: MoroccanEvent[] = [
  {
    name: 'Ramadan',
    coef: 1.15,
    rampCoef: 1.15,      // pas de ramp distinct (mois complet)
    badge: '🌙 Prix Ramadan',
    // Ramadan complet HORS des 5 derniers jours (captés par Aïd al-Fitr)
    ranges: [
      { rampStart: '2026-02-17', start: '2026-02-17', end: '2026-03-14' },
      { rampStart: '2027-02-06', start: '2027-02-06', end: '2027-03-03' },
      { rampStart: '2028-01-27', start: '2028-01-27', end: '2028-02-21' },
    ],
  },
  {
    name: 'Aïd al-Fitr (fin Ramadan)',
    coef: 1.35,          // pic pendant les 5 derniers jours Ramadan + Aïd
    rampCoef: 1.20,      // ramp-up 7 jours avant : les MRE réservent
    badge: '🕌 Prix Aïd al-Fitr',
    ranges: [
      { rampStart: '2026-03-08', start: '2026-03-15', end: '2026-03-23' },
      { rampStart: '2027-02-25', start: '2027-03-04', end: '2027-03-12' },
      { rampStart: '2028-02-15', start: '2028-02-22', end: '2028-03-02' },
    ],
  },
  {
    name: 'Aïd al-Adha',
    coef: 1.40,          // pic max annuel (Fête du mouton)
    rampCoef: 1.25,      // ramp-up 10 jours avant : achat mouton + retour bled
    badge: '🕌 Prix Aïd al-Adha',
    ranges: [
      { rampStart: '2026-05-14', start: '2026-05-24', end: '2026-05-30' },
      { rampStart: '2027-05-03', start: '2027-05-13', end: '2027-05-19' },
      { rampStart: '2028-04-21', start: '2028-05-01', end: '2028-05-07' },
    ],
  },
  {
    name: 'Fête du Trône',
    coef: 1.15,
    rampCoef: 1.10,      // ramp-up 7 jours avant : long weekend 30 juillet
    badge: '👑 Fête du Trône',
    ranges: [
      { rampStart: '2026-07-21', start: '2026-07-28', end: '2026-07-31' },
      { rampStart: '2027-07-21', start: '2027-07-28', end: '2027-07-31' },
      { rampStart: '2028-07-21', start: '2028-07-28', end: '2028-07-31' },
    ],
  },
  {
    name: 'Triple pont août (Récup. Oued Ed-Dahab · Révolution · Jeunesse)',
    coef: 1.20,
    rampCoef: 1.10,      // ramp-up 5 jours : apogée MRE + touristes
    badge: '🎊 Ponts d\'août',
    ranges: [
      { rampStart: '2026-08-08', start: '2026-08-13', end: '2026-08-22' },
      { rampStart: '2027-08-08', start: '2027-08-13', end: '2027-08-22' },
      { rampStart: '2028-08-08', start: '2028-08-13', end: '2028-08-22' },
    ],
  },
  {
    name: 'Mawlid An-Nabawi',
    coef: 1.05,
    rampCoef: 1.03,      // ramp-up 3 jours (impact modéré)
    badge: '🕌 Mawlid',
    ranges: [
      { rampStart: '2026-09-19', start: '2026-09-22', end: '2026-09-26' },
      { rampStart: '2027-09-08', start: '2027-09-11', end: '2027-09-15' },
      { rampStart: '2028-08-28', start: '2028-08-31', end: '2028-09-04' },
    ],
  },
  {
    name: 'Marche Verte / Fête de l\'Indépendance',
    coef: 1.05,
    rampCoef: 1.05,      // fenêtre déjà large (5-20 nov), pas de ramp distinct
    badge: '🇲🇦 Fêtes nationales',
    ranges: [
      { rampStart: '2026-11-05', start: '2026-11-05', end: '2026-11-20' },
      { rampStart: '2027-11-05', start: '2027-11-05', end: '2027-11-20' },
      { rampStart: '2028-11-05', start: '2028-11-05', end: '2028-11-20' },
    ],
  },
  {
    name: 'Fêtes de fin d\'année',
    coef: 1.20,
    rampCoef: 1.10,      // ramp-up 7 jours : MRE hiver arrivent
    badge: '🎄 Fêtes de fin d\'année',
    ranges: [
      { rampStart: '2026-12-15', start: '2026-12-22', end: '2027-01-05' },
      { rampStart: '2027-12-15', start: '2027-12-22', end: '2028-01-05' },
    ],
  },
  {
    name: 'Yennayer (Nouvel An amazigh)',
    coef: 1.05,
    rampCoef: 1.03,      // ramp-up 2 jours (impact modéré)
    badge: '🎊 Yennayer',
    ranges: [
      { rampStart: '2026-01-10', start: '2026-01-12', end: '2026-01-14' },
      { rampStart: '2027-01-10', start: '2027-01-12', end: '2027-01-14' },
      { rampStart: '2028-01-10', start: '2028-01-12', end: '2028-01-14' },
    ],
  },
];

// =====================================================================
// K_DURÉE — rabais dégressif longue durée
// Politique Benatna : rabais MAX -5% quelle que soit la durée (au-delà
// on grignote la marge). Fine gradation pour montrer un geste sans
// casser le pricing.
// =====================================================================
function computeDurationCoef(days: number): { coef: number; label: string | null } {
  if (days >= 90) return { coef: 0.95, label: '-5% dès 90 jours' };
  if (days >= 60) return { coef: 0.95, label: '-5% dès 60 jours' };
  if (days >= 30) return { coef: 0.95, label: '-5% dès 30 jours' };
  if (days >= 14) return { coef: 0.98, label: '-2% dès 14 jours' };
  return { coef: 1.00, label: null };
}

// =====================================================================
// K_VILLE — DÉSACTIVÉ : politique Benatna = prix unique par véhicule,
// aucune différenciation par ville
// =====================================================================
function computeCityCoef(_city?: string): number {
  return 1.00;
}

// =====================================================================
// K_WEEKEND — +5% si vendredi-dimanche compris ET durée ≤ 3 jours
// =====================================================================
function computeWeekendCoef(date: Date, days: number): number {
  if (days > 3) return 1.00;
  const dow = date.getDay(); // 0=dim, 5=ven, 6=sam
  if (dow === 5 || dow === 6 || dow === 0) return 1.05;
  return 1.00;
}

// =====================================================================
// Helpers événements
// =====================================================================
type EventPhase = 'ramp' | 'peak';

/** État de match d'une date sur un range : 'ramp' avant l'event, 'peak' pendant, null hors */
function matchRange(date: Date, range: EventRange): EventPhase | null {
  const rampStart = new Date(range.rampStart + 'T00:00:00Z').getTime();
  const start = new Date(range.start + 'T00:00:00Z').getTime();
  const end = new Date(range.end + 'T23:59:59Z').getTime();
  const t = date.getTime();
  if (t >= start && t <= end) return 'peak';
  if (t >= rampStart && t < start) return 'ramp';
  return null;
}

/** Coef appliqué par un événement à une date donnée (0 si pas dans sa fenêtre) */
function eventCoefAt(event: MoroccanEvent, date: Date): number {
  for (const r of event.ranges) {
    const phase = matchRange(date, r);
    if (phase === 'peak') return event.coef;
    if (phase === 'ramp') return event.rampCoef;
  }
  return 0;
}

function findActiveEvent(date: Date): { event: MoroccanEvent; coef: number; phase: EventPhase } | null {
  // Pour chaque événement, calcule son coef à la date. Retourne celui avec le coef le plus élevé.
  let best: { event: MoroccanEvent; coef: number; phase: EventPhase } | null = null;
  for (const event of EVENTS) {
    for (const r of event.ranges) {
      const phase = matchRange(date, r);
      if (phase === null) continue;
      const coef = phase === 'peak' ? event.coef : event.rampCoef;
      if (!best || coef > best.coef) {
        best = { event, coef, phase };
      }
      break; // un seul range par event peut matcher
    }
  }
  return best;
}

// =====================================================================
// FONCTION PRINCIPALE
// =====================================================================
export function computePrice(basePrice: number, ctx: PricingContext = {}): PricingResult {
  const startDate = ctx.date ?? new Date();
  let duration = ctx.duration ?? 1;
  if (ctx.endDate && ctx.date) {
    const diffMs = ctx.endDate.getTime() - ctx.date.getTime();
    duration = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));
  }

  const monthCoef = MONTHLY_COEF[startDate.getMonth()];
  const activeMatch = findActiveEvent(startDate);
  const eventCoefRaw = activeMatch?.coef ?? 1.00;
  const eventCoef = Math.max(1.0, eventCoefRaw); // ne baisse jamais via event
  const { coef: durationCoef, label: durationLabel } = computeDurationCoef(duration);
  const cityCoef = computeCityCoef(ctx.city);
  const weekendCoef = computeWeekendCoef(startDate, duration);

  // Calcul brut
  let dailyRaw = basePrice * monthCoef * eventCoef * cityCoef * weekendCoef * durationCoef;

  // Bornes de sécurité
  const floor = basePrice * 0.55;
  const ceiling = basePrice * 1.80;
  const daily = Math.min(ceiling, Math.max(floor, dailyRaw));

  // Arrondi commercial : au 10 DH le plus proche
  const dailyPrice = Math.round(daily / 10) * 10;
  const totalPrice = dailyPrice * duration;
  const savings = Math.max(0, basePrice * duration - totalPrice);
  const discountPct = basePrice > 0 ? Math.round(((basePrice - dailyPrice) / basePrice) * -100) : 0;

  // Breakdown lisible
  const breakdown: string[] = [];
  const monthLabel = MONTH_LABELS[startDate.getMonth()];
  const monthPct = Math.round((monthCoef - 1) * 100);
  if (monthPct !== 0) {
    breakdown.push(`Saison ${monthLabel} ${monthPct > 0 ? '+' : ''}${monthPct}%`);
  }
  if (activeMatch && eventCoef > 1.0) {
    const suffix = activeMatch.phase === 'ramp' ? ' (avant fête)' : '';
    breakdown.push(`${activeMatch.event.name}${suffix} +${Math.round((eventCoef - 1) * 100)}%`);
  }
  if (weekendCoef > 1.0) {
    breakdown.push('Weekend +5%');
  }
  if (cityCoef !== 1.0) {
    breakdown.push(`Ville ${ctx.city} ${cityCoef > 1 ? '+' : ''}${Math.round((cityCoef - 1) * 100)}%`);
  }
  if (durationLabel) {
    breakdown.push(durationLabel);
  }

  // Badge : préfixe "Bientôt" si ramp-up (donne l'urgence)
  const badge = activeMatch
    ? (activeMatch.phase === 'ramp' ? `⏰ Bientôt ${activeMatch.event.badge}` : activeMatch.event.badge)
    : getSeasonBadge(startDate.getMonth());

  return {
    dailyPrice,
    totalPrice,
    basePrice,
    savings: Math.round(savings),
    discountPct,
    monthCoef,
    eventCoef,
    eventName: activeMatch ? (activeMatch.phase === 'ramp' ? `${activeMatch.event.name} (avant fête)` : activeMatch.event.name) : null,
    durationCoef,
    cityCoef,
    weekendCoef,
    badge,
    breakdown,
  };
}

// =====================================================================
// Badge de saison si aucun événement actif
// =====================================================================
function getSeasonBadge(month: number): string | null {
  // month = 0-based
  if (month === 6 || month === 7) return '🌞 Prix été';
  if (month === 11 || month === 0) return '❄️ Prix hiver';
  return null;
}

// =====================================================================
// Helpers d'usage rapide dans les composants UI
// =====================================================================

/** Prix journalier "aujourd'hui" pour la vitrine catalogue */
export function currentDailyPrice(basePrice: number, city?: string): number {
  return computePrice(basePrice, { date: new Date(), duration: 1, city }).dailyPrice;
}

/** Contexte badge courant (pour cards catalogue) */
export function currentContextBadge(): string | null {
  return computePrice(1000, { date: new Date(), duration: 1 }).badge;
}

/** Détecte si on est actuellement en événement spécial (pour bandeau info) */
export function currentActiveEventName(): string | null {
  return computePrice(1000, { date: new Date(), duration: 1 }).eventName;
}
