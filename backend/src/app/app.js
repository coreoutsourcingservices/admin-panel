import express from "express"
import cors from "cors"
import  userRouter  from "../routes/user.routes.js"

export const app = express()
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server runing...")
})
app.use("/user",userRouter)

