import Image from "next/image";
import classroomImg from "@/assets/images/classroom-session.jpg";
import { GraduationCap, Layers } from "@/components/common/Icons";
import { Section, SectionHeading } from "@/components/common/Section";

export function AboutStory() {
  return (
    <Section id="who-we-are" labelledBy="who-we-are-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading
            id="who-we-are-title"
            eyebrow="WHO WE ARE"
            title="Bridging the gap between education and real-world tech."
            intro="Based in Nayapalli, Bhubaneswar, Talentele was established by seasoned industry professionals who saw a persistent disconnect between traditional university syllabi and the practical tools required by modern data and IT teams."
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#55555f]">
            <p>
              We train aspiring professionals in Data Analytics, Business Analytics, Data Science,
              Power BI, Python, SQL, Advanced Excel, SAP ERP, Software Testing, and Generative AI.
            </p>
            <p>
              Our philosophy is simple: no candidate should ever enter an interview unable to
              demonstrate the actual work. From day one, learners build end-to-end projects, write
              clean queries, configure business reports, and resolve real-time problems.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-[#e4e8f0] bg-[#f5f7fb] px-4 py-2.5 text-sm font-semibold text-[#101828]">
              <GraduationCap width={18} height={18} className="text-red-600" />
              <span>10+ Specialised Programs</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[#e4e8f0] bg-[#f5f7fb] px-4 py-2.5 text-sm font-semibold text-[#101828]">
              <Layers width={18} height={18} className="text-red-600" />
              <span>Live Project Work</span>
            </div>
          </div>
        </div>

        <figure className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#e4e8f0] bg-[#f5f7fb] shadow-lg">
            <Image
              src={classroomImg}
              alt="Instructor presenting in an interactive training lab"
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs text-[#667085]">
            Interactive classroom and lab training facility in Bhubaneswar.
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

export default AboutStory;

