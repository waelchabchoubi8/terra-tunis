"use client";

import Link from "next/link";
import { brandCover, productsByBrand, type Brand } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ProvenanceBand from "./ProvenanceBand";
import { CategoryMotif, MapPinIcon, ArrowRight } from "./icons";

export default function BrandStorefront({ brand }: { brand: Brand }) {
  const { t, locale } = useSettings();
  const items = productsByBrand(brand.id);
  const monogram = brand.name
    .split(" ")
    .filter((w) => !["de", "les", "el"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  // pick a motif from the brand's first product's category
  const motif = items[0]?.categoryId ?? "olive-oil";
  const cover = brandCover(brand);

  return (
    <div>
      {/* Brand hero */}
      <section
        className="relative overflow-hidden border-b border-clay/60"
        style={{
          background: `linear-gradient(135deg, ${brand.accentSoft} 0%, color-mix(in oklab, ${brand.accent} 30%, var(--color-cream)) 100%)`,
        }}
      >
        {cover ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Left-weighted light scrim keeps the dark hero text readable */}
            <span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, var(--color-cream) 18%, rgba(255,255,255,0.80) 50%, rgba(255,255,255,0.32) 100%)",
              }}
              aria-hidden="true"
            />
          </>
        ) : (
          <>
            <span
              className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[16rem] font-semibold leading-none"
              style={{ color: brand.accent, opacity: 0.16 }}
              aria-hidden="true"
            >
              {monogram}
            </span>
            <CategoryMotif
              category={motif}
              className="absolute -bottom-10 right-[18%] hidden h-56 w-56 lg:block"
              style={{ color: brand.accent, opacity: 0.2 }}
            />
          </>
        )}

        <div className="container-pad relative py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-mocha">
            <Link href="/" className="focus-ring hover:text-espresso">{t("nav.home")}</Link>
            <span>/</span>
            <Link href="/brands" className="focus-ring hover:text-espresso">{t("nav.brands")}</Link>
            <span>/</span>
            <span className="text-espresso">{brand.name}</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-parchment/80 px-3 py-1 text-xs font-semibold text-mocha backdrop-blur">
            <MapPinIcon className="h-3.5 w-3.5" />
            {brand.region[locale]} · {locale === "sv" ? "Grundat" : "Est."} {brand.founded}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] sm:text-6xl">
            {brand.name}
          </h1>
          <p className="mt-3 text-lg text-mocha">{brand.tagline[locale]}</p>
        </div>
      </section>

      {/* Story */}
      <section className="container-pad py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-terracotta">{t("about.eyebrow")}</p>
            <div className="mt-4 space-y-5 text-lg leading-relaxed text-espresso/90">
              {brand.story.map((para, i) => (
                <p key={i}>{para[locale]}</p>
              ))}
            </div>
            <ProvenanceBand
              origin={brand.region[locale]}
              accent={brand.accent}
              className="mt-8"
            />
          </Reveal>
          <aside className="h-fit rounded-[var(--radius-card)] border border-clay/60 bg-sand/60 p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-stone">{t("product.origin")}</dt>
                <dd className="font-semibold">{brand.region[locale]}</dd>
              </div>
              <div>
                <dt className="text-stone">{locale === "sv" ? "Grundat" : "Founded"}</dt>
                <dd className="font-semibold">{brand.founded}</dd>
              </div>
              <div>
                <dt className="text-stone">{t("common.products")}</dt>
                <dd className="font-semibold">{items.length}</dd>
              </div>
            </dl>
            <Link
              href="/shop"
              className="focus-ring mt-5 inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
            >
              {t("common.viewAll")} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Products */}
      <section className="container-pad pb-8">
        <Reveal>
          <SectionHeading title={`${t("nav.shop")} — ${brand.name}`} />
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
