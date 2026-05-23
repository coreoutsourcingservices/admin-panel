import { Partners } from "../models/partners.models.js";


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
      if (homeCount >= 5) {

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