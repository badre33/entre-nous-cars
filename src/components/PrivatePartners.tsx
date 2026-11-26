// Liste privée des loueurs partenaires inscrits (affichée dans /demandes, administrateur seulement).
// Suivi de la vérification : statut, registre de commerce, ICE, numéros bancaires (jamais le nom du titulaire), notes.
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { partnerStatuses } from '@/utils/partnerApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Partner = Tables<'partner_agencies'>;
const selectClass = 'border border-input rounded-md bg-white p-2 min-h-10';
const labelClass = 'grid gap-2';

function PartnerEditor({ partner, saved }: { partner: Partner; saved: () => Promise<unknown> }) {
  const [status, setStatus] = useState(partner.status);
  const [rc, setRc] = useState(partner.registre_commerce || '');
  const [ice, setIce] = useState(partner.ice || '');
  const [bank, setBank] = useState(partner.bank_account || '');
  const [notes, setNotes] = useState(partner.admin_notes || '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function save() {
    if (status === 'verifie' && (!rc.trim() || !ice.trim())) { setError('Pour marquer l’agence vérifiée, renseignez le registre de commerce et l’ICE.'); return; }
    setBusy(true); setError('');
    try {
      const verifiedAt = status === 'verifie' ? (partner.verified_at || new Date().toISOString()) : null;
      const { data, error: failure } = await supabase.from('partner_agencies').update({
        status, registre_commerce: rc.trim() || null, ice: ice.trim() || null, bank_account: bank.trim() || null,
        admin_notes: notes.trim() || null, verified_at: verifiedAt,
      }).eq('id', partner.id).select('id');
      if (failure || data?.length !== 1) throw new Error('not saved');
      await saved();
    } catch { setError('Enregistrement non confirmé. Actualisez la liste avant de réessayer.'); }
    finally { setBusy(false); }
  }
  const contact = [partner.phone, partner.email].filter(Boolean).join(' · ');
  return <article className="border rounded-xl p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-3"><h3 className="text-lg font-semibold">{partner.agency_name}</h3><p>{partner.city}{partner.fleet_size ? ` · ${partner.fleet_size} voitures` : ''}</p></div>
    <p><strong>Contact :</strong> {contact} · <span className="text-sm">Inscrit le {new Date(partner.created_at).toLocaleString('fr-FR')}</span></p>
    {partner.message && <p className="text-sm whitespace-pre-line"><strong>Message :</strong> {partner.message}</p>}
    <div className="grid gap-4 md:grid-cols-2">
      <label className={labelClass}>Statut<select aria-label="Statut du loueur" value={status} onChange={e => setStatus(e.target.value)} className={selectClass}>{Object.entries(partnerStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className={labelClass}>Registre de commerce<Input value={rc} maxLength={60} onChange={e => setRc(e.target.value)} /></label>
      <label className={labelClass}>ICE<Input value={ice} maxLength={30} inputMode="numeric" onChange={e => setIce(e.target.value)} /></label>
      <label className={labelClass}>Numéros bancaires (RIB, sans nom du titulaire)<Input value={bank} maxLength={60} autoComplete="off" onChange={e => setBank(e.target.value)} /></label>
    </div>
    <label className={labelClass}>Notes privées (appel de vérification, documents reçus)<Textarea value={notes} maxLength={4000} onChange={e => setNotes(e.target.value)} /></label>
    {error && <p role="alert">{error}</p>}
    <Button onClick={() => { void save(); }} disabled={busy}>{busy ? 'Enregistrement…' : 'Enregistrer ce loueur'}</Button>
  </article>;
}

export default function PrivatePartners() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');
  const query = useQuery({
    queryKey: ['private-partner-agencies', filter], retry: false,
    queryFn: async ({ signal }) => {
      let request = supabase.from('partner_agencies').select('*').order('created_at', { ascending: false }).order('id', { ascending: true });
      if (filter !== 'all') request = request.eq('status', filter);
      const { data, error } = await request.limit(200).abortSignal(signal);
      if (error || !Array.isArray(data)) throw error || new Error('Lecture incomplète');
      return data;
    },
  });
  const refresh = () => queryClient.invalidateQueries({ queryKey: ['private-partner-agencies'] });
  return <section className="space-y-5" aria-labelledby="partners-title">
    <h2 id="partners-title" className="text-2xl font-semibold">Loueurs partenaires</h2>
    <p>Agences inscrites depuis la page Partenaires. Les demandes leur sont transmises à la main sur WhatsApp, sans les coordonnées du client. La vérification (appel, registre de commerce, ICE) se fait après une première demande acceptée.</p>
    <label className={labelClass}>Filtrer les loueurs<select aria-label="Filtrer les loueurs" value={filter} onChange={e => setFilter(e.target.value)} className={selectClass}><option value="all">Tous les statuts</option>{Object.entries(partnerStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    {query.isPending ? <p>Chargement des loueurs…</p> : query.isError ? <div role="alert"><p>Lecture des loueurs impossible. La table des partenaires n’est peut-être pas encore activée dans cette base.</p><Button onClick={() => { void query.refetch(); }}>Réessayer</Button></div> : <>
      <p>{query.data.length} loueur(s) affiché(s).</p>
      {query.data.map(partner => <PartnerEditor key={`${partner.id}:${partner.updated_at}`} partner={partner} saved={refresh} />)}
    </>}
  </section>;
}
