// Terra Tunis — domain data (mock catalogue).
// Prices are stored in EUR (base) and converted at display time.

import type { Locale } from "./dictionaries";

export type Localized = Record<Locale, string>;
export type StockStatus = "in" | "low" | "out";

export type CategoryId = "olive-oil" | "honey" | "spices" | "pastries";

export interface Category {
  id: CategoryId;
  slug: CategoryId;
  name: Localized;
  blurb: Localized;
  /** Tailwind-friendly accent used for the placeholder artwork. */
  accent: string;
  accentSoft: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  region: Localized;
  founded: number;
  tagline: Localized;
  story: Localized[]; // paragraphs
  accent: string;
  accentSoft: string;
}

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  brandId: string;
  categoryId: CategoryId;
  priceEUR: number;
  weight: string;
  origin: Localized;
  description: Localized;
  stock: StockStatus;
  featured: boolean;
}

export const categories: Category[] = [
  {
    id: "olive-oil",
    slug: "olive-oil",
    name: { en: "Olive Oil", sv: "Olivolja" },
    blurb: {
      en: "Cold-pressed, single-estate oils from ancient groves.",
      sv: "Kallpressade oljor från uråldriga olivlundar.",
    },
    accent: "#a7b86a",
    accentSoft: "#1c2016",
  },
  {
    id: "honey",
    slug: "honey",
    name: { en: "Honey & Hive", sv: "Honung & bikupa" },
    blurb: {
      en: "Raw, unfiltered honeys from mountain and coastal flora.",
      sv: "Rå, ofiltrerad honung från berg och kust.",
    },
    accent: "#e2b65a",
    accentSoft: "#221c10",
  },
  {
    id: "spices",
    slug: "spices",
    name: { en: "Spices & Blends", sv: "Kryddor & blandningar" },
    blurb: {
      en: "Hand-ground harissa, tabil and heirloom blends.",
      sv: "Handmalen harissa, tabil och traditionella blandningar.",
    },
    accent: "#d8694f",
    accentSoft: "#231411",
  },
  {
    id: "pastries",
    slug: "pastries",
    name: { en: "Fine Pastries", sv: "Fina bakverk" },
    blurb: {
      en: "Date, almond and sesame sweets made the old way.",
      sv: "Sötsaker av dadlar, mandel och sesam, gjorda på gammalt vis.",
    },
    accent: "#d89a63",
    accentSoft: "#221913",
  },
];

export const brands: Brand[] = [
  {
    id: "el-founti",
    slug: "domaine-el-founti",
    name: "Domaine El Founti",
    region: { en: "Sfax, Tunisia", sv: "Sfax, Tunisien" },
    founded: 1936,
    tagline: {
      en: "Four generations of olive growers",
      sv: "Fyra generationer olivodlare",
    },
    story: [
      {
        en: "On the sun-baked plains around Sfax, the El Founti family has tended the same olive groves since 1936. Some of their Chemlali trees are over two centuries old, their roots reaching deep into the red Tunisian earth.",
        sv: "På de soldränkta slätterna kring Sfax har familjen El Founti skött samma olivlundar sedan 1936. Några av deras Chemlali-träd är över tvåhundra år gamla, med rötter djupt ner i den röda tunisiska myllan.",
      },
      {
        en: "Every harvest is hand-picked and cold-pressed within hours, locking in the green, peppery character their oils are known for. Nothing is rushed, and nothing is added.",
        sv: "Varje skörd plockas för hand och kallpressas inom några timmar, vilket bevarar den gröna, peppriga karaktär deras oljor är kända för. Inget forceras, och inget tillsätts.",
      },
    ],
    accent: "#a7b86a",
    accentSoft: "#1c2016",
  },
  {
    id: "kroumirie",
    slug: "ruchers-de-kroumirie",
    name: "Les Ruchers de Kroumirie",
    region: { en: "Aïn Draham, Tunisia", sv: "Aïn Draham, Tunisien" },
    founded: 1998,
    tagline: {
      en: "Honey from the misty northern forests",
      sv: "Honung från de dimmiga nordliga skogarna",
    },
    story: [
      {
        en: "In the cork-oak forests of Kroumirie, where Mediterranean mist clings to the hills, a small cooperative of beekeepers moves its hives with the seasons — to rosemary in spring, eucalyptus in summer, wild thyme in the highlands.",
        sv: "I korkekskogarna i Kroumirie, där medelhavsdimman lägger sig över kullarna, flyttar ett litet kooperativ av biodlare sina kupor med årstiderna — till rosmarin på våren, eukalyptus på sommaren och vild timjan i bergen.",
      },
      {
        en: "Their honey is never heated or filtered under pressure, preserving the pollen, aroma and living enzymes exactly as the bees intended.",
        sv: "Deras honung värms aldrig upp eller filtreras under tryck, vilket bevarar pollen, arom och levande enzymer precis som bina avsåg.",
      },
    ],
    accent: "#e2b65a",
    accentSoft: "#221c10",
  },
  {
    id: "dar-toumi",
    slug: "dar-toumi",
    name: "Dar Toumi",
    region: { en: "Nabeul, Tunisia", sv: "Nabeul, Tunisien" },
    founded: 2009,
    tagline: {
      en: "The spice souk, bottled",
      sv: "Kryddsouken, på flaska",
    },
    story: [
      {
        en: "Nabeul's markets have perfumed the Cap Bon peninsula with chilli, coriander and caraway for centuries. Dar Toumi grew out of one family stall, grinding spices fresh to order on a worn stone mill.",
        sv: "Nabeuls marknader har parfymerat halvön Cap Bon med chili, koriander och kummin i århundraden. Dar Toumi växte fram ur ett familjestånd som malde kryddor färska på en sliten stenkvarn.",
      },
      {
        en: "Their harissa follows a recipe unchanged for generations: sun-dried chillies, garlic, caraway and a thread of olive oil — fiery, smoky and deeply aromatic.",
        sv: "Deras harissa följer ett recept som varit oförändrat i generationer: soltorkad chili, vitlök, kummin och en skvätt olivolja — eldig, rökig och djupt aromatisk.",
      },
    ],
    accent: "#d8694f",
    accentSoft: "#231411",
  },
  {
    id: "maison-zituna",
    slug: "maison-zituna",
    name: "Maison Zituna",
    region: { en: "Sfax, Tunisia", sv: "Sfax, Tunisien" },
    founded: 1974,
    tagline: {
      en: "Pastries for feasts and festivals",
      sv: "Bakverk för fester och högtider",
    },
    story: [
      {
        en: "Sfax is famous across Tunisia for its confectionery, and Maison Zituna has been at its heart since 1974. Their makroudh — semolina diamonds filled with date paste and dipped in honey — are made each morning by hand.",
        sv: "Sfax är känt i hela Tunisien för sitt konditori, och Maison Zituna har stått i centrum sedan 1974. Deras makroudh — semolinarutor fyllda med dadelpasta och doppade i honung — görs varje morgon för hand.",
      },
      {
        en: "Almonds, sesame, orange blossom and rosewater: the building blocks of a tradition that turns simple ingredients into something worthy of celebration.",
        sv: "Mandel, sesam, apelsinblom och rosenvatten: byggstenarna i en tradition som förvandlar enkla ingredienser till något värt att fira.",
      },
    ],
    accent: "#d89a63",
    accentSoft: "#221913",
  },
  {
    id: "cap-bon",
    slug: "cap-bon-gourmet",
    name: "Cap Bon Gourmet",
    region: { en: "Cap Bon, Tunisia", sv: "Cap Bon, Tunisien" },
    founded: 2015,
    tagline: {
      en: "The Mediterranean larder",
      sv: "Medelhavets skafferi",
    },
    story: [
      {
        en: "The Cap Bon peninsula is Tunisia's garden — citrus orchards, olive groves and fields of chilli running down to the sea. Cap Bon Gourmet is a young collective bringing the region's pantry staples to new tables.",
        sv: "Halvön Cap Bon är Tunisiens trädgård — citrusodlingar, olivlundar och chilifält som löper ner mot havet. Cap Bon Gourmet är ett ungt kollektiv som tar regionens skafferivaror till nya bord.",
      },
      {
        en: "From organic olive oil in elegant tins to slow-cooked harissa, every jar is a small piece of the Tunisian coastline.",
        sv: "Från ekologisk olivolja i eleganta plåtburkar till långkokt harissa — varje burk är en liten bit av den tunisiska kusten.",
      },
    ],
    accent: "#c2b25a",
    accentSoft: "#201e11",
  },
];

export const products: Product[] = [
  // ---- Olive oil ----
  {
    id: "p-chetoui-500",
    slug: "chetoui-extra-virgin-500ml",
    name: { en: "Chetoui Extra Virgin Olive Oil", sv: "Chetoui Extra Jungfruolja" },
    brandId: "el-founti",
    categoryId: "olive-oil",
    priceEUR: 16,
    weight: "500 ml",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "A robust, grassy oil pressed from Chetoui olives at first harvest. Notes of green almond and artichoke with a peppery finish — superb for finishing soups, grilled vegetables and fresh bread.",
      sv: "En robust, gräsig olja pressad på Chetoui-oliver vid första skörd. Toner av grön mandel och kronärtskocka med en pepprig eftersmak — utmärkt till soppor, grillade grönsaker och färskt bröd.",
    },
    stock: "in",
    featured: true,
  },
  {
    id: "p-chemlali-1l",
    slug: "chemlali-evoo-1l",
    name: { en: "Chemlali Everyday Olive Oil", sv: "Chemlali Vardagsolivolja" },
    brandId: "el-founti",
    categoryId: "olive-oil",
    priceEUR: 22,
    weight: "1 L",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Smooth and mellow with a buttery roundness, this is the family's table oil — equally at home drizzled raw or used for everyday cooking.",
      sv: "Mjuk och rund med en smörig karaktär — familjens bordsolja som passar lika bra rå som till vardagsmatlagning.",
    },
    stock: "in",
    featured: false,
  },
  {
    id: "p-early-harvest-250",
    slug: "early-harvest-evoo-250ml",
    name: { en: "Early Harvest Olive Oil", sv: "Tidig Skörd Olivolja" },
    brandId: "el-founti",
    categoryId: "olive-oil",
    priceEUR: 19,
    weight: "250 ml",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Picked green and pressed early for an intense, polyphenol-rich oil. Bold, bitter and alive — a connoisseur's bottle.",
      sv: "Plockad grön och pressad tidigt för en intensiv, polyfenolrik olja. Djärv, besk och levande — en kännares flaska.",
    },
    stock: "low",
    featured: true,
  },
  {
    id: "p-organic-tin-750",
    slug: "organic-evoo-tin-750ml",
    name: { en: "Organic Olive Oil Tin", sv: "Ekologisk Olivolja i Plåt" },
    brandId: "cap-bon",
    categoryId: "olive-oil",
    priceEUR: 26,
    weight: "750 ml",
    origin: { en: "Cap Bon", sv: "Cap Bon" },
    description: {
      en: "Certified-organic blend in a light-proof tin that keeps the oil fresh to the last drop. Balanced, fruity and endlessly versatile.",
      sv: "Certifierat ekologisk blandning i en ljustät plåtburk som håller oljan färsk till sista droppen. Balanserad, fruktig och oändligt användbar.",
    },
    stock: "in",
    featured: false,
  },

  // ---- Honey ----
  {
    id: "p-rosemary-400",
    slug: "rosemary-honey-400g",
    name: { en: "Rosemary Honey", sv: "Rosmarinhonung" },
    brandId: "kroumirie",
    categoryId: "honey",
    priceEUR: 13,
    weight: "400 g",
    origin: { en: "Aïn Draham", sv: "Aïn Draham" },
    description: {
      en: "Pale gold and delicately floral, gathered as the spring rosemary blooms across the hills. Slow to crystallise, lovely in tea or over yogurt.",
      sv: "Blekt gyllene och delikat blommig, skördad när vårens rosmarin blommar över kullarna. Kristalliserar långsamt, ljuvlig i te eller över yoghurt.",
    },
    stock: "in",
    featured: true,
  },
  {
    id: "p-eucalyptus-400",
    slug: "eucalyptus-honey-400g",
    name: { en: "Eucalyptus Honey", sv: "Eukalyptushonung" },
    brandId: "kroumirie",
    categoryId: "honey",
    priceEUR: 13,
    weight: "400 g",
    origin: { en: "Aïn Draham", sv: "Aïn Draham" },
    description: {
      en: "Amber and aromatic with a faintly balsamic edge — a robust honey traditionally taken by the spoonful through the winter months.",
      sv: "Bärnstensfärgad och aromatisk med en svagt balsamisk ton — en robust honung som traditionellt tas med sked under vintermånaderna.",
    },
    stock: "in",
    featured: false,
  },
  {
    id: "p-thyme-250",
    slug: "wild-thyme-honey-250g",
    name: { en: "Wild Thyme Honey", sv: "Vild Timjanhonung" },
    brandId: "kroumirie",
    categoryId: "honey",
    priceEUR: 15,
    weight: "250 g",
    origin: { en: "Kroumirie highlands", sv: "Kroumiriehöglandet" },
    description: {
      en: "A rare highland honey with a warm, herbaceous intensity. Limited to a few hives each summer.",
      sv: "En sällsynt höglandshonung med en varm, örtig intensitet. Begränsad till några få kupor varje sommar.",
    },
    stock: "low",
    featured: false,
  },
  {
    id: "p-bee-pollen-120",
    slug: "bee-pollen-120g",
    name: { en: "Wildflower Bee Pollen", sv: "Bipollen från Vilda Blommor" },
    brandId: "kroumirie",
    categoryId: "honey",
    priceEUR: 11,
    weight: "120 g",
    origin: { en: "Aïn Draham", sv: "Aïn Draham" },
    description: {
      en: "Golden granules gathered at the hive entrance — earthy and floral, a spoonful over breakfast bowls or smoothies.",
      sv: "Gyllene korn samlade vid kupans ingång — jordiga och blommiga, en sked över frukostskålar eller smoothies.",
    },
    stock: "in",
    featured: false,
  },

  // ---- Spices ----
  {
    id: "p-harissa-trad-200",
    slug: "traditional-harissa-200g",
    name: { en: "Traditional Harissa", sv: "Traditionell Harissa" },
    brandId: "dar-toumi",
    categoryId: "spices",
    priceEUR: 9,
    weight: "200 g",
    origin: { en: "Nabeul", sv: "Nabeul" },
    description: {
      en: "The cornerstone of Tunisian cooking: sun-dried chillies pounded with garlic and caraway, finished with olive oil. Smoky, fiery and fragrant.",
      sv: "Hörnstenen i tunisisk matlagning: soltorkad chili stött med vitlök och kummin, avslutad med olivolja. Rökig, eldig och doftande.",
    },
    stock: "in",
    featured: true,
  },
  {
    id: "p-tabil-100",
    slug: "tabil-spice-blend-100g",
    name: { en: "Tabil Spice Blend", sv: "Tabil Kryddblandning" },
    brandId: "dar-toumi",
    categoryId: "spices",
    priceEUR: 8,
    weight: "100 g",
    origin: { en: "Nabeul", sv: "Nabeul" },
    description: {
      en: "Tunisia's everyday blend of coriander, caraway, garlic and chilli. Stir into stews, rub onto meat, or fold through couscous.",
      sv: "Tunisiens vardagsblandning av koriander, kummin, vitlök och chili. Rör ner i grytor, gnid in i kött eller blanda i couscous.",
    },
    stock: "in",
    featured: false,
  },
  {
    id: "p-ras-el-hanout-80",
    slug: "ras-el-hanout-80g",
    name: { en: "Ras el Hanout", sv: "Ras el Hanout" },
    brandId: "dar-toumi",
    categoryId: "spices",
    priceEUR: 10,
    weight: "80 g",
    origin: { en: "Nabeul", sv: "Nabeul" },
    description: {
      en: "A fragrant union of a dozen spices — cinnamon, rosebud, cardamom and more. The 'top of the shop', and the soul of festive tagines.",
      sv: "En doftande förening av ett dussin kryddor — kanel, rosenknopp, kardemumma och mer. 'Butikens bästa' och själen i festliga tagines.",
    },
    stock: "in",
    featured: false,
  },
  {
    id: "p-harissa-cap-bon-180",
    slug: "rose-harissa-180g",
    name: { en: "Rose Harissa", sv: "Rosenharissa" },
    brandId: "cap-bon",
    categoryId: "spices",
    priceEUR: 11,
    weight: "180 g",
    origin: { en: "Cap Bon", sv: "Cap Bon" },
    description: {
      en: "A softer, perfumed harissa rounded with dried rose petals. Less fierce, beautifully aromatic — wonderful with roasted vegetables.",
      sv: "En mjukare, parfymerad harissa rundad med torkade rosenblad. Mindre het, vackert aromatisk — underbar till rostade grönsaker.",
    },
    stock: "out",
    featured: false,
  },

  // ---- Pastries ----
  {
    id: "p-makroudh-box",
    slug: "makroudh-date-pastries",
    name: { en: "Makroudh — Date Semolina Pastries", sv: "Makroudh — Dadelsemolinabakverk" },
    brandId: "maison-zituna",
    categoryId: "pastries",
    priceEUR: 18,
    weight: "500 g",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Golden semolina diamonds filled with spiced date paste and bathed in honey. Sfax's most beloved sweet, baked fresh and boxed for the journey.",
      sv: "Gyllene semolinarutor fyllda med kryddad dadelpasta och badade i honung. Sfax mest älskade sötsak, nybakad och förpackad för resan.",
    },
    stock: "in",
    featured: true,
  },
  {
    id: "p-baklawa-assortment",
    slug: "baklawa-assortment",
    name: { en: "Baklawa Assortment", sv: "Baklawa-sortiment" },
    brandId: "maison-zituna",
    categoryId: "pastries",
    priceEUR: 24,
    weight: "600 g",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Layered filo with pistachio, almond and hazelnut, perfumed with orange blossom. An assortment to share — or not.",
      sv: "Skiktad filodeg med pistage, mandel och hasselnöt, parfymerad med apelsinblom. Ett sortiment att dela — eller inte.",
    },
    stock: "in",
    featured: false,
  },
  {
    id: "p-kaak-warka",
    slug: "kaak-warka-almond-rings",
    name: { en: "Kaak Warka — Almond Rings", sv: "Kaak Warka — Mandelringar" },
    brandId: "maison-zituna",
    categoryId: "pastries",
    priceEUR: 22,
    weight: "400 g",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Delicate rings of almond paste scented with rosewater, dusted in sugar. A wedding-table classic, light as air.",
      sv: "Delikata ringar av mandelmassa med rosenvatten, pudrade i socker. En klassiker på bröllopsbordet, lätt som en fjäder.",
    },
    stock: "low",
    featured: false,
  },
  {
    id: "p-ghraiba-sesame",
    slug: "ghraiba-sesame-shortbread",
    name: { en: "Ghraïba — Sesame Shortbread", sv: "Ghraïba — Sesamkaka" },
    brandId: "maison-zituna",
    categoryId: "pastries",
    priceEUR: 14,
    weight: "350 g",
    origin: { en: "Sfax", sv: "Sfax" },
    description: {
      en: "Crumbly, melt-in-the-mouth shortbread rich with toasted sesame. The kind of biscuit that disappears with a glass of mint tea.",
      sv: "Smulig sesamkaka som smälter i munnen, rik på rostad sesam. Den sorts kaka som försvinner med ett glas myntate.",
    },
    stock: "in",
    featured: true,
  },
];

// ---- Lookups & helpers ----

const brandById = new Map(brands.map((b) => [b.id, b]));
const categoryById = new Map(categories.map((c) => [c.id, c]));

export function getBrand(id: string): Brand | undefined {
  return brandById.get(id);
}
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
export function getCategory(id: CategoryId): Category | undefined {
  return categoryById.get(id);
}
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function productsByBrand(brandId: string): Product[] {
  return products.filter((p) => p.brandId === brandId);
}
export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}
/**
 * Mock social proof: a deterministic pseudo-rating derived from the product id,
 * so it is stable across renders/sessions without a backend. V1 only —
 * replaced by real reviews once there is a database.
 */
export function ratingFor(product: Product): { stars: number; count: number } {
  let h = 0;
  for (let i = 0; i < product.id.length; i++) {
    h = (h * 31 + product.id.charCodeAt(i)) % 997;
  }
  return {
    stars: Math.round((4.3 + (h % 7) / 10) * 10) / 10, // 4.3 – 4.9
    count: 14 + (h % 113),
  };
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .concat(products.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId))
    .slice(0, count);
}
