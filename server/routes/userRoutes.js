import express from "express";

const router = express.Router();

import UserController from "../controllers/userController.js";
const { createUser, userLogin } = UserController;

//ENDPOINT  POST api/users/login
//PURPOSE   User login
//ACCESS    Public
router.post("/login", userLogin, (req, res) => {
  return res.status(200).json({ user: res.locals.user });
});

//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public
router.post("/", createUser, (req, res) => {
  return res.status(200).json({ user: res.locals.newUser });
});

export default router;
