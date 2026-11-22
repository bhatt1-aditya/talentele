"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = void 0;
const store_js_1 = require("./store.js");
const database_js_1 = require("../config/database.js");
const lead_schema_js_1 = require("./schemas/lead.schema.js");
const store = new store_js_1.JsonStore("leads.json", store_js_1.INITIAL_LEADS);
class LeadModel {
    static getAll(filters = {}) {
        let leads = store.read();
        // 1. Search Filter (name, email, phone)
        if (filters.search) {
            const q = filters.search.toLowerCase().trim();
            leads = leads.filter((l) => l.name.toLowerCase().includes(q) ||
                l.email.toLowerCase().includes(q) ||
                l.phone.toLowerCase().includes(q) ||
                (l.courseLabel && l.courseLabel.toLowerCase().includes(q)));
        }
        // 2. Status Filter
        if (filters.status && filters.status !== "all") {
            leads = leads.filter((l) => l.status === filters.status);
        }
        // 3. Course Filter
        if (filters.course && filters.course !== "all") {
            leads = leads.filter((l) => l.course === filters.course);
        }
        // 4. Sorting
        const sortBy = filters.sortBy || "submittedAt";
        const sortOrder = filters.sortOrder || "desc";
        leads.sort((a, b) => {
            const valA = a[sortBy] || "";
            const valB = b[sortBy] || "";
            if (valA < valB)
                return sortOrder === "asc" ? -1 : 1;
            if (valA > valB)
                return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        const total = leads.length;
        // 5. Pagination
        if (filters.page && filters.limit) {
            const page = Math.max(1, filters.page);
            const limit = Math.max(1, filters.limit);
            const offset = (page - 1) * limit;
            const paginated = leads.slice(offset, offset + limit);
            return {
                leads: paginated,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }
        return {
            leads,
            total,
            page: 1,
            limit: total,
            totalPages: 1,
        };
    }
    static getById(id) {
        const leads = store.read();
        return leads.find((l) => l.id === id) || null;
    }
    static create(data) {
        const leads = store.read();
        const newLead = {
            id: `lead-${Date.now().toString().slice(-6)}`,
            name: data.name.trim(),
            phone: data.phone.trim(),
            email: data.email.trim().toLowerCase(),
            course: data.course,
            courseLabel: data.courseLabel || data.course,
            source: data.source || "Website Enquiry",
            status: "new",
            message: data.message || "",
            counsellorNotes: "",
            submittedAt: new Date().toISOString(),
        };
        leads.unshift(newLead);
        store.write(leads);
        if ((0, database_js_1.isDbConnected)()) {
            lead_schema_js_1.MongoLead.create(newLead).catch((err) => console.error("Failed to sync new lead to MongoDB:", err.message));
        }
        return newLead;
    }
    static update(id, updateData) {
        const leads = store.read();
        const index = leads.findIndex((l) => l.id === id);
        if (index === -1)
            return null;
        const existing = leads[index];
        const updated = {
            ...existing,
            ...updateData,
            id: existing.id, // prevent ID overwrite
            submittedAt: existing.submittedAt,
            updatedAt: new Date().toISOString(),
        };
        leads[index] = updated;
        store.write(leads);
        if ((0, database_js_1.isDbConnected)()) {
            lead_schema_js_1.MongoLead.findOneAndUpdate({ id }, updated).catch((err) => console.error("Failed to sync updated lead to MongoDB:", err.message));
        }
        return updated;
    }
    static delete(id) {
        const leads = store.read();
        const filtered = leads.filter((l) => l.id !== id);
        if (filtered.length === leads.length)
            return false;
        store.write(filtered);
        if ((0, database_js_1.isDbConnected)()) {
            lead_schema_js_1.MongoLead.findOneAndDelete({ id }).catch((err) => console.error("Failed to sync deleted lead to MongoDB:", err.message));
        }
        return true;
    }
    static getStats() {
        const leads = store.read();
        const byStatus = {
            new: 0,
            contacted: 0,
            "follow-up": 0,
            enrolled: 0,
            closed: 0,
        };
        const courseMap = new Map();
        leads.forEach((l) => {
            if (byStatus[l.status] !== undefined) {
                byStatus[l.status]++;
            }
            const c = courseMap.get(l.course) || { course: l.course, courseLabel: l.courseLabel, count: 0 };
            c.count++;
            courseMap.set(l.course, c);
        });
        const enrolledCount = byStatus.enrolled;
        const totalCount = leads.length;
        const conversionRate = totalCount > 0 ? `${Math.round((enrolledCount / totalCount) * 100)}%` : "0%";
        return {
            totalLeads: totalCount,
            newLeads: byStatus.new,
            contactedLeads: byStatus.contacted,
            followUpLeads: byStatus["follow-up"],
            enrolledLeads: enrolledCount,
            closedLeads: byStatus.closed,
            conversionRate,
            byStatus,
            byCourse: Array.from(courseMap.values()),
            recentLeads: leads.slice(0, 5),
        };
    }
}
exports.LeadModel = LeadModel;
