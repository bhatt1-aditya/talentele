import { Close } from "@/components/common/Icons";

type BlogSearchProps = {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
};

export function BlogSearch({ value, onChange, onClear }: BlogSearchProps) {
  return (
    <div className="relative w-full md:w-72">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search guides..."
        aria-label="Search articles"
        className="w-full rounded-lg border border-[#e4e8f0] bg-white px-4 py-2.5 text-xs text-[#101828] placeholder-[#929daf] focus:border-red-500 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#929daf] hover:text-[#101828]"
        >
          <Close width={14} height={14} />
        </button>
      )}
    </div>
  );
}

export default BlogSearch;

