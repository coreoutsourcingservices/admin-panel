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
              marginBottom: "-5px",
              fontSize: "24px",
              color: "#2563eb",
              textTransform: "capitalize",
            }}
          >
            {name}
          </h3>
        </div>
        </div>
      </div>
      <div className="main-btm">
        <button onClick={()=>navigate("/coreoutsourcingservices")}>
          <p>coreoutsourcingservices.in</p>
        </button>
        <button onClick={()=>navigate("/wishlan")}>
          <p>wishlan.com</p>
        </button>
      </div>
    </div>
  );
}

export default Home;
