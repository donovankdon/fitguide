# FitGuide

**Find pants that actually fit.** Brand-agnostic, measurement-first, built for athletic builds (broad chest/shoulders, trim waist, big thighs) — the body that standard sizing serves worst.

Fit is math: compare your body to real garment specs, add an *ease* tolerance for how you like things to sit, and you can predict fit far better than guessing a size label. FitGuide ranks the pairs that actually fit your build and gives an honest verdict — "skip this, it'll strangle your thighs" — instead of pushing a size.

## What's here (v1)

- **Fit engine** (`lib/fit-engine.ts`) — scores every size of every garment against your measurements + an ease window, weighted for bottoms (waist > thigh > inseam > hip), stretch-aware. Returns the best size, the real ease deltas, and a verdict. Tested (`npm test`).
- **Reference-garment calibration** (`lib/calibrate.ts`) — tell it a pair you already own that fits great; it tunes every recommendation to *that* fit. This is the data pump: a fit outcome you already have, not a survey you have to fill out.
- **Catalog** (`data/catalog.ts`) — athletic-fit denim/pants anchors. Note: brands rarely publish thigh circumference (the #1 athletic-fit signal), so those are estimated — closing that data gap is the real product moat.
- **UI** (`app/`, `components/`) — type-driven, B&W, data-as-data. No size-chart spelunking.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Geist · Vitest · Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # fit-engine tests
npm run build
```

## Roadmap

1. **v1 — find pants that fit** *(this)*
2. **v1.5 — outfit system** — 5 pants + 5 shirts that fit *and* coordinate.
3. **v2 — honest 3D fit-map** — see fit truth on a 3D body (green = good ease, red = pulls), the one thing photoreal try-ons refuse to show.

Strategy + competitive research live in the project vault (`side-projects/fitguide/`).
