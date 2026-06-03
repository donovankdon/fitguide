import { describe, it, expect } from "vitest";
import { scoreGarment, rankFits, formatEase } from "./fit-engine";
import { calibrateFromReference } from "./calibrate";
import { CATALOG, getGarment } from "../data/catalog";
import type { BodyProfile } from "./types";

// A real athletic V-shape: trim waist, big thighs/seat.
const ATHLETIC: BodyProfile = { waist: 33, thigh: 24.5, hip: 41, inseam: 32 };

function score(id: string) {
  const g = getGarment(id)!;
  return scoreGarment(ATHLETIC, g);
}

describe("fit engine — athletic build", () => {
  it("rewards an athletic taper over a slim cut", () => {
    const athletic = score("levis-541");
    const slim = score("levis-511");
    expect(athletic.score).toBeGreaterThan(slim.score);
  });

  it("flags a slim jean as wearable-but-tight, and the thigh is the problem", () => {
    const slim = score("levis-511");
    expect(slim.score).toBeGreaterThanOrEqual(55);
    expect(slim.score).toBeLessThan(75);

    const worst = [...slim.bestSize.dims].sort((a, b) => a.score - b.score)[0];
    expect(worst.dim).toBe("thigh");
    expect(worst.ease).toBeLessThan(worst.idealEase); // it's tight, not roomy
    expect(slim.note.toLowerCase()).toContain("thigh");
  });

  it("scores a purpose-built athletic jean as dialed in", () => {
    const barbell = score("barbell-straight-athletic");
    expect(barbell.score).toBeGreaterThanOrEqual(90);
    expect(barbell.verdict).toBe("Dialed in");
  });

  it("ranks athletic-appropriate cuts on top and sinks the slim ones", () => {
    const ranked = rankFits(ATHLETIC, CATALOG);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].score).toBeGreaterThanOrEqual(90); // something dials in
    // strictness cutoff respected
    expect(ranked.every((r) => r.score >= 55)).toBe(true);
    // sorted descending
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
    }
    // the narrow cuts land in the bottom third for an athletic build
    const idx = (id: string) => ranked.findIndex((r) => r.garment.id === id);
    for (const slim of ["levis-510", "levis-511", "levis-512"]) {
      expect(idx(slim)).toBeGreaterThan(ranked.length * 0.6);
    }
  });

  it("picks a best size whose waist sits close to the body", () => {
    const r = score("levis-502");
    const waist = r.bestSize.dims.find((d) => d.dim === "waist")!;
    expect(Math.abs(waist.ease)).toBeLessThanOrEqual(2); // not gaping, not strangling
  });
});

describe("reference-garment calibration", () => {
  it("tunes ideal ease so a loved garment scores near-perfect", () => {
    const ref = getGarment("levis-541")!;
    const override = calibrateFromReference(ATHLETIC, ref, "W34");
    expect(override.thigh).toBeDefined();

    const calibrated = scoreGarment(ATHLETIC, ref, { idealEaseOverride: override });
    expect(calibrated.score).toBeGreaterThanOrEqual(95);
  });
});

describe("rough cut — missing or zero thigh", () => {
  const NO_THIGH: BodyProfile = { waist: 33, hip: 41, inseam: 32 }; // thigh omitted
  const ZERO_THIGH: BodyProfile = { waist: 33, thigh: 0, hip: 41, inseam: 32 };

  it("marks roughCut=true when thigh is undefined", () => {
    const r = scoreGarment(NO_THIGH, getGarment("levis-541")!);
    expect(r.roughCut).toBe(true);
  });

  it("marks roughCut=true when thigh is 0", () => {
    const r = scoreGarment(ZERO_THIGH, getGarment("levis-541")!);
    expect(r.roughCut).toBe(true);
  });

  it("caps score at 72 — never 'Great fit' or 'Dialed in' without thigh data", () => {
    for (const body of [NO_THIGH, ZERO_THIGH]) {
      const ranked = rankFits(body, CATALOG);
      expect(ranked.every((r) => r.score <= 72)).toBe(true);
    }
  });

  it("does NOT set roughCut when thigh is present", () => {
    const r = scoreGarment(ATHLETIC, getGarment("levis-541")!);
    expect(r.roughCut).toBeFalsy();
  });
});

describe("510 Skinny — explicit Skip for athletic builds", () => {
  it("scores below 60 for an athletic thigh — Skip verdict", () => {
    const r = scoreGarment(ATHLETIC, getGarment("levis-510")!);
    expect(r.score).toBeLessThan(60);
    expect(r.verdict).toBe("Skip — won't fit right");
  });

  it("appears in ranked results above the 55 cutoff, ranked last", () => {
    const ranked = rankFits(ATHLETIC, CATALOG);
    const skinny = ranked.find((r) => r.garment.id === "levis-510")!;
    expect(skinny).toBeDefined();
    expect(skinny.score).toBeGreaterThanOrEqual(55);
    expect(skinny.score).toBeLessThan(60);
    // must be the worst-ranked result
    expect(ranked[ranked.length - 1].garment.id).toBe("levis-510");
  });

  it("identifies thigh as the problem dimension", () => {
    const r = scoreGarment(ATHLETIC, getGarment("levis-510")!);
    const worst = [...r.bestSize.dims].sort((a, b) => a.score - b.score)[0];
    expect(worst.dim).toBe("thigh");
    expect(worst.ease).toBeLessThan(worst.idealEase);
  });
});

describe("tight-thigh detection — even the widest cut is tight", () => {
  // Trim waist + a very big thigh — beyond what even the catalog's widest cuts clear,
  // so the "nothing truly fits → try athletic-native brands" warning should fire.
  const BIG_THIGHS: BodyProfile = { waist: 32, thigh: 29, hip: 45, inseam: 32 };

  it("top result's thigh dim drops below 70 — triggers the tight-thigh warning", () => {
    const ranked = rankFits(BIG_THIGHS, CATALOG);
    expect(ranked.length).toBeGreaterThan(0);
    const topThigh = ranked[0].bestSize.dims.find((d) => d.dim === "thigh")!;
    expect(topThigh.score).toBeLessThan(70);
  });

  it("a roomy/wide cut leads for that build — never a slim one", () => {
    const ranked = rankFits(BIG_THIGHS, CATALOG);
    expect(ranked[0].garment.fitType).not.toMatch(/slim|skinny/i);
  });
});

describe("formatEase", () => {
  it("formats room, tightness, and exact", () => {
    expect(formatEase(1)).toBe('+1.0″');
    expect(formatEase(-1.6)).toBe("−1.6″");
    expect(formatEase(0)).toBe("±0.0″");
  });
});
