import React from "react";
import {
  Navigate,
  useLocation,
} from "react-router-dom";

function OTPprotected({ children }) {

  const location = useLocation();

  // Check email passed or not
  const email = location.state?.email;

  return email
    ? children
    : <Navigate to="/login" />;
}

export default OTPprotected;