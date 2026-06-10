# Terra Tunis

A multi-brand e-commerce marketplace bringing authentic Tunisian goods (olive oil,
honey, spices, fine pastries) to the Swedish market on a commission model — each
brand keeps its own storefront.

This is **Version 1**: a polished, fully-navigable frontend running on realistic
mock data. There is no backend or live payment yet — checkout is a demonstration.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based `@theme` configuration)
- `next/font` — **Outfit** (display) + **Inter** (body)

## Design system

Sleek, modern, **dark premium** direction: charcoal surfaces, a gold accent, and
glossy cards with glowing category-tinted artwork.

| Token | Value | Use |
|-------|-------|-----|
| `cream` / `sand` / `parchment` | charcoal `#0e0e11` → `#17171c` | App background / elevated / card surfaces |
| `clay` | `#2a2a33` | Borders & dividers |
| `terracotta` | gold `#cca24f` | Primary accent / CTAs (dark `#1a1206` label) |
| `olive` / `tunis` / `gold` | green / coral / honey | Category accents |
| `espresso` / `mocha` / `stone` | light inks | Text (primary / muted / faint) |

> Token names are kept from the original light theme but **remapped to dark values**,
> so the whole site flips theme from one file — [`src/app/globals.css`](src/app/globals.css).

Product imagery uses offline-safe, category-tinted **glossy SVG tiles** with a glow
([`ProductArt`](src/components/ProductArt.tsx)) as a stand-in for real photography —
swap that one component to drop in real photos.

## Features

- **Bilingual** — English / Swedish, toggled live (no page reload), persisted to `localStorage`.
- **Dual currency** — SEK / EUR, with prices stored in EUR and converted at display time.
- **Multi-vendor** — every product belongs to a brand with its own storefront page.
- **Cart** — context + reducer, persisted to `localStorage`, with quantity controls.
- **Checkout** — address form + payment-method selection (Klarna / Swish / Card / PayPal) — mocked.
- **Responsive** — mobile → desktop, with a mobile nav drawer.
- **Accessible** — focus rings, ARIA labels, `prefers-reduced-motion`, semantic markup.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, featured products, brand spotlight, newsletter |
| `/shop` | Full catalogue with category + brand filters and sorting |
| `/product/[slug]` | Product detail — gallery, description, add to cart, related |
| `/brands` | All brands |
| `/brands/[slug]` | Brand storefront — story, details, products |
| `/cart` | Cart with summary + shipping logic |
| `/checkout` | Checkout flow (mock) |
| `/about` | The concept |
| `/contact` | Contact form + details |

## Project structure

```
src/
  app/            # routes (App Router)
  components/     # UI: Header, Footer, ProductCard, BrandCard, ProductArt, icons…
  lib/
    data.ts         # mock catalogue: categories, brands, products (bilingual copy)
    dictionaries.ts # EN/SV UI strings
    settings.tsx    # locale + currency context
    cart.tsx        # cart context (reducer + localStorage)
    money.ts        # currency formatting/conversion
    shipping.ts     # shipping rules
```

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerendered)
```

## Editing the catalogue

All brands and products live in [`src/lib/data.ts`](src/lib/data.ts). Each entry has
`en` / `sv` fields and a EUR base price. Add a product object to `products`, point its
`brandId` / `categoryId` at existing entries, and it appears across the shop, filters,
brand page and (if `featured`) the home page automatically.

## Roadmap (beyond V1)

- Real backend + database (products, brands, orders) and vendor dashboards
- Live payments: Stripe, PayPal, Klarna, Swish
- Locale-prefixed routes (`/sv`, `/en`) for SEO + server-side i18n
- Real product photography (replace `ProductArt`)
- Additional categories: crafts, cosmetics, textiles
