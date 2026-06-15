import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import frTranslations from "@/translations/fr.json";
import enTranslations from "@/translations/en.json";
import esTranslations from "@/translations/es.json";

type Language = "fr" | "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Init = "fr" (valeur pré-rendue côté build). On NE lit PAS localStorage ici :
  // le premier rendu client doit matcher le HTML pré-rendu pour éviter tout
  // hydration mismatch / flash. La langue sauvegardée est appliquée en useEffect
  // après le montage.
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("benatna-language") as Language | null;
      if (saved && saved !== language) setLanguageState(saved);
    } catch {
      /* Safari mode privé peut throw — on garde "fr" */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("benatna-language", lang);
    } catch {
      /* ignore */
    }
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    const keys = key.split(".");
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
