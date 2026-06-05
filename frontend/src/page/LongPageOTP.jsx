import React from "react";
import "../style/page/login.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";
import axios from "axios";

function LongPageOTP() {
  const location = useLocation();
  const nevigete = useNavigate();
  const email = location.state?.email;

  const [userData, getUserData] = useState({
    otp: "",
    email: email || "",
  });

  const handlerInput = (e) => {
    const { name, value } = e.target;
    getUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // "https://admin-panel-fawn-iota.vercel.app/user/loginVerifyOTP",

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { otp } = userData;
    if (!otp) {
      return handleError("OTP fields required");
    }
    try {
      const promise = axios.post(
        "/user/loginVerifyOTP",

        userData,
      );
      handlePromise(promise);
      const res = await promise;

      const { jwtTokem, name } = res.data;
    //   console.log(jwtTokem,name)

      if (res.data.success) {
        localStorage.setItem("token", jwtTokem);

        localStorage.setItem("loggedInName", name);
        handleSuccess(res.data.message);

        setTimeout(() => {
          nevigete("/home");
        }, 500);
      }
    } catch (e) {
      const err =
        e.response?.data?.message || e.message || "Something went wrong";
      // console.log(err);
      handleError(err);
    }
  };

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="signup-card"
        style={{
          height: "300px",
          "margin-top": "0px",
          padding: "20px",
        }}
      >
        <div className="signup-header">
          <h2 style={{ fontSize: "25px" }}>Login OTP Verify</h2>
          {/* <p>Login your account</p> */}
        </div>

        <div className="signup-body">
          {/* Email */}
          <div
            className="input-group"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            <label>OTP</label>

            <input
              type="text"
              placeholder="Enter OTP"
              className="input-field"
              onChange={handlerInput}
              name="otp"
              value={userData.otp}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            {/* Button */}
            <button
              type="submit"
              onClick={handlerSubmit}
              className="submit-btn"
              style={{ marginTop: "20px" }}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LongPageOTP;
