"use client";

import { useMemo, useState } from "react";
import { WARDROBE } from "@/data/wardrobe";
import { buildOutfits } from "@/lib/outfit-engine";
import type { Outfit } from "@/lib/wardrobe";
import { OutfitCard } from "@/components/OutfitCard";

// Seeded shuffle so SSR and client render the same order (no hydration mismatch).
function sample(arr: Outfit[], n: number, seed: number): Outfit[] {
  const a = [...arr];
  let s = seed + 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export function OutfitView() {
  const pool = useMemo(() => buildOutfits(WARDROBE, { max: 24 }), []);
  const [seed, setSeed] = useState(0);
  const shown = useMemo(
    () => sample(pool, Math.min(6, pool.length), seed),
    [pool, seed],
  );

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          your capsule · {pool.length} outfits that work
        </h2>
        <button
          type="button"
          onClick={() => setSeed((s) => s + 1)}
          className="mono text-xs text-muted transition-colors hover:text-fg"
        >
          ↻ shuffle
        </button>
      </div>
      <ol className="mt-4">
        {shown.map((o, i) => (
          <OutfitCard key={o.id} rank={i + 1} outfit={o} />
        ))}
      </ol>
    </div>
  );
}
