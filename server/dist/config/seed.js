"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMongoDatabase = seedMongoDatabase;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_js_1 = require("./env.js");
const database_js_1 = require("./database.js");
const store_js_1 = require("../models/store.js");
const user_schema_js_1 = require("../models/schemas/user.schema.js");
const cohort_schema_js_1 = require("../models/schemas/cohort.schema.js");
const course_schema_js_1 = require("../models/schemas/course.schema.js");
const lead_schema_js_1 = require("../models/schemas/lead.schema.js");
const placement_schema_js_1 = require("../models/schemas/placement.schema.js");
/**
 * Automatically seeds initial courses, cohorts, leads and admin account
 * into MongoDB when collections are empty.
 */
async function seedMongoDatabase() {
    if (!(0, database_js_1.isDbConnected)())
        return;
    try {
        // 1. Seed Courses
        const courseCount = await course_schema_js_1.MongoCourse.countDocuments();
        if (courseCount === 0) {
            await course_schema_js_1.MongoCourse.insertMany(store_js_1.INITIAL_COURSES);
            console.log(`🍃 [MongoDB Seed] Inserted ${store_js_1.INITIAL_COURSES.length} initial courses.`);
        }
        // 2. Seed Cohorts
        const cohortCount = await cohort_schema_js_1.MongoCohort.countDocuments();
        if (cohortCount === 0) {
            await cohort_schema_js_1.MongoCohort.insertMany(store_js_1.INITIAL_COHORTS);
            console.log(`🍃 [MongoDB Seed] Inserted ${store_js_1.INITIAL_COHORTS.length} initial cohorts.`);
        }
        // 3. Seed Placements
        const placementCount = await placement_schema_js_1.MongoPlacement.countDocuments();
        if (placementCount === 0) {
            await placement_schema_js_1.MongoPlacement.insertMany(store_js_1.INITIAL_PLACEMENTS);
            console.log(`🍃 [MongoDB Seed] Inserted ${store_js_1.INITIAL_PLACEMENTS.length} initial placements.`);
        }
        // 4. Seed Leads
        const leadCount = await lead_schema_js_1.MongoLead.countDocuments();
        if (leadCount === 0) {
            await lead_schema_js_1.MongoLead.insertMany(store_js_1.INITIAL_LEADS);
            console.log(`🍃 [MongoDB Seed] Inserted ${store_js_1.INITIAL_LEADS.length} initial leads.`);
        }
        // 5. Seed Admin User
        const adminCount = await user_schema_js_1.MongoAdminUser.countDocuments();
        if (adminCount === 0) {
            const hashedPassword = await bcryptjs_1.default.hash(env_js_1.config.admin.password, 10);
            await user_schema_js_1.MongoAdminUser.create({
                id: "admin-master-01",
                email: env_js_1.config.admin.email.toLowerCase(),
                name: "Talentele Administrator",
                password: hashedPassword,
                role: "superadmin",
            });
            console.log(`🍃 [MongoDB Seed] Created initial admin account: ${env_js_1.config.admin.email}`);
        }
    }
    catch (error) {
        console.error("❌ [MongoDB Seed] Error during initial database seeding:", error.message);
    }
}
