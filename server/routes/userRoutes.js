import express from "express";
const router = express.Router();

//IMPORT CONTROLLERS HERE
import { registerUser, authUser } from "../controllers/userController.js";

router.post("/", registerUser, (req, res) => {
  res.status(200).send("Success!!!");
});

router.post("/login", authUser, () => {});

export default router;
