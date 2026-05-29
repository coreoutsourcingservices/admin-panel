// controllers/teamSecond.controller.js

import { TeamSecond } from "../models/teamSecond.models.js";
import { v2 as cloudinary } from "cloudinary";


// ==========================
// POST CONTROLLER
// ==========================

export const createTeamSecond = async (req, res) => {
  try {
    // const teamData = await TeamSecond.findOne({}).lean();
    const { name, status } = req.body;

    const image = req.file?.path;

    // validation
    if (!name || !status || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // check existing document
    let teamData = await TeamSecond.findOne();

    // agar document nahi hai toh create karo
    if (!teamData) {
      teamData = await TeamSecond.create({
        data: [],
      });
    }

    // push new data
    teamData.data.push({
      name,
      image,
      status,
    });

    await teamData.save();

    return res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: teamData,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ==========================
// GET ALL CONTROLLER
// ==========================

export const getAllTeamSecond = async (req, res) => {
  try {
    const teamData = await TeamSecond.findOne();

    return res.status(200).json({
      success: true,
      total: teamData?.data?.length || 0,
      data: teamData?.data || [],
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};




export const deleteTeamSecond = async (req, res) => {
  try {

    const { id } = req.params;

    const teamData = await TeamSecond.findOne();

    if (!teamData) {
      return res.status(404).json({
        success: false,
        message: "Team data not found",
      });
    }

    const member = teamData.data.find(
      (item) => item._id.toString() === id
    );

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    // Image URL
    const imageUrl = member.image;

    // URL se Cloudinary public_id nikalo
    const publicId = imageUrl
      .split("/upload/")[1]
      .replace(/^v\d+\//, "")
      .replace(/\.[^/.]+$/, "");

    // Cloudinary se delete
    await cloudinary.uploader.destroy(publicId);

    // MongoDB se delete
    teamData.data = teamData.data.filter(
      (item) => item._id.toString() !== id
    );

    await teamData.save();

    return res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};