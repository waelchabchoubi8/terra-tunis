"use client";

import Link from "next/link";
import { useSettings } from "@/lib/settings";
import { brands } from "@/lib/data";
import Reveal from "@/components/Reveal";
import ProvenanceBand from "@/components/ProvenanceBand";
import { CategoryMotif, LeafIcon, HandshakeIcon, ShipIcon, ArrowRight } from "@/components/icons";

export default function AboutPage() {
  const { t, locale } = useSettings();

  const steps =
    locale === "sv"
      ? [
          { t: "Vi väljer", d: "Vi reser genom Tunisien och väljer familjeproducenter vars hantverk vi tror på." },
          { t: "Vi berättar", d: "Varje varumärke får sin egen vitrin, sin historia och sin rättvisa del av varje försäljning." },
          { t: "Vi levererar", d: "Vi sköter tull och frakt så att smakerna når svenska bord färska och hela." },
        ]
      : [
          { t: "We select", d: "We travel across Tunisia and choose family producers whose craft we believe in." },
          { t: "We tell their story", d: "Every brand gets its own storefront, its story, and a fair share of every sale." },
          { t: "We deliver", d: "We handle customs and shipping so the flavours reach Swedish tables fresh and whole." },
        ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-clay/60">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(80% 110% at 80% -10%, rgba(0,106,167,0.10) 0%, transparent 55%)" }}
        />
        <CategoryMotif category="olive-oil" className="absolute -left-10 bottom-0 hidden h-64 w-64 md:block" style={{ color: "var(--color-olive)", opacity: 0.16 }} />
        <div className="container-pad py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-terracotta">{t("about.eyebrow")}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-[1.02] sm:text-6xl">
              {t("about.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mocha">
              {t("about.lead")}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-pad py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed text-espresso/90">
            <p>
              {locale === "sv"
                ? "Terra Tunis föddes ur en enkel längtan: att hitta den olivolja, honung och harissa i Sverige som vi växte upp med vid Medelhavet. Det vi hittade i butikshyllorna kändes aldrig riktigt äkta."
                : "Terra Tunis was born from a simple longing: to find, here in Sweden, the olive oil, honey and harissa we grew up with on the Mediterranean. What we found on the shelves never quite tasted of home."}
            </p>
            <p>
              {locale === "sv"
                ? "Så vi byggde en marknadsplats — inte ännu ett anonymt varuhus, utan en plats där varje tunisiskt familjemärke får sin egen vitrin, sitt namn och sin berättelse. Vi tar en liten provision; resten går till producenterna."
                : "So we built a marketplace — not another anonymous warehouse, but a place where each Tunisian family brand keeps its own storefront, its name and its story. We take a small commission; the rest goes to the makers."}
            </p>
            <p>
              {locale === "sv"
                ? "Idag samlar vi rostare, biodlare, olivpressare och konditorer under ett tak, och bär deras hantverk över Medelhavet till ditt bord."
                : "Today we gather roasters, beekeepers, olive pressers and pastry chefs under one roof, and carry their craft across the Mediterranean to your table."}
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((s, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="hover-lift flex gap-4 rounded-[var(--radius-card)] border border-clay/60 bg-parchment p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-terracotta font-display text-lg font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight">{s.t}</h3>
                    <p className="mt-1 text-mocha">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={steps.length * 100}>
              <ProvenanceBand origin="Sfax · Nabeul · Aïn Draham" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-clay/60 bg-sand/60">
        <div className="container-pad grid gap-8 py-14 sm:grid-cols-3">
          {[
            { icon: <LeafIcon className="h-6 w-6" />, t: t("home.value1.title"), d: t("home.value1.body") },
            { icon: <HandshakeIcon className="h-6 w-6" />, t: t("home.value2.title"), d: t("home.value2.body") },
            { icon: <ShipIcon className="h-6 w-6" />, t: t("home.value3.title"), d: t("home.value3.body") },
          ].map((v, i) => (
            <div key={i}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                {v.icon}
              </span>
              <h3 className="mt-4 font-display text-xl">{v.t}</h3>
              <p className="mt-2 leading-relaxed text-mocha">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-pad py-16 text-center">
        <p className="eyebrow text-terracotta">{t("nav.brands")}</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">
          {brands.length} {locale === "sv" ? "varumärken och växande" : "brands and growing"}
        </h2>
        <Link
          href="/brands"
          className="focus-ring mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-7 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
        >
          {t("home.hero.ctaSecondary")} <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
