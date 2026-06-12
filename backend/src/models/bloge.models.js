import mongoose from "mongoose";

const blogeSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    headingUrl:{
      type: String,
      required: true,
       unique: true,

    },

    blag: [
      {
       writer_name: {
          type: String,
          required: true,
        },

        image: [
          {
            photo: {
              type: String,
              required: true,
            },
          },
        ],

        description_imga: {
          type: String,
          default: "",
        },

        description: [
          {
            description_heading: {
              type: String,
              default: "",
            },

            description_text: {
              type: String,
              default: "",
            },
          },
        ],

        FAQ: [
          {
            Question: {
              type: String,
              default: "",
            },

            answering: {
              type: String,
              default: "",
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Bloge = mongoose.model("Bloge", blogeSchema);