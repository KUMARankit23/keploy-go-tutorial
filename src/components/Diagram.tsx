/**
 * Inline SVG showing how Keploy sits between the app and its dependencies.
 * Uses CSS variables so it adapts to light/dark mode.
 */
export function RecordReplayDiagram() {
  const box = "fill-[var(--card)] stroke-[var(--border)]";
  const hl = "fill-[var(--accent-soft)] stroke-[var(--accent)]";
  const text = "fill-[var(--foreground)] text-[13px] font-medium";
  const sub = "fill-[var(--muted-foreground)] text-[11px]";
  const arrow = "stroke-[var(--muted-foreground)] stroke-[1.5]";
  const accent = "stroke-[var(--accent)] stroke-[1.5]";

  return (
    <figure className="not-prose my-8">
      <svg
        viewBox="0 0 760 300"
        role="img"
        aria-labelledby="rr-title rr-desc"
        className="w-full overflow-visible font-sans"
      >
        <title id="rr-title">How Keploy records and replays</title>
        <desc id="rr-desc">
          In record mode, Keploy sits between your Go app and MongoDB, capturing the HTTP request and the database
          calls. In test mode, it replays the HTTP request and answers the database calls from the saved mocks, so
          MongoDB is not needed.
        </desc>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="fill-[var(--muted-foreground)]" />
          </marker>
          <marker id="arrowhead-accent" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 z" className="fill-[var(--accent)]" />
          </marker>
        </defs>

        <text x="0" y="28" className={`${sub} uppercase tracking-wider`}>
          record mode
        </text>
        <text x="0" y="196" className={`${sub} uppercase tracking-wider`}>
          test mode
        </text>

        {/* record row */}
        <rect x="0" y="45" width="150" height="70" rx="10" className={box} />
        <text x="75" y="75" textAnchor="middle" className={text}>
          curl / client
        </text>
        <text x="75" y="94" textAnchor="middle" className={sub}>
          POST /url
        </text>

        <rect x="230" y="45" width="150" height="70" rx="10" className={box} />
        <text x="305" y="75" textAnchor="middle" className={text}>
          Gin app
        </text>
        <text x="305" y="94" textAnchor="middle" className={sub}>
          :8080
        </text>

        <rect x="460" y="30" width="130" height="100" rx="10" className={hl} />
        <text x="525" y="68" textAnchor="middle" className={text}>
          Keploy
        </text>
        <text x="525" y="87" textAnchor="middle" className={sub}>
          eBPF proxy
        </text>
        <text x="525" y="108" textAnchor="middle" className={sub}>
          captures I/O
        </text>

        <rect x="610" y="45" width="150" height="70" rx="10" className={box} />
        <text x="685" y="75" textAnchor="middle" className={text}>
          MongoDB
        </text>
        <text x="685" y="94" textAnchor="middle" className={sub}>
          :27017
        </text>

        <line x1="150" y1="80" x2="228" y2="80" className={arrow} markerEnd="url(#arrowhead)" />
        <line x1="380" y1="80" x2="458" y2="80" className={accent} markerEnd="url(#arrowhead-accent)" />
        <line x1="590" y1="80" x2="608" y2="80" className={accent} markerEnd="url(#arrowhead-accent)" />

        <text x="525" y="152" textAnchor="middle" className={sub}>
          writes tests/*.yaml and mocks.yaml
        </text>

        {/* test row */}
        <rect x="0" y="215" width="150" height="70" rx="10" className={hl} />
        <text x="75" y="245" textAnchor="middle" className={text}>
          Keploy
        </text>
        <text x="75" y="264" textAnchor="middle" className={sub}>
          replays test-1.yaml
        </text>

        <rect x="230" y="215" width="150" height="70" rx="10" className={box} />
        <text x="305" y="245" textAnchor="middle" className={text}>
          Gin app
        </text>
        <text x="305" y="264" textAnchor="middle" className={sub}>
          unchanged binary
        </text>

        <rect x="460" y="215" width="130" height="70" rx="10" className={hl} />
        <text x="525" y="245" textAnchor="middle" className={text}>
          Keploy
        </text>
        <text x="525" y="264" textAnchor="middle" className={sub}>
          answers from mocks
        </text>

        <rect x="610" y="215" width="150" height="70" rx="10" strokeDasharray="6 4" className={box} />
        <text x="685" y="245" textAnchor="middle" className={sub}>
          MongoDB
        </text>
        <text x="685" y="264" textAnchor="middle" className={sub}>
          not required
        </text>

        <line x1="150" y1="250" x2="228" y2="250" className={accent} markerEnd="url(#arrowhead-accent)" />
        <line x1="380" y1="250" x2="458" y2="250" className={accent} markerEnd="url(#arrowhead-accent)" />
        <line x1="590" y1="250" x2="608" y2="250" strokeDasharray="4 4" className={arrow} />
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Record once with real dependencies, then replay without them.
      </figcaption>
    </figure>
  );
}
