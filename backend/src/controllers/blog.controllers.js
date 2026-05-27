import { Bloge } from "../models/bloge.models.js";

// Add Blog
export const addBlog = async (req, res) => {
  try {
    const { heading, blag } = req.body;

    const images =
      req.files?.map((file) => ({
        photo: file.path,
      })) || [];

    const blog = await Bloge.create({
      heading,
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