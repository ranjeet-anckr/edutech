import express from "express";
import {
  addCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  editCourse,
  getCourseModuleDetails,
} from "../../controllers/course/course.controllers.js";
import { addModuleToCourse } from "../../controllers/course/CourseModule.controllers.js";
import { addCourseSubModule } from "../../controllers/course/courseModuleSubTopic.controllers.js";

const router = express.Router();
router.post("/add-module/:id", addModuleToCourse);
router.post("/add-sub-module/:id", addCourseSubModule);
router.post("/course", addCourse);
router.get("/course-details/:id", getCourseModuleDetails);
router.get("/course", getAllCourses);
router.get("/course/:id", getCourseById);
router.put("/course/:id", editCourse);
router.delete("/course/:id", deleteCourse);

export default router;
