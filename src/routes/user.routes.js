import express from "express";

import { createUser } from "../controllers/auth/user.controllers.js";

const router = express.Router();

router.post("/student-registration", createUser);

export default router;
