# Backend (Medusa v2)

Located in [`backend/`](../backend). A flat Medusa v2 app (flattened out of the
turborepo starter) pointed at the local `e-shop` Postgres.

## Layout

```
backend/
├── .env                       # DATABASE_URL, CORS, secrets (gitignored)
├── medusa-config.ts           # Medusa config (DB + CORS + modules)
├── src/
│   ├── api/                   # custom REST routes (store/* and admin/*)
│   ├── modules/               # custom modules (e.g. future "brand" module)
│   ├── workflows/             # custom workflows
│   ├── subscribers/           # event handlers
│   ├── jobs/                  # scheduled jobs
│   └── scripts/
│       └── seed.ts            # ← Terra Tunis catalogue seed
└── package.json
```

## Commands

```bash
npm run dev                         # develop (API :9000 + admin /app)
npm run build                       # production build
npm run start                       # run the built server
npx medusa db:migrate               # run migrations
npx medusa user -e <email> -p <pw>  # create an admin user
npx medusa exec ./src/scripts/seed.ts   # seed the catalogue
```

## What the seed creates

`src/scripts/seed.ts`:

- **Store** with currencies **EUR (default) + SEK**
- **Sales channel** "Terra Tunis Storefront" + a **publishable API key** (printed)
- **Region** "Europe" (EUR) incl. Sweden + neighbours, with tax regions
- **Stock location** "Stockholm Warehouse" + **Standard Shipping** (EUR/SEK)
- **4 categories**: Olive Oil · Honey & Hive · Spices & Blends · Fine Pastries
- **16 products** with size **variants** (e.g. 250 ml / 500 ml / 1 L), EUR + SEK
  prices, images as `/products/<slug>.jpg`, and `metadata.origin`

Variants use `manage_inventory: false` (everything purchasable; no inventory
records needed for V1).

## API surface used by the storefront

- `GET /store/products?fields=...&limit=...` — list products (needs
  `x-publishable-api-key` header)
- `GET /store/products?handle=<slug>` — single product by handle
- `GET /store/product-categories` — categories

## Notes / next steps

- **Brands** aren't a native Medusa concept — they'll be a small custom module
  (`src/modules/brand`) linked to products. Mock brands remain in the storefront
  until then.
- **Redis** is intentionally not configured locally. On the VPS, add the Redis
  modules (event bus + cache + workflow engine) in `medusa-config.ts`.
- **Secrets** (`JWT_SECRET`, `COOKIE_SECRET`) are `supersecret` locally — replace
  with strong values on the VPS.
