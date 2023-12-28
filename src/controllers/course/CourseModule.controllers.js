import { Course } from "../../models/course/course.models.js";
import { CourseModule } from "../../models/course/courseModule.models.js";

const addModuleToCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { moduleTopic } = req.body;
    console.log("courseId", courseId);
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const newModule = await CourseModule.create({
      moduleTopic,
      courseId,
    });

    return res
      .status(201)
      .json({ success: true, message: "Module added successfully" });
  } catch (error) {
    console.error("Error adding module to course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addModuleToCourse };
