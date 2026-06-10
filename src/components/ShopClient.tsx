"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  brands,
  categories,
  getBrand,
  getCategory,
  products,
  type CategoryId,
} from "@/lib/data";
import { useSettings } from "@/lib/settings";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { SearchIcon, CloseIcon, ChevronDown, CategoryMotif } from "./icons";

type Sort = "featured" | "priceLow" | "priceHigh" | "name";

export default function ShopClient() {
  const { t, locale } = useSettings();
  const params = useSearchParams();

  const initialCategory = params.get("category") as CategoryId | null;
  const initialBrand = params.get("brand");

  const [category, setCategory] = useState<CategoryId | "all">(
    initialCategory && categories.some((c) => c.id === initialCategory)
      ? initialCategory
      : "all",
  );
  const [brand, setBrand] = useState<string>(
    initialBrand && brands.some((b) => b.slug === initialBrand) ? initialBrand : "all",
  );
  const [sort, setSort] = useState<Sort>("featured");
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  const q = query.trim().toLowerCase();

  const visible = useMemo(() => {
    let list = products.filter(
      (p) =>
        (category === "all" || p.categoryId === category) &&
        (brand === "all" || brands.find((b) => b.id === p.brandId)?.slug === brand) &&
        (!q ||
          p.name.en.toLowerCase().includes(q) ||
          p.name.sv.toLowerCase().includes(q) ||
          p.origin[locale].toLowerCase().includes(q) ||
          getBrand(p.brandId)?.name.toLowerCase().includes(q) ||
          getCategory(p.categoryId)?.name[locale].toLowerCase().includes(q)),
    );
    switch (sort) {
      case "priceLow":
        list = [...list].sort((a, b) => a.priceEUR - b.priceEUR);
        break;
      case "priceHigh":
        list = [...list].sort((a, b) => b.priceEUR - a.priceEUR);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name[locale].localeCompare(b.name[locale]));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [category, brand, sort, q, locale]);

  const hasFilters = category !== "all" || brand !== "all" || q !== "";
  const activeBrand = brands.find((b) => b.slug === brand);
  const activeCategory = category !== "all" ? getCategory(category) : undefined;

  const filterPanel = (
    <>
      <FilterGroup label={t("shop.category")}>
        <FilterChip
          active={category === "all"}
          onClick={() => setCategory("all")}
          count={products.length}
        >
          {t("shop.allCategories")}
        </FilterChip>
        {categories.map((c) => (
          <FilterChip
            key={c.id}
            active={category === c.id}
            onClick={() => setCategory(c.id)}
            dot={c.accent}
            count={products.filter((p) => p.categoryId === c.id).length}
          >
            {c.name[locale]}
          </FilterChip>
        ))}
      </FilterGroup>

      <FilterGroup label={t("shop.brand")}>
        <FilterChip active={brand === "all"} onClick={() => setBrand("all")}>
          {t("shop.allBrands")}
        </FilterChip>
        {brands.map((b) => (
          <FilterChip
            key={b.id}
            active={brand === b.slug}
            onClick={() => setBrand(b.slug)}
            dot={b.accent}
            count={products.filter((p) => p.brandId === b.id).length}
          >
            {b.name}
          </FilterChip>
        ))}
      </FilterGroup>
    </>
  );

  return (
    <div className="container-pad py-12">
      <SectionHeading eyebrow={t("nav.shop")} title={t("shop.title")} subtitle={t("shop.subtitle")} />

      {/* Toolbar: search + sort */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">{t("search.title")}</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-terracotta" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="focus-ring h-12 w-full rounded-full border border-clay bg-parchment pl-11 pr-4 text-sm text-espresso transition-colors placeholder:text-stone focus:border-terracotta"
          />
        </label>
        <div className="flex items-center justify-between gap-3">
          {/* Mobile filter toggle */}
          <button
            type="button"
            onClick={() => setMobileFilters((v) => !v)}
            aria-expanded={mobileFilters}
            className="focus-ring inline-flex h-12 cursor-pointer items-center gap-2 rounded-full border border-clay bg-parchment px-5 text-sm font-semibold text-espresso transition-colors hover:border-terracotta/40 lg:hidden"
          >
            {t("shop.filters")}
            <ChevronDown
              className={`h-4 w-4 text-terracotta transition-transform ${mobileFilters ? "rotate-180" : ""}`}
            />
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="sr-only sm:not-sr-only sm:text-mocha">{t("shop.sort")}:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="focus-ring select-fancy h-12 cursor-pointer rounded-full border border-clay bg-parchment px-5 text-sm font-semibold text-espresso transition-colors hover:border-terracotta/40"
            >
              <option value="featured">{t("shop.sort.featured")}</option>
              <option value="priceLow">{t("shop.sort.priceLow")}</option>
              <option value="priceHigh">{t("shop.sort.priceHigh")}</option>
              <option value="name">{t("shop.sort.name")}</option>
            </select>
          </label>
        </div>
      </div>

      {/* Mobile filter panel */}
      {mobileFilters && (
        <div className="animate-rise mt-4 rounded-[var(--radius-card)] border border-clay/60 bg-sand/60 p-5 lg:hidden">
          {filterPanel}
        </div>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[16rem_1fr]">
        {/* Desktop filters */}
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">{t("shop.filters")}</h2>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setBrand("all");
                  setQuery("");
                }}
                className="focus-ring cursor-pointer text-sm font-semibold text-terracotta hover:text-terracotta-dark"
              >
                {t("shop.clear")}
              </button>
            )}
          </div>
          {filterPanel}
        </aside>

        {/* Results */}
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <p className="text-sm text-mocha">
              <strong className="font-semibold text-espresso">{visible.length}</strong>{" "}
              {t("shop.results")}
            </p>
            {/* Active filter pills */}
            {activeCategory && (
              <ActivePill onClear={() => setCategory("all")} dot={activeCategory.accent}>
                {activeCategory.name[locale]}
              </ActivePill>
            )}
            {activeBrand && (
              <ActivePill onClear={() => setBrand("all")} dot={activeBrand.accent}>
                {activeBrand.name}
              </ActivePill>
            )}
            {q && <ActivePill onClear={() => setQuery("")}>“{query.trim()}”</ActivePill>}
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setBrand("all");
                  setQuery("");
                }}
                className="focus-ring cursor-pointer text-xs font-semibold text-stone transition-colors hover:text-terracotta"
              >
                {t("shop.clear")}
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[var(--radius-card)] border border-dashed border-clay bg-sand/50 px-10 py-16 text-center">
              <CategoryMotif
                category="spices"
                className="mx-auto h-24 w-24"
                style={{ color: "var(--color-terracotta)", opacity: 0.35 }}
              />
              <p className="mt-5 text-mocha">{t("shop.empty")}</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setBrand("all");
                  setQuery("");
                }}
                className="focus-ring mt-5 inline-flex h-11 cursor-pointer items-center rounded-full bg-terracotta px-6 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                {t("shop.clear")}
              </button>
            </div>
          ) : (
            /* key remounts the grid on filter change → staggered re-entrance */
            <div
              key={`${category}-${brand}-${sort}-${q}`}
              className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-3"
            >
              {visible.map((p, i) => (
                <div
                  key={p.id}
                  className="animate-rise"
                  style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <p className="eyebrow mb-3 text-stone">{label}</p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  dot,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200 lg:w-full lg:rounded-lg ${
        active
          ? "bg-terracotta text-white"
          : "border border-clay bg-parchment text-mocha hover:border-terracotta/40 hover:text-espresso lg:border-transparent lg:bg-transparent lg:hover:bg-sand"
      }`}
    >
      {dot && (
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: dot }}
          aria-hidden="true"
        />
      )}
      <span className="flex-1 text-left">{children}</span>
      {count != null && (
        <span
          className={`rounded-full px-1.5 text-[0.65rem] font-bold tabular-nums ${
            active ? "bg-white/25 text-white" : "bg-clay/60 text-mocha"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ActivePill({
  children,
  onClear,
  dot,
}: {
  children: React.ReactNode;
  onClear: () => void;
  dot?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-terracotta/35 bg-terracotta/10 py-1 pl-3 pr-1 text-xs font-semibold text-espresso">
      {dot && (
        <span className="h-2 w-2 rounded-full" style={{ background: dot }} aria-hidden="true" />
      )}
      {children}
      <button
        type="button"
        onClick={onClear}
        aria-label="Remove filter"
        className="focus-ring grid h-5 w-5 cursor-pointer place-items-center rounded-full text-mocha transition-colors hover:bg-terracotta/20 hover:text-espresso"
      >
        <CloseIcon className="h-3 w-3" />
      </button>
    </span>
  );
}
