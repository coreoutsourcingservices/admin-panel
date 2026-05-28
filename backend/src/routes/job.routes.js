import express from "express";
import {
  addJob,
  getJobs,
  getSingleJob,
  deleteJob,
} from "../controllers/job.controllers.js";
const router = express.Router();

router.post("/add-job", addJob);
router.get("/get-jobs", getJobs);
router.get("/get-job/:id", getSingleJob);
router.delete("/delete-job/:id", deleteJob);

export default router;