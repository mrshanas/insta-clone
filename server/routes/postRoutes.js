import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import {
  displayPosts,
  createPost,
  displayPostAndComments,
  deletePost,
  commentPost,
  deleteComment,
  likeOrDislikePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/posts", checkAuthorization, displayPosts);

router.post("/create_post", checkAuthorization, createPost);

router
  .route("/post/:postID")
  .get(checkAuthorization, displayPostAndComments)
  .delete(checkAuthorization, deletePost);

router.route("/post/:postId/comment").post(checkAuthorization, commentPost);

router.delete("/comment/:commentID/delete", checkAuthorization, deleteComment);

router.post("/posts/:postId/like", checkAuthorization, likeOrDislikePost);

export default router;
