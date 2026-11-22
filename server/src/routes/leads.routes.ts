import { Router } from "express";
import {
  createLeadSchema,
  LeadsController,
  updateLeadSchema,
} from "../controllers/leads.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();

// List all leads with filters & pagination
router.get("/", LeadsController.getLeads);

// Export leads as CSV file
router.get("/export", LeadsController.exportCsv);

// Get single lead details
router.get("/:id", LeadsController.getLeadById);

// Submit new enquiry (public or admin)
router.post("/", validateRequest(createLeadSchema), LeadsController.createLead);

// Update lead status / notes / details
router.patch("/:id", validateRequest(updateLeadSchema), LeadsController.updateLead);

// Delete lead
router.delete("/:id", LeadsController.deleteLead);

export default router;
