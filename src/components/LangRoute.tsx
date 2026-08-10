import { useEffect, ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Wrapper de route qui force la langue selon le préfixe d'URL (/en, /es).
 * Permet des URLs crawlables par Google pour le SEO international,
 * en réutilisant les traductions existantes (en.json / es.json).
 */
const LangRoute = ({ lang, children }: { lang: "fr" | "en" | "es"; children: ReactNode }) => {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (language !== lang) setLanguage(lang);
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, language]);

  return <>{children}</>;
};

export default LangRoute;
