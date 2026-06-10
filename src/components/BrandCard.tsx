"use client";

import Link from "next/link";
import { productsByBrand, type Brand } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import { ArrowRight, MapPinIcon } from "./icons";

export default function BrandCard({ brand }: { brand: Brand }) {
  const { locale, t } = useSettings();
  const count = productsByBrand(brand.id).length;
  const monogram = brand.name
    .split(" ")
    .filter((w) => !["de", "les", "el"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="focus-ring glossy sheen hover-lift group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-clay/60 bg-parchment shadow-[var(--shadow-soft)] hover:border-terracotta/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div
        className="relative h-36 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${brand.accentSoft} 0%, color-mix(in oklab, ${brand.accent} 35%, var(--color-parchment)) 100%)`,
        }}
      >
        <span
          className="absolute -right-2 -top-4 select-none font-display text-[7rem] font-semibold leading-none transition-transform duration-500 group-hover:scale-105"
          style={{ color: brand.accent, opacity: 0.22 }}
          aria-hidden="true"
        >
          {monogram}
        </span>
        <span
          className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-parchment/80 px-2.5 py-1 text-xs font-semibold text-mocha backdrop-blur"
        >
          <MapPinIcon className="h-3.5 w-3.5" />
          {brand.region[locale]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl">{brand.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-mocha">
          {brand.tagline[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between pt-1 text-sm">
          <span className="text-stone">
            {count} {count === 1 ? t("common.product") : t("common.products")}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-terracotta transition-transform duration-200 group-hover:translate-x-0.5">
            {t("common.explore")}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
