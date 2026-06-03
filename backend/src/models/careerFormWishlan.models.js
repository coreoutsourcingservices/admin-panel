import mongoose from "mongoose"

const careerFormSchema=mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    number: {
      type: String,
      required: true,
      trim: true,
    },
    rusume: {
      type: String,
      

    },
    position:{
         type: String,
      required: true,
    }

},{ timestamps: true,})

export const CareerForm = mongoose.model("CareerForm",careerFormSchema)