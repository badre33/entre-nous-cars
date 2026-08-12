import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Valeurs par défaut des balises de partage et de la description.
 *
 * Elles vivaient en dur dans index.html. Comme react-helmet-async AJOUTE ses
 * propres balises sans retirer celles du HTML, chaque page se retrouvait avec
 * deux descriptions et deux og:title — Google en choisissait une au hasard.
 *
 * En les posant ici, Helmet les gère comme les autres : une page qui déclare
 * sa propre description écrase celle-ci, sinon c'est celle-ci qui s'applique.
 * Une seule balise dans tous les cas. Le prérendu (scripts/prerender.mjs) fige
 * le résultat dans le HTML livré, donc WhatsApp, Facebook et LinkedIn — qui
 * n'exécutent pas JavaScript — voient bien l'aperçu de la page demandée.
 */

const DEFAULTS: Record<string, { desc: string; locale: string }> = {
  fr: {
    desc:
      "La startup marocaine qui gère le parc de centaines de loueurs locaux pour vous obtenir les meilleurs prix. Voiture dès 250 DH/jour, livraison partout au Maroc, réponse WhatsApp en 2 minutes.",
    locale: "fr_MA",
  },
  en: {
    desc:
      "The Moroccan startup that manages the fleets of hundreds of local rental agencies to get you the best price. Cars from 250 MAD/day, delivery anywhere in Morocco, WhatsApp reply in 2 minutes.",
    locale: "en_US",
  },
  es: {
    desc:
      "La startup marroquí que gestiona la flota de cientos de agencias locales para conseguirte el mejor precio. Coches desde 250 MAD/día, entrega en todo Marruecos, respuesta por WhatsApp en 2 minutos.",
    locale: "es_ES",
  },
};

export const SeoDefaults = () => {
  const { language } = useLanguage();
  const d = DEFAULTS[language] ?? DEFAULTS.fr;

  return (
    <Helmet>
      <meta name="description" content={d.desc} />

      <meta property="og:site_name" content="Benatna" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={d.locale} />
      <meta property="og:title" content="Benatna — Location de voiture au Maroc dès 250 DH/jour" />
      <meta property="og:description" content={d.desc} />
      <meta property="og:image" content="https://benatna.ma/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Benatna — Location de voiture au Maroc dès 250 DH/jour" />
      <meta name="twitter:description" content={d.desc} />
      <meta name="twitter:image" content="https://benatna.ma/og-image.png" />
    </Helmet>
  );
};
