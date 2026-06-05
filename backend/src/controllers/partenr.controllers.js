import { Partners } from "../models/partners.models.js";
import { v2 as cloudinary } from "cloudinary";


// =========================
// POST Partner
// =========================
export const createPartner = async (req, res) => {
  try {

    console.log(req.body);

    const name = req.body.name;

    const property = req.body.property;

    // image url from cloudinary
    const image = req.file?.path;

    // validation
    if (!name || !image || !property) {
      return res.status(400).json({
        success: false,
        message: "Name, image and property required",
      });
    }

    let partnerData = await Partners.findOne();

    // create empty document
    if (!partnerData) {
      partnerData = await Partners.create({
        partners: [],
      });
    }

    // =========================
    // HOME LIMIT CHECK 😎
    // =========================

    if (property === "home") {

      const homeCount = partnerData.partners.filter(
        (item) => item.property === "home"
      ).length;

      // max 5 home images
      if (homeCount >= 50) {

        return res.status(400).json({
          success: false,
          message:
            "Home complete please delete any one photo",
        });

      }
    }

    // push data
    partnerData.partners.push({
      name,
      image,
      property,
    });

    await partnerData.save();

    return res.status(201).json({
      success: true,
      message: "Partner added successfully",
      data: partnerData,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// =========================
// GET All Partners
// =========================
export const getPartners = async (req, res) => {
  try {

    const partners = await Partners.findOne();

    res.status(200).json({
      success: true,
      data: partners,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};




export const deletePartner = async (req, res) => {
  try {

    const { id } = req.params;

    const partnerData = await Partners.findOne();

    if (!partnerData) {
      return res.status(404).json({
        success: false,
        message: "Partner data not found",
      });
    }

    const partner = partnerData.partners.find(
      (item) => item._id.toString() === id
    );

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    // URL se public_id nikalo
    const imageUrl = partner.image;

    const publicId = imageUrl
      .split("/upload/")[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");

    // console.log("Public ID:", publicId);

    // Cloudinary se delete
    await cloudinary.uploader.destroy(publicId);

    // MongoDB se delete
    partnerData.partners = partnerData.partners.filter(
      (item) => item._id.toString() !== id
    );

    await partnerData.save();

    return res.status(200).json({
      success: true,
      message: "Partner deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};