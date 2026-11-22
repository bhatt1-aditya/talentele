import { Cohort } from "../types/index.js";
import { INITIAL_COHORTS, JsonStore } from "./store.js";
import { isDbConnected } from "../config/database.js";
import { MongoCohort } from "./schemas/cohort.schema.js";

const store = new JsonStore<Cohort>("cohorts.json", INITIAL_COHORTS);

export class CohortModel {
  static getAll(): Cohort[] {
    return store.read();
  }

  static getById(id: string): Cohort | null {
    const cohorts = store.read();
    return cohorts.find((c) => c.id === id) || null;
  }

  static getBySlug(slug: string): Cohort | null {
    const cohorts = store.read();
    return cohorts.find((c) => c.slug === slug) || null;
  }

  static create(data: Omit<Cohort, "id">): Cohort {
    const cohorts = store.read();
    const newCohort: Cohort = {
      ...data,
      id: `cohort-${Date.now().toString().slice(-4)}`,
    };
    cohorts.push(newCohort);
    store.write(cohorts);

    if (isDbConnected()) {
      MongoCohort.create(newCohort).catch((err) =>
        console.error("Failed to sync new cohort to MongoDB:", err.message)
      );
    }

    return newCohort;
  }

  static update(id: string, updates: Partial<Cohort>): Cohort | null {
    const cohorts = store.read();
    const index = cohorts.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updated = { ...cohorts[index], ...updates };
    cohorts[index] = updated;
    store.write(cohorts);

    if (isDbConnected()) {
      MongoCohort.findOneAndUpdate({ id }, updated).catch((err) =>
        console.error("Failed to sync updated cohort to MongoDB:", err.message)
      );
    }

    return updated;
  }

  static delete(id: string): boolean {
    const cohorts = store.read();
    const filtered = cohorts.filter((c) => c.id !== id);
    if (filtered.length === cohorts.length) return false;
    store.write(filtered);

    if (isDbConnected()) {
      MongoCohort.findOneAndDelete({ id }).catch((err) =>
        console.error("Failed to sync deleted cohort to MongoDB:", err.message)
      );
    }

    return true;
  }
}
