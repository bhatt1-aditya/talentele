import { cn } from "@/lib/utilities";
import type { PostCategory } from "@/data/posts";

type Filter = PostCategory | "All";

type BlogCategoriesProps = {
  categories: Filter[];
  activeCategory: Filter;
  onSelect: (cat: Filter) => void;
};

export function BlogCategories({ categories, activeCategory, onSelect }: BlogCategoriesProps) {
  return (
    <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const active = activeCategory === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(c)}
            className={cn(
              "min-h-10 rounded-lg px-4 text-xs font-bold transition-all",
              active
                ? "bg-red-600 text-white shadow-xs"
                : "border border-[#e4e8f0] bg-white text-[#55555f] hover:border-red-500/40 hover:text-[#101828]"
            )}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

export default BlogCategories;

