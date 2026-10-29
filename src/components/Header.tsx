import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { ReadingProgress } from "./ReadingProgress";

const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/KUMARankit23/keploy-go-tutorial";

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-header/90 backdrop-blur supports-[backdrop-filter]:bg-header/80">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <Image src="/keploy-logo.png" alt="Keploy" width={112} height={20} priority className="h-5 w-auto" />
          <span className="hidden h-5 w-px bg-border sm:block" aria-hidden />
          <span className="hidden text-sm font-semibold text-navy sm:block">Go quickstart tutorial</span>
        </a>
        <nav className="flex items-center gap-3">
          <a
            href="https://keploy.io/docs/"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-medium text-muted-foreground underline decoration-transparent underline-offset-4 transition hover:text-accent-text hover:decoration-accent md:inline-block"
          >
            Keploy Docs
          </a>
          <ThemeToggle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md dark:bg-[#02011b] dark:hover:bg-[#1a1840]"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Source on GitHub</span>
            <span className="sm:hidden">Source</span>
          </a>
        </nav>
      </div>
      <ReadingProgress />
    </header>
  );
}
