/**
 * "In numbers" strip, modelled on the stat cards of the Keploy DevRel page:
 * big orange figure, small uppercase label, white card with an orange base line.
 */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="not-prose my-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="brand-card px-4 py-6 text-center">
          <dd className="text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">{s.value}</dd>
          <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
