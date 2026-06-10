"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useSettings } from "@/lib/settings";
import { useLockBody, useUI } from "@/lib/ui";
import { getBrand, getVariant, products } from "@/lib/data";
import { shippingForSubtotal } from "@/lib/shipping";
import ProductArt from "./ProductArt";
import Price from "./Price";
import FreeShippingMeter from "./FreeShippingMeter";
import {
  ArrowRight,
  CartIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "./icons";

/** Slide-over mini cart, opened from the header or after adding a product. */
export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { lines, subtotalEUR, setQty, remove } = useCart();
  const { t, locale } = useSettings();
  const closeButton = useRef<HTMLButtonElement>(null);

  useLockBody(cartOpen);

  useEffect(() => {
    if (!cartOpen) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, closeCart]);

  if (!cartOpen) return null;

  const shipping = shippingForSubtotal(subtotalEUR);
  const total = subtotalEUR + shipping;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={t("drawer.title")}
    >
      <button
        type="button"
        aria-label={t("common.close")}
        onClick={closeCart}
        className="overlay-in absolute inset-0 h-full w-full cursor-pointer bg-black/60 backdrop-blur-sm"
      />

      <aside className="drawer-in glass absolute inset-y-0 right-0 flex w-full max-w-md flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-clay/60 px-5 py-4">
          <h2 className="flex items-center gap-2.5 font-display text-2xl">
            {t("drawer.title")}
            {lines.length > 0 && (
              <span className="rounded-full bg-terracotta/15 px-2.5 py-0.5 text-xs font-bold text-terracotta">
                {lines.reduce((n, l) => n + l.qty, 0)}
              </span>
            )}
          </h2>
          <button
            ref={closeButton}
            type="button"
            onClick={closeCart}
            aria-label={t("common.close")}
            className="focus-ring grid h-10 w-10 cursor-pointer place-items-center rounded-full text-mocha transition-colors hover:bg-sand hover:text-espresso"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          /* Empty state */
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-terracotta/10 text-terracotta">
              <CartIcon className="h-7 w-7" />
            </span>
            <p className="mt-5 font-display text-xl">{t("drawer.empty.title")}</p>
            <p className="mt-2 text-sm leading-relaxed text-mocha">
              {t("drawer.empty.body")}
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="focus-ring mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-terracotta px-6 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              {t("cart.emptyCta")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Lines */}
            <ul className="flex-1 divide-y divide-clay/50 overflow-y-auto px-5">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                const brand = getBrand(product.brandId);
                const variant = getVariant(product, line.variantId);
                return (
                  <li key={`${line.productId}:${line.variantId}`} className="flex gap-3.5 py-4">
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeCart}
                      className="focus-ring shrink-0"
                    >
                      <ProductArt
                        category={product.categoryId}
                        label={product.name[locale]}
                        className="h-20 w-20 rounded-xl border border-clay/60"
                      />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            href={`/product/${product.slug}`}
                            onClick={closeCart}
                            className="focus-ring block truncate font-display text-base leading-tight transition-colors hover:text-terracotta"
                          >
                            {product.name[locale]}
                          </Link>
                          {brand && (
                            <p className="mt-0.5 truncate text-xs text-stone">
                              {brand.name} · {variant.label}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.productId, line.variantId)}
                          aria-label={t("cart.remove")}
                          className="focus-ring grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full text-stone transition-colors hover:bg-sand hover:text-tunis"
                        >
                          <CloseIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="inline-flex items-center rounded-full border border-clay bg-parchment">
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.variantId, line.qty - 1)}
                            aria-label="Decrease quantity"
                            className="focus-ring grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.productId, line.variantId, line.qty + 1)}
                            aria-label="Increase quantity"
                            className="focus-ring grid h-8 w-8 cursor-pointer place-items-center rounded-full transition-colors hover:bg-sand"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                        <Price
                          eur={variant.priceEUR * line.qty}
                          className="font-display text-base font-semibold"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            <div className="border-t border-clay/60 px-5 py-5">
              <FreeShippingMeter subtotalEUR={subtotalEUR} />
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-mocha">{t("cart.subtotal")}</dt>
                  <dd className="font-semibold">
                    <Price eur={subtotalEUR} />
                  </dd>
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
                <div className="flex justify-between border-t border-clay/60 pt-2.5">
                  <dt className="font-display text-base">{t("cart.grandTotal")}</dt>
                  <dd>
                    <Price
                      eur={total}
                      className="font-display text-lg font-semibold"
                    />
                  </dd>
                </div>
              </dl>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="focus-ring inline-flex h-11 items-center justify-center rounded-full border border-espresso/20 bg-parchment text-sm font-semibold text-espresso transition-colors hover:border-espresso/40 hover:bg-sand"
                >
                  {t("drawer.viewCart")}
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="focus-ring inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-terracotta text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
                >
                  {t("drawer.checkout")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
