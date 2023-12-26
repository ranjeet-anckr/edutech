import express from "express";

import { createUser, loginUser } from "../controllers/auth/user.controllers.js";

const router = express.Router();

router.post("/registration", createUser);
router.post("/login", loginUser);

export default router;
