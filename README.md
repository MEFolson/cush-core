# Cush Core

Licensed core banking for global banks, Tier 1 institutions, and central banks.

One immutable ledger. Agents under the institution’s mandate. On-ramp and off-ramp on the same book.

This repository is the institutional marketing site, distinct from [Cush Payments](https://cushpayments.com) ([/core](https://cushpayments.com/core) on the Payments site). Cush Payments runs on Cush Core.

## Stack

TanStack Start, React, Tailwind v4, Nitro (Vercel preset on production build).

## Local preview

```bash
npm install
npm run dev
```

Dev server listens on **http://127.0.0.1:8080/** (`0.0.0.0:8080`, `strictPort`).

Optional checks:

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run preview` serves the production build on **http://127.0.0.1:8081/**.

Node 22.12+ matches TanStack Start engines; Node 20 may show `EBADENGINE` warnings and can still run locally.

## Deploy (Vercel)

There is **no** public Vercel project for this repo yet. Do not treat `cush-core*.vercel.app` as live.

When ready (Matthew GO):

1. Create a Vercel project linked to `MEFolson/cush-core`.
2. Framework: leave detection to Nitro / `vercel.json` (`buildCommand`: `npm run build`).
3. Production branch: merge only after explicit GO (do not ship `main` without it).
4. Preview deployments from PR branches (e.g. `p0-africa-rails-hero`) are fine once the project exists.

`vercel.json` and the Vite Nitro `preset: "vercel"` wire the build output; project creation and DNS remain a separate GO.

## Principals

Matthew Ekow Folson, Founder and Group CEO (sole founder)  
Jose Luis Caldeira, Chief Technology Officer (part-time since October 2025, not a founder)  
Paul Singh, MLRO and Chief Compliance Officer
