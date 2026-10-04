import { examinationFaqs } from "@/lib/site";

export function ExamFaq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {examinationFaqs.map((item, i) => (
        <details key={item.q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-baseline gap-4 py-4 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-display text-xl leading-snug">{item.q}</span>
            <span className="font-mono text-sm text-ink transition-transform duration-150 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-[65ch] pb-5 pl-8 text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
