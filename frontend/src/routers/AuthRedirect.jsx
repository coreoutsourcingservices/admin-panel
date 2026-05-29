import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AuthRedirect({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return children;
    }

    return <Navigate to="/home" replace />;
  } catch {
    localStorage.removeItem("token");
    return children;
  }
}

export default AuthRedirect;