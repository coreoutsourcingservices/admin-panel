import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contentWishlen.controllers.js";

const router = express.Router();

router.post("/content", createContact);

router.get("/content", getAllContacts);

router.delete("/content/:id", deleteContact);

export default router;