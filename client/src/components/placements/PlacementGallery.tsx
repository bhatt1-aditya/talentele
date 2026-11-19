"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Close,
  GraduationCap,
} from "@/components/common/Icons";
import { verifiedPlacements, type PlacementRecord } from "@/data/placements";

const CARDS_PER_PAGE = 6;

export function PlacementGallery() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<PlacementRecord | null>(null);

  const totalPages = Math.ceil(verifiedPlacements.length / CARDS_PER_PAGE);
  const startIndex = currentPage * CARDS_PER_PAGE;
  const currentPlacements = verifiedPlacements.slice(startIndex, startIndex + CARDS_PER_PAGE);

  // Keyboard navigation & modal escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedStudent(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mt-8">
      {/* 3 Columns x 2 Rows Grid on Desktop */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentPlacements.map((record) => (
          <article
            key={record.id}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#e4e8f0] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg"
          >
            <div>
              {/* Professional Rectangular Portrait Image */}
              <div className="relative aspect-[4/3.8] w-full overflow-hidden bg-[#0c1833]">
                <Image
                  src={record.photo}
                  alt={`Placement portrait of ${record.studentName}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-2.5 left-2.5 rounded bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                  {record.placementYear} Cohort
                </span>
                {record.salaryHike && (
                  <span className="absolute bottom-2.5 right-2.5 rounded bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {record.salaryHike}
                  </span>
                )}
              </div>

              {/* Student Placement Info */}
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-red-600">
                    {record.course}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <CheckCircle width={13} height={13} /> Verified
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-[#101828] group-hover:text-red-600 transition-colors">
                  {record.studentName}
                </h3>

                <div className="mt-2 space-y-1.5 text-xs text-[#55555f]">
                  <p className="flex items-center gap-2 font-medium text-[#101828]">
                    <BriefcaseBusiness width={14} height={14} className="text-red-600 shrink-0" />
                    <span>{record.designation}</span>
                  </p>
                  <p className="flex items-center gap-2 text-[#667085]">
                    <Building2 width={14} height={14} className="text-cyan-600 shrink-0" />
                    <span className="font-semibold text-[#101828]">{record.company}</span>
                  </p>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-[#667085]">
                  {record.description}
                </p>
              </div>
            </div>

            {/* View Profile Action */}
            <div className="border-t border-[#e4e8f0] bg-[#fafbfd] p-4">
              <button
                type="button"
                onClick={() => setSelectedStudent(record)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#e4e8f0] bg-white py-2 text-xs font-bold text-[#101828] transition-colors hover:border-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <span>View Full Profile</span>
                <ArrowRight width={13} height={13} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e8f0] pt-6">
        <div className="text-xs font-semibold text-[#667085]">
          Showing {startIndex + 1}–{Math.min(startIndex + CARDS_PER_PAGE, verifiedPlacements.length)} of{" "}
          {verifiedPlacements.length} verified alumni profiles
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#e4e8f0] bg-white px-3 text-xs font-semibold text-[#101828] transition-colors hover:bg-[#f5f7fb] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous alumni page"
          >
            <ChevronLeft width={15} height={15} />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1 px-2 text-xs font-bold text-[#101828]">
            Page {currentPage + 1} of {totalPages}
          </div>

          <button
            type="button"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-[#e4e8f0] bg-white px-3 text-xs font-semibold text-[#101828] transition-colors hover:bg-[#f5f7fb] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next alumni page"
          >
            <span>Next</span>
            <ChevronRight width={15} height={15} />
          </button>
        </div>
      </div>

      {/* Student Profile Detail Modal */}
      {selectedStudent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="student-modal-name"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#e4e8f0] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedStudent(null)}
              className="absolute right-4 top-4 rounded-lg p-2 text-[#667085] hover:bg-[#f5f7fb] hover:text-[#101828]"
              aria-label="Close modal"
            >
              <Close width={20} height={20} />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-[#e4e8f0] bg-[#0c1833] shadow-sm">
                <Image
                  src={selectedStudent.photo}
                  alt={selectedStudent.studentName}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle width={14} height={14} /> Verified Student Placement
                </span>
                <h3 id="student-modal-name" className="mt-1 text-2xl font-extrabold text-[#101828]">
                  {selectedStudent.studentName}
                </h3>
                <p className="mt-1 text-sm font-semibold text-red-600">
                  {selectedStudent.designation} at {selectedStudent.company}
                </p>
                <p className="text-xs text-[#667085]">
                  {selectedStudent.course} • {selectedStudent.placementYear}
                </p>
              </div>
            </div>

            {/* Skills Acquired */}
            <div className="mt-6 border-t border-[#e4e8f0] pt-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                Practical Skills Mastered at Talentele
              </h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selectedStudent.skillsAcquired.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-[#f5f7fb] px-2.5 py-1 text-xs font-semibold text-[#101828]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div className="mt-6 border-t border-[#e4e8f0] pt-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                Verified Success Story
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#55555f]">
                {selectedStudent.successStory}
              </p>
            </div>

            {/* Footer Action */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="btn-primary"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

