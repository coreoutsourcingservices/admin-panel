import { Enquiry } from "../models/WLPForm.js";

export const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      websiteName,
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
        websiteName,
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
    const enquiries = await Enquiry.find()
      .select("-status -__v")
      .sort({ createdAt: -1 });

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

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: enquiry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};