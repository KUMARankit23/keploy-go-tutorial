"use client";

import { Children, isValidElement, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import clsx from "clsx";

type TabProps = { label: string; children: ReactNode };

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export function Tabs({ children, defaultIndex = 0 }: { children: ReactNode; defaultIndex?: number }) {
  const tabs = Children.toArray(children).filter(
    (c): c is React.ReactElement<TabProps> => isValidElement(c) && typeof (c.props as TabProps).label === "string"
  );
  const [active, setActive] = useState(defaultIndex);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys, Home and End move between tabs, as the WAI-ARIA tabs pattern expects.
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = tabs.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    else if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border bg-muted px-2 pt-2 [scrollbar-width:thin]">
        {tabs.map((t, i) => (
          <button
            key={t.props.label}
            ref={(el) => {
              buttons.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={clsx(
              "whitespace-nowrap rounded-t-lg border-b-2 px-3.5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active === i
                ? "border-accent bg-card text-accent-text shadow-[0_1px_0_0_var(--card)]"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.props.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.props.label}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="p-4 [&>p]:my-3 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&_figure]:my-3 [&_figure:first-child]:mt-0 [&_figure:last-child]:mb-0 [&>ul]:my-3 [&>ul]:list-disc [&>ul]:pl-6"
        >
          {t.props.children}
        </div>
      ))}
    </div>
  );
}
