import {WishlanBlog} from "../models/wishlenBlog.model.js";

export const createBlog = async (req, res) => {
  try {
    const {
      BlogHeading,
      BlogWriter,
      BlogContent,
      BlogHeadingURL,
    } = req.body;

    if (
      !BlogHeading ||
      !BlogWriter ||
      !BlogContent ||
      !BlogHeadingURL
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const imagePath = req.file
       ? req.file.path
  : "";

    const blog = await WishlanBlog.create({
      BlogHeading,
      BlogWriter,
      BlogContent,
      BlogHeadingURL,
      BlogImage: imagePath,
    });

    res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      data: blog,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await WishlanBlog
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { BlogHeadingURL } = req.params;

    const blog = await WishlanBlog.findOne({
      BlogHeadingURL,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.status(200).json({
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

export const deleteBlog = async (req, res) => {
  try {
    const blog =
      await WishlanBlog.findByIdAndDelete(
        req.params.id
      );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};