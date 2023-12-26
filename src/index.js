import dotenv from "dotenv";
import dbConnection from "./db/dbConnection.js";
import app from "./app.js";

dotenv.config();
const port = process.env.PORT;

const getConnection = async () => {
  try {
    await dbConnection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

await getConnection();

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
