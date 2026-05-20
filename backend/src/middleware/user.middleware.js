import joi from "joi";

const passwordPattern =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


// COMMON PASSWORD MESSAGE
const passwordMessages = {
    "any.required": "Password is required",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters",
    "string.max": "Password cannot exceed 20 characters",
    "string.pattern.base":
        "Password must contain uppercase, lowercase, number and special character"
};


// SIGNUP
export const signupAuth = (req, res, next) => {

    const authSchema = joi.object({

        name: joi.string()
            .min(4)
            .max(100)
            .required()
            .messages({
                "any.required": "Name is required",
                "string.empty": "Name is required"
            }),

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            }),

       
        gender: joi.string()
            .valid("Male", "Female", "other")
            .required()
            .messages({
                "any.required": "Gender is required"
            }),

        password: joi.string()
            .min(8)
            .max(20)
            .pattern(passwordPattern)
            .required()
            .messages(passwordMessages)

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};


// LOGIN
export const loginAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            }),

        // password: joi.string()
        //     .min(8)
        //     .max(20)
        //     .pattern(passwordPattern)
        //     .required()
        //     .messages(passwordMessages)

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};


// OTP VERIFY
export const otpAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            }),

        otp: joi.string()
            .length(6)
            .required()
            .messages({
                "any.required": "OTP is required",
                "string.empty": "OTP is required",
                "string.length": "OTP must be 6 digits"
            })

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};


// PASSWORD GET OTP
export const passwordOTPAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            })

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};


// NEW PASSWORD
export const newPasswordAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            }),

        newPassword: joi.string()
            .min(8)
            .max(20)
            .pattern(passwordPattern)
            .required()
            .messages({
                "any.required": "New password is required",
                "string.empty": "New password is required",
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password cannot exceed 20 characters",
                "string.pattern.base":
                    "Password must contain uppercase, lowercase, number and special character"
            })

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};


// CHANGE PASSWORD
export const chengPasswordAuth = (req, res, next) => {

    const authSchema = joi.object({

        email: joi.string()
            .trim()
            .email()
            .required()
            .messages({
                "any.required": "Email is required",
                "string.empty": "Email is required",
                "string.email": "Invalid email"
            }),

        oldPassword: joi.string()
            .required()
            .messages({
                "any.required": "Old password is required",
                "string.empty": "Old password is required"
            }),

        newPassword: joi.string()
            .min(8)
            .max(20)
            .pattern(passwordPattern)
            .required()
            .messages({
                "any.required": "New password is required",
                "string.empty": "New password is required",
                "string.min": "Password must be at least 8 characters",
                "string.max": "Password cannot exceed 20 characters",
                "string.pattern.base":
                    "Password must contain uppercase, lowercase, number and special character"
            })

    });

    const result = authSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            success: false,
            message: result.error.details[0].message
        });
    }

    next();
};