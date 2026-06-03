import Link from "next/link";

type NavKey = "fit" | "tops" | "outfits";

export function Nav({ current }: { current: NavKey }) {
  const cls = (key: NavKey) =>
    `mono text-xs uppercase tracking-[0.2em] transition-colors ${
      current === key
        ? "text-fg underline underline-offset-8"
        : "text-faint hover:text-muted"
    }`;
  return (
    <nav className="mb-12 flex items-center gap-5">
      <Link href="/" className="display text-lg text-fg">
        Ease
      </Link>
      <span className="text-faint">/</span>
      <Link href="/" className={cls("fit")}>
        Pants
      </Link>
      <Link href="/tops" className={cls("tops")}>
        Tops
      </Link>
      <Link href="/outfits" className={cls("outfits")}>
        Outfits
      </Link>
    </nav>
  );
}
