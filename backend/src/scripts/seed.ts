import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * Terra Tunis catalogue seed.
 *
 * Run with:  npx medusa exec ./src/scripts/seed.ts
 *
 * Sets up: EUR (default) + SEK currencies, a Europe region incl. Sweden,
 * a warehouse + standard shipping, the 4 categories, and all 16 products
 * with their size variants. Product images use relative `/products/<slug>.jpg`
 * paths served by the storefront's own /public folder (no CDN needed locally).
 *
 * Idempotency: this is a first-run seed. Re-running on a populated DB will
 * create duplicates — drop/recreate the `e-shop` DB (or `medusa db:migrate`
 * on a fresh DB) before re-seeding.
 */

// Rough SEK rate for seeding dual-currency prices (display conversion still
// happens in the storefront for fine-grained control).
const SEK = (eur: number) => Math.round(eur * 11.3);

type SeedVariant = { id: string; label: string; eur: number };
type SeedProduct = {
  slug: string;
  title: string;
  category: string; // category name
  origin: string;
  description: string;
  variants: SeedVariant[];
};

const CATEGORIES = [
  "Olive Oil",
  "Honey & Hive",
  "Spices & Blends",
  "Fine Pastries",
];

const CATALOGUE: SeedProduct[] = [
  // ---- Olive Oil ----
  {
    slug: "chetoui-extra-virgin-500ml",
    title: "Chetoui Extra Virgin Olive Oil",
    category: "Olive Oil",
    origin: "Sfax",
    description:
      "A robust, grassy oil pressed from Chetoui olives at first harvest. Notes of green almond and artichoke with a peppery finish — superb for finishing soups, grilled vegetables and fresh bread.",
    variants: [
      { id: "250ml", label: "250 ml", eur: 9 },
      { id: "500ml", label: "500 ml", eur: 16 },
      { id: "1l", label: "1 L", eur: 28 },
    ],
  },
  {
    slug: "chemlali-evoo-1l",
    title: "Chemlali Everyday Olive Oil",
    category: "Olive Oil",
    origin: "Sfax",
    description:
      "Smooth and mellow with a buttery roundness, this is the family's table oil — equally at home drizzled raw or used for everyday cooking.",
    variants: [
      { id: "500ml", label: "500 ml", eur: 13 },
      { id: "1l", label: "1 L", eur: 22 },
      { id: "3l", label: "3 L", eur: 58 },
    ],
  },
  {
    slug: "early-harvest-evoo-250ml",
    title: "Early Harvest Olive Oil",
    category: "Olive Oil",
    origin: "Sfax",
    description:
      "Picked green and pressed early for an intense, polyphenol-rich oil. Bold, bitter and alive — a connoisseur's bottle.",
    variants: [
      { id: "250ml", label: "250 ml", eur: 19 },
      { id: "500ml", label: "500 ml", eur: 34 },
    ],
  },
  {
    slug: "organic-evoo-tin-750ml",
    title: "Organic Olive Oil Tin",
    category: "Olive Oil",
    origin: "Cap Bon",
    description:
      "Certified-organic blend in a light-proof tin that keeps the oil fresh to the last drop. Balanced, fruity and endlessly versatile.",
    variants: [
      { id: "500ml", label: "500 ml", eur: 19 },
      { id: "750ml", label: "750 ml", eur: 26 },
      { id: "3l", label: "3 L tin", eur: 89 },
    ],
  },
  // ---- Honey & Hive ----
  {
    slug: "rosemary-honey-400g",
    title: "Rosemary Honey",
    category: "Honey & Hive",
    origin: "Aïn Draham",
    description:
      "Pale gold and delicately floral, gathered as the spring rosemary blooms across the hills. Slow to crystallise, lovely in tea or over yogurt.",
    variants: [
      { id: "250g", label: "250 g", eur: 9 },
      { id: "400g", label: "400 g", eur: 13 },
      { id: "700g", label: "700 g", eur: 21 },
    ],
  },
  {
    slug: "eucalyptus-honey-400g",
    title: "Eucalyptus Honey",
    category: "Honey & Hive",
    origin: "Aïn Draham",
    description:
      "Amber and aromatic with a faintly balsamic edge — a robust honey traditionally taken by the spoonful through the winter months.",
    variants: [
      { id: "250g", label: "250 g", eur: 9 },
      { id: "400g", label: "400 g", eur: 13 },
    ],
  },
  {
    slug: "wild-thyme-honey-250g",
    title: "Wild Thyme Honey",
    category: "Honey & Hive",
    origin: "Kroumirie highlands",
    description:
      "A rare highland honey with a warm, herbaceous intensity. Limited to a few hives each summer.",
    variants: [
      { id: "250g", label: "250 g", eur: 15 },
      { id: "500g", label: "500 g", eur: 28 },
    ],
  },
  {
    slug: "bee-pollen-120g",
    title: "Wildflower Bee Pollen",
    category: "Honey & Hive",
    origin: "Aïn Draham",
    description:
      "Golden granules gathered at the hive entrance — earthy and floral, a spoonful over breakfast bowls or smoothies.",
    variants: [
      { id: "120g", label: "120 g", eur: 11 },
      { id: "250g", label: "250 g", eur: 20 },
    ],
  },
  // ---- Spices & Blends ----
  {
    slug: "traditional-harissa-200g",
    title: "Traditional Harissa",
    category: "Spices & Blends",
    origin: "Nabeul",
    description:
      "The cornerstone of Tunisian cooking: sun-dried chillies pounded with garlic and caraway, finished with olive oil. Smoky, fiery and fragrant.",
    variants: [
      { id: "100g", label: "100 g", eur: 6 },
      { id: "200g", label: "200 g", eur: 9 },
      { id: "400g", label: "400 g", eur: 16 },
    ],
  },
  {
    slug: "tabil-spice-blend-100g",
    title: "Tabil Spice Blend",
    category: "Spices & Blends",
    origin: "Nabeul",
    description:
      "Tunisia's everyday blend of coriander, caraway, garlic and chilli. Stir into stews, rub onto meat, or fold through couscous.",
    variants: [
      { id: "100g", label: "100 g", eur: 8 },
      { id: "250g", label: "250 g", eur: 17 },
    ],
  },
  {
    slug: "ras-el-hanout-80g",
    title: "Ras el Hanout",
    category: "Spices & Blends",
    origin: "Nabeul",
    description:
      "A fragrant union of a dozen spices — cinnamon, rosebud, cardamom and more. The 'top of the shop', and the soul of festive tagines.",
    variants: [
      { id: "80g", label: "80 g", eur: 10 },
      { id: "200g", label: "200 g", eur: 22 },
    ],
  },
  {
    slug: "rose-harissa-180g",
    title: "Rose Harissa",
    category: "Spices & Blends",
    origin: "Cap Bon",
    description:
      "A softer, perfumed harissa rounded with dried rose petals. Less fierce, beautifully aromatic — wonderful with roasted vegetables.",
    variants: [
      { id: "180g", label: "180 g", eur: 11 },
      { id: "350g", label: "350 g", eur: 20 },
    ],
  },
  // ---- Fine Pastries ----
  {
    slug: "makroudh-date-pastries",
    title: "Makroudh — Date Semolina Pastries",
    category: "Fine Pastries",
    origin: "Sfax",
    description:
      "Golden semolina diamonds filled with spiced date paste and bathed in honey. Sfax's most beloved sweet, baked fresh and boxed for the journey.",
    variants: [
      { id: "250g", label: "250 g", eur: 10 },
      { id: "500g", label: "500 g", eur: 18 },
      { id: "1kg", label: "1 kg", eur: 33 },
    ],
  },
  {
    slug: "baklawa-assortment",
    title: "Baklawa Assortment",
    category: "Fine Pastries",
    origin: "Sfax",
    description:
      "Layered filo with pistachio, almond and hazelnut, perfumed with orange blossom. An assortment to share — or not.",
    variants: [
      { id: "300g", label: "300 g", eur: 13 },
      { id: "600g", label: "600 g", eur: 24 },
      { id: "1.2kg", label: "1.2 kg", eur: 45 },
    ],
  },
  {
    slug: "kaak-warka-almond-rings",
    title: "Kaak Warka — Almond Rings",
    category: "Fine Pastries",
    origin: "Sfax",
    description:
      "Delicate rings of almond paste scented with rosewater, dusted in sugar. A wedding-table classic, light as air.",
    variants: [
      { id: "200g", label: "200 g", eur: 12 },
      { id: "400g", label: "400 g", eur: 22 },
    ],
  },
  {
    slug: "ghraiba-sesame-shortbread",
    title: "Ghraïba — Sesame Shortbread",
    category: "Fine Pastries",
    origin: "Sfax",
    description:
      "Crumbly, melt-in-the-mouth shortbread rich with toasted sesame. The kind of biscuit that disappears with a glass of mint tea.",
    variants: [
      { id: "350g", label: "350 g", eur: 14 },
      { id: "700g", label: "700 g", eur: 26 },
    ],
  },
];

export default async function seedTerraTunis({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  const countries = ["se", "dk", "fi", "no", "de", "fr", "es", "it", "gb"];

  logger.info("Terra Tunis — seeding store, sales channel & API key…");
  const {
    result: [salesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [{ name: "Terra Tunis Storefront" }],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Storefront Publishable Key",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: { id: publishableApiKey.id, add: [salesChannel.id] },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Terra Tunis",
          supported_currencies: [
            { currency_code: "eur", is_default: true },
            { currency_code: "sek", is_default: false },
          ],
          default_sales_channel_id: salesChannel.id,
        },
      ],
    },
  });

  logger.info("Seeding region (Europe, EUR) incl. Sweden…");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];

  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });

  logger.info("Seeding stock location + fulfillment…");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container
  ).run({
    input: {
      locations: [
        {
          name: "Stockholm Warehouse",
          address: { city: "Stockholm", country_code: "SE", address_1: "" },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  const { data: shippingProfileResult } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });
  const shippingProfile = shippingProfileResult[0];

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Europe delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: countries.map((country_code) => ({
          country_code,
          type: "country" as const,
        })),
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ships in 2-4 days.",
          code: "standard",
        },
        prices: [
          { currency_code: "eur", amount: 5 },
          { currency_code: "sek", amount: 59 },
          { region_id: region.id, amount: 5 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [salesChannel.id] },
  });

  logger.info("Seeding categories…");
  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: CATEGORIES.map((name) => ({
        name,
        is_active: true,
      })),
    },
  });
  const catId = (name: string) =>
    categoryResult.find((c) => c.name === name)!.id;

  logger.info(`Seeding ${CATALOGUE.length} products…`);
  await createProductsWorkflow(container).run({
    input: {
      products: CATALOGUE.map((p) => ({
        title: p.title,
        handle: p.slug,
        description: p.description,
        status: ProductStatus.PUBLISHED,
        category_ids: [catId(p.category)],
        shipping_profile_id: shippingProfile.id,
        images: [{ url: `/products/${p.slug}.jpg` }],
        metadata: { origin: p.origin },
        options: [{ title: "Size", values: p.variants.map((v) => v.label) }],
        variants: p.variants.map((v) => ({
          title: v.label,
          sku: `${p.slug}-${v.id}`,
          // No inventory management for V1 — everything is purchasable.
          manage_inventory: false,
          options: { Size: v.label },
          prices: [
            { currency_code: "eur", amount: v.eur },
            { currency_code: "sek", amount: SEK(v.eur) },
          ],
        })),
        sales_channels: [{ id: salesChannel.id }],
      })),
    },
  });

  logger.info("✅ Terra Tunis catalogue seeded.");
  logger.info(
    `🔑 Storefront publishable key: ${publishableApiKey.token}\n` +
      "   Put this in storefront/.env.local as NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
  );
}
