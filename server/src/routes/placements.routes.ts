import { Router } from "express";
import { PlacementsController } from "../controllers/placements.controller.js";

const router = Router();

router.get("/", PlacementsController.getPlacements);
router.post("/", PlacementsController.createPlacement);

export default router;
