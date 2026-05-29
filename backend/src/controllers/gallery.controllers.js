import { Gallery } from "../models/gallery.models.js";
import { v2 as cloudinary } from "cloudinary";

// =====================================
// POST GALLERY
// =====================================

export const addGallery = async (
  req,
  res
) => {
  try {
    const { galleryName, description } =
      req.body;

    // Check files
    if (
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Files Required",
      });
    }

    // Media Array
    const mediaArray = req.files.map(
      (file) => {
        const isVideo =
          file.mimetype.startsWith(
            "video"
          );

        return {
          image: isVideo
            ? ""
            : file.path,

          video: isVideo
            ? file.path
            : "",
        };
      }
    );

    // Find Gallery
    let galleryData =
      await Gallery.findOne({
        galleryName,
      });

    // Existing Gallery
    if (galleryData) {
      galleryData.gallery.push(
        ...mediaArray
      );

      // update description
      if (description) {
        galleryData.description =
          description;
      }

      await galleryData.save();

      return res.status(200).json({
        success: true,
        message:
          "Gallery Updated Successfully",
        data: galleryData,
      });
    }

    // Create New Gallery
    const newGallery =
      await Gallery.create({
        galleryName,

        gallery: mediaArray,

        description:
          description || "",
      });

    res.status(201).json({
      success: true,
      message:
        "Gallery Created Successfully",
      data: newGallery,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET ALL GALLERY
// =====================================

export const getGallery = async (
  req,
  res
) => {
  try {
    const galleryData =
      await Gallery.find().sort({
        createdAt: -1,
      });

    // Total Gallery
    const totalGallery =
      galleryData.length;

    // Total Photos & Videos
    let totalPhotos = 0;

    let totalVideos = 0;

    galleryData.forEach((item) => {
      item.gallery.forEach((media) => {
        if (media.image) {
          totalPhotos++;
        }

        if (media.video) {
          totalVideos++;
        }
      });
    });

    // Format Data
    const formattedData =
      galleryData.map((item) => {
        let photoCount = 0;

        let videoCount = 0;

        item.gallery.forEach(
          (media) => {
            if (media.image) {
              photoCount++;
            }

            if (media.video) {
              videoCount++;
            }
          }
        );

        return {
          _id: item._id,

          galleryName:
            item.galleryName,

          description:
            item.description,

          totalPhotos: photoCount,

          totalVideos: videoCount,

          createdAt:
            item.createdAt,

          updatedAt:
            item.updatedAt,

          gallery: item.gallery,
        };
      });

    res.status(200).json({
      success: true,

      totalGallery,

      totalPhotos,

      totalVideos,

      data: formattedData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// GET SINGLE GALLERY
// =====================================

export const getSingleGallery =
  async (req, res) => {
    try {
      const { galleryName } =
        req.params;

      const galleryData =
        await Gallery.findOne({
          galleryName,
        });

      if (!galleryData) {
        return res.status(404).json({
          success: false,
          message:
            "Gallery Not Found",
        });
      }

      res.status(200).json({
        success: true,
        data: galleryData,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };





export const deleteGallery = async (req, res) => {
  try {

    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    // Cloudinary delete
    for (const media of gallery.gallery) {

      const mediaUrl =
        media.image || media.video;

      if (!mediaUrl) continue;

      const publicId = mediaUrl
        .split("/upload/")[1]
        .replace(/^v\d+\//, "")
        .replace(/\.[^/.]+$/, "");

      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: media.video
            ? "video"
            : "image",
        }
      );
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Gallery deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};






export const deleteGalleryMedia = async (
  req,
  res
) => {
  try {

    const { galleryId, mediaId } =
      req.params;

    const gallery =
      await Gallery.findById(galleryId);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery not found",
      });
    }

    const media =
      gallery.gallery.find(
        (item) =>
          item._id.toString() ===
          mediaId
      );

    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found",
      });
    }

    const mediaUrl =
      media.image || media.video;

    const publicId = mediaUrl
      .split("/upload/")[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");

    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: media.video
          ? "video"
          : "image",
      }
    );

    gallery.gallery =
      gallery.gallery.filter(
        (item) =>
          item._id.toString() !==
          mediaId
      );

    await gallery.save();

    return res.status(200).json({
      success: true,
      message:
        "Media deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};