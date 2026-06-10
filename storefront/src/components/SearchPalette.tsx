"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  brands,
  getBrand,
  getCategory,
  type Brand,
  type Product,
} from "@/lib/data";
import { useCatalogue } from "@/lib/catalogue-context";
import { useSettings } from "@/lib/settings";
import { useLockBody, useUI } from "@/lib/ui";
import ProductArt from "./ProductArt";
import Price from "./Price";
import { ArrowRight, MapPinIcon, SearchIcon } from "./icons";

type Hit =
  | { kind: "product"; product: Product }
  | { kind: "brand"; brand: Brand };

/** ⌘K / Ctrl+K command-palette search over products, brands and categories. */
export default function SearchPalette() {
  const { searchOpen, openSearch, closeSearch } = useUI();

  // Global shortcut: Ctrl/Cmd + K toggles the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (searchOpen) closeSearch();
        else openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, openSearch, closeSearch]);

  if (!searchOpen) return null;
  // Mounting the panel fresh on each open resets query/selection state.
  return <PalettePanel onClose={closeSearch} />;
}

function PalettePanel({ onClose }: { onClose: () => void }) {
  const { t, locale } = useSettings();
  const { products } = useCatalogue();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useLockBody(true);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const q = query.trim().toLowerCase();

  const hits = useMemo<Hit[]>(() => {
    if (!q) {
      // Empty query: surface the featured picks.
      return products
        .filter((p) => p.featured)
        .slice(0, 5)
        .map((product) => ({ kind: "product", product }));
    }
    const productHits = products
      .filter((p) => {
        const brand = getBrand(p.brandId);
        const category = getCategory(p.categoryId);
        return (
          p.name.en.toLowerCase().includes(q) ||
          p.name.sv.toLowerCase().includes(q) ||
          p.origin[locale].toLowerCase().includes(q) ||
          brand?.name.toLowerCase().includes(q) ||
          category?.name.en.toLowerCase().includes(q) ||
          category?.name.sv.toLowerCase().includes(q)
        );
      })
      .slice(0, 6)
      .map((product): Hit => ({ kind: "product", product }));
    const brandHits = brands
      .filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.region[locale].toLowerCase().includes(q),
      )
      .slice(0, 3)
      .map((brand): Hit => ({ kind: "brand", brand }));
    return [...productHits, ...brandHits];
  }, [q, locale, products]);

  // Reset the highlighted row when the query changes (adjust-during-render).
  const [prevQ, setPrevQ] = useState(q);
  if (q !== prevQ) {
    setPrevQ(q);
    setActive(0);
  }

  function go(hit: Hit) {
    onClose();
    router.push(
      hit.kind === "product"
        ? `/product/${hit.product.slug}`
        : `/brands/${hit.brand.slug}`,
    );
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(hits.length - 1, a + 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    }
    if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      go(hits[active]);
    }
  }

  const productHits = hits.filter((h) => h.kind === "product");
  const brandHits = hits.filter((h) => h.kind === "brand");

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={t("search.title")}
    >
      <button
        type="button"
        aria-label={t("common.close")}
        onClick={onClose}
        className="overlay-in fixed inset-0 h-full w-full cursor-pointer bg-black/65 backdrop-blur-sm"
      />

      <div className="container-pad pointer-events-none relative flex justify-center pt-[12vh]">
        <div
          className="palette-in glass pointer-events-auto w-full max-w-xl overflow-hidden rounded-[var(--radius-card)]"
          onKeyDown={onKeyDown}
        >
          {/* Input row */}
          <div className="flex items-center gap-3 border-b border-clay/60 px-5">
            <SearchIcon className="h-5 w-5 shrink-0 text-terracotta" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              aria-label={t("search.title")}
              className="h-14 w-full bg-transparent text-base text-espresso outline-none placeholder:text-stone"
            />
            <kbd className="hidden shrink-0 rounded-md border border-clay bg-sand px-2 py-1 text-[0.65rem] font-semibold text-stone sm:block">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[55vh] overflow-y-auto p-2.5">
            {hits.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="text-mocha">
                  {t("search.noResults")}{" "}
                  <span className="font-semibold text-espresso">“{query}”</span>
                </p>
                <p className="mt-1.5 text-sm text-stone">{t("search.hint")}</p>
              </div>
            ) : (
              <>
                {productHits.length > 0 && (
                  <p className="eyebrow px-3 pb-1.5 pt-2 text-stone">
                    {t("search.products")}
                  </p>
                )}
                {productHits.map((hit, i) => {
                  if (hit.kind !== "product") return null;
                  const idx = i;
                  const brand = getBrand(hit.product.brandId);
                  return (
                    <button
                      key={hit.product.id}
                      type="button"
                      onClick={() => go(hit)}
                      onMouseEnter={() => setActive(idx)}
                      className={`flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active === idx ? "bg-terracotta/12" : "hover:bg-sand"
                      }`}
                    >
                      <ProductArt
                        category={hit.product.categoryId}
                        label={hit.product.name[locale]}
                        className="h-12 w-12 shrink-0 rounded-lg border border-clay/60"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base leading-tight">
                          {hit.product.name[locale]}
                        </span>
                        <span className="block truncate text-xs text-stone">
                          {brand?.name} · {hit.product.origin[locale]}
                        </span>
                      </span>
                      <Price
                        eur={hit.product.priceEUR}
                        className="shrink-0 text-sm font-semibold text-mocha"
                      />
                    </button>
                  );
                })}

                {brandHits.length > 0 && (
                  <p className="eyebrow px-3 pb-1.5 pt-3 text-stone">
                    {t("search.brands")}
                  </p>
                )}
                {brandHits.map((hit, i) => {
                  if (hit.kind !== "brand") return null;
                  const idx = productHits.length + i;
                  return (
                    <button
                      key={hit.brand.id}
                      type="button"
                      onClick={() => go(hit)}
                      onMouseEnter={() => setActive(idx)}
                      className={`flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active === idx ? "bg-terracotta/12" : "hover:bg-sand"
                      }`}
                    >
                      <span
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-lg font-display text-lg font-semibold"
                        style={{
                          background: hit.brand.accentSoft,
                          color: hit.brand.accent,
                        }}
                        aria-hidden="true"
                      >
                        {hit.brand.name[0]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-display text-base leading-tight">
                          {hit.brand.name}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-stone">
                          <MapPinIcon className="h-3 w-3" />
                          {hit.brand.region[locale]}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-stone" />
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-clay/60 px-5 py-3">
            <p className="hidden text-xs text-stone sm:block">{t("search.hint")}</p>
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push("/shop");
              }}
              className="focus-ring inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
            >
              {t("search.browse")} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
