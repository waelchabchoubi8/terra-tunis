# Local setup (no Docker)

Everything runs on the host. You need:

- **Node 20+**
- **PostgreSQL 16** running locally, with a database named **`e-shop`**
  (this project was set up with user `postgres` / password `wael1234`).

> No Docker and no Redis are needed locally — Medusa v2 falls back to in-memory
> event bus / cache / workflow engine in development. Redis is added on the VPS.

## 1. Backend (Medusa) — http://localhost:9000

```bash
cd backend
npm install
```

Check `backend/.env` points at your database:

```
DATABASE_URL=postgres://postgres:wael1234@localhost:5432/e-shop
STORE_CORS=http://localhost:3000,http://localhost:8000
```

Create the schema, an admin user, and seed the catalogue:

```bash
npx medusa db:migrate
npx medusa user -e admin@terratunis.se -p supersecret
npx medusa exec ./src/scripts/seed.ts
```

The seed prints a **publishable API key** (`pk_...`) at the end — copy it.

Start it:

```bash
npm run dev          # API on :9000, admin panel on :9000/app
```

Log into the admin at <http://localhost:9000/app> with `admin@terratunis.se`.

## 2. Storefront (Next.js) — http://localhost:3000

```bash
cd ../storefront
npm install
```

Create `storefront/.env.local` with the key from the seed:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxxx
```

Run it:

```bash
npm run dev          # http://localhost:3000
```

> If `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is **not** set, the storefront falls back to
> its built-in mock catalogue, so it always builds and runs even without the
> backend up.

## Resetting the database

The seed is a first-run seed (re-running duplicates data). To start clean, drop
and recreate the `e-shop` database in pgAdmin (or `DROP DATABASE`/`CREATE
DATABASE`), then re-run `medusa db:migrate` + the seed.

## Common issues

- **`password authentication failed`** → check `DATABASE_URL` in `backend/.env`.
- **CORS error in the browser** → ensure `STORE_CORS` includes `http://localhost:3000`.
- **Storefront shows mock data** → `.env.local` missing or the backend isn't running.
