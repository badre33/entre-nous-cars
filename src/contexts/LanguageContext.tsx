import { createContext, useContext, useState, ReactNode } from "react";
import { getDictionary, initialLanguage, loadLanguage, type Language } from "@/translations/registry";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

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
  // main.tsx charge la langue initiale avant le premier rendu.
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setLanguage = (lang: Language) => {
    try { localStorage.setItem("benatna-language", lang); } catch { /* stockage indisponible */ }
    loadLanguage(lang).then(() => setLanguageState(lang)).catch(() => setLanguageState("fr"));
  };

  const t = (key: string): string => {
    const currentTranslations = getDictionary(language);
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
