"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/settings";
import { products } from "@/lib/data";
import { shippingForSubtotal } from "@/lib/shipping";
import Price from "@/components/Price";
import FreeShippingMeter from "@/components/FreeShippingMeter";
import {
  CheckIcon,
  ArrowRight,
  ShieldIcon,
  ShipIcon,
  ClockIcon,
} from "@/components/icons";

const PAYMENT_METHODS = [
  { id: "klarna", name: "Klarna", accent: "#ffb3c7", desc: { en: "Pay later or in instalments", sv: "Betala senare eller dela upp" } },
  { id: "swish", name: "Swish", accent: "#1fbe9c", desc: { en: "Instant mobile payment", sv: "Direktbetalning via mobil" } },
  { id: "stripe", name: "Card", accent: "#635bff", desc: { en: "Visa, Mastercard, Amex", sv: "Visa, Mastercard, Amex" } },
  { id: "paypal", name: "PayPal", accent: "#003087", desc: { en: "Pay with your PayPal balance", sv: "Betala med ditt PayPal-saldo" } },
] as const;

export default function CheckoutPage() {
  const { t, locale } = useSettings();
  const { lines, ready, subtotalEUR, clear } = useCart();
  const [payment, setPayment] = useState<string>("klarna");
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="container-pad py-24 text-center">
        <span className="animate-badge-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-olive text-white">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-4xl">{t("checkout.success.title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-mocha">{t("checkout.success.body")}</p>
        <Link
          href="/shop"
          className="focus-ring mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          {t("checkout.success.cta")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (ready && lines.length === 0) {
    return (
      <div className="container-pad py-24 text-center">
        <h1 className="font-display text-4xl">{t("cart.title")}</h1>
        <p className="mt-4 text-mocha">{t("cart.empty")}</p>
        <Link
          href="/shop"
          className="focus-ring mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          {t("cart.emptyCta")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const shipping = shippingForSubtotal(subtotalEUR);
  const total = subtotalEUR + shipping;

  const steps = [
    t("checkout.contact"),
    t("checkout.shippingAddress"),
    t("checkout.payment"),
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clear();
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container-pad py-12">
      <h1 className="font-display text-4xl sm:text-5xl">{t("checkout.title")}</h1>

      {/* Step rail */}
      <ol className="mt-7 flex items-center gap-2 sm:gap-3" aria-hidden="true">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none">
            <span className="flex items-center gap-2">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-terracotta/15 font-display text-sm font-semibold text-terracotta">
                {i + 1}
              </span>
              <span className="hidden text-xs font-semibold text-mocha sm:block">{step}</span>
            </span>
            {i < steps.length - 1 && <span className="hairline flex-1" />}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} className="mt-9 grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-10">
          {/* Contact */}
          <fieldset>
            <legend className="flex items-center gap-3 font-display text-2xl">
              <StepBadge n={1} />
              {t("checkout.contact")}
            </legend>
            <div className="mt-4 grid gap-4">
              <Field id="email" label={t("checkout.email")} type="email" autoComplete="email" />
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset>
            <legend className="flex items-center gap-3 font-display text-2xl">
              <StepBadge n={2} />
              {t("checkout.shippingAddress")}
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="first" label={t("checkout.firstName")} autoComplete="given-name" />
              <Field id="last" label={t("checkout.lastName")} autoComplete="family-name" />
              <Field id="address" label={t("checkout.address")} autoComplete="street-address" className="sm:col-span-2" />
              <Field id="postal" label={t("checkout.postal")} autoComplete="postal-code" />
              <Field id="city" label={t("checkout.city")} autoComplete="address-level2" />
              <Field id="country" label={t("checkout.country")} defaultValue="Sverige" autoComplete="country-name" className="sm:col-span-2" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset>
            <legend className="flex items-center gap-3 font-display text-2xl">
              <StepBadge n={3} />
              {t("checkout.payment")}
            </legend>
            <p className="mt-1 text-sm text-mocha">{t("checkout.payWith")}:</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((m) => {
                const active = payment === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200 focus-within:ring-2 focus-within:ring-terracotta ${
                      active
                        ? "border-terracotta bg-terracotta/5 shadow-[var(--shadow-glow)]"
                        : "border-clay bg-parchment hover:border-espresso/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={active}
                      onChange={() => setPayment(m.id)}
                      className="sr-only"
                    />
                    <span
                      className="grid h-9 w-12 shrink-0 place-items-center rounded-md text-xs font-bold"
                      style={{ background: m.accent, color: m.id === "klarna" ? "#1a1a1a" : "#fff" }}
                      aria-hidden="true"
                    >
                      {m.name.slice(0, 2)}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">{m.name}</span>
                      <span className="block text-xs text-mocha">{m.desc[locale]}</span>
                    </span>
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full border transition-colors ${
                        active ? "border-terracotta bg-terracotta text-white" : "border-clay"
                      }`}
                    >
                      {active && <CheckIcon className="h-3 w-3" />}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-[var(--radius-card)] p-6">
            <h2 className="font-display text-2xl">{t("checkout.orderSummary")}</h2>

            <ul className="mt-5 space-y-3">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <li key={line.productId} className="flex justify-between gap-3 text-sm">
                    <span className="text-mocha">
                      {product.name[locale]} <span className="text-stone">× {line.qty}</span>
                    </span>
                    <Price eur={product.priceEUR * line.qty} className="shrink-0 font-semibold" />
                  </li>
                );
              })}
            </ul>

            <FreeShippingMeter subtotalEUR={subtotalEUR} className="mt-5" />

            <dl className="mt-5 space-y-3 border-t border-clay/70 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-mocha">{t("cart.subtotal")}</dt>
                <dd className="font-semibold"><Price eur={subtotalEUR} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mocha">{t("cart.shipping")}</dt>
                <dd className="font-semibold">
                  {shipping === 0 ? (
                    <span className="text-olive">{t("cart.shippingFree")}</span>
                  ) : (
                    <Price eur={shipping} />
                  )}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between border-t border-clay/70 pt-4">
              <span className="font-display text-lg">{t("cart.grandTotal")}</span>
              <Price eur={total} className="font-display text-2xl font-semibold" />
            </div>

            <button
              type="submit"
              className="focus-ring mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-terracotta text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-terracotta-dark active:scale-[0.99]"
            >
              {t("checkout.placeOrder")}
            </button>

            {/* Trust row */}
            <ul className="mt-5 space-y-2 border-t border-clay/70 pt-4 text-xs text-mocha">
              <li className="flex items-center gap-2">
                <ShieldIcon className="h-4 w-4 shrink-0 text-olive" />
                {t("checkout.secure")}
              </li>
              <li className="flex items-center gap-2">
                <ShipIcon className="h-4 w-4 shrink-0 text-olive" />
                {t("checkout.customs")}
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 shrink-0 text-olive" />
                {t("checkout.fast")}
              </li>
            </ul>

            <p className="mt-4 text-center text-xs leading-relaxed text-stone">
              {t("checkout.demoNote")}
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-terracotta font-display text-base font-semibold text-white">
      {n}
    </span>
  );
}

function Field({
  id,
  label,
  type = "text",
  className = "",
  defaultValue,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-espresso">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className="focus-ring h-11 rounded-lg border border-clay bg-parchment px-3.5 text-espresso transition-colors focus:border-terracotta"
      />
    </div>
  );
}
