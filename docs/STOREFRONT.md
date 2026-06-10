# Storefront (Next.js 16)

Located in [`storefront/`](../storefront). The existing Terra Tunis UI, being
wired to read its catalogue from the Medusa backend.

## Environment

Create `storefront/.env.local`:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_xxxxxxxxxxxxxxxx
```

- Get the publishable key from the backend seed output
  (`npx medusa exec ./src/scripts/seed.ts`).
- If `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is unset, the storefront uses its built-in
  **mock catalogue** (`src/lib/data.ts`) so it always runs.

## Data layer

| File | Role |
|------|------|
| `src/lib/data.ts` | Domain types + the original **mock** catalogue & helpers (fallback) |
| `src/lib/medusa.ts` | Medusa Store API client: fetches products/categories and **maps them into the same shapes** the components already use |
| `src/lib/catalogue.ts` | Single entry point the app imports from — returns Medusa data when configured, otherwise mock |

Because Medusa products are mapped into the existing `Product` / `Variant`
shapes, the components don't need to change how they read data — only *where* it
comes from. Reads happen in **server components** (Next.js 16: `fetch` runs on the
server and is not cached by default; we use `revalidate`/`React.cache` where
useful).

## Conventions (Next.js 16 — read before editing)

This is a modified Next.js with breaking changes. Before writing storefront code,
read the bundled guides in `storefront/node_modules/next/dist/docs/` — especially
`01-getting-started/06-fetching-data.md` and `08-caching.md`.

Key points used here:
- Fetch catalogue data in **async server components**, pass to client components
  (cart, filters) as props.
- `fetch` is **uncached by default**; opt into caching deliberately.

## Mapping notes

- Medusa `handle` → our `slug`; `title`/`description` used for both EN and SV
  until bilingual product content is added.
- Category name → our `CategoryId` via a small map.
- Variants → our `{ id, label, priceEUR }` (EUR price; SEK derived for display
  by `src/lib/money.ts`, as before).
- `metadata.origin` → product origin.
- **Brands** aren't in Medusa yet, so brand-specific UI uses the mock brand data
  until the brand module lands.
