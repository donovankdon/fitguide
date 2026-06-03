// Ease — tops fit model. A sibling to lib/fit-engine.ts (pants), kept separate so the
// proven bottoms engine stays untouched. Tops are SHOULDER- and CHEST-driven: for an
// athletic V-shape, a shirt that clears the shoulders is usually tight in the chest, or
// fits the chest and pulls the shoulders — then balloons at the trimmer waist. That's the
// analog of the thigh problem for pants, and it's why shoulder + chest carry the weight.

export type TopDimension = "chest" | "shoulder" | "sleeve" | "length" | "neck";
export type TopFitFeel = "fitted" | "regular" | "boxy";
export type TopCategory = "tee" | "button-up" | "overshirt";
export type Provenance = "measured" | "estimated";

/** One offered size. All numbers are GARMENT measurements (the garment measured flat,
 *  circumferences doubled), in inches. sleeve/length/neck are optional — a short-sleeve
 *  tee has no full sleeve, an open camp shirt no collar circumference. */
export interface TopSizeSpec {
  label: string; // S | M | L | XL | XXL | LT | XLT
  chest: number; // garment chest circumference
  shoulder?: number; // seam-to-seam across the back
  sleeve?: number; // full sleeve, shoulder seam to cuff (long-sleeve only)
  length?: number; // HPS to hem
  neck?: number; // collar circumference (collared only)
}

export interface TopGarment {
  id: string;
  brand: string;
  model: string;
  category: TopCategory;
  fitType: string; // human label: "boxy heavyweight", "slim oxford"...
  fitFeel: TopFitFeel; // the cut's intended fit
  fabric?: string;
  stretchPct?: number; // 0 = rigid; >0 forgives tightness
  price?: number;
  buyUrl?: string;
  sourceUrl?: string;
  athleticFitNotes?: string;
  /** measured = from a published spec/size chart; estimated = our best fill. Never passed off as fact. */
  provenance: Provenance;
  sizes: TopSizeSpec[];
}

/** What the user knows about their own upper body, in inches. */
export interface TopBodyProfile {
  chest: number; // around the fullest part, under the arms
  shoulder?: number; // across the back, seam point to seam point
  sleeve?: number; // shoulder point to wrist
  neck?: number; // around the base of the neck
  /** Target garment length so a boxy tee doesn't ride up (height-driven). Optional preference. */
  length?: number;
}

export interface TopDimScore {
  dim: TopDimension;
  ease: number; // garment - body; + = room, - = tight
  idealEase: number;
  score: number; // 0..100
}

export interface TopSizeFit {
  size: TopSizeSpec;
  score: number;
  dims: TopDimScore[];
}

export interface TopFitResult {
  garment: TopGarment;
  bestSize: TopSizeFit;
  score: number;
  verdict: string;
  note: string;
}

// Ideal ease (garment minus body, inches) per dimension per fit feel.
// chest = circumference ease. shoulder = seam vs body shoulder (boxy/drop = intentional +).
// sleeve/length vs body. neck for collared shirts. Numbers from the tops-fit research model
// (2026-06-02): tuned for the athletic V-shape, where boxy chest ease drapes with structure.
const IDEAL_EASE: Record<TopDimension, Record<TopFitFeel, number>> = {
  // The shoulder seam should sit at/just past the natural shoulder for EVERY feel — a seam
  // down the bicep looks sloppy even on a boxy cut. "Boxy" is expressed through chest + length,
  // not a falling shoulder. So shoulder ideals stay small; chest ideals carry the fit feel.
  chest: { fitted: 3.0, regular: 5.0, boxy: 8.0 },
  shoulder: { fitted: 0.0, regular: 0.4, boxy: 0.6 },
  sleeve: { fitted: -0.5, regular: 0.0, boxy: 0.5 },
  length: { fitted: 0.0, regular: 0.5, boxy: 1.5 },
  neck: { fitted: 0.5, regular: 1.0, boxy: 1.5 },
};

// Penalty points per inch away from ideal. Tight-where-it-counts still hurts most (shoulder
// under=22, chest under=16), but over-penalties are NOT trivial: a top has a sweet spot, and
// drowning in fabric is its own miss. Without a real over-cost the optimizer just sizes up
// forever — his body sits at the large end of every run, so "bigger" would always win.
const SLOPE: Record<TopDimension, { under: number; over: number }> = {
  chest: { under: 16, over: 13 }, // tight chest pulls; too roomy tents (scaled per feel below)
  shoulder: { under: 24, over: 12 }, // seam off the joint binds; seam down the bicep is sloppy
  sleeve: { under: 9, over: 8 }, // near-symmetric (unscored in v1 — see data/tops.ts)
  length: { under: 11, over: 9 }, // short rides up (bad on a tall frame); long reads tunic-y
  neck: { under: 30, over: 10 }, // a collar that won't close is a hard fail
};

// Shoulder is the anchor — it leads the weights so the engine never trades a binding shoulder
// for a better chest (you buy a shirt for the shoulders, then judge the chest). Shoulder + chest
// still = 0.64 combined: the make-or-break pair for an inverted-triangle build.
const WEIGHT: Record<TopDimension, number> = {
  shoulder: 0.4,
  chest: 0.24,
  length: 0.18,
  sleeve: 0.1,
  neck: 0.08,
};

// How much a too-roomy chest costs depends on the GARMENT's drape, not the wearer's wish:
// a 280gsm+ boxy tee drapes with structure when roomy (cheap), a slim/structured woven
// balloons at the trimmer waist (expensive). This is why sizing a slim oxford up to clear
// athletic shoulders fails — the chest-over penalty captures the waist blousing we can't
// measure directly (brands don't publish hem/taper — the documented tops data gap).
const CHEST_OVER_BY_FEEL: Record<TopFitFeel, number> = {
  fitted: 1.5,
  regular: 1.0,
  boxy: 0.7,
};

const DIMENSIONS: TopDimension[] = ["chest", "shoulder", "sleeve", "length", "neck"];

export interface TopFitOptions {
  feel?: TopFitFeel;
  /** Minimum best-size score to keep a garment. Default 55. */
  strictness?: number;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

/** Stretch forgives tightness: ~3% elastane meaningfully relaxes the under-penalty. */
function stretchRelief(stretchPct: number | undefined): number {
  if (!stretchPct || stretchPct <= 0) return 1;
  return clamp(1 - stretchPct * 0.1, 0.6, 1);
}

export function scoreTopSize(
  body: TopBodyProfile,
  size: TopSizeSpec,
  garment: TopGarment,
  opts: TopFitOptions = {},
): TopSizeFit {
  // Score against the garment's OWN intended fit unless the caller overrides — a boxy tee
  // is judged boxy, a dress shirt judged fitted. Tops are heterogeneous, so judging them all
  // against one chosen feel (the pants approach) mis-scores everything but that feel.
  const feel: TopFitFeel = opts.feel ?? garment.fitFeel;
  const relief = stretchRelief(garment.stretchPct);
  const dims: TopDimScore[] = [];

  for (const dim of DIMENSIONS) {
    const b = body[dim];
    const g = size[dim];
    // Only score a dimension when we have BOTH the body and garment number for it.
    if (b === undefined || g === undefined) continue;

    const ease = round1(g - b);
    const ideal = IDEAL_EASE[dim][feel];
    const diff = ease - ideal; // <0 tighter than ideal, >0 looser
    let slope = diff < 0 ? SLOPE[dim].under * relief : SLOPE[dim].over;
    // A roomy chest drapes on a boxy/heavy cut but balloons on a slim one — scale the
    // chest over-penalty by the garment's own drape.
    if (dim === "chest" && diff > 0) slope *= CHEST_OVER_BY_FEEL[garment.fitFeel];
    const score = clamp(100 - Math.abs(diff) * slope, 0, 100);
    dims.push({ dim, ease, idealEase: ideal, score: Math.round(score) });
  }

  let wsum = 0;
  let acc = 0;
  for (const d of dims) {
    wsum += WEIGHT[d.dim];
    acc += WEIGHT[d.dim] * d.score;
  }
  const score = wsum > 0 ? Math.round(acc / wsum) : 0;
  return { size, score, dims };
}

export function scoreTopGarment(
  body: TopBodyProfile,
  garment: TopGarment,
  opts: TopFitOptions = {},
): TopFitResult {
  let best: TopSizeFit | null = null;
  for (const size of garment.sizes) {
    const sf = scoreTopSize(body, size, garment, opts);
    if (!best || sf.score > best.score) best = sf;
  }
  const bestSize: TopSizeFit =
    best ?? { size: garment.sizes[0], score: 0, dims: [] };
  return {
    garment,
    bestSize,
    score: bestSize.score,
    verdict: topVerdictFor(bestSize.score),
    note: topNoteFor(bestSize),
  };
}

/** Rank a catalog for a body. Drops anything below the strictness cutoff, best first. */
export function rankTopFits(
  body: TopBodyProfile,
  catalog: TopGarment[],
  opts: TopFitOptions = {},
): TopFitResult[] {
  const cutoff = opts.strictness ?? 55;
  return catalog
    .map((g) => scoreTopGarment(body, g, opts))
    .filter((r) => r.score >= cutoff)
    .sort((a, b) => b.score - a.score);
}

export function topVerdictFor(score: number): string {
  if (score >= 90) return "Dialed in";
  if (score >= 80) return "Great fit";
  if (score >= 70) return "Solid — minor compromise";
  if (score >= 60) return "Wearable, but off";
  return "Skip — won't sit right";
}

/** One honest sentence: name the worst dimension and which way it's off. */
export function topNoteFor(sf: TopSizeFit): string {
  if (sf.dims.length === 0) return "Not enough measurements to judge.";
  const worst = [...sf.dims].sort((a, b) => a.score - b.score)[0];
  if (worst.score >= 88) return "Sits right everywhere.";

  const tight = worst.ease < worst.idealEase;
  const word: Record<TopDimension, [string, string]> = {
    chest: ["pulls across the chest", "roomy through the chest"],
    shoulder: ["tight in the shoulders", "drops past the shoulder"],
    sleeve: ["sleeves run short", "sleeves run long"],
    length: ["runs short — will ride up", "runs long (size/tuck)"],
    neck: ["collar's tight", "collar's loose"],
  };
  return cap(tight ? word[worst.dim][0] : word[worst.dim][1]);
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
