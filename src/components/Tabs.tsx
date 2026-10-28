"use client";

import { Children, isValidElement, useId, useState, type ReactNode } from "react";
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

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-border bg-muted px-2 pt-2">
        {tabs.map((t, i) => (
          <button
            key={t.props.label}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={clsx(
              "whitespace-nowrap rounded-t-lg px-3.5 py-2 text-sm font-medium transition",
              active === i
                ? "bg-card text-foreground shadow-[0_1px_0_0_var(--card)]"
                : "text-muted-foreground hover:text-foreground"
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
