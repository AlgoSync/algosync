import express from "express";
const router = express.Router();

//IMPORT CONTROLLERS HERE

router.get("/", (req, res) => {
  res.status(200).send("Success!!!");
});

router.post("/", (req, res) => {
  res.status(200).send("Success!!!");
});

export default router;
