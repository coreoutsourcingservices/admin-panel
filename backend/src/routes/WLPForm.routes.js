import express from "express";
import { createEnquiry,getAllEnquiries } from "../controllers/WLPForm.js";

const router = express.Router();


router.post("/enquiry", createEnquiry);
router.get("/enquiry", getAllEnquiries);
export default router;