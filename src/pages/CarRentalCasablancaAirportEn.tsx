import LangRoute from '@/components/LangRoute';
import { IntlAirportLanding } from '@/components/IntlAirportLanding';
import { intlAirportPages } from '@/data/intlAirportPages';

export default function CarRentalCasablancaAirportEn() {
  return <LangRoute lang="en"><IntlAirportLanding content={intlAirportPages.en} /></LangRoute>;
}
