import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();



export const sendEmailOTP = async (to, otp) => {
    try {
        const transporter = nodemailer.createTransport({
             host: "smtp.gmail.com",
    port: 465,
    secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASSWORD
            }
        });
        await transporter.sendMail({
            from: `"HivraSoft" <${process.env.EMAIL}>`,
            to,
            subject: "Your OTP Verification Code",
            html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
            
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                
                <div style="background: #0f172a; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0;">
                        HivraSoft
                    </h1>
                </div>

                <div style="padding: 40px 30px;">
                    
                    <h2 style="color: #111827; margin-bottom: 20px;">
                        OTP Verification
                    </h2>

                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Hello,
                    </p>

                    <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                        Use the following One-Time Password (OTP) to complete your verification process.
                    </p>

                    <div style="text-align: center; margin: 30px 0;">
                        <span style="
                            display: inline-block;
                            background: #2563eb;
                            color: #ffffff;
                            font-size: 32px;
                            letter-spacing: 8px;
                            padding: 15px 30px;
                            border-radius: 8px;
                            font-weight: bold;
                        ">
                            ${otp}
                        </span>
                    </div>

                    <p style="color: #ef4444; font-size: 14px;">
                        This OTP is valid for 10 minutes.
                    </p>

                    <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">
                        If you did not request this verification, please ignore this email.
                    </p>

                </div>

                <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    
                    <p style="margin: 0; color: #6b7280; font-size: 14px;">
                        © 2026 HivraSoft. All rights reserved.
                    </p>

                    <p style="margin-top: 8px;">
                        <a 
                            href="https://hivrasoft.com/" 
                            style="color: #2563eb; text-decoration: none;"
                        >
                            https://hivrasoft.com/
                        </a>
                    </p>

                </div>

            </div>

        </div>
  
  
        `



        });
        return true;

        
    } catch (error) {

      
    };
}