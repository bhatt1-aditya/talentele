import { Suspense } from "react";
import { EnquiryFormFromParams } from "@/components/contact/EnquiryForm";

export function ContactForm() {
  return (
    <div className="lg:col-span-7">
      <div className="rounded-2xl border border-[#e4e8f0] bg-white p-6 shadow-sm sm:p-10">
        <div className="mb-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-600">
            Admissions & Course Enquiry
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-[#101828] md:text-3xl">
            Send an online enquiry
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#667085]">
            Fields marked with an asterisk (<span className="text-red-600 font-bold">*</span>) are required.
            You will receive a callback from our senior counsellor within 24 hours.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center text-sm text-[#667085]">
              Loading course enquiry form…
            </div>
          }
        >
          <EnquiryFormFromParams />
        </Suspense>
      </div>
    </div>
  );
}

export default ContactForm;

