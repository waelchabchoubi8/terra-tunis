"use client";

import { Fragment } from "react";
import { useSettings } from "@/lib/settings";
import { MapPinIcon, ShipIcon, CheckIcon, SparkleIcon } from "./icons";

/**
 * Provenance band — the signature traceability element. Draws the journey of a
 * product from its Tunisian origin to a Swedish table as an animated route.
 */
export default function ProvenanceBand({
  origin,
  accent = "var(--color-terracotta)",
  className = "",
}: {
  /** Localized origin place name, e.g. "Sfax". */
  origin: string;
  /** Category/brand accent colour for the route. */
  accent?: string;
  className?: string;
}) {
  const { t } = useSettings();

  const stops = [
    {
      icon: <MapPinIcon className="h-4 w-4" />,
      label: t("provenance.harvested"),
      value: origin,
    },
    {
      icon: <ShipIcon className="h-4 w-4" />,
      label: t("provenance.packed"),
      value: t("provenance.days"),
    },
    {
      icon: <CheckIcon className="h-4 w-4" />,
      label: t("provenance.delivered"),
      value: "Stockholm · Malmö · Göteborg",
    },
  ];

  return (
    <div className={`glass rounded-[var(--radius-card)] px-4 py-4 sm:px-6 ${className}`}>
      <p className="eyebrow flex items-center gap-2 text-terracotta">
        <SparkleIcon className="h-3.5 w-3.5" />
        {t("provenance.label")}
      </p>
      <div className="mt-4 flex items-start gap-2 sm:gap-3">
        {stops.map((stop, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <svg
                className="mt-4 h-2 min-w-6 flex-1"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line
                  x1="0"
                  y1="4"
                  x2="100"
                  y2="4"
                  stroke={accent}
                  strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke"
                  className="route-dash"
                  opacity="0.7"
                />
              </svg>
            )}
            <div className="flex min-w-0 flex-col items-center text-center">
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{
                  color: accent,
                  background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 35%, transparent)`,
                }}
              >
                {stop.icon}
              </span>
              <span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-stone">
                {stop.label}
              </span>
              <span className="mt-0.5 max-w-[9rem] text-xs font-semibold leading-snug text-espresso">
                {stop.value}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** Compact one-line variant used on product cards: "Sfax ⇢ SE". */
export function ProvenanceChip({
  origin,
  className = "",
}: {
  origin: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-clay/70 bg-cream/90 px-2.5 py-1 text-[0.65rem] font-semibold text-espresso backdrop-blur ${className}`}
    >
      <MapPinIcon className="h-3 w-3 text-terracotta" />
      <span className="max-w-[7rem] truncate">{origin}</span>
      <svg className="h-2 w-5" viewBox="0 0 20 8" aria-hidden="true">
        <line
          x1="0"
          y1="4"
          x2="20"
          y2="4"
          stroke="var(--color-terracotta)"
          strokeWidth="1.4"
          className="route-dash"
        />
      </svg>
      SE
    </span>
  );
}
