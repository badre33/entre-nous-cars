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
  const [language, setLanguageState] = useState<Language>(() => {
    // La langue de l'URL (/en, /es) prime : la page est rendue dans la bonne
    // langue des le premier rendu, y compris pour le prerendu lu par Google.
    const prefix = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";
    if (prefix === "en" || prefix === "es") return prefix;
    let saved: string | null = null;
    try { saved = localStorage.getItem("benatna-language"); } catch { /* stockage indisponible */ }
    return saved === "en" || saved === "es" || saved === "fr" ? saved : "fr";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("benatna-language", lang);
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
