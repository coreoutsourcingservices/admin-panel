import mongoose from "mongoose";

const partnersSchema = new mongoose.Schema(
  {
    partners: [
      {
        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },
      },
       {
    timestamps: true,
  }
    ],
  },
  {
    timestamps: true,
  }
);

 export const Partners = mongoose.model("Partners", partnersSchema);

