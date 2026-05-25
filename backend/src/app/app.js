import express from "express"
import cors from "cors"
import  userRouter  from "../routes/user.routes.js"
import jobFormRouter from "../routes/jobFrom.router.js"
import contactRouter from "../routes/contect.routes.js"
import partnersRouter from "../routes/partener.js"
import ourteamRouter from "../routes/ourTeamfirst.js"
import teamSecondRouter from "../routes/teamSecond.js"
import galleryRouter from "../routes/gallary.routes.js"

export const app = express()
const allowedOrigins = [
  "http://localhost:5173",

  "https://admin-panel-core.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,

    credentials: true,
  })
);

app.use(express.urlencoded({
  limit: "500mb",
  extended: true
}));

app.get("/",(req,res)=>{
    res.send("server runing...")
})

app.use("/careers",jobFormRouter)
app.use("/user",userRouter)
app.use("/contact",contactRouter)
app.use("/partners",partnersRouter)
app.use("/ourteam",ourteamRouter)
app.use("/teamsecond",teamSecondRouter)
app.use("/gallery",galleryRouter)

