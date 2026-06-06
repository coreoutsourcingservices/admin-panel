import React from "react";
import "../style/page/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";
import axios from "axios";
import { backendUrl } from "../utils/api.js";

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
              // "https://admin-panel-fawn-iota.vercel.app/user/loginGetOTP",

      const prome = axios.post(
        `${backendUrl}/user/loginGetOTP`,
        userData,
      );
      handlePromise(prome);
      const res = await prome;

      if (res.data.success) {
        // token save
        localStorage.setItem("token", res.data.jwtTokem);

        // name save
        localStorage.setItem("loggedInName", res.data.name);
        localStorage.setItem("loggedInEmail", res.data.email);

        handleSuccess(res.data.message);
        setTimeout(() => {
          nevigete("/home");
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
          "marginTop": "50px",
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
                  "marginBottom": "10px",
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
            <p className="login-text">
              Forgot your password?
              <Link to="/forgot-get-otp" className="login-link">
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
