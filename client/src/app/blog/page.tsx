import { BlogHero } from "@/components/blog/BlogHero";
import { BlogListing } from "@/components/blog/BlogListing";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { CtaBand } from "@/components/common/CtaBand";
import { Section } from "@/components/common/Section";
import { getSortedPosts } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Career Blog — Data & Tech Learning Resources | Talentele",
  description:
    "Expert career advice, technical guides, ATS resume tips, and interview preparation strategies from Talentele's faculty in Bhubaneswar.",
  path: "/blog/",
});

export default function BlogPage() {
  const [latest, ...rest] = getSortedPosts();

  return (
    <main>
      {/* 1. Blog Hero */}
      <BlogHero />

      {/* 2. Featured Article & Blog Listing */}
      <Section className="!pt-12 md:!pt-16">
        {latest ? (
          <>
            <FeaturedArticle post={latest} />

            {rest.length > 0 && (
              <div className="mt-16 border-t border-[#e4e8f0] pt-12 md:pt-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#101828] md:text-3xl">
                    All Guides & Articles
                  </h2>
                  <p className="mt-1 text-sm text-[#667085]">
                    Browse by topic or search for specific technologies and frameworks.
                  </p>
                </div>
                <BlogListing posts={rest} />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#e4e8f0] p-12 text-center">
            <h2 className="text-xl font-bold text-[#101828]">No articles published yet</h2>
            <p className="mt-2 text-sm text-[#667085]">
              New practical guides are on the way. In the meantime, explore our training programs.
            </p>
          </div>
        )}
      </Section>

      {/* 3. Final Call to Action */}
      <CtaBand />
    </main>
  );
}
