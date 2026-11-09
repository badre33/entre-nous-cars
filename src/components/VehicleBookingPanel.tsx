import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { pickupPoints } from '@/data/pickupPoints';
import { localToday, rentalEstimate, requestRental, NO_DEPOSIT_FEE } from '@/utils/rentalRequest';
import { isValidRentalPeriod } from '@/utils/rentalPeriod';

const field = 'min-h-11 w-full min-w-0 rounded-md border border-input bg-background px-2 py-2 text-base';
const dh = (amount: number) => `${Math.round(amount).toLocaleString('fr-FR')} DH`;

/** Bloc de réservation façon Getaround : dates et lieu -> prix total et acompte immédiats -> Réserver. */
export function VehicleBookingPanel({ vehicleName }: { vehicleName: string }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [place, setPlace] = useState('cmn');
  const point = pickupPoints.find(p => p.id === place);
  const city: 'Casablanca' | 'Rabat' = place === 'rabat' || point?.city === 'Rabat' ? 'Rabat' : 'Casablanca';
  const valid = startDate >= localToday() && isValidRentalPeriod(startDate, endDate);
  const estimate = valid ? rentalEstimate(vehicleName, startDate, endDate, city) : null;
  const book = () => requestRental({ vehicles: [vehicleName], startDate, endDate, city, pickupId: point ? place : place === 'rabat' || place === 'casablanca' ? 'other' : '' });
  return <div className="space-y-3">
    <div className="grid grid-cols-1 gap-2">
      <label className="space-y-1 text-sm min-w-0"><span className="font-medium">Départ</span><input type="date" aria-label="Date de départ" className={field} min={localToday()} value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
      <label className="space-y-1 text-sm min-w-0"><span className="font-medium">Retour</span><input type="date" aria-label="Date de retour" className={field} min={startDate || localToday()} value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
    </div>
    <label className="block space-y-1 text-sm"><span className="font-medium">Lieu de prise en charge</span>
      <select aria-label="Lieu de prise en charge" className={field} value={place} onChange={e => setPlace(e.target.value)}>
        <optgroup label="Casablanca">{pickupPoints.filter(p => p.city === 'Casablanca').map(p => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="casablanca">Casablanca, en ville ou à l’hôtel</option></optgroup>
        <optgroup label="Rabat (livraison sur demande)">{pickupPoints.filter(p => p.city === 'Rabat').map(p => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="rabat">Rabat, en ville ou à l’hôtel</option></optgroup>
      </select>
    </label>
    {estimate ? <div className="rounded-lg bg-primary/10 p-3 text-sm" aria-live="polite">
      <p className="flex justify-between font-semibold"><span>Prix total, {estimate.days} jours</span><span>{dh(estimate.total)}</span></p>
      <p className="flex justify-between text-muted-foreground"><span>Acompte 30 % + 500 DH</span><span>{dh(estimate.total * 0.3 + NO_DEPOSIT_FEE)}</span></p>
      <p className="text-muted-foreground">Sans caution. Ou tout payer avant la location, sans supplément.</p>
    </div> : <p className="text-sm text-muted-foreground" aria-live="polite">{startDate && endDate ? '3 jours minimum : vérifiez vos dates.' : 'Choisissez vos dates pour voir le prix total.'}</p>}
    <Button type="button" className="w-full bg-green-600 hover:bg-green-700" onClick={book}><MessageCircle className="h-4 w-4 mr-2" />Réserver</Button>
    <p className="text-xs text-muted-foreground">Sans caution. Confirmation sous 1 heure sur WhatsApp. Annulation gratuite jusqu’à 48 h avant le départ.</p>
  </div>;
}
