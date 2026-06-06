import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";
import { backendUrl } from "../utils/api.js";
function FrogetPassword() {
     const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [showPassword, setShowPassword] =
    useState(false);
     const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [userData, setUserData] =
    useState({
      password: "",
    });

  const [checkPassword, setCheckPassword] =
    useState({
      confomPassword: "",
    });

  const handlerInput = (e) => {

    setUserData({
      ...userData,
      [e.target.name]:
        e.target.value,
    });

  };

  const confomPasswordHandlerInput =
    (e) => {

      setCheckPassword({
        ...checkPassword,
        [e.target.name]:
          e.target.value,
      });

    };

  const validations = {
    length:
      userData.password.length >= 8,

    uppercase:
      /[A-Z]/.test(
        userData.password
      ),

    lowercase:
      /[a-z]/.test(
        userData.password
      ),

    number:
      /[0-9]/.test(
        userData.password
      ),

    special:
      /[^A-Za-z0-9]/.test(
        userData.password
      ),
  };

  const isStrongPassword =
    Object.values(
      validations
    ).every(Boolean);

  const checkConPassword =
    userData.password ===
    checkPassword.confomPassword;

  const changePassword =
    async (e) => {

      e.preventDefault();

      if (!isStrongPassword) {
        return handleError(
          "Password is weak"
        );
      }

      if (!checkConPassword) {
        return handleError(
          "Passwords do not match"
        );
      }

      try {

        const response =
          await axios.post(
            `${backendUrl}/user/forgotPassword`,
            {
              email,
              newPassword:
                userData.password,
            }
          );

        handleSuccess(
          response.data.message
        );
        setTimeout(() => {
            navigate("/login");
        }, 1000);



      } catch (error) {

        handleError(
          error.response?.data
            ?.message ||
            "Password Update Failed"
        );

      }

    };

  return (
     <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)",
      padding: "20px",
    }}
  >
    <form
      onSubmit={changePassword}
      style={{
        width: "100%",
        maxWidth: "550px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: "20px",
        padding: "35px",
        boxShadow:
          "0 20px 50px rgba(0,0,0,.4)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: "35px",
          marginBottom: "10px",
        }}
      >
        Change Password
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          marginBottom: "30px",
        }}
      >
        Create your new password
      </p>

      {/* Password */}

      <div style={{ marginBottom: "25px" }}>
        <label
          style={{
            display: "block",
            color: "#fff",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Password
        </label>

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={handlerInput}
            name="password"
            value={userData.password}
            style={{
              width: "100%",
              height: "55px",
              borderRadius: "12px",
              border:
                "1px solid rgba(255,255,255,.15)",
              background:
                "rgba(255,255,255,.08)",
              color: "#fff",
              padding: "0 80px 0 15px",
              outline: "none",
              fontSize: "16px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <div
          style={{
            marginTop: "15px",
            color: "#e2e8f0",
            fontSize: "14px",
            lineHeight: "28px",
          }}
        >
          <p>
            {isStrongPassword
              ? "🟢 Strong Password"
              : "⚪ Weak Password"}
          </p>

          <p>
            {validations.length
              ? "🟢"
              : "⚪"} Minimum 8 characters
          </p>

          <p>
            {validations.uppercase
              ? "🟢"
              : "⚪"} Uppercase (A-Z)
          </p>

          <p>
            {validations.lowercase
              ? "🟢"
              : "⚪"} Lowercase (a-z)
          </p>

          <p>
            {validations.number
              ? "🟢"
              : "⚪"} Number (0-9)
          </p>

          <p>
            {validations.special
              ? "🟢"
              : "⚪"} Special Symbol
          </p>
        </div>
      </div>

      {/* Confirm Password */}

      <div>
        <label
          style={{
            display: "block",
            color: "#fff",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          Confirm Password
        </label>

        <div
          style={{
            position: "relative",
          }}
        >
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            name="confomPassword"
            value={
              checkPassword.confomPassword
            }
            onChange={
              confomPasswordHandlerInput
            }
            style={{
              width: "100%",
              height: "55px",
              borderRadius: "12px",
              border:
                "1px solid rgba(255,255,255,.15)",
              background:
                "rgba(255,255,255,.08)",
              color: "#fff",
              padding: "0 80px 0 15px",
              outline: "none",
              fontSize: "16px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              border: "none",
              background: "transparent",
              color: "#38bdf8",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {showConfirmPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        {checkPassword.confomPassword && (
          <p
            style={{
              marginTop: "10px",
              color: checkConPassword
                ? "#22c55e"
                : "#ef4444",
              fontWeight: "600",
            }}
          >
            {checkConPassword
              ? "✓ Password matched"
              : "✗ Password not matched"}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          height: "55px",
          marginTop: "30px",
          border: "none",
          borderRadius: "12px",
          background:
            "linear-gradient(90deg,#0ea5e9,#2563eb)",
          color: "#fff",
          fontSize: "18px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        Update Password
      </button>
    </form>
  </div>
  );
}


export default FrogetPassword
