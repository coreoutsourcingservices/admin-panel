import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contentWishlen.controllers.js";
import {
 createCareerForm,
 getAllCareerForms,
 deleteCareerForm,
} from "../controllers/careerFormWishlan.controllers.js"

import {
  createBlog,
  getBlogs,
 getSingleBlog,
  deleteBlog,

} from "../controllers/wishlenBlog.js";

import { uploadResumWishlanPhoto , uploadBlogeWishlanPhoto} from "../middleware/multer.js";
const router = express.Router();

router.post("/content", createContact);
router.get("/content", getAllContacts);
router.delete("/content/:id", deleteContact);






router.post("/career-form", uploadResumWishlanPhoto.single("rusume"),createCareerForm)
router.get("/get-career",getAllCareerForms)
router.delete("/detate-career/:id",deleteCareerForm)


router.post("/create-blog", uploadBlogeWishlanPhoto.single("BlogImage"),createBlog);

router.get("/get-blogs", getBlogs);

router.get("/get-blogs/:BlogHeadingURL", getSingleBlog);

router.delete("/delete-blog/:id", deleteBlog);


export default router;