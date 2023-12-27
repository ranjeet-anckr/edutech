import express from "express";

import {
  createUser,
  getProfile,
  loginUser,
} from "../../controllers/auth/user.controllers.js";

const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);
router.get("/profile", getProfile);

export default router;
