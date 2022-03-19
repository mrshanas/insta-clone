import { checkAuthorization } from "../middleware/auth.js";
import express from "express";
import {
  displayPosts,
  createPost,
  displayPostCommentsAndLikes,
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
  .get(checkAuthorization, displayPostCommentsAndLikes)
  .delete(checkAuthorization, deletePost);
// TODO edit post controller is in the last commits

router.route("/post/:postId/comment").post(checkAuthorization, commentPost);

router.delete("/comment/:commentID/delete", checkAuthorization, deleteComment);

router.post("/post/:postId/like", checkAuthorization, likeOrDislikePost);

export default router;
