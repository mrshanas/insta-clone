//import User from "../models/userModel.js";
import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  secretPage,
} from "../controllers/user.js";

const router = express.Router();

// router.route("/secret").get(secretPage);
// router.route("/login").post(loginUser);
// router.route("/logout").get(logoutUser);
// router.route("/register").post(registerUser);
router.get("/secrets", secretPage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout");

export default router;
