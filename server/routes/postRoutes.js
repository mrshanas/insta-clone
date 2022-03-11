import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import {
  displayPosts,
  createPost,
  displayPost,
  deletePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/posts", checkAuthorization, displayPosts);

router.post("/create_post", checkAuthorization, createPost);

router
  .route("/post/:postID")
  .get(checkAuthorization, displayPost)
  .delete(checkAuthorization, deletePost)
  .patch(checkAuthorization, updatePost);

export default router;
