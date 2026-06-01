# FitGuide — Backlog

Seeded 2026-05-31 from the founder-survival audit. The autonomous builder (`~/claude-agents/fitguide-builder.sh`, daily 1 AM) works the **`[agent]`** tasks top-down, one per run, green-gated. It never touches **`[don]`** tasks — those need a human.

**Product principle (never violate):** the fit ranking is NEVER reordered by affiliate commission. Honesty is the product.
**Strategic frame:** portfolio artifact + B2B-data probe, NOT 12-month family income. Learnin stays primary. 90-day tripwire.

## [agent] — autonomous, in priority order

- [x] **A1 · Fatal credibility bug.** If thigh is missing/zero, NEVER renormalize to a perfect score. Return a distinct "rough cut — add your thigh for a real verdict" state with capped confidence; require thigh (with a measurement helper) before showing point-precise ease. (S)
- [ ] **A2 · "Nothing here truly fits" verdict.** If the best garment's thigh is still meaningfully tight, say so out loud and point to athletic-native brands (Barbell / State & Liberty / Oxcloth). Add 1-2 slim cuts to the catalog so the tool can demonstrably tell someone to SKIP. (S)
- [ ] **A3 · Recommend sizing UP.** When a larger waist clears the thigh, recommend it with the explicit waist-gap + "tailor the waist in" note. Drop/zero the constant-inseam weight and reallocate toward thigh. (M)
- [ ] **A4 · Killer feature: reference-garment as the lead.** Accept a free-text owned pair ("Levi's 541 W34") against a SEPARATE measured reference table (decoupled from the 10-item recommendation catalog). Make it the first-screen interaction: "Name one pair that fits you perfectly." (M)
- [ ] **A5 · Provenance.** Add `measured | estimated` provenance per catalog measurement; show the badge in ResultRow so estimated thigh numbers are never passed off as fact. (S)
- [ ] **A6 · Retention + free distribution.** Persist profile to localStorage; shareable URL params (`?w=&t=&h=&i=`); a clean, brand-free, screenshot-native result CARD built to be pasted into a Reddit thread. (M)
- [ ] **A7 · Affiliate plumbing (structure only).** A typed affiliate-link helper with env-var/placeholder IDs on every buy button; fill missing buyUrls. When two pants fit equally well, surface the higher-commission one — NEVER re-rank by payout. Mark clearly where Don pastes real IDs. (S)
- [ ] **A8 · The only data asset (scaffold).** Behind env vars (no-op if unset): Supabase event logging (anonymous measurements + calibration pair + clicked pick), email capture at the result, one "did it fit?" question. Include the table SQL in `/supabase`. (M)
- [ ] **A9 · SEO landing pages.** `/big-thighs` (ranked-by-measured-thigh), `/levis-541-vs-barbell-vs-mugsy` (head-to-head), programmatic `/does/[model]-fit-big-thighs` from the catalog. Each ends in the live tool. Add schema.org + meta. (M)

## [don] — human-only (agent will remind you, won't do these)

- [x] **D1 · Name chosen: Ease.** Rebrand applied across UI / metadata / package — live. (All bare `Ease` .coms are parked; domain still TBD — take a variant or buy a parked one.)
- [x] **(bonus) Outfit side shipped** — `/outfits`: Don's 2026 style profile + 8 signature looks + color-coordination engine over a 39-piece researched catalog (incl. pleated trousers). Not on the audit's critical path; built per Don's request as the personal-use + portfolio half.
- [ ] **D2 · Tape-measure weekend.** Buy/borrow the top ~20-25 athletic-considered pants; measure thigh 1" below crotch seam ×2, per offered size; drop real numbers into `data/catalog.ts` (A5 restructures it to receive them). This is the moat.
- [ ] **D3 · Join affiliate networks.** Rakuten (Levi's), Awin (State & Liberty), Barbell in-house 20%, FlexOffers/Sovrn. Paste IDs into env (A7 leaves the slots).
- [ ] **D4 · Supabase project.** Create it; paste keys into env (A8 wires the client).
- [ ] **D5 · Reddit warming.** Genuinely answer "what jeans fit my thighs?" threads in r/bodybuilding, r/Fitness, r/weightroom, r/brogress, r/malefashionadvice. NO launch post (gets you shadowbanned).
- [ ] **D6 · 5 B2B cold emails** — product/returns leads at Barbell, State & Liberty, Mugsy, DUER, Revtown: "we measured the thigh you don't publish + a neutral find-your-size widget; cut fit returns." This is the real income probe.
- [ ] **D7 · Register domain + handles** for the chosen name.

## Done
<!-- agent appends completed tasks here / marks [x] above -->
