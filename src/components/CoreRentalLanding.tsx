import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { RentalModelLinks } from './RentalModelLinks';
import { pickupPoints } from '@/data/pickupPoints';
import { vehicleDetails } from '@/data/vehicleDetails';
import { vehicleImageSrcSet } from '@/utils/vehicleImages';

const CASABLANCA_AREAS = [
  { to: '/location-voiture-ain-diab-casablanca', label: 'Ain Diab et la corniche' },
  { to: '/location-voiture-maarif-casablanca', label: 'Maarif' },
  { to: '/location-voiture-anfa-casablanca', label: 'Anfa' },
  { to: '/location-voiture-hassan-casablanca', label: 'Centre-ville' },
  { to: '/location-voiture-sidi-maarouf-casablanca', label: 'Sidi Maarouf, route de l’aéroport' },
];

export interface CoreRentalContent {
  path: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  pickupId?: string;
  showModelComparison?: boolean;
  transmission?: 'Automatique';
  pickupIds?: readonly string[];
  faqs?: { question: string; answer: string }[];
  relatedLinks?: { to: string; label: string; text: string }[];
  sections: { title: string; text: string }[];
  priceRows?: { category: string; models: string; from: number }[];
  audience?: { title: string; text: string }[];
  exclusions?: string;
  models?: string[];
  weekly?: boolean;
  alternates?: { fr: string; en: string; es: string };
}

export function CoreRentalLanding({ content }: { content: CoreRentalContent }) {
  const faqs = content.faqs ?? [
    { question: 'Quelle durée puis-je demander ?', answer: 'La location dure au minimum trois jours. Choisissez vos dates pour demander un tarif au loueur.' },
    { question: 'La livraison est-elle gratuite ?', answer: 'Oui, aux gares et aéroports desservis de Casablanca et, sur demande, de Rabat. Le point de rendez-vous et les modalités sont convenus à l’avance avec le loueur.' },
    { question: 'Comment ma réservation est-elle confirmée ?', answer: 'Envoyez votre réservation sur WhatsApp avec vos dates, la voiture et le lieu de prise en charge. Benatna vous répond sous 1 heure avec la confirmation, le prix total et les coordonnées du virement. Votre réservation est garantie dès réception de l’acompte de 30 % par virement.' },
  ];
  const catalogueParams = new URLSearchParams({ city: 'Casablanca' });
  if (content.pickupId) catalogueParams.set('pickup', content.pickupId);
  if (content.transmission) catalogueParams.set('transmission', content.transmission);
  const catalogueHref = `/louer?${catalogueParams.toString()}`;
  return <>
    <Helmet>
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={`https://benatna.ma${content.path}`} />
      {content.alternates && <link rel="alternate" hrefLang="fr" href={`https://benatna.ma${content.alternates.fr}`} />}
      {content.alternates && <link rel="alternate" hrefLang="en" href={`https://benatna.ma${content.alternates.en}`} />}
      {content.alternates && <link rel="alternate" hrefLang="es" href={`https://benatna.ma${content.alternates.es}`} />}
      {content.alternates && <link rel="alternate" hrefLang="x-default" href={`https://benatna.ma${content.alternates.fr}`} />}
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:url" content={`https://benatna.ma${content.path}`} />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) })}</script>
    </Helmet>
    <Header />
    <main className="container max-w-5xl px-4 sm:px-6 py-8 md:py-16 space-y-8 md:space-y-10">
      <nav aria-label="Fil d’Ariane"><Link to="/">Benatna</Link> / Casablanca</nav>
      {content.alternates && <p className="text-sm">Also in <Link lang="en" hrefLang="en" className="underline" to={content.alternates.en}>English</Link> · También en <Link lang="es" hrefLang="es" className="underline" to={content.alternates.es}>español</Link></p>}
      <section className="space-y-5">
        <h1 className="text-3xl md:text-5xl font-semibold">{content.heading}</h1>
        <p className="text-lg">{content.intro}</p>
        <p><strong>Trois jours minimum.</strong> Voitures de tourisme pour MRE, touristes et vacanciers ; résidents au Maroc aux mêmes conditions.</p>
        <Link className="inline-flex min-h-12 max-w-full items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-3 text-center font-semibold" to={catalogueHref}>Voir les modèles et prix journaliers indicatifs</Link>
      </section>
      {content.priceRows && <section aria-label="Prix de départ" className="space-y-4">
        <h2 className="text-2xl font-semibold">Prix de départ par catégorie</h2>
        <div className="grid gap-3 sm:grid-cols-2">{content.priceRows.map(row => <Link key={row.category} to={catalogueHref} className="rounded-lg border p-4 flex items-center justify-between gap-4 hover:border-primary"><span><span className="block font-semibold">{row.category}</span><span className="block text-sm text-muted-foreground">{row.models}</span></span><span className="text-right whitespace-nowrap"><span className="block text-xs text-muted-foreground">dès</span><span className="text-xl font-bold text-primary">{row.from} DH</span><span className="text-sm">/jour</span></span></Link>)}</div>
        <p className="text-sm text-muted-foreground">Prix journaliers de départ hors juillet-août et périodes de fêtes, location de trois jours minimum. Le loueur confirme le prix total pour vos dates.</p>
      </section>}
      {content.models && <section aria-label="Modèles et prix" className="space-y-4">
        <h2 className="text-2xl font-semibold">{content.weekly ? 'Prix pour 7 jours par modèle' : 'Modèles et prix de départ'}</h2>
        <div className="grid gap-4 sm:grid-cols-2">{content.models.map(slug => vehicleDetails[slug]).filter(Boolean).map(v => <Link key={v.slug} to={`/vehicule/${v.slug}`} className="rounded-lg border overflow-hidden flex gap-4 items-center p-3 hover:border-primary">
          <img src={v.photos[0]} srcSet={vehicleImageSrcSet(v.photos[0])} sizes="112px" alt={`${v.name} en location à Casablanca`} loading="lazy" decoding="async" width={120} height={80} className="w-28 h-20 object-cover rounded-md shrink-0" />
          <span className="min-w-0 flex-1"><span className="block font-semibold">{v.name}</span><span className="block text-sm text-muted-foreground">{v.category} · {v.options.seats} places · {v.options.transmission}</span></span>
          <span className="text-right whitespace-nowrap"><span className="block text-xs text-muted-foreground">dès</span><span className="text-lg font-bold text-primary">{(content.weekly ? v.priceFrom * 7 : v.priceFrom).toLocaleString('fr-FR')} DH</span><span className="block text-xs">{content.weekly ? 'les 7 jours' : '/jour'}</span></span>
        </Link>)}</div>
        <p className="text-sm text-muted-foreground">Prix de départ hors juillet-août et périodes de fêtes{content.weekly ? '' : ', location de trois jours minimum'}. Le loueur confirme le modèle et le prix total pour vos dates.</p>
      </section>}
      {content.audience && <section aria-label="Pour qui" className="space-y-4">
        <h2 className="text-2xl font-semibold">Pour qui ?</h2>
        <div className="grid gap-4 md:grid-cols-3">{content.audience.map(item => <div key={item.title} className="rounded-lg border p-4 space-y-2"><h3 className="font-semibold">{item.title}</h3><p>{item.text}</p></div>)}</div>
        {content.exclusions && <p className="text-sm">{content.exclusions}</p>}
      </section>}
      {content.pickupIds && <section aria-label="Choisir votre gare à Casablanca" className="space-y-4">
        <h2 className="text-2xl font-semibold">Choisir votre gare à Casablanca</h2>
        <p>Retrouvez le lieu dans le catalogue, puis renseignez vos dates et vos modèles. La livraison est gratuite et le rendez-vous est convenu avec le loueur avant votre arrivée.</p>
        <div className="grid gap-3 sm:grid-cols-2">{pickupPoints.filter(point => content.pickupIds?.includes(point.id)).map(point => <Link key={point.id} className="rounded-lg border p-4 min-h-12 font-semibold text-primary underline underline-offset-4" to={`/louer?city=Casablanca&pickup=${point.id}`}>{point.name}</Link>)}</div>
      </section>}
      {content.showModelComparison && <RentalModelLinks />}
      {content.sections.map(section => <section key={section.title} className="space-y-3"><h2 className="text-2xl font-semibold">{section.title}</h2><p>{section.text}</p></section>)}
      {content.relatedLinks && <section aria-label="Organiser votre location à Casablanca" className="space-y-4">
        <h2 className="text-2xl font-semibold">Organiser votre location à Casablanca</h2>
        <div className="grid gap-4 sm:grid-cols-2">{content.relatedLinks.filter(link => link.to !== content.path).map(link => <div key={link.to} className="rounded-lg border p-4 space-y-2"><Link className="inline-flex min-h-11 items-center text-primary font-semibold underline underline-offset-4" to={link.to}>{link.label}</Link><p>{link.text}</p></div>)}</div>
      </section>}
      {content.path === '/location-voiture-casablanca' && <section aria-label="Livraison par quartier" className="space-y-4">
        <h2 className="text-2xl font-semibold">Livraison par quartier à Casablanca</h2>
        <p>La voiture peut vous être remise à votre hôtel ou résidence, gratuitement, à un lieu convenu à l’avance avec le loueur.</p>
        <div className="flex flex-wrap gap-3">{CASABLANCA_AREAS.map(area => <Link key={area.to} to={area.to} className="rounded-full border px-4 py-2 hover:border-primary hover:text-primary">{area.label}</Link>)}</div>
      </section>}
      <section className="space-y-4"><h2 className="text-2xl font-semibold">Questions fréquentes</h2>{faqs.map(faq => <div key={faq.question}><h3 className="font-semibold">{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
      <section className="space-y-3"><h2 className="text-2xl font-semibold">Réserver en 3 étapes</h2><p>1. Choisissez la voiture, vos dates et votre point d’arrivée, puis envoyez votre réservation sur WhatsApp. 2. Benatna vous confirme la voiture sous 1 heure, avec le prix total, les documents requis et la caution. 3. Vous versez un acompte de 30 % par virement : votre réservation est garantie.</p><p>Nos loueurs sont basés à Casablanca. Rabat est une possibilité sur demande depuis Casablanca, selon leur disponibilité. Aucune prise en charge dans une autre ville n’est proposée actuellement.</p><div className="flex flex-wrap gap-5"><Link to="/location-voiture-casablanca">Location à Casablanca</Link><Link to="/prise-en-charge-casablanca-rabat">Guide des gares et aéroports desservis</Link><Link to="/location-voiture-aeroport-casablanca">Arriver à Mohammed V</Link><Link to="/location-voiture-rabat">Demander une livraison à Rabat</Link><Link to="/prix-location-voiture-maroc-2026">Comprendre le prix de votre location</Link><Link to="/caution-location-voiture-maroc">Préparer les questions sur la caution</Link><Link to="/faq">Toutes les questions</Link></div></section>
    </main>
    <Footer />
  </>;
}
