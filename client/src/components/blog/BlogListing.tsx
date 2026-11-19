"use client";

import { useMemo, useState } from "react";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { PostCard } from "@/components/blog/PostCard";
import { postCategories, type Post, type PostCategory } from "@/data/posts";

type Filter = PostCategory | "All";

export function BlogListing({ posts }: { posts: Post[] }) {
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
        <BlogCategories
          categories={filters}
          activeCategory={filter}
          onSelect={(c) => setFilter(c)}
        />
        <BlogSearch
          value={searchQuery}
          onChange={(val) => setSearchQuery(val)}
          onClear={() => setSearchQuery("")}
        />
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

export default BlogListing;

