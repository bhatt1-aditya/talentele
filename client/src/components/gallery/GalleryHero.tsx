import { PageHero } from "@/components/common/PageHero";

export function GalleryHero() {
  return (
    <PageHero
      eyebrow="CAMPUS GALLERY"
      title="Moments from Talentele."
      intro="A place for genuine photographs of classroom sessions, events and student work from our learning community in Bhubaneswar."
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery/" },
      ]}
    />
  );
}

export default GalleryHero;

