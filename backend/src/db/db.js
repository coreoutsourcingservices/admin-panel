import mongoose from "mongoose"

export const connentDB=()=>{
    const url=process.env.DATA_BASE
     mongoose.connect(url)
    .then(()=>{
        console.log("mongoose connected")
    })
    .catch((e)=>{
        console.log("mongoose connect  error ",e)
    })
}