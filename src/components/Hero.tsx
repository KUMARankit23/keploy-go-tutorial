import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, Layers, ShieldCheck, Terminal as TerminalIcon } from "lucide-react";
import { GitHubIcon } from "./Header";

const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/KUMARankit23/keploy-go-tutorial";

export function Hero({
  eyebrow,
  title,
  highlight,
  description,
  author,
  authorUrl,
  date,
  verified,
}: {
  eyebrow: string;
  title: string;
  /** Trailing part of the title rendered in brand orange, e.g. "with Keploy". */
  highlight?: string;
  description: string;
  author: string;
  authorUrl: string;
  date: string;
  verified: string;
}) {
  const initials = author
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div id="top" className="not-prose relative mb-14 animate-fade-up">
      <div className="hero-glow" aria-hidden />
      <Image
        src="/bunny.png"
        alt=""
        width={576}
        height={576}
        priority
        className="pointer-events-none absolute -right-6 -top-4 hidden w-60 select-none opacity-90 xl:block"
      />
      <div className="relative max-w-2xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-5xl">
          {title} {highlight && <span className="text-accent">{highlight}</span>}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#step-by-step" className="btn-primary">
            Start the tutorial
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn-outline">
            <GitHubIcon className="h-4 w-4" />
            View the source
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {initials}
            </span>
            <a
              href={authorUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-navy underline decoration-border underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent"
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

        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
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
    </div>
  );
}
