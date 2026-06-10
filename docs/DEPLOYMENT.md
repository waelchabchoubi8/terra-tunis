# Deployment (VPS)

Target: one strong VPS, fronted by **Cloudflare**. No Docker required — the same
"host Postgres" model as local, plus Redis for Medusa in production.

```
Cloudflare (edge SSL + CDN + WAF)
        │  Full (strict) + Origin Certificate
        ▼
Nginx (origin TLS, reverse proxy)
        ├── store.<domain>  → storefront (Next.js)  :3000
        └── api.<domain>    → backend (Medusa)       :9000
                                   │
                          PostgreSQL + Redis (local to the VPS)
```

## 1. Server prep
- Non-root deploy user, `ufw` (allow 22/80/443), `fail2ban`, swap space.
- Install Node 20+, PostgreSQL 16, Redis, Nginx.

## 2. Cloudflare + TLS
- DNS: proxied A records for `store.` and `api.`.
- Create a **Cloudflare Origin Certificate**, install on Nginx, set SSL =
  **Full (strict)**. (No Let's Encrypt needed unless you bypass Cloudflare.)

## 3. Database & Redis
- Create the production Postgres DB + user; set a strong password.
- Run Redis locally on the VPS; in `backend/medusa-config.ts` add the Redis
  modules (event bus, cache, workflow engine) and set `REDIS_URL` in `.env`.

## 4. Backend (Medusa)
```bash
cd backend
npm ci
npm run build
npx medusa db:migrate
npx medusa user -e admin@<domain> -p <strong-password>
npx medusa exec ./src/scripts/seed.ts     # first deploy only
# run under a process manager (pm2 / systemd):
npm run start
```
Production `.env`: real `DATABASE_URL`, `REDIS_URL`, strong `JWT_SECRET` /
`COOKIE_SECRET`, and `STORE_CORS`/`ADMIN_CORS`/`AUTH_CORS` set to your domains.

## 5. Storefront (Next.js)
```bash
cd storefront
npm ci
npm run build
npm run start         # behind pm2 / systemd, proxied by Nginx
```
`.env` (or `.env.production`): `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.<domain>`
and the production `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

## 6. Process management
Use **pm2** or **systemd** units for both `medusa start` and `next start`, with
restart-on-boot. Nginx reverse-proxies to each.

## 7. Media
Product images currently live in `storefront/public/products`. On the VPS, let
**Cloudflare cache** them at the edge, or move uploads to an S3-compatible store
(Cloudflare R2) and configure Medusa's file module.

## 8. Payments & auth (when added)
- **Stripe**: live keys, webhook → `https://api.<domain>/...`, Google Pay is
  included via Stripe. Coupons via Stripe Promotion Codes / Medusa promotions.
- **Google auth**: production OAuth client with redirect URIs on your domain.

## 9. Backups & monitoring
- `pg_dump` cron → offsite (R2/S3); test a restore.
- Uptime + log monitoring; Cloudflare WAF / rate limiting.

## Checklist before launch
- [ ] Live test order + refund + coupon
- [ ] Google Pay on mobile
- [ ] Admin reachable only over HTTPS, strong admin password
- [ ] Secrets rotated from local `supersecret` values
- [ ] DB backup verified
