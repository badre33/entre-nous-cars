import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CanonicalTag from "@/components/CanonicalTag";

/**
 * Page "Notre histoire" — récit fondateur Benatna.
 * Storytelling vendeur avec chiffre pivot Clio 12k DH (Benatna) vs 23k DH (Avis).
 * URL : /notre-histoire
 */
const NotreHistoire = () => {
  return (
    <>
      <Helmet>
        <title>Notre histoire — Benatna, la plateforme des loueurs marocains</title>
        <meta
          name="description"
          content="Comment une startup marocaine a rassemblé des milliers d'agences locales de location de voiture sur une seule plateforme. Une Clio à 12 000 DH le mois au lieu de 23 000 DH chez Avis."
        />
      </Helmet>
      <CanonicalTag path="/notre-histoire" />

      <article className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Accueil
          </Link>
          <span className="mx-2 text-muted-foreground/40">/</span>
          <span className="text-foreground font-medium">Notre histoire</span>
        </nav>

        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-pacifico mb-4">
            Notre histoire
          </h1>
          <p className="text-sm text-muted-foreground">
            🇲🇦 Startup marocaine · La plateforme des loueurs locaux
          </p>
        </header>

        {/* ACCROCHE CHIFFRÉE */}
        <section className="mb-10 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-6 sm:p-8">
          <p className="text-lg sm:text-xl leading-relaxed">
            <strong>
              En août 2026, chez Avis Maroc, louer une Renault Clio pendant un
              mois coûte 23 000 dirhams.
            </strong>
          </p>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Vous avez bien lu. <strong>Vingt-trois mille dirhams</strong>, pour
            une petite citadine. Le prix d'un vol Casa-New York en business.
          </p>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Pour ce prix, on vous prend une empreinte de carte de 8 000 dh en
            caution, on vous facture un surcoût si vous avez moins de 25 ans, et
            surtout — on ne vous garantit même pas de vous donner la Clio
            réservée. C'est écrit en tout petit dans les conditions générales :{" "}
            <em>« ou véhicule similaire »</em>.
          </p>
          <div className="mt-6 pt-6 border-t border-primary/20">
            <p className="text-lg sm:text-xl font-bold text-primary">
              Chez Benatna, la même Clio, le même mois, à Casablanca :{" "}
              <span className="text-2xl sm:text-3xl">12 000 dh.</span>
            </p>
            <p className="mt-2 text-base text-muted-foreground">
              Pas d'empreinte. Pas de surcoût jeune conducteur. Et la voiture
              que vous voyez sur la fiche est celle que vous conduisez.
            </p>
          </div>
        </section>

        {/* COMMENT C'EST POSSIBLE */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Comment c'est possible ?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            <strong>
              Le Maroc compte des milliers d'agences de location de voitures.
            </strong>{" "}
            Petites, familiales, professionnelles — un tissu local d'une densité
            rare, tenu par des gens qui connaissent leur ville par cœur, la
            mécanique, la route, le service qu'un vrai voyageur attend. Ces
            agences offrent le même service que les franchises internationales,
            souvent mieux, presque toujours à la moitié du prix.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            <strong>Mais elles sont invisibles.</strong> Le voyageur qui atterrit
            à Casablanca ou Marrakech tape « location voiture Maroc » sur Google,
            tombe sur Avis, Hertz, Europcar ou Sixt — et pense qu'il n'a pas le
            choix.
          </p>
          <p className="text-base sm:text-lg leading-relaxed">
            Résultat :{" "}
            <strong>
              le voyageur paie deux fois le prix, et le chiffre d'affaires repart
              hors du Maroc
            </strong>
            . Royalties au siège américain, allemand, français. Marges captées
            par les groupes internationaux. Pendant ce temps-là, l'agence d'Aïn
            Diab, du Guéliz ou de Marina Agadir reste sans clients
            internationaux — alors qu'elle vaut mieux.
          </p>
        </section>

        {/* BENATNA EST NÉ */}
        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Benatna est né de ce constat.
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Nous sommes une <strong>startup marocaine</strong>. Notre mission :
            rassembler les milliers de loueurs marocains sur une seule
            plateforme moderne, afficher <strong>leurs vrais prix du marché</strong>{" "}
            en toute transparence, et{" "}
            <strong>négocier pour nos clients</strong> le meilleur tarif possible
            auprès de notre réseau.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🚗</span>
              <p className="text-base sm:text-lg">
                <strong>La voiture que vous voyez est celle que vous conduisez.</strong>{" "}
                Pas de « ou similaire » en petits caractères.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">💰</span>
              <p className="text-base sm:text-lg">
                <strong>Le prix affiché est le prix payé.</strong> Pas de surcoût
                jeune conducteur, pas d'empreinte de carte bloquée, pas de frais
                aéroport caché.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🇲🇦</span>
              <p className="text-base sm:text-lg">
                <strong>Le chiffre d'affaires reste au Maroc</strong>, réinvesti
                dans le tissu économique local — agences, salaires, formation.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📱</span>
              <p className="text-base sm:text-lg">
                <strong>L'agent au bout du WhatsApp est marocain</strong>, parle
                darija, connaît sa ville, connaît la route.
              </p>
            </div>
          </div>
        </section>

        {/* NOTRE PARI */}
        <section className="mb-10 bg-secondary/5 border border-secondary/20 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Notre pari</h2>
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            Le loueur marocain est <strong>parfaitement compétitif</strong>,
            souvent meilleur, presque toujours moins cher que les géants
            internationaux. Il lui manquait juste la visibilité et la plateforme
            technologique.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-secondary">
            On construit les deux.
          </p>
          <p className="mt-4 italic text-muted-foreground">
            Le principe est simple :{" "}
            <strong>entre nous, on fait mieux qu'à travers eux.</strong>
          </p>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <Link to="/louer">
            <Button size="lg" className="text-base sm:text-lg h-14 px-8 shadow-lg">
              Comparez des milliers d'agences marocaines →
            </Button>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            En une recherche. Sans compte à créer. Sans carte de crédit.
          </p>
        </div>
      </article>
    </>
  );
};

export default NotreHistoire;
