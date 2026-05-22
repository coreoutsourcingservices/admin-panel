import { Partners } from "../models/partners.models.js";



// =========================
// POST Partner
// =========================
export const createPartner = async (req, res) => {
  try {
    const { name } = req.body;

    // image cloudinary se aa jayegi
    const image = req.file?.path;

    // if (!name || !image) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Name and image are required",
    //   });
    // }

    // check old document
    let partnerData = await Partners.findOne();

    // agar document nahi hai to create karo
    if (!partnerData) {
      partnerData = await Partners.create({
        partners: [
          {
            name,
            image,
          },
        ],
      });
    } else {
      // existing array me push karo
      partnerData.partners.push({
        name,
        image,
      });

      await partnerData.save();
    }

    res.status(201).json({
      success: true,
      message: "Partner added successfully",
      data: partnerData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
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