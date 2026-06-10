import { RATES, type Currency } from "./settings";
import type { Locale } from "./dictionaries";

const LOCALE_TAG: Record<Locale, string> = {
  en: "en-IE",
  sv: "sv-SE",
};

/** Format a EUR base price into the chosen display currency. */
export function formatPrice(
  eurAmount: number,
  currency: Currency,
  locale: Locale = "en",
): string {
  const converted = eurAmount * RATES[currency];
  const value = currency === "SEK" ? Math.round(converted) : converted;

  return new Intl.NumberFormat(LOCALE_TAG[locale], {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "SEK" ? 0 : 2,
    maximumFractionDigits: currency === "SEK" ? 0 : 2,
  }).format(value);
}
