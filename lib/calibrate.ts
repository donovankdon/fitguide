import type { BodyProfile, Garment, Dimension } from "./types";

/**
 * The data pump. "I own these and they fit great" → infer the user's *preferred*
 * ease per dimension from a garment they love, then feed it back as
 * idealEaseOverride so every other recommendation is tuned to their actual taste
 * instead of a generic slim/regular/relaxed default. Requires body measurements.
 */
export function calibrateFromReference(
  body: BodyProfile,
  garment: Garment,
  sizeLabel: string,
): Partial<Record<Dimension, number>> {
  const size =
    garment.sizes.find((s) => s.label === sizeLabel) ?? garment.sizes[0];
  const out: Partial<Record<Dimension, number>> = {};
  const dims: Dimension[] = ["waist", "thigh", "hip", "inseam"];
  for (const dim of dims) {
    const b = body[dim];
    const g = size[dim];
    if (b !== undefined && g !== undefined) {
      out[dim] = Math.round((g - b) * 10) / 10;
    }
  }
  return out;
}
