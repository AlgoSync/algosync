import express from "express";
const router = express.Router();
import ProblemsController from "../controllers/problemsController.js";
import UserController from "../controllers/userController.js";
const { getProblem, addProblem, getUsersProblems } = ProblemsController;
const { verifyToken } = UserController;

//ENDPOINT  GET api/problems
//PURPOSE   Get a problem from db
//ACCESS    Private
router.get("/", verifyToken, getProblem, (req, res) => {
  res.status(200).send("Success!!!");
});

//ENDPOINT  GET api/problems/:userID
//PURPOSE   Get a users problem history
//ACCESS    Private
router.get("/:userID", verifyToken, getUsersProblems, (req, res) => {
  res.status(200).send("Success!!!");
});

//ENDPOINT  PUT api/problems
//PURPOSE   Add a users problem to db
//ACCESS    Private
router.put("/", addProblem, (req, res) => {
  res.status(201).send("Success!!!");
});

export default router;
