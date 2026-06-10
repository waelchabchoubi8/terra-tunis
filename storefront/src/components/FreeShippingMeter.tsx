"use client";

import { useSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/money";
import { FREE_SHIPPING_OVER_EUR } from "@/lib/shipping";
import { CheckIcon, ShipIcon } from "./icons";

/** Progress toward the free-shipping threshold — shown in cart drawer + cart page. */
export default function FreeShippingMeter({
  subtotalEUR,
  className = "",
}: {
  subtotalEUR: number;
  className?: string;
}) {
  const { t, currency, locale } = useSettings();
  const pct = Math.min(100, (subtotalEUR / FREE_SHIPPING_OVER_EUR) * 100);
  const remaining = Math.max(0, FREE_SHIPPING_OVER_EUR - subtotalEUR);
  const unlocked = remaining <= 0;

  return (
    <div className={className}>
      <p className="flex items-center gap-2 text-xs font-semibold">
        {unlocked ? (
          <>
            <CheckIcon className="h-4 w-4 shrink-0 text-olive" />
            <span className="text-olive">{t("shipping.unlocked")}</span>
          </>
        ) : (
          <>
            <ShipIcon className="h-4 w-4 shrink-0 text-terracotta" />
            <span className="text-mocha">
              <strong className="font-semibold text-espresso">
                {formatPrice(remaining, currency, locale)}
              </strong>{" "}
              {t("shipping.left")}
            </span>
          </>
        )}
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-clay/60"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t("cart.shipping")}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${
            unlocked ? "bg-olive" : "bg-terracotta"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
