import type { FitResult, Dimension } from "@/lib/types";
import { formatEase } from "@/lib/fit-engine";

function tone(score: number): string {
  if (score >= 80) return "text-good";
  if (score >= 68) return "text-warn";
  return "text-bad";
}

const ORDER: Dimension[] = ["waist", "thigh", "hip", "inseam"];

export function ResultRow({ rank, result }: { rank: number; result: FitResult }) {
  const { garment: g, bestSize, score, verdict, note, roughCut } = result;
  const dimByName = new Map(bestSize.dims.map((d) => [d.dim, d] as const));

  return (
    <li className="grid grid-cols-[2.5rem_1fr] items-start gap-x-5 border-t border-line py-7 last:border-b sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8">
      <span className="mono pt-1 text-lg text-faint">
        {String(rank).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="display text-2xl text-fg sm:text-3xl">{g.brand}</h3>
          <span className="text-lg text-muted">{g.model}</span>
        </div>
        <p className="mono mt-1 text-xs uppercase tracking-wider text-faint">
          {g.fitType}
          {g.stretchPct ? ` · ${g.stretchPct}% stretch` : " · rigid"}
        </p>
        <p className="mt-3 text-sm text-muted">{note}</p>

        {/* ease deltas: only shown when thigh is present (rough cut = not reliable) */}
        {!roughCut && (
          <div className="mono mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            {ORDER.map((dim) => {
              const d = dimByName.get(dim);
              if (!d) return null;
              const tight = d.ease < d.idealEase - 0.4;
              return (
                <span key={dim} className={tight ? "text-bad" : "text-muted"}>
                  <span className="text-faint">{dim}</span> {formatEase(d.ease)}
                </span>
              );
            })}
          </div>
        )}

        {roughCut && (
          <p className="mono mt-3 text-xs text-faint">
            thigh unknown — add your measurement for precise ease
          </p>
        )}
      </div>

      <div className="col-start-2 mt-4 flex items-baseline gap-4 sm:col-start-3 sm:mt-0 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
        {roughCut ? (
          <>
            <span className="mono text-3xl text-faint">~{score}</span>
            <span className="text-sm text-faint">Rough cut</span>
          </>
        ) : (
          <>
            <span className={`mono text-3xl ${tone(score)}`}>{score}</span>
            <span className={`text-sm ${tone(score)}`}>{verdict}</span>
          </>
        )}
        <span className="mono mt-1 text-sm text-muted">
          {bestSize.size.label}
          {g.price ? ` · $${g.price}` : ""}
        </span>
        {g.buyUrl && (
          <a
            href={g.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-faint underline-offset-4 hover:text-fg hover:underline"
          >
            shop →
          </a>
        )}
      </div>
    </li>
  );
}
