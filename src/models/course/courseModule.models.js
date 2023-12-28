import { DataTypes } from "sequelize";
import dbConnection from "../../db/dbConnection.js";
import { Course } from "./course.models.js";

const CourseModuleModel = dbConnection.define("courseModule", {
  moduleTopic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: "id",
    },
  },
});

CourseModuleModel.belongsTo(Course, {
  foreignKey: "courseId",
});

CourseModuleModel.sync()
  .then(() => {
    console.log("Module model synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing Module model:", error);
  });

export const CourseModule = CourseModuleModel;
