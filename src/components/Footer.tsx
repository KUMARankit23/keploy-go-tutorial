import { BookOpen, MessagesSquare } from "lucide-react";
import { GitHubIcon } from "./Header";

const REPO_URL = process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/KUMARankit23/keploy-go-tutorial";

const links = [
  { href: REPO_URL, label: "Source on GitHub", Icon: GitHubIcon },
  { href: "https://keploy.io/docs/", label: "Keploy documentation", Icon: BookOpen },
  { href: "https://keploy.io/slack", label: "Keploy community Slack", Icon: MessagesSquare },
];

export function Footer() {
  return (
    <footer className="mt-16 bg-footer text-footer-fg">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-accent">Keploy Go quickstart tutorial</p>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7">
          Record real traffic from a Gin + MongoDB service once, replay it as tests forever. Written by Ankit Kumar for
          the Keploy DevRel candidate assignment.
        </p>

        <p className="mt-10 text-xs font-bold uppercase tracking-[0.12em] text-accent">Find it on</p>
        <ul className="mt-4 flex justify-center gap-3">
          {links.map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-social text-white transition hover:bg-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs text-footer-fg/70">
          Not affiliated with Keploy. Sample app from{" "}
          <a
            className="underline decoration-footer-fg/40 underline-offset-4 hover:text-white"
            href="https://github.com/keploy/samples-go/tree/main/gin-mongo"
            target="_blank"
            rel="noreferrer"
          >
            keploy/samples-go
          </a>
          . Built with Next.js, MDX and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
