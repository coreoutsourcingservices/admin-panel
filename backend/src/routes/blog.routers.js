import express from "express";
import {
  addBlog,
  getBlogs,
  getSingleBlog,
} from "../controllers/blog.controllers.js";

import { uploadBlogPhoto } from "../middleware/multer.js";

const router = express.Router();

// Add Blog with Images
router.post(
  "/add-blog",
  uploadBlogPhoto.array("image", 10), // max 20 photos
  addBlog
);

// Get All Blogs
router.get("/get-blogs", getBlogs);

// Get Single Blog
router.get("/get-blog/:id", getSingleBlog);

export default router;