# FitGuide — Dev Log

Autonomous builder appends here each run. Newest at top.

## 2026-06-02 01:00 — A2 · "Nothing here truly fits" verdict
- Shipped: Added Levi's 510 Skinny to catalog (base thigh 19.5" at W32 — tightest mainstream cut). For the ATHLETIC test body (W33/T24.5) it scores 57 at best size W33, landing in "Skip — won't fit right" verdict and appearing last in ranked results. Added "tight thigh" warning banner in FitFinder: when the top-ranked result's thigh dim scores below 70 (≈ less than 0.6" of room vs ideal), a red callout appears pointing to State & Liberty, Oxcloth, and Barbell Apparel as athletic-native brands. Added 5 new tests (510 Skip verdict, 510 ranked last, 510 thigh as worst dim, BIG_THIGHS build triggers banner condition, Barbell still ranks first for extreme build). Tests: 21 passed. Build: clean.
- Files touched: `data/catalog.ts`, `components/FitFinder.tsx`, `lib/fit-engine.test.ts`
- Commit: 3dfc4fd — local only; push blocked (GitHub auth broken — same issue as A1). Run `gh auth login` then `git push && vercel --prod --yes`.
- NEEDS DON: Re-authenticate GitHub (`gh auth login`) so A1 + A2 commits can push. Two commits ready: 76e0dae (A1) and 3dfc4fd (A2).

## 2026-06-01 01:00 — A1 · Fatal credibility bug (rough cut state)
- Shipped: When body thigh is missing/zero, score is now capped at 72 (never "Great fit"/"Dialed in") and marked `roughCut: true`. ResultRow shows `~{score}` in faint text + "Rough cut" verdict instead of precise numbers; hides ease deltas. FitFinder shows a warning banner with tape-measure instructions when thigh is absent. Clearing optional fields now stores `undefined` (not 0) so the engine correctly skips them. Added 4 new tests covering all rough-cut paths.
- Files touched: `lib/types.ts`, `lib/fit-engine.ts`, `lib/fit-engine.test.ts`, `components/FitFinder.tsx`, `components/ResultRow.tsx`
- Commit: 76e0dae — local only; push blocked (GitHub auth broken — no SSH key, HTTPS token expired). Run `gh auth login` to fix, then `git push && vercel --prod --yes`.
- NEEDS DON: Re-authenticate GitHub (`gh auth login` or add SSH key) so the builder can push and deploy. This commit is sitting on main locally.

## 2026-05-31 — v1 shipped + audited
- Built v1: fit engine (7 tests), athletic-fit seed catalog, reference-garment calibration, type-driven UI. Live at https://fitguide-eta.vercel.app, repo donovankdon/fitguide.
- Ran founder-survival audit (10 agents). Verdict: portfolio + B2B-data probe, not 12-mo family income. Seeded BACKLOG.md with the fix-list. Autonomous builder wired (daily 1 AM).
