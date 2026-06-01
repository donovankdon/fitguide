import type { Garment, Category, SizeSpec } from "../lib/types";

/**
 * SEED catalog — hand-entered anchors so the engine and UI work today.
 * These are realistic-but-approximate athletic-fit denim/pants numbers, expressed
 * as GARMENT circumferences (the garment measured around), graded from a base size.
 * The catalog-research workflow (2026-05-31) confirmed the relative ordering here is right
 * (Levi's 541 Athletic = top mainstream pick, 512 Slim runs tight) — but also confirmed the
 * hard truth: brands publish leg-opening / knee / front-rise (garment) or body waist/hip, and
 * almost NONE publish thigh circumference, the #1 athletic-fit signal. So the thigh/hip numbers
 * below are estimated. Closing that gap (real thigh data via reference garments + measured
 * returns) is FitGuide's actual data moat — see vault side-projects/fitguide/competitive-recon.
 */

interface ModelSeed {
  id: string;
  brand: string;
  model: string;
  category: Category;
  fitType: string;
  fabric?: string;
  stretchPct?: number;
  price?: number;
  buyUrl?: string;
  sourceUrl?: string;
  athleticFitNotes?: string;
  baseLabel: number; // waist label the base measurements describe
  labels: number[]; // offered waist labels
  base: {
    waist: number;
    hip: number;
    thigh: number;
    frontRise: number;
    inseam: number;
    legOpening: number;
  };
}

// Standard menswear grade per one-inch waist-label step.
const GRADE = { waist: 1.0, hip: 0.65, thigh: 0.5, frontRise: 0.1, legOpening: 0.2 };

function r(n: number): number {
  return Math.round(n * 10) / 10;
}

function expand(m: ModelSeed): Garment {
  const sizes: SizeSpec[] = m.labels.map((label) => {
    const step = label - m.baseLabel;
    return {
      label: `W${label}`,
      waist: r(m.base.waist + GRADE.waist * step),
      hip: r(m.base.hip + GRADE.hip * step),
      thigh: r(m.base.thigh + GRADE.thigh * step),
      frontRise: r(m.base.frontRise + GRADE.frontRise * step),
      inseam: m.base.inseam,
      legOpening: r(m.base.legOpening + GRADE.legOpening * step),
    };
  });
  return {
    id: m.id,
    brand: m.brand,
    model: m.model,
    category: m.category,
    fitType: m.fitType,
    fabric: m.fabric,
    stretchPct: m.stretchPct,
    measurementType: "garment",
    sizes,
    price: m.price,
    buyUrl: m.buyUrl,
    sourceUrl: m.sourceUrl,
    athleticFitNotes: m.athleticFitNotes,
  };
}

const LABELS = [30, 32, 33, 34, 36, 38, 40];

const SEED: ModelSeed[] = [
  {
    id: "levis-511",
    brand: "Levi's",
    model: "511 Slim",
    category: "jeans",
    fitType: "slim",
    fabric: "98% cotton / 2% elastane",
    stretchPct: 1,
    price: 69.5,
    buyUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/511-slim/p/045110407",
    athleticFitNotes: "Classic narrow-thigh slim — the cut athletic legs fight with.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 38.5, thigh: 21.0, frontRise: 9.5, inseam: 32, legOpening: 13.5 },
  },
  {
    id: "levis-512",
    brand: "Levi's",
    model: "512 Slim Taper",
    category: "jeans",
    fitType: "slim taper",
    fabric: "99% cotton / 1% elastane",
    stretchPct: 1,
    price: 79.5,
    buyUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/taper/512TM-slim-taper-fit-mens-jeans/p/288330442",
    sourceUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/taper/512TM-slim-taper-fit-mens-jeans/p/288330442",
    athleticFitNotes: "Slim up top, tapered ankle. Still tight in a real thigh.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 39.0, thigh: 21.5, frontRise: 9.8, inseam: 32, legOpening: 13.8 },
  },
  {
    id: "levis-502",
    brand: "Levi's",
    model: "502 Taper",
    category: "jeans",
    fitType: "taper",
    fabric: "99% cotton / 1% elastane",
    stretchPct: 1,
    price: 69.5,
    buyUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/taper/502-taper-fit-mens-jeans/p/295070004",
    sourceUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/taper/502-taper-fit-mens-jeans/p/295070004",
    athleticFitNotes: "Roomier seat and thigh, tapered leg. A solid mainstream pick.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 40.5, thigh: 23.5, frontRise: 10.5, inseam: 32, legOpening: 15.0 },
  },
  {
    id: "levis-541",
    brand: "Levi's",
    model: "541 Athletic Taper",
    category: "jeans",
    fitType: "athletic taper",
    fabric: "94% cotton / 5% poly / 1% elastane",
    stretchPct: 1.5,
    price: 69.5,
    buyUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/541-athletic-taper-mens-jeans/p/181810550",
    sourceUrl: "https://www.levi.com/US/en_US/clothing/men/jeans/541-athletic-taper-mens-jeans/p/181810550",
    athleticFitNotes: "Built for thighs: extra room through hip and thigh, tapered below the knee.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 42.0, thigh: 25.5, frontRise: 11.0, inseam: 32, legOpening: 16.0 },
  },
  {
    id: "barbell-straight-athletic",
    brand: "Barbell Apparel",
    model: "Straight Athletic Fit",
    category: "jeans",
    fitType: "straight athletic",
    fabric: "stretch denim",
    stretchPct: 2,
    price: 109,
    athleticFitNotes: "Purpose-built for quads and glutes. The benchmark athletic jean.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 42.5, thigh: 26.0, frontRise: 11.0, inseam: 33, legOpening: 17.0 },
  },
  {
    id: "revtown-sharp",
    brand: "Revtown",
    model: "Sharp Athletic",
    category: "jeans",
    fitType: "athletic",
    fabric: "Italian stretch denim",
    stretchPct: 2,
    price: 95,
    athleticFitNotes: "Athletic thigh, clean taper, heavy stretch.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 41.0, thigh: 24.5, frontRise: 10.5, inseam: 32, legOpening: 15.5 },
  },
  {
    id: "bonobos-athletic-jean",
    brand: "Bonobos",
    model: "Premium Athletic Jean",
    category: "jeans",
    fitType: "athletic",
    fabric: "stretch denim",
    stretchPct: 1.5,
    price: 98,
    athleticFitNotes: "Thigh and seat room with a tailored taper.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 41.5, thigh: 25.0, frontRise: 10.8, inseam: 32, legOpening: 15.8 },
  },
  {
    id: "duer-performance-slim",
    brand: "DUER",
    model: "Performance Denim Slim",
    category: "jeans",
    fitType: "slim (high stretch)",
    fabric: "Cotton / Tencel / poly / spandex",
    stretchPct: 3,
    price: 129,
    athleticFitNotes: "Slim cut but heavy 4-way stretch makes a tight thigh forgivable.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 40.0, thigh: 22.5, frontRise: 10.0, inseam: 32, legOpening: 14.5 },
  },
  {
    id: "mugsy-slim",
    brand: "Mugsy",
    model: "Slim Stretch",
    category: "jeans",
    fitType: "slim (high stretch)",
    fabric: "stretch denim",
    stretchPct: 3,
    price: 98,
    athleticFitNotes: "Marketed at athletic guys; stretch carries a slimmer thigh.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 40.5, thigh: 23.0, frontRise: 10.0, inseam: 32, legOpening: 14.8 },
  },
  {
    id: "wrangler-atg",
    brand: "Wrangler",
    model: "ATG Synthetic Utility Pant",
    category: "pants",
    fitType: "athletic utility",
    fabric: "nylon / spandex",
    stretchPct: 2,
    price: 60,
    athleticFitNotes: "Roomy, stretchy utility pant — budget athletic option.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 41.5, thigh: 24.5, frontRise: 11.0, inseam: 32, legOpening: 16.5 },
  },
];

export const CATALOG: Garment[] = SEED.map(expand);

export function getGarment(id: string): Garment | undefined {
  return CATALOG.find((g) => g.id === id);
}
