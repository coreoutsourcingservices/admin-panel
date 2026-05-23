import express from "express";

import {
  createTeamSecond,
  getAllTeamSecond,
} from "../controllers/teamSecond.controllers.js";

import { uploadTeamSecond } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/create-team-second",
  uploadTeamSecond.single("image"),
  createTeamSecond
);

router.get(
  "/get-team-second",
  getAllTeamSecond
);

export default router;