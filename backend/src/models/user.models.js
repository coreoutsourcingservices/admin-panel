import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     gender: {
            type: String,
            required: true,
            trim: true,
            enum: ["Male", "Female", "Other"]
        },
        email:{
            type:String,
            required:true,
             unique: true,
            trim: true,
            lowercase: true
            

        },
        password:{
            type:String,
            required:true
        }


},{timestamps:true})

export const User = mongoose.model("User",userSchema)