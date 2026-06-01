# FitGuide — Dev Log

Autonomous builder appends here each run. Newest at top.

## 2026-06-01 01:00 — A1 · Fatal credibility bug (rough cut state)
- Shipped: When body thigh is missing/zero, score is now capped at 72 (never "Great fit"/"Dialed in") and marked `roughCut: true`. ResultRow shows `~{score}` in faint text + "Rough cut" verdict instead of precise numbers; hides ease deltas. FitFinder shows a warning banner with tape-measure instructions when thigh is absent. Clearing optional fields now stores `undefined` (not 0) so the engine correctly skips them. Added 4 new tests covering all rough-cut paths.
- Files touched: `lib/types.ts`, `lib/fit-engine.ts`, `lib/fit-engine.test.ts`, `components/FitFinder.tsx`, `components/ResultRow.tsx`
- Commit: 76e0dae — local only; push blocked (GitHub auth broken — no SSH key, HTTPS token expired). Run `gh auth login` to fix, then `git push && vercel --prod --yes`.
- NEEDS DON: Re-authenticate GitHub (`gh auth login` or add SSH key) so the builder can push and deploy. This commit is sitting on main locally.

## 2026-05-31 — v1 shipped + audited
- Built v1: fit engine (7 tests), athletic-fit seed catalog, reference-garment calibration, type-driven UI. Live at https://fitguide-eta.vercel.app, repo donovankdon/fitguide.
- Ran founder-survival audit (10 agents). Verdict: portfolio + B2B-data probe, not 12-mo family income. Seeded BACKLOG.md with the fix-list. Autonomous builder wired (daily 1 AM).
