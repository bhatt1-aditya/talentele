"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leads_controller_js_1 = require("../controllers/leads.controller.js");
const validate_middleware_js_1 = require("../middlewares/validate.middleware.js");
const router = (0, express_1.Router)();
// List all leads with filters & pagination
router.get("/", leads_controller_js_1.LeadsController.getLeads);
// Export leads as CSV file
router.get("/export", leads_controller_js_1.LeadsController.exportCsv);
// Get single lead details
router.get("/:id", leads_controller_js_1.LeadsController.getLeadById);
// Submit new enquiry (public or admin)
router.post("/", (0, validate_middleware_js_1.validateRequest)(leads_controller_js_1.createLeadSchema), leads_controller_js_1.LeadsController.createLead);
// Update lead status / notes / details
router.patch("/:id", (0, validate_middleware_js_1.validateRequest)(leads_controller_js_1.updateLeadSchema), leads_controller_js_1.LeadsController.updateLead);
// Delete lead
router.delete("/:id", leads_controller_js_1.LeadsController.deleteLead);
exports.default = router;
