"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeadsToCsv = exportLeadsToCsv;
function exportLeadsToCsv(leads) {
    const headers = [
        "ID",
        "Candidate Name",
        "Phone Number",
        "Email Address",
        "Target Course",
        "Course Label",
        "Enquiry Source",
        "Status",
        "Student Message",
        "Counsellor Notes",
        "Submission Date",
    ];
    const escapeCsv = (str) => {
        if (!str)
            return '""';
        const escaped = str.replace(/"/g, '""');
        return `"${escaped}"`;
    };
    const rows = leads.map((lead) => [
        escapeCsv(lead.id),
        escapeCsv(lead.name),
        escapeCsv(lead.phone),
        escapeCsv(lead.email),
        escapeCsv(lead.course),
        escapeCsv(lead.courseLabel),
        escapeCsv(lead.source),
        escapeCsv(lead.status),
        escapeCsv(lead.message || ""),
        escapeCsv(lead.counsellorNotes || ""),
        escapeCsv(new Date(lead.submittedAt).toLocaleString("en-IN")),
    ]);
    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
}
