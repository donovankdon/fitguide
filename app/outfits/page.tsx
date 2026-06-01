import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { OutfitView } from "@/components/OutfitView";
import { STYLE_PROFILE, SIGNATURE_OUTFITS } from "@/data/style-profile";
import { PALETTE } from "@/data/wardrobe";
import { COLOR_HEX, readableLabel } from "@/lib/wardrobe";

export const metadata: Metadata = {
  title: "Ease — your outfits",
  description:
    "Coordinated outfits built from current pieces that fit your build and stay in your palette.",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="w-16 shrink-0 text-faint">{label}</dt>
      <dd className="text-fg">{value}</dd>
    </div>
  );
}

export default function Outfits() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-10 md:px-10 md:pt-14">
      <Nav current="outfits" />

      <header className="rise max-w-3xl">
        <p className="mono text-xs uppercase tracking-[0.25em] text-faint">
          your style
        </p>
        <h1 className="display mt-5 text-[clamp(2.5rem,8vw,5.5rem)]">
          Outfits that
          <br />
          actually <span className="italic">work</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {STYLE_PROFILE.vibe}
        </p>

        <div className="mt-7 flex items-center gap-2">
          {PALETTE.map((c) => (
            <span
              key={c}
              title={readableLabel(c)}
              className="inline-block h-6 w-6 rounded-sm border border-line"
              style={{ background: COLOR_HEX[c] }}
            />
          ))}
        </div>

        <dl className="mono mt-8 grid gap-3 text-sm leading-relaxed">
          <Row label="formula" value={STYLE_PROFILE.formula} />
          <Row label="silhouette" value={STYLE_PROFILE.silhouette} />
          <Row label="trend" value={STYLE_PROFILE.trends2026} />
        </dl>
      </header>

      {/* Signature looks — stylist-curated against real, current pieces */}
      <section className="mt-20">
        <h2 className="mono text-xs uppercase tracking-[0.25em] text-faint">
          signature looks · shop the exact pieces
        </h2>
        <ol className="mt-4">
          {SIGNATURE_OUTFITS.map((o, i) => (
            <li
              key={o.name}
              className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-t border-line py-7 last:border-b"
            >
              <span className="mono pt-1 text-lg text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="display text-2xl text-fg">{o.name}</h3>
                <dl className="mono mt-3 grid gap-1.5 text-sm">
                  <Row label="top" value={o.top} />
                  <Row label="bottom" value={o.bottom} />
                  <Row label="shoe" value={o.shoe} />
                  {o.layerOrCap ? <Row label="layer" value={o.layerOrCap} /> : null}
                </dl>
                <p className="mt-3 text-sm leading-relaxed text-muted">{o.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Auto-generated capsule from the full catalog */}
      <section className="mt-20">
        <OutfitView />
      </section>

      <footer className="mono mt-28 flex flex-wrap gap-x-3 border-t border-line pt-6 text-xs text-faint">
        <span>Ease</span>
        <span>·</span>
        <span>your capsule</span>
        <span>·</span>
        <span>6&apos;1″ · 225 · 38×32</span>
      </footer>
    </main>
  );
}
