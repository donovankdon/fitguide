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

  it("ranks the catalog with the best athletic fit first", () => {
    const ranked = rankFits(ATHLETIC, CATALOG);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].garment.id).toBe("barbell-straight-athletic");
    // strictness cutoff respected
    expect(ranked.every((r) => r.score >= 55)).toBe(true);
    // sorted descending
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
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

describe("formatEase", () => {
  it("formats room, tightness, and exact", () => {
    expect(formatEase(1)).toBe('+1.0″');
    expect(formatEase(-1.6)).toBe("−1.6″");
    expect(formatEase(0)).toBe("±0.0″");
  });
});
