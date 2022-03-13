import express from "express";
import {
  loginUser,
  registerUser,
  displayUserAndPosts,
} from "../controllers/user.js";
import { checkAuthorization } from "../middleware/auth.js";

const router = express.Router();

// router.get("/secrets", checkAuthorization, secretPage);
router.post("/register", registerUser);
router.post("/login", loginUser);

// ...
router.route("/user/:username").get(checkAuthorization, displayUserAndPosts);

// router.get('/logout') - handled on the client side

export default router;
