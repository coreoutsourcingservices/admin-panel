import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/page/forgotgetotp.css";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";

function ForgotGetOTP() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const forgotPasswordGetOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "/user/forgotPasswordGetOTP",
        {
          email,
        },
      );

      handleSuccess(response.data.message || "OTP Sent Successfully");
      setTimeout(() => {
        navigate("/forget-varify-otp", {
          state: {
            email,
          },
        },1000);
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);

      handleError(error.response?.data?.message || "Failed To Send OTP");
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={forgotPasswordGetOTP}>
        <h1>Forgot Password</h1>

        <p>Get OTP on your email</p>

        <div className="input-box">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotGetOTP;
