import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { rentalFacts } from '@/data/pickupPoints';

export default function FAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rentalFacts.map(f => ({
      '@type': 'Question', name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return <>
    <Helmet>
      <title>Questions location Casablanca, Rabat sur demande | Benatna</title>
      <meta name="description" content="MRE, touristes et vacanciers : location de trois jours à six mois à Casablanca, Rabat sur demande. Disponibilité et réservation confirmées par le loueur, sans paiement en ligne." />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <Header />
    <main className="container max-w-4xl py-16 space-y-8">
      <h1 className="text-4xl">Questions fréquentes — Casablanca et Rabat</h1>
      {rentalFacts.map(f => <section key={f.question} className="space-y-3">
        <h2 className="text-xl font-semibold">{f.question}</h2>
        <p>{f.answer}</p>
      </section>)}
      <Link className="underline" to="/prise-en-charge-casablanca-rabat">Préparer une arrivée en gare ou à l’aéroport</Link>
    </main>
    <Footer />
  </>;
}
