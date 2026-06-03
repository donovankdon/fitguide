import { describe, it, expect } from "vitest";
import {
  scoreTopGarment,
  rankTopFits,
  topVerdictFor,
  type TopBodyProfile,
  type TopGarment,
} from "./tops";
import { TOPS } from "../data/tops";

// Don's measured upper body: broad shoulders, athletic chest, tall torso.
const DON: TopBodyProfile = { chest: 41, shoulder: 19.5, neck: 18, length: 28 };

function find(id: string): TopGarment {
  const g = TOPS.find((t) => t.id === id);
  if (!g) throw new Error(`no catalog item ${id}`);
  return g;
}

describe("tops engine — synthetic fixtures (pure mechanics)", () => {
  // A boxy heavyweight tee sized right for him: big chest ease, shoulder near the natural
  // shoulder (small drop), good length.
  const BOXY_GOOD: TopGarment = {
    id: "boxy-good",
    brand: "Test",
    model: "Boxy Heavy",
    category: "tee",
    fitType: "boxy heavyweight",
    fitFeel: "boxy",
    provenance: "measured",
    sizes: [
      { label: "M", chest: 44, shoulder: 18.5, length: 28 },
      { label: "L", chest: 49, shoulder: 20, length: 30.5 },
    ],
  };

  // A shirt that binds the shoulders at EVERY size — can't be sized out of.
  const SHOULDER_SKIP: TopGarment = {
    id: "shoulder-skip",
    brand: "Test",
    model: "Too Slim",
    category: "tee",
    fitType: "slim",
    fitFeel: "fitted",
    provenance: "estimated",
    sizes: [
      { label: "M", chest: 38, shoulder: 15.5, length: 26 },
      { label: "L", chest: 42, shoulder: 16.5, length: 29 },
    ],
  };

  it("dials in a boxy tee at the size that clears the shoulders", () => {
    const r = scoreTopGarment(DON, BOXY_GOOD);
    expect(r.score).toBeGreaterThanOrEqual(90);
    expect(r.verdict).toBe("Dialed in");
    expect(r.bestSize.size.label).toBe("L");
  });

  it("a shirt that binds the shoulders at every size is a Skip, worst dim = shoulder", () => {
    const r = scoreTopGarment(DON, SHOULDER_SKIP);
    expect(r.score).toBeLessThan(55);
    expect(r.verdict).toBe("Skip — won't sit right");
    const worst = [...r.bestSize.dims].sort((a, b) => a.score - b.score)[0];
    expect(worst.dim).toBe("shoulder");
    expect(r.note.toLowerCase()).toContain("shoulder");
  });

  it("drops a sub-cutoff garment from the ranked results", () => {
    const ranked = rankTopFits(DON, [SHOULDER_SKIP, BOXY_GOOD]);
    expect(ranked.some((r) => r.garment.id === "shoulder-skip")).toBe(false);
    expect(ranked[0].garment.id).toBe("boxy-good");
  });

  it("only scores a dimension the body carries — sleeve is never scored", () => {
    // DON has no sleeve, so no garment is scored on sleeve (conventions are incompatible).
    for (const g of TOPS) {
      const r = scoreTopGarment(DON, g);
      expect(r.bestSize.dims.some((d) => d.dim === "sleeve")).toBe(false);
    }
  });
});

describe("tops engine — real catalog", () => {
  it("every recommended size clears the shoulders (except the deliberate Skip baseline)", () => {
    for (const g of TOPS) {
      if (g.id === "jcrew-slim-ludlow-oxford-shirt") continue; // the Skip baseline binds on purpose
      const r = scoreTopGarment(DON, g);
      const shoulder = r.bestSize.dims.find((d) => d.dim === "shoulder");
      expect(shoulder, `${g.id} should score shoulder`).toBeDefined();
      // seam sits at/just past his shoulder, never biting inside it
      expect(shoulder!.ease, `${g.id} recommends a shoulder-binding size`).toBeGreaterThanOrEqual(-0.6);
    }
  });

  it("dials in the oversized boxy heavyweight tee", () => {
    const cos = scoreTopGarment(DON, find("cos-oversized-heavyweight-290g-tee"));
    expect(cos.score).toBeGreaterThanOrEqual(88);
    expect(cos.verdict).toBe("Dialed in");
  });

  it("the slim oxford is the worst woven — beaten by the athletic stretch shirt", () => {
    const oxford = scoreTopGarment(DON, find("jcrew-slim-ludlow-oxford-shirt"));
    const athletic = scoreTopGarment(DON, find("state-and-liberty-athletic-dress-shirt"));
    expect(oxford.score).toBeLessThan(80); // never a "great fit"
    expect(athletic.score).toBeGreaterThan(oxford.score); // anti-skip beats skip
    // the oxford's problem is up top: shoulder or chest is its worst-scoring dim
    const worst = [...oxford.bestSize.dims].sort((a, b) => a.score - b.score)[0];
    expect(["shoulder", "chest", "neck"]).toContain(worst.dim);
  });

  it("ranks the catalog best-first, respects the cutoff", () => {
    const ranked = rankTopFits(DON, TOPS);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked[0].score).toBeGreaterThanOrEqual(88);
    expect(ranked.every((r) => r.score >= 55)).toBe(true);
    for (let i = 1; i < ranked.length; i++) {
      expect(ranked[i - 1].score).toBeGreaterThanOrEqual(ranked[i].score);
    }
  });

  it("every item has honest provenance and a chest on every size", () => {
    for (const g of TOPS) {
      expect(["measured", "estimated"]).toContain(g.provenance);
      expect(g.sizes.length).toBeGreaterThan(0);
      for (const s of g.sizes) expect(typeof s.chest).toBe("number");
    }
  });

  it("scores neck only on collared shirts", () => {
    const tee = scoreTopGarment(DON, find("uniqlo-u-crew-neck-heavyweight-tee"));
    expect(tee.bestSize.dims.some((d) => d.dim === "neck")).toBe(false);
    const shirt = scoreTopGarment(DON, find("buck-mason-japanese-chambray-station-shirt"));
    expect(shirt.bestSize.dims.some((d) => d.dim === "neck")).toBe(true);
  });
});

describe("topVerdictFor", () => {
  it("maps scores to honest verdicts", () => {
    expect(topVerdictFor(95)).toBe("Dialed in");
    expect(topVerdictFor(83)).toBe("Great fit");
    expect(topVerdictFor(72)).toBe("Solid — minor compromise");
    expect(topVerdictFor(63)).toBe("Wearable, but off");
    expect(topVerdictFor(40)).toBe("Skip — won't sit right");
  });
});
