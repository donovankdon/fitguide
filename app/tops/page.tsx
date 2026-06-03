import type { Metadata } from "next";
import { TopFinder } from "@/components/TopFinder";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Ease — tops that actually fit",
  description:
    "Measure once. We compare your build to real shirt specs and rank the tops that fit your shoulders and chest — boxy, regular, or fitted — with an honest verdict, not a size label.",
};

export default function Tops() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-10 md:px-10 md:pt-14">
      <Nav current="tops" />
      <header className="rise max-w-3xl">
        <p className="mono text-xs uppercase tracking-[0.25em] text-faint">
          Ease — fit is math
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,11vw,8rem)]">
          Tops that
          <br />
          actually <span className="italic">fit</span>.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          The shirt problem is the shoulder problem. We compare your chest and
          shoulders to real garment specs and rank what drapes right — for the
          build where slim shirts pull across the chest and balloon at the waist.
        </p>
      </header>

      <TopFinder />

      <footer className="mono mt-28 flex flex-wrap gap-x-3 border-t border-line pt-6 text-xs text-faint">
        <span>Ease</span>
        <span>·</span>
        <span>brand-agnostic fit</span>
        <span>·</span>
        <span>6&apos;1″ · 225 · 41 chest</span>
      </footer>
    </main>
  );
}
