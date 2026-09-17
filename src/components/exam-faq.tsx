import { examinationFaqs } from "@/lib/site";

export function ExamFaq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {examinationFaqs.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-lg tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="font-mono text-signal transition-transform duration-150 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
