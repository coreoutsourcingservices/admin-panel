const otpStore = new Map()

export const saveOTP = (email, otp) => {
     
   const finalData = {
        ...otp,
        attempts: 0,
        expires: Date.now() + 10 * 60 * 1000
    };

    otpStore.set(email, finalData);

    return finalData;
}

export const getOTPData = (email) => {
  
  return otpStore.get(email); 
};

export const increaseAttempt = (email) => {

    const data = otpStore.get(email);

    if (!data) return null;

    data.attempts = data.attempts + 1;

    otpStore.set(email, data);

    return data.attempts;
};

export const deleteOTP = (email) => {
  return otpStore.delete(email);
};

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

            DOB: check_user.DOB,
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


