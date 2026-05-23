import mongoose from "mongoose";

const teamSecondSchema = new mongoose.Schema(
  {
    data: [
      {
        name: {
          type: String,
          required: true,
         
        },

        image: {
          type: String,
          required: true,
        },

        status: {
          type: String,
          required: true,
          
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
 
export const TeamSecond = mongoose.model("TeamSecond", teamSecondSchema);
