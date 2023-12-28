import { DataTypes } from "sequelize";
import dbConnection from "../../db/dbConnection.js";
import { CourseModule } from "./courseModule.models.js";

const CourseModuleSubTopic = dbConnection.define("courseSubModule", {
  subTopic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  moduleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CourseModule,
      key: "id",
    },
  },
});

CourseModuleSubTopic.belongsTo(CourseModule, {
  foreignKey: "moduleId",
});

CourseModuleSubTopic.sync()
  .then(() => {
    console.log("course module sub topic synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing user model:", error);
  });

export const CourseSubModule = CourseModuleSubTopic;
