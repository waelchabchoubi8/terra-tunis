"use client";

import { useT } from "@/lib/settings";
import type { StockStatus } from "@/lib/data";

const styles: Record<StockStatus, string> = {
  in: "bg-olive/15 text-olive",
  low: "bg-gold/15 text-gold-soft",
  out: "bg-tunis/15 text-tunis",
};

export default function StockBadge({ stock }: { stock: StockStatus }) {
  const t = useT();
  const label =
    stock === "in"
      ? t("common.inStock")
      : stock === "low"
        ? t("common.lowStock")
        : t("common.outOfStock");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[stock]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
