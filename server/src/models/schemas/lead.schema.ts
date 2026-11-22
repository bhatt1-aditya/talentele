import mongoose, { Document, Schema } from "mongoose";
import { Lead as ILead, LeadStatus } from "../../types/index.js";

export interface LeadDocument extends Omit<ILead, "id">, Document {
  id: string;
}

const LeadSchema = new Schema<LeadDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, index: true },
    course: { type: String, required: true, index: true },
    courseLabel: { type: String, default: "" },
    source: { type: String, default: "Website Enquiry" },
    status: {
      type: String,
      enum: ["new", "contacted", "follow-up", "enrolled", "closed"],
      default: "new",
      index: true,
    },
    message: { type: String, default: "" },
    counsellorNotes: { type: String, default: "" },
    submittedAt: { type: String, default: () => new Date().toISOString(), index: true },
    updatedAt: { type: String },
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

export const MongoLead =
  mongoose.models.Lead || mongoose.model<LeadDocument>("Lead", LeadSchema);
