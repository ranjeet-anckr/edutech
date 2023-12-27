import { Course } from "../../models/course/course.models.js";

const addNewCourse = async (req, res) => {
  try {
    const {
      course_name,
      course_img,
      course_discount,
      course_categories,
      course_price,
      course_pdf,
    } = req.body;

    const newCourse = await Course.create({
      course_name,
      course_img,
      course_discount,
      course_categories,
      course_price,
      course_pdf,
    });

    return res.status(201).json({ data: newCourse, message: "Course added" });
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ data: course, message: "Course fetched successfully" });
  } catch (error) {
    console.error("Error getting course by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res
      .status(200)
      .json({ data: courses, message: "Courses fetched successfully" });
  } catch (error) {
    console.error("Error getting courses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.destroy();
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course by ID:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addNewCourse, getCourseById, getAllCourses, deleteCourseById };
