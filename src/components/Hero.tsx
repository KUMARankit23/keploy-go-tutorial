import { CalendarDays, Clock, Layers, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";

export function Hero({
  eyebrow,
  title,
  description,
  author,
  authorUrl,
  date,
  verified,
}: {
  eyebrow: string;
  title: string;
  description: string;
  author: string;
  authorUrl: string;
  date: string;
  verified: string;
}) {
  return (
    <div id="top" className="not-prose mb-12 animate-fade-up">
      <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {author
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </span>
          <a
            href={authorUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline decoration-border underline-offset-4 hover:decoration-accent"
          >
            {author}
          </a>
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-accent" />
          <time dateTime={date}>{date}</time>
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-accent" />
          {verified}
        </span>
      </div>

      <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
