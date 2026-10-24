import { useComparison } from '@/contexts/ComparisonContext';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { pickupPoints } from '@/data/pickupPoints';
import { rentalVehicleNames, rentalVehicleSlugs } from '@/data/rentalVehicleNames';
import { RENTAL_REQUEST_EVENT, takePendingRental, rentalDefaults, localToday, normalizeVehicleName, validateRental, rentalPlace, openConfirmedRental, type RentalDraft, type ConfirmedRental } from '@/utils/rentalRequest';
const empty = (): ConfirmedRental => ({ vehicles: [], startDate: '', endDate: '', city: 'Casablanca', pickupId: '', otherPlace: '' });
const field = 'min-h-11 min-w-0 w-full rounded-md border border-input bg-background px-3 py-2 text-base';
export default function RentalRequestDialog() {
  const { selectedCars } = useComparison();
  const selectionRef = useRef<string[]>([]);
  useEffect(() => { selectionRef.current = [...new Set(selectedCars.map(car => normalizeVehicleName(car.name)))]; }, [selectedCars]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ConfirmedRental>(empty);
  const [review, setReview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!open) return;
    const target = error ? errorRef.current : review ? titleRef.current : null;
    target?.focus();
    target?.scrollIntoView({ block: 'nearest' });
  }, [error, review, open]);
  useEffect(() => {
    const show = (draft: RentalDraft) => {
      const slug = window.location.pathname.match(/^\/vehicule\/([^/]+)$/)?.[1];
      const inferred = slug ? rentalVehicleSlugs[slug] : undefined;
      const vehicles = (selectionRef.current.length ? selectionRef.current : draft.vehicles?.length ? draft.vehicles : inferred ? [inferred] : []).map(normalizeVehicleName).filter(n => rentalVehicleNames.includes(n as typeof rentalVehicleNames[number]));
      setValue({ ...empty(), ...draft, vehicles, startDate: draft.startDate || '', endDate: draft.endDate || '', pickupId: draft.pickupId || '', otherPlace: '' });
      setError(null); setReview(false); setConfirmed(false); setOpen(true);
    };
    const listener = () => { const draft = takePendingRental(); if (draft) show(draft); };
    window.addEventListener(RENTAL_REQUEST_EVENT, listener);
    const pending = takePendingRental();
    if (pending) show(pending); else if (new URLSearchParams(window.location.search).get('demande') === '1') show(rentalDefaults());
    return () => window.removeEventListener(RENTAL_REQUEST_EVENT, listener);
  }, []);
  const change = (patch: Partial<ConfirmedRental>) => { setValue(v => ({ ...v, ...patch })); setError(null); setReview(false); setConfirmed(false); };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const issue = validateRental(value); if (issue) { setError({ message: issue }); return; }
    if (!review) { setReview(true); return; }
    if (!confirmed) { setError({ message: 'Confirmez les informations du récapitulatif.' }); return; }
    if (openConfirmedRental(value)) { setOpen(false); setValue(empty()); }
    else setError({ message: 'WhatsApp n’a pas pu s’ouvrir. Autorisez les fenêtres puis réessayez. Votre demande est conservée.' });
  };
  const vehicleFields = value.vehicles.length ? value.vehicles : [''];
  return <Dialog open={open} onOpenChange={next => { setOpen(next); if (!next) { setValue(empty()); setError(null); } }}>
    <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto overscroll-contain [&_button]:whitespace-normal [&_button]:h-auto [&_button]:min-h-11">
      <DialogHeader className="pr-8"><DialogTitle ref={titleRef} tabIndex={-1}>{review ? 'Vérifiez votre demande' : 'Préparer ma demande de location'}</DialogTitle><DialogDescription>Renseignez les dates, le véhicule et le lieu de prise en charge avant d’ouvrir WhatsApp. Le loueur confirmera ensuite la disponibilité et le tarif.</DialogDescription></DialogHeader>
      <form onSubmit={submit} className="min-w-0 space-y-4">
        {error && <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm text-destructive">{error.message}</p>}
        {!review ? <>
          <fieldset className="space-y-3">
            <legend className="font-medium">Véhicules souhaités — 3 maximum</legend>
            {vehicleFields.map((vehicle, index) => <div key={index} className="flex items-end gap-2">
              <label className="block flex-1 min-w-0 space-y-1"><span>Véhicule {index + 1}</span>
                <select required aria-label={index === 0 ? 'Véhicule souhaité' : `Véhicule souhaité ${index + 1}`} className={field} value={vehicle} onChange={e => { const vehicles = [...value.vehicles]; vehicles[index] = e.target.value; change({ vehicles }); }}>
                  <option value="">Choisir un modèle</option>
                  {rentalVehicleNames.map(name => <option key={name} value={name} disabled={name !== vehicle && value.vehicles.includes(name)}>{name}</option>)}
                </select>
              </label>
              {vehicleFields.length > 1 && <Button type="button" variant="outline" aria-label={`Retirer le véhicule ${index + 1}`} onClick={() => change({ vehicles: value.vehicles.filter((_, i) => i !== index) })}>Retirer</Button>}
            </div>)}
            {vehicleFields.length < 3 && <Button type="button" variant="outline" disabled={!value.vehicles.length || value.vehicles.some(v => !v)} onClick={() => change({ vehicles: [...value.vehicles, ''] })}>Ajouter un véhicule (3 maximum)</Button>}
          </fieldset>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="block space-y-1"><span>Date de départ</span><input required type="date" aria-label="Date de départ de la demande" min={localToday()} className={field} value={value.startDate} onChange={e => change({ startDate: e.target.value })} /></label><label className="block space-y-1"><span>Date de retour</span><input required type="date" aria-label="Date de retour de la demande" min={value.startDate || localToday()} className={field} value={value.endDate} onChange={e => change({ endDate: e.target.value })} /></label></div>
          <p className="text-sm text-muted-foreground">De 3 jours minimum à 6 mois maximum.</p>
          <label className="block space-y-1"><span>Ville de prise en charge</span><select required aria-label="Ville de prise en charge" className={field} value={value.city} onChange={e => change({ city: e.target.value as ConfirmedRental['city'], pickupId: '', otherPlace: '' })}><option>Casablanca</option><option>Rabat</option></select></label>
          <label className="block space-y-1"><span>Lieu de prise en charge</span><select required aria-label="Lieu de prise en charge" className={field} value={value.pickupId} onChange={e => change({ pickupId: e.target.value, otherPlace: '' })}><option value="">Choisir le lieu précis</option>{pickupPoints.filter(p => p.city === value.city).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="other">Autre adresse dans cette ville — à préciser</option></select></label>
          {value.pickupId === 'other' && <label className="block space-y-1"><span>Adresse ou point de rendez-vous précis</span><input required minLength={5} maxLength={200} aria-label="Adresse précise de prise en charge" className={field} value={value.otherPlace} onChange={e => change({ otherPlace: e.target.value })} /></label>}
          {value.city === 'Rabat' && <p className="text-sm">Livraison à Rabat demandée depuis Casablanca, à confirmer avec le loueur.</p>}
          <Button type="submit" className="w-full">Vérifier ma demande</Button>
        </> : <>
          <dl className="min-w-0 space-y-3 rounded-lg bg-muted p-4 text-sm [overflow-wrap:anywhere]"><div><dt className="font-semibold">Véhicule(s)</dt><dd>{value.vehicles.join(' / ')}</dd></div><div><dt className="font-semibold">Dates</dt><dd>{value.startDate.split('-').reverse().join('/')} → {value.endDate.split('-').reverse().join('/')}</dd></div><div><dt className="font-semibold">Lieu de prise en charge</dt><dd>{rentalPlace(value)}</dd></div>{value.notes && <div><dt className="font-semibold">Précisions</dt><dd className="whitespace-pre-wrap">{value.notes}</dd></div>}</dl>
          <p className="text-sm">La livraison est gratuite et convenue à l’avance. Cette demande n’est pas une réservation confirmée.</p>
          <label className="flex gap-3 items-start text-sm"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span>Je confirme mes dates, mon véhicule et mon lieu de prise en charge.</span></label>
          <Button type="submit" disabled={!confirmed} className="w-full">Confirmer et ouvrir WhatsApp</Button><Button type="button" variant="outline" className="w-full" onClick={() => { setReview(false); setConfirmed(false); setError(null); titleRef.current?.focus(); titleRef.current?.scrollIntoView({ block: 'nearest' }); }}>Modifier ma demande</Button>
        </>}
      </form>
    </DialogContent>
  </Dialog>;
}
