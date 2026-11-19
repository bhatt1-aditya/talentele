import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";
import { faculty } from "@/data/faculty";

const mentorPhotos = [
  "/images/home/person-1.jpg",
  "/images/home/person-2.jpg",
  "/images/home/person-3.jpg",
  "/images/home/person-4.jpg",
  "/images/home/person-5.jpg",
];

export function TeamSection() {
  return (
    <Section tone="dark" labelledBy="faculty-title">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="faculty-title"
          tone="dark"
          eyebrow="FACULTY & MENTORS"
          title="Learn directly from industry leaders."
          intro="Our trainers bring between 4 to 18+ years of enterprise engineering and analytics consulting experience to the classroom in Nayapalli, Bhubaneswar."
        />
        <Link href="/contact-us/" className="btn-primary shrink-0">
          Connect With Faculty <ArrowRight width={16} height={16} />
        </Link>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {faculty.map((member, idx) => (
          <article
            key={member.name}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0b1730] transition-transform hover:-translate-y-1 hover:border-red-500/40"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#16223e]">
              <Image
                src={mentorPhotos[idx % mentorPhotos.length]}
                alt={`Portrait of ${member.name}`}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 rounded bg-red-600/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {member.experience}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-red-400">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-cyan-400">{member.specialty}</p>
                <p className="mt-1 text-xs text-[#aab4c5]">{member.role}</p>

                {member.companies && member.companies.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {member.companies.map((c) => (
                      <span
                        key={c}
                        className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-[#929daf]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 border-t border-white/10 pt-3 text-[11px] font-semibold text-white/70">
                <span>Nayapalli, Bhubaneswar</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default TeamSection;
