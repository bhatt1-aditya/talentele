import mongoose, { Document, Schema } from "mongoose";
import { Course as ICourse } from "../../types/index.js";

export interface CourseDocument extends Document, ICourse {}

const CourseSchema = new Schema<CourseDocument>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    shortTitle: { type: String, required: true },
    category: {
      type: String,
      enum: ["analytics", "ai", "core"],
      required: true,
      index: true,
    },
    categoryLabel: { type: String, required: true },
    heroHeadline: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    projectsCount: { type: Number, default: 0 },
    tools: [{ type: String }],
    audience: [{ type: String }],
    prerequisites: { type: String, default: "" },
    careerRoles: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const MongoCourse =
  mongoose.models.Course || mongoose.model<CourseDocument>("Course", CourseSchema);
