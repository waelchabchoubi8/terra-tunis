"use client";

import { useState } from "react";
import { useSettings } from "@/lib/settings";
import { CheckIcon, MailIcon, PhoneIcon, MapPinIcon } from "@/components/icons";

export default function ContactPage() {
  const { t, locale } = useSettings();
  const [sent, setSent] = useState(false);

  return (
    <div className="container-pad py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="eyebrow text-terracotta">{t("nav.contact")}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">{t("contact.title")}</h1>
        <p className="mt-4 text-lg leading-relaxed text-mocha">{t("contact.subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem]">
        {/* Form */}
        <div>
          {sent ? (
            <div className="flex items-center gap-4 rounded-[var(--radius-card)] border border-olive/30 bg-olive/10 p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-olive text-[#13160a]">
                <CheckIcon className="h-6 w-6" />
              </span>
              <p className="font-semibold text-olive">{t("contact.sent")}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <Field id="c-name" label={t("contact.name")} autoComplete="name" />
              <Field id="c-email" label={t("contact.email")} type="email" autoComplete="email" />
              <Field id="c-subject" label={t("contact.subject")} className="sm:col-span-2" />
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="c-message" className="text-sm font-semibold text-espresso">
                  {t("contact.message")}
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={6}
                  className="focus-ring resize-y rounded-lg border border-clay bg-parchment px-3.5 py-3 text-espresso transition-colors focus:border-terracotta"
                />
              </div>
              <button
                type="submit"
                className="focus-ring inline-flex h-12 w-fit cursor-pointer items-center justify-center rounded-full bg-terracotta px-7 text-sm font-semibold text-[#1a1206] shadow-[var(--shadow-soft)] transition-colors hover:bg-terracotta-dark sm:col-span-2"
              >
                {t("contact.send")}
              </button>
            </form>
          )}
        </div>

        {/* Details */}
        <aside className="space-y-6">
          <div className="rounded-[var(--radius-card)] border border-clay/60 bg-sand/60 p-6">
            <ContactRow icon={<MailIcon className="h-5 w-5" />} label="Email" value="hello@terratunis.se" />
            <div className="my-4 hairline" />
            <ContactRow icon={<PhoneIcon className="h-5 w-5" />} label={t("contact.hours")} value="+46 8 123 45 67" />
            <div className="my-4 hairline" />
            <ContactRow
              icon={<MapPinIcon className="h-5 w-5" />}
              label={locale === "sv" ? "Lager" : "Warehouse"}
              value="Stockholm, Sverige"
            />
          </div>
          <div
            className="relative h-44 overflow-hidden rounded-[var(--radius-card)] border border-clay/60"
            style={{ background: "radial-gradient(120% 120% at 20% 10%, #2a2e1c 0%, #16161b 70%)" }}
            role="img"
            aria-label="Tunisia to Sweden route"
          >
            {/* animated route arc */}
            <svg
              className="absolute inset-x-4 top-6 h-16 w-[calc(100%-2rem)]"
              viewBox="0 0 200 50"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M6 44 C 60 4, 140 4, 194 44"
                fill="none"
                stroke="var(--color-terracotta)"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
                className="route-dash"
                opacity="0.8"
              />
              <circle cx="6" cy="44" r="3" fill="var(--color-tunis)" />
              <circle cx="194" cy="44" r="3" fill="var(--color-terracotta)">
                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <div className="absolute inset-0 grid place-items-end pb-5 text-espresso">
              <div className="text-center">
                <p className="font-display text-2xl text-terracotta">Tunis → Stockholm</p>
                <p className="text-sm text-mocha">~2 800 km · 2–4 {locale === "sv" ? "dagar" : "days"}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  className = "",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-semibold text-espresso">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="focus-ring h-11 rounded-lg border border-clay bg-parchment px-3.5 text-espresso transition-colors focus:border-terracotta"
      />
    </div>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-terracotta/10 text-terracotta">
        {icon}
      </span>
      <div>
        <p className="text-xs text-stone">{label}</p>
        <p className="font-semibold text-espresso">{value}</p>
      </div>
    </div>
  );
}
