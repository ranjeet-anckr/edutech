import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const dataBaseName = process.env.DATABASE_NAME;
const dataBaseUsername = process.env.DATABASE_USERNAME;
const dataBaseNPassword = process.env.DATABASE_PASSWORD;
const dataBaseTDialect = process.env.DATABASE_DIALECT;
const dataBaseHost = process.env.DATABASE_HOST;

const dbConnection = new Sequelize(
  dataBaseName,
  dataBaseUsername,
  dataBaseNPassword,
  {
    host: dataBaseHost,
    dialect: dataBaseTDialect,
  }
);
export default dbConnection;
