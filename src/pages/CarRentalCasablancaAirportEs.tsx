import LangRoute from '@/components/LangRoute';
import { IntlAirportLanding } from '@/components/IntlAirportLanding';
import { intlAirportPages } from '@/data/intlAirportPages';

export default function CarRentalCasablancaAirportEs() {
  return <LangRoute lang="es"><IntlAirportLanding content={intlAirportPages.es} /></LangRoute>;
}
