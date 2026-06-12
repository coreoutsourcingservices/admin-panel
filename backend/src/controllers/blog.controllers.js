import { Bloge } from "../models/bloge.models.js";
import { v2 as cloudinary } from "cloudinary";

// Add Blog
export const addBlog = async (req, res) => {
  try {
    const { heading, blag , headingUrl } = req.body;

    const images =
      req.files?.map((file) => ({
        photo: file.path,
      })) || [];

    const blog = await Bloge.create({
      heading,
      headingUrl,
      blag: [
        {
          ...JSON.parse(blag),
          image: images,
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Bloge.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Blog
export const getSingleBlog = async (req, res) => {
  try {
    const blog = await Bloge.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const deleteBlog = async (req, res) => {
  try {

    const { id } = req.params;

    const blog = await Bloge.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Cloudinary se saari images delete
    if (blog.blag?.length > 0) {

      for (const item of blog.blag) {

        if (item.image?.length > 0) {

          for (const img of item.image) {

            const imageUrl = img.photo;

            const publicId = imageUrl
              .split("/upload/")[1]
              .replace(/^v\d+\//, "")
              .replace(/\.[^/.]+$/, "");

            await cloudinary.uploader.destroy(
              publicId
            );
          }
        }
      }
    }

    // MongoDB se blog delete
    await Bloge.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};