import express from "express";

import {
  addGallery,
  getGallery,
  getSingleGallery,
  deleteGalleryMedia,
  deleteGallery,
} from "../controllers/gallery.controllers.js";

import { uploadGallery } from "../middleware/multer.js";

const router = express.Router();

// POST
router.post(
  "/add-gallery",

  uploadGallery.array("media", 50),

  addGallery
);

// GET ALL
router.get(
  "/get-gallery",

  getGallery
);

// GET SINGLE
router.get(
  "/get-gallery/:galleryName",

  getSingleGallery
);


router.delete(
  "/delete-gallery/:id",
  deleteGallery
);

router.delete(
  "/delete-gallery-media/:galleryId/:mediaId",
  deleteGalleryMedia
);

export default router;