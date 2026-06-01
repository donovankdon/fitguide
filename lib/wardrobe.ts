// Ease — outfit side. Style/coordination model (vs lib/types.ts which is the fit model).

export type Palette =
  | "white"
  | "cream"
  | "stone"
  | "grey"
  | "brown"
  | "olive"
  | "blue" // denim — behaves like a neutral
  | "black";

export type ItemCategory =
  | "tee"
  | "button-up"
  | "trouser"
  | "jean"
  | "utility"
  | "overshirt"
  | "boot"
  | "chukka"
  | "sneaker"
  | "sandal"
  | "cap";

export type Slot = "top" | "bottom" | "shoe" | "layer" | "cap";

export interface WardrobeItem {
  id: string;
  brand: string;
  model: string;
  category: ItemCategory;
  slot: Slot;
  colors: Palette[]; // colorways that fit the palette
  styleTags: string[]; // pleated, relaxed, heavyweight, chambray, suede...
  trend?: string; // current move it rides, if any
  size: string; // recommended for Don (6'1" 225, 38x32)
  fitNote?: string;
  price?: number;
  buyUrl?: string;
  why?: string;
}

export interface OutfitPiece {
  item: WardrobeItem;
  color: Palette;
}

export interface Outfit {
  id: string;
  name: string;
  pieces: OutfitPiece[]; // top, bottom, shoe, then optional layer/cap
  price: number;
  harmony: number;
  why: string;
}

export const SLOT_FOR_CATEGORY: Record<ItemCategory, Slot> = {
  tee: "top",
  "button-up": "top",
  trouser: "bottom",
  jean: "bottom",
  utility: "bottom",
  overshirt: "layer",
  boot: "shoe",
  chukka: "shoe",
  sneaker: "shoe",
  sandal: "shoe",
  cap: "cap",
};

// Swatch colors for the UI — muted, in-palette, reads on near-black.
export const COLOR_HEX: Record<Palette, string> = {
  white: "#ece9e2",
  cream: "#ddd3bf",
  stone: "#c3b29c", // stone/tan
  grey: "#8d8d88",
  brown: "#6f5240",
  olive: "#5c6043",
  blue: "#3d4c66", // denim
  black: "#1d1d1d",
};

export function readableLabel(c: Palette): string {
  return c === "blue" ? "denim" : c;
}
