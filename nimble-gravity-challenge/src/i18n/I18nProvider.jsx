import { createContext, useContext, useMemo, useState } from "react";
import { translations } from "./translations";

const I18nContext = createContext(null);

const LS_LANG_KEY = "job-apply:lang";

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_LANG_KEY);
      return saved === "es" || saved === "en" ? saved : "es";
    } catch {
      return "es";
    }
  });

  const t = useMemo(() => {
    return (key) => translations[lang]?.[key] ?? translations.es[key] ?? key;
  }, [lang]);

  const setLangPersisted = (next) => {
    setLang(next);
    try {
      localStorage.setItem(LS_LANG_KEY, next);
    } catch {}
  };

  const value = useMemo(
    () => ({ lang, setLang: setLangPersisted, t }),
    [lang, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
