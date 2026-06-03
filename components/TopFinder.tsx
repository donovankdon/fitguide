"use client";

import { useMemo, useState } from "react";
import { TOPS } from "@/data/tops";
import {
  rankTopFits,
  type TopBodyProfile,
  type TopFitFeel,
} from "@/lib/tops";
import { TopResultRow } from "@/components/TopResultRow";

type Filter = "all" | TopFitFeel;
const FILTERS: Filter[] = ["all", "boxy", "regular", "fitted"];
const FILTER_NOTE: Record<Filter, string> = {
  all: "everything that fits, best first — each judged the way that cut is meant to sit.",
  boxy: "the 2026 heavyweight-tee drape: structured, stands off the body, never cling.",
  regular: "classic room — sits close to the shoulder without pulling.",
  fitted: "tailored to the body (the hardest cut to get right on broad shoulders).",
};

// Default = Don's measured upper body (6'1", 225). length is a target garment length for
// his height (his ~28" clean-coverage baseline), so a boxy tee that runs short reads as
// "will ride up" → size to a Tall. Sleeve is omitted: brands publish it on incompatible
// conventions, so v1 doesn't score it (see data/tops.ts).
const DEFAULT_BODY: TopBodyProfile = {
  chest: 41,
  shoulder: 19.5,
  neck: 18,
  length: 28,
};

type Field = { key: "chest" | "shoulder" | "neck"; label: string; hint: string };
const FIELDS: Field[] = [
  { key: "chest", label: "Chest", hint: "fullest, under the arms" },
  { key: "shoulder", label: "Shoulder", hint: "seam to seam, across back" },
  { key: "neck", label: "Neck", hint: "base of the neck (collared only)" },
];

export function TopFinder() {
  const [body, setBody] = useState<TopBodyProfile>(DEFAULT_BODY);
  const [filter, setFilter] = useState<Filter>("all");

  // Score every garment at its OWN intended fit (no feel override); the filter just narrows
  // which cuts are shown.
  const pool = useMemo(
    () => (filter === "all" ? TOPS : TOPS.filter((g) => g.fitFeel === filter)),
    [filter],
  );
  const results = useMemo(() => rankTopFits(body, pool).slice(0, 8), [body, pool]);

  function setField(key: Field["key"], v: string) {
    const n = parseFloat(v);
    const valid = Number.isFinite(n) && n > 0;
    setBody((b) => ({
      ...b,
      // chest + shoulder are the make-or-break pair — keep them present (fall back to 0)
      // so a cleared field can't silently inflate scores by dropping a critical dimension.
      [key]: valid ? n : key === "neck" ? undefined : 0,
    }));
  }

  // "Nothing here truly fits" analog for tops: even the #1 pick pulls across the shoulders.
  const topShoulderDim = results[0]?.bestSize.dims.find((d) => d.dim === "shoulder");
  const tightShoulderWarning =
    results.length > 0 &&
    topShoulderDim !== undefined &&
    topShoulderDim.score < 70;

  return (
    <section className="mt-20">
      {/* 01 — measurements */}
      <div className="rise" style={{ animationDelay: "120ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          01 — your measurements <span className="text-faint/70">(inches)</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {FIELDS.map((f) => (
            <label key={f.key} className="flex flex-col gap-1 bg-bg p-5">
              <span className="text-sm text-muted">{f.label}</span>
              <input
                type="number"
                inputMode="decimal"
                step={0.5}
                min={12}
                max={60}
                value={body[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                className="mono w-full bg-transparent text-3xl text-fg outline-none focus:text-good"
              />
              <span className="text-xs text-faint">{f.hint}</span>
            </label>
          ))}
        </div>
        <p className="mono mt-3 text-xs text-faint">
          Chest &amp; shoulder do the heavy lifting — on an athletic build they make or
          break a top. Neck only scores collared shirts; length is set for a 6&apos;1″ torso.
        </p>
      </div>

      {/* 02 — filter by cut */}
      <div className="rise mt-12" style={{ animationDelay: "200ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          02 — filter by cut
        </h2>
        <div className="mt-5 flex flex-wrap gap-8">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`display text-2xl capitalize transition-colors ${
                filter === f
                  ? "text-fg underline underline-offset-8"
                  : "text-faint hover:text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="mono mt-4 text-xs text-faint">{FILTER_NOTE[filter]}</p>
      </div>

      {/* 03 — results */}
      <div className="rise mt-16" style={{ animationDelay: "280ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          03 — your best-fitting tops{" "}
          <span className="text-faint/70">
            · {results.length} of {pool.length} clear the bar
          </span>
        </h2>
        {results.length === 0 ? (
          <p className="mt-6 text-muted">
            Nothing clears the bar for that cut yet. Try another filter or
            double-check your measurements.
          </p>
        ) : (
          <ol className="mt-4">
            {results.map((r, i) => (
              <TopResultRow key={r.garment.id} rank={i + 1} result={r} />
            ))}
          </ol>
        )}

        {tightShoulderWarning && (
          <div className="rise mt-6 flex items-start gap-3 rounded-lg border border-bad/30 bg-bad/5 px-5 py-4">
            <span className="mt-px text-bad" aria-hidden>↑</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-bad">
                Even your top pick pulls across the shoulders.
              </p>
              <p className="mt-1 text-sm text-muted">
                For shoulders like yours, mainstream cuts fight you. These brands cut
                tops specifically for an athletic V-shape — worth trying:
              </p>
              <p className="mono mt-2 text-sm text-fg">
                State &amp; Liberty · Western Rise · RHONE
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
