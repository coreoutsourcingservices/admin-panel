import express from "express";

import {
  createPartner,
  getPartners,
} from "../controllers/partenr.controllers.js";

import { uploadPartner } from "../middleware/multer.js";

const router = express.Router();

router.post(
  "/create-partner",
  uploadPartner.single("image"),
  createPartner
);

router.get("/get-partners", getPartners);

export default router;