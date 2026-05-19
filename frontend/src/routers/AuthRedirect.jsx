import React from "react";
import { Navigate } from "react-router-dom";

function AuthRedirect({ children }) {

  const token = localStorage.getItem("token");

  return token ? <Navigate to="/home" /> : children;
}

export default AuthRedirect;