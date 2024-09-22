import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import mongoose from "mongoose";
import { dbConfig } from "./src/config/db_config.js";

//for routes
import { authenticationToken } from "./src/middlewares/auth.middleware.js";
import { router } from "./routes.js";
dotenv.config();
const app = express();
const allowedOrigins = "*";
const options = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//connect to database
mongoose
  .connect(dbConfig.uri, dbConfig.options)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });
//test route
app.get("/", (req, res) => {
  res.json({ message: "Hello Test Route" });
});

app.use("/hackademia", authenticationToken, router);
export { app };
