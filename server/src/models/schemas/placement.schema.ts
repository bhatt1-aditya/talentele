import mongoose, { Document, Schema } from "mongoose";
import { Placement as IPlacement } from "../../types/index.js";

export interface PlacementDocument extends Omit<IPlacement, "id">, Document {
  id: string;
}

const PlacementSchema = new Schema<PlacementDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    studentName: { type: String, required: true },
    photo: { type: String, default: "" },
    course: { type: String, required: true },
    designation: { type: String, required: true },
    company: { type: String, required: true },
    companyShort: { type: String },
    placementYear: { type: String, required: true },
    skillsAcquired: [{ type: String }],
    successStory: { type: String, default: "" },
    salaryHike: { type: String },
    verificationStatus: {
      type: String,
      enum: ["verified", "pending"],
      default: "verified",
    },
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

export const MongoPlacement =
  mongoose.models.Placement ||
  mongoose.model<PlacementDocument>("Placement", PlacementSchema);
