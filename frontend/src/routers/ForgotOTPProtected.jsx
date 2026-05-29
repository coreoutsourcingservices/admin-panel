import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ForgotOTPProtected({ children }) {
  const location = useLocation();

  return location.state?.email
    ? children
    : <Navigate to="/forgot-get-otp" replace />;
}

export default ForgotOTPProtected;