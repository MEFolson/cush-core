export function PageIntro({
  folio,
  kicker,
  title,
  lead,
}: {
  folio: string;
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="border-b border-line bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
        <div className="border-b border-line px-5 py-8 sm:px-8 lg:col-span-3 lg:border-b-0 lg:border-r lg:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{folio}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">{kicker}</p>
          <div className="mt-6 h-px w-10 bg-signal" aria-hidden="true" />
        </div>
        <div className="px-5 py-12 sm:px-8 lg:col-span-9 lg:py-16 lg:pl-12">
          <h1 className="max-w-[18ch] font-display text-4xl font-normal leading-[1.08] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        </div>
      </div>
    </header>
  );
}
