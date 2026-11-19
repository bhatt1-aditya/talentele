import { RichText } from "@/components/blog/RichText";
import { Info } from "@/components/common/Icons";
import type { PostBlock } from "@/data/posts";

export function ArticleBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="prose-talentele">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} id={block.id}>
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} id={block.id}>
                {block.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={index}>
                {block.items.map((item) => (
                  <li key={item}>
                    <RichText text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <aside key={index} className="flex gap-4 rounded-[var(--radius-md)] border-l-4 border-brand bg-mist p-5 not-italic">
                <Info className="mt-1 shrink-0 text-brand" />
                <div>
                  <p className="font-semibold text-ink">{block.title}</p>
                  <p className="mt-1 text-[0.98rem]">
                    <RichText text={block.text} />
                  </p>
                </div>
              </aside>
            );
          default:
            return (
              <p key={index}>
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}

export function TableOfContents({ blocks }: { blocks: PostBlock[] }) {
  const headings = blocks.filter((b): b is Extract<PostBlock, { type: "h2" }> => b.type === "h2");
  if (headings.length < 3) return null;
  return (
    <nav aria-labelledby="toc-title" className="rounded-[var(--radius-lg)] border border-line p-6">
      <h2 id="toc-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        In this article
      </h2>
      <ol className="mt-4 space-y-1 text-[0.95rem]">
        {headings.map((h, i) => (
          <li key={h.id}>
            <a href={`#${h.id}`} className="flex min-h-9 items-baseline gap-3 py-1 text-ink/80 hover:text-brand-600">
              <span className="font-display text-xs font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
