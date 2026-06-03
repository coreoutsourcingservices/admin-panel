import { CareerForm } from "../models/careerFormWishlan.models.js";
import { v2 as cloudinary } from "cloudinary";



export const createCareerForm = async (req, res) => {
  try {
    const { name, email, number, position } = req.body;

    if (!name || !email || !number ||!position) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    const careerForm = await CareerForm.create({
      name,
      email,
      number,
      position,
      rusume: req.file.path, // Cloudinary URL
    });

    return res.status(201).json({
      success: true,
      message: "Career form submitted successfully",
      data: careerForm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Forms
export const getAllCareerForms = async (req, res) => {
  try {
    const forms = await CareerForm.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Form
export const getCareerFormById = async (req, res) => {
  try {
    const form = await CareerForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: form,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Form
export const deleteCareerForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await CareerForm.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Cloudinary URL
    const resumeUrl = form.resume;

    if (resumeUrl) {
      const parts = resumeUrl.split("/upload/")[1];

      // v123456/remove
      const publicId = parts
        .replace(/^v\d+\//, "")
         .replace(/\.[^/.]+$/, ""); // jpg, png, jpeg sab remove

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw",
      });
    }

    await CareerForm.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Form and resume deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};