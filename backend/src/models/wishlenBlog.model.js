import mongoose from "mongoose";

const wishlanBlogSchema = new mongoose.Schema(
  {
    BlogHeading: {
      type: String,
      required: true,
    },

    BlogWriter: {
      type: String,
      required: true,
    },

    BlogContent: {
      type: String,
      required: true,
    },

    BlogImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

 export const WishlanBlog= mongoose.model(
  "WishlanBlog",
  wishlanBlogSchema
);