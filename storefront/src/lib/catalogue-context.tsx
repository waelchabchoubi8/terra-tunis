"use client";

// Client-side catalogue: the products fetched on the server (from Medusa, or
// mock as fallback) are passed in once and exposed to every client component —
// so the cart, search, etc. can resolve products without importing the mock
// array. This is what makes the whole storefront read from one source.

import { createContext, useContext, useMemo } from "react";
import type { Product } from "./data";

type CatalogueValue = {
  products: Product[];
  getById: (id: string) => Product | undefined;
  getBySlug: (slug: string) => Product | undefined;
};

const CatalogueContext = createContext<CatalogueValue | null>(null);

export function CatalogueProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const value = useMemo<CatalogueValue>(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    const bySlug = new Map(products.map((p) => [p.slug, p]));
    return {
      products,
      getById: (id) => byId.get(id),
      getBySlug: (slug) => bySlug.get(slug),
    };
  }, [products]);

  return (
    <CatalogueContext.Provider value={value}>
      {children}
    </CatalogueContext.Provider>
  );
}

export function useCatalogue(): CatalogueValue {
  const ctx = useContext(CatalogueContext);
  if (!ctx) {
    throw new Error("useCatalogue must be used within a CatalogueProvider");
  }
  return ctx;
}
