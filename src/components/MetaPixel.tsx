import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTr } from '@/contexts/LanguageContext';
import { AD_CONSENT_EVENT, AD_CONSENT_KEY, AD_PREFERENCES_EVENT, advertisingChoice, metaPublicPath, saveAdvertisingChoice, trackMetaPage, type AdvertisingChoice } from '@/utils/metaMeasurement';

export const MetaPixel = () => {
  const { pathname } = useLocation();
  const tr = useTr();
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
    <section aria-label={tr("Cookies publicitaires", "Advertising cookies", "Cookies publicitarias")} className="fixed bottom-20 left-3 right-3 z-[60] mx-auto max-w-lg rounded-xl border border-border bg-background p-3 text-foreground shadow-xl md:bottom-4 md:left-auto md:right-4">
      <h2 className="text-sm font-semibold">{tr("Cookies publicitaires", "Advertising cookies", "Cookies publicitarias")}</h2>
      <p className="mt-1 text-sm">{tr("Avec votre accord, Meta mesure nos publicités (pages vues, ouvertures de WhatsApp). Aucune donnée de demande n’est transmise.", "With your consent, Meta measures our ads (page views, WhatsApp opens). No request data is shared.", "Con tu consentimiento, Meta mide nuestros anuncios (páginas vistas, aperturas de WhatsApp). No se transmite ningún dato de solicitud.")}</p>
      <details className="mt-1 text-xs text-muted-foreground"><summary className="cursor-pointer underline min-h-8 inline-flex items-center">{tr("En savoir plus", "Learn more", "Más información")}</summary><p className="mt-1">{tr("Avec votre accord, Meta (Facebook et Instagram) reçoit les pages consultées et les ouvertures de WhatsApp pour mesurer nos publicités. Aucun texte de demande, date de location, téléphone ou email n’est transmis par Benatna.", "With your consent, Meta (Facebook and Instagram) receives the pages viewed and WhatsApp opens to measure our ads. Benatna never shares request text, rental dates, phone numbers or emails.", "Con tu consentimiento, Meta (Facebook e Instagram) recibe las páginas consultadas y las aperturas de WhatsApp para medir nuestros anuncios. Benatna no transmite ningún texto de solicitud, fecha de alquiler, teléfono ni email.")}</p><p className="mt-1">{tr("Meta reçoit aussi les informations techniques de la connexion et peut utiliser ses cookies publicitaires. Votre choix est conservé 180 jours sur cet appareil et peut être changé via « Cookies publicitaires » en bas de page. Le site fonctionne aussi si vous refusez.", "Meta also receives technical connection data and may use its advertising cookies. Your choice is kept for 180 days on this device and can be changed via “Advertising cookies” at the bottom of the page. The site works fine if you decline.", "Meta también recibe datos técnicos de la conexión y puede usar sus cookies publicitarias. Tu elección se guarda 180 días en este dispositivo y puedes cambiarla en «Cookies publicitarias» al pie de página. El sitio funciona igual si las rechazas.")}</p><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-8 items-center underline">{tr("Confidentialité Meta", "Meta privacy policy", "Privacidad de Meta")}</a></details>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose('refused')} className="min-h-11 rounded-md border border-foreground bg-background px-3 py-2 text-sm font-semibold text-foreground">{tr("Refuser", "Decline", "Rechazar")}</button>
        <button type="button" onClick={() => choose('accepted')} className="min-h-11 rounded-md border border-foreground bg-background px-3 py-2 text-sm font-semibold text-foreground">{tr("Accepter", "Accept", "Aceptar")}</button>
      </div>
    </section>
  );
};
