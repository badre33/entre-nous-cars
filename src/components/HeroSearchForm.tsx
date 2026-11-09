import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isValidRentalPeriod, RENTAL_PERIOD_MESSAGE } from '@/utils/rentalPeriod';
import { localToday, requestRental } from '@/utils/rentalRequest';
import { pickupPoints } from '@/data/pickupPoints';
import { useLanguage, useTr } from '@/contexts/LanguageContext';

export const HeroSearchForm = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const tr = useTr();
  const catalogue = language === 'fr' ? '/louer' : `/${language}/louer`;
  // « Où ? » : aéroport, gare ou ville ; la ville se déduit du lieu choisi.
  const [place, setPlace] = useState('cmn');
  const city = place === 'rabat' || pickupPoints.find(p => p.id === place)?.city === 'Rabat' ? 'Rabat' : 'Casablanca';
  const pickup = pickupPoints.some(p => p.id === place) ? place : '';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const field = 'min-w-0 w-full min-h-12 rounded-lg border border-gray-400 bg-white text-gray-900 px-2 py-2 text-base';
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (startDate < localToday() || !isValidRentalPeriod(startDate, endDate)) {
      setError(startDate < localToday() ? tr('Choisissez une date de départ à partir d’aujourd’hui.', 'Choose a pick-up date from today.', 'Elige una fecha de recogida a partir de hoy.') : tr(RENTAL_PERIOD_MESSAGE, 'Rentals last at least 3 days. Check your dates.', 'El alquiler dura al menos 3 días. Revisa tus fechas.'));
      return;
    }
    navigate(`${catalogue}?${new URLSearchParams({ city, ...(pickup ? { pickup } : {}), startDate, endDate })}`);
  };
  return <div className="w-full max-w-4xl mx-auto">
    <form aria-label={tr("Rechercher une voiture", "Search for a car", "Buscar un coche")} onSubmit={handleSearch} className="rounded-2xl bg-white text-gray-900 shadow-xl p-4 sm:p-5 text-left space-y-3">
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
        <label className="min-w-0 min-[360px]:col-span-2 lg:col-span-1 space-y-1"><span className="block text-sm font-semibold">{tr("Où ?", "Where?", "¿Dónde?")}</span><select aria-label={tr("Lieu de prise en charge", "Pick-up place", "Lugar de recogida")} className={field} value={place} onChange={e=>{setPlace(e.target.value);setError('');}}>
          <optgroup label="Casablanca">{pickupPoints.filter(p=>p.city==='Casablanca').map(p=><option key={p.id} value={p.id}>{p.name}</option>)}<option value="casablanca">{tr("Casablanca, en ville ou à l’hôtel", "Casablanca, in town or at your hotel", "Casablanca, en la ciudad o en el hotel")}</option></optgroup>
          <optgroup label={tr("Rabat (livraison sur demande)", "Rabat (delivery on request)", "Rabat (entrega bajo petición)")}>{pickupPoints.filter(p=>p.city==='Rabat').map(p=><option key={p.id} value={p.id}>{p.name}</option>)}<option value="rabat">{tr("Rabat, en ville ou à l’hôtel", "Rabat, in town or at your hotel", "Rabat, en la ciudad o en el hotel")}</option></optgroup>
        </select></label>
        <label className="min-w-0 space-y-1"><span className="block text-sm font-semibold">{tr("Date de départ", "Pick-up date", "Fecha de recogida")}</span><input required type="date" min={localToday()} className={field} value={startDate} onChange={e=>{setStartDate(e.target.value);setError('');}} /></label>
        <label className="min-w-0 space-y-1"><span className="block text-sm font-semibold">{tr("Date de retour", "Return date", "Fecha de devolución")}</span><input required type="date" min={startDate||localToday()} className={field} value={endDate} onChange={e=>{setEndDate(e.target.value);setError('');}} /></label>
      </div>
      <p className="text-sm text-gray-600">{tr('3 jours minimum. Le rendez-vous est convenu avec le loueur.', '3 days minimum. The meeting point is agreed with the rental agency.', 'Mínimo 3 días. El punto de entrega se acuerda con la agencia.')}{city==='Rabat'?tr(' Livraison à Rabat sur demande depuis Casablanca.', ' Delivery to Rabat on request from Casablanca.', ' Entrega en Rabat bajo petición desde Casablanca.'):''}</p>
      {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" className="w-full min-h-12 h-auto whitespace-normal"><Search aria-hidden="true"/>{tr("Rechercher", "Search", "Buscar")}</Button>
      <Button type="button" variant="outline" aria-label={tr("Réserver une voiture", "Book a car", "Reservar un coche")} className="w-full min-h-12 h-auto whitespace-normal md:hidden" onClick={()=>requestRental({city,pickupId:pickup,startDate,endDate})}>{tr('Réserver sur WhatsApp', 'Book on WhatsApp', 'Reservar por WhatsApp')}</Button>
    </form>
    <button type="button" onClick={()=>navigate(catalogue)} className="min-h-11 mx-auto mt-2 flex items-center justify-center gap-2 text-white font-medium">{tr('Voir tous les véhicules', 'See all cars', 'Ver todos los coches')}<ChevronRight aria-hidden="true" className="h-4 w-4"/></button>
  </div>;
};
