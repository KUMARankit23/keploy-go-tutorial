"use client";

import {
  Children,
  isValidElement,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";

type TabProps = { label: string; children: ReactNode };

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

/** Reads the visitor's platform after hydration (server renders "unknown", so markup never mismatches). */
function subscribeNoop() {
  return () => {};
}
function usePlatform(): "windows" | "mac" | "linux" | "unknown" {
  return useSyncExternalStore(
    subscribeNoop,
    () => {
      const ua = navigator.userAgent;
      if (/Windows/i.test(ua)) return "windows";
      if (/Mac|iPhone|iPad/i.test(ua)) return "mac";
      if (/Linux|Android|X11/i.test(ua)) return "linux";
      return "unknown";
    },
    () => "unknown"
  );
}

/** Picks the tab whose label matches the visitor's OS, if the tab set is an OS chooser. */
function platformTab(labels: string[], platform: string): number | null {
  const lower = labels.map((l) => l.toLowerCase());
  const find = (word: string) => lower.findIndex((s) => s.includes(word));
  let match = -1;
  // Windows readers are steered to WSL2 when a WSL tab exists, which is what the tutorial recommends.
  if (platform === "windows") match = find("wsl") !== -1 ? find("wsl") : find("windows");
  else if (platform === "mac") match = find("mac");
  else if (platform === "linux") match = find("linux");
  return match === -1 ? null : match;
}

export function Tabs({ children, defaultIndex = 0 }: { children: ReactNode; defaultIndex?: number }) {
  const tabs = Children.toArray(children).filter(
    (c): c is React.ReactElement<TabProps> => isValidElement(c) && typeof (c.props as TabProps).label === "string"
  );
  const labels = tabs.map((t) => t.props.label);
  const platform = usePlatform();
  // The reader's own choice wins; otherwise fall back to the OS match, then the default.
  const [chosen, setChosen] = useState<number | null>(null);
  const active = chosen ?? platformTab(labels, platform) ?? defaultIndex;
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
    setChosen(next);
    buttons.current[next]?.focus();
  };

  const autoPicked = chosen === null && platformTab(labels, platform) !== null;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div role="tablist" className="flex items-center gap-1 overflow-x-auto border-b border-border bg-muted px-2 pt-2 [scrollbar-width:thin]">
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
            onClick={() => setChosen(i)}
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
        {autoPicked && (
          <span className="ml-auto hidden pb-2 pr-2 text-[11px] text-muted-foreground sm:inline">
            picked for your OS
          </span>
        )}
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
