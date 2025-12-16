import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface ServiceSchemaProps {
  city?: string;
}

export const ServiceSchema = ({ city }: ServiceSchemaProps) => {
  const baseUrl = "https://benatna.ma";
  const cityName = city || "Maroc";
  const citySlug = city ? `/location-voiture-${city.toLowerCase()}` : "";

  const services = [
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#location-courte-duree`,
      "name": `Location de Voiture Courte Durée ${cityName}`,
      "description": `Service de location de voiture courte durée (1-30 jours) à ${cityName}. Idéal pour vos déplacements professionnels, vacances et week-ends. Réservation en ligne en 2 minutes, sans carte de crédit requise.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": city ? "City" : "Country",
        "name": cityName
      },
      "serviceType": "Location de voiture courte durée",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${citySlug}`,
        "priceCurrency": "MAD",
        "price": "150",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "150",
          "priceCurrency": "MAD",
          "unitText": "jour"
        },
        "availability": "https://schema.org/InStock"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Véhicules disponibles",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Citadines",
            "description": "Voitures économiques et compactes"
          },
          {
            "@type": "OfferCatalog",
            "name": "SUV",
            "description": "4x4 et véhicules spacieux"
          },
          {
            "@type": "OfferCatalog",
            "name": "Luxe",
            "description": "Véhicules premium et haut de gamme"
          }
        ]
      }
    },
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#location-longue-duree`,
      "name": `Location de Voiture Longue Durée ${cityName}`,
      "description": `Service de location de voiture longue durée (plus de 30 jours) à ${cityName}. Solution flexible pour vos besoins professionnels ou personnels prolongés. Tarifs dégressifs et conditions avantageuses.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": city ? "City" : "Country",
        "name": cityName
      },
      "serviceType": "Location de voiture longue durée",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${citySlug}`,
        "priceCurrency": "MAD",
        "availability": "https://schema.org/InStock"
      }
    },
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#livraison-gratuite`,
      "name": `Livraison Gratuite de Voiture ${cityName}`,
      "description": `Service de livraison gratuite de votre voiture de location partout au Maroc. Nous livrons à l'aéroport, à votre hôtel, ou à votre domicile à ${cityName} et dans toutes les villes du Maroc. Service disponible 24/7.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": "Country",
        "name": "Maroc"
      },
      "serviceType": "Livraison de véhicule",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${citySlug}`,
        "price": "0",
        "priceCurrency": "MAD",
        "availability": "https://schema.org/InStock",
        "description": "Livraison gratuite partout au Maroc"
      },
      "availableChannel": [
        {
          "@type": "ServiceChannel",
          "serviceLocation": {
            "@type": "Place",
            "name": "Aéroports"
          }
        },
        {
          "@type": "ServiceChannel",
          "serviceLocation": {
            "@type": "Place",
            "name": "Hôtels"
          }
        },
        {
          "@type": "ServiceChannel",
          "serviceLocation": {
            "@type": "Place",
            "name": "Domicile"
          }
        }
      ]
    },
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#assurance-tous-risques`,
      "name": `Assurance Tous Risques ${cityName}`,
      "description": `Assurance tous risques incluse avec chaque location de voiture à ${cityName}. Protection complète du véhicule et des passagers. Assistance 24/7 en cas d'incident. Franchise réduite.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": city ? "City" : "Country",
        "name": cityName
      },
      "serviceType": "Assurance automobile",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${citySlug}`,
        "availability": "https://schema.org/InStock",
        "description": "Assurance tous risques incluse dans le tarif"
      },
      "additionalType": "https://schema.org/InsuranceAgency"
    },
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#assistance-247`,
      "name": `Assistance 24/7 ${cityName}`,
      "description": `Service d'assistance disponible 24 heures sur 24, 7 jours sur 7 pour tous nos clients à ${cityName}. Support téléphonique, dépannage, véhicule de remplacement en cas de panne. Équipe multilingue à votre écoute.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": "Country",
        "name": "Maroc"
      },
      "serviceType": "Assistance routière",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@type": "Service",
      "@id": `${baseUrl}${citySlug}#kilometrage-illimite`,
      "name": `Kilométrage Illimité ${cityName}`,
      "description": `Profitez d'un kilométrage illimité sur la majorité de nos véhicules à ${cityName}. Parcourez le Maroc sans limite de distance. Idéal pour les road trips et découvrir le pays en toute liberté.`,
      "provider": {
        "@type": "Organization",
        "name": "Benatna",
        "url": baseUrl,
        "telephone": BUSINESS_INFO.whatsapp
      },
      "areaServed": {
        "@type": city ? "City" : "Country",
        "name": cityName
      },
      "serviceType": "Service inclus",
      "offers": {
        "@type": "Offer",
        "url": `${baseUrl}${citySlug}`,
        "availability": "https://schema.org/InStock",
        "description": "Kilométrage illimité inclus sans frais supplémentaire"
      }
    }
  ];

  // Create a Service aggregate schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    "@id": `${baseUrl}${citySlug}#auto-rental`,
    "name": city ? `Benatna Location de Voiture ${city}` : "Benatna Location de Voiture Maroc",
    "url": `${baseUrl}${citySlug}`,
    "description": `Location de voiture ${cityName} avec Benatna. Services complets incluant location courte et longue durée, livraison gratuite partout au Maroc, assurance tous risques, assistance 24/7 et kilométrage illimité.`,
    "provider": {
      "@type": "Organization",
      "name": "Benatna",
      "url": baseUrl,
      "telephone": BUSINESS_INFO.whatsapp,
      "logo": `${baseUrl}/logo-benatna.png`
    },
    "areaServed": {
      "@type": city ? "City" : "Country",
      "name": cityName
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de location",
      "itemListElement": services
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};
