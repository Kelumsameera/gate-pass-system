import express from "express";
import {
  createUser,
  loginUser,
  getProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser); // Register
router.post("/login", loginUser); // Login
router.get("/profile", verifyToken, getProfile); // Protected

export default router;
