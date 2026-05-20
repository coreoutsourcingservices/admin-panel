import React from "react";
import "../style/page/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";
import axios from "axios";

function Login() {
  const nevigete = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userData, getUserData] = useState({
    email: "",
    password: "",
  });
  const sendEmail = {
    email: userData.email,
  };

  const handlerInput = (e) => {
    const { name, value } = e.target;
    const dataUser = { ...userData, [name]: value };
    getUserData(dataUser);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      return handleError("All fields required");
    }
    try {
      const prome = axios.post(
        "https://admin-panel-backend-ojv0.onrender.com/user/loginGetOTP",
        userData,
      );
      handlePromise(prome);
      const res = await prome;
      if (res.data.success) {
        handleSuccess(res.data.message);
        setTimeout(() => {
          nevigete("/verify-login-OTP", {
            state: sendEmail,
          });
        }, 2000);
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
          height: "400px",
          "margin-top": "50px",
          padding: "20px",
        }}
      >
        <div className="signup-header">
          <h2>Login</h2>
          <p>Login your account</p>
        </div>

        <div className="signup-body">
          {/* Email */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              className="input-field"
              onChange={handlerInput}
              name="email"
              value={userData.email}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="input-field"
                onChange={handlerInput}
                name="password"
                value={userData.password}
                style={{
                  "margin-bottom": "10px",
                }}
              />
              <button
                className={`show-btn ${showPassword ? "Hide" : "Show"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              onClick={handlerSubmit}
              className="submit-btn"
            >
              Login
            </button>
            <p className="login-text">
              Create account?
              <Link to={"/signup"} className="login-link">
                sigup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
