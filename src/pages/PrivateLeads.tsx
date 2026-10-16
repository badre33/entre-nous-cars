import { useEffect, useState, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAdminAccess } from '@/hooks/useAdminAccess';
import { acquisitionCampaigns, acquisitionSources } from '@/data/acquisitionCampaigns';
import { attributionConfidence, isQualifiableLead, leadStatuses, lossReasons, statusNeedsQualification } from '@/utils/privateLeads';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Lead = Tables<'rental_requests'>;
const PAGE_SIZE = 25;
const selectClass = 'border border-input rounded-md bg-background p-2 min-h-10';
const labelClass = 'grid gap-2';
function receivedNow() { const date = new Date(); return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16); }
function LeadEditor({ lead, saved }: { lead: Lead; saved: () => Promise<unknown> }) {
  const [status, setStatus] = useState(lead.status);
  const [city, setCity] = useState(lead.city);
  const [start, setStart] = useState(lead.pickup_date || '');
  const [end, setEnd] = useState(lead.return_date || '');
  const [model, setModel] = useState(lead.vehicle_name || '');
  const currentDetails = { city, pickup_date: start || null, return_date: end || null };
  const [reason, setReason] = useState(lead.loss_reason || '');
  const [notes, setNotes] = useState(lead.notes || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function save() {
    if (start && end && end <= start) { setError('La date de retour doit suivre le départ.'); return; }
    if (statusNeedsQualification(status) && !isQualifiableLead(currentDetails)) { setError('Qualification impossible : préciser Casablanca ou Rabat et une durée de trois jours à six mois.'); return; }
    if (status === 'lost' && !reason) { setError('Choisissez le motif de perte.'); return; }
    setBusy(true); setError('');
    try {
      const { data, error: failure } = await supabase.from('rental_requests').update({ ...currentDetails, vehicle_name: model.trim() || null, status, notes: notes.trim() || null, loss_reason: status === 'lost' ? reason : null }).eq('id', lead.id).select('id');
      if (failure || data?.length !== 1) throw new Error('La modification n’a pas été enregistrée.');
      await saved();
    } catch { setError('Enregistrement non confirmé. Actualisez la liste avant de réessayer.'); }
    finally { setBusy(false); }
  }
  return <article className="border rounded-xl p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-3"><h2 className="text-xl font-semibold">{lead.full_name}</h2><p>{lead.city} · {lead.pickup_date || 'Départ à préciser'} → {lead.return_date || 'Retour à préciser'}</p></div>
    <p><strong>Téléphone :</strong> {lead.phone} · <strong>Modèle :</strong> {lead.vehicle_name || 'À préciser'}</p>
    <p className="text-sm">Contact reçu : {lead.received_at ? new Date(lead.received_at).toLocaleString('fr-FR') : 'Date historique inconnue'} · Campagne : {lead.utm_campaign || 'Inconnue'} · Attribution : {attributionConfidence[lead.attribution_confidence as keyof typeof attributionConfidence] || 'Inconnue'}</p>
    {!isQualifiableLead(currentDetails) && <p className="text-sm">Cette demande peut être suivie comme contact reçu, mais ses informations actuelles ne permettent pas sa qualification ou sa confirmation.</p>}
    <div className="grid gap-4 md:grid-cols-2">
      <label className={labelClass}>Ville demandée<select aria-label="Ville demandée" value={city} onChange={e => setCity(e.target.value)} className={selectClass}>{!['À préciser','Casablanca','Rabat','Hors zone'].includes(city) && <option>{city}</option>}<option>À préciser</option><option>Casablanca</option><option>Rabat</option><option>Hors zone</option></select></label>
      <label className={labelClass}>Modèle demandé<Input value={model} maxLength={100} onChange={e => setModel(e.target.value)} /></label>
      <label className={labelClass}>Départ demandé<Input type="date" value={start} onChange={e => setStart(e.target.value)} /></label>
      <label className={labelClass}>Retour demandé<Input type="date" value={end} onChange={e => setEnd(e.target.value)} /></label>
      <label className={labelClass}>État<select aria-label="État" value={status} onChange={e => setStatus(e.target.value)} className={selectClass}>{lead.status === 'won' && <option value="won">Gagnée (ancien statut, à vérifier)</option>}{Object.entries(leadStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className={labelClass}>Motif de perte<select aria-label="Motif de perte" value={reason} onChange={e => setReason(e.target.value)} className={selectClass} disabled={status !== 'lost'}><option value="">Préciser si perdue</option>{Object.entries(lossReasons).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    </div>
    <label className={labelClass}>Notes privées<Textarea value={notes} maxLength={2000} onChange={e => setNotes(e.target.value)} /></label>
    {error && <p role="alert">{error}</p>}<Button onClick={() => { void save(); }} disabled={busy}>{busy ? 'Enregistrement…' : 'Enregistrer cet état'}</Button>
  </article>;
}
export default function PrivateLeads() {
  const access = useAdminAccess();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const query = useQuery({
    queryKey: ['private-rental-requests', filter, page], enabled: access === 'admin', retry: false,
    queryFn: async ({ signal }) => {
      let request = supabase.from('rental_requests').select('*', { count: 'exact' }).order('created_at', { ascending: false }).order('id', { ascending: true });
      if (filter !== 'all') request = request.eq('status', filter);
      const { data, count, error } = await request.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1).abortSignal(signal);
      if (error || count === null || !Array.isArray(data)) throw error || new Error('Lecture incomplète');
      return { rows: data, total: count };
    },
  });
  useEffect(() => { if (access !== 'admin') queryClient.removeQueries({ queryKey: ['private-rental-requests'] }); }, [access, queryClient]);
  async function refresh() { return queryClient.invalidateQueries({ queryKey: ['private-rental-requests'] }); }
  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget; const values = new FormData(form);
    const text = (name: string) => String(values.get(name) || '').trim();
    const start = text('pickup_date') || null; const end = text('return_date') || null;
    if (start && end && end <= start) { setFormError('La date de retour doit suivre le départ.'); return; }
    const received = new Date(text('received_at'));
    if (!Number.isFinite(received.getTime()) || received.getTime() > Date.now() + 60000) { setFormError('Indiquez quand le contact a réellement été reçu, sans date future.'); return; }
    if (text('attribution_confidence') === 'observed_code' && !text('utm_campaign')) { setFormError('Choisissez la campagne dont le code a été reçu.'); return; }
    setBusy(true); setFormError(''); setSuccess('');
    try {
      const { data, error } = await supabase.from('rental_requests').insert({ full_name: text('full_name'), phone: text('phone'), city: text('city'), pickup_date: start, return_date: end, vehicle_name: text('vehicle_name') || null, received_at: received.toISOString(), status: 'new', utm_source: text('utm_source') || null, utm_campaign: text('utm_campaign') || null, attribution_confidence: text('attribution_confidence'), notes: text('notes') || null }).select('id');
      if (error || data?.length !== 1) throw new Error('not saved');
      form.reset(); setPage(0); await refresh(); setSuccess('Demande reçue enregistrée dans le suivi privé. Elle n’est pas automatiquement qualifiée ou confirmée.');
    } catch { setFormError('Enregistrement non confirmé. Actualisez la liste avant de réessayer pour éviter un doublon.'); }
    finally { setBusy(false); }
  }
  return <>
    <Helmet><title>Suivi privé des demandes | Benatna</title><meta name="robots" content="noindex,nofollow" /><link rel="canonical" href="https://benatna.ma/demandes" /></Helmet>
    <Header />
    <main className="container max-w-5xl py-12 space-y-8">
      <h1 className="text-3xl font-semibold">Suivi privé des demandes</h1>
      <p><Link to="/analytics">Retour aux statistiques</Link></p>
      {access === 'loading' ? <p>Vérification de l’accès administrateur…</p> : access !== 'admin' ? <section><h2 className="text-xl font-semibold">Accès réservé à l’administrateur</h2><p>{access === 'error' ? 'La vérification des droits a échoué. Rechargez la page pour réessayer.' : 'Connectez-vous avec le compte administrateur pour consulter les demandes.'}</p><Link to="/auth">Se connecter</Link></section> : <>
        <p>Enregistrez uniquement un contact réellement reçu. Un clic ou une sortie vers WhatsApp ne crée aucune demande dans ce suivi. Les états de qualification, de réservation et de réalisation sont renseignés par vous.</p>
        <details className="border rounded-xl p-5" open><summary className="font-semibold cursor-pointer">Enregistrer une demande reçue</summary>
          <form onSubmit={event => { void create(event); }} className="grid gap-4 mt-5 md:grid-cols-2">
            <label className={labelClass}>Nom ou repère du contact<Input name="full_name" maxLength={120} required autoComplete="off" /></label>
            <label className={labelClass}>Téléphone du contact<Input name="phone" type="tel" maxLength={40} required autoComplete="off" /></label>
            <label className={labelClass}>Contact reçu le (heure de cet appareil)<Input name="received_at" type="datetime-local" defaultValue={receivedNow()} required /></label>
            <label className={labelClass}>Ville demandée<select aria-label="Ville demandée" name="city" className={selectClass} defaultValue="À préciser"><option>À préciser</option><option>Casablanca</option><option>Rabat</option><option>Hors zone</option></select></label>
            <label className={labelClass}>Départ demandé, si connu<Input name="pickup_date" type="date" /></label>
            <label className={labelClass}>Retour demandé, si connu<Input name="return_date" type="date" /></label>
            <label className={labelClass}>Modèle demandé, si connu<Input name="vehicle_name" maxLength={100} /></label>
            <label className={labelClass}>Source constatée ou déclarée<select aria-label="Source constatée ou déclarée" name="utm_source" className={selectClass}><option value="">Inconnue</option>{[...acquisitionSources, 'direct', 'telephone', 'recommandation'].map(value => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className={labelClass}>Campagne, si identifiée<select aria-label="Campagne, si identifiée" name="utm_campaign" className={selectClass}><option value="">Inconnue</option>{Object.entries(acquisitionCampaigns).map(([value, campaign]) => <option key={value} value={value}>{campaign.code} — {campaign.label}</option>)}</select></label>
            <label className={labelClass}>Fiabilité de l’attribution<select aria-label="Fiabilité de l’attribution" name="attribution_confidence" className={selectClass} defaultValue="unknown">{Object.entries(attributionConfidence).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            <label className={`${labelClass} md:col-span-2`}>Notes privées<Textarea name="notes" maxLength={2000} /></label>
            <p className="md:col-span-2 text-sm">Les dates peuvent rester inconnues pour un contact reçu. Une demande hors zone ou de moins de trois jours peut être suivie comme non qualifiée ou perdue ; elle ne peut pas être qualifiée, proposée ou confirmée.</p>
            {formError && <p role="alert" className="md:col-span-2">{formError}</p>}{success && <p role="status" className="md:col-span-2">{success}</p>}
            <Button type="submit" disabled={busy}>{busy ? 'Enregistrement…' : 'Enregistrer le contact reçu'}</Button>
          </form>
        </details>
        <label className={labelClass}>Filtrer les demandes<select aria-label="Filtrer les demandes" value={filter} onChange={event => { setFilter(event.target.value); setPage(0); }} className={selectClass}><option value="all">Tous les états</option>{Object.entries(leadStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}<option value="won">Ancien statut gagné</option></select></label>
        {query.isPending ? <p>Chargement des demandes…</p> : query.isError ? <section role="alert"><p>Lecture impossible : les données ne sont pas affichées. Le suivi privé peut ne pas encore être activé dans cette base.</p><Button onClick={() => { void query.refetch(); }}>Réessayer</Button></section> : <>
          <p>{query.data.rows.length} demande(s) affichée(s), sur {query.data.total} correspondant au filtre.</p>
          {query.data.rows.map(lead => <LeadEditor key={`${lead.id}:${lead.updated_at}`} lead={lead} saved={refresh} />)}
          <div className="flex gap-4"><Button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Précédentes</Button><Button disabled={(page + 1) * PAGE_SIZE >= query.data.total} onClick={() => setPage(p => p + 1)}>Suivantes</Button></div>
        </>}
      </>}
    </main>
    <Footer />
  </>;
}
