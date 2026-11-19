import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "@/components/common/Icons";
import { addressLines, site } from "@/data/site";

const nextSteps = [
  {
    step: "01",
    title: "Enquiry Review",
    desc: "Our academic counselling team reviews your technical background and career goals.",
  },
  {
    step: "02",
    title: "1-on-1 Mentor Call",
    desc: "A senior mentor discusses suitable batch timings, curriculum depth, and prerequisites.",
  },
  {
    step: "03",
    title: "Demo & Enrollment",
    desc: "Attend a live demo session or visit our Nayapalli lab before finalizing your seat.",
  },
];

export function ContactInfo() {
  return (
    <aside className="space-y-6 lg:col-span-5" aria-labelledby="direct-contact-title">
      {/* Primary Dark Contact Box */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c1833] p-8 text-white shadow-xl">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-400">
          Direct Contact
        </p>

        <h2 id="direct-contact-title" className="mt-3 text-2xl font-extrabold text-white">
          Talk to our admissions team
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-[#aab4c5]">
          Reach out during business hours for instant guidance on batch availability and syllabus questions.
        </p>

        <ul className="mt-8 space-y-6">
          {/* Phone */}
          <li>
            <a href={site.phone.href} className="group flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white transition-transform group-hover:scale-105">
                <Phone width={20} height={20} />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#8c97a8]">
                  Phone (Direct & WhatsApp)
                </span>
                <span className="mt-0.5 block text-base font-bold text-white group-hover:text-red-400">
                  {site.phone.display}
                </span>
                <span className="mt-0.5 block text-xs text-[#aab4c5]">Mon – Sat, 9 AM – 7 PM</span>
              </div>
            </a>
          </li>

          {/* Email */}
          <li>
            <a href={`mailto:${site.email}`} className="group flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform group-hover:scale-105">
                <Mail width={20} height={20} />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#8c97a8]">
                  Email Enquiries
                </span>
                <span className="mt-0.5 block text-base font-bold text-white group-hover:text-red-400">
                  {site.email}
                </span>
                <span className="mt-0.5 block text-xs text-[#aab4c5]">Responses within 24 hours</span>
              </div>
            </a>
          </li>

          {/* Address */}
          <li>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-transform group-hover:scale-105">
                <MapPin width={20} height={20} />
              </span>
              <div>
                <span className="block text-xs font-semibold uppercase tracking-wider text-[#8c97a8]">
                  Bhubaneswar Campus
                </span>
                <address className="mt-1 not-italic text-xs leading-relaxed text-[#c5cddd]">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-red-400 group-hover:underline">
                  <span>Get directions in Google Maps</span>
                  <ArrowUpRight width={12} height={12} />
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>

      {/* Operating Hours Box */}
      <div className="rounded-2xl border border-[#e4e8f0] bg-[#f5f7fb] p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
            <Clock width={18} height={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101828]">Office & Lab Timings</h3>
            <p className="text-xs text-[#667085]">Monday – Saturday: 9:00 AM – 7:00 PM</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#667085]">
          Sunday visits and demo classes are available by prior appointment.
        </p>
      </div>

      {/* What Happens Next? Process */}
      <div className="rounded-2xl border border-[#e4e8f0] bg-white p-7 shadow-2xs">
        <div className="flex items-center gap-2">
          <ShieldCheck width={18} height={18} className="text-red-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
            What happens next?
          </h3>
        </div>
        <ol className="mt-5 space-y-4">
          {nextSteps.map((item) => (
            <li key={item.step} className="flex gap-3">
              <span className="font-display text-xs font-extrabold text-red-600">
                {item.step}
              </span>
              <div>
                <p className="text-xs font-bold text-[#101828]">{item.title}</p>
                <p className="mt-0.5 text-xs text-[#667085]">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export default ContactInfo;

