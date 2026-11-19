import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@/components/common/Icons";
import { Section } from "@/components/common/Section";
import { galleryItems } from "@/data/gallery";
import { site } from "@/data/site";

export function GalleryGrid() {
  const instagram = site.social.find((s) => s.label === "Instagram");
  const youtube = site.social.find((s) => s.label === "YouTube");

  return (
    <Section className="!pt-12 md:!pt-16" labelledBy="gallery-title">
      <h2 id="gallery-title" className="sr-only">
        Campus Photography Gallery
      </h2>

      {galleryItems.length > 0 ? (
        <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item) => (
            <li key={item.id} className="mb-5 break-inside-avoid">
              <figure className="overflow-hidden rounded-xl border border-[#e4e8f0] bg-white p-2 shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 flex flex-wrap justify-between gap-2 px-1 text-xs">
                  <span className="font-semibold text-[#101828]">{item.caption}</span>
                  <span className="text-[#667085]">
                    {item.category}
                    {item.date ? ` · ${item.date}` : ""}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-10 rounded-2xl border border-[#e4e8f0] bg-white p-8 md:grid-cols-12 md:p-12 shadow-sm">
          <div className="md:col-span-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-600">
              Curated Community
            </p>
            <h3 className="mt-3 text-2xl font-extrabold text-[#101828] md:text-3xl">
              Only authentic photos belong here.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-[#667085]">
              We&apos;re gathering genuine photographs of Talentele classrooms, hackathons, batch graduations, and project presentations — shared with the explicit consent of every student. Until published, our active social channels are the best place to see student life in Bhubaneswar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {instagram && (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  See Us On Instagram <ArrowUpRight width={16} height={16} />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#e4e8f0] bg-[#f5f7fb] px-5 text-sm font-semibold text-[#101828] transition-colors hover:border-red-500/40 hover:bg-white"
                >
                  Watch On YouTube <ArrowUpRight width={16} height={16} />
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#0c1833] p-8 text-white shadow-xl">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cyan-400">
                  Campus Visit
                </p>
                <p className="mt-3 text-lg font-bold leading-relaxed text-white">
                  Prefer to experience the learning atmosphere and inspect our data lab for yourself?
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#aab4c5]">
                  Our doors in Nayapalli, Bhubaneswar are open Monday to Saturday from 9:00 AM to 7:00 PM.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/contact-us/" className="btn-primary w-full">
                  Book A Campus Tour <ArrowRight width={16} height={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

export default GalleryGrid;

