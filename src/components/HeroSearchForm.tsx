import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isValidRentalPeriod, RENTAL_PERIOD_MESSAGE } from '@/utils/rentalPeriod';
import { localToday, requestRental } from '@/utils/rentalRequest';

export const HeroSearchForm = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Casablanca');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const field = 'min-w-0 w-full min-h-12 rounded-lg border border-gray-400 bg-white text-gray-900 px-2 py-2 text-base';
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (startDate < localToday() || !isValidRentalPeriod(startDate, endDate)) {
      setError(startDate < localToday() ? 'Choisissez une date de départ à partir d’aujourd’hui.' : RENTAL_PERIOD_MESSAGE);
      return;
    }
    navigate(`/louer?${new URLSearchParams({ city, startDate, endDate })}`);
  };
  return <div className="w-full max-w-4xl mx-auto">
    <form aria-label="Rechercher une voiture" onSubmit={handleSearch} className="rounded-2xl bg-white text-gray-900 shadow-xl p-4 sm:p-5 text-left space-y-3">
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
        <label className="min-w-0 min-[360px]:col-span-2 lg:col-span-1 space-y-1"><span className="block text-sm font-semibold">Ville de prise en charge</span><select aria-label="Ville de prise en charge" className={field} value={city} onChange={e=>setCity(e.target.value)}><option>Casablanca</option><option>Rabat</option></select></label>
        <label className="min-w-0 space-y-1"><span className="block text-sm font-semibold">Date de départ</span><input required type="date" min={localToday()} className={field} value={startDate} onChange={e=>{setStartDate(e.target.value);setError('');}} /></label>
        <label className="min-w-0 space-y-1"><span className="block text-sm font-semibold">Date de retour</span><input required type="date" min={startDate||localToday()} className={field} value={endDate} onChange={e=>{setEndDate(e.target.value);setError('');}} /></label>
      </div>
      <p className="text-sm text-gray-600">3 jours minimum, 6 mois maximum. Le rendez-vous est convenu avec le loueur.{city==='Rabat'?' Livraison à Rabat sur demande depuis Casablanca.':''}</p>
      {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" className="w-full min-h-12 h-auto whitespace-normal"><Search aria-hidden="true"/>Rechercher</Button>
      <Button type="button" variant="outline" aria-label="Préparer une demande de location" className="w-full min-h-12 h-auto whitespace-normal md:hidden" onClick={()=>requestRental({city:city==='Rabat'?'Rabat':'Casablanca',startDate,endDate})}>Préparer ma demande WhatsApp</Button>
    </form>
    <button type="button" onClick={()=>navigate('/louer')} className="min-h-11 mx-auto mt-2 flex items-center justify-center gap-2 text-white font-medium">Voir tous les véhicules<ChevronRight aria-hidden="true" className="h-4 w-4"/></button>
  </div>;
};
