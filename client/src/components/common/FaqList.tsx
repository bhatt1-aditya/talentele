import { Plus } from "@/components/common/Icons";
import type { FaqItem } from "@/data/courses";

/** Accessible FAQ built on native <details>, so it works without JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-lg font-semibold [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-line text-brand transition-transform duration-200 group-open:rotate-45">
              <Plus width={16} height={16} />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
