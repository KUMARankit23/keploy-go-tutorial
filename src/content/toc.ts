/**
 * Table of contents for the tutorial page.
 * h2 ids come from rehype-slug; step ids come from <Step title="...">.
 */
export type TocEntry = { id: string; text: string; level: 2 | 3 };

export const toc: TocEntry[] = [
  { id: "what-you-will-build", text: "What you will build", level: 2 },
  { id: "why-would-a-go-developer-want-this", text: "Why would a Go developer want this?", level: 2 },
  { id: "how-it-works", text: "How it works", level: 2 },
  { id: "prerequisites", text: "Prerequisites", level: 2 },
  { id: "step-by-step", text: "Step by step", level: 2 },
  { id: "install-keploy", text: "Install Keploy", level: 3 },
  { id: "grab-the-sample-app-and-understand-it", text: "Grab the sample app and understand it", level: 3 },
  { id: "create-the-docker-network", text: "Create the Docker network", level: 3 },
  { id: "record-test-cases", text: "Record test cases", level: 3 },
  { id: "generate-some-traffic", text: "Generate some traffic", level: 3 },
  { id: "inspect-what-keploy-generated", text: "Inspect what Keploy generated", level: 3 },
  { id: "replay-the-tests", text: "Replay the tests", level: 3 },
  { id: "break-it-on-purpose-then-fix-it", text: "Break it on purpose, then fix it", level: 3 },
  { id: "things-that-tripped-me-up", text: "Things that tripped me up", level: 2 },
  { id: "quick-reference", text: "Quick reference", level: 2 },
  { id: "feedback-for-the-keploy-docs", text: "Feedback for the Keploy docs", level: 2 },
  { id: "where-to-go-next", text: "Where to go next", level: 2 },
];

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}
