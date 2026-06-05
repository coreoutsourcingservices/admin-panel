import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { handleError, handleSuccess, handlePromise } from "../utils/Toast";

function ForgotVerifyOTP() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOTP = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "/user/forgotPasswordVerifyOTP",
        {
          email,
          otp,
        }
      );

      handleSuccess(
        response.data.message ||
        "OTP Verified Successfully"
      );
      setTimeout(() => {
          navigate("/forget-password", {
        state: { email },
      });

      }, 1000);


    } catch (error) {

      handleError(
        error.response?.data?.message ||
        "OTP Verification Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="forgot-container">

      <form
        className="forgot-card"
        onSubmit={verifyOTP}
      >

        <h1>Verify OTP</h1>

        <p>
          Enter OTP sent to your email
        </p>

        <div className="input-box">

          <label>OTP</label>

          <input
            type="text"
            placeholder="Enter OTP"
            maxLength="6"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
          />
           <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        </div>



      </form>

    </div>
  );
}

export default ForgotVerifyOTP;