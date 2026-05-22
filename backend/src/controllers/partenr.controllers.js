import { Partners } from "../models/partners.models.js";



// =========================
// POST Partner
export const createPartner = async (req, res) => {

  try {

    // console.log("BODY =>", req.body);

    // console.log("FILE =>", req.file);

    const { name } = req.body;

    // image url from cloudinary
    const image = req.file?.path;

    // validation
    if (!name || !image) {

      return res.status(400).json({
        success: false,
        message: "Name and image required"
      });

    }

    let partnerData = await Partners.findOne();

    if (!partnerData) {

      partnerData = await Partners.create({
        partners: [
          {
            name,
            image
          }
        ]
      });

    } else {

      partnerData.partners.push({
        name,
        image
      });

      await partnerData.save();

    }

    return res.status(201).json({
      success: true,
      message: "Partner added successfully",
      data: partnerData
    });

  } catch (error) {

    // console.log("ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message
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