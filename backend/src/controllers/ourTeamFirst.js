import { OurTeam } from "../models/ourTeamFirst.models.js";



// =========================
// CREATE TEAM MEMBER
// =========================
export const createOurTeam = async (req, res) => {
  try {
  const { name, status, descr }  = req.body;

    const image = req.file?.path;

    // if (!name || !status || !image) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }

    // old document check
    let teamData = await OurTeam.findOne();

    // create new
    if (!teamData) {
      teamData = await OurTeam.create({
        team: [
          {
            name,
            status,
            image,
              descr,
          },
        ],
      });
    } else {
      // push in array
      teamData.team.push({
        name,
        status,
        image,
          descr,
      });

      await teamData.save();
    }

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: teamData,
    });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
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
    // console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};