import express from "express";

const router = express.Router();

import UserController from "../controllers/userController.js";
const { createUser, userLogin } = UserController;

router.post("/login", userLogin);
router.post("/", createUser);

export default router;
