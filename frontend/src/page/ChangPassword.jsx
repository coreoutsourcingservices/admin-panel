import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess, handlePromise } from "../utils/Toast";
function ChangPassword() {
    const navigate = useNavigate();

  const email =
    localStorage.getItem("loggedInEmail");

  const [showOldPassword, setShowOldPassword] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      oldPassword: "",
      password: "",
      confomPassword: "",
    });

  const handlerInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const validations = {
    length:
      formData.password.length >= 8,
    uppercase:
      /[A-Z]/.test(formData.password),
    lowercase:
      /[a-z]/.test(formData.password),
    number:
      /[0-9]/.test(formData.password),
    special:
      /[^A-Za-z0-9]/.test(
        formData.password
      ),
  };

  const isStrongPassword =
    Object.values(
      validations
    ).every(Boolean);

  const checkConPassword =
    formData.password ===
    formData.confomPassword;

  const changePassword = async (e) => {

    e.preventDefault();

    if (!checkConPassword) {
      return alert(
        "Password not match"
      );
    }

    try {

      const response =
        await axios.post(
          "/user/chengPassword",
          {
            email,
            oldPassword:
              formData.oldPassword,
            newPassword:
              formData.password,
          }
        );

      handleSuccess(
        response.data.message
      );

      setFormData({
        oldPassword: "",
        password: "",
        confomPassword: "",
      });
        //  setTimeout(() => {
        // navigate("/forget-varify-otp", {
        //   state: {
        //     email,
        //   },
        // },1000);
        setTimeout(()=>{
            navigate ("/home")
        },1000)




    } catch (error) {

      handleError(
        error.response?.data
          ?.message ||
          "Password change failed"
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
          "linear-gradient(135deg,#0f172a,#1e293b)",
        padding: "20px",
      }}
    >
      <form
        onSubmit={changePassword}
        style={{
          width: "100%",
          maxWidth: "550px",
          background:
            "rgba(255,255,255,.08)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,.4)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Change Password
        </h1>

        {/* Old Password */}

        <label
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Old Password
        </label>

        <div
          style={{
            position: "relative",
            marginTop: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            type={
              showOldPassword
                ? "text"
                : "password"
            }
            name="oldPassword"
            value={
              formData.oldPassword
            }
            onChange={handlerInput}
            placeholder="Enter old password"
            style={{
              width: "100%",
              height: "55px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,.2)",
              background:
                "rgba(255,255,255,.08)",
              color: "#fff",
              padding: "0 80px 0 15px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowOldPassword(
                !showOldPassword
              )
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              border: "none",
              background: "none",
              color: "#38bdf8",
              cursor: "pointer",
            }}
          >
            {showOldPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        {/* New Password */}

        <label
          style={{
            color: "#fff",
            fontWeight: "600",
          }}
        >
          New Password
        </label>

        <div
          style={{
            position: "relative",
            marginTop: "8px",
          }}
        >
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={formData.password}
            onChange={handlerInput}
            placeholder="Enter new password"
            style={{
              width: "100%",
              height: "55px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,.2)",
              background:
                "rgba(255,255,255,.08)",
              color: "#fff",
              padding: "0 80px 0 15px",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform:
                "translateY(-50%)",
              border: "none",
              background: "none",
              color: "#38bdf8",
              cursor: "pointer",
            }}
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <div
          style={{
            color: "#fff",
            marginTop: "15px",
            fontSize: "14px",
            lineHeight: "25px",
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
              : "⚪"} Minimum 8
            characters
          </p>

          <p>
            {validations.uppercase
              ? "🟢"
              : "⚪"} Uppercase
          </p>

          <p>
            {validations.lowercase
              ? "🟢"
              : "⚪"} Lowercase
          </p>

          <p>
            {validations.number
              ? "🟢"
              : "⚪"} Number
          </p>

          <p>
            {validations.special
              ? "🟢"
              : "⚪"} Special
            Symbol
          </p>
        </div>

        {/* Confirm Password */}

        <label
          style={{
            color: "#fff",
            fontWeight: "600",
            marginTop: "20px",
            display: "block",
          }}
        >
          Confirm Password
        </label>

        <div
          style={{
            position: "relative",
            marginTop: "8px",
          }}
        >
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confomPassword"
            value={
              formData.confomPassword
            }
            onChange={handlerInput}
            placeholder="Confirm password"
            style={{
              width: "100%",
              height: "55px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,.2)",
              background:
                "rgba(255,255,255,.08)",
              color: "#fff",
              padding: "0 80px 0 15px",
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
              background: "none",
              color: "#38bdf8",
              cursor: "pointer",
            }}
          >
            {showConfirmPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        {formData.confomPassword && (
          <p
            style={{
              color:
                checkConPassword
                  ? "#22c55e"
                  : "#ef4444",
              marginTop: "10px",
            }}
          >
            {checkConPassword
              ? "✓ Password Match"
              : "✗ Password Not Match"}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            height: "55px",
            marginTop: "25px",
            border: "none",
            borderRadius: "10px",
            background:
              "linear-gradient(90deg,#0ea5e9,#2563eb)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangPassword;