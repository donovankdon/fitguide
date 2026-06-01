import type { Outfit } from "@/lib/wardrobe";
import { COLOR_HEX, readableLabel } from "@/lib/wardrobe";

export function OutfitCard({ rank, outfit }: { rank: number; outfit: Outfit }) {
  return (
    <li className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-t border-line py-7 last:border-b">
      <span className="mono pt-1 text-lg text-faint">
        {String(rank).padStart(2, "0")}
      </span>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-2xl text-fg">{outfit.name}</h3>
          <span className="mono text-sm text-muted">${outfit.price}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{outfit.why}</p>
        <ul className="mt-4 flex flex-col gap-2">
          {outfit.pieces.map(({ item, color }) => (
            <li key={item.id} className="flex items-center gap-3 text-sm">
              <span
                className="inline-block h-3.5 w-3.5 shrink-0 rounded-sm border border-line"
                style={{ background: COLOR_HEX[color] }}
                aria-hidden
              />
              <span className="mono w-14 shrink-0 text-faint">
                {readableLabel(color)}
              </span>
              <span className="text-fg">{item.brand}</span>
              <span className="truncate text-muted">{item.model}</span>
              {item.buyUrl && (
                <a
                  href={item.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono ml-auto shrink-0 text-xs text-faint underline-offset-4 hover:text-fg hover:underline"
                >
                  shop →
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
