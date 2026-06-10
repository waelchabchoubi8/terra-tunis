"use client";

import { useRef } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/settings";
import { brands, categories, featuredProducts, products } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import BrandCard from "@/components/BrandCard";
import Reveal from "@/components/Reveal";
import ProvenanceBand from "@/components/ProvenanceBand";
import RatingStars from "@/components/RatingStars";
import {
  CategoryMotif,
  LeafIcon,
  HandshakeIcon,
  ShipIcon,
  ArrowRight,
  QuoteIcon,
  SparkleIcon,
} from "@/components/icons";

export default function HomePage() {
  const { t, locale } = useSettings();
  const featured = featuredProducts().slice(0, 4);
  const heroBrand = brands[0];
  const heroRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: String(brands.length), label: t("home.stats.brands") },
    { value: String(products.length), label: t("home.stats.products") },
    {
      value: String(2026 - Math.min(...brands.map((b) => b.founded))),
      label: t("home.stats.years"),
    },
    { value: "2 800", label: t("home.stats.km") },
  ];

  const testimonials =
    locale === "sv"
      ? [
          { quote: "Olivoljan smakar som min mormors kök i Sousse. Inget i svenska butiker kommer i närheten.", name: "Amira B.", city: "Malmö" },
          { quote: "Beställde på söndagen, på mitt bord på onsdagen. Harissan är den äkta varan.", name: "Erik L.", city: "Stockholm" },
          { quote: "Vacker förpackning, ärliga berättelser. Man smakar varifrån det kommer.", name: "Sofia N.", city: "Göteborg" },
        ]
      : [
          { quote: "The olive oil tastes like my grandmother's kitchen in Sousse. Nothing on Swedish shelves comes close.", name: "Amira B.", city: "Malmö" },
          { quote: "Ordered on Sunday, on my table by Wednesday. The harissa is the real thing.", name: "Erik L.", city: "Stockholm" },
          { quote: "Beautiful packaging, honest stories. You can taste where it comes from.", name: "Sofia N.", city: "Göteborg" },
        ];

  // Pointer parallax for the hero composition (no-op for touch / reduced motion).
  function onHeroPointer(e: React.MouseEvent) {
    const el = heroRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
  }

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden" onMouseMove={onHeroPointer}>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(75% 90% at 82% -10%, rgba(231,0,19,0.10) 0%, transparent 58%), radial-gradient(60% 80% at 10% 110%, rgba(0,106,167,0.08) 0%, transparent 60%), radial-gradient(40% 50% at 30% 20%, rgba(244,194,13,0.06) 0%, transparent 70%)",
          }}
        />
        {/* decorative motifs */}
        <CategoryMotif
          category="olive-oil"
          className="absolute right-[6%] top-16 hidden h-64 w-64 lg:block"
          style={{ color: "var(--color-olive)", opacity: 0.18 }}
        />
        <CategoryMotif
          category="spices"
          className="absolute -left-10 bottom-0 hidden h-56 w-56 md:block"
          style={{ color: "var(--color-terracotta)", opacity: 0.1 }}
        />

        <div className="container-pad grid items-center gap-14 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <span className="eyebrow glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-terracotta">
              <LeafIcon className="h-3.5 w-3.5" />
              {t("home.hero.eyebrow")}
            </span>
            <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl">
              {t("home.hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mocha">
              {t("home.hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-7 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-all duration-200 hover:bg-terracotta-dark active:scale-[0.98]"
              >
                {t("home.hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/brands"
                className="focus-ring inline-flex h-12 items-center justify-center rounded-full border border-espresso/20 bg-parchment px-7 text-sm font-semibold text-espresso transition-colors duration-200 hover:border-espresso/40 hover:bg-sand"
              >
                {t("home.hero.ctaSecondary")}
              </Link>
            </div>

            {/* Stats strip */}
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-3xl font-semibold text-gradient-gold">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-xs leading-snug text-stone">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero composition — parallax + floating tiles */}
          <div
            ref={heroRef}
            className="relative animate-rise [animation-delay:120ms]"
            style={{ "--px": "0", "--py": "0" } as React.CSSProperties}
          >
            <div
              className="grid grid-cols-2 gap-4"
              style={{
                transform:
                  "translate3d(calc(var(--px) * 10px), calc(var(--py) * 10px), 0)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <div
                className="glossy sheen relative col-span-2 flex h-44 items-end overflow-hidden rounded-[var(--radius-card)] border border-clay/70 p-6 shadow-[var(--shadow-lift)]"
                style={{
                  background:
                    "radial-gradient(120% 140% at 85% 0%, #e3ead0 0%, #eef2df 55%, #f6f8ef 100%)",
                }}
              >
                <CategoryMotif
                  category="olive-oil"
                  className="animate-float absolute -right-4 -top-6 h-44 w-44 opacity-50"
                  style={{ color: "#6f8a2e" }}
                />
                <div className="relative text-espresso">
                  <p className="eyebrow text-gold-soft">{categories[0].name[locale]}</p>
                  <p className="font-display text-2xl">{heroBrand.name}</p>
                  <p className="text-sm text-mocha">{heroBrand.tagline[locale]}</p>
                </div>
              </div>
              <ArtTile category="honey" label={categories[1].name[locale]} delay="0.8s" />
              <ArtTile category="pastries" label={categories[3].name[locale]} delay="1.6s" />
            </div>

            {/* floating trust chip */}
            <div
              className="glass absolute -bottom-5 left-6 z-10 flex items-center gap-3 rounded-full px-4 py-2.5"
              style={{
                transform:
                  "translate3d(calc(var(--px) * 22px), calc(var(--py) * 22px), 0)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <ShipIcon className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-semibold">{t("common.freeShipping")}</span>
            </div>

            {/* floating provenance chip */}
            <div
              className="glass absolute -right-2 -top-4 z-10 hidden items-center gap-2 rounded-full px-4 py-2.5 sm:flex"
              style={{
                transform:
                  "translate3d(calc(var(--px) * -18px), calc(var(--py) * -18px), 0)",
                transition: "transform 0.3s ease-out",
              }}
            >
              <SparkleIcon className="h-4 w-4 animate-pulse-glow text-terracotta" />
              <span className="text-sm font-semibold">{t("provenance.label")}</span>
            </div>
          </div>
        </div>

        {/* ---------- Makers marquee ---------- */}
        <div className="border-y border-clay/60 bg-sand/60 py-4">
          <div className="marquee" aria-label={t("home.makers.label")}>
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  className="flex shrink-0 items-center"
                  aria-hidden={copy === 1}
                >
                  {brands.map((b) => (
                    <span key={b.id} className="flex items-center">
                      <span className="px-6 font-display text-lg text-mocha">
                        {b.name}
                        <span className="ml-3 text-xs font-normal uppercase tracking-[0.18em] text-stone">
                          {b.region[locale]}
                        </span>
                      </span>
                      <span
                        className="h-1.5 w-1.5 rotate-45 bg-terracotta/60"
                        aria-hidden="true"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Trust strip ---------- */}
      <section className="border-b border-clay/60 bg-sand/60">
        <div className="container-pad grid gap-6 py-8 sm:grid-cols-3">
          <Reveal>
            <Feature icon={<LeafIcon className="h-6 w-6" />} title={t("home.value1.title")} body={t("home.value1.body")} />
          </Reveal>
          <Reveal delay={90}>
            <Feature icon={<HandshakeIcon className="h-6 w-6" />} title={t("home.value2.title")} body={t("home.value2.body")} />
          </Reveal>
          <Reveal delay={180}>
            <Feature icon={<ShipIcon className="h-6 w-6" />} title={t("home.value3.title")} body={t("home.value3.body")} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="container-pad py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.categories.subtitle")}
            title={t("home.categories.title")}
            link="/shop"
            linkLabel={t("common.viewAll")}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Featured products ---------- */}
      <section className="container-pad py-4 sm:py-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.featured.subtitle")}
            title={t("home.featured.title")}
            link="/shop"
            linkLabel={t("common.viewAll")}
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Provenance — the signature promise ---------- */}
      <section className="container-pad py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-terracotta">{t("home.provenance.eyebrow")}</p>
            <h2 className="mt-2 max-w-lg font-display text-3xl leading-tight sm:text-4xl">
              {t("home.provenance.title")}
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-mocha">
              {t("home.provenance.body")}
            </p>
            <Link
              href="/about"
              className="focus-ring group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
            >
              {t("home.provenance.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ProvenanceBand origin="Sfax · Nabeul · Aïn Draham" />
          </Reveal>
        </div>
      </section>

      {/* ---------- Brand spotlight ---------- */}
      <section className="container-pad py-4 sm:py-8">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.brands.subtitle")}
            title={t("home.brands.title")}
            link="/brands"
            linkLabel={t("common.viewAll")}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {brands.slice(0, 3).map((b, i) => (
            <Reveal key={b.id} delay={i * 80}>
              <BrandCard brand={b} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="container-pad py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.testimonials.eyebrow")}
            title={t("home.testimonials.title")}
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((tm, i) => (
            <Reveal key={tm.name} delay={i * 90}>
              <figure className="glossy hover-lift flex h-full flex-col rounded-[var(--radius-card)] border border-clay/60 bg-parchment p-6 shadow-[var(--shadow-soft)]">
                <QuoteIcon className="h-7 w-7 text-terracotta/50" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-espresso/90">
                  “{tm.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-clay/60 pt-4">
                  <div>
                    <p className="text-sm font-semibold">{tm.name}</p>
                    <p className="text-xs text-stone">{tm.city}</p>
                  </div>
                  <RatingStars stars={5} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Newsletter ---------- */}
      <section className="container-pad pb-4">
        <Reveal>
          <div
            className="glossy relative overflow-hidden rounded-[var(--radius-card)] border border-terracotta/25 px-6 py-12 sm:px-12 sm:py-16"
            style={{
              background:
                "radial-gradient(90% 130% at 85% -20%, rgba(0,106,167,0.10) 0%, transparent 55%), linear-gradient(120deg, #ffffff 0%, #f3f5f8 100%)",
            }}
          >
            <CategoryMotif
              category="spices"
              className="animate-float absolute -right-6 -top-10 h-60 w-60 opacity-20"
              style={{ color: "var(--color-terracotta)" }}
            />
            <div className="relative max-w-xl">
              <h2 className="font-display text-3xl text-espresso sm:text-4xl">
                {t("home.newsletter.title")}
              </h2>
              <p className="mt-3 text-mocha">{t("home.newsletter.body")}</p>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <label className="sr-only" htmlFor="nl-email">
                  {t("home.newsletter.placeholder")}
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  placeholder={t("home.newsletter.placeholder")}
                  className="focus-ring h-12 flex-1 rounded-full border border-clay bg-sand px-5 text-espresso placeholder:text-stone focus:border-terracotta"
                />
                <button
                  type="submit"
                  className="focus-ring inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-all hover:bg-terracotta-dark active:scale-[0.98]"
                >
                  {t("home.newsletter.cta")}
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ArtTile({
  category,
  label,
  delay,
}: {
  category: "honey" | "pastries";
  label: string;
  delay?: string;
}) {
  return (
    <div className="glossy sheen relative flex h-40 items-end overflow-hidden rounded-[var(--radius-card)] border border-clay/60 bg-parchment p-4 shadow-[var(--shadow-soft)]">
      <CategoryMotif
        category={category}
        className="animate-float absolute inset-0 m-auto h-28 w-28"
        style={{
          color: category === "honey" ? "var(--color-gold)" : "var(--color-terracotta)",
          opacity: 0.5,
          animationDelay: delay,
        }}
      />
      <span className="relative text-sm font-semibold text-espresso">{label}</span>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg leading-tight">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-mocha">{body}</p>
      </div>
    </div>
  );
}
