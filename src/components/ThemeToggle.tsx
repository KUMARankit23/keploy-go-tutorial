"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Pill switch styled after the Keploy DevRel header toggle:
 * orange track with a sun in light mode, navy track with a moon in dark mode.
 * Both states are in the markup and CSS picks one, so server and client render the same.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={resolvedTheme === "dark"}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full bg-accent transition hover:brightness-110 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:bg-[#333d59]"
    >
      <span className="absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-accent shadow transition-transform dark:translate-x-6 dark:bg-[#02011b] dark:text-white">
        <Sun className="h-3.5 w-3.5 dark:hidden" />
        <Moon className="hidden h-3.5 w-3.5 dark:block" />
      </span>
    </button>
  );
}
