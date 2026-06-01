import { describe, it, expect } from "vitest";
import { harmony, buildOutfits } from "./outfit-engine";
import { WARDROBE } from "../data/wardrobe";

describe("color harmony", () => {
  it("rewards an earthy+neutral stack over a clashing pile", () => {
    expect(harmony(["olive", "cream", "brown"])).toBeGreaterThan(
      harmony(["olive", "brown", "blue", "black"]),
    );
  });
  it("treats neutrals and denim as anchors", () => {
    expect(harmony(["white"])).toBe(100);
    expect(harmony(["olive", "white", "brown"])).toBeGreaterThanOrEqual(90);
  });
});

describe("buildOutfits", () => {
  const outfits = buildOutfits(WARDROBE);

  it("produces coordinated outfits", () => {
    expect(outfits.length).toBeGreaterThan(0);
    expect(outfits.every((o) => o.harmony >= 70)).toBe(true);
  });

  it("each outfit has a top, bottom, shoe, and a real price", () => {
    for (const o of outfits) {
      const slots = o.pieces.map((p) => p.item.slot);
      expect(slots).toContain("top");
      expect(slots).toContain("bottom");
      expect(slots).toContain("shoe");
      expect(o.price).toBeGreaterThan(0);
    }
  });

  it("diversifies — no single top in more than 2 outfits", () => {
    const counts: Record<string, number> = {};
    for (const o of outfits) {
      const k = o.pieces[0].item.id;
      counts[k] = (counts[k] ?? 0) + 1;
    }
    expect(Math.max(...Object.values(counts))).toBeLessThanOrEqual(2);
  });
});
