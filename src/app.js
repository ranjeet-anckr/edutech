import express from "express";
import cors from "cors";
import User from "./routes/user.routes.js";

var app = express();

app.use(express.json());

app.use(cors());

app.get("/", function (req, res) {
  res.send("Welcome to crud app and it's running successfully!");
});
app.use("/api", User);

app.use(function (err, req, res, next) {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

export default app;
