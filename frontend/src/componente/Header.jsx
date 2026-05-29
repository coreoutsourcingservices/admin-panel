import React, { useEffect, useRef, useState } from "react";
import "../style/componente/header.css";
import { useNavigate } from "react-router-dom";

function Header({ web }) {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const popupRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInName");

    navigate("/login");
  };

  const date = new Date();
  const h = date.getHours();

  let message = "";

  if (h < 12) {
    message = "☀️ Good Morning";
  } else if (h < 18) {
    message = "🌤️ Good Afternoon";
  } else {
    message = "🌙 Good Evening";
  }

  const name = localStorage.getItem("loggedInName") || "User";

  return (
    <div className="header-container">
      <div className="header-sub-container">
        <h2>{web}</h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
         
            fontWeight: "600",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "24px",
            }}
          >
            {message},
          </h3>

          <h3
            style={{
              margin: 0,
              fontSize: "24px",
              color: "#2563eb",
              textTransform: "capitalize",
            }}
          >
            {name}
          </h3>
        </div>
      </div>

      <div
        style={{
          position: "relative",
        }}
      >
        <div
          className="header-profile"
          onClick={() => setShowProfilePopup(!showProfilePopup)}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(37,99,235,.3)",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        {showProfilePopup && (
          <div
            ref={popupRef}
            style={{
              position: "absolute",
              top: "65px",
              right: "0",
              width: "260px",
              background: "#fff",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 15px 40px rgba(0,0,0,.15)",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  color: "#fff",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {name.charAt(0).toUpperCase()}
              </div>

              <h3
                style={{
                  marginTop: "12px",
                  color: "#111827",
                }}
              >
                {name}
              </h3>
            </div>

            <button
              onClick={() => navigate("/change-password")}
              style={{
                width: "100%",
                padding: "15px 20px",
                border: "none",
                background: "#fff",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px",
                fontWeight: "600",
              }}
            >
              🔐 Change Password
            </button>

            <button
              onClick={logoutHandler}
              style={{
                width: "100%",
                padding: "15px 20px",
                border: "none",
                background: "#fff",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "15px",
                fontWeight: "600",
                color: "#ef4444",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
