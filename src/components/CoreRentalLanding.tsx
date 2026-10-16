import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export interface CoreRentalContent {
  path: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  sections: { title: string; text: string }[];
}

export function CoreRentalLanding({ content }: { content: CoreRentalContent }) {
  const faqs = [
    { question: 'Quelle durée puis-je demander ?', answer: 'La location dure au minimum trois jours et au maximum six mois calendaires. Choisissez vos dates pour demander un tarif au loueur.' },
    { question: 'La livraison est-elle gratuite ?', answer: 'Oui, aux gares et aéroports desservis de Casablanca et, sur demande, de Rabat. Le point de rendez-vous et les modalités sont convenus à l’avance avec le loueur.' },
    { question: 'La demande confirme-t-elle la réservation ?', answer: 'Non. Une demande WhatsApp permet au loueur de vérifier les dates et le modèle, puis de préciser le tarif final et ses conditions. La réservation demande sa confirmation et votre accord. Aucun paiement en ligne n’est proposé sur Benatna.' },
  ];
  return <>
    <Helmet>
      <title>{content.title}</title>
      <meta name="description" content={content.description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={`https://benatna.ma${content.path}`} />
      <meta property="og:title" content={content.title} />
      <meta property="og:description" content={content.description} />
      <meta property="og:url" content={`https://benatna.ma${content.path}`} />
      <meta name="twitter:title" content={content.title} />
      <meta name="twitter:description" content={content.description} />
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) })}</script>
    </Helmet>
    <Header />
    <main className="container max-w-5xl py-16 space-y-10">
      <nav aria-label="Fil d’Ariane"><Link to="/">Benatna</Link> / Casablanca</nav>
      <section className="space-y-5">
        <h1 className="text-3xl md:text-5xl font-semibold">{content.heading}</h1>
        <p className="text-lg">{content.intro}</p>
        <p><strong>Trois jours minimum, six mois maximum.</strong> Voitures touristiques classiques pour MRE, touristes et vacanciers ; demandes locales aux mêmes conditions.</p>
        <Link className="inline-block rounded-lg bg-primary text-primary-foreground px-6 py-3" to="/louer?city=Casablanca">Voir les modèles et prix journaliers indicatifs</Link>
      </section>
      {content.sections.map(section => <section key={section.title} className="space-y-3"><h2 className="text-2xl font-semibold">{section.title}</h2><p>{section.text}</p></section>)}
      <section className="space-y-4"><h2 className="text-2xl font-semibold">Questions fréquentes</h2>{faqs.map(faq => <div key={faq.question}><h3 className="font-semibold">{faq.question}</h3><p>{faq.answer}</p></div>)}</section>
      <section className="space-y-3"><h2 className="text-2xl font-semibold">Préparer votre demande</h2><p>Indiquez vos dates, le modèle souhaité, votre nombre de passagers et votre point d’arrivée. Le catalogue est indicatif : le loueur confirme le véhicule, ses documents requis, la caution et les conditions du contrat avant votre accord.</p><p>Nos loueurs sont basés à Casablanca. Rabat est une possibilité sur demande depuis Casablanca, selon leur disponibilité. Aucune prise en charge dans une autre ville n’est proposée actuellement.</p><div className="flex flex-wrap gap-5"><Link to="/prise-en-charge-casablanca-rabat">Guide des gares et aéroports desservis</Link><Link to="/location-voiture-aeroport-casablanca">Arriver à Mohammed V</Link><Link to="/location-longue-duree-casablanca">Préparer un séjour jusqu’à six mois</Link><Link to="/location-voiture-rabat">Demander une livraison à Rabat</Link><Link to="/faq">Toutes les questions</Link></div></section>
    </main>
    <Footer />
  </>;
}
