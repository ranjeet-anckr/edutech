import { CourseSubModule } from "../../models/course/courseModuleSubTopic.models.js";
import { Course } from "../../models/course/course.models.js";
import { CourseModule } from "../../models/course/courseModule.models.js";

const addCourseSubModule = async (req, res) => {
  try {
    const { subTopic, moduleId } = req.body;
    const courseId = req.params.id;

    const existingCourse = await Course.findByPk(courseId);

    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    const existingModule = await CourseModule.findByPk(moduleId);

    if (!existingModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    const newCourseSubModule = await CourseSubModule.create({
      subTopic,
      moduleId,
    });

    return res.status(201).json({
      data: newCourseSubModule,
      message: "Submodule created successfully",
    });
  } catch (error) {
    console.error("Error adding course submodule:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An error occurred while adding the course submodule.",
    });
  }
};

export { addCourseSubModule };
