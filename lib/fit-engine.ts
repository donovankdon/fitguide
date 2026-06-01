import type {
  BodyProfile,
  Garment,
  FitFeel,
  Dimension,
  SizeSpec,
  DimScore,
  SizeFit,
  FitResult,
} from "./types";

/**
 * The whole product in one file: compare a body to a garment's sizes and score
 * the fit honestly. Bottoms-weighted (waist > thigh > inseam > hip), tuned so an
 * athletic V-shape correctly punishes slim cuts on the thigh and rewards taper/
 * athletic cuts that leave room where it's needed.
 */

// Ideal ease (garment minus body, inches) per dimension per fit feel.
const IDEAL_EASE: Record<Dimension, Record<FitFeel, number>> = {
  waist: { slim: 0.75, regular: 1.0, relaxed: 1.25 },
  thigh: { slim: 1.75, regular: 3.0, relaxed: 4.25 },
  hip: { slim: 2.0, regular: 3.0, relaxed: 4.0 },
  inseam: { slim: 1.0, regular: 1.0, relaxed: 1.5 },
};

// Penalty points per inch away from ideal. Asymmetric: tighter-than-ideal usually
// hurts more than looser, except waist (a waist that won't button is a hard fail).
const SLOPE: Record<Dimension, { under: number; over: number }> = {
  waist: { under: 40, over: 14 },
  thigh: { under: 14, over: 6 },
  hip: { under: 12, over: 6 },
  inseam: { under: 16, over: 3 }, // long hems down cheaply; short can't be fixed
};

const WEIGHT: Record<Dimension, number> = {
  waist: 0.32,
  thigh: 0.3,
  inseam: 0.2,
  hip: 0.18,
};

const DIMENSIONS: Dimension[] = ["waist", "thigh", "hip", "inseam"];

export interface FitOptions {
  feel?: FitFeel;
  /** Per-dimension ideal-ease overrides, e.g. from reference-garment calibration. */
  idealEaseOverride?: Partial<Record<Dimension, number>>;
  /** Minimum best-size score to keep a garment. Default 55. */
  strictness?: number;
}

function bodyDim(body: BodyProfile, dim: Dimension): number | undefined {
  return body[dim];
}

function garmentDim(size: SizeSpec, dim: Dimension): number | undefined {
  return size[dim];
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

/** Stretch forgives tightness: ~3% elastane meaningfully relaxes the under-penalty. */
function stretchRelief(stretchPct: number | undefined): number {
  if (!stretchPct || stretchPct <= 0) return 1;
  // 1% -> ~0.9x, 3% -> ~0.7x, capped at 0.6x
  return clamp(1 - stretchPct * 0.1, 0.6, 1);
}

export function scoreSize(
  body: BodyProfile,
  size: SizeSpec,
  garment: Garment,
  opts: FitOptions = {},
): SizeFit {
  const feel: FitFeel = opts.feel ?? "regular";
  const relief = stretchRelief(garment.stretchPct);
  const dims: DimScore[] = [];

  for (const dim of DIMENSIONS) {
    const b = bodyDim(body, dim);
    const g = garmentDim(size, dim);
    if (b === undefined || g === undefined) continue;

    const ease = round1(g - b);
    const ideal = opts.idealEaseOverride?.[dim] ?? IDEAL_EASE[dim][feel];
    const diff = ease - ideal; // <0 tighter than ideal, >0 looser
    const slope =
      diff < 0 ? SLOPE[dim].under * relief : SLOPE[dim].over;
    const score = clamp(100 - Math.abs(diff) * slope, 0, 100);

    dims.push({ dim, ease, idealEase: ideal, score: Math.round(score) });
  }

  // Weighted average over the dimensions we actually have, renormalized.
  let wsum = 0;
  let acc = 0;
  for (const d of dims) {
    wsum += WEIGHT[d.dim];
    acc += WEIGHT[d.dim] * d.score;
  }
  const score = wsum > 0 ? Math.round(acc / wsum) : 0;
  return { size, score, dims };
}

export function scoreGarment(
  body: BodyProfile,
  garment: Garment,
  opts: FitOptions = {},
): FitResult {
  let best: SizeFit | null = null;
  for (const size of garment.sizes) {
    const sf = scoreSize(body, size, garment, opts);
    if (!best || sf.score > best.score) best = sf;
  }
  // Garments always have >= 1 size; fall back defensively.
  const bestSize: SizeFit =
    best ?? { size: garment.sizes[0], score: 0, dims: [] };
  return {
    garment,
    bestSize,
    score: bestSize.score,
    verdict: verdictFor(bestSize.score),
    note: noteFor(bestSize),
  };
}

/** Rank a catalog for a body. Drops anything below the strictness cutoff, best first. */
export function rankFits(
  body: BodyProfile,
  catalog: Garment[],
  opts: FitOptions = {},
): FitResult[] {
  const cutoff = opts.strictness ?? 55;
  return catalog
    .map((g) => scoreGarment(body, g, opts))
    .filter((r) => r.score >= cutoff)
    .sort((a, b) => b.score - a.score);
}

export function verdictFor(score: number): string {
  if (score >= 90) return "Dialed in";
  if (score >= 80) return "Great fit";
  if (score >= 70) return "Solid — minor compromise";
  if (score >= 60) return "Wearable, but tight";
  return "Skip — won't fit right";
}

/** The single honest sentence: name the worst dimension and which way it's off. */
export function noteFor(sf: SizeFit): string {
  if (sf.dims.length === 0) return "Not enough measurements to judge.";
  const worst = [...sf.dims].sort((a, b) => a.score - b.score)[0];
  if (worst.score >= 88) return "Sits right everywhere.";

  const tight = worst.ease < worst.idealEase;
  const word: Record<Dimension, [string, string]> = {
    waist: ["snug at the waist", "loose at the waist"],
    thigh: ["tight through the thigh", "roomy in the thigh"],
    hip: ["snug in the seat", "roomy in the seat"],
    inseam: ["a touch short", "runs long (hem it)"],
  };
  return tight ? cap(word[worst.dim][0]) : cap(word[worst.dim][1]);
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}

/** "+1.0\"" / "-1.6\"" for display. */
export function formatEase(ease: number): string {
  const sign = ease > 0 ? "+" : ease < 0 ? "−" : "±";
  return `${sign}${Math.abs(ease).toFixed(1)}″`;
}
