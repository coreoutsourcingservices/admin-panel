import express from "express";
import {
  createContact,
  getAllContacts,
   deleteContact
} from "../controllers/contect.controllers.js";

const router = express.Router();

router.post("/form", createContact);

router.get("/form", getAllContacts);
// delete by id
router.delete("/form/:id", deleteContact);

export default router;