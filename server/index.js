import express from "express";
import path from "path";
//IMPORT DB CONNECT SCRIPT
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

//DB CONNECT CALL GOES HERE

import userRoutes from './routes/userRoutes';
app.use('/user', userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.get("/", (req, res) => {
  res.send("TEST");
});

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
