"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/settings";
import { getBrand, getVariant } from "@/lib/data";
import { useCatalogue } from "@/lib/catalogue-context";
import { shippingForSubtotal } from "@/lib/shipping";
import ProductArt from "@/components/ProductArt";
import Price from "@/components/Price";
import ProductCard from "@/components/ProductCard";
import FreeShippingMeter from "@/components/FreeShippingMeter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  MinusIcon,
  PlusIcon,
  CloseIcon,
  ArrowRight,
  CartIcon,
  ShieldIcon,
} from "@/components/icons";

export default function CartPage() {
  const { t, locale } = useSettings();
  const { lines, ready, subtotalEUR, setQty, remove } = useCart();
  const { products, getById } = useCatalogue();

  if (!ready) {
    return (
      <div className="container-pad py-12" aria-busy="true">
        <div className="skeleton h-10 w-56" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="skeleton h-28 w-full" />
            ))}
          </div>
          <div className="skeleton h-72 w-full" />
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-pad py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-terracotta/10 text-terracotta">
          <CartIcon className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-4xl">{t("cart.title")}</h1>
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
  const inCart = new Set(lines.map((l) => l.productId));
  const crossSell = products.filter((p) => !inCart.has(p.id) && p.stock !== "out").slice(0, 4);

  return (
    <div className="container-pad py-12">
      <h1 className="font-display text-4xl sm:text-5xl">{t("cart.title")}</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Lines */}
        <ul className="divide-y divide-clay/70 border-y border-clay/70">
          {lines.map((line) => {
            const product = getById(line.productId);
            if (!product) return null;
            const brand = getBrand(product.brandId);
            const variant = getVariant(product, line.variantId);
            return (
              <li
                key={`${line.productId}:${line.variantId}`}
                className="flex gap-4 rounded-xl px-2 py-5 transition-colors hover:bg-sand/40"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="focus-ring shrink-0"
                >
                  <ProductArt
                    category={product.categoryId}
                    label={product.name[locale]}
                    className="h-24 w-24 rounded-xl border border-clay/60 sm:h-28 sm:w-28"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="focus-ring font-display text-lg leading-tight transition-colors hover:text-terracotta"
                      >
                        {product.name[locale]}
                      </Link>
                      {brand && (
                        <p className="text-sm text-mocha">
                          {t("cart.soldBy")} {brand.name}
                        </p>
                      )}
                      <p className="mt-0.5 text-sm text-stone">{variant.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.productId, line.variantId)}
                      aria-label={t("cart.remove")}
                      className="focus-ring grid h-9 w-9 cursor-pointer place-items-center rounded-full text-stone transition-colors hover:bg-sand hover:text-tunis"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <div className="inline-flex items-center rounded-full border border-clay bg-parchment">
                      <button
                        type="button"
                        onClick={() => setQty(line.productId, line.variantId, line.qty - 1)}
                        aria-label="Decrease quantity"
                        className="focus-ring grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(line.productId, line.variantId, line.qty + 1)}
                        aria-label="Increase quantity"
                        className="focus-ring grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <Price
                      eur={variant.priceEUR * line.qty}
                      className="font-display text-xl font-semibold"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass rounded-[var(--radius-card)] p-6">
            <h2 className="font-display text-2xl">{t("checkout.orderSummary")}</h2>

            <FreeShippingMeter subtotalEUR={subtotalEUR} className="mt-5" />

            <dl className="mt-5 space-y-3 text-sm">
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
              <Price eur={total} showAlt className="font-display text-2xl font-semibold" />
            </div>

            <Link
              href="/checkout"
              className="focus-ring mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all hover:bg-terracotta-dark active:scale-[0.99]"
            >
              {t("cart.checkout")} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="focus-ring mt-3 flex h-11 items-center justify-center text-sm font-semibold text-espresso transition-colors hover:text-terracotta"
            >
              {t("common.continueShopping")}
            </Link>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-stone">
              <ShieldIcon className="h-3.5 w-3.5" />
              {t("checkout.secure")}
            </p>
          </div>
        </aside>
      </div>

      {/* Cross-sell */}
      {crossSell.length > 0 && (
        <section className="mt-20">
          <Reveal>
            <SectionHeading title={t("product.related")} />
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
            {crossSell.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
