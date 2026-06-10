"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/settings";
import { useUI } from "@/lib/ui";
import type { StockStatus } from "@/lib/data";
import { CheckIcon, PlusIcon } from "./icons";

export default function AddToCartButton({
  productId,
  stock,
  qty = 1,
  variant = "full",
  variantId,
  className = "",
}: {
  productId: string;
  stock: StockStatus;
  qty?: number;
  variant?: "full" | "compact";
  /** Selected size/option to add; omitted = product's default variant. */
  variantId?: string;
  className?: string;
}) {
  const { add } = useCart();
  const { openCart } = useUI();
  const t = useT();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const soldOut = stock === "out";

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (soldOut) return;
    add(productId, qty, variantId);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    // Show the inline "added" tick briefly, then slide the mini cart open.
    timer.current = setTimeout(() => {
      setAdded(false);
      openCart();
    }, 650);
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={soldOut}
        aria-label={t("common.addToCart")}
        className={`focus-ring inline-grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-terracotta text-white shadow-[var(--shadow-soft)] transition-colors duration-200 hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:bg-stone/40 disabled:text-stone ${className}`}
      >
        {added ? <CheckIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={soldOut}
      className={`focus-ring inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold tracking-wide text-white shadow-[var(--shadow-soft)] transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-stone/40 disabled:text-stone ${
        added ? "bg-olive" : "bg-terracotta hover:bg-terracotta-dark"
      } ${className}`}
    >
      {soldOut ? (
        t("common.outOfStock")
      ) : added ? (
        <>
          <CheckIcon className="h-4 w-4" /> {t("common.added")}
        </>
      ) : (
        t("common.addToCart")
      )}
    </button>
  );
}
