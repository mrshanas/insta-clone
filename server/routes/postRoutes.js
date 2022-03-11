import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import {
  displayPosts,
  createPost,
  displayPost,
  deletePost,
  updatePost,
} from "../controllers/goals.js";

const router = express.Router();

router.get("/goals", checkAuthorization, displayPosts);

router.post("/create_goal", checkAuthorization, createPost);

router
  .route("/goal/:goalID")
  .get(checkAuthorization, displayPost)
  .delete(checkAuthorization, deletePost)
  .patch(checkAuthorization, updatePost);

export default router;
