import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { vehicleImageSrcSet } from '@/utils/vehicleImages';

// Liste légère : importer vehicleDetails ici l'ajouterait au code chargé par
// toutes les pages. Prix et places identiques à src/data/vehicleDetails.ts
// (contrôlé par scripts/test-home-models.mjs pendant le build).
export const HOME_MODELS = [
  { slug: 'dacia-sandero', name: 'Dacia Sandero', priceFrom: 250, seats: 5 },
  { slug: 'dacia-logan', name: 'Dacia Logan', priceFrom: 250, seats: 5 },
  { slug: 'renault-clio', name: 'Renault Clio', priceFrom: 400, seats: 5 },
  { slug: 'dacia-duster', name: 'Dacia Duster', priceFrom: 380, seats: 5 },
  { slug: 'dacia-jogger', name: 'Dacia Jogger', priceFrom: 380, seats: 7 },
  { slug: 'hyundai-tucson', name: 'Hyundai Tucson', priceFrom: 640, seats: 5 },
].map(m => ({ ...m, photo: `/vehicles/benatna/${m.slug}.webp` }));

const COPY = {
  fr: {
    title: 'Voitures et prix à Casablanca',
    intro: 'Des voitures de tourisme livrées gratuitement à l’aéroport Mohammed V et en gare. Prix de départ hors haute saison, trois jours minimum.',
    from: 'dès', perDay: '/jour', seats: 'places', all: 'Voir tout le catalogue',
    categories: [
      { to: '/location-voiture-pas-cher-casablanca', label: 'Pas chères dès 250 DH' },
      { to: '/location-suv-casablanca', label: 'SUV dès 380 DH' },
      { to: '/location-voiture-7-places-casablanca', label: '7 places et familiales' },
      { to: '/location-voiture-semaine-casablanca', label: 'Prix à la semaine' },
      { to: '/location-voiture-aeroport-casablanca', label: 'Aéroport Mohammed V' },
    ],
    catalogue: '/louer',
  },
  en: {
    title: 'Cars and prices in Casablanca',
    intro: 'Tourist cars delivered free of charge at Mohammed V Airport and train stations. Starting prices outside high season, three days minimum.',
    from: 'from', perDay: '/day', seats: 'seats', all: 'See the full catalogue',
    categories: [{ to: '/en/car-rental-casablanca-airport', label: 'Casablanca airport car rental' }],
    catalogue: '/en/louer',
  },
  es: {
    title: 'Coches y precios en Casablanca',
    intro: 'Coches de turismo entregados gratis en el aeropuerto Mohammed V y en las estaciones. Precios desde, fuera de temporada alta, mínimo tres días.',
    from: 'desde', perDay: '/día', seats: 'plazas', all: 'Ver todo el catálogo',
    categories: [{ to: '/es/alquiler-coche-aeropuerto-casablanca', label: 'Alquiler en el aeropuerto de Casablanca' }],
    catalogue: '/es/louer',
  },
};

export function HomeModelsSection() {
  const { language } = useLanguage();
  const copy = COPY[language as keyof typeof COPY] ?? COPY.fr;
  const currency = language === 'fr' ? 'DH' : 'MAD';
  return (
    <section aria-labelledby="home-models-title" className="py-12 sm:py-16 bg-background">
      <div className="container max-w-6xl px-4 space-y-6">
        <div className="text-center space-y-3">
          <h2 id="home-models-title" className="text-3xl sm:text-4xl font-bold">{copy.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{copy.intro}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {HOME_MODELS.map(v => (
            <Link key={v.slug} to={`/vehicule/${v.slug}`} className="group rounded-xl border bg-card overflow-hidden hover:border-primary hover:shadow-md transition">
              <img src={v.photo} srcSet={vehicleImageSrcSet(v.photo)} sizes="(max-width: 1023px) 50vw, 360px" alt={v.name} loading="lazy" decoding="async" width={480} height={320} className="w-full aspect-[3/2] object-cover" />
              <div className="p-3 sm:p-4 space-y-1">
                <h3 className="font-semibold text-sm sm:text-base">{v.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{v.seats} {copy.seats}</p>
                <p><span className="text-xs text-muted-foreground">{copy.from} </span><span className="text-lg sm:text-xl font-bold text-primary">{v.priceFrom} {currency}</span><span className="text-xs">{copy.perDay}</span></p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {copy.categories.map(c => <Link key={c.to} to={c.to} className="rounded-full border px-4 py-2 text-sm hover:border-primary hover:text-primary">{c.label}</Link>)}
        </div>
        <div className="text-center">
          <Link to={copy.catalogue} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-semibold">{copy.all}<ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
