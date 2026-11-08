import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AD_CONSENT_EVENT, AD_CONSENT_KEY, AD_PREFERENCES_EVENT, advertisingChoice, metaPublicPath, saveAdvertisingChoice, trackMetaPage, type AdvertisingChoice } from '@/utils/metaMeasurement';

export const MetaPixel = () => {
  const { pathname } = useLocation();
  const [choice, setChoice] = useState(advertisingChoice);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const sync = () => { setChoice(advertisingChoice()); trackMetaPage(window.location.pathname); };
    const open = () => setEditing(true);
    const storage = (event: StorageEvent) => { if (event.key === AD_CONSENT_KEY || event.key === null) sync(); };
    window.addEventListener(AD_CONSENT_EVENT, sync);
    window.addEventListener(AD_PREFERENCES_EVENT, open);
    window.addEventListener('storage', storage);
    return () => {
      window.removeEventListener(AD_CONSENT_EVENT, sync);
      window.removeEventListener(AD_PREFERENCES_EVENT, open);
      window.removeEventListener('storage', storage);
    };
  }, []);
  useEffect(() => { trackMetaPage(pathname); }, [pathname]);
  const choose = (value: AdvertisingChoice) => { saveAdvertisingChoice(value); setChoice(value); setEditing(false); };
  if (!metaPublicPath(pathname) || (choice !== null && !editing)) return null;
  return (
    <section aria-label="Cookies publicitaires" className="fixed bottom-20 left-3 right-3 z-[60] mx-auto max-w-lg rounded-xl border border-border bg-background p-3 text-foreground shadow-xl md:bottom-4 md:left-auto md:right-4">
      <h2 className="text-sm font-semibold">Cookies publicitaires</h2>
      <p className="mt-1 text-sm">Avec votre accord, Meta mesure nos publicités (pages vues, ouvertures de WhatsApp). Aucune donnée de demande n’est transmise.</p>
      <details className="mt-1 text-xs text-muted-foreground"><summary className="cursor-pointer underline min-h-8 inline-flex items-center">En savoir plus</summary><p className="mt-1">Avec votre accord, Meta (Facebook et Instagram) reçoit les pages consultées et les ouvertures de WhatsApp pour mesurer nos publicités. Aucun texte de demande, date de location, téléphone ou email n’est transmis par Benatna.</p><p className="mt-1">Meta reçoit aussi les informations techniques de la connexion et peut utiliser ses cookies publicitaires. Votre choix est conservé 180 jours sur cet appareil et peut être changé via « Cookies publicitaires » en bas de page. Le site fonctionne aussi si vous refusez.</p><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-8 items-center underline">Confidentialité Meta</a></details>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose('refused')} className="min-h-11 rounded-md border border-foreground bg-background px-3 py-2 text-sm font-semibold text-foreground">Refuser</button>
        <button type="button" onClick={() => choose('accepted')} className="min-h-11 rounded-md border border-foreground bg-background px-3 py-2 text-sm font-semibold text-foreground">Accepter</button>
      </div>
    </section>
  );
};
