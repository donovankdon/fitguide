import { FitFinder } from "@/components/FitFinder";
import { Nav } from "@/components/Nav";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 pb-32 pt-10 md:px-10 md:pt-14">
      <Nav current="fit" />
      <header className="rise max-w-3xl">
        <p className="mono text-xs uppercase tracking-[0.25em] text-faint">
          Ease — fit is math
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,11vw,8rem)]">
          Pants that
          <br />
          actually <span className="italic">fit</span>.
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
          Measure once. We compare your build to real garment specs across brands
          and rank the pairs that fit — with an honest verdict, not a size label.
          Built for the waist-fits-but-thighs-don&apos;t crowd.
        </p>
      </header>

      <FitFinder />

      <footer className="mono mt-28 flex flex-wrap gap-x-3 border-t border-line pt-6 text-xs text-faint">
        <span>Ease</span>
        <span>·</span>
        <span>brand-agnostic fit</span>
        <span>·</span>
        <span>built by Don</span>
        <span>·</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
