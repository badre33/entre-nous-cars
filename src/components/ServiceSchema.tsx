import { Helmet } from 'react-helmet-async';
interface ServiceSchemaProps { city?: string }
export const ServiceSchema = ({ city = 'Casablanca' }: ServiceSchemaProps) => {
  if (!['Casablanca', 'Rabat'].includes(city)) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city === 'Rabat' ? 'Livraison de voiture à Rabat sur demande depuis Casablanca' : 'Préparer une location de voiture à Casablanca',
    serviceType: 'Mise en relation pour une location de voiture de tourisme',
    provider: { '@id': 'https://benatna.ma#organization' },
    areaServed: { '@type': 'City', name: city },
    description: 'De trois jours à six mois calendaires. Modèles et prix journaliers indicatifs ; disponibilité, tarif final et contrat confirmés par le loueur. Livraison gratuite convenue à l’avance aux points desservis, Rabat sur demande depuis Casablanca. Aucun paiement en ligne sur Benatna.',
    url: city === 'Rabat' ? 'https://benatna.ma/location-voiture-rabat' : 'https://benatna.ma/location-voiture-casablanca',
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
