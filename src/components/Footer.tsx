"use client";

import Link from "next/link";
import { categories } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import Logo from "./Logo";
import SettingsSwitcher from "./SettingsSwitcher";
import { ChevronDown } from "./icons";

const PAYMENTS = ["Klarna", "Swish", "Visa", "Mastercard", "PayPal"];

export default function Footer() {
  const { t, locale } = useSettings();

  return (
    <footer className="mt-24 border-t border-clay/70 bg-sand">
      {/* Route motif — Tunis → Stockholm hairline */}
      <div className="container-pad -mt-px flex items-center gap-4 pt-10">
        <div className="divider-ornate flex-1" />
        <span className="eyebrow shrink-0 text-stone">Tunis → Stockholm</span>
        <div className="divider-ornate flex-1" />
      </div>

      <div className="container-pad py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-mocha">
              {t("footer.tagline")}
            </p>
            <div className="mt-5">
              <SettingsSwitcher />
            </div>
          </div>

          <FooterCol title={t("footer.shop")}>
            {categories.map((c) => (
              <FooterLink key={c.id} href={`/shop?category=${c.slug}`}>
                {c.name[locale]}
              </FooterLink>
            ))}
            <FooterLink href="/shop">{t("common.viewAll")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.company")}>
            <FooterLink href="/about">{t("nav.about")}</FooterLink>
            <FooterLink href="/brands">{t("nav.brands")}</FooterLink>
            <FooterLink href="/contact">{t("nav.contact")}</FooterLink>
            <FooterLink href="/contact">{t("footer.becomeSeller")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.support")}>
            <FooterLink href="/contact">{t("footer.shipping")}</FooterLink>
            <FooterLink href="/contact">{t("footer.faq")}</FooterLink>
            <FooterLink href="/contact">{t("nav.contact")}</FooterLink>
          </FooterCol>
        </div>

        {/* Payments + back to top */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-clay/70 pt-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-stone">
              {t("footer.payments")}
            </span>
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-md border border-clay bg-parchment px-2.5 py-1 text-xs font-semibold text-mocha"
              >
                {p}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-mocha transition-colors hover:text-terracotta"
          >
            {t("common.backToTop")}
            <ChevronDown className="h-4 w-4 rotate-180" />
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-clay/70 pt-6 text-sm text-stone sm:flex-row">
          <p>
            © {2026} Terra Tunis. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-tunis" /> Tunisia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-[#005bbb]" /> Sverige
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-lg">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="focus-ring text-sm text-mocha transition-colors hover:text-terracotta"
      >
        {children}
      </Link>
    </li>
  );
}
