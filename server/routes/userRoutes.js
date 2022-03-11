import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";

const router = express.Router();

// router.get("/secrets", checkAuthorization, secretPage);
router.post("/register", registerUser);
router.post("/login", loginUser);

// router.get('/logout') - handled on the client side

export default router;
