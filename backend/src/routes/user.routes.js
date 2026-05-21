import express from "express"
import {
    signupGetOTP,
    signVerifyOTP,
    loginGetOTP,

    forgotPasswordGetOTP,
    forgotPasswordVerifyOTP,
    forgotPassword,
    chengPassword
} from "../controllers/user.controllers.js"

import {
     signupAuth, 
     loginAuth, 
     otpAuth ,
     passwordOTPAuth,
     newPasswordAuth,
     chengPasswordAuth,
    } from "../middleware/user.middleware.js";

    

const router = express.Router()

router.post("/signupGetOTP",signupAuth, signupGetOTP)
router.post("/signupVerifyOTP",otpAuth, signVerifyOTP)
router.post("/loginGetOTP", loginAuth,loginGetOTP)
// router.post("/loginVerifyOTP",otpAuth, loginVerifyOTP) 
router.post("/forgotPasswordGetOTP",passwordOTPAuth, forgotPasswordGetOTP)
router.post("/forgotPasswordVerifyOTP",otpAuth, forgotPasswordVerifyOTP) 
router.post("/forgotPassword",newPasswordAuth, forgotPassword) 
router.post("/chengPassword", chengPasswordAuth,chengPassword) 
export default router