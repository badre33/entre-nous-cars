import { Helmet } from 'react-helmet-async';

interface HowToSchemaProps {
  city?: string;
}

const HowToSchema = ({ city }: HowToSchemaProps) => {
  const locationText = city ? ` à ${city}` : ' au Maroc';
  
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Comment réserver votre voiture${locationText}`,
    "description": `Guide complet pour réserver votre voiture de location avec Benatna${locationText}. Processus simple en 4 étapes pour une réservation rapide et sécurisée.`,
    "image": "https://benatna.ma/hero-home-new.webp",
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "MAD",
      "value": "150"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Permis de conduire valide"
      },
      {
        "@type": "HowToSupply",
        "name": "Carte d'identité ou passeport"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "Smartphone ou ordinateur"
      },
      {
        "@type": "HowToTool",
        "name": "Connexion internet"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choisissez votre véhicule",
        "text": "Parcourez notre flotte de véhicules et sélectionnez la voiture qui correspond à vos besoins. Comparez les modèles, les prix et les équipements disponibles.",
        "url": `https://benatna.ma${city ? `/location-voiture-${city.toLowerCase()}` : ''}`,
        "image": "https://benatna.ma/hero-rent.jpg"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Sélectionnez vos dates",
        "text": "Choisissez la date et l'heure de prise en charge, puis la date et l'heure de restitution de votre véhicule. Le système calcule automatiquement le tarif en fonction de la durée.",
        "url": `https://benatna.ma${city ? `/location-voiture-${city.toLowerCase()}` : ''}`,
        "image": "https://benatna.ma/hero-home-new.webp"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Remplissez vos informations",
        "text": "Saisissez vos coordonnées : nom, prénom, téléphone et email. Ces informations sont nécessaires pour confirmer votre réservation et vous contacter si besoin.",
        "url": `https://benatna.ma${city ? `/location-voiture-${city.toLowerCase()}` : ''}`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Confirmez votre réservation",
        "text": "Vérifiez tous les détails de votre réservation, choisissez vos options (assurance, GPS, siège bébé) et validez. Vous recevrez une confirmation par email et SMS avec tous les détails.",
        "url": "https://benatna.ma/contact"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
};

export default HowToSchema;
