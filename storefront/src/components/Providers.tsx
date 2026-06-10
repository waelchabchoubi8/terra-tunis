"use client";

import { SettingsProvider } from "@/lib/settings";
import { CartProvider } from "@/lib/cart";
import { UIProvider } from "@/lib/ui";
import { CatalogueProvider } from "@/lib/catalogue-context";
import type { Product } from "@/lib/data";

export default function Providers({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <SettingsProvider>
      {/* Catalogue must wrap CartProvider so the cart can resolve line items. */}
      <CatalogueProvider products={products}>
        <CartProvider>
          <UIProvider>{children}</UIProvider>
        </CartProvider>
      </CatalogueProvider>
    </SettingsProvider>
  );
}
