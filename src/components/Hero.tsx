import { Clock, Layers, Terminal as TerminalIcon } from "lucide-react";

export function Hero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div id="top" className="not-prose mb-12 animate-fade-up">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent" />
          <dt className="sr-only">Time</dt>
          <dd>About 20 minutes</dd>
        </div>
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-accent" />
          <dt className="sr-only">Stack</dt>
          <dd>Go, Gin, MongoDB, Docker</dd>
        </div>
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-accent" />
          <dt className="sr-only">Level</dt>
          <dd>Beginner, no Keploy experience needed</dd>
        </div>
      </dl>
    </div>
  );
}
