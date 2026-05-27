import React, { useState } from "react";
import "../../style/page/core-web-page/homeWishlan.css";

function HomeWishlan() {
  const [name, setName] = useState("");
  const [decri, setDecri] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [blogs, setBlogs] = useState([]);

  // Save Blog
  const saveBlog = async () => {
    try {
      const response = await fetch(
        "http://localhost:4040/bloge/add-blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            decri,
          }),
        }
      );

      const result = await response.json();

      alert(result.message);

      setName("");
      setDecri("");
    } catch (error) {
      console.log(error);
    }
  };

  // Get Blogs
  const getBlogs = async () => {
    try {
      const response = await fetch(
        "http://localhost:4040/bloge/get-blogs"
      );

      const result = await response.json();

      setBlogs(result.data);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="home-wishlan">

        <h2>Blog Form</h2>

        <input
          type="text"
          placeholder="Enter Blog Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Enter Description"
          value={decri}
          onChange={(e) => setDecri(e.target.value)}
          rows="8"
        />

        <div className="btn-box">
          <button onClick={saveBlog}>
            Save Data
          </button>

          <button onClick={getBlogs}>
            Show Data
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">

            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              X
            </button>

            <h2>All Blogs</h2>

            {blogs.map((item) => (
              <div
                key={item._id}
                className="blog-card"
              >
                <h3>{item.name}</h3>

                <p>{item.decri}</p>

                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeWishlan;