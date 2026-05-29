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
import HomeWishlan from "./page/coreoutsourcingservices.in/HomeWishlan";
import ForgotGetOTP from "./page/ForgotGetOTP";
import ForgotVerifyOTP from "./page/ForgotVerifyOTP";
import FrogetPassword from "./page/FrogetPassword";
import ChangPassword from "./page/ChangPassword";
import ForgotOTPProtected from "./routers/ForgotOTPProtected";


function App() {
  return (
    <>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={
            <AuthRedirect>
              <Login />
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

        {/* Signup */}
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />

        {/* Signup OTP */}
        <Route
          path="/verify-signup-OTP"
          element={
            <OTPprotected>
              <OTPsigupPage />
            </OTPprotected>
          }
        />

        {/* Forgot Password Flow */}
        <Route path="/forgot-get-otp" element={<ForgotGetOTP />} />

        <Route
          path="/forget-varify-otp"
          element={
            <ForgotOTPProtected>
              <ForgotVerifyOTP />
            </ForgotOTPProtected>
          }
        />

        <Route path="/forget-password" element={<FrogetPassword />} />
        {/* <Route path="/change-password" element={<ChangPassword />} /> */}

        {/* Protected */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PrivateRoute>
              <ChangPassword />
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

        {/* Unknown Route */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

export default App;
