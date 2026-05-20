import React from "react";
import { data, useNavigate } from "react-router-dom";
import "../style/page/home.css";

function Home() {
     const navigate = useNavigate();
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
    <div className="container1">
      <div className="home-sub-container">
        <div className="main-container-home">
          <h2>{message}</h2>
          <h2>{name}</h2>
        </div>
      </div>
      <div className="main-btm">
        <button onClick={()=>navigate("/coreoutsourcingservices")}>
          <p>coreoutsourcingservices.in</p>
        </button>
        <button>
          <p>wishlan.com</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
