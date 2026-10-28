"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { toc } from "@/content/toc";
import { useDoneSteps } from "./progress";

const OFFSET = 112; // sticky header + breathing room, in px

export function TableOfContents() {
  const [active, setActive] = useState<string>(toc[0]?.id ?? "");
  const done = useDoneSteps();

  useEffect(() => {
    const nodes = toc
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);

    let frame = 0;
    const update = () => {
      frame = 0;
      // The active heading is the last one whose top has scrolled past the offset.
      let current = nodes[0]?.id ?? "";
      for (const n of nodes) {
        if (n.getBoundingClientRect().top - OFFSET <= 0) current = n.id;
        else break;
      }
      // At the very bottom of the page, highlight the last entry.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        current = nodes[nodes.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-14 text-sm"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
      <ul className="space-y-0.5 border-l border-border">
        {toc.map((h) => {
          const isDone = h.level === 3 && done.includes(h.id);
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={clsx(
                  "-ml-px flex items-center gap-1.5 border-l-2 py-1 leading-snug transition",
                  h.level === 3 ? "pl-6 text-[13px]" : "pl-3",
                  active === h.id
                    ? "border-accent font-semibold text-accent-text"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {isDone && <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-label="done" />}
                <span className={clsx(isDone && active !== h.id && "line-through decoration-border")}>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
