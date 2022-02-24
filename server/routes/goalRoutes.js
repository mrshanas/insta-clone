import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import {
  displayGoals,
  createGoal,
  displayGoal,
  deleteGoal,
  updateGoal,
} from "../controllers/goals.js";

const router = express.Router();

router.get("/goals", checkAuthorization, displayGoals);

router.post("/create_goal", checkAuthorization, createGoal);

router
  .route("/goal/:goalID")
  .get(checkAuthorization, displayGoal)
  .delete(checkAuthorization, deleteGoal)
  .patch(checkAuthorization, updateGoal);

export default router;
