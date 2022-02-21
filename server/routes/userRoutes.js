import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.js";
import { checkAuthorization } from "../middleware/auth.js";

const router = express.Router();

// router.get("/secrets", checkAuthorization, secretPage);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
