import mongoose from "mongoose"

export const connentDB=()=>{
    const url=process.env.DATA_BASE

    if (mongoose.connections[0].readyState) {
            console.log("Already connected");
            return;
        }
     mongoose.connect(url)
    .then(()=>{
        console.log("mongoose connected")
    })
    .catch((e)=>{
        console.log("mongoose connect  error ",e)
    })
}