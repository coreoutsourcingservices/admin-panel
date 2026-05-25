import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
    {
        galleryName: {
            type: String,
            required: true,
            trim: true,
        },
        gallery: [
            {
                image: {
                    type: String,
                    default: "",
                },

                video: {
                    type: String,
                    default: "",
                },
            },
        ],

        description: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);
