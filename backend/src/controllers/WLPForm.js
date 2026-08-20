import { Enquiry } from "../models/WLPForm.js";

export const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      address,
      service,
      message,
    } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and service are required",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      company,
      phone,
      address,
      service,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: enquiries.length,
      data: enquiries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};