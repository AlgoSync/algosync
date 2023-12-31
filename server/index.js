import express from "express";
import path from "path";
import dotenv from "dotenv";
import pool from "./config/dbConnect.js";
import cookieParser from "cookie-parser";

//IMPORT ROUTES
import userRoutes from "./routes/userRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

//DB CONNECT CALL GOES HERE

//INVOKE ROUTES
app.use("/api/users", userRoutes);
app.use("/api/problems", problemRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

//REPLACE THIS WITH A NICE 404 PAGE
app.get("*", (req, res) => {
  res.send("Nothing here - Sorry!");
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
