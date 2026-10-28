import { List } from "lucide-react";
import { toc } from "@/content/toc";

/** Collapsible table of contents shown above the article on screens narrower than lg. */
export function MobileToc() {
  return (
    <details className="not-prose mb-8 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] lg:hidden">
      <summary className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-navy">
        <List className="h-4 w-4 text-accent" />
        On this page
      </summary>
      <ul className="border-t border-border px-4 py-3 text-sm">
        {toc.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : "mt-1"}>
            <a href={`#${h.id}`} className="block py-1 text-muted-foreground hover:text-foreground">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
