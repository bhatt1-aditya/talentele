import { Router } from "express";
import {
  CohortsController,
  createCohortSchema,
} from "../controllers/cohorts.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", CohortsController.getCohorts);
router.get("/:id", CohortsController.getCohortById);
router.post("/", validateRequest(createCohortSchema), CohortsController.createCohort);
router.patch("/:id", CohortsController.updateCohort);
router.delete("/:id", CohortsController.deleteCohort);

export default router;
