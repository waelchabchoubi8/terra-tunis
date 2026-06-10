"use client";

import Link from "next/link";
import { getBrand, getCategory, ratingFor, type Product } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import ProductArt from "./ProductArt";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";
import RatingStars from "./RatingStars";
import { ProvenanceChip } from "./ProvenanceBand";

export default function ProductCard({ product }: { product: Product }) {
  const { locale } = useSettings();
  const brand = getBrand(product.brandId);
  const category = getCategory(product.categoryId);
  const rating = ratingFor(product);

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="focus-ring glossy sheen hover-lift relative block overflow-hidden rounded-[var(--radius-card)] border border-clay/60 bg-parchment shadow-[var(--shadow-soft)] group-hover:border-terracotta/40 group-hover:shadow-[var(--shadow-lift)]"
      >
        <ProductArt
          category={product.categoryId}
          label={product.name[locale]}
          className="aspect-[4/5] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {product.stock === "out" && (
          <span className="absolute left-3 top-3 rounded-full bg-[#0a0a0d]/85 px-3 py-1 text-xs font-semibold text-espresso backdrop-blur">
            {locale === "sv" ? "Slutsåld" : "Sold out"}
          </span>
        )}
        {product.stock === "low" && (
          <span className="absolute left-3 top-3 rounded-full bg-[#0a0a0d]/85 px-3 py-1 text-xs font-semibold text-gold-soft backdrop-blur">
            {locale === "sv" ? "Få kvar" : "Low stock"}
          </span>
        )}
        {/* Signature provenance chip — origin ⇢ Sweden */}
        <ProvenanceChip
          origin={product.origin[locale]}
          className="absolute bottom-3 left-3"
        />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <p className="eyebrow text-terracotta">{category?.name[locale]}</p>
          <RatingStars stars={rating.stars} className="hidden sm:inline-flex" />
        </div>
        <h3 className="mt-1 font-display text-xl leading-snug">
          <Link
            href={`/product/${product.slug}`}
            className="focus-ring transition-colors hover:text-terracotta"
          >
            {product.name[locale]}
          </Link>
        </h3>
        {brand && (
          <Link
            href={`/brands/${brand.slug}`}
            className="focus-ring mt-0.5 w-fit text-sm text-mocha transition-colors hover:text-espresso"
          >
            {brand.name}
          </Link>
        )}

        <div className="mt-3 flex items-end justify-between gap-3 pt-1">
          <Price
            eur={product.priceEUR}
            className="font-display text-2xl font-semibold text-espresso"
          />
          <AddToCartButton productId={product.id} stock={product.stock} variant="compact" />
        </div>
      </div>
    </article>
  );
}
