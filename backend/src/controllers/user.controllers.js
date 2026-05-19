import { User } from "../models/user.models.js";
import bcrypt from "bcrypt"
import { sendEmailOTP  } from "../utils/getOTPbyEmail.js";
import { saveOTP, getOTPData, deleteOTP, increaseAttempt} from "../utils/otpStore.js";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"



export const signupGetOTP = async (req, res) => {
    try {
        let { name, gender, email, password } = req.body
        email = email.trim().toLowerCase()
        if (!name || !email || !password || !gender) {
            return res.status(400)
                .json({
                    message: "all fild requed ",
                    success: false
                })
        }

        const existUser = await User.findOne({ email })


        if (existUser) {
            return res.status(400)
                .json({
                    message: "email is already exist,you can login",
                    success: false
                })

        }
        const generateOTP = (length = 6) => {
            let otp = "";
            for (let i = 0; i < length; i++) {
                otp += Math.floor(Math.random() * 10);
            }
            return otp;
        };
        const otp = generateOTP(6);

        const hashPassword = await bcrypt.hash(password, 10);

        const dataSave = saveOTP(email, {
            otp,
            name,
            email,
            password: hashPassword,

            gender,

        });
       

        
        const existingOTP = await sendEmailOTP(email, otp);
        if (existingOTP && existingOTP.expires > Date.now()) {
            return res.json({ message: "OTP already sent. Please wait." });
        }
        
        return res.status(200).json({
            message: "OTP generated successfully",
            success: true,
            data: dataSave
        });


    } catch (error) {
        res.status(500).json({
            message: `signup get OTP error ${error}`,
            success: false
        })
    }

} 

export const signVerifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body
        email = email.trim().toLowerCase();
        const data = getOTPData(email)

        if (!data) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (data.expires < Date.now()) {
            deleteOTP(email);
            return res.status(400).json({ message: "OTP expired" });
        }
        if (data.attempts >= 4) {

            deleteOTP(email);

            return res.status(400).json({
                success: false,
                message: "Too many wrong attempts"
            });
        }


        if (data.otp !== otp) {

            const attempts = increaseAttempt(email);

            return res.status(400).json({
                success: false,
                message: `Invalid OTP. Attempts ${attempts}/5`
            });
        }



        const jwtTokem = jwt.sign(
            {
                email: data.email
            },
            process.env.JWT_KEY,
            { expiresIn: '12h' }
        )
        res.cookie("token", jwtTokem, {
            httpOnly: true,
            secure: false, // production me true
            maxAge: 12 * 60 * 60 * 1000
        })

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
          
            gender: data.gender
        });
        const userResponse = user.toObject();

        delete userResponse.password;

        deleteOTP(email);

        res.json({
            success: true,
            message: "Signup successfully",
            jwtTokem,
            user: userResponse
        });

    } catch (errer) {
        res.status(500)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}

export const loginGetOTP = async (req, res) => {
    try {
        let { email, password, } = req.body;
        email = email.trim().toLowerCase();
        if (!email || !password) {
            res.status(400)
                .json({
                    message: "all fild requed ",
                    success: false
                })
        }
        const check_user = await User.findOne({ email })

        if (!check_user) {
            return res.status(400)
                .json({
                    message: "email is already not  exist,pleass you can signup",
                    success: false
                })
        }
        const checkPassword = await bcrypt.compare(password, check_user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "invalid password" });
        }

        const generateOTP = (length = 6) => {
            let otp = "";
            for (let i = 0; i < length; i++) {
                otp += Math.floor(Math.random() * 10);
            }
            return otp;
        };

        const otp = generateOTP(6);


        const dataSave = saveOTP(email, {
            otp,
            email,

            name: check_user.name,

            
            gender: check_user.gender


        });

        const existingOTP = await sendEmailOTP(email, otp);
        if (existingOTP && existingOTP.expires > Date.now()) {
            return res.json({ message: "OTP already sent. Please wait." });
        }



        res.json({
            success: true,

            message: "OTP sent",
            dataSave
        });




    }
    catch (errer) {
        res.status(201)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}

export const loginVerifyOTP = async (req, res) => {
    try {
        let { email, otp } = req.body
        email = email.trim().toLowerCase();
        const data = await getOTPData(email)


        if (!data) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (data.expires < Date.now()) {
            deleteOTP(email);
            return res.status(400).json({ message: "OTP expired" });
        }

        if (data.attempts >= 5) {

            deleteOTP(email);

            return res.status(400).json({
                success: false,
                message: "Too many wrong attempts"
            });
        }


        if (data.otp !== otp) {

            const attempts = increaseAttempt(email);

            return res.status(400).json({
                success: false,
                message: `Invalid OTP. Attempts ${attempts}/5`
            });
        }

        const jwtTokem = jwt.sign(
            {
                email: data.email
            },
            process.env.JWT_KEY,
            { expiresIn: '12h' }
        )
        res.cookie("token", jwtTokem, {
            httpOnly: true,
            secure: false, // production me true
            maxAge: 12 * 60 * 60 * 1000
        })




        await deleteOTP(email);

        res.json({
            success: true,
            message: "Signup successfully",
            jwtTokem,
            name: data.name,
            email: data.email,

            DOB: data.DOB,
            gender: data.gender
        });

    } catch (errer) {
        res.status(500)
            .json({
                message: `signup errer ${errer}`,
                success: false
            })
    }
}

export const forgotPasswordGetOTP = async (req, res) => {
    try {


        let { email } = req.body
        email = email.trim().toLowerCase();
        if (!email) {
            res.status(500)
                .json({
                    message: "email requed",
                    success: false
                })
        }

        const user_check = await User.findOne({ email })

        if (!user_check) {
            res.status(201)
                .json({
                    message: "user not found ",
                    success: false

                })
        }

        const generateOTP = (length = 6) => {
            let otp = "";
            for (let i = 0; i < length; i++) {
                otp += Math.floor(Math.random() * 10);
            }
            return otp;
        };

        const otp = await generateOTP(6);
        const dataSave = saveOTP(email, {
            otp,

            email,

        });


        res.json({
            success: true,
            message: "send OTP",
            dataSave,


        });
    } catch (errer) {
        res.status(500)
            .json({
                message: `password updata errer ${errer}`,
                success: false
            })
    }



}

export const forgotPasswordVerifyOTP  = async (req, res) => {
    try {
        let { email, otp } = req.body
        email = email.trim().toLowerCase();

        const data = await getOTPData(email)


        if (!data) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

        if (data.expires < Date.now()) {
            deleteOTP(email);
            return res.status(400).json({ message: "OTP expired" });
        }

        if (data.attempts >= 5) {

            deleteOTP(email);

            return res.status(400).json({
                success: false,
                message: "Too many wrong attempts"
            });
        }


        if (data.otp !== otp) {

            const attempts = increaseAttempt(email);

            return res.status(400).json({
                success: false,
                message: `Invalid OTP. Attempts ${attempts}/5`
            });
        }

        // const jwtTokem = jwt.sign(
        //     {
        //         email: data.email
        //     },
        //     process.env.JWT_KEY,
        //     { expiresIn: '6h' }
        // )
        // res.cookie("token", jwtTokem, {
        //     httpOnly: true,
        //     secure: false, // production me true
        //     maxAge: 6 * 60 * 60 * 1000
        // })




        await deleteOTP(email);

        res.json({
            success: true,
            message: "OTP Varify successfully. you can login",
            // jwtTokem,
            // name: data.name,
            // email: data.email,

            // DOB: data.DOB,
            // gender: data.gender
        });

    } catch (errer) {
        res.status(500)
            .json({
                message: `OTP varify errer for password updata ${errer}`,
                success: false
            })
    }

}

export const forgotPassword = async (req, res) => {
    try {
        let  { email, newPassword } = req.body;
            email=email.trim().toLowerCase();
        if (!newPassword) {
            return res.status(400).json({
                message: "New password required",
                success: false
            });
        }

        const newP = await User.findOne({ email });
     

        if (!newP) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // hash password
        const newPassHash = await bcrypt.hash(newPassword, 10);

        // update password
        newP.password = newPassHash;

        // save in database
        await newP.save();

        res.status(200).json({
            message: "Password updated successfully",
            success: true,
            email: newP.email,
           
        });

    } catch (error) {
        res.status(500).json({
            message: `Password update error ${error}`,
            success: false
        });
    }
};

export const chengPassword=  async (req,res)=>{
    try{
        let  { email, newPassword , oldPassword } = req.body;
            email=email.trim().toLowerCase();
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "All fild required",
                success: false
            });
        }
        if (!oldPassword) {
            return res.status(400).json({
                message: "Old password required",
                success: false
            });
        }
        if (!newPassword) {
            return res.status(400).json({
                message: "New password required",
                success: false
            });
        }

        const newP = await User.findOne({ email });
       

        if (!newP) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(oldPassword, newP.password);
         if (!checkPassword) {
            return res.status(400).json({ message: "invalid password" });
        }
        

        // hash password
        const newPassHash = await bcrypt.hash(newPassword, 10);

        // update password
        newP.password = newPassHash;

        // save in database
        await newP.save();

        res.status(200).json({
            message: "Password updated successfully",
            success: true,
            email: newP.email,
           
        });


    }catch (error) {
        res.status(500).json({
            message: `Password cheng error ${error}`,
            success: false
        })
    }
}