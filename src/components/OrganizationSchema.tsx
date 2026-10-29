import { Helmet } from 'react-helmet-async';
import { BUSINESS_INFO } from '@/constants/businessInfo';

// Global identity only. Vehicle offers belong to their visible catalogue pages;
// an indicative catalogue is not evidence of stock or a guaranteed daily price.
export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS_INFO.website}#organization`,
    name: 'Benatna',
    url: BUSINESS_INFO.website,
    description: 'Plateforme de mise en relation avec des loueurs basés à Casablanca pour une location de voiture de tourisme de trois jours à six mois. Livraison gratuite convenue à l’avance aux points desservis ; Rabat sur demande depuis Casablanca. Modèle, tarif et conditions confirmés par le loueur.',
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    areaServed: [
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
    ],
    sameAs: [
      'https://www.facebook.com/545734648969956',
      'https://www.instagram.com/benatna.ma/',
    ],
  };
  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
};
