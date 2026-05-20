import React from "react";
import Header from "../../componente/Header";
import "../../style/page/core-web-page/coreHome.css";

function HomeCore() {
  let name = "Coreoutsourcingservices.in";
  return (
    <div>
      <Header web={name} />
      <div className="core-container">
        <div className="core-button-list">
          <h3>Header section or page</h3>
        <div className="line"></div>
        <div className="list-of-page">
          <button>Home</button>
          <button>Services</button>
          <button>About Us</button>
          <button>Blogs</button>
          <button>Contacts</button>
          <button>Gallery</button>
          <button>Careers</button>
          <button>Add header or page</button>
        </div>
        </div>

        <div className="core-main">
          <div>
            <h5>
              <span>sunday</span> <span>may</span> <span>16</span><span> 2026</span>
            </h5>
            <h3>Wolcome back,<span>user</span></h3>
          </div>
        <div className="line"></div>

          <div>
            <div>
              <div>Contact message </div>
              <div>
                <button>Contact message </button>
                <button>Contact message </button>
              </div>

            </div>
            <div>
              <div>Careers message </div>
              <button>Careers message </button>
              <button>Careers message </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCore;
