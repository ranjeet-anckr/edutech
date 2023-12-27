import express from "express";
import {
  addNewCourse,
  deleteCourseById,
  getAllCourses,
} from "../../controllers/course/course.controllers.js";

const router = express.Router();

router.post("/course", addNewCourse);
router.get("/course", getAllCourses);

router.delete("/course/:id", deleteCourseById);

export default router;
