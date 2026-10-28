import { Fragment } from "react";

/**
 * Renders terminal output passed as a plain string, with lightweight
 * colouring for the tokens Keploy prints (INFO / WARN / ERROR, pass/fail).
 */
const TOKEN =
  /(INFO|WARN|ERROR|DEBUG|"passed": "true"|"passed": "false"|Testrun failed[^\n]*|Total test passed: \d+|Total test failed: \d+|<=+>|PASSED|FAILED)/g;

function colorFor(token: string): string {
  if (token.startsWith("INFO")) return "text-sky-400";
  if (token.startsWith("DEBUG")) return "text-zinc-500";
  if (token.startsWith("WARN")) return "text-amber-400";
  if (token.startsWith("ERROR") || token.startsWith("Testrun failed") || token === "FAILED") return "text-rose-400";
  if (token === '"passed": "true"' || token === "PASSED") return "text-emerald-400 font-semibold";
  if (token === '"passed": "false"') return "text-rose-400 font-semibold";
  if (token.startsWith("Total test passed")) return "text-emerald-400";
  if (token.startsWith("Total test failed")) return token.endsWith(" 0") ? "text-zinc-400" : "text-rose-400";
  if (token.startsWith("<=")) return "text-zinc-500";
  return "";
}

function colorize(text: string) {
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    const cls = i % 2 === 1 ? colorFor(part) : "";
    return cls ? (
      <span key={i} className={cls}>
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

export function Terminal({ title = "terminal", children }: { title?: string; children: string }) {
  const text = children.replace(/^\n+/, "").replace(/\n+$/, "");
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border bg-[#0f131a] text-[13px] text-zinc-200 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-rose-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-xs text-zinc-400">{title}</span>
      </div>
      <pre className="overflow-x-auto whitespace-pre px-4 py-3 font-mono leading-6">{colorize(text)}</pre>
    </div>
  );
}
