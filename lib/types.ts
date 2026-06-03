// FitGuide core types. Everything is brand-agnostic and measurement-first.

export type Category = "jeans" | "chinos" | "trousers" | "pants" | "joggers" | "shorts";
export type FitFeel = "slim" | "regular" | "relaxed";
export type Dimension = "waist" | "thigh" | "hip" | "inseam";

/** A single offered size of a garment. All circumferences are GARMENT measurements
 *  (the garment measured around), in inches. inseam is a length. */
export interface SizeSpec {
  label: string; // "W34", "34x32"
  waist: number;
  hip?: number;
  thigh?: number;
  frontRise?: number;
  inseam?: number;
  legOpening?: number;
}

export interface Garment {
  id: string;
  brand: string;
  model: string;
  category: Category;
  fitType: string; // "athletic taper", "slim", "straight"...
  fabric?: string;
  stretchPct?: number; // 0 = rigid; >0 forgives tightness
  measurementType: "garment" | "body";
  sizes: SizeSpec[];
  price?: number; // USD
  buyUrl?: string;
  sourceUrl?: string;
  athleticFitNotes?: string;
}

/** What the user knows about their own body, in inches. */
export interface BodyProfile {
  waist: number; // where you actually wear pants
  hip?: number; // seat, around the largest part
  thigh?: number; // around the largest part of one thigh
  inseam?: number; // inside leg length
}

export interface DimScore {
  dim: Dimension;
  ease: number; // garment - body; + = room, - = tight (stretched)
  idealEase: number;
  score: number; // 0..100
}

export interface SizeFit {
  size: SizeSpec;
  score: number; // 0..100
  dims: DimScore[];
  /** True when body thigh was missing — score is renormalized and capped; don't treat it as precise. */
  roughCut?: boolean;
}

export interface FitResult {
  garment: Garment;
  bestSize: SizeFit;
  score: number; // == bestSize.score
  verdict: string; // headline ("Dialed in", "Wearable but tight"...)
  note: string; // the specific compromise, if any
  /** Propagated from bestSize.roughCut — show "rough cut" state, not point-precise score. */
  roughCut?: boolean;
}
