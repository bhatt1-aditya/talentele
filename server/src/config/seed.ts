import bcrypt from "bcryptjs";
import { config } from "./env.js";
import { isDbConnected } from "./database.js";
import {
  INITIAL_COHORTS,
  INITIAL_COURSES,
  INITIAL_LEADS,
  INITIAL_PLACEMENTS,
} from "../models/store.js";
import { MongoAdminUser } from "../models/schemas/user.schema.js";
import { MongoCohort } from "../models/schemas/cohort.schema.js";
import { MongoCourse } from "../models/schemas/course.schema.js";
import { MongoLead } from "../models/schemas/lead.schema.js";
import { MongoPlacement } from "../models/schemas/placement.schema.js";

/**
 * Automatically seeds initial courses, cohorts, leads and admin account
 * into MongoDB when collections are empty.
 */
export async function seedMongoDatabase(): Promise<void> {
  if (!isDbConnected()) return;

  try {
    // 1. Seed Courses
    const courseCount = await MongoCourse.countDocuments();
    if (courseCount === 0) {
      await MongoCourse.insertMany(INITIAL_COURSES);
      console.log(`🍃 [MongoDB Seed] Inserted ${INITIAL_COURSES.length} initial courses.`);
    }

    // 2. Seed Cohorts
    const cohortCount = await MongoCohort.countDocuments();
    if (cohortCount === 0) {
      await MongoCohort.insertMany(INITIAL_COHORTS);
      console.log(`🍃 [MongoDB Seed] Inserted ${INITIAL_COHORTS.length} initial cohorts.`);
    }

    // 3. Seed Placements
    const placementCount = await MongoPlacement.countDocuments();
    if (placementCount === 0) {
      await MongoPlacement.insertMany(INITIAL_PLACEMENTS);
      console.log(`🍃 [MongoDB Seed] Inserted ${INITIAL_PLACEMENTS.length} initial placements.`);
    }

    // 4. Seed Leads
    const leadCount = await MongoLead.countDocuments();
    if (leadCount === 0) {
      await MongoLead.insertMany(INITIAL_LEADS);
      console.log(`🍃 [MongoDB Seed] Inserted ${INITIAL_LEADS.length} initial leads.`);
    }

    // 5. Seed Admin User
    const adminCount = await MongoAdminUser.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash(config.admin.password, 10);
      await MongoAdminUser.create({
        id: "admin-master-01",
        email: config.admin.email.toLowerCase(),
        name: "Talentele Administrator",
        password: hashedPassword,
        role: "superadmin",
      });
      console.log(`🍃 [MongoDB Seed] Created initial admin account: ${config.admin.email}`);
    }
  } catch (error: any) {
    console.error("❌ [MongoDB Seed] Error during initial database seeding:", error.message);
  }
}
