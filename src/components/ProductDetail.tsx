"use client";

import { useState } from "react";
import Link from "next/link";
import {
  defaultVariant,
  getBrand,
  getCategory,
  getVariant,
  productImage,
  productVariants,
  ratingFor,
  relatedProducts,
  type Product,
} from "@/lib/data";
import { useSettings } from "@/lib/settings";
import ProductArt from "./ProductArt";
import Price from "./Price";
import StockBadge from "./StockBadge";
import AddToCartButton from "./AddToCartButton";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import RatingStars from "./RatingStars";
import ProvenanceBand from "./ProvenanceBand";
import Reveal from "./Reveal";
import {
  MinusIcon,
  PlusIcon,
  MapPinIcon,
  ArrowRight,
  ChevronDown,
  ShipIcon,
  ShieldIcon,
} from "./icons";

/** Motif poses for the mock gallery views. */
const VIEWS = ["", "-rotate-6 scale-90", "scale-125", "rotate-6 scale-95"];

export default function ProductDetail({ product }: { product: Product }) {
  const { t, locale } = useSettings();
  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const related = relatedProducts(product, 4);
  const rating = ratingFor(product);
  const image = productImage(product);
  const variants = productVariants(product);
  const [qty, setQty] = useState(1);
  const [view, setView] = useState(0);
  const [variantId, setVariantId] = useState(defaultVariant(product).id);
  const variant = getVariant(product, variantId);
  const stock = variant.stock ?? product.stock;

  return (
    <div className="container-pad py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-stone">
        <Link href="/" className="focus-ring hover:text-espresso">{t("nav.home")}</Link>
        <span>/</span>
        <Link href="/shop" className="focus-ring hover:text-espresso">{t("nav.shop")}</Link>
        <span>/</span>
        <Link href={`/shop?category=${category?.slug}`} className="focus-ring hover:text-espresso">
          {category?.name[locale]}
        </Link>
        <span>/</span>
        <span className="text-mocha">{product.name[locale]}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="sheen overflow-hidden rounded-[var(--radius-card)] border border-clay/60 shadow-[var(--shadow-soft)]">
            <ProductArt
              key={view}
              category={product.categoryId}
              label={product.name[locale]}
              src={image}
              className="animate-rise aspect-square w-full"
              motifClassName={`transition-transform duration-500 ${VIEWS[view]}`}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {VIEWS.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setView(i)}
                aria-label={`${product.name[locale]} — view ${i + 1}`}
                aria-pressed={view === i}
                className={`focus-ring cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 ${
                  view === i
                    ? "border-terracotta shadow-[var(--shadow-glow)]"
                    : "border-clay/60 opacity-70 hover:opacity-100"
                }`}
              >
                <ProductArt
                  category={product.categoryId}
                  src={image}
                  className="aspect-square w-full"
                  motifClassName={m}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info — sticky while the gallery scrolls on desktop */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-terracotta">{category?.name[locale]}</p>
            <StockBadge stock={stock} />
          </div>

          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            {product.name[locale]}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {brand && (
              <Link
                href={`/brands/${brand.slug}`}
                className="focus-ring inline-flex items-center gap-2 text-mocha transition-colors hover:text-espresso"
              >
                <span className="text-sm">{t("common.by")}</span>
                <span className="font-semibold text-espresso underline-offset-4 hover:underline">
                  {brand.name}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-stone">
                  <MapPinIcon className="h-3.5 w-3.5" />
                  {brand.region[locale]}
                </span>
              </Link>
            )}
            <RatingStars stars={rating.stars} count={rating.count} />
          </div>

          <div className="mt-5">
            <Price
              eur={variant.priceEUR}
              showAlt
              className="font-display text-4xl font-semibold text-espresso"
            />
          </div>

          <p className="mt-5 max-w-prose leading-relaxed text-mocha">
            {product.description[locale]}
          </p>

          {/* Size / variant selector */}
          {variants.length > 1 && (
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-espresso">
                  {locale === "sv" ? "Storlek" : "Size"}
                </p>
                <p className="text-sm text-stone">{variant.label}</p>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2.5" role="group" aria-label={locale === "sv" ? "Välj storlek" : "Choose size"}>
                {variants.map((v) => {
                  const active = v.id === variantId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setVariantId(v.id)}
                      className={`focus-ring cursor-pointer rounded-xl border px-4 py-2.5 text-left transition-colors ${
                        active
                          ? "border-terracotta bg-terracotta/5"
                          : "border-clay bg-parchment hover:border-terracotta/40"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-espresso">{v.label}</span>
                      <Price eur={v.priceEUR} className="mt-0.5 block text-xs text-mocha" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity + add */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full border border-clay bg-parchment">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="focus-ring grid h-12 w-12 cursor-pointer place-items-center rounded-full text-espresso transition-colors hover:bg-sand disabled:opacity-40"
                disabled={qty <= 1}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-lg font-semibold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="Increase quantity"
                className="focus-ring grid h-12 w-12 cursor-pointer place-items-center rounded-full text-espresso transition-colors hover:bg-sand"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
            <AddToCartButton
              productId={product.id}
              stock={stock}
              qty={qty}
              variantId={variantId}
              className="flex-1 sm:flex-none"
            />
          </div>

          {/* Signature provenance band */}
          <ProvenanceBand
            origin={product.origin[locale]}
            accent={category?.accent}
            className="mt-8"
          />

          {/* Shipping & promise accordions */}
          <div className="mt-6 divide-y divide-clay/70 rounded-[var(--radius-card)] border border-clay/60 bg-parchment/60">
            <Accordion
              icon={<ShipIcon className="h-4.5 w-4.5" />}
              title={t("product.shipping")}
              body={t("product.shippingBody")}
              defaultOpen
            />
            <Accordion
              icon={<ShieldIcon className="h-4.5 w-4.5" />}
              title={t("product.guarantee")}
              body={t("product.guaranteeBody")}
            />
          </div>

          {/* Details */}
          <dl className="mt-6 divide-y divide-clay/70 border-t border-clay/70 text-sm">
            <Detail label={t("product.origin")} value={product.origin[locale]} />
            <Detail label={t("product.weight")} value={variant.label} />
            <Detail label={t("product.brand")} value={brand?.name ?? "—"} />
            <Detail label={t("product.category")} value={category?.name[locale] ?? "—"} />
          </dl>
        </div>
      </div>

      {/* Brand teaser */}
      {brand && (
        <Reveal>
          <Link
            href={`/brands/${brand.slug}`}
            className="focus-ring hover-lift group mt-16 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[var(--radius-card)] border border-clay/60 p-6 hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:p-8"
            style={{
              background: `linear-gradient(120deg, ${brand.accentSoft} 0%, color-mix(in oklab, ${brand.accentSoft} 40%, var(--color-parchment)) 100%)`,
            }}
          >
            <div className="max-w-2xl">
              <p className="eyebrow text-mocha">{t("product.madeBy")}</p>
              <h3 className="mt-1 font-display text-2xl">{brand.name}</h3>
              <p className="mt-1 text-mocha">{brand.story[0][locale].slice(0, 140)}…</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-espresso transition-transform group-hover:translate-x-1">
              {t("common.readStory")} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <Reveal>
            <SectionHeading title={t("product.related")} />
          </Reveal>
          {/* swipeable on mobile, grid on desktop */}
          <div className="scroll-row mt-8 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => (
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

function Accordion({
  icon,
  title,
  body,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="focus-ring flex cursor-pointer list-none items-center gap-3 px-5 py-4 text-sm font-semibold text-espresso [&::-webkit-details-marker]:hidden">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
          {icon}
        </span>
        <span className="flex-1">{title}</span>
        <ChevronDown className="h-4 w-4 text-stone transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className="px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-mocha">{body}</p>
    </details>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-mocha">{label}</dt>
      <dd className="font-semibold text-espresso">{value}</dd>
    </div>
  );
}
