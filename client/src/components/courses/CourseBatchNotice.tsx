import Link from "next/link";
import { ArrowRight } from "@/components/common/Icons";

export function CourseBatchNotice() {
  return (
    <div className="mt-16 grid gap-6 rounded-2xl border border-[#e4e8f0] bg-[#f5f7fb] p-8 md:grid-cols-3 md:items-center md:p-10">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-extrabold text-[#101828]">
          Batch schedules, formats & fee guidance
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#667085]">
          Fees and batch timings depend on the track, weekday vs weekend schedule, and online vs offline lab format. Our academic counselling team shares current pricing breakdowns and upcoming batch dates directly.
        </p>
      </div>
      <div className="md:justify-self-end">
        <Link href="/contact-us/" className="btn-primary">
          Ask For Current Batch Dates <ArrowRight width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}

export default CourseBatchNotice;

