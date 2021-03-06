import express from "express";
import {
  loginUser,
  registerUser,
  displayUserAndPosts,
  followOrUnfollowUser,
} from "../controllers/user.js";
import { checkAuthorization } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ...User related routes
router
  .route("/user/:username")
  .get(checkAuthorization, displayUserAndPosts)
  .post(checkAuthorization, followOrUnfollowUser);

// router.get('/logout') - handled on the client side

export default router;
