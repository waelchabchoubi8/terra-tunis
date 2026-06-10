# Terra Tunis — monorepo

A multi-brand e-commerce marketplace bringing authentic Tunisian goods (olive oil,
honey, spices, fine pastries) to the Swedish market, on a commission model.

This repository is a **monorepo with two apps**:

```
eswede/
├── storefront/   → Next.js 16 customer storefront (the shop UI)
├── backend/      → Medusa v2 commerce engine (catalogue, orders, payments, admin)
├── docs/         → setup, architecture & deployment guides
├── AGENTS.md     → instructions for AI coding agents
└── README.md     → you are here
```

The storefront started life on mock data and is being wired to the Medusa backend
so the catalogue, cart, and checkout become fully dynamic.

## Quick start (local, no Docker)

You need **Node 20+** and a local **PostgreSQL 16** with a database named `e-shop`.

```bash
# 1) Backend (Medusa)  — http://localhost:9000  (admin at /app)
cd backend
npm install
npx medusa db:migrate                       # create the schema
npx medusa user -e admin@terratunis.se -p supersecret   # admin login
npx medusa exec ./src/scripts/seed.ts        # seed our catalogue → prints a publishable key
npm run dev

# 2) Storefront (Next.js) — http://localhost:3000
cd ../storefront
npm install
# put the publishable key from the seed into storefront/.env.local:
#   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
#   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
npm run dev
```

See [`docs/LOCAL-SETUP.md`](docs/LOCAL-SETUP.md) for the full walkthrough, and
[`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the VPS plan.

## Documentation

| Doc | What's in it |
|-----|--------------|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | How the two apps fit together; data flow; roadmap |
| [`docs/LOCAL-SETUP.md`](docs/LOCAL-SETUP.md)   | Step-by-step local setup (Postgres, backend, storefront) |
| [`docs/BACKEND.md`](docs/BACKEND.md)           | Medusa backend: config, seed, admin, commands |
| [`docs/STOREFRONT.md`](docs/STOREFRONT.md)     | Next.js storefront: env, data layer, how it reads Medusa |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)     | VPS deployment (Cloudflare + Nginx + Postgres + Redis) |

## Tech stack

- **Storefront:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Backend:** Medusa v2 · PostgreSQL · (Redis on the VPS only)
- **Payments (planned):** Stripe (incl. Google Pay) + Promotion Codes for coupons
- **Auth (planned):** Google login
