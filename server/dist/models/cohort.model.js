"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortModel = void 0;
const store_js_1 = require("./store.js");
const database_js_1 = require("../config/database.js");
const cohort_schema_js_1 = require("./schemas/cohort.schema.js");
const store = new store_js_1.JsonStore("cohorts.json", store_js_1.INITIAL_COHORTS);
class CohortModel {
    static getAll() {
        return store.read();
    }
    static getById(id) {
        const cohorts = store.read();
        return cohorts.find((c) => c.id === id) || null;
    }
    static getBySlug(slug) {
        const cohorts = store.read();
        return cohorts.find((c) => c.slug === slug) || null;
    }
    static create(data) {
        const cohorts = store.read();
        const newCohort = {
            ...data,
            id: `cohort-${Date.now().toString().slice(-4)}`,
        };
        cohorts.push(newCohort);
        store.write(cohorts);
        if ((0, database_js_1.isDbConnected)()) {
            cohort_schema_js_1.MongoCohort.create(newCohort).catch((err) => console.error("Failed to sync new cohort to MongoDB:", err.message));
        }
        return newCohort;
    }
    static update(id, updates) {
        const cohorts = store.read();
        const index = cohorts.findIndex((c) => c.id === id);
        if (index === -1)
            return null;
        const updated = { ...cohorts[index], ...updates };
        cohorts[index] = updated;
        store.write(cohorts);
        if ((0, database_js_1.isDbConnected)()) {
            cohort_schema_js_1.MongoCohort.findOneAndUpdate({ id }, updated).catch((err) => console.error("Failed to sync updated cohort to MongoDB:", err.message));
        }
        return updated;
    }
    static delete(id) {
        const cohorts = store.read();
        const filtered = cohorts.filter((c) => c.id !== id);
        if (filtered.length === cohorts.length)
            return false;
        store.write(filtered);
        if ((0, database_js_1.isDbConnected)()) {
            cohort_schema_js_1.MongoCohort.findOneAndDelete({ id }).catch((err) => console.error("Failed to sync deleted cohort to MongoDB:", err.message));
        }
        return true;
    }
}
exports.CohortModel = CohortModel;
