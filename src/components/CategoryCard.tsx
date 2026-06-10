"use client";

import Link from "next/link";
import { type Category } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import { CategoryMotif, ArrowRight } from "./icons";

export default function CategoryCard({ category }: { category: Category }) {
  const { locale } = useSettings();

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="focus-ring glossy sheen hover-lift group relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)] border border-clay/60 p-6 shadow-[var(--shadow-soft)] hover:border-terracotta/40 hover:shadow-[var(--shadow-lift)]"
      style={{
        background: `linear-gradient(160deg, ${category.accentSoft} 0%, color-mix(in oklab, ${category.accentSoft} 40%, var(--color-parchment)) 100%)`,
      }}
    >
      <CategoryMotif
        category={category.id}
        className="absolute -bottom-6 -right-4 h-36 w-36 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
        style={{ color: category.accent, opacity: 0.28 }}
      />
      <div className="relative">
        <h3 className="font-display text-2xl">{category.name[locale]}</h3>
        <p className="mt-2 max-w-[18ch] text-sm leading-relaxed text-mocha">
          {category.blurb[locale]}
        </p>
      </div>
      <span
        className="relative mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full bg-parchment/80 text-espresso transition-transform duration-200 group-hover:translate-x-1"
        style={{ color: category.accent }}
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
