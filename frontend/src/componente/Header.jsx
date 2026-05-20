import React from "react";
import "../style/componente/header.css";

function Header({ web }) {
  const date = new Date();

  const h = date.getHours();

  let message = "";

  if (h < 12) {
    message = " ☀️ Good Morning";
  } else if (h < 18) {
    message = " 🌤️ Good Afternoon";
  } else {
    message = " 🌙 Good Evening";
  }

  let name = localStorage.getItem("loggedInName");

  return (
    <div className="header-container">
      <div className="header-sub-container">
        <h2>{web}</h2>
        <div className="header-heading">
          
          <h3>{message}</h3>
          <h3>{name}</h3>
        </div>
      </div>
      <div className="header-profile"></div>
    </div>
  );
}

export default Header;
