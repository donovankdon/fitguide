"use client";

import { useMemo, useState } from "react";
import { CATALOG } from "@/data/catalog";
import { rankFits, type FitOptions } from "@/lib/fit-engine";
import { calibrateFromReference } from "@/lib/calibrate";
import type { BodyProfile, FitFeel } from "@/lib/types";
import { ResultRow } from "@/components/ResultRow";

const FEELS: FitFeel[] = ["slim", "regular", "relaxed"];

// Default = Don's MEASURED build (wears 38×32). Waist is pants-wear (his natural waist
// measures ~40, but pants sit lower at ~38); inseam confirmed 32. Thigh + seat are now his
// real measured numbers (thigh 26.5, seat 47), not estimates.
const DEFAULT_BODY: BodyProfile = { waist: 38, thigh: 26.5, hip: 47, inseam: 32 };

type BodyKey = keyof BodyProfile;
const FIELDS: { key: BodyKey; label: string; hint: string }[] = [
  { key: "waist", label: "Waist", hint: "where you wear them" },
  { key: "thigh", label: "Thigh", hint: "largest part, around" },
  { key: "hip", label: "Seat / hip", hint: "fullest point" },
  { key: "inseam", label: "Inseam", hint: "inside leg length" },
];

export function FitFinder() {
  const [body, setBody] = useState<BodyProfile>(DEFAULT_BODY);
  const [feel, setFeel] = useState<FitFeel>("regular");
  const [refOn, setRefOn] = useState(false);
  const [refId, setRefId] = useState("levis-541");
  const [refSize, setRefSize] = useState("W34");

  const refGarment = CATALOG.find((g) => g.id === refId) ?? CATALOG[0];

  const results = useMemo(() => {
    const opts: FitOptions = { feel };
    if (refOn) {
      opts.idealEaseOverride = calibrateFromReference(body, refGarment, refSize);
    }
    return rankFits(body, CATALOG, opts).slice(0, 5);
  }, [body, feel, refOn, refGarment, refSize]);

  function setField(key: BodyKey, v: string) {
    const n = parseFloat(v);
    const valid = Number.isFinite(n) && n > 0;
    setBody((b) => ({
      ...b,
      // waist is required — fall back to 0 so the form stays usable
      [key]: valid ? n : key === "waist" ? 0 : undefined,
    }));
  }

  const thighMissing = !body.thigh || body.thigh <= 0;

  // Show "nothing truly fits" warning when even the top result has meaningfully tight thighs.
  // Threshold: thigh dim score < 70 on the #1 result (≈ less than ~0.6" of room vs ideal).
  const topThighDim = results[0]?.bestSize.dims.find((d) => d.dim === "thigh");
  const tightThighWarning =
    !thighMissing &&
    results.length > 0 &&
    topThighDim !== undefined &&
    topThighDim.score < 70;

  return (
    <section className="mt-20">
      {/* 01 — measurements */}
      <div className="rise" style={{ animationDelay: "120ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          01 — your measurements <span className="text-faint/70">(inches)</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {FIELDS.map((f) => (
            <label key={f.key} className="flex flex-col gap-1 bg-bg p-5">
              <span className="text-sm text-muted">{f.label}</span>
              <input
                type="number"
                inputMode="decimal"
                step={0.5}
                min={20}
                max={60}
                value={body[f.key] ?? ""}
                onChange={(e) => setField(f.key, e.target.value)}
                className="mono w-full bg-transparent text-3xl text-fg outline-none focus:text-good"
              />
              <span className="text-xs text-faint">{f.hint}</span>
            </label>
          ))}
        </div>
      </div>

      {/* thigh measurement helper — only when thigh is missing */}
      {thighMissing && (
        <div className="rise mt-5 flex items-start gap-3 rounded-lg border border-warn/30 bg-warn/5 px-5 py-4" style={{ animationDelay: "160ms" }}>
          <span className="mt-px text-warn" aria-hidden>⚠</span>
          <div className="min-w-0">
            <p className="text-sm text-warn">
              Add your thigh for a real verdict.{" "}
              <span className="text-muted">
                Wrap a tape measure around the largest part of one thigh (usually mid-thigh, standing relaxed). Enter the number above.
              </span>
            </p>
            <p className="mono mt-1 text-xs text-faint">
              Without it, results are rough cuts — scores are capped and may not reflect actual fit.
            </p>
          </div>
        </div>
      )}

      {/* 02 — fit feel + calibration */}
      <div className="rise mt-12" style={{ animationDelay: "200ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          02 — how you like them
        </h2>
        <div className="mt-5 flex gap-8">
          {FEELS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFeel(f)}
              disabled={refOn}
              className={`display text-2xl capitalize transition-colors disabled:opacity-25 ${
                feel === f
                  ? "text-fg underline underline-offset-8"
                  : "text-faint hover:text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-7 border-l-2 border-line pl-4">
          <button
            type="button"
            onClick={() => setRefOn((v) => !v)}
            className="mono text-sm text-muted transition-colors hover:text-fg"
          >
            {refOn ? "▾" : "▸"} own a pair that fits great? calibrate to it
          </button>
          {refOn && (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted">These fit me great:</span>
              <select
                value={refId}
                onChange={(e) => {
                  const next = e.target.value;
                  setRefId(next);
                  const g = CATALOG.find((x) => x.id === next);
                  if (g && !g.sizes.some((s) => s.label === refSize)) {
                    setRefSize(g.sizes[0].label);
                  }
                }}
                className="mono border border-line bg-panel px-2 py-1 text-fg"
              >
                {CATALOG.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.brand} {g.model}
                  </option>
                ))}
              </select>
              <select
                value={refSize}
                onChange={(e) => setRefSize(e.target.value)}
                className="mono border border-line bg-panel px-2 py-1 text-fg"
              >
                {refGarment.sizes.map((s) => (
                  <option key={s.label} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span className="text-faint">
                — now every pick is tuned to that exact fit.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 03 — results */}
      <div className="rise mt-16" style={{ animationDelay: "280ms" }}>
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          03 — your best-fitting pants{" "}
          <span className="text-faint/70">
            · {results.length} of {CATALOG.length} clear the bar
          </span>
        </h2>
        {results.length === 0 ? (
          <p className="mt-6 text-muted">
            Nothing clears the bar for that build yet. Loosen the fit feel or
            double-check your measurements.
          </p>
        ) : (
          <ol className="mt-4">
            {results.map((r, i) => (
              <ResultRow key={r.garment.id} rank={i + 1} result={r} />
            ))}
          </ol>
        )}

        {tightThighWarning && (
          <div className="rise mt-6 flex items-start gap-3 rounded-lg border border-bad/30 bg-bad/5 px-5 py-4">
            <span className="mt-px text-bad" aria-hidden>↑</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-bad">
                Even your top pick is tight through the thigh.
              </p>
              <p className="mt-1 text-sm text-muted">
                For a build like yours, mainstream cuts won't clear the bar. These brands are
                built specifically for athletic legs — we haven't measured their thigh numbers
                yet, but they're worth trying:
              </p>
              <p className="mono mt-2 text-sm text-fg">
                State &amp; Liberty · Oxcloth · Barbell Apparel
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
