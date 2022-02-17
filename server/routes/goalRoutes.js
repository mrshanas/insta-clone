import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import { displayGoals, createGoal } from "../controllers/goals.js";

const router = express.Router();

router.get("/goals", checkAuthorization, displayGoals);
router.post("/create_goal", checkAuthorization, createGoal);

export default router;
