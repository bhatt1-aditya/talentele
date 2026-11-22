"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCohort = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const CohortSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },
});
exports.MongoCohort = mongoose_1.default.models.Cohort || mongoose_1.default.model("Cohort", CohortSchema);
