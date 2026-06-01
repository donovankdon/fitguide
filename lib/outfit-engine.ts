import type { WardrobeItem, Outfit, OutfitPiece, Palette } from "./wardrobe";

/**
 * The "other side" of Ease: given a wardrobe of in-palette pieces sized for the user,
 * assemble coordinated outfits. Don's rule is "stay in palette, everything works" — this
 * just makes that concrete: pick the color per piece that harmonizes best, keep an anchor,
 * don't stack too many saturated colors, ground earthy looks with leather.
 */

const NEUTRAL: Palette[] = ["white", "cream", "stone", "grey"];

function isNeutral(c: Palette): boolean {
  return NEUTRAL.includes(c);
}

/** 0..100 — how well a set of chosen colors sits together. */
export function harmony(colors: Palette[]): number {
  let score = 100;
  const saturated = colors.filter((c) => !isNeutral(c) && c !== "blue");
  const distinct = new Set(saturated);

  if (distinct.size >= 4) score -= 40;
  else if (distinct.size === 3) score -= 18;

  const monochrome = new Set(colors).size === 1;
  const hasAnchor = colors.some((c) => isNeutral(c) || c === "blue" || c === "black");
  if (!hasAnchor && !monochrome) score -= 12;

  // Don's signature earthy stack, anchored by a neutral.
  if (distinct.has("brown") && distinct.has("olive") && colors.some(isNeutral)) score += 6;
  // Mixing black + brown leather is allowed but not preferred.
  if (colors.includes("black") && colors.includes("brown")) score -= 6;

  return Math.max(0, Math.min(100, score));
}

function bySlot(items: WardrobeItem[], slot: WardrobeItem["slot"]): WardrobeItem[] {
  return items.filter((i) => i.slot === slot);
}

/** Choose one color per item to maximize harmony (small cartesian search). */
function bestColors(picks: WardrobeItem[]): { colors: Palette[]; score: number } {
  let best: { colors: Palette[]; score: number } = { colors: [], score: -1 };
  const options = picks.map((p) => (p.colors.length ? p.colors : (["stone"] as Palette[])));
  const recurse = (i: number, acc: Palette[]) => {
    if (i === options.length) {
      const s = harmony(acc);
      if (s > best.score) best = { colors: [...acc], score: s };
      return;
    }
    for (const c of options[i]) recurse(i + 1, [...acc, c]);
  };
  recurse(0, []);
  return best;
}

const CAT_NOUN: Record<string, string> = {
  tee: "tee",
  "button-up": "shirt",
  trouser: "trousers",
  jean: "jeans",
  utility: "utility pant",
  overshirt: "overshirt",
  boot: "boots",
  chukka: "chukkas",
  sneaker: "sneakers",
  sandal: "sandals",
  cap: "cap",
};

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function bottomDescriptor(item: WardrobeItem): string {
  const t = item.styleTags;
  if (t.includes("pleated")) return "pleated";
  if (t.includes("relaxed") || t.includes("wide")) return "relaxed";
  if (t.includes("straight")) return "straight";
  return "";
}

function nameFor(colors: Palette[], bottom: WardrobeItem): string {
  const set = new Set(colors);
  if (set.size === 1) return `Monochrome ${colors[0] === "blue" ? "denim" : colors[0]}`;
  if (set.has("brown") && set.has("olive")) return "Earthy stack";
  if (set.has("blue")) return "Denim staple";
  const allNeutral = colors.every((c) => isNeutral(c));
  if (allNeutral) return "Clean neutral";
  const pleat = bottomDescriptor(bottom) === "pleated";
  return pleat ? "Pleated & easy" : "Palette mix";
}

function whyFor(
  top: WardrobeItem,
  topC: Palette,
  bottom: WardrobeItem,
  bottomC: Palette,
  shoe: WardrobeItem,
  shoeC: Palette,
): string {
  const bd = bottomDescriptor(bottom);
  const bp = [bottomC === "blue" ? "denim" : bottomC, bd].filter(Boolean).join(" ");
  return `${cap(bp)} ${CAT_NOUN[bottom.category]} + ${topC === "blue" ? "denim" : topC} ${CAT_NOUN[top.category]}, grounded by ${shoeC === "blue" ? "denim" : shoeC} ${CAT_NOUN[shoe.category]}.`;
}

export interface OutfitOptions {
  minHarmony?: number;
  max?: number;
}

export function buildOutfits(items: WardrobeItem[], opts: OutfitOptions = {}): Outfit[] {
  const minH = opts.minHarmony ?? 70;
  const max = opts.max ?? 12;

  const tops = bySlot(items, "top");
  const bottoms = bySlot(items, "bottom");
  const shoes = bySlot(items, "shoe");
  const caps = bySlot(items, "cap");

  const all: Outfit[] = [];
  for (const top of tops) {
    for (const bottom of bottoms) {
      for (const shoe of shoes) {
        const { colors, score } = bestColors([top, bottom, shoe]);
        if (score < minH) continue;
        const [topC, bottomC, shoeC] = colors;

        const pieces: OutfitPiece[] = [
          { item: top, color: topC },
          { item: bottom, color: bottomC },
          { item: shoe, color: shoeC },
        ];

        // optional cap in a color that keeps harmony
        const capItem = caps.find((c) =>
          c.colors.some((cc) => harmony([...colors, cc]) >= score - 2),
        );
        if (capItem) {
          const capColor =
            capItem.colors.find((cc) => harmony([...colors, cc]) >= score - 2) ?? capItem.colors[0];
          pieces.push({ item: capItem, color: capColor });
        }

        const price = pieces.reduce((sum, p) => sum + (p.item.price ?? 0), 0);
        all.push({
          id: `${top.id}__${bottom.id}__${shoe.id}`,
          name: nameFor(colors, bottom),
          pieces,
          price,
          harmony: score,
          why: whyFor(top, topC, bottom, bottomC, shoe, shoeC),
        });
      }
    }
  }

  all.sort((a, b) => b.harmony - a.harmony || a.price - b.price);

  // diversify: no more than 2 outfits sharing the same top
  const topCount: Record<string, number> = {};
  const out: Outfit[] = [];
  for (const o of all) {
    const k = o.pieces[0].item.id;
    topCount[k] = (topCount[k] ?? 0) + 1;
    if (topCount[k] > 2) continue;
    out.push(o);
    if (out.length >= max) break;
  }
  return out;
}
