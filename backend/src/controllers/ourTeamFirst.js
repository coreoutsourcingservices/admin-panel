import { OurTeam } from "../models/ourTeamFirst.models.js";


// =========================
// CREATE TEAM MEMBER
// =========================
export const createOurTeam = async (req, res) => {
  try {

    const { name, status, descr, property } = req.body;

    const image = req.file?.path;

    // validation
    if (!name || !status || !image || !property) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // old document check
    let teamData = await OurTeam.findOne();

    // create empty doc
    if (!teamData) {
      teamData = await OurTeam.create({
        team: [],
      });
    }

    // =========================
    // HOME LIMIT CHECK 😎
    // =========================

    if (property === "home") {

      const homeCount = teamData.team.filter(
        (item) => item.property === "home"
      ).length;

      if (homeCount >= 4) {
        return res.status(400).json({
          success: false,
          message:
            "Home complete please delete any one photo",
        });
      }
    }

    // push new data
    teamData.team.push({
      name,
      status,
      image,
      descr,
      property,
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
    });
  }
};


// =========================
// GET ALL TEAM MEMBERS
// =========================
export const getOurTeam = async (req, res) => {
  try {

    const team = await OurTeam.findOne();

    res.status(200).json({
      success: true,
      data: team,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};