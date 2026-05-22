import express from "express";

import {
  createOurTeam,
  getOurTeam,
} from "../controllers/ourTeamFirst.js";

import { uploadOurTeam } from "../middleware/multer.js";

const router = express.Router();


// CREATE
router.post(
  "/create-team",
  uploadOurTeam.single("image"),
  createOurTeam
);


// GET
router.get(
  "/get-team",
  getOurTeam
);

export default router;