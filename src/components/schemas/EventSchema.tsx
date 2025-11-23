import { Helmet } from "react-helmet-async";
import { BUSINESS_INFO } from "@/constants/businessInfo";

interface EventSchemaProps {
  eventName: string;
  eventDescription: string;
  startDate: string;
  endDate: string;
  location: {
    name: string;
    city: string;
    address: string;
  };
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

/**
 * Schema Event pour événements spéciaux (CAN 2025, etc.)
 * Impact SEO: Apparition dans "événements à proximité" et rich snippets événements
 * Augmente la visibilité lors de recherches liées à l'événement
 */
export const EventSchema = ({
  eventName,
  eventDescription,
  startDate,
  endDate,
  location,
  offers
}: EventSchemaProps) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": eventName,
    "description": eventDescription,
    "startDate": startDate,
    "endDate": endDate,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": location.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location.city,
        "streetAddress": location.address,
        "addressCountry": "MA"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Confédération Africaine de Football (CAF)",
      "url": "https://www.cafonline.com"
    },
    "sponsor": {
      "@type": "Organization",
      "@id": `${BUSINESS_INFO.website}#organization`,
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.website,
      "description": `${BUSINESS_INFO.name} propose des services de location de voiture pour ${eventName}`
    }
  };

  // Ajouter les offres si spécifiées
  if (offers) {
    Object.assign(eventSchema, {
      "offers": {
        "@type": "Offer",
        "url": `${BUSINESS_INFO.website}/location-voiture-can-2025-${location.city.toLowerCase()}`,
        "price": offers.price,
        "priceCurrency": offers.priceCurrency,
        "availability": offers.availability,
        "validFrom": startDate,
        "validThrough": endDate,
        "seller": {
          "@type": "Organization",
          "name": BUSINESS_INFO.name,
          "url": BUSINESS_INFO.website
        }
      }
    });
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};
