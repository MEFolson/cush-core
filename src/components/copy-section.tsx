import type { ReactNode } from "react";
import type { CopyBlock, Faq } from "@/lib/copy-v2";

export function CopyFaq({ faq }: { faq: Faq }) {
  return (
    <div className="mt-8 border-y border-line">
      <details className="group">
        <summary className="flex min-h-14 cursor-pointer list-none items-baseline gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
          <span className="font-mono text-xs text-signal">Q</span>
          <span className="flex-1 font-display text-xl leading-snug">{faq.q}</span>
          <span className="font-mono text-sm text-ink transition-transform duration-150 group-open:rotate-45">
            +
          </span>
        </summary>
        <p className="max-w-[65ch] pb-5 pl-8 text-sm leading-relaxed text-muted">{faq.a}</p>
      </details>
    </div>
  );
}

/** Eyebrow and headline on the left, body on the right, matching the Lineage section. */
export function CopySection({
  block,
  note,
  extra,
  last = false,
}: {
  block: CopyBlock;
  note?: ReactNode;
  extra?: ReactNode;
  last?: boolean;
}) {
  return (
    <section id={block.id} className={`${last ? "" : "border-b border-line "}bg-paper`}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{block.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-normal">{block.headline}</h2>
        </div>
        <div className="lg:col-span-8">
          <CopyBody block={block} />
          {extra}
          {note}
          {block.faq ? <CopyFaq faq={block.faq} /> : null}
        </div>
      </div>
    </section>
  );
}

export function CopyBody({ block }: { block: CopyBlock }) {
  return (
    <>
      {block.body.length > 0 ? (
        <div className="max-w-[65ch] space-y-5 text-base leading-relaxed text-muted">
          {block.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ) : null}
      {block.items ? (
        <ol className={`${block.body.length > 0 ? "mt-8 " : ""}divide-y divide-line border-y border-line`}>
          {block.items.map((item, i) => (
            <li key={item.label} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
              <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-display text-xl leading-snug">{item.label}</p>
                <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </>
  );
}

/** A sub block inside an existing section (an addition beside existing copy). */
export function CopyAddition({ block, className = "" }: { block: CopyBlock; className?: string }) {
  return (
    <div id={block.id} className={`border-t border-line pt-8 ${className}`}>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-signal">{block.eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl font-normal">{block.headline}</h3>
      <div className="mt-4">
        <CopyBody block={block} />
      </div>
      {block.faq ? <CopyFaq faq={block.faq} /> : null}
    </div>
  );
}
