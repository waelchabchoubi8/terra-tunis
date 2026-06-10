"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  dictionaries,
  type Locale,
  type TranslationKey,
} from "./dictionaries";

export type Currency = "SEK" | "EUR";

// Prices in data are stored in EUR (base). Convert to display currency.
export const RATES: Record<Currency, number> = {
  EUR: 1,
  SEK: 11.4,
};

type SettingsContextValue = {
  locale: Locale;
  currency: Currency;
  setLocale: (l: Locale) => void;
  setCurrency: (c: Currency) => void;
  t: (key: TranslationKey) => string;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const LS_LOCALE = "tt.locale";
const LS_CURRENCY = "tt.currency";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [currency, setCurrencyState] = useState<Currency>("SEK");

  // Hydrate from localStorage after mount (avoids SSR mismatch). Deferred to
  // the next frame so the effect body itself stays setState-free.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const l = localStorage.getItem(LS_LOCALE) as Locale | null;
      const c = localStorage.getItem(LS_CURRENCY) as Currency | null;
      if (l === "en" || l === "sv") setLocaleState(l);
      if (c === "SEK" || c === "EUR") setCurrencyState(c);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LS_LOCALE, l);
    document.documentElement.lang = l;
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(LS_CURRENCY, c);
  };

  const t = (key: TranslationKey) => dictionaries[locale][key] ?? key;

  return (
    <SettingsContext.Provider
      value={{ locale, currency, setLocale, setCurrency, t }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

/** Convenience hook returning just the translate function. */
export function useT() {
  return useSettings().t;
}
