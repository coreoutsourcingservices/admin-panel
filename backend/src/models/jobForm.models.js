
import mongoose from "mongoose";

const jobSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }


    
},{timestamps:true})

export const JobFrom=mongoose.model("JobFrom0",jobSchema);