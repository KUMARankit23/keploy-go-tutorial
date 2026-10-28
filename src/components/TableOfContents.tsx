"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { toc } from "@/content/toc";

export function TableOfContents() {
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");

  useEffect(() => {
    const nodes = toc
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-14 text-sm"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
      <ul className="space-y-0.5 border-l border-border">
        {toc.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={clsx(
                "-ml-px block border-l-2 py-1 leading-snug transition",
                h.level === 3 ? "pl-6 text-[13px]" : "pl-3",
                active === h.id
                  ? "border-accent font-medium text-accent"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
