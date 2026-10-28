# Record and replay API tests for a Go app with Keploy

A single-page, static documentation site built with **Next.js 16**, **MDX** and **Tailwind CSS v4**.
It walks a developer who has never used Keploy through recording and replaying API tests for the
`gin-mongo` sample from [keploy/samples-go](https://github.com/keploy/samples-go), based on actually
running the quickstart on a Windows 11 machine with Docker Desktop.

Built for the Keploy DevRel candidate assignment.

## What is in the page

- Step-by-step walkthrough: install, clone, create the Docker network, `keploy record`, generate
  traffic, inspect the generated YAML, `keploy test`, fix the noisy `ts` field, go green.
- The "why" behind each step and a diagram of how Keploy sits between the app and MongoDB.
- Honest notes on everything that went wrong along the way (stale Docker sockets, the external
  network, `--container-name`, `--delay`).
- A quick-reference table and pointers on where to go next.

## Tech

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, static export of a single route) |
| Content | `src/app/page.mdx` via `@next/mdx` |
| Styling | Tailwind CSS v4 with CSS-variable design tokens |
| Syntax highlighting | `rehype-pretty-code` + Shiki, dual light/dark themes |
| Dark mode | `next-themes` with a header toggle, respects system preference |
| Icons | `lucide-react` |

Custom MDX components live in `src/components` and are registered in `src/mdx-components.tsx`:
`Callout`, `Steps`/`Step`, `Tabs`/`Tab`, `Terminal`, `FileTree`, `Cards`/`Card`,
`RecordReplayDiagram`, `Hero`, plus a copy button on every code block.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build (fully static)
npm run start
```

## Deploy

The site is deployed on Vercel. Any push to `main` redeploys it.
