// Medusa Store API client (server-side).
//
// When NEXT_PUBLIC_MEDUSA_BACKEND_URL + NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY are
// set, the storefront reads its catalogue from Medusa. Otherwise the app falls
// back to the built-in mock catalogue in `data.ts` (see `catalogue.ts`).
//
// Products are mapped into the same `Product` shape the components already use,
// so the UI doesn't need to know where the data came from.

import type { CategoryId, Product } from "./data";

const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

export function isMedusaConfigured(): boolean {
  return Boolean(BACKEND && KEY);
}

// Medusa category name → our internal CategoryId.
const CATEGORY_BY_NAME: Record<string, CategoryId> = {
  "Olive Oil": "olive-oil",
  "Honey & Hive": "honey",
  "Spices & Blends": "spices",
  "Fine Pastries": "pastries",
};

// Products to surface on the home "featured" rail (by handle).
const FEATURED = new Set([
  "chetoui-extra-virgin-500ml",
  "early-harvest-evoo-250ml",
  "rosemary-honey-400g",
  "traditional-harissa-200g",
  "makroudh-date-pastries",
  "ghraiba-sesame-shortbread",
]);

type MedusaVariant = {
  id: string;
  title: string;
  sku?: string;
  calculated_price?: { calculated_amount: number; currency_code: string };
};
type MedusaProduct = {
  id: string;
  handle: string;
  title: string;
  description?: string;
  thumbnail?: string;
  images?: { url: string }[];
  metadata?: { origin?: string } | null;
  categories?: { name: string }[];
  variants?: MedusaVariant[];
};

async function storeFetch(
  path: string,
  params: Record<string, string> = {},
): Promise<any> {
  const url = new URL(`${BACKEND}/store/${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), {
    headers: { "x-publishable-api-key": KEY as string },
    // Catalogue changes rarely; cache for a minute (Next 16: fetch is uncached
    // by default, so opt in explicitly).
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Medusa ${path} responded ${res.status}`);
  }
  return res.json();
}

let cachedRegionId: string | undefined;
async function eurRegionId(): Promise<string | undefined> {
  if (cachedRegionId) return cachedRegionId;
  const { regions } = await storeFetch("regions");
  const region =
    regions?.find((r: { currency_code: string }) => r.currency_code === "eur") ??
    regions?.[0];
  cachedRegionId = region?.id;
  return cachedRegionId;
}

function mapProduct(p: MedusaProduct): Product {
  const variants = (p.variants ?? [])
    .map((v) => ({
      label: v.title,
      priceEUR: v.calculated_price?.calculated_amount ?? 0,
    }))
    .sort((a, b) => a.priceEUR - b.priceEUR);
  const cheapest = variants[0];
  const categoryName = p.categories?.[0]?.name ?? "";
  const origin = p.metadata?.origin ?? "";

  return {
    id: p.id,
    slug: p.handle,
    name: { en: p.title, sv: p.title },
    brandId: "", // brands are not modelled in Medusa yet
    categoryId: CATEGORY_BY_NAME[categoryName] ?? "olive-oil",
    priceEUR: cheapest?.priceEUR ?? 0,
    weight: cheapest?.label ?? "",
    origin: { en: origin, sv: origin },
    description: { en: p.description ?? "", sv: p.description ?? "" },
    stock: "in",
    featured: FEATURED.has(p.handle),
  };
}

/** All products from Medusa, mapped to the storefront `Product` shape. */
export async function fetchMedusaProducts(): Promise<Product[]> {
  const region_id = (await eurRegionId()) ?? "";
  const fields =
    "id,title,handle,description,thumbnail,metadata,*categories,*images,*variants,*variants.calculated_price";
  const { products } = await storeFetch("products", {
    limit: "100",
    region_id,
    fields,
  });
  return (products as MedusaProduct[]).map(mapProduct);
}
