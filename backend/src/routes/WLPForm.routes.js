import express from "express";
import { createEnquiry,getAllEnquiries,deleteEnquiry } from "../controllers/WLPForm.js";

const router = express.Router();


router.post("/enquiry", createEnquiry);
router.get("/enquiry", getAllEnquiries);
router.delete("/enquiry/:id", deleteEnquiry);
export default router;