import { useComparison } from '@/contexts/ComparisonContext';
import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { pickupPoints } from '@/data/pickupPoints';
import { rentalVehicleNames, rentalVehicleSlugs } from '@/data/rentalVehicleNames';
import { RENTAL_REQUEST_EVENT, takePendingRental, rentalDefaults, localToday, normalizeVehicleName, isOtherVehicle, otherVehicleText, OTHER_VEHICLE_PREFIX, validateRental, rentalPlace, openConfirmedRental, rentalEstimate, newBookingReference, NO_DEPOSIT_FEE, type RentalDraft, type ConfirmedRental } from '@/utils/rentalRequest';
import { RENTAL_PERIOD_MESSAGE } from '@/utils/rentalPeriod';
import { useTr } from '@/contexts/LanguageContext';
import { analyticsTracker } from '@/utils/analyticsTracker';
import { CheckCircle2 } from 'lucide-react';
const empty = (): ConfirmedRental => ({ vehicles: [], startDate: '', endDate: '', city: 'Casablanca', pickupId: '', otherPlace: '' });
const field = 'min-h-11 min-w-0 w-full rounded-md border border-input bg-background px-3 py-2 text-base';
const dh = (amount: number) => `${Math.round(amount).toLocaleString('fr-FR')} DH`;
export default function RentalRequestDialog() {
  const { selectedCars } = useComparison();
  const tr = useTr();
  const errorText = (message: string) => ({
    'Choisissez un véhicule avant de continuer.': tr(message, 'Choose a car to continue.', 'Elige un coche para continuar.'),
    [RENTAL_PERIOD_MESSAGE]: tr(message, 'Rentals last at least 3 days. Check your dates.', 'El alquiler dura al menos 3 días. Revisa tus fechas.'),
    'La date de départ ne peut pas être passée.': tr(message, 'The pick-up date cannot be in the past.', 'La fecha de recogida no puede ser pasada.'),
    'Précisez le lieu de prise en charge.': tr(message, 'Choose the pick-up place.', 'Indica el lugar de recogida.'),
  } as Record<string, string>)[message] ?? message;
  const selectionRef = useRef<string[]>([]);
  useEffect(() => { selectionRef.current = [...new Set(selectedCars.map(car => normalizeVehicleName(car.name)))]; }, [selectedCars]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ConfirmedRental>(empty);
  const [review, setReview] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [sent, setSent] = useState<ConfirmedRental | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  // Suivi des étapes (une fois par ouverture) : ouverture, début de saisie, erreur, récapitulatif, envoi, fermeture.
  const stepRef = useRef<{ started: boolean; reviewed: string; sent: boolean; invalid?: string[] }>({ started: false, reviewed: '', sent: false });
  const step = (eventName: string, properties: Record<string, string | number> = {}) => { void analyticsTracker.trackEvent({ eventType: 'engagement', eventName, properties: { form_name: 'reservation', ...properties } }); };
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
      const vehicles = (draft.vehicles?.some(isOtherVehicle) ? draft.vehicles : selectionRef.current.length ? selectionRef.current : draft.vehicles?.length ? draft.vehicles : inferred ? [inferred] : []).map(normalizeVehicleName).filter(n => isOtherVehicle(n) || rentalVehicleNames.includes(n as typeof rentalVehicleNames[number]));
      const next = { ...empty(), ...draft, vehicles, startDate: draft.startDate || '', endDate: draft.endDate || '', pickupId: draft.pickupId || '', otherPlace: '' };
      setValue(next);
      // Moins de friction : tout est déjà rempli (fiche voiture, catalogue avec dates et lieu) -> récapitulatif direct.
      setError(null); setReview(!validateRental(next)); setConfirmed(false); setSent(null); setOpen(true);
      stepRef.current = { started: false, reviewed: '', sent: false };
      step('booking_form_open', { element_type: validateRental(next) ? 'formulaire' : 'recapitulatif_direct', quantity: vehicles.length, ...(next.pickupId ? { pickup_point: next.pickupId } : {}) });
    };
    const listener = () => { const draft = takePendingRental(); if (draft) show(draft); };
    window.addEventListener(RENTAL_REQUEST_EVENT, listener);
    const pending = takePendingRental();
    if (pending) show(pending); else if (new URLSearchParams(window.location.search).get('demande') === '1') show(rentalDefaults());
    return () => window.removeEventListener(RENTAL_REQUEST_EVENT, listener);
  }, []);
  const change = (patch: Partial<ConfirmedRental>) => {
    if (!stepRef.current.started) { stepRef.current.started = true; step('booking_form_start', { element_type: Object.keys(patch)[0] || 'champ' }); }
    setValue(v => ({ ...v, ...patch })); setError(null); setReview(false); setConfirmed(false);
  };
  const issueCode = (issue: string) => issue.startsWith('Choisissez') ? 'voiture' : issue === RENTAL_PERIOD_MESSAGE ? 'duree' : issue.startsWith('La date') ? 'date_passee' : issue.startsWith('Précisez') ? 'lieu' : 'autre';
  useEffect(() => {
    if (!open || !review || sent) return;
    const key = `${value.vehicles.join('/')}|${value.startDate}|${value.endDate}|${value.pickupId}`;
    if (stepRef.current.reviewed === key) return;
    stepRef.current.reviewed = key;
    const estimate = value.vehicles[0] ? rentalEstimate(value.vehicles[0], value.startDate, value.endDate, value.city) : null;
    // « Formulaires préparés » du tableau /analytics = récapitulatif affiché.
    step('form_prepared', { city: value.city, quantity: value.vehicles.length, ...(value.pickupId ? { pickup_point: value.pickupId } : {}), ...(estimate ? { price: estimate.total, days: estimate.days } : {}) });
  }, [open, review, sent, value]);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const issue = validateRental(value); if (issue) { step('booking_validation_error', { element_type: issueCode(issue) }); setError({ message: errorText(issue) }); return; }
    if (!review) { setReview(true); return; }
    const booking = { ...value, reference: value.reference || newBookingReference() };
    if (openConfirmedRental(booking)) {
      // Trace côté Benatna : numéro, voitures, lieu, durée et prix estimé (tableau /analytics).
      const estimate = rentalEstimate(booking.vehicles[0], booking.startDate, booking.endDate, booking.city);
      void analyticsTracker.trackEvent({ eventType: 'conversion', eventName: 'booking_submitted', properties: { content_id: booking.reference, vehicle_name: booking.vehicles.map(v => isOtherVehicle(v) ? 'Autre modèle' : v).join(' / ').slice(0, 100), city: booking.city, pickup_point: booking.pickupId, element_type: booking.payment === 'full' ? 'paiement_total' : 'acompte_30_plus_500', quantity: booking.vehicles.length, ...(estimate ? { price: estimate.total, days: estimate.days } : {}) } });
      stepRef.current.sent = true;
      setSent(booking); setValue(empty()); setReview(false); setConfirmed(false);
    }
    else { step('booking_whatsapp_blocked'); setError({ message: tr('WhatsApp n’a pas pu s’ouvrir. Autorisez les fenêtres puis réessayez. Votre réservation est conservée.', 'WhatsApp could not open. Allow pop-ups and try again. Your booking is kept.', 'WhatsApp no se pudo abrir. Permite las ventanas emergentes e inténtalo de nuevo. Tu reserva se conserva.') }); }
  };
  const vehicleFields = value.vehicles.length ? value.vehicles : [''];
  const firstEstimate = review && value.vehicles[0] ? rentalEstimate(value.vehicles[0], value.startDate, value.endDate, value.city) : null;
  return <Dialog open={open} onOpenChange={next => { if (!next && !stepRef.current.sent && !sent) step('booking_form_close', { element_type: review ? 'recapitulatif' : 'saisie' }); setOpen(next); if (!next) { setValue(empty()); setError(null); setSent(null); } }}>
    <DialogContent className="max-w-lg max-h-[90dvh] overflow-y-auto overscroll-contain [&_button]:whitespace-normal [&_button]:h-auto [&_button]:min-h-11">
      {sent ? <>
        <DialogHeader className="pr-8"><DialogTitle ref={titleRef} tabIndex={-1} className="flex items-center gap-2"><CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />{tr('Réservation enregistrée', 'Booking registered', 'Reserva registrada')}</DialogTitle><DialogDescription>{tr('Votre numéro de réservation', 'Your booking number', 'Tu número de reserva')} : <strong className="text-foreground">{sent.reference}</strong></DialogDescription></DialogHeader>
        <ol className="space-y-3 text-sm">
          <li><strong>1. {tr('Confirmation sous 1 heure', 'Confirmation within 1 hour', 'Confirmación en 1 hora')}</strong><br />{tr('Benatna vous répond sur WhatsApp avec la voiture confirmée, le prix total et les coordonnées du virement.', 'Benatna replies on WhatsApp with the confirmed car, the total price and bank transfer details.', 'Benatna te responde por WhatsApp con el coche confirmado, el precio total y los datos de la transferencia.')}</li>
          <li><strong>2. {sent.payment === 'full' ? tr('Paiement de 100 % par virement', 'Full payment by bank transfer', 'Pago del 100 % por transferencia') : tr('Acompte de 30 % + 500 DH par virement', '30% deposit + 500 MAD by bank transfer', 'Anticipo del 30 % + 500 MAD por transferencia')}</strong><br />{tr('Dès réception, votre réservation est garantie, sans caution à la remise. Annulation gratuite jusqu’à 48 h avant le départ (acompte remboursé à 100 %), puis remboursement de 50 % jusqu’au départ.', 'Once received, your booking is guaranteed, with no security deposit at handover. Free cancellation up to 48 hours before pick-up (100% of the deposit refunded), then 50% refunded until pick-up.', 'Al recibirlo, tu reserva queda garantizada, sin fianza en la entrega. Cancelación gratuita hasta 48 horas antes de la recogida (anticipo reembolsado al 100 %), después reembolso del 50 % hasta la recogida.')}</li>
          <li><strong>3. {tr('Remise de la voiture', 'Car handover', 'Entrega del coche')}</strong><br />{tr('Au lieu et à l’heure convenus, livraison gratuite.', 'At the agreed place and time, free delivery.', 'En el lugar y la hora acordados, entrega gratuita.')}</li>
        </ol>
        <p className="text-sm text-muted-foreground">{tr('Gardez ce numéro : il figure dans votre message WhatsApp et sert à suivre votre réservation.', 'Keep this number: it is in your WhatsApp message and is used to track your booking.', 'Guarda este número: aparece en tu mensaje de WhatsApp y sirve para seguir tu reserva.')}</p>
        <Button type="button" variant="outline" className="w-full" onClick={() => { if (sent) openConfirmedRental(sent); }}>{tr('Rouvrir WhatsApp', 'Open WhatsApp again', 'Abrir WhatsApp de nuevo')}</Button>
        <Button type="button" className="w-full" onClick={() => { setOpen(false); setSent(null); }}>{tr('Terminer', 'Done', 'Terminar')}</Button>
      </> : <>
      <DialogHeader className="pr-8"><DialogTitle ref={titleRef} tabIndex={-1}>{review ? tr('Vérifiez votre réservation', 'Check your booking', 'Revisa tu reserva') : tr('Réserver ma voiture', 'Book my car', 'Reservar mi coche')}</DialogTitle><DialogDescription>{tr('Dates, voiture et lieu de prise en charge. Benatna vous confirme la réservation sous 1 heure sur WhatsApp, avec le prix total et les coordonnées du virement.', 'Dates, car and pick-up place. Benatna confirms your booking within 1 hour on WhatsApp, with the total price and bank transfer details.', 'Fechas, coche y lugar de recogida. Benatna confirma tu reserva en 1 hora por WhatsApp, con el precio total y los datos de la transferencia.')}</DialogDescription></DialogHeader>
      <form onSubmit={submit} onInvalidCapture={event => { const target = event.target as HTMLInputElement; const name = ((target.getAttribute('aria-label') || '').startsWith('Modèle souhaité') ? 'autre_modele' : target.type === 'date' ? 'date' : target.tagName === 'SELECT' ? (target.getAttribute('aria-label') || '').startsWith('Véhicule') ? 'voiture' : 'lieu' : 'adresse'); if (!stepRef.current.invalid?.includes(name)) { stepRef.current.invalid = [...(stepRef.current.invalid || []), name]; step('booking_validation_error', { element_type: name }); } }} className="min-w-0 space-y-4">
        {error && <p ref={errorRef} tabIndex={-1} role="alert" className="text-sm text-destructive">{error.message}</p>}
        {!review ? <>
          <fieldset className="space-y-3">
            <legend className="font-medium">{tr("Voitures souhaitées, par ordre de préférence", "Preferred cars, in order", "Coches deseados, por orden de preferencia")}</legend>
            <p className="text-sm text-muted-foreground">{tr("Jusqu’à 3 voitures : nous confirmons la première disponible.", "Up to 3 cars: we confirm the first one available.", "Hasta 3 coches: confirmamos el primero disponible.")}</p>
            {vehicleFields.map((vehicle, index) => <div key={index} className="flex items-end gap-2">
              <label className="block flex-1 min-w-0 space-y-1"><span>{tr('Choix', 'Choice', 'Opción')} {index + 1}</span>
                <select required aria-label={index === 0 ? 'Véhicule souhaité' : `Véhicule souhaité ${index + 1}`} className={field} value={isOtherVehicle(vehicle) ? OTHER_VEHICLE_PREFIX : vehicle} onChange={e => { const vehicles = [...value.vehicles]; vehicles[index] = e.target.value; change({ vehicles }); }}>
                  <option value="">{tr("Choisir un modèle", "Choose a model", "Elegir un modelo")}</option>
                  {rentalVehicleNames.map(name => <option key={name} value={name} disabled={name !== vehicle && value.vehicles.includes(name)}>{name}</option>)}
                  <option value={OTHER_VEHICLE_PREFIX} disabled={!isOtherVehicle(vehicle) && value.vehicles.some(isOtherVehicle)}>{tr("Autre modèle, sur demande", "Other model, on request", "Otro modelo, bajo pedido")}</option>
                </select>
                {isOtherVehicle(vehicle) && <span className="block space-y-1 pt-1"><input required minLength={2} maxLength={60} aria-label={`Modèle souhaité, choix ${index + 1}`} placeholder={tr("Ex. : Hyundai i10, Toyota Yaris", "E.g. Hyundai i10, Toyota Yaris", "Ej.: Hyundai i10, Toyota Yaris")} className={field} value={otherVehicleText(vehicle)} onChange={e => { const vehicles = [...value.vehicles]; vehicles[index] = OTHER_VEHICLE_PREFIX + e.target.value; change({ vehicles }); }} /><span className="block text-xs text-muted-foreground">{tr("Voiture de tourisme uniquement. Disponibilité et prix confirmés par Benatna.", "Passenger cars only. Availability and price confirmed by Benatna.", "Solo turismos. Disponibilidad y precio confirmados por Benatna.")}</span></span>}
              </label>
              {vehicleFields.length > 1 && <Button type="button" variant="outline" aria-label={`Retirer le véhicule ${index + 1}`} onClick={() => change({ vehicles: value.vehicles.filter((_, i) => i !== index) })}>{tr('Retirer', 'Remove', 'Quitar')}</Button>}
            </div>)}
            {vehicleFields.length < 3 && <Button type="button" variant="outline" disabled={!value.vehicles.length || value.vehicles.some(v => !v)} onClick={() => change({ vehicles: [...value.vehicles, ''] })}>{tr('Ajouter un autre choix', 'Add another choice', 'Añadir otra opción')}</Button>}
          </fieldset>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><label className="block space-y-1"><span>{tr('Date de départ', 'Pick-up date', 'Fecha de recogida')}</span><input required type="date" aria-label="Date de départ de la demande" min={localToday()} className={field} value={value.startDate} onChange={e => change({ startDate: e.target.value })} /></label><label className="block space-y-1"><span>{tr('Date de retour', 'Return date', 'Fecha de devolución')}</span><input required type="date" aria-label="Date de retour de la demande" min={value.startDate || localToday()} className={field} value={value.endDate} onChange={e => change({ endDate: e.target.value })} /></label></div>
          <p className="text-sm text-muted-foreground">{tr("3 jours minimum.", "3 days minimum.", "Mínimo 3 días.")}</p>
          <label className="block space-y-1"><span>{tr('Ville de prise en charge', 'Pick-up city', 'Ciudad de recogida')}</span><select required aria-label="Ville de prise en charge" className={field} value={value.city} onChange={e => change({ city: e.target.value as ConfirmedRental['city'], pickupId: '', otherPlace: '' })}><option>Casablanca</option><option>Rabat</option></select></label>
          <label className="block space-y-1"><span>{tr('Lieu de prise en charge', 'Pick-up place', 'Lugar de recogida')}</span><select required aria-label="Lieu de prise en charge" className={field} value={value.pickupId} onChange={e => change({ pickupId: e.target.value, otherPlace: '' })}><option value="">{tr("Aéroport, gare ou adresse", "Airport, station or address", "Aeropuerto, estación o dirección")}</option>{pickupPoints.filter(p => p.city === value.city).map(p => <option key={p.id} value={p.id}>{p.name}</option>)}<option value="other">{tr("Hôtel ou autre adresse dans cette ville", "Hotel or other address in this city", "Hotel u otra dirección en esta ciudad")}</option></select></label>
          {value.pickupId === 'other' && <label className="block space-y-1"><span>{tr('Adresse précise', 'Exact address', 'Dirección exacta')}</span><input required minLength={5} maxLength={200} aria-label="Adresse précise de prise en charge" className={field} value={value.otherPlace} onChange={e => change({ otherPlace: e.target.value })} /></label>}
          {value.city === 'Rabat' && <p className="text-sm">{tr("Livraison à Rabat depuis Casablanca.", "Delivery to Rabat from Casablanca.", "Entrega en Rabat desde Casablanca.")}</p>}
          <Button type="submit" className="w-full">{tr("Vérifier ma réservation", "Check my booking", "Revisar mi reserva")}</Button>
        </> : <>
          <dl className="min-w-0 space-y-3 rounded-lg bg-muted p-4 text-sm [overflow-wrap:anywhere]">
            <div><dt className="font-semibold">{tr('Dates', 'Dates', 'Fechas')}</dt><dd>{value.startDate.split('-').reverse().join('/')} → {value.endDate.split('-').reverse().join('/')}{firstEstimate ? ` (${firstEstimate.days} ${tr('jours', 'days', 'días')})` : ''}</dd></div>
            <div><dt className="font-semibold">{tr('Lieu de prise en charge', 'Pick-up place', 'Lugar de recogida')}</dt><dd>{rentalPlace(value)}</dd></div>
            <div><dt className="font-semibold">{value.vehicles.length > 1 ? tr('Voitures, par ordre de préférence', 'Cars, in order of preference', 'Coches, por orden de preferencia') : tr('Voiture', 'Car', 'Coche')}</dt><dd><ol className="space-y-1">{value.vehicles.map((name, index) => { const estimate = rentalEstimate(name, value.startDate, value.endDate, value.city); return <li key={name}>{value.vehicles.length > 1 ? `${index + 1}. ` : ''}{isOtherVehicle(name) ? `${tr('Autre modèle', 'Other model', 'Otro modelo')} : ${otherVehicleText(name).trim()}` : name}{isOtherVehicle(name) ? <span className="opacity-80"> · {tr('prix à confirmer', 'price to be confirmed', 'precio por confirmar')}</span> : null}{estimate ? <span className="font-semibold"> · {tr('environ', 'about', 'aprox.')} {dh(estimate.total)}</span> : null}</li>; })}</ol></dd></div>
            {<div><dt className="font-semibold">{tr('Paiement, sans caution', 'Payment, no security deposit', 'Pago, sin fianza')}</dt><dd className="space-y-2 pt-1">
              <label className="flex gap-2 items-start"><input type="radio" name="payment" className="mt-1 h-4 w-4" checked={value.payment !== 'full'} onChange={() => setValue(v => ({ ...v, payment: 'deposit' }))} /><span>{tr('Acompte de 30 % + 500 DH à la réservation', '30% deposit + 500 MAD when booking', 'Anticipo del 30 % + 500 MAD al reservar')}{firstEstimate ? <> : <strong>{tr('environ', 'about', 'aprox.')} {dh(firstEstimate.total * 0.3 + NO_DEPOSIT_FEE)}</strong></> : null}</span></label>
              <label className="flex gap-2 items-start"><input type="radio" name="payment" className="mt-1 h-4 w-4" checked={value.payment === 'full'} onChange={() => setValue(v => ({ ...v, payment: 'full' }))} /><span>{tr('Tout payer avant la location, sans supplément', 'Pay everything before the rental, no extra fee', 'Pagar todo antes del alquiler, sin suplemento')}{firstEstimate ? <> : <strong>{tr('environ', 'about', 'aprox.')} {dh(firstEstimate.total)}</strong></> : null}</span></label>
              <p className="opacity-80">{tr('Par virement', 'By bank transfer', 'Por transferencia')}{!firstEstimate ? tr(', montant confirmé par Benatna avec la disponibilité', ', amount confirmed by Benatna with availability', ', importe confirmado por Benatna con la disponibilidad') : value.vehicles.length > 1 ? tr(', montants pour le premier choix', ', amounts for the first choice', ', importes para la primera opción') : ''}.</p>
            </dd></div>}
            {value.notes && <div><dt className="font-semibold">{tr('Précisions', 'Notes', 'Precisiones')}</dt><dd className="whitespace-pre-wrap">{value.notes}</dd></div>}
          </dl>
          <p className="text-sm">{tr('Prix estimés selon nos tarifs pour vos dates. Benatna vous répond sous 1 heure avec la voiture confirmée, le prix total exact et les coordonnées du virement. Votre réservation est garantie dès réception de l’acompte, remboursé à 100 % en cas d’annulation jusqu’à 48 h avant le départ, à 50 % ensuite. Livraison gratuite, convenue à l’avance.', 'Prices estimated from our rates for your dates. Benatna replies within 1 hour with the confirmed car, the exact total price and bank transfer details. Your booking is guaranteed once the deposit is received; fully refunded if you cancel up to 48 hours before pick-up, 50% after that. Free delivery, arranged in advance.', 'Precios estimados según nuestras tarifas para tus fechas. Benatna responde en 1 hora con el coche confirmado, el precio total exacto y los datos de la transferencia. Tu reserva queda garantizada al recibir el anticipo, reembolsado al 100 % si cancelas hasta 48 horas antes de la recogida, al 50 % después. Entrega gratuita, acordada de antemano.')}</p>
          <Button type="submit" className="w-full">{tr('Réserver sur WhatsApp', 'Book on WhatsApp', 'Reservar por WhatsApp')}</Button><Button type="button" variant="outline" className="w-full" onClick={() => { setReview(false); setConfirmed(false); setError(null); titleRef.current?.focus(); titleRef.current?.scrollIntoView({ block: 'nearest' }); }}>{tr('Modifier ma réservation', 'Edit my booking', 'Modificar mi reserva')}</Button>
        </>}
      </form>
      </>}
    </DialogContent>
  </Dialog>;
}
