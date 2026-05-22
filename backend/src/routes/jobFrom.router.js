import express from "express";
import { job_application_from,get_all_job_application,delete_job_application } from "../controllers/jobFrom.controllers.js";
import {uploadResume} from "../middleware/multer.js";
const router = express.Router();

router.post("/from",uploadResume.single("resume"),job_application_from )
router.get("/fromdata",get_all_job_application )
router.delete(
    "/fromdata/:id",
    delete_job_application
);
export default router;