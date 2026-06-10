// Catalogue source of truth for the storefront.
//
// Returns live Medusa data when the backend is configured, otherwise the
// built-in mock catalogue — so the app always builds and runs, and degrades
// gracefully if the backend is unreachable.

import { products as mockProducts, type Product } from "./data";
import { fetchMedusaProducts, isMedusaConfigured } from "./medusa";

export async function getShopProducts(): Promise<Product[]> {
  if (!isMedusaConfigured()) return mockProducts;
  try {
    const products = await fetchMedusaProducts();
    return products.length ? products : mockProducts;
  } catch (err) {
    console.error("[catalogue] Medusa fetch failed, falling back to mock:", err);
    return mockProducts;
  }
}
