import mongoose from "mongoose";

const ourTeamSchema = new mongoose.Schema(
    {
        team: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },

                status: {
                    type: String,
                    required: true,
                    trim: true,
                },

                image: {
                    type: String,
                    required: true,
                },
                property: {
                    type: String,
                    enum: ["home", "about_us"],
                    default: "about_us",

                },
                descr: {
                    type: String,
                    default: "",
                },



            },

        ],
    },
    {
        timestamps: true,
    }
);

export const OurTeam = mongoose.model(
    "OurTeam",
    ourTeamSchema
);