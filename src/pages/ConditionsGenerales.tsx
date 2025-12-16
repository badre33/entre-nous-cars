import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const ConditionsGenerales = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Conditions Générales de Location | Benatna</title>
        <meta name="description" content="Consultez les conditions générales de location de voiture Benatna au Maroc. Règles, tarifs, assurances et politique d'annulation." />
        <link rel="canonical" href="https://benatna.ma/conditions-generales" />
      </Helmet>

      <Header />
      <Breadcrumbs />

      <main className="flex-1 container px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Conditions Générales de Location</h1>
        
        <div className="prose prose-lg max-w-4xl">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Conditions de location</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Âge minimum : 21 ans (supplément jeune conducteur possible pour les 21-25 ans)</li>
              <li>Permis de conduire valide depuis au moins 2 ans</li>
              <li>Pièce d'identité ou passeport en cours de validité</li>
              <li>Carte de crédit ou caution en espèces selon le véhicule</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Réservation et paiement</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Réservation gratuite via WhatsApp ou téléphone</li>
              <li>Aucun paiement en ligne requis</li>
              <li>Paiement sur place à la prise du véhicule</li>
              <li>Modes de paiement acceptés : espèces, carte bancaire</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Assurance et garanties</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Assurance responsabilité civile incluse</li>
              <li>Option assurance tous risques disponible</li>
              <li>Caution variable selon la catégorie du véhicule</li>
              <li>Assistance routière 24h/24 incluse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Utilisation du véhicule</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Kilométrage illimité sur la plupart des offres</li>
              <li>Véhicule à restituer avec le même niveau de carburant</li>
              <li>Interdiction de fumer dans le véhicule</li>
              <li>Conduite autorisée sur tout le territoire marocain</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Annulation et modification</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Annulation gratuite jusqu'à 24h avant la prise du véhicule</li>
              <li>Modification de réservation sans frais</li>
              <li>Prolongation possible sous réserve de disponibilité</li>
              <li>Contactez-nous via WhatsApp pour toute modification</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant nos conditions générales, contactez-nous via WhatsApp 
              ou par email à contact@benatna.ma. Notre équipe est disponible pour vous accompagner.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConditionsGenerales;
