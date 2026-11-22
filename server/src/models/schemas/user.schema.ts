import mongoose, { Document, Schema } from "mongoose";
import { AdminUser as IAdminUser } from "../../types/index.js";

export interface AdminUserDocument extends Document {
  id: string;
  email: string;
  name: string;
  password?: string;
  role: "superadmin" | "counsellor" | "instructor";
  createdAt: string;
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "counsellor", "instructor"],
      default: "superadmin",
    },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret: any) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

export const MongoAdminUser =
  mongoose.models.AdminUser ||
  mongoose.model<AdminUserDocument>("AdminUser", AdminUserSchema);
