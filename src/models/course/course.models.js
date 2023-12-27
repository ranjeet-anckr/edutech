import { DataTypes } from "sequelize";
import dbConnection from "../../db/dbConnection.js";

const CourseModel = dbConnection.define("courseModel", {
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_categories: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_pdf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

CourseModel.sync()
  .then(() => {
    console.log("User model synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing user model:", error);
  });

export const Course = CourseModel;
