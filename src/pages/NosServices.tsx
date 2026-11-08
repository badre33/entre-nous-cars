import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HreflangTags } from '@/utils/hreflangHelper';
import { coreRentalPages } from '@/data/coreRentalPages';

const services = [
  { key: 'airport', title: 'Arriver à Mohammed V', text: 'Préparer le véhicule et la livraison gratuite avec le loueur avant votre vol.' },
  { key: 'railway', title: 'Choisir une gare de Casablanca', text: 'Sélectionner Casa-Voyageurs, Casa-Port, Oasis ou Aïn Sebaâ dans votre demande.' },
  { key: 'automatic', title: 'Comparer les voitures automatiques', text: 'Ouvrir le catalogue filtré et faire confirmer la version pour vos dates.' },
  { key: 'casaVoyageurs', title: 'Arriver à Casa-Voyageurs', text: 'Préciser votre train, vos passagers et vos bagages pour préparer la remise.' },
  { key: 'casablanca', title: 'Choisir votre voiture à Casablanca', text: 'Comparer les modèles, leurs prix indicatifs et les conditions du loueur.' },
] as const;
export default function NosServices() {
 return <>
  <Helmet>
   <title>Préparer votre location de voiture à Casablanca | Benatna</title>
   <meta name="description" content="Préparez une voiture à Casablanca : Mohammed V, gares, automatique ou séjour au mois. Livraison gratuite aux points desservis, 3 jours minimum. Rabat sur demande." />
   <meta property="og:title" content="Préparer votre location de voiture à Casablanca | Benatna" />
   <meta property="og:description" content="Choisissez le modèle, les dates et le lieu. Disponibilité, tarif et conditions confirmés par le loueur." />
   <meta property="og:url" content="https://benatna.ma/nos-services" />
  </Helmet>
  <HreflangTags path="/nos-services" /><Header />
  <main className="container max-w-5xl px-4 sm:px-6 py-8 md:py-16 space-y-8">
   <section className="space-y-4">
    <h1 className="text-3xl md:text-5xl">Préparer votre location de voiture à Casablanca</h1>
    <p>MRE, touristes et vacanciers : choisissez le modèle et le lieu adaptés à votre séjour. Nos loueurs sont basés à Casablanca ; une livraison à Rabat peut être étudiée depuis Casablanca selon leur disponibilité.</p>
    <p><strong>Trois jours minimum.</strong> Livraison gratuite aux points desservis, rendez-vous convenu à l’avance.</p>
    <Link className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-3 font-semibold text-center" to="/louer?city=Casablanca">Choisir mes véhicules et mes dates</Link>
   </section>
   <section aria-label="Choisir votre parcours de location" className="grid gap-4 sm:grid-cols-2">
    {services.map(service=><article className="rounded-xl border p-5 space-y-3" key={service.key}>
     <h2 className="text-xl font-semibold"><Link className="inline-flex min-h-11 items-center text-primary underline underline-offset-4" to={coreRentalPages[service.key].path}>{service.title}</Link></h2>
     <p>{service.text}</p>
    </article>)}
   </section>
   <section className="space-y-4">
    <h2 className="text-2xl">Prix, caution et contrat avant votre accord</h2>
    <p>Le catalogue présente des modèles et des prix journaliers indicatifs. Demandez au loueur le tarif total, la version proposée et les conditions de caution, d’assurance et de kilométrage. Une demande WhatsApp ne confirme pas automatiquement une location. Aucun paiement en ligne n’est proposé sur Benatna.</p>
    <div className="flex flex-wrap gap-4"><Link className="inline-flex min-h-11 items-center underline" to="/prix-location-voiture-maroc-2026">Comprendre les prix</Link><Link className="inline-flex min-h-11 items-center underline" to="/caution-location-voiture-maroc">Préparer les questions sur la caution</Link><Link className="inline-flex min-h-11 items-center underline" to="/louer-voiture-maroc-faq-complete">Questions pratiques</Link></div>
   </section>
  </main><Footer />
 </>;
}
