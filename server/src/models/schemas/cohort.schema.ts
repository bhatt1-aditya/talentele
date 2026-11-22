import mongoose, { Document, Schema } from "mongoose";
import { Cohort as ICohort } from "../../types/index.js";

export interface CohortDocument extends Omit<ICohort, "id">, Document {
  id: string;
}

const CohortSchema = new Schema<CohortDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, index: true },
    courseTitle: { type: String, required: true },
    category: { type: String, required: true },
    summary: { type: String, required: true },
    tools: [{ type: String }],
    schedule: { type: String, required: true },
    duration: { type: String, required: true },
    mode: { type: String, required: true },
    status: {
      type: String,
      enum: ["Admissions Open", "Fast-Filling Cohort", "Upcoming Batch", "Seats Limited"],
      default: "Admissions Open",
    },
    statusTone: {
      type: String,
      enum: ["emerald", "amber", "blue"],
      default: "emerald",
    },
    highlights: { type: String, default: "" },
    enrolledCount: { type: Number, default: 0 },
    maxSeats: { type: Number, default: 25 },
    startDate: { type: String },
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

export const MongoCohort =
  mongoose.models.Cohort || mongoose.model<CohortDocument>("Cohort", CohortSchema);
