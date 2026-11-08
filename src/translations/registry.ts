import fr from "./fr.json";

// Le français est inclus dans le code principal ; l'anglais et l'espagnol ne
// sont téléchargés que pour les visiteurs qui en ont besoin.
export type Language = "fr" | "en" | "es";
type Dictionary = Record<string, unknown>;

const dictionaries: Partial<Record<Language, Dictionary>> = { fr };
const loaders: Record<Exclude<Language, "fr">, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./en.json"),
  es: () => import("./es.json"),
};

export function getDictionary(language: Language): Dictionary {
  return dictionaries[language] ?? fr;
}

export async function loadLanguage(language: Language): Promise<void> {
  if (dictionaries[language] || language === "fr") return;
  dictionaries[language] = (await loaders[language]()).default;
}

export function initialLanguage(): Language {
  // La langue de l'URL (/en, /es) prime : la page est rendue dans la bonne
  // langue dès le premier rendu, y compris pour le prérendu lu par Google.
  const prefix = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "";
  if (prefix === "en" || prefix === "es") return prefix;
  let saved: string | null = null;
  try { saved = localStorage.getItem("benatna-language"); } catch { /* stockage indisponible */ }
  return saved === "en" || saved === "es" || saved === "fr" ? saved : "fr";
}
