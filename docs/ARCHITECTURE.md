# Architecture

Terra Tunis is a **headless commerce** setup: a Medusa backend owns all commerce
data and logic, and a Next.js storefront renders it.

```
                 ┌──────────────────────────┐
   Browser  ───► │   storefront (Next.js 16) │  :3000
                 │   - server components      │
                 │   - fetches Store API      │
                 └────────────┬───────────────┘
                              │  HTTP  (x-publishable-api-key)
                              ▼
                 ┌──────────────────────────┐
                 │   backend (Medusa v2)     │  :9000
                 │   - Store API  /store/*    │
                 │   - Admin API  /admin/*    │
                 │   - Admin panel /app       │
                 └────────────┬───────────────┘
                              │
                       PostgreSQL  (e-shop)
                       (Redis on the VPS only)
```

## Responsibilities

| Concern | Owner |
|---------|-------|
| Products, variants, prices, categories, inventory | Medusa (Postgres) |
| Cart, orders, checkout, discounts/coupons, payments | Medusa |
| Auth / customer accounts | Medusa (Google login planned) |
| UI, routing, i18n (EN/SV), currency display toggle | Storefront |
| Product imagery | Served from `storefront/public/products` via relative URLs stored in Medusa |

## Catalogue data flow

1. The catalogue is **seeded** into Medusa from
   [`backend/src/scripts/seed.ts`](../backend/src/scripts/seed.ts) — 4 categories,
   16 products, size variants, EUR + SEK prices.
2. The storefront reads products from Medusa's **Store API** using a publishable
   API key, in server components (Next.js 16: `fetch` runs on the server, not
   cached by default).
3. Product images are stored in Medusa as relative paths (`/products/<slug>.jpg`)
   and served by the storefront's own `public/` folder — so no CDN is needed
   locally, and on the VPS you can swap to Cloudflare/R2.

## Currency & i18n

- Medusa stores prices per currency (EUR default + SEK).
- The storefront keeps its live **EN/SV** UI translation and **SEK/EUR** display
  toggle. Product *content* (titles/descriptions) is currently English-only in
  Medusa; bilingual product content is a later enhancement (translation module).

## What's wired vs. planned

| Area | Status |
|------|--------|
| Medusa backend on local Postgres | ✅ |
| Catalogue seed (categories, products, variants, brand metadata) | ✅ |
| Storefront reads catalogue from Medusa — home, shop, product detail, brands, search | ✅ (via the catalogue context; mock fallback) |
| Brands (content in storefront, linked to products via Medusa metadata) | ✅ |
| Cart resolves products via the catalogue context | ✅ (cart state still localStorage) |
| Cart/checkout persisted as Medusa carts/orders | ⏳ planned |
| Google auth | ⏳ planned |
| Stripe payments + coupons | ⏳ planned |
| Multi-vendor commission (Stripe Connect) | ⏳ later |

### How the storefront reads data

The root layout (`storefront/src/app/layout.tsx`) fetches the catalogue once on
the server via `getShopProducts()` and passes it to a client `CatalogueProvider`
(`src/lib/catalogue-context.tsx`). Every client component — home featured rail,
shop filters, product detail (incl. variants), brand pages, search, and the cart
line lookups — reads from `useCatalogue()`, so there is a single source of truth
and the cart can resolve any product the catalogue knows about. Categories and
brand *content* (stories, accents) remain editorial data in `data.ts`; products
link to brands by id through Medusa product metadata.

## Roadmap

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the VPS plan. Build order:
catalogue (done) → cart/checkout → Google auth → Stripe + coupons → (later) vendors.
