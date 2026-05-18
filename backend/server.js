import express from "express"
import dotenv from "dotenv"
import { app } from "./src/app/app.js"
import { connentDB } from "./src/db/db.js"
dotenv.config()
connentDB()
const port = process.env.PORT


app.listen( port ,(()=>{
    console.log(`server runing port:- ${port}`)
}))