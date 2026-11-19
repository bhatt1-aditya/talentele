"use client";

import { useMemo, useState } from "react";

import { PostCard } from "@/components/blog/PostCard";
import { Close } from "@/components/common/Icons";
import { postCategories, type Post, type PostCategory } from "@/data/posts";
import { cn } from "@/lib/utilities";

type Filter = PostCategory | "All";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters: Filter[] = [
    "All",
    ...postCategories.filter((c) => posts.some((p) => p.category === c)),
  ];

  const visible = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = filter === "All" || post.category === filter;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, filter, searchQuery]);

  return (
    <div>
      {/* Search and Category Filter Controls */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "min-h-10 rounded-lg px-4 text-xs font-bold transition-all",
                  active
                    ? "bg-red-600 text-white shadow-xs"
                    : "border border-[#e4e8f0] bg-white text-[#55555f] hover:border-red-500/40 hover:text-[#101828]"
                )}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides..."
            aria-label="Search articles"
            className="w-full rounded-lg border border-[#e4e8f0] bg-white px-4 py-2.5 text-xs text-[#101828] placeholder-[#929daf] focus:border-red-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#929daf] hover:text-[#101828]"
            >
              <Close width={14} height={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="mt-8 flex items-center justify-between text-xs text-[#667085]">
        <span>
          Showing <strong>{visible.length}</strong> {visible.length === 1 ? "article" : "articles"}
        </span>
        {(filter !== "All" || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearchQuery("");
            }}
            className="font-bold text-red-600 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Grid of Posts */}
      {visible.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug} className="flex">
              <PostCard post={post} headingLevel="h3" className="w-full" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-[#e4e8f0] bg-white p-12 text-center">
          <p className="text-base font-bold text-[#101828]">No articles found matching your criteria.</p>
          <p className="mt-1 text-xs text-[#667085]">Try adjusting your search terms or selecting another category.</p>
          <button
            type="button"
            onClick={() => {
              setFilter("All");
              setSearchQuery("");
            }}
            className="btn-primary mt-6 !min-h-10 !px-5 !text-xs"
          >
            Show All Articles
          </button>
        </div>
      )}
    </div>
  );
}
