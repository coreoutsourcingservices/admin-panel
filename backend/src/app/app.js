import express from "express"
import cors from "cors"
import  userRouter  from "../routes/user.routes.js"
import jobFormRouter from "../routes/jobFrom.router.js"
import contactRouter from "../routes/contect.routes.js"
import partnersRouter from "../routes/partener.js"
import ourteamRouter from "../routes/ourTeamfirst.js"
import teamSecondRouter from "../routes/teamSecond.js"
import galleryRouter from "../routes/gallary.routes.js"
import blogRouter from "../routes/blog.routers.js"
import jobRouter from "../routes/job.routes.js"

export const app = express()


app.use(
  cors()
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.urlencoded({
  limit: "200mb",
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
app.use("/bloge",blogRouter)
app.use("/job",jobRouter)

