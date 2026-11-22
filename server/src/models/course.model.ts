import { Course } from "../types/index.js";
import { INITIAL_COURSES, JsonStore } from "./store.js";
import { isDbConnected } from "../config/database.js";
import { MongoCourse } from "./schemas/course.schema.js";

const store = new JsonStore<Course>("courses.json", INITIAL_COURSES);

export class CourseModel {
  static getAll(category?: string): Course[] {
    const courses = store.read();
    if (category && category !== "all") {
      return courses.filter((c) => c.category === category);
    }
    return courses;
  }

  static getBySlug(slug: string): Course | null {
    const courses = store.read();
    return courses.find((c) => c.slug === slug) || null;
  }

  static create(data: Course): Course {
    const courses = store.read();
    const existingIndex = courses.findIndex((c) => c.slug === data.slug);
    if (existingIndex >= 0) {
      courses[existingIndex] = data;
    } else {
      courses.unshift(data);
    }
    store.write(courses);

    if (isDbConnected()) {
      MongoCourse.findOneAndUpdate({ slug: data.slug }, data, { upsert: true, new: true }).catch((err) =>
        console.error("Failed to sync new course to MongoDB:", err.message)
      );
    }
    return data;
  }

  static update(slug: string, updateData: Partial<Course>): Course | null {
    const courses = store.read();
    const index = courses.findIndex((c) => c.slug === slug);
    if (index === -1) return null;

    const existing = courses[index];
    const updated: Course = {
      ...existing,
      ...updateData,
      slug: existing.slug, // preserve primary slug
    };

    courses[index] = updated;
    store.write(courses);

    if (isDbConnected()) {
      MongoCourse.findOneAndUpdate({ slug }, updated).catch((err) =>
        console.error("Failed to sync updated course to MongoDB:", err.message)
      );
    }
    return updated;
  }

  static delete(slug: string): boolean {
    const courses = store.read();
    const filtered = courses.filter((c) => c.slug !== slug);
    if (filtered.length === courses.length) return false;

    store.write(filtered);

    if (isDbConnected()) {
      MongoCourse.findOneAndDelete({ slug }).catch((err) =>
        console.error("Failed to sync course deletion to MongoDB:", err.message)
      );
    }
    return true;
  }
}
