import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

// Keep existing URLs, but do not advertise a rental service outside the operating area.
export function ServiceAreaGuard({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const rentalPage = /^\/location[-/]/.test(pathname);
  const rabat = rentalPage && /rabat/i.test(pathname);
  const unavailable = rentalPage && /marrakech|tanger|agadir|f[eè]s|merzouga|desert|atlas|sud-maroc|coupe-monde|can-2025/i.test(pathname);
  if (!rabat && !unavailable) return children;
  return <>
    <Helmet>
      <title>{rabat ? 'Livraison à Rabat sur demande | Benatna Casablanca' : 'Zone de location actuelle | Benatna Casablanca'}</title>
      <meta name="robots" content={pathname === '/location-voiture-rabat' ? 'index,follow' : 'noindex,follow'} />
      <meta name="description" content="Loueurs basés à Casablanca. Prise en charge à Casablanca et à l’aéroport Mohammed V. Livraison à Rabat sur demande, faisabilité et frais à confirmer." />
    </Helmet>
    <Header />
    <main className="container py-20 space-y-6">
      <h1 className="text-3xl font-semibold">{rabat ? 'Rabat : livraison sur demande depuis Casablanca' : 'Notre service se concentre sur Casablanca'}</h1>
      <p>Nos loueurs sont basés à Casablanca. La prise en charge s’organise en ville ou à l’aéroport Mohammed V.</p>
      <p>{rabat ? 'Une livraison à Rabat peut être étudiée par le loueur. Elle dépend des dates, du véhicule et de son organisation. La disponibilité et les frais doivent être confirmés avant toute réservation.' : 'Nous ne proposons actuellement pas de prise en charge dans cette ville. Rabat reste une possibilité sur demande, à confirmer avec le loueur.'}</p>
      <Link className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3" to={rabat ? '/louer?city=Rabat' : '/louer?city=Casablanca'}>{rabat ? 'Demander une livraison à Rabat' : 'Voir le catalogue à Casablanca'}</Link>
    </main>
    <Footer />
  </>;
}
