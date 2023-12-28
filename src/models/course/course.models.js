import { DataTypes } from "sequelize";
import dbConnection from "../../db/dbConnection.js";

const CourseModel = dbConnection.define("course", {
  courseName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseImg: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  courseDiscount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  courseCategories: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  coursePrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  coursePdf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

CourseModel.sync()
  .then(() => {
    console.log("course model synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing user model:", error);
  });

export const Course = CourseModel;
