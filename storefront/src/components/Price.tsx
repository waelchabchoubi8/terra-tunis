"use client";

import { useSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/money";

export default function Price({
  eur,
  className = "",
  showAlt = false,
}: {
  eur: number;
  className?: string;
  /** Also show the price in the other currency, muted. */
  showAlt?: boolean;
}) {
  const { currency, locale } = useSettings();
  const alt = currency === "SEK" ? "EUR" : "SEK";

  return (
    <span className={className}>
      {formatPrice(eur, currency, locale)}
      {showAlt && (
        <span className="ml-2 text-sm font-normal text-stone">
          ≈ {formatPrice(eur, alt, locale)}
        </span>
      )}
    </span>
  );
}
