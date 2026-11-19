import { PageHero } from "@/components/common/PageHero";

export function BlogHero() {
  return (
    <PageHero
      eyebrow="CAREER BLOG & GUIDES"
      title="Practical guides for data and technology careers."
      intro="Step-by-step advice from industry mentors on choosing your career trajectory, sequencing what tools to learn, crafting ATS-proof resumes, and clearing technical rounds."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Career Blog", path: "/blog/" },
      ]}
    />
  );
}

export default BlogHero;

