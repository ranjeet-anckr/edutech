import { Course } from "../../models/course/course.models.js";
import { CourseModule } from "../../models/course/courseModule.models.js";
import { CourseSubModule } from "../../models/course/courseModuleSubTopic.models.js";

const addCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    return res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await Course.update(req.body, {
      where: { id: courseId },
    });

    if (updatedCourse[0] === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Course Updated Successfully" });
  } catch (error) {
    console.error("Error editing course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming you pass the courseId as a parameter
    const deletedCourseCount = await Course.destroy({
      where: { id: courseId },
    });

    if (deletedCourseCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Course successfully deleted" });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Error getting courses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).json({ success: true, data: course });
  } catch (error) {
    console.error("Error getting course by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourseModuleDetails = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const modules = await CourseModule.findAll({
      where: { courseId: courseId },
      attributes: { exclude: ["createdAt", "updatedAt", "courseId"] },
    });

    const modulesWithSubModules = await Promise.all(
      modules.map(async (module) => {
        const subModules = await CourseSubModule.findAll({
          where: { moduleId: module.id },
          attributes: { exclude: ["createdAt", "updatedAt", "moduleId"] },
        });

        return {
          ...module.toJSON(),
          subModules,
        };
      })
    );

    const responseData = {
      ...course.toJSON(),
      modules: modulesWithSubModules,
    };

    return res.status(200).json({ data: responseData });
  } catch (error) {
    console.error("Error getting course and sub-modules:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  getAllCourses,
  getCourseById,
  deleteCourse,
  editCourse,
  addCourse,
  getCourseModuleDetails,
};
