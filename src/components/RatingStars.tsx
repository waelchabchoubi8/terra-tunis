"use client";

import { useT } from "@/lib/settings";
import { StarIcon } from "./icons";

export default function RatingStars({
  stars,
  count,
  className = "",
}: {
  stars: number;
  count?: number;
  className?: string;
}) {
  const t = useT();
  const pct = (Math.min(5, Math.max(0, stars)) / 5) * 100;
  const row = (tone: string) => (
    <span className={`flex ${tone}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className="h-3.5 w-3.5 shrink-0" />
      ))}
    </span>
  );

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      aria-label={`${stars.toFixed(1)} / 5`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        {row("text-clay")}
        <span
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          {row("text-terracotta")}
        </span>
      </span>
      <span className="text-xs text-mocha">
        {stars.toFixed(1)}
        {count != null && (
          <>
            {" · "}
            {count} {t("product.reviews")}
          </>
        )}
      </span>
    </span>
  );
}
