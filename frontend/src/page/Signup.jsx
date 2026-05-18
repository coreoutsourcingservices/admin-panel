import React from "react";
import "../style/page/sigup.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkConPassword, setcheckConPassword] = useState(false);

  const [userData, getUserData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
  });
  const [checkPassword, setCheckPassword] = useState({
    confomPassword: "",
  });

  const handlerInput = (e) => {
    const { name, value } = e.target;
    const dataUser = { ...userData, [name]: value };
    getUserData(dataUser);
  };
  const confomPasswordHandlerInput = (e) => {
    const { name, value } = e.target;
    const pass = { ...checkPassword, [name]: value };
    setCheckPassword(pass);
  };

  useEffect(() => {
    if (userData.password && checkPassword.confomPassword) {
      if (userData.password === checkPassword.confomPassword) {
        setcheckConPassword(true);
      } else {
        setcheckConPassword(false);
      }
    }
  }, [userData.password, checkPassword.confomPassword]);

  useEffect(() => {
    console.log(userData);
    console.log(checkPassword);
  }, [userData, checkPassword]);

  return (
    <div className="container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Signup</h2>
          <p>Create your account</p>
        </div>

        <div className="signup-body">
          {/* Name */}
          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="input-field"
              value={userData.name}
              onChange={handlerInput}
            />
          </div>

          {/* Gender */}
          <div className="input-group">
            <label>Gender</label>

            <select
              className="input-field"
              name="gender"
              value={userData.gender}
              onChange={handlerInput}
            >
              <option>Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

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
              />
              <button
                className={`show-btn ${showPassword ? "Hide" : "Show"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {" "}
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="password-validation">
              <p>⚪ Weak / Strong password</p>
              <p>⚪ Minimum 8 characters</p>
              <p>⚪ Uppercase (A-Z)</p>
              <p>⚪ Lowercase (a-z)</p>
              <p>⚪ Numbers (0-9)</p>
              <p>⚪ Special symbols</p>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <label>Confirm Password</label>
            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                className="input-field"
                name="confomPassword"
                value={checkPassword.confomPassword}
                onChange={confomPasswordHandlerInput}
              />
              <button
                className={`show-btn ${showConfirmPassword ? "Hide1" : "Show1"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {" "}
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {checkPassword.confomPassword && (
              <p
                className={
                  checkConPassword ? "password-success" : "password-error"
                }
              >
                {checkConPassword
                  ? "Password match successfully"
                  : "Password not match! Please try again."}
              </p>
            )}
          </div>

          {/* Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <p className="login-text">
            Already have an account?
            <Link to={"/login"} className="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
