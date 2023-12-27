import { DataTypes } from "sequelize";
import dbConnection from "../../db/dbConnection.js";

const UserModel = dbConnection.define("users", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

UserModel.sync()
  .then(() => {
    console.log("User model synchronized successfully");
  })
  .catch((error) => {
    console.error("Error synchronizing user model:", error);
  });

export const User = UserModel;
