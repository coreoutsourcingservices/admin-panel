import { number, required } from "joi";
import mongoose  from "mongoose";

const contactSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    job_title:{
        type:String,
        required:true
    },
    industry_work:{
        type:String,
        

    },
    currenty_out:{
        type:String
    },
    contect_center:{
        type:String
    },
    how_work:{
        type:String,
        required:true
    }
    

},{timestamps:true})

export const Contect =mongoose.model("Contect",contectSchema)