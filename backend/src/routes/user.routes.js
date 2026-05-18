import express from "express"
import {
    signupGetOTP,
    signVerifyOTP,
    loginGetOTP,
    loginVerifyOTP,
    forgotPasswordGetOTP,
    forgotPasswordVerifyOTP,
    forgotPassword,
    chengPassword
} from "../controllers/user.controllers.js"

const router = express.Router()

router.post("/signupGetOTP", signupGetOTP)
router.post("/signupVerifyOTP", signVerifyOTP)
router.post("/loginGetOTP", loginGetOTP)
router.post("/loginVerifyOTP", loginVerifyOTP) 
router.post("/forgotPasswordGetOTP", forgotPasswordGetOTP)
router.post("/forgotPasswordVerifyOTP", forgotPasswordVerifyOTP) 
router.post("/forgotPassword", forgotPassword) 
router.post("/chengPassword", chengPassword) 
export default router