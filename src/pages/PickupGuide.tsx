import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { pickupPoints, rentalFacts } from '@/data/pickupPoints';

export default function PickupGuide() {
  return <>
    <Helmet>
      <title>Location voiture : gares et aéroports Casablanca, Rabat sur demande | Benatna</title>
      <meta name="description" content="MRE et touristes : voiture de tourisme à Casablanca, aéroport Mohammed V, Casa-Voyageurs, Casa-Port, Oasis et Aïn Sebaâ. Rabat sur demande. Minimum 3 jours." />
      <script type="application/ld+json">{JSON.stringify({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity:rentalFacts.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}})) })}</script>
    </Helmet>
    <Header />
    <main className="container px-4 sm:px-6 py-8 md:py-12 space-y-8 md:space-y-12 max-w-5xl">
      <section className="space-y-5">
        <h1 className="text-3xl md:text-5xl">Votre voiture à l’arrivée à Casablanca</h1>
        <p className="text-lg">MRE, touristes et vacanciers : préparez votre prise en charge en ville, à l’aéroport Mohammed V ou près d’une gare. Nos loueurs sont basés à Casablanca. Rabat reste une livraison sur demande depuis Casablanca.</p>
        <p><strong>Voitures de tourisme uniquement. Minimum trois jours, maximum six mois.</strong> Livraison gratuite, convenue à l’avance avec le loueur. La présence d’un lieu dans ce guide ne signifie pas que Benatna y possède une agence ou un guichet.</p>
        <p>La demande se prépare sur le site puis se transmet par WhatsApp. Aucun paiement en ligne ; la réservation doit être confirmée par le loueur.</p>
      </section>
      {['Casablanca','Rabat'].map(city=><section key={city} className="space-y-5">
        <h2 className="text-2xl">{city==='Casablanca'?'Gares et aéroport de Casablanca':'Rabat : gares et aéroport, livraison conditionnelle'}</h2>
        {city==='Rabat'&&<p>Les véhicules partent de Casablanca. La livraison est gratuite et convenue à l’avance avec le loueur.</p>}
        <div className="grid md:grid-cols-2 gap-5">{pickupPoints.filter(p=>p.city===city).map(p=><article id={p.id} key={p.id} className="rounded-xl border p-5 space-y-3">
          <h3 className="text-xl font-semibold">{p.name}</h3><p>{p.detail}</p>
          <Link className="inline-flex min-h-11 items-center underline font-semibold" to={`/louer?city=${p.city}&pickup=${p.id}`}>Préparer une demande — {p.name}</Link>
        </article>)}</div>
      </section>)}
      <section className="space-y-4"><h2 className="text-2xl">Une autre gare à Casablanca ou Rabat ?</h2><p>Cette liste présente les principaux points d’arrivée, pas un inventaire exhaustif des gares. Précisez le nom de votre gare sur WhatsApp : la livraison est gratuite et convenue à l’avance avec le loueur. Aucune remise dans une autre ville n’est proposée.</p><Link className="underline" to="/louer">Préparer mes dates</Link></section>
      <section className="space-y-5"><h2 className="text-2xl">Réponses pratiques avant votre demande</h2>{rentalFacts.map(f=><article className="space-y-2" key={f.question}><h3 className="text-lg font-semibold">{f.question}</h3><p>{f.answer}</p></article>)}</section>
      <section className="space-y-2 text-sm"><h2 className="font-semibold">Repères de transport</h2><p>Consultez les opérateurs pour les informations de transport. Les modalités de location sont celles confirmées par le loueur.</p><p><a className="underline" href="https://www.casablancacity.ma/fr/article/754/gares-ferroviaires">Gares : portail de Casablanca</a> · <a className="underline" href="https://www.oncf.ma/fr/Al-boraq">Trains : ONCF</a> · <a className="underline" href="https://www.onda.ma/">Aéroports : ONDA</a></p></section>
    </main><Footer />
  </>;
}
