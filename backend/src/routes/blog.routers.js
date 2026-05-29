import express from "express";
import {
  addBlog,
  getBlogs,
  getSingleBlog,
  deleteBlog,
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

router.delete(
  "/delete-blog/:id",
  deleteBlog
);

export default router;