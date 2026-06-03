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
    id: "levis-510",
    brand: "Levi's",
    model: "510 Skinny",
    category: "jeans",
    fitType: "skinny",
    fabric: "99% cotton / 1% elastane",
    stretchPct: 1,
    price: 69.5,
    athleticFitNotes: "Narrowest mainstream cut — blocks any real quad development. Explicit Skip for athletic thighs.",
    baseLabel: 32,
    labels: LABELS,
    base: { waist: 33, hip: 37.5, thigh: 19.5, frontRise: 9.0, inseam: 32, legOpening: 12.5 },
  },
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

// 2026-06-02: pleated/wide trousers + cool relaxed/wide/baggy jeans (the IG-menswear
// fit-pic lane Don wants). Same garment-measurement + grade model as SEED. Trouser
// inseams reflect the long/Tall make a 6'1" frame buys. Thigh/hip estimated as above.
const NEW_SEEDS: ModelSeed[] = [
  {
    "id": "uniqlo-pleated-wide",
    "brand": "Uniqlo",
    "model": "Pleated Wide Pants",
    "category": "trousers",
    "fitType": "single-pleat wide",
    "fabric": "Polyester/wool-blend twill, woven (no meaningful stretch)",
    "stretchPct": 0,
    "price": 49.9,
    "buyUrl": "https://www.uniqlo.com/us/en/men/bottoms/wide-leg-pants/pleated",
    "sourceUrl": "https://www.uniqlo.com/us/en/products/E462197-000/00",
    "athleticFitNotes": "The default IG fit-pic trouser. Single pleat, high rise (~12 in), elastic-tab waistband that flexes a couple inches, and a true wide leg that breaks clean over a shoe. Garment thigh (~28 in) swallows a 26.5 in quad with room to spare, and the wide cut clears a 47 in seat without pulling. Lettered sizing (S/M/L/XL/XXL) maps to roughly 29/30/32/34/36 body waist; the elastic waist forgives the gap. Best-in-class value at ~$50 and the easiest entry to the look. Get the Tall version for full break at 6'1 with a 32 in inseam. Thigh/hip estimated from the wide pattern; waist/inseam measured from Uniqlo's chart.",
    "baseLabel": 34,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 35,
      "hip": 46,
      "thigh": 28,
      "frontRise": 12,
      "inseam": 33,
      "legOpening": 18
    }
  },
  {
    "id": "uniqlo-u-wide-fit-pants",
    "brand": "Uniqlo",
    "model": "Uniqlo U Wide-Fit Pleated Pants",
    "category": "trousers",
    "fitType": "double-pleat wide",
    "fabric": "Cotton twill, woven (rigid)",
    "stretchPct": 0,
    "price": 59.9,
    "buyUrl": "https://www.uniqlo.com/us/en/men/bottoms/wide-leg-pants/pleated",
    "sourceUrl": "https://www.size.ly/size-chart/uniqlo",
    "athleticFitNotes": "Christophe Lemaire's designer line: a fuller, more architectural take than the mainline Pleated Wide. Double pleats, very high rise (~12.5 in), heavier cotton twill that holds a column-like drape, and a wider hem (~19.5 in). This is the elevated-menswear silhouette in its purest accessible form. Garment thigh ~29 in and hip ~47 in are genuinely generous, so a 26.5 in quad and 47 in seat sit relaxed rather than filled. Rigid cotton means size to the waist, not the thigh. Waist/inseam measured from Uniqlo's men's chart; thigh/hip/rise estimated from the wide double-pleat cut.",
    "baseLabel": 34,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 35.5,
      "hip": 47,
      "thigh": 29,
      "frontRise": 12.5,
      "inseam": 33,
      "legOpening": 19.5
    }
  },
  {
    "id": "abercrombie-pleated-baggy-trouser",
    "brand": "Abercrombie & Fitch",
    "model": "Pleated Baggy Trouser",
    "category": "trousers",
    "fitType": "single-pleat baggy",
    "fabric": "100% cotton poplin (lightweight, rigid)",
    "stretchPct": 0,
    "price": 95,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/pleated-baggy-trouser-62973819",
    "sourceUrl": "https://www.abercrombie.com/shop/us/p/pleated-baggy-trouser-62973819",
    "athleticFitNotes": "A&F has quietly become a go-to for the fit-pic crowd, and this is the pleated workhorse: real numeric waist sizing 28-40 plus separate inseam lengths (28/30/32/34), so you dial waist and break independently. Lightweight poplin gives airy drape; sits wide through the leg and a touch cropped above the ankle for the clean-line look (longer inseam available). The brand's own model is 6'1 in 32x32 - identical height to Don. Garment thigh ~27.5 in and seat ~45 in clear a 26.5 in quad easily; the 47 in seat is close but the baggy cut and poplin give. Waist/inseam/sizing measured from A&F; thigh/hip/rise estimated for the baggy poplin cut.",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      33,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33.5,
      "hip": 45,
      "thigh": 27.5,
      "frontRise": 12,
      "inseam": 33,
      "legOpening": 18.5
    }
  },
  {
    "id": "buck-mason-hollywood-pleated",
    "brand": "Buck Mason",
    "model": "Hollywood Pleated Trouser",
    "category": "trousers",
    "fitType": "double-pleat wide",
    "fabric": "Cotton-linen twill (structured hand, natural drape)",
    "stretchPct": 0,
    "price": 228,
    "buyUrl": "https://www.buckmason.com/collections/mens-pants",
    "sourceUrl": "https://www.buckmason.com/products/classic-khaki-hollywood-pleated-trouser",
    "athleticFitNotes": "The elevated end of the lane: a 1940s Hollywood-waist trouser with high rise, full top block, and full leg in a structured cotton-linen twill that drapes like real tailoring. Curtained waistband and double-welt back pockets read as proper menswear, not streetwear. The full top block is purpose-built for a developed seat and quads - garment thigh ~29 in and hip ~47.5 in are among the most generous here, so a 47 in seat sits in the pocket rather than straining. Offered 28-38; size up if 40 is needed since 38 is the ceiling. Waist sizing/fit (high rise, full block, full leg) confirmed from Buck Mason; thigh/hip/rise/leg-opening estimated from the Hollywood pattern.",
    "baseLabel": 34,
    "labels": [
      30,
      32,
      33,
      34,
      36,
      38
    ],
    "base": {
      "waist": 35,
      "hip": 47.5,
      "thigh": 29,
      "frontRise": 12.5,
      "inseam": 33,
      "legOpening": 19
    }
  },
  {
    "id": "todd-snyder-wythe-trouser",
    "brand": "Todd Snyder",
    "model": "Wythe Trouser (Relaxed Pleated)",
    "category": "trousers",
    "fitType": "double-reverse-pleat relaxed",
    "fabric": "Italian wool / wool-crepe / linen depending on colorway (woven, rigid)",
    "stretchPct": 0,
    "price": 198,
    "buyUrl": "https://www.toddsnyder.com/collections/wythe-trousers",
    "sourceUrl": "https://www.toddsnyder.com/products/wool-gabardine-wythe-trousernavy",
    "athleticFitNotes": "The grown-up tailored option: natural-waist, double-reverse-pleat trouser with a vintage-inspired relaxed leg. Measured high rise of 12 5/8 in and 18.5 in leg opening at a size 32 - genuinely drapey without going full baggy, so it skews more elevated-tailoring than streetwear fit-pic. Garment thigh ~27.5 in clears a 26.5 in quad comfortably; the relaxed (not wide) cut means a 47 in seat is a closer call than the Uniqlo/Buck Mason wides, so don't size down. Sits at the natural waist (~40 in on Don), which is higher than where he tags his jeans. Rise/leg-opening measured from Todd Snyder; thigh/hip estimated from the relaxed pleated pattern. (Brand 403s automated fetch but the page is real.)",
    "baseLabel": 34,
    "labels": [
      30,
      32,
      33,
      34,
      36,
      38
    ],
    "base": {
      "waist": 35,
      "hip": 46,
      "thigh": 27.5,
      "frontRise": 12.6,
      "inseam": 33,
      "legOpening": 18.5
    }
  },
  {
    "id": "jcrew-giant-pleated-trouser",
    "brand": "J.Crew",
    "model": "Giant-fit Pleated Trouser",
    "category": "trousers",
    "fitType": "double-pleat wide",
    "fabric": "Cotton twill / chino cloth (rigid)",
    "stretchPct": 0,
    "price": 128,
    "buyUrl": "https://www.jcrew.com/plp/mens/categories/clothing/pants-and-chinos?style-fit=Giant",
    "sourceUrl": "https://www.jcrew.com/p/mens/categories/clothing/pants-and-chinos/chino/giant-fit-chino-pant/BI521",
    "athleticFitNotes": "J.Crew's widest block, the Giant fit: measured 13 in front rise and 20.5 in leg opening with a sewn cuff at size 32 - the most extreme wide-and-high silhouette in this set, the full IG baggy-trouser statement. Pleated versions rotate seasonally alongside the Giant chino; pattern numbers are identical. Longer rise plus lots of hip and thigh room means a 47 in seat and 26.5 in thigh sit completely relaxed - if anything the volume is the point. The 20.5 in hem stacks/puddles, so a 30-32 in inseam is plenty at 6'1. Front rise/leg opening/inseam measured from J.Crew's Giant spec; thigh/hip estimated from the Giant block.",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 47,
      "thigh": 29.5,
      "frontRise": 13,
      "inseam": 33,
      "legOpening": 20.5
    }
  },
  {
    "id": "levis-568-loose-straight",
    "brand": "Levi's",
    "model": "568 Loose Straight",
    "category": "jeans",
    "fitType": "relaxed straight jean",
    "fabric": "99% cotton / 1% elastane (rigid-feel, slight give)",
    "stretchPct": 1,
    "price": 69.5,
    "buyUrl": "https://www.levi.com/US/en_US/clothing/men/jeans/loose",
    "sourceUrl": "https://www.levi.com/US/en_US/info/sizeguide",
    "athleticFitNotes": "The gateway baggy-adjacent Levi's. Roomy seat and thigh straight through the leg, no taper, ~17in hem. The 1% elastane adds just enough give that the garment thigh (~25.5in at W32, grading up with size) clears a 26.5in quad without pull, and the 47in seat sits comfortably. Reads classic-Americana fit-pic, less extreme than the 578 - works tucked or with a boxy tee. True 32in inseam suits 6'1. (Levi's 403s automated fetch; pages confirmed live via search index.)",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 43,
      "thigh": 25.5,
      "frontRise": 11,
      "inseam": 32,
      "legOpening": 17
    }
  },
  {
    "id": "levis-578-baggy",
    "brand": "Levi's",
    "model": "578 Baggy",
    "category": "jeans",
    "fitType": "baggy wide-leg jean",
    "fabric": "100% cotton non-stretch denim (rigid)",
    "stretchPct": 0,
    "price": 79.5,
    "buyUrl": "https://www.levi.com/US/en_US/clothing/men/jeans/loose/578TM-baggy-mens-jeans/p/A47500021",
    "sourceUrl": "https://www.levi.com/US/en_US/clothing/men/jeans/loose/578TM-baggy-mens-jeans/p/A47500021",
    "athleticFitNotes": "The full baggy jean for the streetwear-leaning fit-pic. Measured at size 32: front rise 12 in, knee 23 1/2 in, leg opening 19 in - slouchy and wide all the way to a stacked ankle, in rigid non-stretch denim. The wide block is forgiving: garment thigh ~28 in and seat ~45 in give a 26.5 in quad and 47 in seat real room, more than the 568. Levi's literally recommends sizing up for a baggier look. Rigid denim, so size to waist with seat headroom; will puddle on a 32in inseam, which is the intended stacked look. Front rise/knee/leg-opening measured from Levi's size 32 spec; thigh/hip estimated from the baggy block. (Levi's 403s automated fetch; deep product page A47500021 confirmed live via search index.)",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 45,
      "thigh": 28,
      "frontRise": 12,
      "inseam": 32,
      "legOpening": 19
    }
  },
  {
    "id": "uniqlo-wide-straight",
    "brand": "Uniqlo",
    "model": "Wide Straight Jeans",
    "category": "jeans",
    "fitType": "wide-leg jean",
    "fabric": "100% cotton rigid denim",
    "stretchPct": 0,
    "price": 49.9,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E470542-000/00",
    "sourceUrl": "https://www.uniqlo.com/us/en/products/E470542-000/00",
    "athleticFitNotes": "The best value wide-leg on the list. Clean rigid denim, high-ish rise, straight-to-wide column ~18.5in hem. Garment thigh 27in+ means a 26.5in quad fits with drape, not strain, and the wide cut clears a 47in seat. The most 'elevated minimal' of the baggy set - cream/ecru and black washes read very menswear-fit-pic. Standard inseam runs ~32; grab the Tall (E473319) if he wants stack. Regular cut is SKU E470542, confirmed live via search index (Uniqlo product pages render heavy JS and time out on automated fetch).",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      33,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 44,
      "thigh": 27.5,
      "frontRise": 12,
      "inseam": 32,
      "legOpening": 18.5
    }
  },
  {
    "id": "uniqlo-wide-straight-tall",
    "brand": "Uniqlo",
    "model": "Wide Straight Jeans (Tall)",
    "category": "jeans",
    "fitType": "wide-leg jean",
    "fabric": "100% cotton rigid denim",
    "stretchPct": 0,
    "price": 49.9,
    "buyUrl": "https://www.uniqlo.com/us/en/products/E473319-000/00",
    "sourceUrl": "https://www.uniqlo.com/us/en/products/E473319-000/00",
    "athleticFitNotes": "Same wide-leg block as the standard cut but with a ~35in inseam - purpose-built for a 6'1in frame that wants the wide leg to break long or stack. Garment thigh 27in+ clears the 26.5in quad with room and the wide cut clears a 47in seat. For Don at 6'1in this is arguably the better of the two Uniqlo cuts: full length, no high-water risk on a wide hem. SKU E473319 confirmed live via search index as the TALL wide straight jean (regular length is E470542); Uniqlo pages time out on automated fetch.",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      33,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 44,
      "thigh": 27.5,
      "frontRise": 12,
      "inseam": 35,
      "legOpening": 18.5
    }
  },
  {
    "id": "abercrombie-athletic-baggy",
    "brand": "Abercrombie & Fitch",
    "model": "Athletic Baggy Jean",
    "category": "jeans",
    "fitType": "baggy jean",
    "fabric": "Cotton / elastane vintage stretch denim",
    "stretchPct": 2,
    "price": 100,
    "buyUrl": "https://www.abercrombie.com/shop/us/p/athletic-baggy-jean-58414449",
    "sourceUrl": "https://www.abercrombie.com/shop/us/p/athletic-baggy-jean-58414449",
    "athleticFitNotes": "Literally engineered for this exact body: athletic cut = extra room through thigh and seat, then baggy and slouchy down the leg with a slight puddle. The 2% stretch makes the 26.5in quad a non-issue, and the athletic block means the 47in seat won't strain the waist (no gap-at-back problem athletic guys get). Multiple inseam lengths (short/regular/long) let him dial the puddle. Strongest off-the-rack match for him on the whole list. A&F pages render fine for automated fetch.",
    "baseLabel": 32,
    "labels": [
      30,
      31,
      32,
      33,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 45,
      "thigh": 28.5,
      "frontRise": 12,
      "inseam": 32,
      "legOpening": 18.5
    }
  },
  {
    "id": "carhartt-wip-newel",
    "brand": "Carhartt WIP",
    "model": "Newel Pant",
    "category": "jeans",
    "fitType": "loose taper",
    "fabric": "13.5 oz Maitland cotton denim (rigid)",
    "stretchPct": 0,
    "price": 138,
    "buyUrl": "https://us.carhartt-wip.com/en-us/collections/men-pants-newel",
    "sourceUrl": "https://www.footshop.eu/en/size-charts/carhartt-wip",
    "athleticFitNotes": "The elevated-workwear move. Relaxed up top with a generous thigh/seat, then a real taper below the knee (~16.5in hem) - so it gives the roomy fit-pic volume without going full wide-leg. Garment thigh ~27.5in clears the 26.5in quad; the loose seat handles 47in. Heavy rigid denim drapes with structure, very IG-menswear. Note Carhartt WIP waist tags run ~1in big, so a tagged 38 lands near a 39in garment waist - good for his ~40in natural waist on harder days. Collection page confirmed live (resolves to the Newel line, $125-155 across washes).",
    "baseLabel": 32,
    "labels": [
      30,
      31,
      32,
      33,
      34,
      36,
      38
    ],
    "base": {
      "waist": 33.5,
      "hip": 44,
      "thigh": 27.5,
      "frontRise": 11.5,
      "inseam": 32,
      "legOpening": 16.5
    }
  },
  {
    "id": "stan-ray-og-painter",
    "brand": "Stan Ray",
    "model": "OG Painter Pant (Denim)",
    "category": "jeans",
    "fitType": "wide-leg jean",
    "fabric": "100% cotton denim (rigid, ~1in shrink)",
    "stretchPct": 0,
    "price": 99,
    "buyUrl": "https://www.stanray.com/collections/og-painter-pants",
    "sourceUrl": "https://stanrayusa.com/pages/fit-guide",
    "athleticFitNotes": "Straight-up wide painter pant - roomy from waist to a ~19in hem with the utility-pant volume that's all over menswear fit-pics. Cut deliberately ~1in wide and long (shrinks an inch after first wash/dry), so a 26.5in quad swims in it and a 47in seat sits with room. The 12.5in rise sits high, balancing the seat. Made-in-USA workwear cred; ecru/natural and indigo are the fit-pic colors. Size true - they account for shrink. Collection page confirmed live (21 products, multiple denim washes).",
    "baseLabel": 32,
    "labels": [
      30,
      32,
      34,
      36,
      38,
      40
    ],
    "base": {
      "waist": 33,
      "hip": 45,
      "thigh": 28.5,
      "frontRise": 12.5,
      "inseam": 34,
      "legOpening": 19
    }
  },
  {
    "id": "agolde-low-slung-baggy",
    "brand": "AGOLDE",
    "model": "Low Slung Baggy",
    "category": "jeans",
    "fitType": "baggy jean",
    "fabric": "100% organic cotton rigid denim",
    "stretchPct": 0,
    "price": 198,
    "buyUrl": "https://agolde.com/collections/mens",
    "sourceUrl": "https://agolde.com/pages/agolde-size-chart",
    "athleticFitNotes": "The premium/most-fashion-forward pick. Published men's measurements: rise 12 5/8in, inseam 30.5in, leg opening 22.5in at W32 - a genuinely wide, low-slung baggy. Designed oversize and worn low on the hip, so the 26.5in quad and 47in seat are nowhere near the limits; it's meant to drape and pool. Premium denim, the elevated-IG end of the spectrum. Runs roomy - AGOLDE says size down for a closer fit. Short 30.5in inseam means it sits/pools rather than stacks long on 6'1in. Linked to the evergreen AGOLDE men's collection page (confirmed live); the specific style page rotates by wash.",
    "baseLabel": 32,
    "labels": [
      30,
      31,
      32,
      33,
      34,
      36,
      38
    ],
    "base": {
      "waist": 33,
      "hip": 46,
      "thigh": 29.5,
      "frontRise": 12.6,
      "inseam": 30.5,
      "legOpening": 22.5
    }
  }
];

export const CATALOG: Garment[] = [...SEED, ...NEW_SEEDS].map(expand);

export function getGarment(id: string): Garment | undefined {
  return CATALOG.find((g) => g.id === id);
}
