"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const store_js_1 = require("./store.js");
const database_js_1 = require("../config/database.js");
const course_schema_js_1 = require("./schemas/course.schema.js");
const store = new store_js_1.JsonStore("courses.json", store_js_1.INITIAL_COURSES);
class CourseModel {
    static getAll(category) {
        const courses = store.read();
        if (category && category !== "all") {
            return courses.filter((c) => c.category === category);
        }
        return courses;
    }
    static getBySlug(slug) {
        const courses = store.read();
        return courses.find((c) => c.slug === slug) || null;
    }
    static create(data) {
        const courses = store.read();
        const existingIndex = courses.findIndex((c) => c.slug === data.slug);
        if (existingIndex >= 0) {
            courses[existingIndex] = data;
        }
        else {
            courses.unshift(data);
        }
        store.write(courses);
        if ((0, database_js_1.isDbConnected)()) {
            course_schema_js_1.MongoCourse.findOneAndUpdate({ slug: data.slug }, data, { upsert: true, new: true }).catch((err) => console.error("Failed to sync new course to MongoDB:", err.message));
        }
        return data;
    }
    static update(slug, updateData) {
        const courses = store.read();
        const index = courses.findIndex((c) => c.slug === slug);
        if (index === -1)
            return null;
        const existing = courses[index];
        const updated = {
            ...existing,
            ...updateData,
            slug: existing.slug, // preserve primary slug
        };
        courses[index] = updated;
        store.write(courses);
        if ((0, database_js_1.isDbConnected)()) {
            course_schema_js_1.MongoCourse.findOneAndUpdate({ slug }, updated).catch((err) => console.error("Failed to sync updated course to MongoDB:", err.message));
        }
        return updated;
    }
    static delete(slug) {
        const courses = store.read();
        const filtered = courses.filter((c) => c.slug !== slug);
        if (filtered.length === courses.length)
            return false;
        store.write(filtered);
        if ((0, database_js_1.isDbConnected)()) {
            course_schema_js_1.MongoCourse.findOneAndDelete({ slug }).catch((err) => console.error("Failed to sync course deletion to MongoDB:", err.message));
        }
        return true;
    }
}
exports.CourseModel = CourseModel;
