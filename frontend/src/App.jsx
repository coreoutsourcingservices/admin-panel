import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./page/Signup";
import Login from "./page/Login";
import OTPsigupPage from "./page/OTPsigupPage";
import LongPageOTP from "./page/LongPageOTP";
import Home from "./page/Home";
import "./App.css";
import PrivateRoute from "./routers/PrivateRoute";
import OTPprotected from "./routers/OTPprotected";
import AuthRedirect from "./routers/AuthRedirect";
import HomeCore from "./page/coreoutsourcingservices.in/HomeCore";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />

        <Route
          path="/verify-signup-OTP"
          element={
            <OTPprotected>
              <OTPsigupPage />
            </OTPprotected>
          }
        />
        <Route
          path="/verify-login-OTP"
          element={
            <OTPprotected>
              <LongPageOTP />
            </OTPprotected>
          }
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/coreoutsourcingservices"
          element={
            <PrivateRoute>
              <HomeCore />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
